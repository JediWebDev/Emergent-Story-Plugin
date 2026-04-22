/*:
 * @target MZ
 * @plugindesc [v1.0] Autonomous Agent Core Class
 * @author dijOTTER
 *
 * @help agents/AutonomousAgent.js
 * Defines the AutonomousAgent class used by the agent layer.
 */

var Imported = Imported || {};
Imported.EmergentWorld_AutonomousAgent = true;

(function() {
    "use strict";

    class AutonomousAgent {
        constructor(baseCharacter) {
            this.baseCharacter = baseCharacter;
            this.personality = {
                openness: 0,
                conscientiousness: 0,
                extraversion: 0,
                agreeableness: 0,
                neuroticism: 0
            };

            this.beliefs = {};
            this.memory = [];
            this.goals = [];
            this.currentIntent = null;
        }

        update(state) {
            if (!this.baseCharacter || !this.baseCharacter.isAlive) return;
            this.evaluateGoals(state);
            this.generateIntent(state);
            this.executeIntent(state);
        }

        evaluateGoals() {
            // placeholder
            if (!Array.isArray(this.goals)) this.goals = [];
        }

        generateIntent(state) {
            const tick = Number(state && state.ticks || 0);
            const charId = Number(this.baseCharacter && this.baseCharacter.id || 0);

            // Deterministic "occasional" intent generation to keep behavior stable while still varied.
            if (Number(this.personality.agreeableness || 0) <= 2) {
                const refuseCycle = 5 + (charId % 3);
                if (refuseCycle > 0 && tick % refuseCycle === 0) {
                    this.currentIntent = "refuse_interaction";
                    return;
                }
            }

            if (Number(this.personality.extraversion || 0) >= 7) {
                const talkCycle = 4 + (charId % 2);
                if (talkCycle > 0 && tick % talkCycle === 0) {
                    this.currentIntent = "initiate_dialogue";
                    return;
                }
            }

            this.currentIntent = "observe";
        }

        executeIntent(state) {
            if (!this.baseCharacter || !this.baseCharacter.isAlive) return;
            const actor = this.baseCharacter;
            const intent = this.currentIntent || "observe";

            if (intent === "initiate_dialogue") {
                if (typeof this.addMemory === "function") {
                    this.addMemory("Initiated dialogue with the player.", 2);
                }
                if (window.EmergentManager && typeof EmergentManager.logEvent === "function") {
                    EmergentManager.logEvent("agent_intent_dialogue", {
                        characterId: actor.id,
                        characterName: actor.name,
                        mode: actor.mode || "AUTONOMOUS"
                    });
                }
            } else if (intent === "refuse_interaction") {
                if (typeof this.addMemory === "function") {
                    this.addMemory("Refused an interaction.", 2);
                }
                if (window.EmergentManager && typeof EmergentManager.logEvent === "function") {
                    EmergentManager.logEvent("agent_intent_refusal", {
                        characterId: actor.id,
                        characterName: actor.name,
                        mode: actor.mode || "AUTONOMOUS"
                    });
                }
            }

            console.log("[Agent]", actor.name, "Intent:", intent);
        }

        addMemory(eventText, importance = 1) {
            this.memory.push({
                text: String(eventText || "Unknown event"),
                importance: Number(importance) || 1,
                timestamp: Date.now()
            });
            if (this.memory.length > 50) {
                const overflow = this.memory.length - 50;
                this.memory.splice(0, overflow);
            }
        }
    }

    window.AutonomousAgent = window.AutonomousAgent || AutonomousAgent;
})();
