/*:
 * @target MZ
 * @plugindesc [v2.0] MZ Integration — crisis, leaders, hostility switches
 * @author dijOTTER
 * @base EmergentWorld_Core
 * @base EmergentWorld_Characters
 * @base EmergentWorld_CrisisGen
 *
 * @command CheckFactionTrait
 * @text Check Faction Trait
 * @desc Turns a switch ON if a faction has a specific trait (legacy traits or crisisTraits).
 *
 * @arg factionId
 * @text Faction ID
 * @type string
 * @default merchants
 *
 * @arg trait
 * @text Trait to Check
 * @type string
 * @default OPPORTUNIST
 *
 * @arg switchId
 * @text Switch ID to Toggle
 * @type switch
 *
 * @command AdvanceNarrativeTurn
 * @text Advance Narrative Turn
 * @desc Runs one crisis simulation beat (inn sleep, dungeon clear, milestone).
 *
 * @arg reason
 * @text Reason (for logs)
 * @type string
 * @default milestone
 *
 * @command ExportCrisisToVariables
 * @text Export Crisis To Variables
 * @desc Writes crisis name, antagonist, tension to game variables for message boxes.
 *
 * @arg varCrisisName
 * @type variable
 * @default 20
 *
 * @arg varAntagonist
 * @type variable
 * @default 21
 *
 * @arg varTension
 * @type variable
 * @default 22
 *
 * @command ExportLeaderToVariables
 * @text Export Leader To Variables
 * @desc Writes leader name, trait, relationship, stance for dialogue branches.
 *
 * @arg leaderId
 * @type string
 * @default leader_merchants
 *
 * @arg varName
 * @type variable
 * @default 30
 *
 * @arg varTrait
 * @type variable
 * @default 31
 *
 * @arg varRelationship
 * @type variable
 * @default 32
 *
 * @arg varStance
 * @type variable
 * @default 33
 *
 * @command ModifyLeaderRelationship
 * @text Modify Leader Relationship
 * @desc Shifts relationshipToPlayer; below -50 marks faction hostile (switch 61–65).
 *
 * @arg leaderId
 * @type string
 * @default leader_merchants
 *
 * @arg amount
 * @type number
 * @default -5
 *
 * @command SetLeaderStanceCommand
 * @text Set Leader Stance
 * @arg leaderId
 * @type string
 * @default leader_villagers
 *
 * @arg stance
 * @type string
 * @default OPPOSE
 *
 * @command RefreshHostilitySwitches
 * @text Refresh Hostility Switches
 * @desc Re-applies faction hostileToPlayer to switches 61–65.
 *
 * @command SpeakCharacterMemory
 * @text Speak Leader Line
 * @desc Shows the leader's stance on the crisis (replaces old memory dialogue).
 *
 * @arg charId
 * @text Leader ID
 * @type string
 * @default leader_merchants
 *
 * @command CheckDragonEcho
 * @text Check Dragon Echo Level
 * @arg threshold
 * @type number
 * @default 30
 * @arg switchId
 * @type switch
 *
 * @command CheckNPCQuestStatus
 * @text Check NPC Quest Status
 * @arg npcName
 * @type string
 * @arg switchAvailable
 * @type switch
 * @arg switchTurnIn
 * @type switch
 */

(() => {
    const pluginName = "emergentWorld_MZIntegration";

    const _Scene_Map_start = Scene_Map.prototype.start;
    Scene_Map.prototype.start = function() {
        _Scene_Map_start.call(this);
        if (window.EmergentManager && typeof EmergentManager.refreshFactionHostilitySwitches === "function") {
            EmergentManager.refreshFactionHostilitySwitches();
        }
    };

    PluginManager.registerCommand(pluginName, "CheckFactionTrait", args => {
        const faction = EmergentManager.getFaction(args.factionId);
        const switchId = Number(args.switchId);
        const want = String(args.trait || "");
        if (!faction) {
            $gameSwitches.setValue(switchId, false);
            return;
        }
        const legacy = Array.isArray(faction.traits) && faction.traits.includes(want);
        const crisisT = Array.isArray(faction.crisisTraits) && faction.crisisTraits.includes(want);
        $gameSwitches.setValue(switchId, legacy || crisisT);
    });

    PluginManager.registerCommand(pluginName, "AdvanceNarrativeTurn", args => {
        const reason = args.reason != null ? String(args.reason) : "milestone";
        EmergentManager.advanceNarrativeTurn(reason);
    });

    PluginManager.registerCommand(pluginName, "ExportCrisisToVariables", args => {
        const c = EmergentManager.getCurrentCrisis && EmergentManager.getCurrentCrisis();
        const state = $gameSystem.emergentState();
        $gameVariables.setValue(Number(args.varCrisisName), c ? c.name : "");
        $gameVariables.setValue(Number(args.varAntagonist), state.currentAntagonist || "");
        $gameVariables.setValue(Number(args.varTension), Number(state.worldTension) || 0);
    });

    PluginManager.registerCommand(pluginName, "ExportLeaderToVariables", args => {
        const lid = args.leaderId != null ? String(args.leaderId) : "";
        const leader = EmergentManager.getLeader(lid);
        $gameVariables.setValue(Number(args.varName), leader ? leader.name : "");
        $gameVariables.setValue(Number(args.varTrait), leader ? leader.trait : "");
        $gameVariables.setValue(Number(args.varRelationship), leader ? leader.relationshipToPlayer : 0);
        $gameVariables.setValue(Number(args.varStance), leader ? leader.stanceOnCrisis : "");
    });

    PluginManager.registerCommand(pluginName, "ModifyLeaderRelationship", args => {
        const lid = args.leaderId != null ? String(args.leaderId) : "";
        const amt = Number(args.amount) || 0;
        EmergentManager.modifyRelationship(lid, amt);
    });

    PluginManager.registerCommand(pluginName, "SetLeaderStanceCommand", args => {
        const lid = args.leaderId != null ? String(args.leaderId) : "";
        EmergentManager.setLeaderStance(lid, args.stance);
    });

    PluginManager.registerCommand(pluginName, "RefreshHostilitySwitches", () => {
        EmergentManager.refreshFactionHostilitySwitches();
    });

    PluginManager.registerCommand(pluginName, "SpeakCharacterMemory", args => {
        let cid = args.charId;
        if (cid != null && typeof cid !== "string") cid = String(cid);
        const leader = EmergentManager.getLeader(cid);

        if (!leader) {
            $gameMessage.add("...");
            return;
        }

        const crisis = EmergentManager.getCurrentCrisis && EmergentManager.getCurrentCrisis();
        const crisisBit = crisis ? `On ${crisis.name}: ` : "";
        const line = `${crisisBit}My stance is ${leader.stanceOnCrisis}. (${leader.trait})`;

        $gameMessage.setSpeakerName(leader.name);
        $gameMessage.add(line);

        const faction = EmergentManager.getFaction(leader.factionId);
        if (faction && faction.hostileToPlayer) {
            $gameMessage.add("\\c[2]*Their faction considers you an enemy.*\\c[0]");
        }
    });

    PluginManager.registerCommand(pluginName, "CheckDragonEcho", args => {
        const echoLevel = EmergentManager.getVar("dragonEcho");
        const switchId = Number(args.switchId);
        $gameSwitches.setValue(switchId, echoLevel >= Number(args.threshold));
    });

    PluginManager.registerCommand(pluginName, "CheckNPCQuestStatus", args => {
        const npcName = args.npcName;
        const availableSwitch = Number(args.switchAvailable);
        const turnInSwitch = Number(args.switchTurnIn);

        $gameSwitches.setValue(availableSwitch, false);
        $gameSwitches.setValue(turnInSwitch, false);

        const state = $gameSystem.emergentState();
        if (!state || !state.quests) return;

        const newQuest = state.quests.find(q => q.giverName === npcName && q.status === "active" && !q.objectiveMet);
        if (newQuest) {
            const cgmzQuest = (typeof $cgmz !== "undefined") ? $cgmz.getQuest(newQuest.title) : null;
            if (!cgmzQuest || !cgmzQuest._isStarted) {
                $gameSwitches.setValue(availableSwitch, true);
            }
        }

        const readyQuest = state.quests.find(q => q.giverName === npcName && q.status === "active" && q.objectiveMet);
        if (readyQuest) {
            $gameSwitches.setValue(turnInSwitch, true);
        }
    });
})();
