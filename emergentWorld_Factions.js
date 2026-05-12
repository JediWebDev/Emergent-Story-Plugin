/*:
 * @target MZ
 * @plugindesc [v2.0] Crisis-driven factions (one leader each, no economy tick sim)
 * @author dijOTTER
 * @base EmergentWorld_Core
 *
 * @help emergentWorld_Factions.js
 * Factions react to the Central Crisis via crisisTraits and decideLeaderAction().
 * No automatic map-time simulation — narrative turns live in EmergentManager.tickSimulation.
 */

var Imported = Imported || {};
Imported.EmergentWorld_Factions = true;

(() => {
    /**
     * When crisis X is active, each faction draws 1–2 stance traits from this pool.
     * These replace generic lore traits for the vertical slice.
     */
    const CRISIS_TRAIT_POOLS = {
        UNDEAD_PLAGUE: {
            langford: ["ZEALOT", "STEADFAST"],
            blackwood: ["OPPORTUNIST", "AMBITIOUS"],
            mage_guild: ["OPPORTUNIST", "ISOLATIONIST"],
            church: ["FEARFUL", "ZEALOT"],
            redbane: ["OPPORTUNIST", "PREDATOR"]
        },
        ELEMENTAL_RIFTS: {
            langford: ["PURIST", "STEADFAST"],
            blackwood: ["OPPORTUNIST", "PURIST"],
            mage_guild: ["OPPORTUNIST", "ISOLATIONIST"],
            church: ["FEARFUL", "ISOLATIONIST"],
            redbane: ["OPPORTUNIST", "PREDATOR"]
        },
        CIVIL_WAR: {
            langford: ["STEADFAST", "ZEALOT"],
            blackwood: ["AMBITIOUS", "OPPORTUNIST"],
            mage_guild: ["OPPORTUNIST", "ISOLATIONIST"],
            church: ["FEARFUL", "ISOLATIONIST"],
            redbane: ["OPPORTUNIST", "PREDATOR"]
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

        state.factions.langford = this.rollFactionStats("House Langford", "Rivermark", "Lawful");
        state.factions.blackwood = this.rollFactionStats("House Blackwood", "Blackwood Vale", "Ambitious");
        state.factions.redbane = this.rollFactionStats("The Redbane Freebands", "Bleak Frontier", "Martial");
        state.factions.church = this.rollFactionStats("The Censured Church", "Rivermark", "Devout");
        state.factions.mage_guild = this.rollFactionStats("The Argent Collegium", "Mistspire", "Arcane");

        for (const fid of Object.keys(state.factions)) {
            const f = state.factions[fid];
            if (f) {
                f.hostileToPlayer = false;
                f.leaderId = null;
                f.crisisTraits = [];
            }
        }

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
        const pool = CRISIS_TRAIT_POOLS[cid] || CRISIS_TRAIT_POOLS.CIVIL_WAR;
        const state = $gameSystem.emergentState();

        for (const factionId of Object.keys(pool)) {
            const faction = state.factions[factionId];
            if (!faction) continue;
            const options = pool[factionId];
            const t1 = options[Math.randomInt(options.length)];
            let t2 = options[Math.randomInt(options.length)];
            if (t2 === t1 && options.length > 1) {
                t2 = options.find(t => t !== t1) || t1;
            }
            faction.crisisTraits = t1 === t2 ? [t1] : [t1, t2];
        }

        this.logEvent("faction_crisis_traits_assigned", { crisisId: cid });
    };

    EmergentManager.rollFactionStats = function(name, realm, legacyTrait) {
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
            hostileToPlayer: false
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
        const langford = this.getFaction("langford");
        const blackwood = this.getFaction("blackwood");
        if (!langford || !blackwood) return;
        let totalStrength = langford.military;
        if (!blackwood.traits.includes("Rebellious")) {
            totalStrength += blackwood.military;
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
            return { type: "INQUISITION", target: "arcane_sources", intensity: 7 + Math.randomInt(3) };
        }
        if (cid === "UNDEAD_PLAGUE" && (trait === "ZEALOT" || trait === "STEADFAST")) {
            return { type: "CRUSADE", target: "undead_front", intensity: 6 + Math.randomInt(4) };
        }
        if (trait === "OPPORTUNIST" || trait === "AMBITIOUS" || trait === "PREDATOR") {
            return { type: "EXPLOIT_CRISIS", target: "rival_factions", intensity: 5 + Math.randomInt(4) };
        }
        if (cid === "CIVIL_WAR" && leader.factionId === "blackwood") {
            return { type: "COUP_PRESSURE", target: "langford", intensity: 7 };
        }
        if (tension > 70) {
            return { type: "DESPERATE_MEASURES", target: "threshold", intensity: 8 };
        }
        return { type: "RITUAL", target: "stability_rite", intensity: 3 + Math.randomInt(3) };
    };
})();
