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
        if (!character.relationships || typeof character.relationships !== "object") {
            character.relationships = {};
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

    EmergentManager.generateUniqueCharacterId = function(name, role, state) {
        if (!state) {
            console.warn("[WorldBootstrap] generateUniqueCharacterId called without state");
            return "unknown_unknown_0";
        }
        if (state._emergentSessionSeed === undefined) {
            state._emergentSessionSeed = Date.now() + Math.randomInt(1e6);
        }
        if (!state._emergentUsedCharacterIdKeys) {
            state._emergentUsedCharacterIdKeys = {};
        }
        if (state.characterIdCounter === undefined || state.characterIdCounter === null) {
            state.characterIdCounter = 0;
        }
        const safeName = String(name != null ? name : "unknown").replace(/[^a-zA-Z0-9]+/g, "_");
        const safeRole = String(role != null ? role : "none").replace(/[^a-zA-Z0-9]+/g, "_");
        const seed = String(state._emergentSessionSeed);
        const MAX_COLLISION = 100000;
        for (let guard = 0; guard < MAX_COLLISION; guard++) {
            const id = `${safeName}_${safeRole}_${seed}_${state.characterIdCounter}`;
            state.characterIdCounter++;
            if (!state._emergentUsedCharacterIdKeys[id]) {
                state._emergentUsedCharacterIdKeys[id] = true;
                return String(id);
            }
        }
        console.error("[WorldBootstrap] generateUniqueCharacterId: collision guard exceeded; scanning counter");
        let extra = 0;
        while (extra < MAX_COLLISION) {
            const id = `${safeName}_${safeRole}_${seed}_${state.characterIdCounter}`;
            state.characterIdCounter++;
            extra++;
            if (!state._emergentUsedCharacterIdKeys[id]) {
                state._emergentUsedCharacterIdKeys[id] = true;
                return String(id);
            }
        }
        console.error("[WorldBootstrap] generateUniqueCharacterId: unable to allocate id");
        const emergencyId = `unknown_unknown_${seed}_${state.characterIdCounter}`;
        state.characterIdCounter++;
        state._emergentUsedCharacterIdKeys[emergencyId] = true;
        return String(emergencyId);
    };

    // REPLACED: spawnCharacter is now generateCharacter
    EmergentManager.generateCharacter = function(factionId, role) {
        if (window.EMERGENT_WORLD_INITIALIZED) {
            console.warn("[Characters] Prevented duplicate generation.");
            return null;
        }
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
        if (state._emergentUsedCharacterIdKeys === undefined) {
            state._emergentUsedCharacterIdKeys = {};
        }

        // 1. Grab the correct visual pool for this faction
        const pool = VisualPools[factionId] || [{ name: "Actor1", index: 0 }]; // Fallback
        
        // 2. Pick a random look from that pool
        const look = pool[Math.randomInt(pool.length)];
        const generatedName = this.generateRandomName(factionId);
        const id = this.generateUniqueCharacterId(generatedName, role, state);

        if (typeof id !== "string") {
            console.warn("[WorldBootstrap] Non-string ID detected:", id);
        }
        const newChar = {
            id: id,
            name: generatedName,
            faction: factionId,
            role: role,
            isAlive: true,
            history: [`Born in the current era as a ${role}.`],
            memory: [],
            opinions: {},
            relationships: {},
            
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

    EmergentManager.getCharacter = function(lookup) {
        const state = $gameSystem.emergentState();
        if (!state.characters) return null;
        if (lookup === undefined || lookup === null) return null;
        if (typeof lookup !== "string") {
            console.warn("[WorldBootstrap] Non-string ID detected:", lookup);
        }
        return state.characters.find(c => c && c.id === lookup) || null;
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
        const current = Math.round(Math.max(-100, Math.min(100, Number(character.opinions[targetKey]) || 0)));
        const nextValue = current + delta;
        const clamped = Math.round(Math.max(-100, Math.min(100, nextValue)));
        if (clamped === current) return;
        character.opinions[targetKey] = clamped;

        if (delta !== 0) {
            this.logEvent("npc_opinion_shift", {
                characterId: character.id,
                characterName: character.name,
                target: targetKey,
                previousValue: current,
                delta: delta,
                newValue: clamped
            });
        }
    };

    EmergentManager.getRelationship = function(a, b) {
        if (!a || !b) return 0;
        ensureCharacterMindState(a);
        const key = String(b.id);
        return Number(a.relationships[key]) || 0;
    };

    EmergentManager.updateRelationship = function(a, b, delta) {
        if (!a || !b || a.id === b.id) return;
        ensureCharacterMindState(a);
        ensureCharacterMindState(b);

        const amount = Number(delta) || 0;
        if (amount === 0) return;

        const aKey = String(b.id);
        const bKey = String(a.id);
        const oldAB = Number(a.relationships[aKey]) || 0;
        const oldBA = Number(b.relationships[bKey]) || 0;
        const nextAB = Math.max(-100, Math.min(100, oldAB + amount));
        const nextBA = Math.max(-100, Math.min(100, oldBA + amount));

        a.relationships[aKey] = nextAB;
        b.relationships[bKey] = nextBA;

        this.logEvent("npc_relationship_changed", {
            aId: a.id,
            bId: b.id,
            delta: amount,
            newAB: nextAB,
            newBA: nextBA
        });
    };

    EmergentManager.getNearbyNPCs = function(character, state) {
        const chars = state && Array.isArray(state.characters) ? state.characters : [];
        return chars.filter(other => other && other.isAlive && other.id !== character.id);
    };

    EmergentManager.calculateGroupAffiliation = function(character) {
        if (!character) return { groupType: "independent", strength: 0 };
        ensureCharacterMindState(character);

        const scores = {
            bandits: Number(character.opinions.bandits) || 0,
            merchants: Number(character.opinions.merchants) || 0,
            villagers: Number(character.opinions.villagers) || 0
        };
        scores[character.faction] = (Number(scores[character.faction]) || 0) + 12;

        let bestType = "independent";
        let bestScore = 0;
        for (const key in scores) {
            if (scores[key] > bestScore) {
                bestScore = scores[key];
                bestType = key;
            }
        }

        return {
            groupType: bestType,
            strength: Math.max(0, Math.min(100, bestScore))
        };
    };

    EmergentManager.applySocialInfluence = function(actor, action, state) {
        if (!actor || !actor.isAlive) return;
        const observers = this.getNearbyNPCs(actor, state);
        const actorFaction = String(actor.faction || "unknown");
        const actorNewFaction = actor._lastFactionShiftTo || null;

        for (const observer of observers) {
            ensureCharacterMindState(observer);
            const relationBefore = this.getRelationship(observer, actor);

            if (action === "act_aggressively") {
                this.updateOpinion(observer, actorFaction, -2);
                this.updateRelationship(observer, actor, -3);
            } else if (action === "trade" || action === "support_group_action" || action === "help") {
                this.updateOpinion(observer, actorFaction, 1);
                this.updateRelationship(observer, actor, 2);
            } else if (action === "join_faction_action" && actorNewFaction) {
                const trust = relationBefore >= 0 ? 1 : -1;
                this.updateOpinion(observer, actorNewFaction, trust);
                this.updateRelationship(observer, actor, trust > 0 ? 1 : -1);
            } else if (action === "join_group_action" || action === "follow_leader_action") {
                this.updateRelationship(observer, actor, 1);
            }
        }
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
            "act_aggressively",
            "join_group_action",
            "support_group_action",
            "follow_leader_action"
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
            case "join_group_action":
                return Number(context.groupStrength || 0) > 35 ? 22 : 0;
            case "support_group_action":
                return Number(context.groupStrength || 0) > 45 ? 24 : 0;
            case "follow_leader_action":
                return context.coordinationAction === "follow_leader_action" ? 28 : 0;
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

        // Coordination bonus: trusted social clusters can gently align behavior.
        if (context.coordinationAction) {
            const coordinated = scored.find(s => s.action === context.coordinationAction);
            if (coordinated) coordinated.score += 18;
        }

        scored.sort((a, b) => {
            if (b.score !== a.score) return b.score - a.score;
            return a.action.localeCompare(b.action);
        });

        const top = scored[0];
        const second = scored[1];
        const chooseSecondBest = second && Math.randomInt(100) < 15;
        const chosen = chooseSecondBest ? second.action : top.action;
        return chosen != null ? chosen : "do_nothing";
    };

    EmergentManager.executeAction = function(character, action, context) {
        character._lastFactionShiftTo = null;

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
                    character._lastFactionShiftTo = nextFaction;
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
            case "join_group_action":
                this.addMemory(character, { type: "group_alignment", target: context.groupType || "independent", value: 4 });
                this.updateOpinion(character, context.groupType || character.faction, 2);
                break;
            case "support_group_action":
                this.addMemory(character, { type: "group_support", target: context.groupType || character.faction, value: 5 });
                this.updateOpinion(character, context.groupType || character.faction, 1);
                break;
            case "follow_leader_action":
                if (context.groupLeaderId !== undefined && context.groupLeaderId !== null) {
                    this.addMemory(character, { type: "follow_leader", target: String(context.groupLeaderId), value: 3 });
                    const leader = this.getCharacter(context.groupLeaderId);
                    if (leader) this.updateRelationship(character, leader, 1);
                } else {
                    this.addMemory(character, { type: "follow_leader", target: "unknown", value: 1 });
                }
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
            if (character.mode === "AUTONOMOUS") continue;
            ensureCharacterMindState(character);

            const context = this.buildDecisionContext(character, state);
            const nearby = this.getNearbyNPCs(character, state);
            let avgRelationship = 0;
            let relationCount = 0;
            let bestLeader = null;
            let bestLeaderRelationship = -101;

            for (const other of nearby) {
                const rel = this.getRelationship(character, other);
                avgRelationship += rel;
                relationCount++;
                if (rel > bestLeaderRelationship) {
                    bestLeaderRelationship = rel;
                    bestLeader = other;
                }
            }
            if (relationCount > 0) avgRelationship /= relationCount;

            const group = this.calculateGroupAffiliation(character);
            context.groupType = group.groupType;
            context.groupStrength = group.strength;
            context.groupLeaderId = bestLeader ? bestLeader.id : null;

            if (avgRelationship > 40 && bestLeader && bestLeader._lastAction) {
                if (bestLeader._lastAction === "act_aggressively") {
                    context.coordinationAction = "follow_leader_action";
                } else if (bestLeader._lastAction === "trade" || bestLeader._lastAction === "support_group_action") {
                    context.coordinationAction = "support_group_action";
                } else {
                    context.coordinationAction = "join_group_action";
                }
            } else if (avgRelationship < -20) {
                context.coordinationAction = "do_nothing";
            }

            let action = this.decideAction(character, context);
            if (action == null || action === "") {
                action = "do_nothing";
            }
            this.executeAction(character, action, context);
            character._lastAction = action;
            character._lastActionTick = context.tick;

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

            if (group.strength >= 35) {
                this.logEvent("npc_group_formed", {
                    characterId: character.id,
                    groupType: group.groupType,
                    strength: group.strength
                });
            }
        }
    });

    EmergentManager.registerTickHandler("npc_social_reactions", 26, function(state) {
        const characters = state && Array.isArray(state.characters) ? state.characters : [];
        for (const actor of characters) {
            if (!actor || !actor.isAlive) continue;
            if (actor.mode === "AUTONOMOUS") continue;
            if (actor._lastActionTick !== state.ticks) continue;
            this.applySocialInfluence(actor, actor._lastAction, state);

            // Full chain reaction example:
            // NPC A act_aggressively -> NPC B observes and gets opinion/relationship penalties ->
            // over multiple ticks NPC B can shift to anti-bandit decisions and eventually faction-shift.
        }
    });
})();