/*:
 * @target MZ
 * @plugindesc [v1.0] Layer 5 - Event Engine
 * @author dijOTTER
 * @base EmergentWorld_Core
 * @base EmergentWorld_Factions
 *
 * @help EmergentWorld_Events.js
 * * Evaluates world conditions to trigger emergent events.
 */

var Imported = Imported || {};
Imported.EmergentWorld_Events = true;

(() => {
    EmergentManager._eventRules = [];

    // Registering Rules using Contextual Randomness (Rule 3)
    EmergentManager.registerRule = function(name, condition, effect) {
        this._eventRules.push({ name, condition, effect });
    };

    //=============================================================================
    // Define Prototype Events
    //=============================================================================
    
    // Event 1: Bandit Uprising
    EmergentManager.registerRule("Bandit Uprising", 
        function() { // Condition
            return EmergentManager.getVar("banditPower") > 60 && 
                   EmergentManager.getVar("tradeRoutes") < 40;
        },
        function() { // Effect
            console.log("EVENT TRIGGERED: Bandit Uprising!");
            EmergentManager.modFactionStat("merchants", "wealth", -30);
            EmergentManager.modFactionStat("villagers", "military", -10);
            EmergentManager.modVar("prosperity", -20);
            EmergentManager.modVar("tradeRoutes", -15);
            EmergentManager.setVar("banditPower", 20); // Reset bandit power so they don't uprising every single tick
            
            // NEW: The uprising kills a random villager!
            const villagers = EmergentManager.getCharactersByFaction("villagers");
            for (const villager of villagers) {
                EmergentManager.addMemory(villager, {
                    type: "bandit_uprising",
                    target: "bandits",
                    value: -20
                });
                EmergentManager.updateOpinion(villager, "bandits", -20);
            }

            if (villagers.length > 0) {
                // Opinion-driven choice: villagers who hate bandits most take greater risks.
                const victim = villagers.reduce((selected, candidate) => {
                    if (!selected) return candidate;
                    const selectedOpinion = Number(selected.opinions && selected.opinions.bandits) || 0;
                    const candidateOpinion = Number(candidate.opinions && candidate.opinions.bandits) || 0;
                    return candidateOpinion < selectedOpinion ? candidate : selected;
                }, null);
                EmergentManager.killCharacter(victim.id, "Slain during the Bandit Uprising.");
            }
        }
    );

    // Event 2: Famine
    EmergentManager.registerRule("Famine", 
        function() {
            return EmergentManager.getVar("foodSupply") < 20;
        },
        function() {
            console.log("EVENT TRIGGERED: Famine strikes the lands.");
            EmergentManager.modFactionStat("villagers", "military", -15);
            EmergentManager.modVar("prosperity", -10);
            
            // NEW: Famine takes a toll on the weak
            const villagers = EmergentManager.getCharactersByFaction("villagers");
            for (const villager of villagers) {
                EmergentManager.addMemory(villager, {
                    type: "famine",
                    target: "world",
                    value: -10
                });
                EmergentManager.updateOpinion(villager, "bandits", -5);
            }

            if (villagers.length > 0) {
                const victim = villagers[Math.randomInt(villagers.length)];
                EmergentManager.killCharacter(victim.id, "Succumbed to starvation during the Great Famine.");
            }
        }
    );
    // Event 3: Trade Boom
    EmergentManager.registerRule("Trade Boom", 
        function() {
            return EmergentManager.getFaction("merchants").wealth > 100 &&
                   EmergentManager.getVar("banditPower") < 30;
        },
        function() {
            console.log("EVENT TRIGGERED: A Trade Boom has begun.");
            EmergentManager.modVar("prosperity", 30);
            EmergentManager.modVar("tradeRoutes", 20);
            EmergentManager.modFactionStat("villagers", "wealth", 20);
        }
    );

    //=============================================================================
    // Event Evaluation Loop
    //=============================================================================
    EmergentManager.registerTickHandler("events", 20, function(state) {
        // Gather valid events
        const possibleEvents = [];
        for (const rule of this._eventRules) {
            if (rule.condition()) {
                possibleEvents.push(rule);
            }
        }

        // Limit randomness: Only execute one major event per tick if multiple qualify
        if (possibleEvents.length > 0) {
            const chosenEvent = possibleEvents[Math.randomInt(possibleEvents.length)];
            chosenEvent.effect();
            
            // Optional: Show an MZ notification or play a sound effect here
            // $gameMessage.add("Rumors speak of: " + chosenEvent.name);
        }
    });
})();