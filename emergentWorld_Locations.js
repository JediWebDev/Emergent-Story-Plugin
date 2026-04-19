/*:
 * @target MZ
 * @plugindesc [v1.0] Layer 4 - Location & Object Generator
 * @author Emergent Story System
 * @base EmergentWorld_Core
 * @base EmergentWorld_Quests
 *
 * @help EmergentWorld_Locations.js
 * * Assigns physical locations to generated quests and tracks 
 * * objective completion (e.g., defeating a monster event).
 *
 * Script Calls for Events (Monsters/Nodes):
 * EmergentManager.markObjectiveComplete("template_id")
 * Example: EmergentManager.markObjectiveComplete("bandit_bounty")
 */

var Imported = Imported || {};
Imported.EmergentWorld_Locations = true;

(() => {
    //=============================================================================
    // Prototype Location Pools
    //=============================================================================
    const locationPools = {
        "bandit_bounty": ["The Old Ruins", "Whispering Woods Camp", "Northern Pass"],
        "gather_rations": ["Sun-Dappled Forest", "The Riverbanks", "Abandoned Farm"]
    };

    //=============================================================================
    // Intercept Quest Generation (Attach Location & Objectives)
    //=============================================================================
    const _EmergentManager_generateQuest = EmergentManager.generateQuest;
    EmergentManager.generateQuest = function (templateId, problemLevel) {
        const quest = _EmergentManager_generateQuest.call(this, templateId, problemLevel);

        if (quest) {
            const possibleLocations = locationPools[templateId] || ["Unknown Area"];
            quest.locationName = possibleLocations[Math.randomInt(possibleLocations.length)];
            quest.objectiveMet = false;

            if (templateId === "bandit_bounty") {
                quest.description += ` They have set up camp at ${quest.locationName}.`;
            } else if (templateId === "gather_rations") {
                quest.description += ` Search for supplies around ${quest.locationName}.`;
            }

            console.log(`[Locations] Quest routed to: ${quest.locationName}`);
        }
        return quest;
    };

    //=============================================================================
    // API for Map Events (The physical monsters or objects)
    //=============================================================================
    EmergentManager.markObjectiveComplete = function (templateId) {
        const state = $gameSystem.emergentState();
        if (!state.quests) return;

        const quest = state.quests.find(q => q.template === templateId && q.status === 'active' && !q.objectiveMet);

        if (quest) {
            quest.objectiveMet = true;
            console.log(`[Locations] Objective complete for: ${quest.title}.`);

            if ($gameMessage) {
                if (!$gameMessage.isBusy()) {
                    $gameMessage.add(`\\c[3]Objective Complete:\\c[0] Return to ${quest.giverName}.`);
                } else {
                    $gameVariables.setValue(95, `\\c[3]Objective Complete:\\c[0] Return to ${quest.giverName}.`);
                    $gameSwitches.setValue(95, true); 
                }
            }
        }
    };

    //=============================================================================
    // Intercept Quest Turn-In (Enforce the gameplay loop)
    //=============================================================================
    const _EmergentManager_completeQuest = EmergentManager.completeQuest;
    EmergentManager.completeQuest = function (questId) {
        const state = $gameSystem.emergentState();
        const quest = state.quests.find(q => q.id === questId);

        if (quest && quest.status === 'active') {
            if (quest.objectiveMet) {
                _EmergentManager_completeQuest.call(this, questId);
            } else {
                console.log(`[Locations] Turn-in rejected. Objective at ${quest.locationName} not met.`);
                if ($gameMessage && !$gameMessage.isBusy()) {
                    $gameMessage.add(`${quest.giverName}: "You haven't finished the job yet! Check ${quest.locationName}."`);
                }
            }
        }
    };
})();