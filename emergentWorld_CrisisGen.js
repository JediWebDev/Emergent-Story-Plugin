/*:
 * @target MZ
 * @plugindesc [v2.0] Central Crisis — Narrative Engine (replaces History epochs)
 * @author dijOTTER
 * @base EmergentWorld_Core
 *
 * @help emergentWorld_CrisisGen.js
 * One Central Crisis is chosen at new game bootstrap and drives the world.
 * World tension (0–100) escalates on narrative turns (not real-time frames).
 */

var Imported = Imported || {};
Imported.EmergentWorld_CrisisGen = true;

(() => {
    /**
     * Predefined crises — vertical slice. Expand this table for more campaigns.
     */
    EmergentManager.CENTRAL_CRISES = [
        {
            id: "UNDEAD_PLAGUE",
            name: "Undead Plague",
            antagonist: "Lich King Valthor",
            tensionStart: 30
        },
        {
            id: "ELEMENTAL_RIFTS",
            name: "Elemental Rifts",
            antagonist: "Archmage Sel'Kara",
            tensionStart: 25
        },
        {
            id: "CIVIL_WAR",
            name: "Succession War",
            antagonist: "Rebel Houses",
            tensionStart: 40
        }
    ];

    const _Game_System_initialize = Game_System.prototype.initialize;
    Game_System.prototype.initialize = function() {
        _Game_System_initialize.call(this);
        if (!this._emergentState) this._emergentState = {};
        const s = this._emergentState;
        // Crisis fields (filled on bootstrap by generateCentralCrisis)
        if (s.currentCrisisId === undefined) s.currentCrisisId = null;
        if (s.currentAntagonist === undefined) s.currentAntagonist = null;
        if (s.worldTension === undefined) s.worldTension = 0;
        if (!Array.isArray(s.worldHistory)) s.worldHistory = [];
    };

    /**
     * Picks one crisis for this playthrough and seeds tension.
     * Call only from WorldBootstrap (not mid-save reload without intent).
     */
    EmergentManager.generateCentralCrisis = function() {
        if (window.EMERGENT_WORLD_INITIALIZED) return null;
        if (!window.EMERGENT_WORLD_BOOTSTRAPPING) {
            console.warn("[CrisisGen] Blocked out-of-order generateCentralCrisis.");
            return null;
        }
        const state = $gameSystem.emergentState();
        const list = this.CENTRAL_CRISES;
        const pick = list[Math.randomInt(list.length)];
        state.currentCrisisId = pick.id;
        state.currentAntagonist = pick.antagonist;
        state.worldTension = Math.max(0, Math.min(100, Number(pick.tensionStart) || 0));
        state.worldHistory.push(`Central crisis: ${pick.name} — threat: ${pick.antagonist}`);
        this.logEvent("central_crisis_chosen", {
            crisisId: pick.id,
            crisisName: pick.name,
            antagonist: pick.antagonist,
            worldTension: state.worldTension
        });
        return pick;
    };

    EmergentManager.getCurrentCrisis = function() {
        const state = $gameSystem && $gameSystem.emergentState ? $gameSystem.emergentState() : null;
        if (!state || !state.currentCrisisId) return null;
        return this.CENTRAL_CRISES.find(c => c.id === state.currentCrisisId) || {
            id: state.currentCrisisId,
            name: state.currentCrisisId,
            antagonist: state.currentAntagonist || "Unknown",
            tensionStart: state.worldTension
        };
    };

    EmergentManager.modifyWorldTension = function(amount) {
        const state = $gameSystem.emergentState();
        const prev = Number(state.worldTension) || 0;
        const next = Math.max(0, Math.min(100, prev + (Number(amount) || 0)));
        state.worldTension = next;
        this.logEvent("world_tension_changed", { previous: prev, delta: amount, next: next });
        return next;
    };

    EmergentManager.getWorldTension = function() {
        return Number($gameSystem.emergentState().worldTension) || 0;
    };
})();
