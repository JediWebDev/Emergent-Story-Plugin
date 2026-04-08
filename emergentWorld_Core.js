/*:
 * @target MZ
 * @plugindesc [v1.0] Layer 1 - Core Simulation Engine & World Variables
 * @author dijOTTER
 *
 * @help EmergentWorld_Core.js
 * * This is the foundational layer. It tracks global world variables
 * and pushes the simulation forward every defined number of frames.
 *
 * @param Tick Rate
 * @type number
 * @min 60
 * @desc How many frames before the simulation ticks forward? (60 = 1 sec)
 * @default 3600
 */

var Imported = Imported || {};
Imported.EmergentWorld_Core = true;

var EmergentManager = EmergentManager || {};

(() => {
    const pluginName = "EmergentWorld_Core";
    const parameters = PluginManager.parameters(pluginName);
    const TICK_RATE = Number(parameters['Tick Rate'] || 60);

    //=============================================================================
    // Game_System Hook (For Save/Load Persistence)
    //=============================================================================
    const _Game_System_initialize = Game_System.prototype.initialize;
    Game_System.prototype.initialize = function() {
        _Game_System_initialize.call(this);
        this._emergentState = {
            ticks: 0,
            variables: {
                foodSupply: 50,
                banditPower: 20,
                monsterActivity: 10,
                prosperity: 40,
                tradeRoutes: 30
            }
        };
    };

    Game_System.prototype.emergentState = function() {
        return this._emergentState;
    };

    //=============================================================================
    // EmergentManager API
    //=============================================================================
    EmergentManager.getVar = function(key) {
        return $gameSystem.emergentState().variables[key] || 0;
    };

    EmergentManager.setVar = function(key, value) {
        $gameSystem.emergentState().variables[key] = Math.max(0, value); // Prevent negative
    };

    EmergentManager.modVar = function(key, amount) {
        const current = this.getVar(key);
        this.setVar(key, current + amount);
    };

    EmergentManager.update = function() {
        if (!$gameSystem) return;
        
        this._tickCounter = (this._tickCounter || 0) + 1;
        if (this._tickCounter >= TICK_RATE) {
            this._tickCounter = 0;
            this.tickSimulation();
        }
    };

    EmergentManager.tickSimulation = function() {
        $gameSystem.emergentState().ticks++;
        console.log("Emergent World Tick: " + $gameSystem.emergentState().ticks);
        
        // Broadcast to other layers (Factions, Events, etc.)
        if (this.onTick) this.onTick();
    };

    //=============================================================================
    // Game_Map Hook (To drive the simulation loop)
    //=============================================================================
    const _Game_Map_update = Game_Map.prototype.update;
    Game_Map.prototype.update = function(sceneActive) {
        _Game_Map_update.call(this, sceneActive);
        if (sceneActive) {
            EmergentManager.update();
        }
    };
})();