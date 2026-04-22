/*:
 * @target MZ
 * @plugindesc [v1.0] Layer 8 - MZ Integration (Visuals & Dialogue)
 * @author dijOTTER
 * @base EmergentWorld_Core
 * @base EmergentWorld_Characters
 *
 * @command CheckFactionTrait
 * @text Check Faction Trait
 * @desc Turns a switch ON if a faction has a specific trait, useful for changing map visuals.
 *
 * @arg factionId
 * @text Faction ID
 * @type string
 * @default valemont
 *
 * @arg trait
 * @text Trait to Check
 * @type string
 * @default Rebellious
 *
 * @arg switchId
 * @text Switch ID to Toggle
 * @type switch
 *
 * @command SpeakCharacterMemory
 * @text Speak Character Memory
 * @desc Makes an NPC state their most recent memory or emergent history.
 *
 * @arg charId
 * @text Character ID
 * @type number
 * @default 0
 *
 * @command CheckDragonEcho
 * @text Check Dragon Echo Level
 * @desc Checks if the Dragon Echo is above a certain threshold to trigger environmental effects.
 *
 * @arg threshold
 * @text Threshold Value
 * @type number
 * @default 30
 *
 * @arg switchId
 * @text Switch ID to Toggle
 * @type switch
 * * @command CheckNPCQuestStatus
 * @text Check NPC Quest Status
 * @desc Checks if this specific NPC has an emergent quest to give or receive.
 *
 * @arg npcName
 * @text NPC Name
 * @type string
 * @desc The exact name of the NPC (e.g., Alden)
 *
 * @arg switchAvailable
 * @text Quest Available Switch
 * @type switch
 * @desc Turns ON if they have a new quest to give.
 *
 * @arg switchTurnIn
 * @text Ready to Turn In Switch
 * @type switch
 * @desc Turns ON if the player has met the objectives and needs to turn it in.
 */

(() => {
    const pluginName = "emergentWorld_MZIntegration";

    // 1. Visual Integration: Faction Traits to Event Pages
    PluginManager.registerCommand(pluginName, "CheckFactionTrait", args => {
        const faction = EmergentManager.getFaction(args.factionId);
        const switchId = Number(args.switchId);

        if (faction && faction.traits.includes(args.trait)) {
            $gameSwitches.setValue(switchId, true);
        } else {
            $gameSwitches.setValue(switchId, false);
        }
    });

    // 2. Visual Integration: Global World Pressures (Dragon Echo)
    PluginManager.registerCommand(pluginName, "CheckDragonEcho", args => {
        const echoLevel = EmergentManager.getVar("dragonEcho");
        const switchId = Number(args.switchId);

        if (echoLevel >= Number(args.threshold)) {
            $gameSwitches.setValue(switchId, true);
        } else {
            $gameSwitches.setValue(switchId, false);
        }
    });

    // 3. NPC Update: Dynamic Dialogue Generation
    PluginManager.registerCommand(pluginName, "SpeakCharacterMemory", args => {
        const char = EmergentManager.getCharacter(args.charId);

        if (!char) {
            $gameMessage.add("..."); // Fallback if character isn't spawned
            return;
        }

        if (char.isAlive) {
            // Pull the most recent event from their history
            const latestMemory = char.history[char.history.length - 1];

            // Format the dialogue box
            $gameMessage.setSpeakerName(char.name);
            $gameMessage.add(latestMemory);

            // Optional: Add flavor text based on faction loyalty or fear
            const faction = EmergentManager.getFaction(char.faction);
            if (faction && faction.fear > 50) {
                $gameMessage.add("\\c[2]*They look around nervously...*\\c[0]");
            }
        } else {
            $gameMessage.add("This person is no longer with us...");
        }
    });

    // 4. Visual Integration: NPC Dynamic Quest Availability
    PluginManager.registerCommand(pluginName, "CheckNPCQuestStatus", args => {
        const npcName = args.npcName;
        const availableSwitch = Number(args.switchAvailable);
        const turnInSwitch = Number(args.switchTurnIn);

        // Default to OFF
        $gameSwitches.setValue(availableSwitch, false);
        $gameSwitches.setValue(turnInSwitch, false);

        const state = $gameSystem.emergentState();
        if (!state || !state.quests) return;

        // 1. Check if they have a NEW quest to give (Status: active, Objective NOT met)
        // FIX: Using .find() so we can reference the quest's title cleanly
        const newQuest = state.quests.find(q => q.giverName === npcName && q.status === 'active' && !q.objectiveMet);
        
        if (newQuest) {
            // Double check CGMZ hasn't already started it
            // Using typeof check prevents crashes if CGMZ isn't loaded yet
            const cgmzQuest = (typeof $cgmz !== 'undefined') ? $cgmz.getQuest(newQuest.title) : null;
            if (!cgmzQuest || !cgmzQuest._isStarted) {
                $gameSwitches.setValue(availableSwitch, true);
            }
        }

        // 2. Check if they have a quest READY TO TURN IN (Status: active, Objective IS met)
        const readyQuest = state.quests.find(q => q.giverName === npcName && q.status === 'active' && q.objectiveMet);
        
        if (readyQuest) {
            $gameSwitches.setValue(turnInSwitch, true);
        }
    });
})();