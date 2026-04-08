/*:
 * @target MZ
 * @plugindesc [v1.0] Layer 2 - Faction System
 * @author dijOTTER
 * @base EmergentWorld_Core
 *
 * @help EmergentWorld_Factions.js
 * * Tracks the power, wealth, and territory of the starting factions.
 */

var Imported = Imported || {};
Imported.EmergentWorld_Factions = true;

(() => {
    const _Game_System_initialize = Game_System.prototype.initialize;
    Game_System.prototype.initialize = function() {
        _Game_System_initialize.call(this);
        this._emergentState.factions = {
            "villagers": { territory: 3, military: 10, wealth: 20 },
            "bandits":   { territory: 1, military: 30, wealth: 50 },
            "merchants": { territory: 2, military: 15, wealth: 80 }
        };
    };

    EmergentManager.getFaction = function(factionId) {
        return $gameSystem.emergentState().factions[factionId];
    };

    EmergentManager.modFactionStat = function(factionId, stat, amount) {
        const faction = this.getFaction(factionId);
        if (faction && faction[stat] !== undefined) {
            faction[stat] = Math.max(0, faction[stat] + amount);
        }
    };

    const _EmergentManager_onTick = EmergentManager.onTick;
    EmergentManager.onTick = function() {
        if (_EmergentManager_onTick) _EmergentManager_onTick.call(this);

        const villagers = this.getFaction("villagers");
        const bandits = this.getFaction("bandits");

        // Natural simulation growth rules
        if (bandits.military < villagers.military) {
            this.modVar("foodSupply", 5);
            this.modVar("prosperity", 2);
            this.modFactionStat("villagers", "wealth", 5);
        } else {
            // Bandits are stronger! They drain the town and grow their power.
            this.modVar("prosperity", -2);
            this.modVar("foodSupply", -2);
            this.modVar("banditPower", 5); // This pushes us toward the Uprising Event!
            this.modFactionStat("bandits", "military", 2);
        }

        // Print the current state to the console so you can watch it evolve
        console.log(`[Stats] Food: ${this.getVar("foodSupply")} | Bandit Power: ${this.getVar("banditPower")} | Prosperity: ${this.getVar("prosperity")}`);
    };
})();