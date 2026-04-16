/*:
 * @target MZ
 * @plugindesc [v1.0] Layer 6 - MZ Integration (Visuals & Dialogue)
 * @author dijOTTER
 * @base EmergentWorld_Core
 * @base EmergentWorld_Characters
 *
 * @command CheckFactionTrait
 * @text Check Faction Trait
 * @desc Turns a switch ON if a faction has a specific trait, useful for changing map visuals.
 * * @arg factionId
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
 * * @command SpeakCharacterMemory
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
        const char = EmergentManager.getCharacter(Number(args.charId));
        
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
})();