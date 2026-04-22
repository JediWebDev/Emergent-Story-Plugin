/*:
 * @target MZ
 * @plugindesc [v1.0] Layer 3 - Character System
 * @author dijOTTER
 * @base EmergentWorld_Core
 * @base EmergentWorld_Factions
 *
 * @help EmergentWorld_Characters.js
 * * Creates and manages named NPCs that belong to factions and 
 * can be affected by world events.
 */

var Imported = Imported || {};
Imported.EmergentWorld_Characters = true;

const VisualPools = {
    merchants: [
        { name: "People1", index: 0 }, // The rich man
        { name: "People1", index: 1 }, // The rich woman
        { name: "People2", index: 7 }  // The traveling peddler
    ],
    villagers: [
        { name: "People1", index: 4 }, // The young boy
        { name: "People1", index: 5 }, // The young girl
        { name: "People2", index: 2 }  // The farmer
    ],
    guards: [
        { name: "Actor2", index: 7 },  // Standard soldier
        { name: "People4", index: 1 }  // Town watch
    ],
    bandits: [ // Added so the engine doesn't crash when making bandits!
        { name: "Monster", index: 3 }, // Orc/Goblin sprite
        { name: "People3", index: 1 }  // Shady rogue sprite
    ]
};

(() => {
    EmergentManager.MAX_CHARACTER_MEMORIES = EmergentManager.MAX_CHARACTER_MEMORIES || 20;

    const ensureCharacterMindState = (character) => {
        if (!character) return;
        if (!Array.isArray(character.memory)) character.memory = [];
        if (!character.opinions || typeof character.opinions !== "object") {
            character.opinions = {};
        }
    };

    //=============================================================================
    // Game_System Hook for Characters
    //=============================================================================
    const _Game_System_initialize = Game_System.prototype.initialize;
    Game_System.prototype.initialize = function() {
        _Game_System_initialize.call(this);
        
        // Ensure the state exists safely
        if (!this._emergentState) this._emergentState = {};
        this._emergentState.characters = [];
        this._emergentState.characterIdCounter = 0;
    };

    //=============================================================================
    // Character API
    //=============================================================================
    
    // NEW: A simple name generator
    EmergentManager.generateRandomName = function(factionId) {
        const names = ["Alden", "Bram", "Silas", "Elara", "Kael", "Lyra", "Doran", "Thane", "Garrick", "Maeve",
            "Caleb", "Rowan", "Finn", "Elias", "Jasper", "Corin", "Nolan", "Beckett", "Arthur", "Leon",
            "Aria", "Elena", "Clara", "Serena", "Vera", "Lira", "Tessa", "Mila", "Freya", "Nina"];
        return names[Math.randomInt(names.length)];
    };

    // REPLACED: spawnCharacter is now generateCharacter
    EmergentManager.generateCharacter = function(factionId, role) {
        const state = $gameSystem.emergentState();
        
        // Defensive checks to prevent crashes
        if (!state.factions || !state.factions[factionId]) {
            console.warn(`Faction ${factionId} does not exist!`);
            return null;
        }
        if (!state.characters) {
            state.characters = [];
            state.characterIdCounter = 0;
        }

        // 1. Grab the correct visual pool for this faction
        const pool = VisualPools[factionId] || [{ name: "Actor1", index: 0 }]; // Fallback
        
        // 2. Pick a random look from that pool
        const look = pool[Math.randomInt(pool.length)];
        
        // Generate their data
        const id = state.characterIdCounter++;
        const generatedName = this.generateRandomName(factionId);

        const newChar = {
            id: id,
            name: generatedName,
            faction: factionId,
            role: role,
            isAlive: true,
            history: [`Born in the current era as a ${role}.`],
            memory: [],
            opinions: {},
            
            // 3. Stamp the Visual DNA!
            spriteName: look.name,
            spriteIndex: look.index,
            faceName: look.name,   
            faceIndex: look.index  
        };

        state.characters.push(newChar);
        console.log(`[Characters] Procedurally Generated: ${newChar.name} (${role}) for ${factionId}. Look: ${look.name}_${look.index}`);
        return newChar;
    };

    EmergentManager.getCharacter = function(id) {
        const state = $gameSystem.emergentState();
        if (!state.characters) return null;
        return state.characters.find(c => c.id === id);
    };

    EmergentManager.getCharactersByFaction = function(factionId) {
        const state = $gameSystem.emergentState();
        if (!state.characters) state.characters = []; 
        return state.characters.filter(c => c.faction === factionId && c.isAlive);
    };

    EmergentManager.addMemory = function(character, memory) {
        if (!character || !memory) return;
        ensureCharacterMindState(character);

        const currentTick = ($gameSystem && $gameSystem.emergentState())
            ? $gameSystem.emergentState().ticks
            : 0;

        const normalizedMemory = {
            type: String(memory.type || "unknown"),
            target: String(memory.target || "unknown"),
            value: Number(memory.value) || 0,
            tick: memory.tick !== undefined ? Number(memory.tick) : currentTick
        };

        character.memory.push(normalizedMemory);
        if (character.memory.length > this.MAX_CHARACTER_MEMORIES) {
            const overflow = character.memory.length - this.MAX_CHARACTER_MEMORIES;
            character.memory.splice(0, overflow);
        }
        this.logEvent("memory_created", {
            characterId: character.id,
            characterName: character.name,
            memory: normalizedMemory
        });
    };

    EmergentManager.updateOpinion = function(character, target, value) {
        if (!character || target === undefined || target === null) return;
        ensureCharacterMindState(character);

        const targetKey = String(target);
        const delta = Number(value) || 0;
        const current = Number(character.opinions[targetKey]) || 0;
        const nextValue = current + delta;
        character.opinions[targetKey] = Math.max(-100, Math.min(100, nextValue));
    };

    EmergentManager.buildDecisionContext = function(character, state) {
        const safeState = state || ($gameSystem && $gameSystem.emergentState ? $gameSystem.emergentState() : {});
        const vars = safeState.variables || {};
        const ownFaction = this.getFaction(character.faction) || null;

        return {
            tick: Number(safeState.ticks || 0),
            foodSupply: Number(vars.foodSupply || 0),
            prosperity: Number(vars.prosperity || 0),
            banditPower: Number(vars.banditPower || 0),
            ownFactionId: character.faction,
            ownFactionWealth: ownFaction ? Number(ownFaction.wealth || 0) : 0,
            ownFactionMilitary: ownFaction ? Number(ownFaction.military || 0) : 0,
            banditOpinion: Number(character.opinions && character.opinions.bandits) || 0
        };
    };

    EmergentManager.getAvailableActions = function(character) {
        return [
            "do_nothing",
            "trade",
            "avoid_conflict",
            "seek_safety",
            "join_faction_action",
            "act_aggressively"
        ];
    };

    EmergentManager.scoreAction = function(character, action, context) {
        const banditOpinion = Number(context.banditOpinion || 0);
        const isTrader = character.role === "Trader";
        const isBanditAligned = character.faction === "bandits" || banditOpinion > 25;

        switch (action) {
            case "do_nothing":
                return 5;
            case "trade":
                return (isTrader ? 30 : 8) + (context.foodSupply < 30 ? 10 : 0) + (context.prosperity < 25 ? 5 : 0);
            case "avoid_conflict":
                return 10 + (context.banditPower > 45 ? 15 : 0) + (banditOpinion < -20 ? 8 : 0);
            case "seek_safety":
                return 12 + (context.banditPower > 55 ? 20 : 0) + (context.foodSupply < 20 ? 8 : 0);
            case "join_faction_action":
                if (character.faction === "villagers" && context.banditPower > 50 && banditOpinion > 40) return 35;
                if (character.faction === "villagers" && banditOpinion < -30 && context.prosperity > 30) return 24;
                return 0;
            case "act_aggressively":
                return (isBanditAligned ? 24 : 6) + (character.role === "Thug" ? 14 : 0) + (context.banditPower > 50 ? 10 : 0);
            default:
                return 0;
        }
    };

    EmergentManager.decideAction = function(character, context) {
        const actions = this.getAvailableActions(character);
        const scored = actions.map(action => ({
            action: action,
            score: this.scoreAction(character, action, context)
        }));

        scored.sort((a, b) => {
            if (b.score !== a.score) return b.score - a.score;
            return a.action.localeCompare(b.action);
        });

        const top = scored[0];
        const second = scored[1];
        const chooseSecondBest = second && Math.randomInt(100) < 15;
        return chooseSecondBest ? second.action : top.action;
    };

    EmergentManager.executeAction = function(character, action, context) {
        switch (action) {
            case "seek_safety":
                this.addMemory(character, { type: "seek_safety", target: "world", value: 5 });
                this.updateOpinion(character, "bandits", -2);
                break;
            case "avoid_conflict":
                this.addMemory(character, { type: "avoid_conflict", target: "bandits", value: 3 });
                this.updateOpinion(character, "bandits", -1);
                break;
            case "trade":
                this.addMemory(character, { type: "trade_activity", target: "merchants", value: 4 });
                this.updateOpinion(character, "merchants", 2);
                break;
            case "join_faction_action": {
                const previousFaction = character.faction;
                let nextFaction = previousFaction;

                if (previousFaction === "villagers" && context.banditPower > 50 && context.banditOpinion > 40) {
                    nextFaction = "bandits";
                } else if (previousFaction === "villagers" && context.banditOpinion < -30 && context.prosperity > 30) {
                    nextFaction = "merchants";
                }

                if (nextFaction !== previousFaction) {
                    character.faction = nextFaction;
                    this.addMemory(character, { type: "faction_shift", target: nextFaction, value: 10 });
                    this.logEvent("npc_faction_changed", {
                        characterId: character.id,
                        characterName: character.name,
                        fromFaction: previousFaction,
                        toFaction: nextFaction
                    });
                } else {
                    this.addMemory(character, { type: "faction_loyalty", target: previousFaction, value: 2 });
                }
                break;
            }
            case "act_aggressively":
                this.addMemory(character, { type: "aggressive_posture", target: "bandits", value: 6 });
                this.updateOpinion(character, "bandits", character.faction === "bandits" ? 3 : -2);
                break;
            case "do_nothing":
            default:
                // Intentionally minimal for baseline stability.
                this.addMemory(character, { type: "idle", target: "world", value: 0 });
                break;
        }
    };

    EmergentManager.killCharacter = function(id, reason) {
        const char = this.getCharacter(id);
        if (char && char.isAlive) {
            ensureCharacterMindState(char);
            char.isAlive = false;
            char.history.push(`Died: ${reason}`);
            this.logEvent("character_death", {
                characterId: char.id,
                characterName: char.name,
                factionId: char.faction,
                role: char.role,
                reason: reason
            });
            
            if (char.role === "Leader") {
                this.modFactionStat(char.faction, "military", -10);
            } else {
                this.modFactionStat(char.faction, "military", -2);
            }
        }
    };

    EmergentManager.registerTickHandler("character_decisions", 25, function(state) {
        const characters = state && Array.isArray(state.characters) ? state.characters : [];
        for (const character of characters) {
            if (!character || !character.isAlive) continue;
            ensureCharacterMindState(character);

            const context = this.buildDecisionContext(character, state);
            const action = this.decideAction(character, context);
            this.executeAction(character, action, context);

            // Example full cycle:
            // Villager with very negative opinion of bandits in a high-bandit world can score
            // "seek_safety" highest -> executeAction adds seek_safety memory and lowers bandit opinion.
            this.logEvent("npc_decision", {
                characterId: character.id,
                characterName: character.name,
                factionId: character.faction,
                action: action,
                tick: context.tick
            });
        }
    });
})();