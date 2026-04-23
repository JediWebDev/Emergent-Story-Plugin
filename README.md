# Emergent Story Plugin

Narrative engine (v2): one **Central Crisis** per playthrough, **faction leaders** only, narrative turns via `EmergentManager.advanceNarrativeTurn(reason)` (not real-time map ticks).

## Plugin order (RPG Maker MZ)

Place **above** third-party UI/quest plugins that read these script calls:

1. `EmergentWorld_Core.js`
2. `EmergentWorld_CrisisGen.js`
3. `EmergentWorld_Factions.js`
4. `EmergentWorld_Characters.js`
5. `EmergentWorld_Events.js`
6. `EmergentWorld_Quests.js` (optional)
7. `EmergentWorld_Locations.js` (optional)
8. `EmergentWorld_MZIntegration.js`
9. `EmergentWorld_Onboarding.js` (optional)
10. `EmergentWorld_SocialNarratives.js` (stub; safe to omit)

Removed from this repo: `emergentWorld_AutonomousAgents.js`, `emergentWorld_History.js`, and the `agents/` layer.

Upstream: [Emergent-Story-Plugin](https://github.com/JediWebDev/Emergent-Story-Plugin)
