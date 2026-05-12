/*:
 * @target MZ
 * @plugindesc [v2.0] MZ Integration — crisis, leaders, hostility switches
 * @author dijOTTER
 * @base EmergentWorld_Core
 * @base EmergentWorld_Factions
 * @base EmergentWorld_Characters
 * @base EmergentWorld_CrisisGen
 *
 * @help Player traits (Phase 3): set plugin parameters for variable IDs, or use Actor mode
 * with note tags on the actor row, e.g. <Persuasion: 4> <Negotiation: 6> <Ruthless: 2>.
 * Then use plugin commands Check Player Trait / Export Player Trait, or script:
 * EmergentManager.getPlayerTraitValue("persuasion"), EmergentManager.comparePlayerTrait(...).
 *
 * @param emergent_trait_source
 * @text Player trait source
 * @desc Variables: read game variable IDs below. Actor notes: parse tags on the chosen actor row.
 * @type select
 * @option Game variables
 * @value variables
 * @option Actor database (note tags)
 * @value actorNote
 * @default variables
 *
 * @param emergent_persuasion_var
 * @text Persuasion — variable ID
 * @desc Game variable holding the party/hero Persuasion score (when source is Game variables). 0 = unused.
 * @type variable
 * @default 0
 *
 * @param emergent_negotiation_var
 * @text Negotiation — variable ID
 * @type variable
 * @default 0
 *
 * @param emergent_ruthless_var
 * @text Ruthless — variable ID
 * @type variable
 * @default 0
 *
 * @param emergent_trait_actor_mode
 * @text Actor note — which actor row
 * @desc When source is Actor notes: use party leader's actor data, or a fixed database ID.
 * @type select
 * @option Party leader
 * @value leader
 * @option Fixed actor ID
 * @value fixed
 * @default leader
 *
 * @param emergent_trait_actor_id
 * @text Actor note — fixed actor ID
 * @desc Database Actor ID when mode is Fixed (ignored for Party leader).
 * @type actor
 * @default 1
 *
 * @command CheckFactionTrait
 * @text Check Faction Trait
 * @desc Turns a switch ON if a faction has a specific trait (legacy traits or crisisTraits).
 *
 * @arg factionId
 * @text Faction ID
 * @type string
 * @default mage_guild
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
 * @default leader_mage_guild
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
 * @default leader_mage_guild
 *
 * @arg amount
 * @type number
 * @default -5
 *
 * @command SetLeaderStanceCommand
 * @text Set Leader Stance
 * @arg leaderId
 * @type string
 * @default leader_church
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
 * @default leader_mage_guild
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
 *
 * @command ExportInterFactionStanding
 * @text Export Inter-Faction Standing
 * @desc Writes how faction A feels toward faction B (-100 hostile … +100 allied) to a variable.
 *
 * @arg fromFactionId
 * @text From Faction ID
 * @type string
 * @default church
 *
 * @arg toFactionId
 * @text Toward Faction ID
 * @type string
 * @default mage_guild
 *
 * @arg variableId
 * @text Variable
 * @type variable
 * @default 40
 *
 * @command CheckInterFactionHostile
 * @text Check Inter-Faction Hostile
 * @desc Turns a switch ON if A→B standing is at or below the hostility threshold (default -45).
 *
 * @arg factionA
 * @text From Faction ID
 * @type string
 * @default church
 *
 * @arg factionB
 * @text Toward Faction ID
 * @type string
 * @default mage_guild
 *
 * @arg threshold
 * @text Threshold (optional)
 * @type number
 * @default -45
 *
 * @arg switchId
 * @text Switch
 * @type switch
 *
 * @command ModifyInterFactionStanding
 * @text Modify Inter-Faction Standing
 * @desc Shifts A→B standing (clamped -100..100). Use symmetric for mutual shifts.
 *
 * @arg fromFactionId
 * @text From Faction ID
 * @type string
 * @default church
 *
 * @arg toFactionId
 * @text Toward Faction ID
 * @type string
 * @default mage_guild
 *
 * @arg amount
 * @text Delta
 * @type number
 * @default -5
 *
 * @arg symmetric
 * @text Apply same delta B→A
 * @type boolean
 * @default false
 *
 * @command CheckPlayerTrait
 * @text Check Player Trait
 * @desc Turns a switch ON if Persuasion / Negotiation / Ruthless compares to the threshold (dialogue gating).
 *
 * @arg trait
 * @text Trait
 * @type select
 * @option Persuasion
 * @value persuasion
 * @option Negotiation
 * @value negotiation
 * @option Ruthless
 * @value ruthless
 * @default persuasion
 *
 * @arg comparison
 * @text Comparison
 * @type select
 * @option >= (at least)
 * @value >=
 * @option > (greater than)
 * @value >
 * @option <= (at most)
 * @value <=
 * @option < (less than)
 * @value <
 * @option == (equal)
 * @value ==
 * @default >=
 *
 * @arg threshold
 * @text Threshold
 * @type number
 * @default 5
 *
 * @arg switchId
 * @text Switch
 * @type switch
 *
 * @command ExportPlayerTrait
 * @text Export Player Trait
 * @desc Writes the current Persuasion, Negotiation, or Ruthless value to a variable.
 *
 * @arg trait
 * @text Trait
 * @type select
 * @option Persuasion
 * @value persuasion
 * @option Negotiation
 * @value negotiation
 * @option Ruthless
 * @value ruthless
 * @default persuasion
 *
 * @arg variableId
 * @text Variable
 * @type variable
 * @default 50
 */

(() => {
    const pluginName = "emergentWorld_MZIntegration";
    const parameters = PluginManager.parameters(pluginName);

    const TRAIT_VAR_KEYS = {
        persuasion: "emergent_persuasion_var",
        negotiation: "emergent_negotiation_var",
        ruthless: "emergent_ruthless_var"
    };

    const NOTE_TAG_NAMES = {
        persuasion: "Persuasion",
        negotiation: "Negotiation",
        ruthless: "Ruthless"
    };

    function traitSource() {
        return String(parameters.emergent_trait_source || "variables").toLowerCase();
    }

    function parseNoteTrait(note, displayName) {
        if (!note || !displayName) return 0;
        const escaped = displayName.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        const re = new RegExp(`<\\s*${escaped}\\s*:\\s*(-?\\d+)\\s*>`, "i");
        const m = note.match(re);
        return m ? Number(m[1]) || 0 : 0;
    }

    function resolveTraitActorId() {
        const mode = String(parameters.emergent_trait_actor_mode || "leader").toLowerCase();
        if (mode === "fixed") {
            return Number(parameters.emergent_trait_actor_id) || 1;
        }
        if ($gameParty && $gameParty.leader && $gameParty.leader()) {
            return $gameParty.leader().actorId();
        }
        return Number(parameters.emergent_trait_actor_id) || 1;
    }

    EmergentManager.getPlayerTraitValue = function(traitKey) {
        const key = String(traitKey || "").toLowerCase();
        const varKey = TRAIT_VAR_KEYS[key];
        if (!varKey) return 0;

        const src = traitSource();
        if (src === "actornote" || src === "actor_note") {
            const actorId = resolveTraitActorId();
            const data = $dataActors && $dataActors[actorId];
            const tag = NOTE_TAG_NAMES[key];
            return data ? parseNoteTrait(data.note, tag) : 0;
        }

        const varId = Number(parameters[varKey]) || 0;
        if (!varId || !$gameVariables) return 0;
        return Number($gameVariables.value(varId)) || 0;
    };

    EmergentManager.comparePlayerTrait = function(traitKey, threshold, comparison) {
        const v = this.getPlayerTraitValue(traitKey);
        const th = Number(threshold) || 0;
        const cmp = String(comparison || ">=").trim();
        if (cmp === "<=") return v <= th;
        if (cmp === "==") return v === th;
        if (cmp === ">") return v > th;
        if (cmp === "<") return v < th;
        return v >= th;
    };

    const _Scene_Map_start = Scene_Map.prototype.start;
    Scene_Map.prototype.start = function() {
        _Scene_Map_start.call(this);
        if (window.EmergentManager && typeof EmergentManager.ensureFactionRelations === "function") {
            EmergentManager.ensureFactionRelations();
        }
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

    PluginManager.registerCommand(pluginName, "ExportInterFactionStanding", args => {
        const from = String(args.fromFactionId || "");
        const to = String(args.toFactionId || "");
        const v = EmergentManager.getInterFactionStanding(from, to);
        $gameVariables.setValue(Number(args.variableId), v);
    });

    PluginManager.registerCommand(pluginName, "CheckInterFactionHostile", args => {
        const a = String(args.factionA || "");
        const b = String(args.factionB || "");
        const sw = Number(args.switchId);
        let th = Number(args.threshold);
        if (!Number.isFinite(th)) {
            th = EmergentManager.INTER_FACTION_HOSTILE_THRESHOLD;
        }
        $gameSwitches.setValue(sw, EmergentManager.isInterFactionHostile(a, b, th));
    });

    PluginManager.registerCommand(pluginName, "ModifyInterFactionStanding", args => {
        const from = String(args.fromFactionId || "");
        const to = String(args.toFactionId || "");
        const amt = Number(args.amount) || 0;
        const sym = args.symmetric === true || String(args.symmetric) === "true";
        EmergentManager.modifyInterFactionStanding(from, to, amt, { symmetric: sym });
    });

    PluginManager.registerCommand(pluginName, "CheckPlayerTrait", args => {
        const trait = String(args.trait || "persuasion").toLowerCase();
        const cmp = args.comparison != null ? String(args.comparison) : ">=";
        const th = Number(args.threshold) || 0;
        const sw = Number(args.switchId);
        const ok = EmergentManager.comparePlayerTrait(trait, th, cmp);
        $gameSwitches.setValue(sw, ok);
    });

    PluginManager.registerCommand(pluginName, "ExportPlayerTrait", args => {
        const trait = String(args.trait || "persuasion").toLowerCase();
        const v = EmergentManager.getPlayerTraitValue(trait);
        $gameVariables.setValue(Number(args.variableId), v);
    });
})();
