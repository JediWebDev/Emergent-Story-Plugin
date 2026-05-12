/*:
 * @target MZ
 * @plugindesc [v2.0] Faction Leaders — Narrative Engine (replaces procedural NPCs)
 * @author dijOTTER
 * @base EmergentWorld_Core
 * @base EmergentWorld_Factions
 *
 * @help emergentWorld_Characters.js
 * Only key actors (one Leader per major faction). No per-tick NPC simulation.
 */

var Imported = Imported || {};
Imported.EmergentWorld_Characters = true;

(() => {
    /** One leader per narrative role (resolved to faction ids at bootstrap). */
    const LEADER_NARRATIVE_ROLE_ORDER = ["CROWN", "REBEL_HOUSE", "MERCENARY", "ECCLESIASTICAL", "ARCANE"];

    const LEADER_NAMES_BY_ROLE = {
        CROWN: "High Steward Elena Langford",
        REBEL_HOUSE: "Lord Varick Blackwood",
        MERCENARY: "Warlord Isa Redbane",
        ECCLESIASTICAL: "Archconfessor Marius Kell",
        ARCANE: "Provost Nimirael Ash"
    };

    const _Game_System_initialize = Game_System.prototype.initialize;
    Game_System.prototype.initialize = function() {
        _Game_System_initialize.call(this);
        if (!this._emergentState) this._emergentState = {};
        if (!Array.isArray(this._emergentState.leaders)) this._emergentState.leaders = [];
    };

    /**
     * Hostility switches (MZ map #) — tune to your project or drive via plugin commands.
     */
    EmergentManager.FACTION_HOSTILITY_SWITCH_IDS = {
        langford: 61,
        blackwood: 62,
        redbane: 63,
        church: 64,
        mage_guild: 65
    };

    /** When faction ids are renamed (e.g. MZ database keys), map narrativeRole to switches. */
    EmergentManager.FACTION_HOSTILITY_SWITCH_IDS_BY_ROLE = {
        CROWN: 61,
        REBEL_HOUSE: 62,
        MERCENARY: 63,
        ECCLESIASTICAL: 64,
        ARCANE: 65
    };

    EmergentManager.refreshFactionHostilitySwitches = function() {
        const state = $gameSystem.emergentState();
        const factions = state.factions || {};
        for (const fid of Object.keys(factions)) {
            const f = factions[fid];
            let sw = this.FACTION_HOSTILITY_SWITCH_IDS[fid];
            if (sw == null && f && f.narrativeRole && this.FACTION_HOSTILITY_SWITCH_IDS_BY_ROLE) {
                sw = this.FACTION_HOSTILITY_SWITCH_IDS_BY_ROLE[f.narrativeRole];
            }
            if (sw == null) continue;
            const hostile = !!(f && f.hostileToPlayer);
            if ($gameSwitches) $gameSwitches.setValue(sw, hostile);
        }
    };

    EmergentManager.generateLeadersForWorld = function() {
        if (window.EMERGENT_WORLD_INITIALIZED) return;
        if (!window.EMERGENT_WORLD_BOOTSTRAPPING) {
            console.warn("[Leaders] Blocked out-of-order generateLeadersForWorld.");
            return;
        }
        const state = $gameSystem.emergentState();
        const crisis = typeof this.getCurrentCrisis === "function" ? this.getCurrentCrisis() : null;
        const crisisId = crisis ? crisis.id : "CIVIL_WAR";

        state.leaders = [];
        for (const narrativeRole of LEADER_NARRATIVE_ROLE_ORDER) {
            const factionId =
                typeof this.resolveFactionIdForNarrativeRole === "function"
                    ? this.resolveFactionIdForNarrativeRole(narrativeRole)
                    : null;
            if (!factionId) continue;
            const faction = this.getFaction(factionId);
            if (!faction) continue;

            const traits = Array.isArray(faction.crisisTraits) ? faction.crisisTraits.slice() : [];
            const primaryTrait = traits[0] || "OPPORTUNIST";

            const leader = {
                id: `leader_${factionId}`,
                name: LEADER_NAMES_BY_ROLE[narrativeRole] || `Leader of ${factionId}`,
                factionId: factionId,
                trait: primaryTrait,
                relationshipToPlayer: 0,
                stanceOnCrisis: "UNDECIDED",
                power: Math.max(0, Math.min(100, Number(faction.power) || 50))
            };
            state.leaders.push(leader);
            faction.leaderId = leader.id;
        }

        this.logEvent("leaders_generated", {
            count: state.leaders.length,
            crisisId: crisisId,
            leaderIds: state.leaders.map(l => l.id)
        });
    };

    EmergentManager.getLeader = function(id) {
        const state = $gameSystem.emergentState();
        const lid = String(id || "");
        return (state.leaders || []).find(l => l && l.id === lid) || null;
    };

    EmergentManager.getLeaders = function() {
        const state = $gameSystem.emergentState();
        return Array.isArray(state.leaders) ? state.leaders.slice() : [];
    };

    /** Used by quests / events: leaders for a faction (usually one). */
    EmergentManager.getLeadersByFaction = function(factionId) {
        const fid = String(factionId || "");
        return this.getLeaders().filter(l => l.factionId === fid);
    };

    EmergentManager.modifyRelationship = function(leaderId, amount) {
        const leader = this.getLeader(leaderId);
        if (!leader) return null;
        const prev = Number(leader.relationshipToPlayer) || 0;
        let next = prev + (Number(amount) || 0);
        next = Math.round(Math.max(-100, Math.min(100, next)));
        leader.relationshipToPlayer = next;

        const faction = this.getFaction(leader.factionId);
        if (faction) {
            const wasHostile = !!faction.hostileToPlayer;
            faction.hostileToPlayer = next < -50;
            if (wasHostile !== faction.hostileToPlayer) {
                this.logEvent("faction_hostility_changed", {
                    factionId: leader.factionId,
                    hostileToPlayer: faction.hostileToPlayer,
                    leaderId: leader.id,
                    relationshipToPlayer: next
                });
            }
        }

        this.refreshFactionHostilitySwitches();
        this.logEvent("leader_relationship_changed", {
            leaderId: leader.id,
            leaderName: leader.name,
            previous: prev,
            delta: amount,
            next: next
        });
        return next;
    };

    EmergentManager.setLeaderStance = function(leaderId, stance) {
        const leader = this.getLeader(leaderId);
        if (!leader) return false;
        leader.stanceOnCrisis = String(stance || "UNDECIDED");
        this.logEvent("leader_stance_changed", { leaderId: leader.id, stance: leader.stanceOnCrisis });
        return true;
    };

    // --- Legacy API stubs (quests / integration) — map to leaders, not NPCs ---
    EmergentManager.getCharacter = function(id) {
        return this.getLeader(id);
    };

    EmergentManager.getCharactersByFaction = function(factionId) {
        return this.getLeadersByFaction(factionId);
    };
})();
