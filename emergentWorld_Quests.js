/*:
 * @target MZ
 * @plugindesc [v1.0] Layer 6 - Quest Generator
 * @author dijOTTER
 * @base EmergentWorld_Core
 * @base EmergentWorld_Characters
 *
 * @help EmergentWorld_Quests.js
 * * Scans the world state for problems and generates dynamic quests.
 *
 * Script Calls for Events:
 * EmergentManager.getAvailableQuests() -> Returns array of active quests
 * EmergentManager.completeQuest(questId) -> Marks a quest complete and gives rewards
 */

var Imported = Imported || {};
Imported.EmergentWorld_Quests = true;

(() => {
    //=============================================================================
    // Initialization
    //=============================================================================
    const _Game_System_initialize = Game_System.prototype.initialize;
    Game_System.prototype.initialize = function() {
        _Game_System_initialize.call(this);
        if (!this._emergentState) this._emergentState = {};
        this._emergentState.quests = [];
        this._emergentState.questIdCounter = 0;
    };

    // Ensure array exists on old save files
    const ensureQuestState = () => {
        const state = $gameSystem.emergentState();
        if (!state.quests) {
            state.quests = [];
            state.questIdCounter = 0;
        }
        return state;
    };

    //=============================================================================
    // Quest API
    //=============================================================================
    EmergentManager.generateQuest = function(templateId, problemLevel) {
        const state = ensureQuestState();
        
        // Prevent duplicate quests of the same template from flooding the board
        const existingQuest = state.quests.find(q => q.template === templateId && q.status === 'active');
        if (existingQuest) return null;

        let quest = {
            id: state.questIdCounter++,
            template: templateId,
            status: 'active',
            title: "Unknown Quest",
            description: "",
            giverName: "Unknown",
            rewardGold: 0
        };

        // Process templates based on the Design Doc structure
        if (templateId === "bandit_bounty") {
            const merchants = this.getCharactersByFaction("merchants");
            if (merchants.length === 0) return null; // No one to give the quest!
            
            const giver = merchants[Math.randomInt(merchants.length)];
            quest.giverName = giver.name;
            quest.title = "Bounty: Cull the Bandits";
            quest.description = `${giver.name} is willing to pay you to reduce the bandit threat.`;
            quest.rewardGold = 100 + (problemLevel * 2); // Harder problem = better pay
            
        } else if (templateId === "gather_rations") {
            const villagers = this.getCharactersByFaction("villagers");
            if (villagers.length === 0) return null;
            
            const giver = villagers[Math.randomInt(villagers.length)];
            quest.giverName = giver.name;
            quest.title = "Emergency Rations";
            quest.description = `The village is starving. ${giver.name} needs you to gather food.`;
            quest.rewardGold = 50;
        }

        state.quests.push(quest);
        console.log(`[Quests] New Quest Generated: ${quest.title} (Giver: ${quest.giverName})`);
        return quest;
    };

    EmergentManager.getAvailableQuests = function() {
        return ensureQuestState().quests.filter(q => q.status === 'active');
    };

    EmergentManager.completeQuest = function(questId) {
        const state = ensureQuestState();
        const quest = state.quests.find(q => q.id === questId);
        
        if (quest && quest.status === 'active') {
            quest.status = 'completed';
            $gameParty.gainGold(quest.rewardGold);
            console.log(`[Quests] Quest Completed: ${quest.title}. Rewarded ${quest.rewardGold}G.`);
            
            // Impact the world state based on the quest template!
            if (quest.template === "bandit_bounty") {
                this.modVar("banditPower", -20);
                this.modVar("prosperity", 5);
                this.modFactionStat("bandits", "military", -15);
            } else if (quest.template === "gather_rations") {
                this.modVar("foodSupply", 30);
                this.modFactionStat("villagers", "wealth", -10); // They spent wealth to pay you
            }
        }
    };

    //=============================================================================
    // Detector Hook (Scans the world to generate quests)
    //=============================================================================
    const _EmergentManager_onTick = EmergentManager.onTick;
    EmergentManager.onTick = function() {
        if (_EmergentManager_onTick) _EmergentManager_onTick.call(this);

        // Detect problems and convert them to quests
        const banditPower = this.getVar("banditPower");
        if (banditPower > 40) {
            this.generateQuest("bandit_bounty", banditPower);
        }

        const foodSupply = this.getVar("foodSupply");
        if (foodSupply < 30) {
            this.generateQuest("gather_rations", foodSupply);
        }
    };
})();