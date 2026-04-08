/*:
 * @target MZ
 * @plugindesc [v1.1] Layer 4 - World Generation System
 * @author dijOTTER
 * @base EmergentWorld_Core
 * @base EmergentWorld_Factions
 * @base EmergentWorld_Characters
 * @base EmergentWorld_Events
 *
 * @help EmergentWorld_WorldGen.js
 * * Runs a high-speed simulation loop before the player begins the game.
 * * Injects initial randomness so every playthrough has a unique history.
 *
 * @param Simulation Ticks
 * @type number
 * @min 1
 * @desc How many ticks of history should simulate before the game starts?
 * @default 50
 */

var Imported = Imported || {};
Imported.EmergentWorld_WorldGen = true;

(() => {
    const pluginName = "EmergentWorld_WorldGen";
    const parameters = PluginManager.parameters(pluginName);
    const SIM_TICKS = Number(parameters['Simulation Ticks'] || 50);

    const _DataManager_setupNewGame = DataManager.setupNewGame;
    DataManager.setupNewGame = function() {
        _DataManager_setupNewGame.call(this);

        // 1. INJECT INITIAL RANDOMNESS
        // Instead of starting at exactly 50 food or 20 bandits every time, 
        // we roll a random starting state for the world.
        EmergentManager.setVar("foodSupply", 30 + Math.randomInt(40)); // 30 to 69
        EmergentManager.setVar("banditPower", 10 + Math.randomInt(30)); // 10 to 39
        EmergentManager.setVar("prosperity", 20 + Math.randomInt(40)); // 20 to 59
        EmergentManager.setVar("tradeRoutes", 10 + Math.randomInt(40)); // 10 to 49

        // 2. POPULATE THE WORLD
        // We spawn some generic NPCs so the events have a pool of people to affect.
        const names = ["Elara", "Finn", "Garrick", "Hilda", "Jorn", "Kael", "Lyra", "Mireille"];
        for (let i = 0; i < 5; i++) {
            const randomName = names.splice(Math.randomInt(names.length), 1)[0];
            EmergentManager.spawnCharacter(randomName, "villagers", "Peasant");
        }
        EmergentManager.spawnCharacter("Krag", "bandits", "Thug");
        EmergentManager.spawnCharacter("Viper", "bandits", "Thief");

        console.log(`[World Gen] Fast-forwarding ${SIM_TICKS} ticks of history with randomized starting stats...`);

        // Temporarily mute the standard console logs
        const originalLog = console.log;
        console.log = function() {}; 

        // Run the simulation loop instantly
        for (let i = 0; i < SIM_TICKS; i++) {
            EmergentManager.tickSimulation();
        }

        // Restore the console log function
        console.log = originalLog;
        console.log(`[World Gen] History generated! The world is now alive.`);
        
        // Print the final starting state
        console.log(`[Start State] Food: ${EmergentManager.getVar("foodSupply")} | Bandit Power: ${EmergentManager.getVar("banditPower")} | Prosperity: ${EmergentManager.getVar("prosperity")}`);
        
        const aliveCharacters = $gameSystem.emergentState().characters.filter(c => c.isAlive);
        console.log(`[Start State] Surviving Characters: ${aliveCharacters.length}`);
        
        const deadCharacters = $gameSystem.emergentState().characters.filter(c => !c.isAlive);
        if (deadCharacters.length > 0) {
            console.log(`[Start State] Casualties of History:`);
            deadCharacters.forEach(c => console.log(` - ${c.name} (${c.history[c.history.length-1]})`));
        }
    };
})();