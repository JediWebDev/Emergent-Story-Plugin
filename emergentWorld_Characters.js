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
    // DataManager Hook (Safe Spawning)
    //=============================================================================
    // We spawn characters here because $gameSystem is guaranteed to be fully 
    // assigned and ready by the time setupNewGame is called.
    const _DataManager_setupNewGame = DataManager.setupNewGame;
    DataManager.setupNewGame = function() {
        _DataManager_setupNewGame.call(this);
        
        // Spawn our starting prototype characters
        EmergentManager.spawnCharacter("Alden", "villagers", "Elder");
        EmergentManager.spawnCharacter("Bram", "bandits", "Leader");
        EmergentManager.spawnCharacter("Silas", "merchants", "Trader");
    };

    //=============================================================================
    // Character API
    //=============================================================================
    EmergentManager.spawnCharacter = function(name, factionId, role) {
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

        const id = state.characterIdCounter++;
        const newChar = {
            id: id,
            name: name,
            faction: factionId,
            role: role,
            isAlive: true,
            history: [`Spawned into the world as a ${role} of the ${factionId}.`]
        };

        state.characters.push(newChar);
        console.log(`[Characters] ${name} (${role}) has joined the ${factionId}.`);
        return newChar;
    };

    EmergentManager.getCharacter = function(id) {
        const state = $gameSystem.emergentState();
        if (!state.characters) return null;
        return state.characters.find(c => c.id === id);
    };

    EmergentManager.getCharactersByFaction = function(factionId) {
        const state = $gameSystem.emergentState();
        // Fallback for older save files that don't have the characters array yet
        if (!state.characters) state.characters = []; 
        return state.characters.filter(c => c.faction === factionId && c.isAlive);
    };

    EmergentManager.killCharacter = function(id, reason) {
        const char = this.getCharacter(id);
        if (char && char.isAlive) {
            char.isAlive = false;
            char.history.push(`Died: ${reason}`);
            console.log(`[Characters] ${char.name} has died. Cause: ${reason}`);
            
            // Factions lose power when members die (Interconnected Systems)
            if (char.role === "Leader") {
                this.modFactionStat(char.faction, "military", -10);
            } else {
                this.modFactionStat(char.faction, "military", -2);
            }
        }
    };
})();