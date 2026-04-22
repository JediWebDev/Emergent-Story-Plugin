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

    const _ensureState = function() {
        if (!$gameSystem || !$gameSystem.emergentState) return null;
        const state = $gameSystem.emergentState();
        if (!state) return null;
        if (state.agentSystemEnabled === undefined) state.agentSystemEnabled = true;
        if (state._autonomousBootstrapDone === undefined) state._autonomousBootstrapDone = false;
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
        let agent = npc.agent || AgentManager.getAgentByCharacterId(npc.id);
        if (!agent) {
            agent = new AutonomousAgent(npc);
            // Deterministic baseline personality derived from id for save-safe repeatability.
            const id = Number(npc.id || 0);
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
            return "do_nothing";
        }
        return _decideAction.call(this, character, context);
    };

    const _executeAction = EmergentManager.executeAction;
    EmergentManager.executeReactiveAction = function(character, action, context) {
        return _executeAction.call(this, character, action, context);
    };
    EmergentManager.executeAction = function(character, action, context) {
        if (character && character.mode === "AUTONOMOUS") return;
        return _executeAction.call(this, character, action, context);
    };

    EmergentManager.bootstrapAutonomousTestAgent = function(state) {
        const safeState = state || _ensureState();
        if (!safeState || safeState._autonomousBootstrapDone) return;
        const chars = Array.isArray(safeState.characters) ? safeState.characters : [];
        if (chars.length === 0) return;

        // Step 9 test case: promote one apex NPC (leader preferred) only once.
        const candidate = chars.find(c => c && c.isAlive && c.role === "Leader")
            || chars.find(c => c && c.isAlive);
        if (!candidate) return;
        this.makeAutonomous(candidate);
        safeState._autonomousBootstrapDone = true;
        console.log("[Agent] Bootstrapped autonomous NPC:", candidate.name, `(id=${candidate.id})`);
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

        this.bootstrapAutonomousTestAgent(safeState);
        if (!this.isAgentSystemEnabled()) return;
        if (!window.AgentManager || typeof AgentManager.update !== "function") return;
        AgentManager.update(safeState);
    });
})();
