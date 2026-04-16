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
    // 1. Game_System Hook (Empty Data Container)
    //=============================================================================
    const _Game_System_initialize = Game_System.prototype.initialize;
    Game_System.prototype.initialize = function () {
        _Game_System_initialize.call(this);
        this._emergentState = {
            ticks: 0,
            variables: {} 
        };
    };

    Game_System.prototype.emergentState = function () {
        return this._emergentState;
    };

    //=============================================================================
    // 2. Procedural Generation Hook (Fires ONCE at New Game)
    //=============================================================================
    const _DataManager_setupNewGame = DataManager.setupNewGame;
    DataManager.setupNewGame = function() {
        _DataManager_setupNewGame.call(this);
        
        // Roll the initial world environment
        EmergentManager.generateCoreVariables();
    };

    //=============================================================================
    // 3. The Core Environment Generator
    //=============================================================================
    EmergentManager.generateCoreVariables = function() {
        console.log("[Emergent World] Rolling new seed for core environment variables...");
        const vars = $gameSystem.emergentState().variables;

        // --- Core Resource Pressures (The Environment) ---
        vars.foodSupply = 40 + Math.randomInt(21);       // Range: 40 to 60
        vars.banditPower = 10 + Math.randomInt(21);      // Range: 10 to 30
        vars.monsterActivity = 5 + Math.randomInt(16);   // Range:  5 to 20
        vars.prosperity = 30 + Math.randomInt(21);       // Range: 30 to 50
        vars.tradeRoutes = 20 + Math.randomInt(21);      // Range: 20 to 40

        // --- Global Story Pressures ---
        vars.dragonEcho = 15 + Math.randomInt(21);       // Range: 15 to 35
        vars.worldTurn = 0;

        // --- Regional Political Pressures ---
        vars.aldenmereStability = 60 + Math.randomInt(31); // Range: 60 to 90
    };

    //=============================================================================
    // 4. EmergentManager API
    //=============================================================================
    EmergentManager.getVar = function (key) {
        return $gameSystem.emergentState().variables[key] || 0;
    };

    EmergentManager.setVar = function (key, value) {
        $gameSystem.emergentState().variables[key] = Math.max(0, value); // Prevent negative
    };

    EmergentManager.modVar = function (key, amount) {
        const current = this.getVar(key);
        this.setVar(key, current + amount);
    };

    //=============================================================================
    // 5. The Update Loop
    //=============================================================================
    EmergentManager.update = function () {
        if (!$gameSystem) return;

        this._tickCounter = (this._tickCounter || 0) + 1;
        if (this._tickCounter >= TICK_RATE) {
            this._tickCounter = 0;
            this.tickSimulation();
        }
    };

    EmergentManager.tickSimulation = function () {
        $gameSystem.emergentState().ticks++;
        console.log("Emergent World Tick: " + $gameSystem.emergentState().ticks);
        
        // Trigger the Master Simulation Tick Common Event
        if ($gameTemp && !$gameTemp.isCommonEventReserved()) {
            // $gameTemp.reserveCommonEvent(10); 
        }

        // Broadcast to other layers (Factions, Events, etc.)
        if (this.onTick) this.onTick();
    };

    //=============================================================================
    // Game_Map Hook (To drive the simulation loop)
    //=============================================================================
    const _Game_Map_update = Game_Map.prototype.update;
    Game_Map.prototype.update = function (sceneActive) {
        _Game_Map_update.call(this, sceneActive);
        if (sceneActive) {
            EmergentManager.update();
        }
    };
})();