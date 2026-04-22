/*:
 * @target MZ
 * @plugindesc [v1.0] Autonomous Agent Registry and Updater
 * @author dijOTTER
 *
 * @help agents/AgentManager.js
 * Tracks autonomous agents and updates them safely.
 */

var Imported = Imported || {};
Imported.EmergentWorld_AgentManager = true;

(function() {
    "use strict";

    class AgentManager {
        static get agents() {
            if (!this._agents) this._agents = [];
            return this._agents;
        }

        static set agents(value) {
            this._agents = Array.isArray(value) ? value : [];
        }

        static _sameAgentId(a, b) {
            if (a === b) return true;
            if (a == null || b == null) return false;
            return a === b || String(a) === String(b);
        }

        static register(agent) {
            if (!agent || !agent.baseCharacter) return;
            const id = agent.baseCharacter.id;
            if (this.agents.some(a => a && a.baseCharacter && this._sameAgentId(a.baseCharacter.id, id))) {
                console.log("[AgentManager] Duplicate agent prevented:", id);
                return;
            }
            this.agents.push(agent);
        }

        static getAgentByCharacterId(characterId) {
            return this.agents.find(a => a && a.baseCharacter
                && this._sameAgentId(a.baseCharacter.id, characterId)) || null;
        }

        static update(state) {
            if (!this._tick) this._tick = 0;
            this._tick++;
            for (const agent of this.agents) {
                if (!agent || typeof agent.update !== "function") continue;
                if (this._tick % 10 === 0) {
                    agent.update(state);
                }
            }
        }
    }

    window.AgentManager = window.AgentManager || AgentManager;
})();
