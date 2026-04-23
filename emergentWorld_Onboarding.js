/*:
 * @target MZ
 * @plugindesc [v2.0] Onboarding — narrative briefing from crisis state
 * @author dijOTTER
 * @base EmergentWorld_Core
 *
 * @command GenerateStartingWorldState
 * @text Generate Starting World State
 * @desc Optional: advance N narrative turns, then write briefing variables (legacy hook).
 *
 * @arg historyTicks
 * @text Narrative Turns
 * @type number
 * @default 1
 */

(() => {
    const pluginName = "emergentWorld_Onboarding";

    PluginManager.registerCommand(pluginName, "GenerateStartingWorldState", args => {
        const ticksToRun = Math.max(0, Math.min(20, Number(args.historyTicks) || 0));
        for (let i = 0; i < ticksToRun; i++) {
            EmergentManager.advanceNarrativeTurn("onboarding_preview");
        }

        const crisis = EmergentManager.getCurrentCrisis && EmergentManager.getCurrentCrisis();
        const tension = EmergentManager.getWorldTension && EmergentManager.getWorldTension();
        const greeting = "My Liege, the realm is defined by a single unfolding crisis.";
        let briefing = crisis
            ? `The crisis: ${crisis.name}. Tension is at ${tension}. Antagonist: ${crisis.antagonist}.`
            : "No crisis data — ensure EmergentWorld_CrisisGen loads before bootstrap completes.";

        $gameVariables.setValue(10, greeting);
        $gameVariables.setValue(11, briefing);
        $gameVariables.setValue(12, tension || 0);
        console.log("[Onboarding] Briefing variables set. Tension:", tension);
    });
})();
