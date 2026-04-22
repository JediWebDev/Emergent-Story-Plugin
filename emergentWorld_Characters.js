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

    EmergentManager.killCharacter = function(id, reason) {
        const char = this.getCharacter(id);
        if (char && char.isAlive) {
            char.isAlive = false;
            char.history.push(`Died: ${reason}`);
            console.log(`[Characters] ${char.name} has died. Cause: ${reason}`);
            
            if (char.role === "Leader") {
                this.modFactionStat(char.faction, "military", -10);
            } else {
                this.modFactionStat(char.faction, "military", -2);
            }
        }
    };
})();