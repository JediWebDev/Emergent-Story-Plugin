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
 * Consequences target factions by narrativeRole (see EmergentWorld_Factions), not hardcoded ids.
 */

var Imported = Imported || {};
Imported.EmergentWorld_Events = true;

(() => {
    function resolveRole(em, role) {
        if (!em || typeof em.resolveFactionIdForNarrativeRole !== "function") return null;
        return em.resolveFactionIdForNarrativeRole(role);
    }

    function addFactionPack(em, factionDeltas, role, pack) {
        const fid = resolveRole(em, role);
        if (!fid || !pack) return;
        const prev = factionDeltas[fid] || {};
        const merged = Object.assign({}, prev);
        for (const k of Object.keys(pack)) {
            merged[k] = (Number(merged[k]) || 0) + (Number(pack[k]) || 0);
        }
        factionDeltas[fid] = merged;
    }

    function pushRoleRelation(em, list, fromRole, toRole, delta, symmetric) {
        const a = resolveRole(em, fromRole);
        const b = resolveRole(em, toRole);
        if (!a || !b) return;
        list.push({ from: a, to: b, delta: delta, symmetric: !!symmetric });
    }

    /**
     * Build a narrative event from a leader action + active crisis.
     * @param {object} leader
     * @param {{ type: string, target: string, intensity: number }} action
     * @param {object|null} crisis
     */
    EmergentManager.generateCrisisEvent = function(leader, action, crisis) {
        if (!leader || !action) return null;
        const em = this;
        const cid = crisis && crisis.id ? crisis.id : "CIVIL_WAR";
        const at = String(action.type || "HOLD");
        const trait = String(leader.trait || "");

        let title = "Political maneuver";
        let summary = `${leader.name} (${leader.factionId}) chose ${at}.`;
        let tensionDelta = 1 + Math.floor(Number(action.intensity) / 4);
        let relationshipDelta = 0;
        const factionDeltas = {};
        const interFactionAdjustments = [];

        // --- Thematic bundles (roles → resolved faction ids in applyCrisisEvent) ---
        if (cid === "UNDEAD_PLAGUE" && at === "COWARDICE") {
            title = "Villages Abandoned";
            summary = "Panic spreads; the undead claim more ground.";
            tensionDelta = 6;
            relationshipDelta = -4;
            addFactionPack(em, factionDeltas, "ECCLESIASTICAL", { military: -3, power: -2 });
            addFactionPack(em, factionDeltas, "MERCENARY", { military: 2 });
            pushRoleRelation(em, interFactionAdjustments, "ECCLESIASTICAL", "MERCENARY", -5, true);
        } else if (cid === "ELEMENTAL_RIFTS" && at === "INQUISITION") {
            title = "The Inquisition";
            summary = "Magic is banned; mages and allies are hunted.";
            tensionDelta = 5;
            relationshipDelta = trait === "PURIST" ? -10 : -6;
            addFactionPack(em, factionDeltas, "ARCANE", { wealth: -5 });
            addFactionPack(em, factionDeltas, "ECCLESIASTICAL", { military: 2 });
            pushRoleRelation(em, interFactionAdjustments, "ECCLESIASTICAL", "ARCANE", -12, true);
        } else if (cid === "CIVIL_WAR" && at === "COUP_PRESSURE") {
            title = "Succession Ultimatum";
            summary = "Rebel houses demand the crown; loyalists mobilize.";
            tensionDelta = 7;
            relationshipDelta = -3;
            addFactionPack(em, factionDeltas, "CROWN", { military: 3 });
            addFactionPack(em, factionDeltas, "REBEL_HOUSE", { military: 3 });
            const crownId = resolveRole(em, "CROWN");
            const rebelId = resolveRole(em, "REBEL_HOUSE");
            if (rebelId && crownId) {
                interFactionAdjustments.push(
                    { from: rebelId, to: crownId, delta: -10, symmetric: false },
                    { from: crownId, to: rebelId, delta: -10, symmetric: false }
                );
            }
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
            addFactionPack(em, factionDeltas, "ECCLESIASTICAL", { wealth: -4 });
            if (typeof EmergentManager.getPrimaryRivalFaction === "function") {
                const rival = EmergentManager.getPrimaryRivalFaction(leader.factionId);
                if (rival) {
                    interFactionAdjustments.push({
                        from: leader.factionId,
                        to: rival,
                        delta: -7,
                        symmetric: true
                    });
                }
            }
        } else if (at === "CRUSADE") {
            title = "Holy strike";
            summary = "A coordinated push against the threat.";
            tensionDelta = -4;
            relationshipDelta = 4;
            factionDeltas[leader.factionId] = { military: -4, power: 2 };
            addFactionPack(em, factionDeltas, "MERCENARY", { military: -2 });
            pushRoleRelation(em, interFactionAdjustments, "CROWN", "ECCLESIASTICAL", 3, true);
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
            factionDeltas: factionDeltas,
            interFactionAdjustments: interFactionAdjustments
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
        const ifList = event.interFactionAdjustments;
        if (Array.isArray(ifList) && typeof this.modifyInterFactionStanding === "function") {
            for (const adj of ifList) {
                if (!adj || adj.from == null || adj.to == null) continue;
                this.modifyInterFactionStanding(
                    String(adj.from),
                    String(adj.to),
                    Number(adj.delta) || 0,
                    { symmetric: !!adj.symmetric }
                );
            }
        }
    };
})();
