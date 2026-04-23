/*:
 * @target MZ
 * @plugindesc [v1.0] Autonomous Agent Layer Integration
 * @author dijOTTER
 * @base EmergentWorld_Core
 * @base EmergentWorld_Characters
 *
 * @help emergentWorld_AutonomousAgents.js
 * Incremental autonomous layer that coexists with reactive NPC simulation.
 *
 * Prerequisites:
 * - agents/AutonomousAgent.js
 * - agents/AgentManager.js
 */

var Imported = Imported || {};
Imported.EmergentWorld_AutonomousAgents = true;

(function() {
    "use strict";

    /** Local-only: personality modulo seed; not used as identity or registry keys. */
    function _personalityModFromStringNpcId(s) {
            if (typeof s !== "string" || !s.length) {
                if (s != null) {
                    console.warn("[WorldBootstrap] Non-string ID detected:", s);
                }
                return 0;
            }
        let h = 0;
        for (let i = 0; i < s.length; i++) {
            h = ((h << 5) - h) + s.charCodeAt(i);
            h |= 0;
        }
        return Math.abs(h);
    }

    const _ensureState = function() {
        if (!$gameSystem || !$gameSystem.emergentState) return null;
        const state = $gameSystem.emergentState();
        if (!state) return null;
        if (state.agentSystemEnabled === undefined) state.agentSystemEnabled = true;
        if (state._autonomousInitialized === undefined) {
            state._autonomousInitialized = !!state._autonomousBootstrapDone;
        }
        if (state._autonomousBootstrapDone === undefined) state._autonomousBootstrapDone = state._autonomousInitialized;
        return state;
    };

    EmergentManager.isAgentSystemEnabled = function() {
        const state = _ensureState();
        return !!(state && state.agentSystemEnabled);
    };

    EmergentManager.setAgentSystemEnabled = function(enabled) {
        const state = _ensureState();
        if (!state) return;
        state.agentSystemEnabled = !!enabled;
    };

    EmergentManager.makeAutonomous = function(npc) {
        if (!npc || !npc.isAlive) return npc;
        if (!window.AutonomousAgent || !window.AgentManager) {
            console.warn("[Agent] Missing AutonomousAgent or AgentManager dependency.");
            return npc;
        }

        npc.mode = "AUTONOMOUS";
        const seed = _personalityModFromStringNpcId(npc.id);
        let agent = npc.agent || AgentManager.getAgentByCharacterId(npc.id);
        if (!agent) {
            agent = new AutonomousAgent(npc);
            const id = seed;
            agent.personality.extraversion = 3 + (id % 6); // 3..8
            agent.personality.agreeableness = 2 + ((id + 3) % 7); // 2..8
            agent.personality.openness = 4 + (id % 4);
            agent.personality.conscientiousness = 4 + ((id + 1) % 4);
            agent.personality.neuroticism = 2 + ((id + 2) % 5);
            AgentManager.register(agent);
        }
        npc.agent = agent;
        return npc;
    };

    // Keep existing NPC generation intact; only add mode default.
    const _generateCharacter = EmergentManager.generateCharacter;
    EmergentManager.generateCharacter = function(factionId, role) {
        const npc = _generateCharacter.call(this, factionId, role);
        if (npc && npc.mode === undefined) npc.mode = "REACTIVE";
        return npc;
    };

    // Prevent reactive layer from double-driving autonomous actors.
    const _decideAction = EmergentManager.decideAction;
    EmergentManager.decideAction = function(character, context) {
        if (character && character.mode === "AUTONOMOUS") {
            return null;
        }
        return _decideAction.call(this, character, context);
    };

    const _executeAction = EmergentManager.executeAction;
    EmergentManager.executeReactiveAction = function(character, action, context) {
        if (action === null || action === undefined) return;
        return _executeAction.call(this, character, action, context);
    };
    EmergentManager.executeAction = function(character, action, context) {
        if (action === null || action === undefined) return;
        if (character && character.mode === "AUTONOMOUS") return;
        return _executeAction.call(this, character, action, context);
    };

    EmergentManager.rebuildAutonomousAgents = function(state) {
        const safeState = state || _ensureState();
        if (!safeState || !Array.isArray(safeState.characters)) return;
        if (!window.AgentManager) return;

        for (const npc of safeState.characters) {
            if (!npc || !npc.isAlive) continue;
            if (npc.mode !== "AUTONOMOUS") continue;
            const existing = AgentManager.getAgentByCharacterId(npc.id);
            if (!npc.agent || !existing) {
                this.makeAutonomous(npc);
            }
        }
    };

    function npcQualifiesForAutonomyBootstrap(npc, roleRemaining) {
        if (!npc || !npc.isAlive) return false;
        if (npc.role === "Leader") return true;
        const cap = roleRemaining[npc.role];
        if (cap > 0) {
            roleRemaining[npc.role] = cap - 1;
            return true;
        }
        return false;
    }

    /**
     * Called once at end of world bootstrap (if present) and idempotent on tick until done.
     * Promotes multiple qualifying NPCs and relies on AgentManager for duplicate prevention.
     */
    EmergentManager.bootstrapAutonomousNPCsIfReady = function(state) {
        const safeState = state || _ensureState();
        if (!safeState || !window.AutonomousAgent || !window.AgentManager) return;
        if (!window.EMERGENT_WORLD_BOOTSTRAPPING) {
            console.warn("[WorldBootstrap] Blocked out-of-order initialization call.");
            return;
        }
        if (safeState._agentsBootstrapped) {
            console.warn("[Agent] Bootstrap already completed — skipping.");
            return;
        }
        if (safeState._autonomousBootstrapDone) {
            safeState._agentsBootstrapped = true;
            return;
        }

        const chars = Array.isArray(safeState.characters) ? safeState.characters : [];
        if (chars.length === 0) return;

        const roleRemaining = { Trader: 3, Thug: 2, Citizen: 2 };
        for (const npc of chars) {
            if (!npc || !npc.isAlive) continue;
            if (npc.mode === "AUTONOMOUS" && AgentManager.getAgentByCharacterId(npc.id)) {
                continue;
            }
            if (npcQualifiesForAutonomyBootstrap(npc, roleRemaining)) {
                this.makeAutonomous(npc);
            }
        }
        safeState._autonomousInitialized = true;
        safeState._autonomousBootstrapDone = true;
        safeState._agentsBootstrapped = true;
        console.log("[Agent] Autonomous bootstrap complete. Agents registered:", AgentManager.agents.length);
    };

    EmergentManager.bootstrapAutonomousTestAgent = function(state) {
        this.bootstrapAutonomousNPCsIfReady(state);
    };

    // Additive integration into main simulation loop via scheduler.
    // Priority 28 runs after existing npc handlers (25/26).
    EmergentManager.registerTickHandler("autonomous_agents", 28, function(state) {
        const safeState = _ensureState() || state;
        if (!safeState) return;
        if (!Array.isArray(safeState.characters)) return;

        for (const character of safeState.characters) {
            if (!character) continue;
            if (character.mode === undefined) character.mode = "REACTIVE";
        }

        this.rebuildAutonomousAgents(safeState);
        if (!this.isAgentSystemEnabled()) return;
        if (!window.AgentManager || typeof AgentManager.update !== "function") return;
        AgentManager.update(safeState);
    });

    window.debugAgent = function(id) {
        if (!window.AgentManager || !Array.isArray(AgentManager.agents)) {
            console.log(null);
            return null;
        }
        if (typeof id !== "string") {
            console.warn("[WorldBootstrap] Non-string ID detected:", id);
            return null;
        }
        const agent = AgentManager.agents.find(a => a && a.baseCharacter && a.baseCharacter.id === id) || null;
        console.log(agent);
        return agent;
    };
})();
