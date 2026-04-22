/*:
 * @target MZ
 * @plugindesc [v1.1] Layer 9 - History & Epoch Engine (Multi-Faction)
 * @author dijOTTER
 * @base EmergentWorld_Core
 * @base EmergentWorld_Characters
 *
 * @help EmergentWorld_HistoryGen.js
 * Generates the deep history of Aldenmerre before the game starts.
 * Features multi-faction political interactions between the Royal House, 
 * the Holy Church, and the Mage Guild.
 */

var Imported = Imported || {};
Imported.EmergentWorld_HistoryGen = true;

(() => {
    //=============================================================================
    // Initialize History State
    //=============================================================================
    const _Game_System_initialize = Game_System.prototype.initialize;
    Game_System.prototype.initialize = function() {
        _Game_System_initialize.call(this);
        if (!this._emergentState) this._emergentState = {};
        this._emergentState.worldHistory = [];
    };

    //=============================================================================
    // Traits & Titles Dictionary
    //=============================================================================
    const Titles = {
        greed: ["the Avaricious", "the Golden", "the Hoarder", "the Corrupt"],
        bloodlust: ["the Cruel", "the Impaler", "the Butcher", "the Red"],
        diplomacy: ["the Peacemaker", "the Wise", "the Unifier", "the Just"],
        incompetence: ["the Inept", "the Foolish", "the Mad", "the Ruined"],
        church: ["the Pious", "the Zealot", "the Righteous", "the Divine"],
        mage: ["the Archmage", "the Weaver", "the Omniscient", "the Scholar"]
    };

    //=============================================================================
    // History Generator API
    //=============================================================================
    EmergentManager.generatePersonality = function() {
        // Roll stats 1-100 for historical figures
        return {
            greed: Math.randomInt(100) + 1,
            bloodlust: Math.randomInt(100) + 1,
            diplomacy: Math.randomInt(100) + 1,
            incompetence: Math.randomInt(100) + 1,
            influence: Math.randomInt(100) + 1 // Determines their political power
        };
    };

    EmergentManager.runHistoricalEpochs = function(numEpochs) {
        if (window.EMERGENT_WORLD_INITIALIZED) {
            return;
        }
        if (this._worldHistoryInitialized) {
            return;
        }
        const state = $gameSystem.emergentState();
        state.worldHistory.push(`--- The Chronicles of Aldenmerre ---`);

        // Generate the dominant historical factions
        const pastLeaders = [
            { name: this.generateRandomName("human"), faction: "Royal House", traits: this.generatePersonality() },
            { name: this.generateRandomName("human"), faction: "Holy Church", traits: this.generatePersonality() },
            { name: this.generateRandomName("human"), faction: "Mage Guild", traits: this.generatePersonality() }
        ];

        for (let era = 1; era <= numEpochs; era++) {
            // Identify the key players for this era
            const royal = pastLeaders.find(l => l.faction === "Royal House");
            const church = pastLeaders.find(l => l.faction === "Holy Church");
            const mages = pastLeaders.find(l => l.faction === "Mage Guild");
            
            let eventLog = `Era ${era}: `;

            // ====================================================================
            // MACRO EVENT 1: The Mage-Church Tension
            // ====================================================================
            if (church.traits.influence > 70 && mages.traits.influence > 70) {
                
                if (royal.traits.incompetence > 60) {
                    // Disaster: The Magical Rift
                    eventLog += `A fierce theological war broke out between ${church.name} of the Church and ${mages.name} of the Mage Guild. King ${royal.name} handled it so poorly that a devastating magical rift was torn into the world!`;
                    this.modVar("monsterActivity", 60);
                    this.modVar("prosperity", -30);
                    
                    // VISUAL INTEGRATION: Tell Aerosys to spawn the corrupted/rift biome
                    $gameSwitches.setValue(33, true); // Switch 33 = Magical Rift Active
                    
                } else if (royal.traits.diplomacy > 60) {
                    // Golden Age: Harmony
                    eventLog += `King ${royal.name} masterfully negotiated a pact between the powerful Church under ${church.name} and the Mage Guild under ${mages.name}, ushering in an era of enlightenment.`;
                    this.modVar("prosperity", 50);
                    
                    // VISUAL INTEGRATION: Tell Aerosys to spawn wealthy/grand academies
                    $gameSwitches.setValue(35, true); // Switch 35 = Magical Enlightenment
                    
                } else {
                    // Stalemate: The Cold War
                    eventLog += `Tensions simmered between the powerful Church and the Mage Guild, creating a dangerous political cold war across Aldenmerre.`;
                    this.modVar("prosperity", -10);
                }
            }
            // ====================================================================
            // MACRO EVENT 2: The Holy Crusade
            // ====================================================================
            else if (royal.traits.bloodlust > 70 && church.traits.influence > 70) {
                const title = Titles.church[Math.randomInt(Titles.church.length)];
                eventLog += `${church.name} ${title} of the Holy Church convinced the bloodthirsty King ${royal.name} to launch a massive Holy Crusade. The realm's wealth was drained to fund the endless war.`;
                
                this.modVar("prosperity", -40);
                this.modVar("banditPower", 30); // Deserters turn to banditry
                $gameVariables.setValue(40, 50); // Royal Guard Rep goes up
                
                // VISUAL INTEGRATION: Tell Aerosys to spawn crusader camps or military blockades
                $gameSwitches.setValue(34, true); // Switch 34 = Crusade Aftermath
            }
            // ====================================================================
            // MICRO EVENTS: Single-Actor Focus (Fallback)
            // ====================================================================
            else {
                // Pick a random leader if no massive multi-faction events triggered
                const actor = pastLeaders[Math.randomInt(pastLeaders.length)];

                if (actor.traits.incompetence > 80 && actor.traits.incompetence > actor.traits.diplomacy) {
                    const title = Titles.incompetence[Math.randomInt(Titles.incompetence.length)];
                    eventLog += `${actor.name} ${title} of the ${actor.faction} caused a massive economic collapse through sheer foolishness.`;
                    this.modVar("prosperity", -30);
                    
                } else if (actor.traits.greed > 75) {
                    const title = Titles.greed[Math.randomInt(Titles.greed.length)];
                    eventLog += `${actor.name} ${title} of the ${actor.faction} delved too deep for cursed treasure, unleashing an Undead Plague that ruined a city!`;
                    this.modVar("monsterActivity", 40);
                    $gameSwitches.setValue(30, true); // Switch 30 = Undead Plague
                    
                } else if (actor.traits.bloodlust > 75) {
                    const title = Titles.bloodlust[Math.randomInt(Titles.bloodlust.length)];
                    eventLog += `${actor.name} ${title} of the ${actor.faction} ignited a bloody civil war, leaving the realm heavily militarized but broken.`;
                    this.modVar("banditPower", -20);
                    $gameSwitches.setValue(31, true); // Switch 31 = Civil War
                    
                } else if (actor.traits.diplomacy > 70) {
                    const title = Titles.diplomacy[Math.randomInt(Titles.diplomacy.length)];
                    eventLog += `${actor.name} ${title} of the ${actor.faction} orchestrated an unbreakable alliance with your family.`;
                    this.modVar("prosperity", 30);
                    $gameSwitches.setValue(32, true); // Switch 32 = Royal Alliance
                    
                } else {
                    eventLog += `Under the guidance of ${actor.name} of the ${actor.faction}, Aldenmerre saw a quiet period of standard rebuilding.`;
                    this.modVar("prosperity", 5);
                }
            }

            // Log the history
            state.worldHistory.push(eventLog);
            
            // Randomize traits slightly for the next era (succession of power)
            royal.traits = this.generatePersonality();
            church.traits = this.generatePersonality();
            mages.traits = this.generatePersonality();
            
            // Generate new heirs so the names change over the centuries
            royal.name = this.generateRandomName("human"); 
            church.name = this.generateRandomName("human");
            mages.name = this.generateRandomName("human");
        }
        this._worldHistoryInitialized = true;
        console.log("[World] History initialized once");
        console.log("[History] Aldenmerre's procedural history has been written.");
        console.log(state.worldHistory);
    };

})();