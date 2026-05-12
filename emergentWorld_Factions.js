/*:
 * @target MZ
 * @plugindesc [v2.0] Crisis-driven factions (one leader each, no economy tick sim)
 * @author dijOTTER
 * @base EmergentWorld_Core
 *
 * @help emergentWorld_Factions.js
 * Factions react to the Central Crisis via crisisTraits and decideLeaderAction().
 * No automatic map-time simulation — narrative turns live in EmergentManager.tickSimulation.
 *
 * Inter-faction standings live in emergentState.factionRelations[fromId][toId] (-100..100).
 * Use getInterFactionStanding / modifyInterFactionStanding / isInterFactionHostile.
 * Each faction object may set narrativeRole ("CROWN", "REBEL_HOUSE", "MERCENARY",
 * "ECCLESIASTICAL", "ARCANE") so crisis logic tracks your MZ database faction ids.
 */

var Imported = Imported || {};
Imported.EmergentWorld_Factions = true;

(() => {
    /**
     * Thematic roles for crisis logic (independent of save-game faction id strings).
     * Align these with your database faction rows via faction.narrativeRole, or rely on
     * default id fallbacks below (langford = CROWN, etc.).
     */
    const NARRATIVE_ROLE = {
        CROWN: "CROWN",
        REBEL_HOUSE: "REBEL_HOUSE",
        MERCENARY: "MERCENARY",
        ECCLESIASTICAL: "ECCLESIASTICAL",
        ARCANE: "ARCANE"
    };

    /** If no faction declares narrativeRole, resolveRole falls back to these ids when present. */
    EmergentManager.DEFAULT_FACTION_ID_FOR_NARRATIVE_ROLE = {
        CROWN: "langford",
        REBEL_HOUSE: "blackwood",
        MERCENARY: "redbane",
        ECCLESIASTICAL: "church",
        ARCANE: "mage_guild"
    };

    const LEGACY_FACTION_ID_TO_NARRATIVE_ROLE = {
        langford: "CROWN",
        blackwood: "REBEL_HOUSE",
        redbane: "MERCENARY",
        church: "ECCLESIASTICAL",
        mage_guild: "ARCANE"
    };

    /** Sorted keys of state.factions — relation matrix is built from whoever exists in the save. */
    function getFactionMatrixIds(state) {
        const fac = state && state.factions ? state.factions : {};
        const keys = Object.keys(fac).filter(id => fac[id]);
        return keys.length ? keys.slice().sort() : [];
    }

    /**
     * Symmetric baseline rivalries by narrative role (resolved to ids at bootstrap / ensure).
     */
    const INTER_FACTION_SYMMETRIC_BY_ROLE = [
        ["ECCLESIASTICAL", "ARCANE", -58],
        ["CROWN", "REBEL_HOUSE", -42],
        ["REBEL_HOUSE", "ECCLESIASTICAL", -18],
        ["MERCENARY", "ECCLESIASTICAL", -28],
        ["MERCENARY", "CROWN", -22],
        ["ARCANE", "REBEL_HOUSE", 8],
        ["CROWN", "ECCLESIASTICAL", 32],
        ["CROWN", "ARCANE", 12],
        ["MERCENARY", "ARCANE", -5],
        ["MERCENARY", "REBEL_HOUSE", 15]
    ];

    EmergentManager.INTER_FACTION_HOSTILE_THRESHOLD = -45;

    EmergentManager.ensureFactionNarrativeRoles = function() {
        const state = $gameSystem.emergentState();
        const fac = state.factions || {};
        for (const fid of Object.keys(fac)) {
            const f = fac[fid];
            if (!f || f.narrativeRole) continue;
            const inferred = LEGACY_FACTION_ID_TO_NARRATIVE_ROLE[fid];
            if (inferred) f.narrativeRole = inferred;
        }
    };

    /**
     * Resolve a thematic role to the current save's faction id (MZ-friendly).
     * @param {string} role e.g. "CROWN", "ARCANE"
     * @returns {string|null}
     */
    EmergentManager.resolveFactionIdForNarrativeRole = function(role) {
        const r = String(role || "");
        if (!r) return null;
        this.ensureFactionNarrativeRoles();
        const state = $gameSystem.emergentState();
        const fac = state.factions || {};
        for (const fid of Object.keys(fac)) {
            const f = fac[fid];
            if (f && f.narrativeRole === r) return fid;
        }
        const defaults = this.DEFAULT_FACTION_ID_FOR_NARRATIVE_ROLE || {};
        const fallbackId = defaults[r];
        return fallbackId && fac[fallbackId] ? fallbackId : null;
    };

    function buildBaseFactionRelations(state) {
        const ids = getFactionMatrixIds(state);
        const rel = {};
        for (const a of ids) {
            rel[a] = {};
            for (const b of ids) {
                rel[a][b] = a === b ? 0 : 0;
            }
        }
        const em = EmergentManager;
        for (const row of INTER_FACTION_SYMMETRIC_BY_ROLE) {
            const v = Number(row[2]) || 0;
            const a = typeof em.resolveFactionIdForNarrativeRole === "function"
                ? em.resolveFactionIdForNarrativeRole(row[0])
                : null;
            const b = typeof em.resolveFactionIdForNarrativeRole === "function"
                ? em.resolveFactionIdForNarrativeRole(row[1])
                : null;
            if (a && b && rel[a] && rel[b] && a !== b) {
                rel[a][b] = v;
                rel[b][a] = v;
            }
        }
        return rel;
    }

    EmergentManager.ensureFactionRelations = function() {
        const state = $gameSystem.emergentState();
        this.ensureFactionNarrativeRoles();
        const base = buildBaseFactionRelations(state);
        if (!state.factionRelations || typeof state.factionRelations !== "object") {
            state.factionRelations = base;
            return;
        }
        const ids = getFactionMatrixIds(state);
        for (const a of ids) {
            if (!state.factionRelations[a] || typeof state.factionRelations[a] !== "object") {
                state.factionRelations[a] = {};
            }
            for (const b of ids) {
                if (a === b) continue;
                if (typeof state.factionRelations[a][b] !== "number" || Number.isNaN(state.factionRelations[a][b])) {
                    const fallback = base[a] && typeof base[a][b] === "number" ? base[a][b] : 0;
                    state.factionRelations[a][b] = fallback;
                }
            }
        }
    };

    EmergentManager.initializeInterFactionRelations = function() {
        const state = $gameSystem.emergentState();
        this.ensureFactionNarrativeRoles();
        state.factionRelations = buildBaseFactionRelations(state);
        this.logEvent("inter_faction_relations_initialized", { factions: getFactionMatrixIds(state) });
    };

    /**
     * @param {string} fromFactionId
     * @param {string} toFactionId
     * @returns {number}
     */
    EmergentManager.getInterFactionStanding = function(fromFactionId, toFactionId) {
        const from = String(fromFactionId || "");
        const to = String(toFactionId || "");
        if (!from || !to || from === to) return 0;
        this.ensureFactionRelations();
        const row = $gameSystem.emergentState().factionRelations[from];
        if (!row) return 0;
        const v = row[to];
        return typeof v === "number" && !Number.isNaN(v) ? v : 0;
    };

    /**
     * @param {string} fromFactionId
     * @param {string} toFactionId
     * @param {number} delta
     * @param {{ symmetric?: boolean }} [opts]
     */
    EmergentManager.modifyInterFactionStanding = function(fromFactionId, toFactionId, delta, opts) {
        const from = String(fromFactionId || "");
        const to = String(toFactionId || "");
        const d = Number(delta) || 0;
        if (!from || !to || from === to || d === 0) return null;
        this.ensureFactionRelations();
        const state = $gameSystem.emergentState();
        const rel = state.factionRelations;
        const symmetric = !!(opts && opts.symmetric);

        const applyOne = (a, b, amount) => {
            if (!rel[a] || !rel[b]) return;
            const prev = rel[a][b];
            let next = (typeof prev === "number" ? prev : 0) + amount;
            next = Math.round(Math.max(-100, Math.min(100, next)));
            rel[a][b] = next;
            this.logEvent("inter_faction_standing_changed", {
                fromFactionId: a,
                toFactionId: b,
                delta: amount,
                previousValue: prev,
                newValue: next
            });
            return next;
        };

        const out = applyOne(from, to, d);
        if (symmetric) applyOne(to, from, d);
        return out;
    };

    /**
     * @param {string} factionA
     * @param {string} factionB
     * @param {number} [threshold]
     */
    EmergentManager.isInterFactionHostile = function(factionA, factionB, threshold) {
        const th = threshold != null ? Number(threshold) : this.INTER_FACTION_HOSTILE_THRESHOLD;
        const v = this.getInterFactionStanding(factionA, factionB);
        return v <= th;
    };

    /**
     * Faction toward which fromId has the lowest standing (most negative), excluding self.
     * @param {string} fromFactionId
     * @returns {string|null}
     */
    EmergentManager.getPrimaryRivalFaction = function(fromFactionId) {
        const from = String(fromFactionId || "");
        if (!from) return null;
        this.ensureFactionRelations();
        const row = $gameSystem.emergentState().factionRelations[from];
        if (!row) return null;
        let worstId = null;
        let worst = Infinity;
        for (const to of Object.keys(row)) {
            if (to === from) continue;
            const v = row[to];
            if (typeof v !== "number") continue;
            if (v < worst) {
                worst = v;
                worstId = to;
            }
        }
        return worstId;
    };

    /**
     * When crisis X is active, each narrative role draws 1–2 stance traits (resolved to faction ids).
     */
    const CRISIS_TRAIT_POOLS_BY_ROLE = {
        UNDEAD_PLAGUE: {
            CROWN: ["ZEALOT", "STEADFAST"],
            REBEL_HOUSE: ["OPPORTUNIST", "AMBITIOUS"],
            ARCANE: ["OPPORTUNIST", "ISOLATIONIST"],
            ECCLESIASTICAL: ["FEARFUL", "ZEALOT"],
            MERCENARY: ["OPPORTUNIST", "PREDATOR"]
        },
        ELEMENTAL_RIFTS: {
            CROWN: ["PURIST", "STEADFAST"],
            REBEL_HOUSE: ["OPPORTUNIST", "PURIST"],
            ARCANE: ["OPPORTUNIST", "ISOLATIONIST"],
            ECCLESIASTICAL: ["FEARFUL", "ISOLATIONIST"],
            MERCENARY: ["OPPORTUNIST", "PREDATOR"]
        },
        CIVIL_WAR: {
            CROWN: ["STEADFAST", "ZEALOT"],
            REBEL_HOUSE: ["AMBITIOUS", "OPPORTUNIST"],
            ARCANE: ["OPPORTUNIST", "ISOLATIONIST"],
            ECCLESIASTICAL: ["FEARFUL", "ISOLATIONIST"],
            MERCENARY: ["OPPORTUNIST", "PREDATOR"]
        }
    };

    const _Game_System_initialize = Game_System.prototype.initialize;
    Game_System.prototype.initialize = function() {
        _Game_System_initialize.call(this);
        if (!this._emergentState) this._emergentState = {};
        if (!this._emergentState.factions || typeof this._emergentState.factions !== "object") {
            this._emergentState.factions = {};
        }
    };

    EmergentManager.generateStartingFactions = function() {
        if (window.EMERGENT_WORLD_INITIALIZED) return;
        if (!window.EMERGENT_WORLD_BOOTSTRAPPING) {
            console.warn("[WorldBootstrap] Blocked out-of-order initialization call.");
            return;
        }
        const state = $gameSystem.emergentState();

        state.factions.langford = this.rollFactionStats(
            "House Langford",
            "Rivermark",
            "Lawful",
            NARRATIVE_ROLE.CROWN
        );
        state.factions.blackwood = this.rollFactionStats(
            "House Blackwood",
            "Blackwood Vale",
            "Ambitious",
            NARRATIVE_ROLE.REBEL_HOUSE
        );
        state.factions.redbane = this.rollFactionStats(
            "The Redbane Freebands",
            "Bleak Frontier",
            "Martial",
            NARRATIVE_ROLE.MERCENARY
        );
        state.factions.church = this.rollFactionStats(
            "The Censured Church",
            "Rivermark",
            "Devout",
            NARRATIVE_ROLE.ECCLESIASTICAL
        );
        state.factions.mage_guild = this.rollFactionStats(
            "The Argent Collegium",
            "Mistspire",
            "Arcane",
            NARRATIVE_ROLE.ARCANE
        );

        for (const fid of Object.keys(state.factions)) {
            const f = state.factions[fid];
            if (f) {
                f.hostileToPlayer = false;
                f.leaderId = null;
                f.crisisTraits = [];
            }
        }

        this.initializeInterFactionRelations();
        this.recalculateGlobalMilitary();
    };

    /**
     * After generateCentralCrisis(), assign each faction 1–2 crisis-reactive traits.
     */
    EmergentManager.assignCrisisTraitsToFactions = function() {
        if (!window.EMERGENT_WORLD_BOOTSTRAPPING) {
            console.warn("[Factions] assignCrisisTraitsToFactions only runs during bootstrap.");
            return;
        }
        const crisis = typeof this.getCurrentCrisis === "function" ? this.getCurrentCrisis() : null;
        const cid = crisis ? crisis.id : "CIVIL_WAR";
        const pool = CRISIS_TRAIT_POOLS_BY_ROLE[cid] || CRISIS_TRAIT_POOLS_BY_ROLE.CIVIL_WAR;
        const state = $gameSystem.emergentState();

        for (const narrativeRole of Object.keys(pool)) {
            const factionId = this.resolveFactionIdForNarrativeRole(narrativeRole);
            if (!factionId) continue;
            const faction = state.factions[factionId];
            if (!faction) continue;
            const options = pool[narrativeRole];
            const t1 = options[Math.randomInt(options.length)];
            let t2 = options[Math.randomInt(options.length)];
            if (t2 === t1 && options.length > 1) {
                t2 = options.find(t => t !== t1) || t1;
            }
            faction.crisisTraits = t1 === t2 ? [t1] : [t1, t2];
        }

        this.logEvent("faction_crisis_traits_assigned", { crisisId: cid });
    };

    EmergentManager.rollFactionStats = function(name, realm, legacyTrait, narrativeRole) {
        return {
            name: name,
            realm: realm,
            power: 40 + Math.randomInt(31),
            wealth: 40 + Math.randomInt(31),
            military: 40 + Math.randomInt(31),
            loyalty: 40 + Math.randomInt(31),
            ambition: 40 + Math.randomInt(31),
            traits: [legacyTrait],
            crisisTraits: [],
            leaderId: null,
            hostileToPlayer: false,
            narrativeRole: narrativeRole || null
        };
    };

    EmergentManager.getFaction = function(factionId) {
        return $gameSystem.emergentState().factions[factionId];
    };

    EmergentManager.modFactionStat = function(factionId, stat, amount) {
        const faction = this.getFaction(factionId);
        if (faction && faction[stat] !== undefined) {
            const previousValue = faction[stat];
            faction[stat] = Math.max(0, faction[stat] + amount);
            this.logEvent("faction_stat_changed", {
                factionId: factionId,
                stat: stat,
                previousValue: previousValue,
                amount: Number(amount) || 0,
                newValue: faction[stat]
            });
        }
    };

    EmergentManager.recalculateGlobalMilitary = function() {
        const crownId = this.resolveFactionIdForNarrativeRole("CROWN");
        const rebelId = this.resolveFactionIdForNarrativeRole("REBEL_HOUSE");
        const crown = crownId ? this.getFaction(crownId) : null;
        const rebel = rebelId ? this.getFaction(rebelId) : null;
        if (!crown) return;
        let totalStrength = crown.military;
        if (rebel && !rebel.traits.includes("Rebellious")) {
            totalStrength += rebel.military;
        }
        this.setVar("militaryStrength", totalStrength);
    };

    /**
     * Structured AI decision for one narrative beat.
     * @returns {{ type: string, target: string, intensity: number }}
     */
    EmergentManager.decideLeaderAction = function(leader, crisis) {
        if (!leader) {
            return { type: "HOLD", target: "none", intensity: 0 };
        }
        const tension = typeof this.getWorldTension === "function" ? this.getWorldTension() : 0;
        const trait = String(leader.trait || "OPPORTUNIST");
        const cid = crisis && crisis.id ? crisis.id : "CIVIL_WAR";
        const stance = String(leader.stanceOnCrisis || "UNDECIDED");

        if (stance === "WITHDRAW" || trait === "ISOLATIONIST") {
            return { type: "MILITARY_WITHDRAWAL", target: "interior_lines", intensity: 4 };
        }
        if (trait === "FEARFUL" && tension >= 45) {
            return { type: "COWARDICE", target: "civilian_evacuation", intensity: 6 };
        }
        if (cid === "ELEMENTAL_RIFTS" && trait === "PURIST") {
            let inten = 7 + Math.randomInt(3);
            const eccId = this.resolveFactionIdForNarrativeRole("ECCLESIASTICAL");
            const arcId = this.resolveFactionIdForNarrativeRole("ARCANE");
            if (
                eccId &&
                arcId &&
                leader.factionId === eccId &&
                typeof this.isInterFactionHostile === "function" &&
                this.isInterFactionHostile(eccId, arcId)
            ) {
                inten += 2;
            }
            return { type: "INQUISITION", target: "arcane_sources", intensity: inten };
        }
        if (cid === "UNDEAD_PLAGUE" && (trait === "ZEALOT" || trait === "STEADFAST")) {
            return { type: "CRUSADE", target: "undead_front", intensity: 6 + Math.randomInt(4) };
        }
        if (trait === "OPPORTUNIST" || trait === "AMBITIOUS" || trait === "PREDATOR") {
            return { type: "EXPLOIT_CRISIS", target: "rival_factions", intensity: 5 + Math.randomInt(4) };
        }
        const rebelHouseId = this.resolveFactionIdForNarrativeRole("REBEL_HOUSE");
        const crownId = this.resolveFactionIdForNarrativeRole("CROWN");
        if (cid === "CIVIL_WAR" && rebelHouseId && crownId && leader.factionId === rebelHouseId) {
            const towardCrown = typeof this.getInterFactionStanding === "function"
                ? this.getInterFactionStanding(rebelHouseId, crownId)
                : 0;
            if (towardCrown <= this.INTER_FACTION_HOSTILE_THRESHOLD) {
                return { type: "COUP_PRESSURE", target: crownId, intensity: 8 + Math.randomInt(2) };
            }
            return { type: "COUP_PRESSURE", target: crownId, intensity: 7 };
        }
        if (tension > 70) {
            return { type: "DESPERATE_MEASURES", target: "threshold", intensity: 8 };
        }
        return { type: "RITUAL", target: "stability_rite", intensity: 3 + Math.randomInt(3) };
    };
})();
