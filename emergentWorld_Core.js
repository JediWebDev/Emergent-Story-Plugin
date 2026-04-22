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
 *
 * @param Debug Console Logs
 * @type boolean
 * @desc If true, simulation events are echoed to the console.
 * @default false
 */

var Imported = Imported || {};
Imported.EmergentWorld_Core = true;

var EmergentManager = EmergentManager || {};
EmergentManager._tickHandlers = EmergentManager._tickHandlers || [];
EmergentManager.MAX_EVENT_LOG_ENTRIES = EmergentManager.MAX_EVENT_LOG_ENTRIES || 1000;

(() => {
    const pluginName = "EmergentWorld_Core";
    const parameters = PluginManager.parameters(pluginName);
    const TICK_RATE = Number(parameters['Tick Rate'] || 60);
    EmergentManager.debugLogs = String(parameters["Debug Console Logs"] || "false") === "true";

    //=============================================================================
    // 1. Game_System Hook (Empty Data Container)
    //=============================================================================
    const _Game_System_initialize = Game_System.prototype.initialize;
    Game_System.prototype.initialize = function () {
        _Game_System_initialize.call(this);
        this._emergentState = {
            ticks: 0,
            variables: {},
            eventLog: []
        };
    };

    Game_System.prototype.emergentState = function () {
        return this._emergentState;
    };

    //=============================================================================
    // World init session flags (per new game; also window guard for any double-run)
    //=============================================================================
    window.EMERGENT_WORLD_INITIALIZED = window.EMERGENT_WORLD_INITIALIZED || false;

    EmergentManager.resetWorldGenerationSession = function() {
        this._worldCoreInitialized = false;
        this._worldFactionsInitialized = false;
        this._worldInitialNpcsSeeded = false;
        this._worldHistoryInitialized = false;
    };

    /**
     * Deterministic 32-bit-ish number for string character ids (save-safe modulo use).
     */
    EmergentManager.stableCharacterIdNumber = function(character) {
        if (!character) return 0;
        const id = character.id;
        if (typeof id === "number" && isFinite(id)) return id;
        if (typeof id === "string" && id.length) {
            let h = 0;
            for (let i = 0; i < id.length; i++) {
                h = ((h << 5) - h) + id.charCodeAt(i);
                h |= 0;
            }
            return Math.abs(h);
        }
        return 0;
    };

    //=============================================================================
    // 2. New Game Bootstrap (Centralized Initialization)
    //=============================================================================
    EmergentManager.bootstrapNewGame = function() {
        if (window.EMERGENT_WORLD_INITIALIZED) {
            return;
        }

        // Core environment variables (always available in Core)
        this.generateCoreVariables();

        // Factions (if the faction layer is installed)
        if (typeof this.generateStartingFactions === "function") {
            this.generateStartingFactions();
        }

        // Characters (if the character layer is installed)
        // Preserves prior default spawn counts across the plugin set.
        if (typeof this.generateCharacter === "function" && !this._worldInitialNpcsSeeded) {
            for (let i = 0; i < 5; i++) this.generateCharacter("villagers", "Citizen");
            for (let i = 0; i < 3; i++) this.generateCharacter("merchants", "Trader");
            for (let i = 0; i < 4; i++) this.generateCharacter("bandits", "Thug");
            this._worldInitialNpcsSeeded = true;
            console.log("[World] Characters initialized once");
        }

        // Historical epochs (if the history layer is installed)
        if (typeof this.runHistoricalEpochs === "function") {
            this.runHistoricalEpochs(4);
        }

        window.EMERGENT_WORLD_INITIALIZED = true;

        const state = $gameSystem && $gameSystem.emergentState && $gameSystem.emergentState();
        const countNPCs = (state && Array.isArray(state.characters)) ? state.characters.length : 0;

        if (typeof this.bootstrapAutonomousNPCsIfReady === "function") {
            this.bootstrapAutonomousNPCsIfReady(state);
        }

        const countAgents = (window.AgentManager && Array.isArray(AgentManager.agents))
            ? AgentManager.agents.length
            : 0;
        console.log("[World] NPCs:", countNPCs);
        console.log("[World] Agents:", countAgents);
    };

    const _DataManager_setupNewGame = DataManager.setupNewGame;
    DataManager.setupNewGame = function() {
        window.EMERGENT_WORLD_INITIALIZED = false;
        if (window.EmergentManager && typeof EmergentManager.resetWorldGenerationSession === "function") {
            EmergentManager.resetWorldGenerationSession();
        }
        _DataManager_setupNewGame.call(this);
        
        // Centralized initialization entrypoint (only override once across all files)
        EmergentManager.bootstrapNewGame();
    };

    //=============================================================================
    // 3. The Core Environment Generator
    //=============================================================================
    EmergentManager.generateCoreVariables = function() {
        if (window.EMERGENT_WORLD_INITIALIZED) {
            return;
        }
        if (this._worldCoreInitialized) {
            return;
        }
        const state = $gameSystem.emergentState();
        if (state._emergentSessionSeed === undefined) {
            state._emergentSessionSeed = Date.now() + Math.randomInt(1e6);
        }
        const vars = state.variables;

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
        this._worldCoreInitialized = true;
        console.log("[World] Core initialized once");
    };

    //=============================================================================
    // 4. EmergentManager API
    //=============================================================================
    EmergentManager.getVar = function (key) {
        return $gameSystem.emergentState().variables[key] || 0;
    };

    EmergentManager.logEvent = function(type, payload) {
        if (!$gameSystem || !$gameSystem.emergentState) return;
        const state = $gameSystem.emergentState();
        if (!Array.isArray(state.eventLog)) state.eventLog = [];

        const entry = {
            type: String(type || "unknown"),
            timestamp: Number(state.ticks || 0),
            data: payload || {}
        };

        state.eventLog.push(entry);
        if (state.eventLog.length > this.MAX_EVENT_LOG_ENTRIES) {
            const overflow = state.eventLog.length - this.MAX_EVENT_LOG_ENTRIES;
            state.eventLog.splice(0, overflow);
        }

        if (this.debugLogs) {
            console.log(`[Emergent:${entry.type}]`, entry);
        }
    };

    EmergentManager.setVar = function (key, value) {
        $gameSystem.emergentState().variables[key] = Math.max(0, value); // Prevent negative
    };

    EmergentManager.modVar = function (key, amount) {
        const current = this.getVar(key);
        this.setVar(key, current + amount);
    };

    EmergentManager.registerTickHandler = function(name, priority, fn) {
        if (typeof fn !== "function") return;

        const normalizedPriority = Number(priority) || 0;
        const existingIndex = this._tickHandlers.findIndex(h => h.name === name);
        const handler = { name, priority: normalizedPriority, fn };

        if (existingIndex >= 0) {
            this._tickHandlers[existingIndex] = handler;
        } else {
            this._tickHandlers.push(handler);
        }

        // Deterministic order: priority first, then name.
        this._tickHandlers.sort((a, b) => {
            if (a.priority !== b.priority) return a.priority - b.priority;
            return String(a.name).localeCompare(String(b.name));
        });
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
        const state = $gameSystem.emergentState();
        state.ticks++;
        this.logEvent("world_tick", { tick: state.ticks });
        
        // Trigger the Master Simulation Tick Common Event
        if ($gameTemp && !$gameTemp.isCommonEventReserved()) {
            // $gameTemp.reserveCommonEvent(10); 
        }

        // Deterministic scheduler for all simulation layers.
        for (const handler of this._tickHandlers) {
            // Backward compatible: existing handlers can ignore the state argument.
            handler.fn.call(this, state);
        }
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