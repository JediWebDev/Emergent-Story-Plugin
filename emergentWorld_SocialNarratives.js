/*:
 * @target MZ
 * @plugindesc [v1.0] Layer 10 - Social Ecosystems & Narrative Emergence
 * @author dijOTTER
 * @base EmergentWorld_Core
 * @base EmergentWorld_Characters
 * @base EmergentWorld_Factions
 *
 * @command DebugSocialSnapshot
 * @text Debug Social Snapshot
 * @desc Prints current social groups and narratives to the console and a short message window summary.
 *
 * @command DebugNarrativeSummary
 * @text Debug Narrative Summary
 * @desc Prints only narrative summaries to the console and message window.
 *
 * @help EmergentWorld_SocialNarratives.js
 * Adds Level 4 social groups and Level 5 narrative emergence.
 * Designed to be additive and backward-compatible with existing saves.
 */

var Imported = Imported || {};
Imported.EmergentWorld_SocialNarratives = true;

(() => {
    const pluginName = "emergentWorld_SocialNarratives";
    const MAX_FORMATION_CHECKS_PER_TICK = 8;
    const NARRATIVE_SCAN_INTERVAL = 5;
    const CONFLICT_REPEAT_THRESHOLD = 3;

    const _Game_System_initialize = Game_System.prototype.initialize;
    Game_System.prototype.initialize = function() {
        _Game_System_initialize.call(this);
        if (!this._emergentState) this._emergentState = {};
        if (!this._emergentState.socialGroups || typeof this._emergentState.socialGroups !== "object") {
            this._emergentState.socialGroups = {};
        }
        if (!Array.isArray(this._emergentState.narratives)) {
            this._emergentState.narratives = [];
        }
        if (this._emergentState.socialGroupIdCounter === undefined) {
            this._emergentState.socialGroupIdCounter = 0;
        }
        if (this._emergentState.narrativeIdCounter === undefined) {
            this._emergentState.narrativeIdCounter = 0;
        }
        if (this._emergentState.eventIdCounter === undefined) {
            this._emergentState.eventIdCounter = 0;
        }
    };

    EmergentManager.ensureSocialNarrativeState = function(state) {
        const safeState = state || ($gameSystem && $gameSystem.emergentState ? $gameSystem.emergentState() : null);
        if (!safeState) return null;
        if (!safeState.socialGroups || typeof safeState.socialGroups !== "object") safeState.socialGroups = {};
        if (!Array.isArray(safeState.narratives)) safeState.narratives = [];
        if (safeState.socialGroupIdCounter === undefined) safeState.socialGroupIdCounter = 0;
        if (safeState.narrativeIdCounter === undefined) safeState.narrativeIdCounter = 0;
        if (safeState.eventIdCounter === undefined) safeState.eventIdCounter = 0;
        return safeState;
    };

    EmergentManager._groupGoalDescriptors = {
        trade_circle: "expand trade wealth",
        militia: "defend territory",
        cult: "spread doctrine",
        band: "survive by force"
    };

    EmergentManager.createSocialGroup = function(type, members) {
        const state = this.ensureSocialNarrativeState();
        if (!state) return null;
        const validMembers = Array.isArray(members) ? members.filter(id => this.getCharacter(Number(id))) : [];
        if (validMembers.length < 2) return null;

        const id = `group_${state.socialGroupIdCounter++}`;
        const leaderId = Number(validMembers[0]);
        const normalizedType = String(type || "band");
        const group = {
            id: id,
            type: normalizedType,
            members: [...new Set(validMembers.map(n => Number(n)))],
            leaderId: leaderId,
            cohesion: 50,
            goal: this._groupGoalDescriptors[normalizedType] || "preserve group strength",
            resources: {
                food: 15 + Math.randomInt(11),
                wealth: 10 + Math.randomInt(16),
                military: 8 + Math.randomInt(12)
            },
            relationships: {},
            lastActionTick: Number(state.ticks || 0)
        };

        state.socialGroups[id] = group;
        for (const memberId of group.members) {
            const member = this.getCharacter(memberId);
            if (member) member.groupId = id;
        }

        this.logEvent("social_group_created", {
            groupId: id,
            type: group.type,
            leaderId: group.leaderId,
            memberCount: group.members.length
        });
        return group;
    };

    EmergentManager.addCharacterToGroup = function(character, groupId) {
        if (!character || groupId === undefined || groupId === null) return false;
        const group = this.getGroup(groupId);
        if (!group) return false;
        if (!group.members.includes(character.id)) group.members.push(character.id);
        character.groupId = group.id;
        if (!this.getCharacter(group.leaderId) || !group.members.includes(group.leaderId)) {
            group.leaderId = character.id;
        }
        this.updateGroupCohesion(group);
        return true;
    };

    EmergentManager.removeCharacterFromGroup = function(character, groupId) {
        if (!character || groupId === undefined || groupId === null) return false;
        const group = this.getGroup(groupId);
        if (!group) return false;

        group.members = group.members.filter(id => id !== character.id);
        if (character.groupId === group.id) character.groupId = null;

        if (group.members.length === 0) {
            const state = this.ensureSocialNarrativeState();
            delete state.socialGroups[group.id];
            this.logEvent("social_group_disbanded", { groupId: group.id });
            return true;
        }

        if (group.leaderId === character.id) {
            group.leaderId = group.members[0];
            this.logEvent("social_group_leadership_changed", {
                groupId: group.id,
                newLeaderId: group.leaderId
            });
        }

        this.updateGroupCohesion(group);
        return true;
    };

    EmergentManager.getGroup = function(groupId) {
        const state = this.ensureSocialNarrativeState();
        if (!state) return null;
        return state.socialGroups[String(groupId)] || null;
    };

    EmergentManager.getCharacterGroup = function(character) {
        if (!character) return null;
        return character.groupId ? this.getGroup(character.groupId) : null;
    };

    EmergentManager.getGroupAverageRelationship = function(group) {
        if (!group || !Array.isArray(group.members) || group.members.length <= 1) return 0;
        let total = 0;
        let count = 0;
        for (let i = 0; i < group.members.length; i++) {
            const a = this.getCharacter(group.members[i]);
            if (!a || !a.isAlive) continue;
            for (let j = i + 1; j < group.members.length; j++) {
                const b = this.getCharacter(group.members[j]);
                if (!b || !b.isAlive) continue;
                total += this.getRelationship(a, b);
                count++;
            }
        }
        return count > 0 ? total / count : 0;
    };

    EmergentManager.calculateGroupGoal = function(group) {
        if (!group) return "preserve group strength";
        const r = group.resources || { food: 0, wealth: 0, military: 0 };
        if (r.food < 12) return "secure food";
        if (r.military < 15) return "recruit defenders";
        if (group.type === "trade_circle" || r.wealth > 35) return "expand trade wealth";
        if (group.type === "militia") return "defend territory";
        if (group.type === "cult") return "spread doctrine";
        if (group.type === "band") return "dominate rivals";
        return "preserve group strength";
    };

    EmergentManager.updateGroupCohesion = function(group) {
        if (!group) return 0;
        const avgRelationship = this.getGroupAverageRelationship(group);
        const memberCount = Array.isArray(group.members) ? group.members.length : 0;
        const sizePenalty = memberCount > 6 ? (memberCount - 6) * 3 : 0;
        const resourceBalance = ((group.resources.food || 0) + (group.resources.wealth || 0) + (group.resources.military || 0)) / 3;
        const cohesion = Math.max(0, Math.min(100, 45 + (avgRelationship * 0.6) + (resourceBalance * 0.3) - sizePenalty));
        group.cohesion = Math.round(cohesion);
        group.goal = this.calculateGroupGoal(group);
        return group.cohesion;
    };

    EmergentManager.getGoalAlignmentScore = function(character, goal) {
        if (!character) return 0;
        const targetGoal = String(goal || "");
        const prosperity = this.getVar("prosperity");
        const foodSupply = this.getVar("foodSupply");
        const banditPower = this.getVar("banditPower");
        let score = 0;
        if (targetGoal.includes("trade")) {
            score += character.role === "Trader" ? 16 : 4;
            score += prosperity < 30 ? 6 : 2;
        }
        if (targetGoal.includes("defend") || targetGoal.includes("defenders")) {
            score += character.role === "Citizen" ? 4 : 8;
            score += banditPower > 40 ? 8 : 2;
        }
        if (targetGoal.includes("food")) {
            score += foodSupply < 35 ? 10 : 3;
        }
        if (targetGoal.includes("dominate")) {
            score += character.faction === "bandits" ? 12 : -2;
        }
        return score;
    };

    EmergentManager.pickGroupTypeFromMembers = function(memberIds) {
        const chars = memberIds.map(id => this.getCharacter(id)).filter(Boolean);
        const traders = chars.filter(c => c.role === "Trader").length;
        const bandits = chars.filter(c => c.faction === "bandits").length;
        const guards = chars.filter(c => c.role === "Leader" || c.role === "Guard").length;
        if (traders >= 2) return "trade_circle";
        if (bandits >= 2) return "band";
        if (guards >= 1) return "militia";
        return "band";
    };

    EmergentManager.getOpinionSimilarityScore = function(a, b) {
        const keys = ["bandits", "merchants", "villagers"];
        let totalDiff = 0;
        for (const key of keys) {
            const aVal = Number(a.opinions && a.opinions[key]) || 0;
            const bVal = Number(b.opinions && b.opinions[key]) || 0;
            totalDiff += Math.abs(aVal - bVal);
        }
        return Math.max(0, 100 - (totalDiff / keys.length));
    };

    EmergentManager.tryFormGroupFromCharacter = function(character, state) {
        if (!character || !character.isAlive || character.groupId) return false;
        const nearby = this.getNearbyNPCs(character, state);
        const candidates = [];
        for (const other of nearby) {
            if (!other || !other.isAlive || other.groupId) continue;
            const relationship = this.getRelationship(character, other);
            const opinionSimilarity = this.getOpinionSimilarityScore(character, other);
            if (relationship > 40 && opinionSimilarity > 58) {
                candidates.push(other);
            }
        }
        if (candidates.length < 1) return false;
        const members = [character.id, candidates[0].id];
        if (candidates[1] && this.getRelationship(candidates[0], candidates[1]) > 30) {
            members.push(candidates[1].id);
        }
        const groupType = this.pickGroupTypeFromMembers(members);
        return !!this.createSocialGroup(groupType, members);
    };

    EmergentManager.evaluateGroupMembership = function(character, group, state) {
        if (!character || !group || !character.isAlive) return { joinScore: -999, leaveScore: 999 };
        const members = Array.isArray(group.members) ? group.members : [];
        let relationTotal = 0;
        let relationCount = 0;
        for (const memberId of members) {
            if (memberId === character.id) continue;
            const member = this.getCharacter(memberId);
            if (!member || !member.isAlive) continue;
            relationTotal += this.getRelationship(character, member);
            relationCount++;
        }
        const avgRelationship = relationCount > 0 ? relationTotal / relationCount : 0;
        const goalAlignment = this.getGoalAlignmentScore(character, group.goal);
        const foodNeed = Number(state.variables && state.variables.foodSupply || 0) < 30 ? 8 : 0;
        const safetyNeed = Number(state.variables && state.variables.banditPower || 0) > 45 ? 8 : 0;
        const wealthNeed = Number(state.variables && state.variables.prosperity || 0) < 25 ? 6 : 0;
        const needScore = foodNeed + safetyNeed + wealthNeed;

        const joinScore = avgRelationship * 0.45 + goalAlignment + needScore + (group.cohesion * 0.15);
        const leaveScore = (20 - avgRelationship) + Math.max(0, 12 - goalAlignment) + Math.max(0, 40 - group.cohesion);
        return { joinScore, leaveScore };
    };

    EmergentManager.processGroupInternalEconomy = function(group) {
        if (!group || !group.resources) return;
        const members = group.members.map(id => this.getCharacter(id)).filter(c => c && c.isAlive);
        if (members.length === 0) return;
        const wealthyTraders = members.filter(c => c.role === "Trader").length;
        const defenders = members.filter(c => c.faction === "bandits" || c.role === "Leader").length;

        group.resources.food = Math.max(0, group.resources.food + 1 - Math.floor(members.length / 4));
        group.resources.wealth = Math.max(0, group.resources.wealth + wealthyTraders * 2);
        group.resources.military = Math.max(0, group.resources.military + defenders - 1);

        if (group.resources.food > 25 && group.cohesion > 60) {
            group.resources.food -= 3;
            group.resources.wealth += 1;
        }
    };

    EmergentManager.performGroupAction = function(group, state) {
        if (!group) return;
        this.processGroupInternalEconomy(group);
        this.updateGroupCohesion(group);
        group.lastActionTick = Number(state.ticks || 0);

        if (group.goal === "expand trade wealth") {
            group.resources.wealth += 2;
            this.modFactionStat("merchants", "wealth", 1);
            this.logEvent("social_group_trade", { groupId: group.id, wealth: group.resources.wealth });
        } else if (group.goal === "defend territory" || group.goal === "recruit defenders") {
            group.resources.military += 2;
            this.logEvent("social_group_defense", { groupId: group.id, military: group.resources.military });
        } else if (group.goal === "dominate rivals") {
            const rival = this.findRivalGroup(group, state);
            if (rival) {
                const damage = Math.max(1, Math.floor(group.resources.military / 8));
                rival.resources.wealth = Math.max(0, rival.resources.wealth - damage);
                rival.cohesion = Math.max(0, rival.cohesion - (3 + Math.randomInt(4)));
                this.logEvent("social_group_conflict", {
                    attackerGroupId: group.id,
                    defenderGroupId: rival.id,
                    damage: damage
                });
            }
        }
    };

    EmergentManager.findRivalGroup = function(group, state) {
        const groups = Object.values(state.socialGroups || {});
        const rivals = groups.filter(g => g.id !== group.id && g.members.length > 0);
        if (rivals.length === 0) return null;
        rivals.sort((a, b) => (a.cohesion || 0) - (b.cohesion || 0));
        return rivals[0];
    };

    EmergentManager.refreshGroupRelationships = function(state) {
        const groups = Object.values(state.socialGroups || {});
        for (const group of groups) {
            if (!group.relationships || typeof group.relationships !== "object") group.relationships = {};
        }
        for (let i = 0; i < groups.length; i++) {
            for (let j = i + 1; j < groups.length; j++) {
                const a = groups[i];
                const b = groups[j];
                const hostility = (a.goal === "dominate rivals" || b.goal === "dominate rivals") ? -12 : 4;
                const delta = hostility + Math.floor((a.cohesion + b.cohesion - 100) / 20);
                const oldAB = Number(a.relationships[b.id]) || 0;
                const oldBA = Number(b.relationships[a.id]) || 0;
                a.relationships[b.id] = Math.max(-100, Math.min(100, oldAB + delta));
                b.relationships[a.id] = Math.max(-100, Math.min(100, oldBA + delta));
            }
        }
    };

    const _logEvent = EmergentManager.logEvent;
    EmergentManager.logEvent = function(type, payload) {
        _logEvent.call(this, type, payload);
        if (!$gameSystem || !$gameSystem.emergentState) return;
        const state = this.ensureSocialNarrativeState($gameSystem.emergentState());
        if (!state || !Array.isArray(state.eventLog) || state.eventLog.length === 0) return;
        const entry = state.eventLog[state.eventLog.length - 1];
        if (entry && entry.id === undefined) {
            entry.id = Number(state.eventIdCounter || 0);
            state.eventIdCounter = entry.id + 1;
        }
    };

    EmergentManager.createNarrative = function(type, participants, eventIds, summary) {
        const state = this.ensureSocialNarrativeState();
        if (!state) return null;
        const id = `narrative_${state.narrativeIdCounter++}`;
        const narrative = {
            id: id,
            type: String(type || "conflict"),
            participants: Array.isArray(participants) ? [...new Set(participants.map(p => String(p)))] : [],
            startTick: Number(state.ticks || 0),
            lastUpdateTick: Number(state.ticks || 0),
            status: "active",
            events: Array.isArray(eventIds) ? [...new Set(eventIds)] : [],
            summary: String(summary || "A new story has emerged from the simulation.")
        };
        state.narratives.push(narrative);
        this.logEvent("narrative_created", { narrativeId: narrative.id, type: narrative.type, participants: narrative.participants });
        return narrative;
    };

    EmergentManager.updateNarrative = function(narrative, eventIds, participants, summary) {
        const state = this.ensureSocialNarrativeState();
        if (!state || !narrative) return;
        narrative.lastUpdateTick = Number(state.ticks || 0);
        if (Array.isArray(eventIds)) {
            for (const eventId of eventIds) {
                if (!narrative.events.includes(eventId)) narrative.events.push(eventId);
            }
        }
        if (Array.isArray(participants)) {
            for (const participant of participants.map(p => String(p))) {
                if (!narrative.participants.includes(participant)) narrative.participants.push(participant);
            }
        }
        if (summary) narrative.summary = String(summary);
        this.logEvent("narrative_updated", { narrativeId: narrative.id, type: narrative.type, status: narrative.status });
    };

    EmergentManager.resolveNarrative = function(narrative, summary) {
        const state = this.ensureSocialNarrativeState();
        if (!state || !narrative || narrative.status === "resolved") return;
        narrative.status = "resolved";
        narrative.lastUpdateTick = Number(state.ticks || 0);
        if (summary) narrative.summary = String(summary);
        this.logEvent("narrative_resolved", { narrativeId: narrative.id, type: narrative.type, summary: narrative.summary });
    };

    EmergentManager.generateNarrativeSummary = function(type, data) {
        if (type === "conflict") {
            return "A violent conflict erupted between rival groups, leaving the region destabilized.";
        }
        if (type === "rise") {
            return "A small social group grew rapidly into a major force.";
        }
        if (type === "collapse") {
            return "After losing leadership and cohesion, a once-organized group collapsed.";
        }
        if (type === "betrayal") {
            return "A trusted member betrayed their allies and shifted loyalties.";
        }
        return "New social tensions evolved into an emerging local story.";
    };

    EmergentManager.getActiveNarrativeByTypeAndParticipants = function(type, participants) {
        const state = this.ensureSocialNarrativeState();
        if (!state) return null;
        const required = new Set((participants || []).map(p => String(p)));
        return state.narratives.find(n => {
            if (n.status !== "active" || n.type !== type) return false;
            const existing = new Set((n.participants || []).map(p => String(p)));
            for (const req of required) {
                if (!existing.has(req)) return false;
            }
            return true;
        }) || null;
    };

    EmergentManager.detectNarratives = function(state) {
        const safeState = this.ensureSocialNarrativeState(state);
        if (!safeState || !Array.isArray(safeState.eventLog)) return;
        const events = safeState.eventLog;
        const recentEvents = events.slice(-80);

        // Rule 1: repeated group aggression -> conflict narrative.
        const conflictPairs = {};
        for (const event of recentEvents) {
            if (event.type !== "social_group_conflict") continue;
            const a = String(event.data && event.data.attackerGroupId || "");
            const b = String(event.data && event.data.defenderGroupId || "");
            if (!a || !b) continue;
            const key = [a, b].sort().join("|");
            if (!conflictPairs[key]) conflictPairs[key] = { count: 0, eventIds: [] };
            conflictPairs[key].count++;
            if (event.id !== undefined) conflictPairs[key].eventIds.push(event.id);
        }

        for (const key in conflictPairs) {
            const info = conflictPairs[key];
            if (info.count < CONFLICT_REPEAT_THRESHOLD) continue;
            const participants = key.split("|");
            const existing = this.getActiveNarrativeByTypeAndParticipants("conflict", participants);
            const summary = this.generateNarrativeSummary("conflict");
            if (existing) {
                this.updateNarrative(existing, info.eventIds, participants, summary);
            } else {
                this.createNarrative("conflict", participants, info.eventIds, summary);
            }
        }

        // Rule 2: rapid group growth -> rise narrative.
        for (const group of Object.values(safeState.socialGroups || {})) {
            if (!group || !Array.isArray(group.members)) continue;
            const createdTick = Number(group.lastActionTick || 0);
            const age = Number(safeState.ticks || 0) - createdTick;
            if (group.members.length >= 6 && age <= 25) {
                const participants = [group.id];
                const existing = this.getActiveNarrativeByTypeAndParticipants("rise", participants);
                const relatedEventIds = recentEvents
                    .filter(e => e.type === "social_group_created" || e.type === "social_group_joined")
                    .map(e => e.id)
                    .filter(id => id !== undefined);
                if (existing) {
                    this.updateNarrative(existing, relatedEventIds, participants, this.generateNarrativeSummary("rise"));
                } else {
                    this.createNarrative("rise", participants, relatedEventIds, this.generateNarrativeSummary("rise"));
                }
            }
        }

        // Rule 3: faction switch after positive ties -> betrayal narrative.
        const factionSwitches = recentEvents.filter(e => e.type === "npc_faction_changed");
        for (const shift of factionSwitches) {
            const data = shift.data || {};
            if (!data.characterId || !data.fromFaction || !data.toFaction || data.fromFaction === data.toFaction) continue;
            const char = this.getCharacter(Number(data.characterId));
            if (!char) continue;
            const betrayalSignal = (Number(char.opinions && char.opinions[data.fromFaction]) || 0) > 10;
            if (!betrayalSignal) continue;
            const participants = [String(data.characterId), `faction_${String(data.fromFaction)}`];
            const existing = this.getActiveNarrativeByTypeAndParticipants("betrayal", participants);
            const summary = this.generateNarrativeSummary("betrayal");
            if (existing) {
                this.updateNarrative(existing, [shift.id].filter(id => id !== undefined), participants, summary);
            } else {
                this.createNarrative("betrayal", participants, [shift.id].filter(id => id !== undefined), summary);
            }
        }

        this.resolveNarratives(safeState);
    };

    EmergentManager.resolveNarratives = function(state) {
        const safeState = this.ensureSocialNarrativeState(state);
        if (!safeState) return;
        for (const narrative of safeState.narratives) {
            if (!narrative || narrative.status !== "active") continue;
            if (narrative.type === "conflict") {
                const livingGroups = narrative.participants
                    .map(p => this.getGroup(p))
                    .filter(g => g && g.members.some(memberId => {
                        const c = this.getCharacter(memberId);
                        return c && c.isAlive;
                    }));
                if (livingGroups.length < 2 || livingGroups.every(g => g.cohesion < 25)) {
                    this.resolveNarrative(narrative, "The conflict burned out as participants were scattered or exhausted.");
                }
            } else if (narrative.type === "rise") {
                const group = this.getGroup(narrative.participants[0]);
                if (!group || group.members.length < 3 || group.cohesion < 25) {
                    this.resolveNarrative(narrative, "The rapid rise stalled as the group lost momentum.");
                }
            } else if (narrative.type === "collapse") {
                const group = this.getGroup(narrative.participants[0]);
                if (!group || group.members.length <= 1) {
                    this.resolveNarrative(narrative, "The collapsed group fully dissolved.");
                }
            } else if (narrative.type === "betrayal") {
                if ((Number(safeState.ticks || 0) - Number(narrative.lastUpdateTick || 0)) > 20) {
                    this.resolveNarrative(narrative, "The betrayal settled into a new political reality.");
                }
            }
        }
    };

    EmergentManager.checkGroupCollapseSignals = function(state) {
        for (const group of Object.values(state.socialGroups || {})) {
            if (!group) continue;
            const leader = this.getCharacter(group.leaderId);
            const leaderDead = !leader || !leader.isAlive;
            if (leaderDead && group.cohesion < 35) {
                const participants = [group.id];
                const existing = this.getActiveNarrativeByTypeAndParticipants("collapse", participants);
                const summary = this.generateNarrativeSummary("collapse");
                if (existing) {
                    this.updateNarrative(existing, [], participants, summary);
                } else {
                    this.createNarrative("collapse", participants, [], summary);
                }
            }
        }
    };

    const _buildDecisionContext = EmergentManager.buildDecisionContext;
    EmergentManager.buildDecisionContext = function(character, state) {
        const context = _buildDecisionContext.call(this, character, state);
        const group = this.getCharacterGroup(character);
        if (group) {
            context.groupId = group.id;
            context.groupGoal = group.goal;
            context.groupCohesion = Number(group.cohesion || 0);
            context.isLeader = group.leaderId === character.id;
            context.groupLeaderId = group.leaderId;
            context.groupStrength = Math.max(Number(context.groupStrength || 0), Number(group.cohesion || 0));
        } else {
            context.groupId = null;
            context.groupGoal = null;
            context.groupCohesion = 0;
            context.isLeader = false;
        }
        return context;
    };

    const _scoreAction = EmergentManager.scoreAction;
    EmergentManager.scoreAction = function(character, action, context) {
        let score = _scoreAction.call(this, character, action, context);
        if (!context || !context.groupId) return score;

        const goal = String(context.groupGoal || "");
        const cohesion = Number(context.groupCohesion || 0);
        const isLeader = !!context.isLeader;

        if (goal.includes("trade") && action === "trade") score += 12 + Math.floor(cohesion / 20);
        if ((goal.includes("defend") || goal.includes("recruit")) && (action === "seek_safety" || action === "support_group_action")) {
            score += 8 + Math.floor(cohesion / 25);
        }
        if (goal.includes("dominate") && action === "act_aggressively") score += 10 + Math.floor(cohesion / 20);
        if (!isLeader && context.groupLeaderId !== null && action === "follow_leader_action") score += 6 + Math.floor(cohesion / 18);
        if (isLeader && action === "support_group_action") score += 6;
        return score;
    };

    const _applySocialInfluence = EmergentManager.applySocialInfluence;
    EmergentManager.applySocialInfluence = function(actor, action, state) {
        _applySocialInfluence.call(this, actor, action, state);
        if (!actor || !actor.isAlive) return;
        const actorGroup = this.getCharacterGroup(actor);
        if (!actorGroup) return;

        const observers = this.getNearbyNPCs(actor, state);
        for (const observer of observers) {
            if (!observer || !observer.isAlive || observer.id === actor.id) continue;
            const observerGroup = this.getCharacterGroup(observer);
            const sameGroup = observerGroup && observerGroup.id === actorGroup.id;
            const rivalGroup = observerGroup && actorGroup.relationships && Number(actorGroup.relationships[observerGroup.id]) < -20;
            if (sameGroup) {
                this.updateRelationship(observer, actor, 2);
                if (action === "support_group_action" || action === "follow_leader_action") {
                    this.updateOpinion(observer, actor.faction, 1);
                }
            } else if (rivalGroup && (action === "act_aggressively" || action === "support_group_action")) {
                this.updateRelationship(observer, actor, -2);
                this.updateOpinion(observer, actor.faction, -1);
            }
        }
    };

    const _killCharacter = EmergentManager.killCharacter;
    EmergentManager.killCharacter = function(id, reason) {
        const char = this.getCharacter(id);
        const groupId = char ? char.groupId : null;
        _killCharacter.call(this, id, reason);
        if (!char || !groupId) return;
        this.removeCharacterFromGroup(char, groupId);
    };

    EmergentManager.registerTickHandler("social_groups", 27, function(state) {
        const safeState = this.ensureSocialNarrativeState(state);
        if (!safeState) return;

        const characters = Array.isArray(safeState.characters) ? safeState.characters : [];
        let checks = 0;
        for (const character of characters) {
            if (checks >= MAX_FORMATION_CHECKS_PER_TICK) break;
            if (!character || !character.isAlive || character.groupId) continue;
            checks++;
            if (Math.randomInt(100) < 25) {
                this.tryFormGroupFromCharacter(character, safeState);
            }
        }

        const groups = Object.values(safeState.socialGroups || {});
        for (const group of groups) {
            if (!group) continue;

            // Remove dead members first.
            const aliveMembers = group.members.filter(memberId => {
                const c = this.getCharacter(memberId);
                return c && c.isAlive;
            });
            if (aliveMembers.length !== group.members.length) {
                group.members = aliveMembers;
            }
            if (group.members.length === 0) {
                delete safeState.socialGroups[group.id];
                continue;
            }
            if (!group.members.includes(group.leaderId)) {
                group.leaderId = group.members[0];
            }

            this.performGroupAction(group, safeState);

            // Recruit attempt.
            if (Math.randomInt(100) < 18) {
                const outsider = characters.find(c => c && c.isAlive && !c.groupId);
                if (outsider) {
                    const evalResult = this.evaluateGroupMembership(outsider, group, safeState);
                    if (evalResult.joinScore >= 35) {
                        this.addCharacterToGroup(outsider, group.id);
                        this.logEvent("social_group_joined", {
                            groupId: group.id,
                            characterId: outsider.id,
                            characterName: outsider.name
                        });
                    }
                }
            }

            // Leave check for unhappy members.
            for (const memberId of [...group.members]) {
                const member = this.getCharacter(memberId);
                if (!member || !member.isAlive) continue;
                const evalResult = this.evaluateGroupMembership(member, group, safeState);
                if (evalResult.leaveScore > 55) {
                    this.removeCharacterFromGroup(member, group.id);
                    this.logEvent("social_group_left", {
                        groupId: group.id,
                        characterId: member.id,
                        characterName: member.name
                    });
                }
            }
        }

        this.refreshGroupRelationships(safeState);
        this.checkGroupCollapseSignals(safeState);
    });

    EmergentManager.registerTickHandler("narrative_detection", 35, function(state) {
        const safeState = this.ensureSocialNarrativeState(state);
        if (!safeState) return;
        if (Number(safeState.ticks || 0) % NARRATIVE_SCAN_INTERVAL !== 0) return;
        this.detectNarratives(safeState);
    });

    //-------------------------------------------------------------------------
    // Debug Commands (non-simulation mutating)
    //-------------------------------------------------------------------------
    PluginManager.registerCommand(pluginName, "DebugSocialSnapshot", () => {
        if (!$gameSystem || !$gameSystem.emergentState) return;
        const state = EmergentManager.ensureSocialNarrativeState($gameSystem.emergentState());
        if (!state) return;

        const groups = Object.values(state.socialGroups || {});
        const narratives = Array.isArray(state.narratives) ? state.narratives : [];
        const activeNarratives = narratives.filter(n => n && n.status === "active");

        const groupSummary = groups.map(g => ({
            id: g.id,
            type: g.type,
            members: g.members.length,
            leaderId: g.leaderId,
            cohesion: g.cohesion,
            goal: g.goal,
            resources: g.resources
        }));

        const narrativeSummary = narratives.map(n => ({
            id: n.id,
            type: n.type,
            status: n.status,
            participants: n.participants,
            summary: n.summary
        }));

        console.log("[Emergent Social Snapshot]", {
            tick: state.ticks,
            groups: groupSummary,
            narratives: narrativeSummary
        });

        if ($gameMessage) {
            $gameMessage.add(`Social Groups: ${groups.length}`);
            $gameMessage.add(`Narratives: ${narratives.length} (${activeNarratives.length} active)`);
        }
    });

    PluginManager.registerCommand(pluginName, "DebugNarrativeSummary", () => {
        if (!$gameSystem || !$gameSystem.emergentState) return;
        const state = EmergentManager.ensureSocialNarrativeState($gameSystem.emergentState());
        if (!state) return;

        const narratives = Array.isArray(state.narratives) ? state.narratives : [];
        const compact = narratives.map(n => `${n.id}: ${n.type} [${n.status}] - ${n.summary}`);
        console.log("[Emergent Narrative Summary]", compact);

        if ($gameMessage) {
            if (compact.length === 0) {
                $gameMessage.add("No narratives yet.");
                return;
            }
            const maxLines = Math.min(3, compact.length);
            for (let i = 0; i < maxLines; i++) {
                $gameMessage.add(compact[i]);
            }
        }
    });
})();
