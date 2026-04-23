/*:
 * @target MZ
 * @plugindesc [v2.0] Narrative Engine Core — manual crisis turns (no map-time sim)
 * @author dijOTTER
 *
 * @help EmergentWorld_Core.js
 * Simulation ticks no longer run every N frames. Call EmergentManager.advanceNarrativeTurn(reason)
 * from inn sleep, dungeon clear, or quest milestones (or plugin command).
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
    EmergentManager.debugLogs = String(parameters["Debug Console Logs"] || "false") === "true";

    const _Game_System_initialize = Game_System.prototype.initialize;
    Game_System.prototype.initialize = function () {
        _Game_System_initialize.call(this);
        const s = this._emergentState || {};
        this._emergentState = s;
        if (s.ticks === undefined) s.ticks = 0;
        if (!s.variables || typeof s.variables !== "object") s.variables = {};
        if (!Array.isArray(s.eventLog)) s.eventLog = [];
    };

    Game_System.prototype.emergentState = function () {
        return this._emergentState;
    };

    window.EMERGENT_WORLD_INITIALIZED = window.EMERGENT_WORLD_INITIALIZED || false;
    window.EMERGENT_WORLD_BOOTSTRAPPING = window.EMERGENT_WORLD_BOOTSTRAPPING || false;
    if (typeof window.__EMERGENT_WORLD_INITIALIZED__ === "undefined") {
        window.__EMERGENT_WORLD_INITIALIZED__ = false;
    }

    window.EmergentWorldBootstrap = window.EmergentWorldBootstrap || {};

    window.EmergentWorldBootstrap.run = function(state) {
        if (window.__EMERGENT_WORLD_INITIALIZED__) {
            console.warn("[WorldBootstrap] Skipped duplicate initialization");
            return;
        }
        if (window.EMERGENT_WORLD_INITIALIZED) {
            console.warn("[WorldBootstrap] Attempted double initialization — blocked.");
            return;
        }
        if (window.EMERGENT_WORLD_BOOTSTRAPPING) {
            console.warn("[WorldBootstrap] Bootstrap already in progress. Aborting duplicate run.");
            return;
        }
        const em = window.EmergentManager;
        if (!em) return;

        let resolvedState = state;
        if (!resolvedState && $gameSystem && $gameSystem.emergentState) {
            resolvedState = $gameSystem.emergentState();
        }
        if (!resolvedState) {
            console.error("[WorldBootstrap] Bootstrap failed: no emergent state");
            return;
        }
        if (resolvedState._emergentWorldBootstrapCompleted) {
            console.warn("[WorldBootstrap] Emergent state already bootstrapped — blocked.");
            return;
        }

        window.EMERGENT_WORLD_BOOTSTRAPPING = true;
        try {
            em.generateCoreVariables();
            if (typeof em.generateStartingFactions === "function") {
                em.generateStartingFactions();
            }
            if (typeof em.generateCentralCrisis === "function") {
                em.generateCentralCrisis();
            }
            if (typeof em.assignCrisisTraitsToFactions === "function") {
                em.assignCrisisTraitsToFactions();
            }
            if (typeof em.generateLeadersForWorld === "function") {
                em.generateLeadersForWorld();
            }

            window.EMERGENT_WORLD_INITIALIZED = true;
            window.__EMERGENT_WORLD_INITIALIZED__ = true;
            resolvedState._emergentWorldBootstrapCompleted = true;

            if (typeof em.refreshFactionHostilitySwitches === "function") {
                em.refreshFactionHostilitySwitches();
            }

            const crisis = typeof em.getCurrentCrisis === "function" ? em.getCurrentCrisis() : null;
            const leaderCount = Array.isArray(resolvedState.leaders) ? resolvedState.leaders.length : 0;
            console.log("[WorldBootstrap] Narrative engine ready");
            console.log("[WorldBootstrap] Crisis:", crisis ? crisis.name : "none");
            console.log("[WorldBootstrap] Leaders:", leaderCount);
            console.log("[WorldBootstrap] Seed:", resolvedState._emergentSessionSeed);
        } catch (err) {
            console.error("[WorldBootstrap] Bootstrap threw:", err);
        } finally {
            window.EMERGENT_WORLD_BOOTSTRAPPING = false;
        }
    };

    EmergentManager.bootstrapNewGame = function() {
        if (window.__EMERGENT_WORLD_INITIALIZED__ || window.EMERGENT_WORLD_INITIALIZED) {
            console.warn("[WorldBootstrap] Blocked out-of-order bootstrapNewGame call.");
            return;
        }
        window.EmergentWorldBootstrap.run($gameSystem && $gameSystem._emergentState);
    };

    const _DataManager_setupNewGame = DataManager.setupNewGame;
    DataManager.setupNewGame = function() {
        window.EMERGENT_WORLD_INITIALIZED = false;
        window.__EMERGENT_WORLD_INITIALIZED__ = false;
        window.EMERGENT_WORLD_BOOTSTRAPPING = false;
        _DataManager_setupNewGame.call(this);
        const emergentState = $gameSystem && $gameSystem._emergentState;
        window.EmergentWorldBootstrap.run(emergentState);
    };

    EmergentManager.generateCoreVariables = function() {
        if (window.EMERGENT_WORLD_INITIALIZED) return;
        if (!window.EMERGENT_WORLD_BOOTSTRAPPING) {
            console.warn("[WorldBootstrap] Blocked out-of-order initialization call.");
            return;
        }
        const state = $gameSystem.emergentState();
        if (state._emergentSessionSeed === undefined) {
            state._emergentSessionSeed = Date.now() + Math.randomInt(1e6);
        }
        const vars = state.variables;
        vars.foodSupply = 45 + Math.randomInt(16);
        vars.banditPower = 15 + Math.randomInt(16);
        vars.monsterActivity = 10 + Math.randomInt(16);
        vars.prosperity = 35 + Math.randomInt(16);
        vars.tradeRoutes = 25 + Math.randomInt(16);
        vars.dragonEcho = 15 + Math.randomInt(21);
        vars.worldTurn = 0;
        vars.aldenmereStability = 60 + Math.randomInt(21);
    };

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
        $gameSystem.emergentState().variables[key] = Math.max(0, value);
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
        this._tickHandlers.sort((a, b) => {
            if (a.priority !== b.priority) return a.priority - b.priority;
            return String(a.name).localeCompare(String(b.name));
        });
    };

    /**
     * Narrative turn: escalate tension, each leader acts, crisis events resolve.
     * Call from script or plugin command (inn sleep, dungeon cleared, milestone).
     */
    EmergentManager.tickSimulation = function(reason) {
        if (!$gameSystem) return;
        const state = $gameSystem.emergentState();
        if (!window.EMERGENT_WORLD_INITIALIZED) {
            console.warn("[Narrative] tickSimulation ignored — world not bootstrapped.");
            return;
        }

        state.ticks++;
        const crisis = typeof this.getCurrentCrisis === "function" ? this.getCurrentCrisis() : null;
        const tensionBefore = typeof this.getWorldTension === "function" ? this.getWorldTension() : 0;

        if (typeof this.modifyWorldTension === "function") {
            this.modifyWorldTension(2);
        }

        const leaders = typeof this.getLeaders === "function" ? this.getLeaders() : [];
        for (const leader of leaders) {
            if (!leader) continue;
            const action = typeof this.decideLeaderAction === "function"
                ? this.decideLeaderAction(leader, crisis)
                : { type: "HOLD", target: "none", intensity: 0 };
            const event = typeof this.generateCrisisEvent === "function"
                ? this.generateCrisisEvent(leader, action, crisis)
                : null;
            if (typeof this.applyCrisisEvent === "function") {
                this.applyCrisisEvent(event, leader);
            }

            const tensionLine = typeof this.getWorldTension === "function" ? this.getWorldTension() : tensionBefore;
            this.logEvent("crisis_narrative_beat", {
                reason: String(reason || "narrative_turn"),
                tick: state.ticks,
                crisis: crisis ? crisis.name : "none",
                tensionSnapshot: tensionLine,
                leader: leader.name,
                leaderId: leader.id,
                trait: leader.trait,
                stanceOnCrisis: leader.stanceOnCrisis,
                action: action.type,
                eventTitle: event ? event.title : "",
                resultSummary: event ? event.summary : ""
            });
        }

        const tensionAfter = typeof this.getWorldTension === "function" ? this.getWorldTension() : tensionBefore;
        this.logEvent("crisis_tick_summary", {
            reason: String(reason || "narrative_turn"),
            tick: state.ticks,
            crisis: crisis ? crisis.name : "none",
            tensionBefore: tensionBefore,
            tensionAfter: tensionAfter,
            leaderCount: leaders.length
        });
    };

    /** Alias for events / maps / common events. */
    EmergentManager.advanceNarrativeTurn = function(reason) {
        this.tickSimulation(reason);
    };

    EmergentManager.update = function () {
        /* Intentionally empty: no real-time map simulation in v2 narrative engine. */
    };
})();
