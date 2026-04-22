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
    const MAX_GROUP_FORMATIONS_PER_TICK = 2;
    const NARRATIVE_SCAN_INTERVAL = 5;
    const CONFLICT_REPEAT_THRESHOLD = 3;
    const RELATIONSHIP_UPDATES_PER_ACTOR_PER_TICK = 2;
    const RELATIONSHIP_PAIR_COOLDOWN_TICKS = 3;
    const OPINION_UPDATES_PER_ACTOR_PER_TICK = 2;
    const OPINION_TARGET_COOLDOWN_TICKS = 4;
    const OPINION_MAX_TOTAL_DRIFT_PER_TICK = 2;
    const RECENT_GROUP_ACTION_WINDOW = 25;
    const OPINION_RANDOM_VARIANCE = 1;
    const DECISION_DIVERGENCE_THRESHOLD = 0.65;
    const DECISION_DIVERGENCE_MIN_SAMPLES = 3;
    const DECISION_DIVERGENCE_REDUCTION = 0.45;

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
        if (!safeState.relationshipUpdateBudgets || typeof safeState.relationshipUpdateBudgets !== "object") {
            safeState.relationshipUpdateBudgets = {};
        }
        if (!safeState.relationshipPairCooldowns || typeof safeState.relationshipPairCooldowns !== "object") {
            safeState.relationshipPairCooldowns = {};
        }
        if (!safeState.recentInteractions || typeof safeState.recentInteractions !== "object") {
            safeState.recentInteractions = {};
        }
        if (!safeState.displayNameRegistry || typeof safeState.displayNameRegistry !== "object") {
            safeState.displayNameRegistry = {};
        }
        if (!safeState.opinionUpdateBudgets || typeof safeState.opinionUpdateBudgets !== "object") {
            safeState.opinionUpdateBudgets = {};
        }
        if (!safeState.opinionTargetCooldowns || typeof safeState.opinionTargetCooldowns !== "object") {
            safeState.opinionTargetCooldowns = {};
        }
        if (!safeState.opinionTickCache || typeof safeState.opinionTickCache !== "object") {
            safeState.opinionTickCache = {};
        }
        if (!safeState.factionDecisionDivergence || typeof safeState.factionDecisionDivergence !== "object") {
            safeState.factionDecisionDivergence = { tick: -1, factions: {} };
        }
        return safeState;
    };

    EmergentManager.socialNarrativeDebug = function(message, payload) {
        if (!this.debugLogs) return;
        if (payload !== undefined) {
            console.log(`[SocialNarrative] ${message}`, payload);
        } else {
            console.log(`[SocialNarrative] ${message}`);
        }
    };

    EmergentManager.ensureDisplayName = function(character, state) {
        if (!character) return "Unknown";
        const safeState = this.ensureSocialNarrativeState(state);
        if (!safeState) return String(character.name || "Unknown");
        if (character.displayName) return character.displayName;
        const baseName = String(character.name || "Unknown");
        const faction = String(character.faction || "none");
        const role = String(character.role || "NPC");
        const baseKey = `${baseName}|${faction}|${role}`;
        const nextCount = Number(safeState.displayNameRegistry[baseKey] || 0) + 1;
        safeState.displayNameRegistry[baseKey] = nextCount;
        character.displayName = `${baseName} (${faction}/${role}#${nextCount})`;
        return character.displayName;
    };

    EmergentManager.getCharacterLabel = function(character, state) {
        if (!character) return "Unknown";
        return this.ensureDisplayName(character, state);
    };

    EmergentManager.ensurePersonalityProfile = function(character) {
        if (!character) return null;
        if (character.socialPersonality && typeof character.socialPersonality === "object") {
            return character.socialPersonality;
        }
        const role = String(character.role || "");
        const faction = String(character.faction || "");
        const personality = {
            cautious: Math.randomInt(100) < (role === "Citizen" ? 48 : 30),
            greedy: Math.randomInt(100) < (role === "Trader" ? 68 : 25),
            loyal: Math.randomInt(100) < (faction === "villagers" ? 50 : 38),
            distrustful: Math.randomInt(100) < (faction === "bandits" ? 52 : 30)
        };
        if (!personality.cautious && !personality.greedy && !personality.loyal && !personality.distrustful) {
            const fallback = ["cautious", "greedy", "loyal", "distrustful"][Math.randomInt(4)];
            personality[fallback] = true;
        }
        character.socialPersonality = personality;
        return personality;
    };

    EmergentManager.getPersonalityOpinionModifier = function(character, targetKey, baseDelta) {
        const personality = this.ensurePersonalityProfile(character) || {};
        const ownFaction = String(character && character.faction || "");
        let modifier = 1;

        if (personality.greedy && targetKey === "merchants" && baseDelta > 0) modifier += 0.45;
        if (personality.distrustful) modifier += baseDelta > 0 ? -0.55 : 0.25;
        if (personality.cautious && baseDelta !== 0) modifier += baseDelta > 0 ? -0.15 : -0.05;
        if (personality.loyal) {
            if (targetKey === ownFaction && baseDelta > 0) modifier += 0.4;
            if (targetKey !== ownFaction && baseDelta > 0) modifier -= 0.3;
            if (targetKey !== ownFaction && baseDelta < 0) modifier += 0.2;
        }
        return Math.max(-1.5, Math.min(2.0, modifier));
    };

    EmergentManager.interpretOpinionDelta = function(character, targetKey, baseDelta, sourceKey) {
        if (!baseDelta) {
            return {
                finalDelta: 0,
                personalityModifier: 1,
                randomness: 0
            };
        }
        const personalityModifier = this.getPersonalityOpinionModifier(character, targetKey, baseDelta);
        const randomness = Math.randomInt((OPINION_RANDOM_VARIANCE * 2) + 1) - OPINION_RANDOM_VARIANCE;
        let finalDelta = Math.round((baseDelta * personalityModifier) + randomness);
        if (finalDelta === 0 && Math.abs(baseDelta) >= 1) {
            finalDelta = Math.randomInt(100) < 60 ? Math.sign(baseDelta) : 0;
        }
        this.socialNarrativeDebug("Opinion interpreted", {
            characterId: character && character.id,
            target: targetKey,
            source: sourceKey,
            baseDelta: baseDelta,
            personalityModifier: personalityModifier,
            randomness: randomness,
            finalDelta: finalDelta
        });
        return {
            finalDelta: finalDelta,
            personalityModifier: personalityModifier,
            randomness: randomness
        };
    };

    EmergentManager.getRecentMemoryActionBias = function(character, action) {
        const memory = Array.isArray(character && character.memory) ? character.memory.slice(-5) : [];
        if (memory.length === 0) return 0;
        let bias = 0;
        for (const entry of memory) {
            if (!entry) continue;
            const type = String(entry.type || "");
            const target = String(entry.target || "");
            const value = Number(entry.value || 0);
            if (action === "trade" && (type.includes("trade") || target === "merchants")) bias += 4 + Math.floor(value / 3);
            if (action === "act_aggressively" && (type.includes("aggressive") || target === "bandits")) bias += 3 + Math.floor(value / 4);
            if (action === "seek_safety" && (type.includes("seek_safety") || type.includes("avoid_conflict"))) bias += 3 + Math.floor(value / 4);
            if (action === "follow_leader_action" && type.includes("follow_leader")) bias += 3 + Math.floor(value / 5);
            if (action === "support_group_action" && type.includes("group_support")) bias += 4 + Math.floor(value / 4);
        }
        return bias;
    };

    EmergentManager.getPersonalityDecisionWeightMultiplier = function(character, action) {
        const personality = this.ensurePersonalityProfile(character) || {};
        let multiplier = 1;
        if (personality.greedy && action === "trade") multiplier += 0.35;
        if (personality.cautious && (action === "seek_safety" || action === "avoid_conflict")) multiplier += 0.3;
        if (personality.cautious && action === "act_aggressively") multiplier -= 0.3;
        if (personality.distrustful && action === "act_aggressively") multiplier += 0.28;
        if (personality.loyal && (action === "follow_leader_action" || action === "support_group_action")) multiplier += 0.25;
        return Math.max(0.2, Math.min(2.2, multiplier));
    };

    EmergentManager.getOpinionActionBias = function(character, action) {
        const opinions = character && character.opinions ? character.opinions : {};
        const merchantsOpinion = Number(opinions.merchants || 0);
        const banditsOpinion = Number(opinions.bandits || 0);
        const ownFactionOpinion = Number(opinions[String(character && character.faction || "")] || 0);
        if (action === "trade") return Math.floor(merchantsOpinion / 8);
        if (action === "act_aggressively") return Math.floor(banditsOpinion / 10);
        if (action === "support_group_action" || action === "follow_leader_action") return Math.floor(ownFactionOpinion / 9);
        return 0;
    };

    EmergentManager.getFactionDivergenceTracker = function(state, tick, factionId) {
        const safeState = this.ensureSocialNarrativeState(state);
        if (!safeState) return null;
        if (!safeState.factionDecisionDivergence || safeState.factionDecisionDivergence.tick !== tick) {
            safeState.factionDecisionDivergence = { tick: tick, factions: {} };
        }
        const factionKey = String(factionId || "none");
        if (!safeState.factionDecisionDivergence.factions[factionKey]) {
            safeState.factionDecisionDivergence.factions[factionKey] = { total: 0, counts: {} };
        }
        return safeState.factionDecisionDivergence.factions[factionKey];
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
        const validMembers = Array.isArray(members) ? members.filter((id) => {
            if (id == null) return false;
            if (typeof id !== "string") {
                console.warn("[WorldBootstrap] createSocialGroup member id expected string npc.id, got:", typeof id, id);
                return false;
            }
            return !!this.getCharacter(id);
        }) : [];
        if (validMembers.length < 2) return null;

        const id = `group_${state.socialGroupIdCounter++}`;
        const leaderId = validMembers[0];
        const normalizedType = String(type || "band");
        const group = {
            id: id,
            type: normalizedType,
            members: [...new Set(validMembers.map(n => n))],
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
            if (member) {
                member.groupId = id;
                this.ensureDisplayName(member, state);
            }
        }

        this.logEvent("social_group_created", {
            groupId: id,
            type: group.type,
            leaderId: group.leaderId,
            memberCount: group.members.length,
            members: group.members
                .map(memberId => this.getCharacter(memberId))
                .filter(Boolean)
                .map(member => this.getCharacterLabel(member, state))
        });
        this.socialNarrativeDebug("Group created", { groupId: id, type: group.type, memberCount: group.members.length });
        return group;
    };

    EmergentManager.addCharacterToGroup = function(character, groupId) {
        if (!character || groupId === undefined || groupId === null) return false;
        const group = this.getGroup(groupId);
        if (!group) return false;
        if (!group.members.includes(character.id)) group.members.push(character.id);
        character.groupId = group.id;
        this.ensureDisplayName(character);
        if (!this.getCharacter(group.leaderId) || !group.members.includes(group.leaderId)) {
            group.leaderId = character.id;
        }
        this.updateGroupCohesion(group);
        this.logEvent("character_joined_group", {
            groupId: group.id,
            characterId: character.id,
            characterName: this.getCharacterLabel(character)
        });
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

    EmergentManager.getMemorySimilarityScore = function(a, b) {
        const aMemory = Array.isArray(a && a.memory) ? a.memory.slice(-4) : [];
        const bMemory = Array.isArray(b && b.memory) ? b.memory.slice(-4) : [];
        if (aMemory.length === 0 || bMemory.length === 0) return 0;
        const aTypes = new Set(aMemory.map(m => String(m.type || "unknown")));
        const bTypes = new Set(bMemory.map(m => String(m.type || "unknown")));
        let overlap = 0;
        for (const type of aTypes) {
            if (bTypes.has(type)) overlap++;
        }
        return Math.floor((overlap / Math.max(1, Math.min(aTypes.size, bTypes.size))) * 100);
    };

    EmergentManager.tryFormGroupFromCharacter = function(character, state) {
        if (!character || !character.isAlive || character.groupId) return false;
        const nearby = this.getNearbyNPCs(character, state);
        const candidates = [];
        this.socialNarrativeDebug("Formation attempt", { characterId: character.id, nearbyCount: nearby.length });
        for (const other of nearby) {
            if (!other || !other.isAlive || other.groupId) continue;
            const relationship = this.getRelationship(character, other);
            const opinionSimilarity = this.getOpinionSimilarityScore(character, other);
            const memorySimilarity = this.getMemorySimilarityScore(character, other);
            const sharedFaction = character.faction === other.faction;
            const passesAffinity = relationship > 12 || sharedFaction;
            const passesSocialSimilarity = opinionSimilarity > 45 || memorySimilarity > 35;
            if (passesAffinity && passesSocialSimilarity) {
                candidates.push(other);
            }
        }
        if (candidates.length < 1) return false;
        const members = [character.id, candidates[0].id];
        if (candidates[1] && (this.getRelationship(candidates[0], candidates[1]) > 10 || candidates[0].faction === candidates[1].faction)) {
            members.push(candidates[1].id);
        }
        const groupType = this.pickGroupTypeFromMembers(members);
        const created = !!this.createSocialGroup(groupType, members);
        if (created) {
            this.socialNarrativeDebug("Formation success", {
                starter: this.getCharacterLabel(character, state),
                groupType: groupType,
                memberCount: members.length
            });
        }
        return created;
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
            this.logEvent("social_group_trade", {
                groupId: group.id,
                wealth: group.resources.wealth,
                cohesion: group.cohesion
            });
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
        const noisyRelationshipType = entry && entry.type === "npc_relationship_changed";
        if (!noisyRelationshipType && this.debugLogs) {
            this.socialNarrativeDebug(`event:${String(type)}`, entry && entry.data ? entry.data : {});
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
        this.socialNarrativeDebug("Narrative created", { id: narrative.id, type: narrative.type, participants: narrative.participants });
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
        this.socialNarrativeDebug("Narrative scan running", {
            tick: safeState.ticks,
            recentEvents: recentEvents.length,
            activeNarratives: safeState.narratives.filter(n => n && n.status === "active").length
        });

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
            this.socialNarrativeDebug("Narrative rule:conflict evaluated", { pair: key, count: info.count });
            if (info.count < CONFLICT_REPEAT_THRESHOLD) {
                this.socialNarrativeDebug("Narrative rule:conflict rejected", { pair: key, reason: "below threshold" });
                continue;
            }
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
                this.socialNarrativeDebug("Narrative candidate:rise", { groupId: group.id, members: group.members.length, age: age });
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
            if (!(group.members.length >= 6 && age <= 25)) {
                this.socialNarrativeDebug("Narrative rule:rise rejected", {
                    groupId: group.id,
                    members: group.members.length,
                    age: age
                });
            }
        }

        // Rule 3: faction switch after positive ties -> betrayal narrative.
        const factionSwitches = recentEvents.filter(e => e.type === "npc_faction_changed");
        for (const shift of factionSwitches) {
            const data = shift.data || {};
            if (!data.characterId || !data.fromFaction || !data.toFaction || data.fromFaction === data.toFaction) continue;
            const char = this.getCharacter(data.characterId);
            if (!char) continue;
            const betrayalSignal = (Number(char.opinions && char.opinions[data.fromFaction]) || 0) > 10;
            if (!betrayalSignal) {
                this.socialNarrativeDebug("Narrative rule:betrayal rejected", {
                    characterId: data.characterId,
                    reason: "insufficient positive prior loyalty"
                });
                continue;
            }
            const participants = [String(data.characterId), `faction_${String(data.fromFaction)}`];
            this.socialNarrativeDebug("Narrative candidate:betrayal", { participants: participants });
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
        context.personality = this.ensurePersonalityProfile(character);
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

    const _decideAction = EmergentManager.decideAction;
    EmergentManager.decideAction = function(character, context) {
        if (!character || !character.isAlive) return _decideAction.call(this, character, context);
        this.ensurePersonalityProfile(character);

        const actions = this.getAvailableActions(character);
        if (!Array.isArray(actions) || actions.length === 0) {
            return _decideAction.call(this, character, context);
        }

        const safeState = this.ensureSocialNarrativeState();
        const tick = Number(context && context.tick || (safeState && safeState.ticks) || 0);
        const tracker = this.getFactionDivergenceTracker(safeState, tick, character.faction);

        const weighted = actions.map(action => {
            const baseScore = Number(this.scoreAction(character, action, context) || 0);
            const memoryBias = this.getRecentMemoryActionBias(character, action);
            const opinionBias = this.getOpinionActionBias(character, action);
            const personalityMult = this.getPersonalityDecisionWeightMultiplier(character, action);
            let weight = Math.max(0.2, baseScore + memoryBias + opinionBias);
            weight *= personalityMult;

            if (tracker && tracker.total >= DECISION_DIVERGENCE_MIN_SAMPLES) {
                const currentCount = Number(tracker.counts[action] || 0);
                const projectedShare = (currentCount + 1) / (tracker.total + 1);
                if (projectedShare > DECISION_DIVERGENCE_THRESHOLD) {
                    weight *= DECISION_DIVERGENCE_REDUCTION;
                }
            }
            return {
                action: action,
                baseScore: baseScore,
                memoryBias: memoryBias,
                opinionBias: opinionBias,
                personalityMult: personalityMult,
                weight: Math.max(0.05, weight)
            };
        });

        const totalWeight = weighted.reduce((sum, item) => sum + item.weight, 0);
        if (totalWeight <= 0) return _decideAction.call(this, character, context);

        let roll = Math.random() * totalWeight;
        let chosen = weighted[weighted.length - 1].action;
        for (const item of weighted) {
            roll -= item.weight;
            if (roll <= 0) {
                chosen = item.action;
                break;
            }
        }

        if (tracker) {
            tracker.total += 1;
            tracker.counts[chosen] = Number(tracker.counts[chosen] || 0) + 1;
        }

        this.socialNarrativeDebug("Decision weighted selection", {
            characterId: character.id,
            faction: character.faction,
            tick: tick,
            chosen: chosen,
            weights: weighted.map(item => ({
                action: item.action,
                base: item.baseScore,
                memoryBias: item.memoryBias,
                opinionBias: item.opinionBias,
                personalityMult: item.personalityMult,
                finalWeight: Number(item.weight.toFixed(3))
            })),
            factionDistribution: tracker ? { total: tracker.total, counts: tracker.counts } : null
        });

        return chosen;
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

    const _generateCharacter = EmergentManager.generateCharacter;
    EmergentManager.generateCharacter = function(factionId, role) {
        const created = _generateCharacter.call(this, factionId, role);
        if (created) {
            this.ensureDisplayName(created);
            this.ensurePersonalityProfile(created);
        }
        return created;
    };

    const _updateRelationship = EmergentManager.updateRelationship;
    EmergentManager.updateRelationship = function(a, b, delta) {
        if (!a || !b || a.id === b.id) return;
        const state = this.ensureSocialNarrativeState();
        if (!state) return _updateRelationship.call(this, a, b, delta);

        const currentTick = Number(state.ticks || 0);
        const actorBudget = state.relationshipUpdateBudgets[a.id];
        if (!actorBudget || actorBudget.tick !== currentTick) {
            state.relationshipUpdateBudgets[a.id] = { tick: currentTick, used: 0 };
        }

        const budget = state.relationshipUpdateBudgets[a.id];
        const pairKey = [String(a.id), String(b.id)].sort().join("|");
        const cooldownTick = Number(state.relationshipPairCooldowns[pairKey] || -9999);
        const isPairCoolingDown = (currentTick - cooldownTick) < RELATIONSHIP_PAIR_COOLDOWN_TICKS;

        const sameFaction = a.faction === b.faction;
        const sameGroup = a.groupId && b.groupId && a.groupId === b.groupId;
        const recentInteractionKey = `${a.id}|${b.id}`;
        const recentInteractionTick = Number(state.recentInteractions[recentInteractionKey] || -9999);
        const recentlyInteracted = (currentTick - recentInteractionTick) <= 4;
        const prioritized = sameFaction || sameGroup || recentlyInteracted;

        if (budget.used >= RELATIONSHIP_UPDATES_PER_ACTOR_PER_TICK && !prioritized) return;
        if (isPairCoolingDown && !prioritized) return;

        _updateRelationship.call(this, a, b, delta);
        budget.used++;
        state.relationshipPairCooldowns[pairKey] = currentTick;
        state.recentInteractions[`${a.id}|${b.id}`] = currentTick;
        state.recentInteractions[`${b.id}|${a.id}`] = currentTick;
    };

    const _updateOpinion = EmergentManager.updateOpinion;
    EmergentManager.updateOpinion = function(character, target, value, source) {
        if (!character || target === undefined || target === null) return;
        const state = this.ensureSocialNarrativeState();
        if (!state) return _updateOpinion.call(this, character, target, value);

        if (typeof character.id !== "string") {
            console.warn("[WorldBootstrap] updateOpinion expected string npc.id, got:", typeof character.id, character.id);
        }
        const charId = String(character.id);
        const targetKey = String(target);
        const sourceKey = String(source || "unknown");
        const currentTick = Number(state.ticks || 0);
        this.ensurePersonalityProfile(character);
        const baseDelta = Number(value) || 0;
        const interpretation = this.interpretOpinionDelta(character, targetKey, baseDelta, sourceKey);
        const requestedDelta = Number(interpretation.finalDelta) || 0;
        if (requestedDelta === 0) return;

        const budgetKey = String(charId);
        const existingBudget = state.opinionUpdateBudgets[budgetKey];
        if (!existingBudget || existingBudget.tick !== currentTick) {
            state.opinionUpdateBudgets[budgetKey] = { tick: currentTick, used: 0, driftApplied: 0 };
        }
        const budget = state.opinionUpdateBudgets[budgetKey];

        const tickCacheKey = `${charId}|${targetKey}|${currentTick}`;
        const existingTickRecord = state.opinionTickCache[tickCacheKey] || null;
        const cooldownKey = `${charId}|${targetKey}`;
        const cooldownTick = Number(state.opinionTargetCooldowns[cooldownKey] || -9999);
        const onCooldown = (currentTick - cooldownTick) < OPINION_TARGET_COOLDOWN_TICKS;

        const sameFactionTarget = targetKey === String(character.faction || "");
        const currentGroup = this.getCharacterGroup(character);
        const groupGoal = String(currentGroup && currentGroup.goal || "");
        const targetSupportsGroup = groupGoal.includes("trade") && targetKey === "merchants";
        const prioritizedOpinionUpdate = sameFactionTarget || targetSupportsGroup;

        // Tick-level dedup + source arbitration.
        if (existingTickRecord) {
            if (existingTickRecord.bySource && existingTickRecord.bySource[sourceKey] !== undefined) {
                this.socialNarrativeDebug("Opinion skip: duplicate in same tick", {
                    characterId: charId,
                    target: targetKey,
                    source: sourceKey
                });
                return;
            }

            // Source guard: only strongest delta survives same-tick contention.
            if (Math.abs(requestedDelta) <= Math.abs(existingTickRecord.appliedDelta || 0)) {
                if (!existingTickRecord.bySource) existingTickRecord.bySource = {};
                existingTickRecord.bySource[sourceKey] = requestedDelta;
                this.socialNarrativeDebug("Opinion skip: weaker delta ignored", {
                    characterId: charId,
                    target: targetKey,
                    source: sourceKey,
                    incoming: requestedDelta,
                    kept: existingTickRecord.appliedDelta
                });
                return;
            }
        } else if (onCooldown && !prioritizedOpinionUpdate) {
            this.socialNarrativeDebug("Opinion skip: cooldown active", {
                characterId: charId,
                target: targetKey,
                source: sourceKey,
                cooldownSinceTick: cooldownTick
            });
            return;
        }

        if (budget.used >= OPINION_UPDATES_PER_ACTOR_PER_TICK && !existingTickRecord && !prioritizedOpinionUpdate) {
            this.socialNarrativeDebug("Opinion skip: budget exceeded", {
                characterId: charId,
                source: sourceKey,
                used: budget.used
            });
            return;
        }

        // Apply total drift clamp per tick per character.
        let proposedDelta = requestedDelta;
        if (existingTickRecord) {
            // Replace weaker same-tick update with stronger one (delta adjustment only).
            proposedDelta = requestedDelta - Number(existingTickRecord.appliedDelta || 0);
        }

        const minRemaining = -OPINION_MAX_TOTAL_DRIFT_PER_TICK - Number(budget.driftApplied || 0);
        const maxRemaining = OPINION_MAX_TOTAL_DRIFT_PER_TICK - Number(budget.driftApplied || 0);
        const clampedDelta = Math.max(minRemaining, Math.min(maxRemaining, proposedDelta));
        if (clampedDelta === 0) {
            this.socialNarrativeDebug("Opinion skip: per-tick drift cap reached", {
                characterId: charId,
                source: sourceKey,
                driftApplied: budget.driftApplied
            });
            return;
        }

        _updateOpinion.call(this, character, targetKey, clampedDelta);

        budget.driftApplied += clampedDelta;
        if (!existingTickRecord) {
            budget.used += 1;
        }
        state.opinionTargetCooldowns[cooldownKey] = currentTick;

        const nextRecord = existingTickRecord || {
            tick: currentTick,
            appliedDelta: 0,
            bySource: {}
        };
        nextRecord.appliedDelta = (existingTickRecord ? Number(existingTickRecord.appliedDelta || 0) : 0) + clampedDelta;
        nextRecord.bySource[sourceKey] = requestedDelta;
        state.opinionTickCache[tickCacheKey] = nextRecord;
    };

    EmergentManager.registerTickHandler("social_groups", 27, function(state) {
        const safeState = this.ensureSocialNarrativeState(state);
        if (!safeState) return;
        this.socialNarrativeDebug("social_groups tick", {
            tick: safeState.ticks,
            groupCount: Object.keys(safeState.socialGroups || {}).length
        });

        const characters = Array.isArray(safeState.characters) ? safeState.characters : [];
        let checks = 0;
        let formations = 0;
        for (const character of characters) {
            if (!character || !character.isAlive) continue;
            this.ensureDisplayName(character, safeState);
            if (formations >= MAX_GROUP_FORMATIONS_PER_TICK) break;
            if (checks >= MAX_FORMATION_CHECKS_PER_TICK) break;
            if (character.groupId) continue;
            checks++;

            // Higher chance early so groups become visible in first 5-10 ticks.
            const earlyTicks = Number(safeState.ticks || 0) <= 10;
            const chance = earlyTicks ? 75 : 35;
            if (Math.randomInt(100) < chance) {
                if (this.tryFormGroupFromCharacter(character, safeState)) formations++;
            }
        }
        this.socialNarrativeDebug("social_groups formation summary", { checks: checks, formations: formations });

        for (const character of characters) {
            if (!character || !character.isAlive) continue;
            this.ensureDisplayName(character, safeState);
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
                            characterName: this.getCharacterLabel(outsider, safeState)
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
                        characterName: this.getCharacterLabel(member, safeState)
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
        const recentGroupActions = (state.eventLog || [])
            .filter(e => {
                const eventAge = Number(state.ticks || 0) - Number(e.timestamp || 0);
                const groupEventTypes = {
                    social_group_created: true,
                    social_group_trade: true,
                    social_group_conflict: true,
                    social_group_disbanded: true,
                    character_joined_group: true
                };
                return eventAge <= RECENT_GROUP_ACTION_WINDOW && !!groupEventTypes[e.type];
            })
            .slice(-8)
            .map(e => `${e.type}@${e.timestamp}`);

        console.log("[Emergent Social Snapshot]", {
            tick: state.ticks,
            groups: groupSummary,
            narratives: narrativeSummary,
            recentGroupActions: recentGroupActions
        });

        if ($gameMessage) {
            $gameMessage.add(`Social Groups: ${groups.length}`);
            $gameMessage.add(`Narratives: ${narratives.length} (${activeNarratives.length} active)`);
            if (recentGroupActions.length > 0) {
                $gameMessage.add(`Recent Group Actions: ${recentGroupActions.length}`);
            }
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
