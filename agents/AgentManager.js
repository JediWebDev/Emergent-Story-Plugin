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

        static register(agent) {
            if (!agent || !agent.baseCharacter) return;
            const existing = this.agents.find(a => a && a.baseCharacter && a.baseCharacter.id === agent.baseCharacter.id);
            if (existing) return;
            this.agents.push(agent);
        }

        static getAgentByCharacterId(characterId) {
            return this.agents.find(a => a && a.baseCharacter && a.baseCharacter.id === characterId) || null;
        }

        static update(state) {
            for (const agent of this.agents) {
                if (!agent || typeof agent.update !== "function") continue;
                agent.update(state);
            }
        }
    }

    window.AgentManager = window.AgentManager || AgentManager;
})();
