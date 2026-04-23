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
    /** Factions that receive a named leader in the vertical slice (4–6 total). */
    const LEADER_FACTION_ORDER = ["caelmont", "valemont", "merchants", "villagers", "bandits"];

    const LEADER_NAMES = {
        caelmont: "Queen Morwen Caelmont",
        valemont: "Duke Aldric Valemont",
        merchants: "Guildmaster Seren",
        villagers: "Elder Bram of Aldenmere",
        bandits: "Ash Wolf Mara"
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
        caelmont: 61,
        valemont: 62,
        merchants: 63,
        villagers: 64,
        bandits: 65
    };

    EmergentManager.refreshFactionHostilitySwitches = function() {
        const state = $gameSystem.emergentState();
        const factions = state.factions || {};
        for (const fid of Object.keys(factions)) {
            const sw = this.FACTION_HOSTILITY_SWITCH_IDS[fid];
            if (sw == null) continue;
            const f = factions[fid];
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
        for (const factionId of LEADER_FACTION_ORDER) {
            const faction = this.getFaction(factionId);
            if (!faction) continue;

            const traits = Array.isArray(faction.crisisTraits) ? faction.crisisTraits.slice() : [];
            const primaryTrait = traits[0] || "OPPORTUNIST";

            const leader = {
                id: `leader_${factionId}`,
                name: LEADER_NAMES[factionId] || `Leader of ${factionId}`,
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
