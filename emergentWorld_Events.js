/*:
 * @target MZ
 * @plugindesc [v2.0] Crisis-driven events (replaces random economy rules)
 * @author dijOTTER
 * @base EmergentWorld_Core
 * @base EmergentWorld_Factions
 * @base EmergentWorld_Characters
 *
 * @help emergentWorld_Events.js
 * generateCrisisEvent(leader, action, crisis) produces thematic consequences.
 * Applied from EmergentManager.tickSimulation (narrative turns only).
 */

var Imported = Imported || {};
Imported.EmergentWorld_Events = true;

(() => {
    /**
     * Build a narrative event from a leader action + active crisis.
     * @param {object} leader
     * @param {{ type: string, target: string, intensity: number }} action
     * @param {object|null} crisis
     */
    EmergentManager.generateCrisisEvent = function(leader, action, crisis) {
        if (!leader || !action) return null;
        const cid = crisis && crisis.id ? crisis.id : "CIVIL_WAR";
        const at = String(action.type || "HOLD");
        const trait = String(leader.trait || "");

        let title = "Political maneuver";
        let summary = `${leader.name} (${leader.factionId}) chose ${at}.`;
        let tensionDelta = 1 + Math.floor(Number(action.intensity) / 4);
        let relationshipDelta = 0;
        const factionDeltas = {};

        // --- Thematic bundles (cause → effect for logging) ---
        if (cid === "UNDEAD_PLAGUE" && at === "COWARDICE") {
            title = "Villages Abandoned";
            summary = "Panic spreads; the undead claim more ground.";
            tensionDelta = 6;
            relationshipDelta = -4;
            factionDeltas.villagers = { military: -3, power: -2 };
            factionDeltas.bandits = { military: 2 };
        } else if (cid === "ELEMENTAL_RIFTS" && at === "INQUISITION") {
            title = "The Inquisition";
            summary = "Magic is banned; mages and allies are hunted.";
            tensionDelta = 5;
            relationshipDelta = trait === "PURIST" ? -10 : -6;
            factionDeltas.merchants = { wealth: -5 };
            factionDeltas.valemont = { military: 2 };
        } else if (cid === "CIVIL_WAR" && at === "COUP_PRESSURE") {
            title = "Succession Ultimatum";
            summary = "Rebel houses demand the crown; loyalists mobilize.";
            tensionDelta = 7;
            relationshipDelta = -3;
            factionDeltas.caelmont = { military: 3 };
            factionDeltas.valemont = { military: 3 };
        } else if (at === "MILITARY_WITHDRAWAL") {
            title = "Defensive pullback";
            summary = "Forces consolidate; the crisis fills the vacuum.";
            tensionDelta = 3;
            relationshipDelta = -2;
            factionDeltas[leader.factionId] = { military: -2, power: -1 };
        } else if (at === "EXPLOIT_CRISIS") {
            title = "Exploitation of chaos";
            summary = `${leader.name} profits while others bleed.`;
            tensionDelta = 2;
            relationshipDelta = -5;
            factionDeltas[leader.factionId] = { wealth: 6, power: 4 };
            factionDeltas.villagers = { wealth: -4 };
        } else if (at === "CRUSADE") {
            title = "Holy strike";
            summary = "A coordinated push against the threat.";
            tensionDelta = -4;
            relationshipDelta = 4;
            factionDeltas[leader.factionId] = { military: -4, power: 2 };
            factionDeltas.bandits = { military: -2 };
        } else if (at === "DESPERATE_MEASURES") {
            title = "Threshold breach";
            summary = "Extreme orders ripple across the realm.";
            tensionDelta = 8;
            relationshipDelta = -6;
        } else {
            tensionDelta = 2;
            relationshipDelta = 0;
        }

        return {
            id: `evt_${cid}_${at}_${Date.now()}`,
            title: title,
            summary: summary,
            crisisId: cid,
            leaderId: leader.id,
            leaderName: leader.name,
            actionType: at,
            tensionDelta: tensionDelta,
            relationshipDelta: relationshipDelta,
            factionDeltas: factionDeltas
        };
    };

    EmergentManager.applyCrisisEvent = function(event, leader) {
        if (!event) return;
        if (typeof this.modifyWorldTension === "function") {
            this.modifyWorldTension(Number(event.tensionDelta) || 0);
        }
        const deltas = event.factionDeltas || {};
        for (const fid of Object.keys(deltas)) {
            const pack = deltas[fid];
            if (!pack) continue;
            for (const stat of Object.keys(pack)) {
                this.modFactionStat(fid, stat, Number(pack[stat]) || 0);
            }
        }
        if (leader && event.relationshipDelta !== undefined && event.relationshipDelta !== 0) {
            this.modifyRelationship(leader.id, Number(event.relationshipDelta) || 0);
        }
    };
})();
