/*:
 * @target MZ
 * @plugindesc [v1.0] Layer 7 - Dynamic Onboarding & Briefing
 * @author dijOTTER
 * @base EmergentWorld_Core
 *
 * @command GenerateStartingWorldState
 * @text Generate Starting World State
 * @desc Fast-forwards the simulation by a set number of ticks to create a starting history, then evaluates the briefing.
 *
 * @arg historyTicks
 * @text Historical Ticks
 * @type number
 * @default 5
 */

(() => {
    const pluginName = "emergentWorld_Onboarding";

    PluginManager.registerCommand(pluginName, "GenerateStartingWorldState", args => {
        const ticksToRun = Number(args.historyTicks);
        
        // 1. Run the simulation silently in the background
        console.log(`[Onboarding] Simulating ${ticksToRun} years of Ardessian history...`);
        for (let i = 0; i < ticksToRun; i++) {
            EmergentManager.tickSimulation(); 
        }

        // 2. Evaluate the current world state to build the briefing
        const banditPower = EmergentManager.getVar("banditPower");
        const prosperity = EmergentManager.getVar("prosperity");
        const dragonEcho = EmergentManager.getVar("dragonEcho");
        const monsterActivity = EmergentManager.getVar("monsterActivity");
        const foodSupply = EmergentManager.getVar("foodSupply");
        
        // 3. Store the dynamic text in MZ Game Variables for message boxes
        let greeting = "My Liege, you assume control of the House at a pivotal moment.";
        let worldStateBriefing = "";
        let questTrigger = 0; // Will correspond to an MZ Common Event or Quest ID

        // Evaluate Bandits vs Military/Prosperity
        if (banditPower > 40) {
            worldStateBriefing += "In recent months, bandit forces have overwhelmed the border patrols. They are draining our food and wealth. ";
            questTrigger = 1; // ID for "Clear the Bandit Camp"
        } else if (prosperity < 30) {
            worldStateBriefing += "A harsh famine has left the realm's prosperity in ruins. The peasantry looks to you for salvation. ";
            questTrigger = 2; // ID for "Secure Trade Routes"
        } else {
            worldStateBriefing += "The realm is unusually stable, but House Valemont's ambition grows in the shadows. ";
            questTrigger = 3; // ID for "Investigate Political Rumors"
        }

        // Check the silent Dragon Echo
        if (dragonEcho > 30) {
            worldStateBriefing += "\\c[2]Furthermore... our scouts report strange tremors from the Orcish savannahs.\\c[0] ";
        }

        // Save to RPG Maker MZ Variables (e.g., Var 10 for Greeting, Var 11 for Briefing, Var 12 for Quest ID)
        $gameVariables.setValue(10, greeting);
        $gameVariables.setValue(11, worldStateBriefing);
        $gameVariables.setValue(12, questTrigger);
        
        console.log("[Onboarding] Briefing generated. Quest Trigger ID:", questTrigger);
    });
})();