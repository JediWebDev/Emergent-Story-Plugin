/*:
 * @target MZ
 * @plugindesc [v1.0] Layer 2 - Faction System (Procedural Generation)
 * @author dijOTTER
 * @base EmergentWorld_Core
 *
 * @help EmergentWorld_Factions.js
 * * Generates factions dynamically at the start of a New Game with
 * randomized starting variables to ensure every seed is unique.
 */

var Imported = Imported || {};
Imported.EmergentWorld_Factions = true;

(() => {
    //=============================================================================
    // 1. Data Structure Initialization (Empty Container)
    //=============================================================================
    const _Game_System_initialize = Game_System.prototype.initialize;
    Game_System.prototype.initialize = function() {
        _Game_System_initialize.call(this);
        // Only create the empty object. Do not hardcode the stats here.
        this._emergentState.factions = {};
    };

    //=============================================================================
    // 3. The Faction Generator
    //=============================================================================
    EmergentManager.generateStartingFactions = function() {
        if (window.EMERGENT_WORLD_INITIALIZED) {
            return;
        }
        if (this._worldFactionsInitialized) {
            return;
        }
        const state = $gameSystem.emergentState();
        
        // Generate the Core Factions utilizing Ardessian Lore Templates
        state.factions["caelmont"] = this.rollFactionStats("Royal House Caelmont", "Aldenmere", "Stable");
        state.factions["valemont"] = this.rollFactionStats("House Valemont", "Aldenmere", "Ambitious");
        state.factions["vrakkoth"] = this.rollFactionStats("Dominion of Vrakkoth", "Vrakkoth", "Militaristic");
        state.factions["merchants"] = this.rollFactionStats("The Golden Ledger", "Aldenmere", "Greedy");
        // Added: Characters and multiple systems reference "villagers" as a factionId.
        // This ensures modFactionStat("villagers", ...) is never a silent no-op.
        state.factions["villagers"] = this.rollFactionStats("The Free Peasantry", "Aldenmere", "Humble");
        state.factions["bandits"] = this.rollFactionStats("The Ashen Wolves", "Wildlands", "Rebellious");
        
        // Now that the factions are generated, calculate the starting global values
        this.recalculateGlobalMilitary();
        this._worldFactionsInitialized = true;
        console.log("[World] Factions initialized once");
    };

    EmergentManager.rollFactionStats = function(name, realm, baseTrait) {
        // Math.randomInt(max) generates a number between 0 and max-1
        // We add a baseline value so no faction starts completely at 0
        return {
            name: name,
            realm: realm,
            power: 30 + Math.randomInt(51),     // Range: 30 to 80
            wealth: 20 + Math.randomInt(61),    // Range: 20 to 80
            military: 10 + Math.randomInt(71),  // Range: 10 to 80
            loyalty: 20 + Math.randomInt(81),   // Range: 20 to 100
            ambition: 10 + Math.randomInt(71),  // Range: 10 to 80
            traits: [baseTrait] // Base cultural trait is static, others evolve
        };
    };

    //=============================================================================
    // 4. API & Simulation Logic
    //=============================================================================
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
        const caelmont = this.getFaction("caelmont");
        const valemont = this.getFaction("valemont");
        
        if (!caelmont || !valemont) return;

        let totalStrength = 0;
        if (!valemont.traits.includes("Rebellious")) {
            totalStrength += valemont.military;
        }
        totalStrength += caelmont.military;
        
        this.setVar("militaryStrength", totalStrength);
    };

    //=============================================================================
    // 5. The Dynamic Tick
    //=============================================================================
    EmergentManager.registerTickHandler("factions", 10, function(state) {
        const merchants = this.getFaction("merchants");
        const bandits = this.getFaction("bandits");

        if (!merchants || !bandits) return; // Safety check

        // Natural simulation growth rules based on RNG starting stats
        if (bandits.military < merchants.military) {
            this.modVar("foodSupply", 5);
            this.modVar("prosperity", 2);
            this.modFactionStat("merchants", "wealth", 5);
        } else {
            // Bandits are stronger! They drain the town and grow their power.
            this.modVar("prosperity", -2);
            this.modVar("foodSupply", -2);
            this.modVar("banditPower", 5); 
            this.modFactionStat("bandits", "military", 2);
        }

        this.logEvent("faction_tick_summary", {
            merchantsWealth: merchants.wealth,
            banditsMilitary: bandits.military
        });
    });
})();