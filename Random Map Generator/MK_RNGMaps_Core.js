/*:
 * @target MZ
 * @plugindesc [Tier 1] [Version 3.2.0] [MV & MZ]
 * @author Aerosys
 * @url https://aerosys.blog
 * 
 * 
 * @help
 * 
 * ----------------------------------------------------------------------------
 * Trial Version and unlocking Full Version
 * ----------------------------------------------------------------------------
 * 
 * This plugin runs in a "free trial" and a "standard version". There are no 2
 * different versions of this plugin but only this one.
 * 
 * 
 * > Limitations of the Free Trial
 * 
 * The free trial provides all the features from the full version.
 * See this as the perfect chance for you to try it out and check whether this
 * plugin works with your current project. However, it comes with some
 * limitations:
 * 
 * - Generated Maps are not memorized. Changing map, loading a save, or opening
 *   the menu leads to map changes being wiped.
 * - Your game only runs in RPG Maker's Testplay. An exported/deployed game
 *   will not start!
 * 
 * 
 * > To unlock the Full Version
 * 
 * Include "MK_RNGMaps_Unlocker" as a plugin. You will this receive file after
 * purchasing the full version.
 * 
 * 
 * ----------------------------------------------------------------------------
 * Rules
 * ----------------------------------------------------------------------------
 * 
 * 1. <not applicable>
 * 
 * 2. You may not redistribute this Plugin or claim it as your own.
 *    
 *    a) Exception: You may redistribute this plugin as part of your game when
 *       releasing it.
 *    b) Exception: You may send this plugin to another person when you hire
 *       them for personal modifications.
 * 
 * 3. You may modify this plugin's source code for your needs but cannot
 *    redistribute your modifications.
 * 
 * 4. You may create plugins based on this (e.g. addon or extension) for your
 *    needs but you cannot redistribute them.
 * 
 * 5. When multiple people work on the project, purchasing a license for every
 *    team member is not required.
 * 
 * 
 * NEED SUPPORT?
 * Contact me: mail<at>aerosys.blog
 * 
 * 
 * @endofhelp
 * 
 * 
 * @command generate
 * @text Generate & enter from Entrance
 * @desc Setups a Room Layout, generates a Map, and positions the Player on a default starting location.
 * 
 * @arg mapIdMode
 * @text Choose Map by
 * @type select
 * @option fixed ID
 * @option Variable
 * @default fixed ID
 * 
 * @arg mapId
 * @parent mapIdMode
 * @text select Map:
 * @type map
 * @desc The Map of the Dungeon's Space Map
 * 
 * @arg mapIdVariable
 * @parent mapIdMode
 * @text select Map ID by Variable:
 * @type variable
 * @desc Variable holding the Map ID of the Dungeon's Space Map
 * 
 * @arg useSnippets
 * @text Use Snippets?
 * @type boolean
 * @default REQUIRED
 * 
 * @arg templateName
 * @text Template
 * @type combo
 * @option == SNIPPET-BASED ==
 * @option Classic Maze
 * @option Imperfect Maze
 * @option Sewers
 * @option Cave
 * @option Castle
 * @option Road
 * @option Town
 * @option == SNIPPET-LESS ==
 * @option Static Map
 * @option Cave
 * @option Flooded Cave
 * @option Forest
 * @option Swamp
 * @option Castle
 * @option WorldMap
 * @option Village
 * @default Imperfect Maze
 * @desc Templates are configured in the respective Plugin Parameters (e.g. RNGMaps_withSnippets)
 * 
 * @arg layoutName
 * @text Room Layout
 * @type combo
 * @option Single Room
 * @option 5 floor Tower
 * @option 10 floor Tower
 * @option 3x3 Grid
 * @option 4x4 Grid
 * @option 5x5 Grid
 * @option 3x3 Maze
 * @option 3x3 Imperfect Maze
 * @option 4x4 Imperfect Maze
 * @option Vertical Road
 * @default 5 floor Tower
 * @desc You can add your own Room Layout in the Plugin Manager -> RNGMaps_Core
 * 
 * @arg seedVariableIds
 * @text Seed (Variables)
 * @type variable[]
 * @desc Add one or multiple Variable IDs here, or leave empty to randomly generate Seed
 * 
 * @arg exits
 * @text Exits
 * @type struct<Exits>
 * @default {"exitTop":"true","exitRight":"false","exitLeft":"false","exitBottom":"true"}
 * 
 * @arg enterFrom
 * @text Enter from
 * @type select
 * @option top
 * @option left
 * @option right
 * @option bottom
 * @default bottom
 * 
 * 
 * @command generateAndTeleport
 * @text Generate & transfer to Position
 * @desc Setups a Room Layout, generates a Map, and positions Player to a designated position by Variables
 * 
 * @arg mapIdMode
 * @text Choose Map by
 * @type select
 * @option fixed ID
 * @option Variable
 * @default fixed ID
 * 
 * @arg mapId
 * @parent mapIdMode
 * @text select Map:
 * @type number
 * @desc The Map of the Dungeon's Space Map
 * 
 * @arg mapIdVariable
 * @parent mapIdMode
 * @text select Map ID by Variable:
 * @type variable
 * @desc Variable holding the Map ID of the Dungeon's Space Map
 * 
 * @arg useSnippets
 * @text Use Snippets?
 * @type boolean
 * @default REQUIRED
 * 
 * @arg templateName
 * @text Template
 * @type combo
 * @option == SNIPPET-BASED ==
 * @option Classic Maze
 * @option Imperfect Maze
 * @option Sewers
 * @option Cave
 * @option Castle
 * @option Road
 * @option Town
 * @option == SNIPPET-LESS ==
 * @option Static Map
 * @option Cave
 * @option Flooded Cave
 * @option Forest
 * @option Swamp
 * @option Castle
 * @option WorldMap
 * @option Village
 * @default Imperfect Maze
 * @desc Templates are configured in the respective Plugin Parameters (e.g. RNGMaps_withSnippets)
 * 
 * @arg layoutName
 * @text Room Layout
 * @type combo
 * @option Single Room
 * @option 5 floor Tower
 * @option 10 floor Tower
 * @option 3x3 Grid
 * @option 4x4 Grid
 * @option 5x5 Grid
 * @option 3x3 Maze
 * @option 3x3 Imperfect Maze
 * @option 4x4 Imperfect Maze
 * @option Vertical Road
 * @default 5 floor Tower
 * @desc You can add your own Room Layout in the Plugin Manager -> RNGMaps_Core
 * 
 * @arg seedVariableIds
 * @text Seed (Variables)
 * @type variable[]
 * @desc Add one or multiple Variable IDs here, or leave empty to randomly generate Seed
 * 
 * @arg exits
 * @text Exits
 * @type struct<Exits>
 * @default {"exitTop":"true","exitRight":"false","exitLeft":"false","exitBottom":"true"}
 * 
 * @arg startingRoomXYVariables
 * @text Starting Room X, Y
 * @type struct<XYCoordinatesByVariables>
 * @default {"x":"1","y":"2"}
 * @desc These identify the ROOM where you transfer the player to. Ignore if your layout is "Single Room"
 * 
 * @arg spawnLocationXYVariables
 * @text Spawn on Map at X, Y
 * @type struct<XYCoordinatesByVariables>
 * @default {"x":"1","y":"2"}
 * @desc These are the MAP COORDINATES in the room where you transfer the player to
 * 
 * 
 * @command goTo
 * @text Go To
 * @desc Callable while on a generated Map. It's recommended to call "Is in Dungeon?" afterwards.
 * 
 * @arg direction
 * @text Direction
 * @type select
 * @option top
 * @option left
 * @option right
 * @option bottom
 * @default top
 * 
 * 
 * @command willStayInDungeon
 * @text Will stay in Dungeon?
 * @desc Returns whether the player is in the dungeon or would escape. Usually called after "Go To"
 * 
 * @arg switchId
 * @text Switch
 * @type switch
 * @default 1
 * 
 * 
 * @command regenerate
 * @text Regenerate
 * @desc Regenerate Map, usually called after changing the room. Only callable while on a generated Map.
 * 
 * 
 * @command doesRoomExist
 * @text Does Room exist?
 * @desc Returns whether this Room exists in the current Layout
 * 
 * @arg x
 * @type variable
 * @default 1
 * 
 * @arg y
 * @type variable
 * @default 2
 * 
 * @arg switchId
 * @text Switch
 * @type switch
 * @default 1
 * @desc Switch for later retrieval
 * 
 * 
 * @command isRoomVisited
 * @text Is Room visited?
 * @desc Returns whether the current/a specific Room has been visited before
 * 
 * @arg mode
 * @text Mode
 * @type select
 * @option current Room
 * @option by X, Y
 * @default current Room
 * 
 * @arg whenByVariables
 * @parent mode
 * @text when by X, Y:
 * @type struct<XYCoordinatesByVariables>
 * 
 * @arg switchId
 * @text Switch
 * @type switch
 * @default 1
 * @desc Switch for later retrieval
 * 
 * 
 * @command getVariableData
 * @text Get Data (Variables)
 * 
 * @arg data
 * @type select
 * @option Room X in Dungeon Layout
 * @option Room Y in Dungeon Layout
 * @option Number of Rooms horz
 * @option Number of Rooms vert
 * @default Room Y in Dungeon Layout
 * 
 * @arg variableId
 * @text Variable to store into
 * @type variable
 * @default 1
 * 
 * 
 * @command a
 * @text -------------------
 * @command teleportDevice
 * @text < Teleport Device >
 * 
 * 
 * @command hasSavepoint
 * @text Has Savepoint?
 * @desc Puts the info into a Game Switch for retrieval
 * 
 * @arg switchId
 * @text Switch
 * @type switch
 * 
 * 
 * @command makeSavepoint
 * @text Make Savepoint
 * @desc Memorize all Map Generation Parameters and Player's Pos, to return later
 * 
 * 
 * @command returnToSavepoint
 * @text Return to Savepoint
 * @desc Teleports the Player from anywhere (even outside generated areas) to memorized location
 * 
 * 
 * @command clearSavepoint
 * @text Clear Savepoint
 * @desc Forgets the Savepoint
 * 
 * 
 * @command b
 * @text -------------------
 * @command advanced
 * @text < Advanced >
 * 
 * 
 * @command setSeed
 * @text set Seed
 * 
 * @arg seedVariableIds
 * @text Seed (Variables)
 * @type variable[]
 * @desc Add one or multiple Variable IDs here, or leave empty to randomly generate Seed
 * 
 * 
 * @command getRandomNumber
 * @text Get Random Number
 * 
 * @arg min
 * @type number
 * @default 1
 * 
 * @arg max
 * @type number
 * @default 3
 * 
 * @arg variableId
 * @text Variable to store
 * @type variable
 * @default 1
 * 
 * 
 * @command getOriginalMapId
 * @text get Original Map ID
 * 
 * @arg variableId
 * @text Variable to store
 * @type variable
 * @default 1
 * 
 * 
 * @param general
 * @text General
 * 
 * 
 * @param regionIds
 * @parent general
 * @text Region Ids
 * @type struct<RegionIds>
 * @default {"North":"","northernExit":"13","northernMainExit":"37","northernSpawnLocation":"14","West":"","westernExit":"8","westernMainExit":"32","westernSpawnLocation":"9","East":"","easternExit":"15","easternMainExit":"39","easternSpawnLocation":"16","South":"","southernExit":"5","southernMainExit":"29","southernSpawnLocation":"6","decorationStopperId":"61"}
 * 
 * @param layouts
 * @parent general
 * @text Room Layouts
 * @type struct<LayoutSettings>[]
 * @default ["{\"name\":\"Single Room\",\"layout\":\"Grid\",\"gridSettings\":\"{\\\"nRoomsHorizontal\\\":\\\"1\\\",\\\"nRoomsVertical\\\":\\\"1\\\",\\\"centerExits\\\":\\\"true\\\"}\",\"mazeSettings\":\"\",\"imperfectMazeSettings\":\"\",\"autoSwitches\":\"\",\"requiredSwitchIds\":\"\",\"regularSwitchIds\":\"\"}","{\"name\":\"5 floor Tower\",\"layout\":\"Grid\",\"gridSettings\":\"{\\\"nRoomsHorizontal\\\":\\\"1\\\",\\\"nRoomsVertical\\\":\\\"5\\\",\\\"centerExits\\\":\\\"false\\\"}\",\"mazeSettings\":\"\",\"imperfectMazeSettings\":\"\",\"autoSwitches\":\"\",\"requiredSwitchIds\":\"\",\"regularSwitchIds\":\"\"}","{\"name\":\"10 floor Tower\",\"layout\":\"Grid\",\"gridSettings\":\"{\\\"nRoomsHorizontal\\\":\\\"1\\\",\\\"nRoomsVertical\\\":\\\"10\\\",\\\"centerExits\\\":\\\"false\\\"}\",\"mazeSettings\":\"\",\"imperfectMazeSettings\":\"\",\"autoSwitches\":\"\",\"requiredSwitchIds\":\"\",\"regularSwitchIds\":\"\"}","{\"name\":\"3x3 Grid\",\"layout\":\"Grid\",\"gridSettings\":\"{\\\"nRoomsHorizontal\\\":\\\"3\\\",\\\"nRoomsVertical\\\":\\\"3\\\",\\\"centerExits\\\":\\\"true\\\"}\",\"mazeSettings\":\"\",\"imperfectMazeSettings\":\"\",\"autoSwitches\":\"\",\"requiredSwitchIds\":\"\",\"regularSwitchIds\":\"\"}","{\"name\":\"4x4 Grid\",\"layout\":\"Grid\",\"gridSettings\":\"{\\\"nRoomsHorizontal\\\":\\\"4\\\",\\\"nRoomsVertical\\\":\\\"4\\\",\\\"centerExits\\\":\\\"true\\\"}\",\"mazeSettings\":\"\",\"imperfectMazeSettings\":\"\",\"autoSwitches\":\"\",\"requiredSwitchIds\":\"\",\"regularSwitchIds\":\"\"}","{\"name\":\"5x5 Grid\",\"layout\":\"Grid\",\"gridSettings\":\"{\\\"nRoomsHorizontal\\\":\\\"5\\\",\\\"nRoomsVertical\\\":\\\"5\\\",\\\"centerExits\\\":\\\"true\\\"}\",\"mazeSettings\":\"\",\"imperfectMazeSettings\":\"\",\"autoSwitches\":\"\",\"requiredSwitchIds\":\"\",\"regularSwitchIds\":\"\"}","{\"name\":\"3x3 Maze\",\"layout\":\"Maze\",\"gridSettings\":\"\",\"mazeSettings\":\"{\\\"nRoomsHorizontal\\\":\\\"3\\\",\\\"nRoomsVertical\\\":\\\"3\\\",\\\"centerExits\\\":\\\"true\\\"}\",\"imperfectMazeSettings\":\"\",\"autoSwitches\":\"\",\"requiredSwitchIds\":\"\",\"regularSwitchIds\":\"\"}","{\"name\":\"3x3 Imperfect Maze\",\"layout\":\"Imperfect Maze\",\"gridSettings\":\"\",\"mazeSettings\":\"\",\"imperfectMazeSettings\":\"{\\\"nRoomsHorizontal\\\":\\\"3\\\",\\\"nRoomsVertical\\\":\\\"3\\\",\\\"cutOffDeadEnds\\\":\\\"1-2\\\",\\\"additionalTunnels\\\":\\\"2-3\\\"}\",\"autoSwitches\":\"\",\"requiredSwitchIds\":\"\",\"regularSwitchIds\":\"\"}","{\"name\":\"4x4 Imperfect Maze\",\"layout\":\"Imperfect Maze\",\"gridSettings\":\"\",\"mazeSettings\":\"\",\"imperfectMazeSettings\":\"{\\\"nRoomsHorizontal\\\":\\\"4\\\",\\\"nRoomsVertical\\\":\\\"4\\\",\\\"cutOffDeadEnds\\\":\\\"1-2\\\",\\\"additionalTunnels\\\":\\\"2-3\\\"}\",\"autoSwitches\":\"\",\"requiredSwitchIds\":\"\",\"regularSwitchIds\":\"\"}"]
 * 
 * @param drawShadows
 * @parent general
 * @text Shadows (global)
 * @type boolean
 * @default false
 * @desc Should generated Map have shadows?
 * 
 * @param a
 * @text _
 * @default _
 * 
 * @param puzzleSettings
 * @text Puzzle Settings
 * 
 * @param isRoomSolvedSwitchId
 * @parent puzzleSettings
 * @text Is Room solved? Switch
 * @type switch
 * @desc When given, this Switch will be automatically ON/OFF depending on whether the current Room is "solved" or not.
 * 
 * @param b
 * @text _
 * @default _
 * 
 * @param overrideDisplayName
 * @text Change Map Display Name?
 * @type boolean
 * @default true
 * 
 * @param displayNameFormat1
 * @parent overrideDisplayName
 * @text when 2 dimensional:
 * @default %1 Area %2x%3
 * @desc Use %1 Map Name, %2 X, %3 Y
 * 
 * @param displayNameFormat2
 * @parent overrideDisplayName
 * @text when Tower:
 * @default %1 Floor %2
 * @desc Use %1 Map Name, %2 Floor
 * 
 * @param c
 * @text _
 * @default _
 * 
 * @param advanced
 * @text Advanced
 * 
 * @param isDungeonWideSwitchOrVariableFunction
 * @parent advanced
 * @text Is Dungeon-wide Switch/Variable?
 * @type note
 * @default "const name = arguments[0];\n\nreturn name.startsWith('?') && !name.startsWith('??');"
 * 
 * @param isRoomWideSwitchOrVariableFunction
 * @parent advanced
 * @text Is Room-wide Switch/Variable?
 * @type note
 * @default "const name = arguments[0];\n\nreturn name.startsWith('??');"
 * 
 * @param maxRetries
 * @parent advanced
 * @text max Retries if failed
 * @type number
 * @desc The plugins uses trial-and-error until all important assets spawn properly
 * @default 500
 * 
 * @param showIsTrialWarningBanner
 * @parent advanced
 * @text Show Warning Banner when Trial mode?
 * @type boolean
 * @default true
 */

/*~struct~LayoutSettings:
 *
 * @param name
 * @default REQUIRED
 * 
 * @param layout
 * @text Layout
 * @type select
 * @option Grid
 * @option Maze
 * @option Imperfect Maze
 * @option Road
 * @default Grid
 * @desc See: https://aerosys.blog/room-layouts
 * 
 * @param gridSettings
 * @parent layout
 * @text when Grid:
 * @type struct<GridSettings>
 * 
 * @param mazeSettings
 * @parent layout
 * @text when Maze:
 * @type struct<GridSettings>
 * 
 * @param imperfectMazeSettings
 * @parent layout
 * @text when Imperfect Maze:
 * @type struct<ImperfectMazeSettings>
 * 
 * @param roadSettings
 * @parent layout
 * @text when Road:
 * @type struct<RoadSettings>
 * 
 * @param autoSwitches
 * @text Auto-Switches
 * 
 * @param requiredSwitchIds
 * @parent autoSwitches
 * @text Required Auto-Switches
 * @type struct<RequiredAutoSwitch>[]
 * 
 * @param regularSwitchIds
 * @parent autoSwitches
 * @text Regular Auto-Switches
 * @type struct<RegularAutoSwitch>[]
 */

/*~struct~GridSettings:
 * 
 * @param nRoomsHorizontal
 * @text Room Count Horz
 * @type number
 * @default 3
 * 
 * @param nRoomsVertical
 * @text Room Count Vert
 * @type number
 * @default 3
 * 
 * @param centerExits
 * @text Center Exits?
 * @type boolean
 * @default true
 */

/*~struct~ImperfectMazeSettings:
 * 
 * @param nRoomsHorizontal
 * @text Room Count Horz
 * @type number
 * @default 3
 * 
 * @param nRoomsVertical
 * @text Room Count Vert
 * @type number
 * @default 3
 * 
 * @param cutOffDeadEnds
 * @text Cut off Dead Ends
 * @default 1-2
 * @desc You can type a single number or use "1-2" format
 * 
 * @param additionalTunnels
 * @text Additional Tunnels
 * @default 2-3
 * @desc You can type a single number or use "1-2" format
 */

/*~struct~RoadSettings:
 *
 * @param width
 * @text Width
 * @type number
 * @default 3
 * 
 * @param height
 * @text Height
 * @type number
 * @default 5
 * 
 * @param orientation
 * @text Orientation
 * @type select
 * @option North-South
 * @option West-East
 * @default North-South
 * 
 * @param nDeadEnds
 * @text Dead Ends
 * @desc You can write a single number or use 1-2 format
 * @default 1-2
 */

/*~struct~Exits:
 *
 * @param exitTop
 * @text North?
 * @type boolean
 * @default true
 * 
 * @param exitRight
 * @text East?
 * @type boolean
 * @default false
 * 
 * @param exitLeft
 * @text West?
 * @type boolean
 * @default false
 * 
 * @param exitBottom
 * @text South?
 * @type boolean
 * @default true
 */

/*~struct~XYCoordinatesByVariables:
 *
 * @param x
 * @type variable
 * @default 1
 * 
 * @param y
 * @type variable
 * @default 2
 */

/*~struct~RegionIds:
 * 
 * @param North
 *
 * @param northernExit
 * @parent North
 * @text Exit
 * @type number
 * @default 13
 * 
 * @param northernMainExit
 * @parent North
 * @text Main Exit
 * @type number
 * @default 37
 * 
 * @param northernSpawnLocation
 * @parent North
 * @text Spawn Location
 * @type number
 * @default 14
 * 
 * @param West
 *
 * @param westernExit
 * @parent West
 * @text Exit
 * @type number
 * @default 8
 * 
 * @param westernMainExit
 * @parent West
 * @text Main Exit
 * @type number
 * @default 32
 * 
 * @param westernSpawnLocation
 * @parent West
 * @text Spawn Location
 * @type number
 * @default 9
 * 
 * @param East
 * 
 * @param easternExit
 * @parent East
 * @text Exit
 * @type number
 * @default 15
 * 
 * @param easternMainExit
 * @parent East
 * @text Main Exit
 * @type number
 * @default 39
 * 
 * @param easternSpawnLocation
 * @parent East
 * @text Spawn Location
 * @type number
 * @default 16
 * 
 * @param South
 * 
 * @param southernExit
 * @parent South
 * @text Exit
 * @type number
 * @default 5
 * 
 * @param southernMainExit
 * @parent South
 * @text Main Exit
 * @type number
 * @default 29
 * 
 * @param southernSpawnLocation
 * @parent South
 * @text Spawn Location
 * @type number
 * @default 6
 * 
 *
 * @param decorationStopperId
 * @text Decoration Stopper Id
 * @type number
 * @desc Region Id to determine the last object in your decoration map
 * @default 61
 * 
 */

/*~struct~RequiredAutoSwitch:
 *
 * @param name
 * @text Name
 * @desc Only used for better readability in the list - not actively used by the plugin
 * 
 * @param switchId
 * @text Switch
 * @type switch
 * @default 1
 * 
 * @param n
 * @text Count
 * @type number
 * @default 1
 * 
 * @param isPuzzle
 * @text is Puzzle?
 * @type boolean
 * @default false
 * @desc When false, the room is automatically "solved" when the player enters it.
 */

/*~struct~RegularAutoSwitch:
 *
 * @param name
 * @text Name
 * @desc Only used for better readability in the list - not actively used by the plugin
 * 
 * @param switchId
 * @text Switch
 * @type switch
 * @default 1
 * 
 * @param isPuzzle
 * @text is Puzzle?
 * @type boolean
 * @default false
 * @desc When false, the room is automatically "solved" when the player enters it.
 */


var MK = MK || { };
var RandomMaps = RandomMaps || { };

var Imported = Imported || { };
Imported.MK_RNGMaps_Core = true;


// =====================================================================================
// Legacy
// =====================================================================================

(function() {

const alias = Scene_Boot.prototype.start;
Scene_Boot.prototype.start = function() {
    alias.call(this);

    const legacyPlugins = [
        'MK_Core',
        'MK_RNGMaps_Addons',
        'MK_RNGMaps_MapAlgorithms',
        'MK_RNGMaps_MetaMaze',
        'MK_RNGMaps_AutoSwitches',
    ];
    
    if ($plugins.some(plugin => 
        plugin &&
        plugin.status &&
        legacyPlugins.includes(plugin.name)
    )) {
        alert(
            "Please remove %1, they are no longer in use."
            .format(legacyPlugins.join(', '))
        );
    }
}

})();


// =====================================================================================
// Utils
// =====================================================================================


(function() {

const PLUGIN_NAME = 'MK_RNGMaps_Core';


RandomMaps.reject = (reason, resume) => {
    const message = (
        "An error occurred in the Plugin %1: %2"
    ).format(PLUGIN_NAME, reason);

    alert(message);

    if (!resume) throw Error(message);
}

RandomMaps.rejectFatal = (reason) => {
    const message = (
        "A fatal error occurred in the Plugin %1: %2 " +
        "It's not your fault. It is probably caused due to an error in the plugin's source code. " +
        "Please report it to the Plugin Creator. It is unlikely that you can fix it on your own."
    ).format(PLUGIN_NAME, reason);

    throw Error(message);
}

RandomMaps.rejectIfNotANumber = function(functionName, name, value) {
    if (typeof value !== 'number' || isNaN(value)) {
        RandomMaps.rejectFatal(
            "Argument %2 (function %1) must be a number, but was %3."
            .format(functionName, name, value)
        );
    }
}

RandomMaps.parameterStructure = function(serialized, parameterName) {
    if (!serialized) {
        RandomMaps.reject((
            "The Plugin Parameter \"%1\" is missing. " +
            "Please check it in the Plugin Manager. It may help to re-install this Plugin (i.e.: remove, re-add)."
        ).format(parameterName));
    }
    try {
        return JSON.parse(serialized);
    
    } catch (e) {
        RandomMaps.reject((
            "The Plugin Parameter \"%1\" is corrupted. " +
            "Please check it in the Plugin Manager. It may help to re-install this Plugin (i.e.: remove, re-add)."
        ).format(parameterName));
    }
}

RandomMaps.commandStructure = function(serialized, commandName, argumentName) {
    if (!serialized) {
        RandomMaps.reject((
            "The Argument \"%2\" in the Plugin Command \"%1\" is missing. " +
            "Please check it in the Plugin Command."
        ).format(commandName, argumentName));
    }
    try {
        return JSON.parse(serialized);
    
    } catch (e) {
        RandomMaps.reject((
            "The Argument \"%2\" in the Plugin Command \"%1\" is corrupted. " +
            "Please check it in the Plugin Command."
        ).format(commandName, argumentName));
    }
}

RandomMaps.customFunction = function(body, parameterName) {
    if (!body) return undefined;

    try {
        return new Function(JSON.parse(body));
    
    } catch (e) {
        reject((
            'The Plugin Parameter "%1" contains an error and could not be interpreted. ' +
            'Please check it in the Plugin Manager. It may also help to re-install this Plugin (i.e.: remove, re-add). ' +
            'Cause: %2'
        ).format(parameterName, e));
    }
}

RandomMaps.checkPluginIntegrity = function(pluginName) {
    if (!PluginManager._parameters[pluginName.toLowerCase()]) {
        alert((
            'The Plugin %1 is not correctly installed. ' +
            'Please make sure it has the filename "%1.js" and is located in "your game/js/plugins" folder. '.format(PLUGIN_NAME) +
            'Subdirectories (e.g.: js/plugins/xy/thisPlugin.js) are not allowed.'
        ).format(pluginName, pluginName));
        
        SceneManager.exit();
    }
}

const extractTier = (pluginDescription) => {
    const match = /\[Tier\s+\d+\]/g.exec(pluginDescription);
    if (match && match[0]) {
        const number = /\d+/.exec(match[0])[0];
        return Number(number);
    }
}

const isListSorted = (list) => {
    if (list && list.length > 1) {
        for (let i = 1; i < list.length; i++) {
            if (list[i] < list[i - 1]) {
                return false;
            }
        }
    }
    return true;
}

const alias_SceneBoot_start = Scene_Boot.prototype.start;
Scene_Boot.prototype.start = function() {
    alias_SceneBoot_start.call(this);

    const mkTiers = $plugins
        .filter(plugin => plugin && plugin.status && plugin.name.startsWith('MK_'))
        .map(plugin => extractTier(plugin.description))
        .filter(tier => typeof tier === 'number')
    
    if (!isListSorted(mkTiers)) {
        RandomMaps.reject(
            "MK Plugins are not in correct order. " +
            "Please go into the Plugin Manager and sort all the Plugins starting with \"MK\"" +
            "according to their tiers (Tier 0, Tier 1, ...)",
            true,
        );
    }
} 


RandomMaps.isPositiveIntegerNumber = function(value) {
    return (
        typeof value === 'number' &&
        !isNaN(value) &&
        Math.floor(value) === value &&
        value > 0
    );
}


RandomMaps.times = function(start, end) {
    const l = Math.floor(Math.max(0, end !== undefined ? start : 0));
    const r = Math.floor(Math.max(0, end !== undefined ? end : start));
    const n = Math.max(r - l, 0);

    if (n > 0) {
        const toReturn  = new Array(n);

        for (let i = 0; i < n; i++) {
            toReturn[i] = l + i;
        }
        return toReturn;
    }
    return [ ];
}

RandomMaps.createMatrix = (w, h, f) =>
    typeof f == 'function'
        ? RandomMaps.times(w).map((x) => RandomMaps.times(h).map((y) => f(x, y)))
        : RandomMaps.times(w).map(() => RandomMaps.times(h).map(() => f || 0));

RandomMaps.iterateMatrix = (w, h) => new Array(w * h).fill(0).map((_, i) => ({ x: Math.floor(i / h), y: i % h}));


})();


RandomMaps.checkPluginIntegrity('MK_RNGMaps_Core');


// =====================================================================================
// Load Additional Maps
// =====================================================================================

var LoadAdditionalMaps = LoadAdditionalMaps || { };

(function() {

const sourceMaps = { };
const cache = { };

function getOriginalMapId(mapId) {
    return typeof mapId == 'string'
        ? Number(mapId.split('_')[0])
        : mapId;
}

LoadAdditionalMaps.get = function(mapName) {
    if (typeof mapName != 'string') {
        RandomMaps.rejectFatal("LoadAdditionalMaps.get was not called with string, but " + mapName);
    }
    return sourceMaps[mapName.trim().toLowerCase()];
}

LoadAdditionalMaps.getByFilter = function(f) {
    return Object
        .entries(sourceMaps)
        .filter(([name, _]) => f(name))
        .map(([_, dataMap]) => dataMap);
}

LoadAdditionalMaps.all = function() {
    const toReturn = { };

    Object.entries(sourceMaps)
        .filter(([name, dataMap]) => name && dataMap)
        .forEach(([name, dataMap]) => toReturn[name] = dataMap);
    
    return toReturn;
}

function clearSourceMaps() {
    Object.keys(sourceMaps).forEach(key => delete sourceMaps[key]);
}

LoadAdditionalMaps.preload = function(mapId, onLoad) {
    clearSourceMaps();
    
    mapId = getOriginalMapId(mapId);
    
    if (typeof mapId !== 'number' || isNaN(mapId)) {
        RandomMaps.reject("LoadAdditionalMaps.preload was called with invalid arg: " + arguments);
    }

    loadAdditionalMaps(
        mapId,
        () => loadOriginalMap(
            mapId,
            (dataMap) => onLoad(JsonEx.makeDeepCopy(dataMap)),
        ),
    );
}

function loadAdditionalMaps(mapId, onLoad) {
    const additionalInfos = $dataMapInfos
        .filter(Boolean)
        .filter(info => info.parentId == mapId);

    let n = additionalInfos.length;

    if (n) {
        additionalInfos.forEach(info => loadSourceMap(
            info.id,
            info.name,
            () => {
                n--;
                if (n == 0) onLoad();
            },
        ));
    } else {
        onLoad();
    }
}

function loadOriginalMap(mapId, onLoad) {
    loadSourceMap(
        mapId,
        'ORIGINAL',
        onLoad,
    );
}

function loadSourceMap(mapId, mapName, onLoad) {
    const trimmedMapName    = mapName.trim().toLowerCase();
    const source            = 'Map%1'.format(mapId.padZero(3));
    const url               = 'data/Map%1.json'.format(mapId.padZero(3));

    sourceMaps[trimmedMapName] = null;
    loadFile(mapName, source, url, data => {
        DataManager.onLoad(data);
        sourceMaps[trimmedMapName] = data;
        onLoad(data);
    });
}

function loadFile(name, source, url, onLoad) {
    cache[url]
        ? onLoad(cache[url])
        : loadFileXhr(name, source, url, data => onLoad(cache[url] = data));
}

function loadFileXhr(name, source, url, onLoad) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.overrideMimeType('application/json');
    xhr.onload = () => onLoad(JSON.parse(xhr.responseText));
    xhr.onerror = () => DataManager.onXhrError(name, source, url);
    xhr.send();
}


})();



// =====================================================================================
// Map Injection
// =====================================================================================

var MapInjection = MapInjection || {};


(function() {


MapInjection.getOriginalMapId = function(mapId) {
    return MapInjection.isForgedMapId(mapId)
        ? Number(mapId.split('_')[0])
        : mapId;
}

MapInjection.isForgedMapId = function(mapId) {
    return (
        typeof mapId == 'string' &&
        mapId.split('_')[0] &&
        digitsOnly(mapId.split('_')[0])
    );
}

function digitsOnly(string) {
    return /^\d+$/.test(string);
}

MapInjection.makeNewMapId = function(originalMapId, forgedMapIdAppendix) {
    return '%1_%2'.format(originalMapId, forgedMapIdAppendix);
}

MapInjection.injectDataMap = function(dataMap, mapId, forgedMapIdAppendix, x, y, fadeType) {
    const originalMapId     = MapInjection.getOriginalMapId(mapId);
    const newMapId          = MapInjection.makeNewMapId(originalMapId, forgedMapIdAppendix);
    
    $gameMap._injectedDataMap = dataMap;

    $gamePlayer.requestMapReload();
    $gamePlayer.reserveTransfer(
        newMapId,
        x !== undefined ? x : $gamePlayer.x,
        y !== undefined ? y : $gamePlayer.y,
        0,
        fadeType || 0,
    );
    return {
        then: (f) => $gamePlayer._postTransferFunction = f,
    };
}

const alias_GamePlayer_reserveTransfer = Game_Player.prototype.reserveTransfer;
Game_Player.prototype.reserveTransfer = function(mapId, /* other arguments */) {
    if (!MapInjection.isForgedMapId(mapId)) {
        leaveInjectedMap();
    }
    alias_GamePlayer_reserveTransfer.apply(this, arguments);
}

function leaveInjectedMap() {
    $gameMap._injectedDataMap = undefined;
}

const alias_GamePlayer_performTransfer = Game_Player.prototype.performTransfer;
Game_Player.prototype.performTransfer = function( /* arguments */ ) {
    alias_GamePlayer_performTransfer.apply(this, arguments);

    this._postTransferFunction && this._postTransferFunction();
    this._postTransferFunction = undefined;
}

// Override
const alias_DataManager_loadMapData = DataManager.loadMapData;
DataManager.loadMapData = function(mapId) {

    if (shouldInjectForgedMap(mapId)) {
        $dataMap = $gameMap._injectedDataMap;
    } else {
        alias_DataManager_loadMapData.call(this, mapId);
    }
}

function shouldInjectForgedMap(mapId) {
    return (
        MapInjection.isOnInjectedMap() && 
        MapInjection.isForgedMapId(mapId)
    );
}

MapInjection.isOnInjectedMap = function() {
    return !!(
        typeof $gameMap == 'object' &&
        $gameMap._injectedDataMap
    );
}

if ('MV' == Utils.RPGMAKER_NAME) {
    
    const alias_DataManager_onLoad = DataManager.onLoad;
    DataManager.onLoad = function(object) {
        alias_DataManager_onLoad.call(this, object);

        if (isDataMap(object)) {
            this.extractMetadata(object);
            
            object.events
                .filter(Boolean)
                .forEach(event => this.extractMetadata(event));
        }
    }
}

function isDataMap(object) {
    return (
        typeof object == 'object' &&
        'data' in object &&
        'events' in object
    );
}

})();



// =====================================================================================
// Map Utilities
// =====================================================================================



(function() {

const getIndex          = (x, y, z, width, height) => (z * height + y) * width + x;
const getTile           = (dataMap, x, y, z) => dataMap.data[getIndex(x, y, z, dataMap.width, dataMap.height)];
const getTileStack      = (dataMap, x, y) => RandomMaps.times(6).map(z => getTile(dataMap, x, y, z));
const putTile           = (dataMap, x, y, z, tileId) => dataMap.data[getIndex(x, y, z, dataMap.width, dataMap.height)] = tileId;

MK.tileFromEditorsTable = function(sheet, x, y) {
    const y2 = {
        'A1':   0,
        'A2':   2,
        'A3':   6,
        'A4':   10,
        'A5':   192,
        'B':    0,
        'C':    32,
        'D':    64,
        'E':    96,
    }[sheet];

    const index = (y + y2) * 8 + x;
    return ['A1', 'A2', 'A3', 'A4'].includes(sheet)
        ? Tilemap.makeAutotileId(index, 0)
        : index;
}

MK.copyTileStack = function(xSource, ySource, xTarget, yTarget, source, target) {
    const tileStack = getTileStack(source, xSource, ySource);
    MK.safelyPasteTileStack(xTarget, yTarget, target, tileStack);
}

MK.safelyPasteTileStack = function(xTarget, yTarget, target, tileStack) {
    const width         = target.width;
    const height        = target.height;
    const target_loc0   = getIndex(xTarget, yTarget, 0, width, height);
    const target_loc1   = getIndex(xTarget, yTarget, 1, width, height);
    const target_loc2   = getIndex(xTarget, yTarget, 2, width, height);
    const target_loc3   = getIndex(xTarget, yTarget, 3, width, height);
    const target_loc5   = getIndex(xTarget, yTarget, 5, width, height);

    // Ground Layer
    if (tileStack[0]) {
        target.data[target_loc0] = tileStack[0];
        target.data[target_loc1] = tileStack[1];
    }
    if (tileStack[1]) {
        target.data[target_loc1] = tileStack[1];
    }
    
    // B-Layer
    if (tileStack[2] && tileStack[3]) {
        target.data[target_loc2] = tileStack[2];
        target.data[target_loc3] = tileStack[3];
    }
    if (tileStack[2] && !tileStack[3]) {
        if (target.data[target_loc3])
            target.data[target_loc2] = target.data[target_loc3]
        target.data[target_loc3] = tileStack[2];
    }
    if (!tileStack[2] && tileStack[3]) {
        if (target.data[target_loc3])
            target.data[target_loc2] = target.data[target_loc3]
        target.data[target_loc3] = tileStack[3];
    }

    // Regions
    if (true || tileStack[5])
        target.data[target_loc5] = tileStack[5];
}

MK.copyTiles = function(xSource, ySource, w, h, xTarget, yTarget, source, target) {
    RandomMaps.iterateMatrix(w, h).forEach(({x, y}) => MK.copyTileStack(
        xSource + x,
        ySource + y,
        xTarget + x,
        yTarget + y,
        source,
        target,
    ));
}

MK.cloneEvents = function(xSource, ySource, width, height, xTarget, yTarget, source, target) {
    RandomMaps.iterateMatrix(width, height).forEach(({x, y}) => MK.cloneEventFromXY(
        xSource + x,
        ySource + y,
        xTarget + x,
        yTarget + y,
        source,
        target,
    ));
}

MK.cloneEventFromXY = function(xSource, ySource, xTarget, yTarget, source, target) {
    const event = MK.getEventFromXY(source, xSource, ySource);
    event && cloneEvent(xTarget, yTarget, target, event);
}

MK.getEventFromXY = function(dataMap, x, y) {
    return dataMap.events.find(event =>
        event &&
        event.x == x &&
        event.y == y
    );
}

function cloneEvent(xTarget, yTarget, dataMap, event) {
    if (!event) return;

    if (!dataMap.events || !dataMap.events.length)
        dataMap.events = [ null ];

    const next_id   = getNextEventId(dataMap);
    const eventData = JsonEx.makeDeepCopy(event);
    eventData.id    = next_id;
    eventData.x     = xTarget;
    eventData.y     = yTarget;
    dataMap.events[next_id] = eventData;
}

function getNextEventId(dataMap) {
    return dataMap.events.length;
}

MK.isPassable = function(dataMap, x, y) {
    const event = MK.getEventFromXY(dataMap, x, y);
    return MK.isPassableTiles(dataMap, x, y) && (!event || MK.isEventPassable(event));
}

MK.isPassableTiles = function(dataMap, x, y) {
    return MK.isPassableTileStack(dataMap, getTileStack(dataMap, x, y));
}

MK.isPassableTileStack = function(dataMap, tileStack) {
    for (let i = 0; i < 4; i++) {
        const tile = tileStack[3 - i];
        const flag = tilesetFlags(dataMap)[tile];

        if ((flag & 0x10) != 0)     // [*] No effect on passage
            continue;
        return (flag & 0x0f) == 0;  // [O] and [X]
    }
    return false;
}

function tilesetFlags(dataMap) {
    const tilesetId = dataMap.tilesetId;
    const tileset = $dataTilesets[tilesetId];
    return tileset ? tileset.flags : [ ];
}

MK.isEventPassable = function(event) {
    return event.pages.every(page => page.through || page.priorityType != 1);
}

MK.isAreaPassable = function(dataMap, x, y, w, h) {
    return RandomMaps.times(x, x + w).every(x1 => RandomMaps.times(y, y + h).every(y1 => 
        MK.isPassable(dataMap, x1, y1)
    ));
}


// =====================================================================================
// Shadows
// =====================================================================================

function putShadow(dataMap, x, y, b) {
    putTile(dataMap, x, y, 4, b ? 5 : 0);
}

function isValid(dataMap, x, y) {
    return 0 <= x && x < dataMap.width && 0 <= y && y < dataMap.height;
}

function isShadowingCell(dataMap, x, y) {
    return (
        isValid(dataMap, x, y) &&
        RandomMaps.times(4).some(z => Tilemap.isShadowingTile(getTile(dataMap, x, y, z)))
    );
}

MK.fixShadows = function(dataMap) {
    RandomMaps.iterateMatrix(dataMap.width, dataMap.height).forEach(({x, y}) => {
        const b = (
            !isShadowingCell(dataMap, x, y) &&
            isShadowingCell(dataMap, x - 1, y) &&
            isShadowingCell(dataMap, x - 1, y - 1)
        );
        putShadow(dataMap, x, y, b);
    });
}

MK.removeShadows = function(dataMap) {
    RandomMaps.iterateMatrix(dataMap.width, dataMap.height).forEach(({x, y}) => putShadow(dataMap, x, y, false));
}


})();



// =====================================================================================
// Fix Autotiles
// =====================================================================================



(function() {

function isValid(dataMap, x, y) {
    return 0 <= x && x < dataMap.width && 0 <= y && y < dataMap.height;
}

const getIndex  = (x, y, z, width, height) => (z * height + y) * width + x;
const getTile   = (dataMap, x, y, z) => dataMap.data[getIndex(x, y, z, dataMap.width, dataMap.height)];
const putTile   = (dataMap, x, y, z, tile) => dataMap.data[getIndex(x, y, z, dataMap.width, dataMap.height)] = tile;

function isShadowingCell(dataMap, x, y) {
    return (
        isValid(dataMap, x, y) &&
        RandomMaps.times(4).some(z => Tilemap.isShadowingTile(getTile(dataMap, x, y, z)))
    );
}

MK.fixAllAutotiles = function(dataMap, serialized) {
    const options = deserializeFixAutoTiles(serialized);

    const shouldFixThisTile = (x, y, z) => {

        if (typeof options !== 'object') {
            return options;
        }

        const tileId = getTile(dataMap, x, y, z);
        let b1, b2;

        if (Tilemap.isWaterfallTile(tileId))    b1 = options.A1_waterfall;
        if (Tilemap.isTileA2(tileId))           b1 = options.A2;
        if (Tilemap.isRoofTile(tileId))         b1 = options.A3_top;
        if (Tilemap.isWallTopTile(tileId))      b1 = options.A4_top;
        
        if (Tilemap.isTileA1(tileId) && !Tilemap.isWaterfallTile(tileId))
            b1 = options.A1_water;
        if (Tilemap.isTileA3(tileId) && Tilemap.isWallSideTile(tileId))
            b1 = options.A3_side;
        if (Tilemap.isTileA4(tileId) && Tilemap.isWallSideTile(tileId))
            b1 = options.A4_side;
        
        b2 = [options.layer1, options.layer2, options.layer3, options.layer4][z];

        return b1 && b2;
    }
    
    for (let x = 0; x < dataMap.width; x++) {
        for (let y = 0; y < dataMap.height; y++) {
            for (let z = 0; z < 4; z++) {
                if (shouldFixThisTile(x, y, z)) {
                    const fixedAutoTile = getFixedAutotile(dataMap, x, y, z);
                    putTile(dataMap, x, y, z, fixedAutoTile);
                }
            }
        }
    }
}

function getFixedAutotile(dataMap, x, y, z) {
    const standardTable     = [[-1, 0], [0, -1], [1, 0], [0, 1]];
    const waterfallTable    = [[-1, 0], [1, 0]];
    const wallTable         = [[-1, 0], [0, -1], [1, 0], [0, 1]];
    const currentTile       = getTile(dataMap, x, y, z);

    if (![0, 1, 2, 3].includes(z)) {
        return currentTile;
    }

    const determineBottom = (x, y) => {
        const currentTile = getTile(dataMap, x, y, z);
        
        for (let y1 = y; y1 < dataMap.height; y1++) {
            const otherTile = getTile(dataMap, x, y1, z);

            if (Tilemap.isWaterfallTile(currentTile) && Tilemap.isWaterfallTile(otherTile)) {
                continue;
            }
            
            if (!Tilemap.isSameKindTile(currentTile, otherTile)) {
                return y1;
            }
        }
        return dataMap.height - 1;
    }

    const isSame = (dx, dy) => {
        const x2 = x + dx;
        const y2 = y + dy;
        const otherTile = getTile(dataMap, x2, y2, z);

        if (!isValid(dataMap, x2, y2)) return true;

        if ((
                Tilemap.isTileA3(currentTile) ||
                Tilemap.isWallSideTile(currentTile)
            ) &&
            Tilemap.isSameKindTile(currentTile, otherTile) &&
            determineBottom(x, y) > determineBottom(x + dx, y)
        ) {
            return false;
        }

        if (Tilemap.isWaterfallTile(currentTile) &&
            determineBottom(x, y) != determineBottom(x + dx, y)
        ) {
            return false;
        }

        if (dy < 0 && dx != 0 && Tilemap.isWaterTile(currentTile) &&
            Tilemap.isWaterfallTile(getTile(dataMap, x, y - 1, z)) != Tilemap.isWaterfallTile(otherTile)
        ) {
            return false;
        }

        return (
            Tilemap.isSameKindTile(currentTile, otherTile) ||
            Tilemap.isWaterfallTile(currentTile) && Tilemap.isWaterfallTile(otherTile) ||
            (dy < 0 && Tilemap.isWaterTile(currentTile) && Tilemap.isWaterfallTile(otherTile)) ||
            
            (dy > 0 && dx == 0 && !isShadowingCell(dataMap, x, y) && isShadowingCell(dataMap, x2, y2)) ||
            (dy > 0 && dx != 0 &&
                !isShadowingCell(dataMap, x, y) &&
                isShadowingCell(dataMap, x2, y2) &&
                Tilemap.isSameKindTile(currentTile, getTile(dataMap, x2, y, z))
            ) ||
            (dy == 0 &&
                !isShadowingCell(dataMap, x, y) &&
                isShadowingCell(dataMap, x2, y2) &&
                Tilemap.isSameKindTile(currentTile, getTile(dataMap, x2, y - 1, z))
            ) ||
            (dy == 0 && dx != 0 && Tilemap.isWallSideTile(currentTile) && 
                (Tilemap.isWallTopTile(otherTile) || Tilemap.isWaterfallTile(otherTile))
            ) ||
            (dy >= 0 &&
                (Tilemap.isTileA3(currentTile) || Tilemap.isWallSideTile(currentTile)) &&
                Tilemap.isShadowingTile(otherTile)
            ) ||
            (dy == 0 && Tilemap.isWallSideTile(currentTile) && (Tilemap.isRoofTile(otherTile) || Tilemap.isWallTopTile(otherTile)))
        );
    }
    
    const getStandardAutotile = () => {
        const baseIdentifier = standardTable
            .map(([dx, dy]) => isSame(dx, dy))
            .reduce((previous, current, index) => (current ? 0 : 1) * (2 ** index) + previous, 0);
        
        const base = [
            0,      // 0
            16,     // 0001 1
            20,     // 0010 2
            34,     // 0011 3
            24,     // 0100 4
            32,     // 0101 5
            36,     // 0110 6
            42,     // 0111 7
            28,     // 1000 8
            40,     // 1001 9
            33,     // 1010 10
            43,     // 1011 11
            38,     // 1100 12
            44,     // 1101 13
            45,     // 1110 14
            46,     // 1111 15
        ][baseIdentifier];

        const smallNumber = [
                [ [-1, -1], [1, -1], [1, 1], [-1, 1] ],
                [ [1, -1], [1, 1] ],
                [ [1, 1], [-1, 1] ],
                [ [1, 1] ],
                [ [-1, 1], [-1, -1] ],
                [ ],
                [ [-1, 1] ],
                [ ],
                [ [-1, -1], [1, -1] ],
                [ [1, -1] ],
                [ ],
                [ ],
                [ [-1, -1] ],
                [ ],
                [ ],
                [ ],
            ][baseIdentifier]
            .map(([dx, dy]) => isSame(dx, dy))
            .reduce((previous, current, index) => (current ? 0 : 1) * (2 ** index) + previous, 0);
        
        return currentTile - Tilemap.getAutotileShape(currentTile) + base + smallNumber;
    }

    const getAutotile = (array) => {
        const baseIdentifier = array
            .map(([dx, dy]) => isSame(dx, dy))
            .reduce((previous, current, index) => (current ? 0 : 1) * (2 ** index) + previous, 0);
        return currentTile - Tilemap.getAutotileShape(currentTile) + baseIdentifier;
    }
    
    if (Tilemap.isWaterfallTile(currentTile)) {
        return getAutotile(waterfallTable);
    }
    if (Tilemap.isTileA3(currentTile) || Tilemap.isWallSideTile(currentTile)) {
        return getAutotile(wallTable);
    }
    if (Tilemap.isAutotile(currentTile)) {
        return getStandardAutotile();
    }
    return currentTile;
}

function deserializeFixAutoTiles(serialized) {
    if (!serialized) return true;
    if ('' == serialized) return true;
    if ('Fix all AutoTiles' == JsonEx.parse(serialized).mode) return true;
    
    const is = (attribute) => (
        'Custom' == JsonEx.parse(serialized).mode &&
        'true' == JsonEx.parse(serialized)[attribute]
    );
    return {
        A1_water:       is('A1_water'),
        A1_waterfall:   is('A2_waterfall'),
        A2:             is('A2'),
        A3_top:         is('A3_top'),
        A3_side:        is('A3_side'),
        A4_top:         is('A4_top'),
        A4_side:        is('A4_side'),
        layer1:         is('layer1'),
        layer2:         is('layer2'),
        layer3:         is('layer3'),
        layer4:         is('layer4'),
    }
}


})();



// =====================================================================================
// Noise
// =====================================================================================

/*
 * A speed-improved perlin and simplex noise algorithms for 2D.
 *
 * Based on example code by Stefan Gustavson (stegu@itn.liu.se).
 * Optimisations by Peter Eastman (peastman@drizzle.stanford.edu).
 * Better rank ordering method by Stefan Gustavson in 2012.
 * Converted to Javascript by Joseph Gentle.
 *
 * Version 2012-03-09
 *
 * This code was placed in the public domain by its original author,
 * Stefan Gustavson. You may use it as you see fit, but
 * attribution is appreciated.
 *
 */

(function(global){
  var module = global.noise = {};

  function Grad(x, y, z) {
    this.x = x; this.y = y; this.z = z;
  }
  
  Grad.prototype.dot2 = function(x, y) {
    return this.x*x + this.y*y;
  };

  Grad.prototype.dot3 = function(x, y, z) {
    return this.x*x + this.y*y + this.z*z;
  };

  var grad3 = [new Grad(1,1,0),new Grad(-1,1,0),new Grad(1,-1,0),new Grad(-1,-1,0),
               new Grad(1,0,1),new Grad(-1,0,1),new Grad(1,0,-1),new Grad(-1,0,-1),
               new Grad(0,1,1),new Grad(0,-1,1),new Grad(0,1,-1),new Grad(0,-1,-1)];

  var p = [151,160,137,91,90,15,
  131,13,201,95,96,53,194,233,7,225,140,36,103,30,69,142,8,99,37,240,21,10,23,
  190, 6,148,247,120,234,75,0,26,197,62,94,252,219,203,117,35,11,32,57,177,33,
  88,237,149,56,87,174,20,125,136,171,168, 68,175,74,165,71,134,139,48,27,166,
  77,146,158,231,83,111,229,122,60,211,133,230,220,105,92,41,55,46,245,40,244,
  102,143,54, 65,25,63,161, 1,216,80,73,209,76,132,187,208, 89,18,169,200,196,
  135,130,116,188,159,86,164,100,109,198,173,186, 3,64,52,217,226,250,124,123,
  5,202,38,147,118,126,255,82,85,212,207,206,59,227,47,16,58,17,182,189,28,42,
  223,183,170,213,119,248,152, 2,44,154,163, 70,221,153,101,155,167, 43,172,9,
  129,22,39,253, 19,98,108,110,79,113,224,232,178,185, 112,104,218,246,97,228,
  251,34,242,193,238,210,144,12,191,179,162,241, 81,51,145,235,249,14,239,107,
  49,192,214, 31,181,199,106,157,184, 84,204,176,115,121,50,45,127, 4,150,254,
  138,236,205,93,222,114,67,29,24,72,243,141,128,195,78,66,215,61,156,180];
  // To remove the need for index wrapping, double the permutation table length
  var perm = new Array(512);
  var gradP = new Array(512);

  // This isn't a very good seeding function, but it works ok. It supports 2^16
  // different seed values. Write something better if you need more seeds.
  module.seed = function(seed) {
    if(seed > 0 && seed < 1) {
      // Scale the seed out
      seed *= 65536;
    }

    seed = Math.floor(seed);
    if(seed < 256) {
      seed |= seed << 8;
    }

    for(var i = 0; i < 256; i++) {
      var v;
      if (i & 1) {
        v = p[i] ^ (seed & 255);
      } else {
        v = p[i] ^ ((seed>>8) & 255);
      }

      perm[i] = perm[i + 256] = v;
      gradP[i] = gradP[i + 256] = grad3[v % 12];
    }
  };

  module.seed(0);

  /*
  for(var i=0; i<256; i++) {
    perm[i] = perm[i + 256] = p[i];
    gradP[i] = gradP[i + 256] = grad3[perm[i] % 12];
  }*/

  // Skewing and unskewing factors for 2, 3, and 4 dimensions
  var F2 = 0.5*(Math.sqrt(3)-1);
  var G2 = (3-Math.sqrt(3))/6;

  var F3 = 1/3;
  var G3 = 1/6;

  // 2D simplex noise
  module.simplex2 = function(xin, yin) {
    var n0, n1, n2; // Noise contributions from the three corners
    // Skew the input space to determine which simplex cell we're in
    var s = (xin+yin)*F2; // Hairy factor for 2D
    var i = Math.floor(xin+s);
    var j = Math.floor(yin+s);
    var t = (i+j)*G2;
    var x0 = xin-i+t; // The x,y distances from the cell origin, unskewed.
    var y0 = yin-j+t;
    // For the 2D case, the simplex shape is an equilateral triangle.
    // Determine which simplex we are in.
    var i1, j1; // Offsets for second (middle) corner of simplex in (i,j) coords
    if(x0>y0) { // lower triangle, XY order: (0,0)->(1,0)->(1,1)
      i1=1; j1=0;
    } else {    // upper triangle, YX order: (0,0)->(0,1)->(1,1)
      i1=0; j1=1;
    }
    // A step of (1,0) in (i,j) means a step of (1-c,-c) in (x,y), and
    // a step of (0,1) in (i,j) means a step of (-c,1-c) in (x,y), where
    // c = (3-sqrt(3))/6
    var x1 = x0 - i1 + G2; // Offsets for middle corner in (x,y) unskewed coords
    var y1 = y0 - j1 + G2;
    var x2 = x0 - 1 + 2 * G2; // Offsets for last corner in (x,y) unskewed coords
    var y2 = y0 - 1 + 2 * G2;
    // Work out the hashed gradient indices of the three simplex corners
    i &= 255;
    j &= 255;
    var gi0 = gradP[i+perm[j]];
    var gi1 = gradP[i+i1+perm[j+j1]];
    var gi2 = gradP[i+1+perm[j+1]];
    // Calculate the contribution from the three corners
    var t0 = 0.5 - x0*x0-y0*y0;
    if(t0<0) {
      n0 = 0;
    } else {
      t0 *= t0;
      n0 = t0 * t0 * gi0.dot2(x0, y0);  // (x,y) of grad3 used for 2D gradient
    }
    var t1 = 0.5 - x1*x1-y1*y1;
    if(t1<0) {
      n1 = 0;
    } else {
      t1 *= t1;
      n1 = t1 * t1 * gi1.dot2(x1, y1);
    }
    var t2 = 0.5 - x2*x2-y2*y2;
    if(t2<0) {
      n2 = 0;
    } else {
      t2 *= t2;
      n2 = t2 * t2 * gi2.dot2(x2, y2);
    }
    // Add contributions from each corner to get the final noise value.
    // The result is scaled to return values in the interval [-1,1].
    return 70 * (n0 + n1 + n2);
  };

  // 3D simplex noise
  module.simplex3 = function(xin, yin, zin) {
    var n0, n1, n2, n3; // Noise contributions from the four corners

    // Skew the input space to determine which simplex cell we're in
    var s = (xin+yin+zin)*F3; // Hairy factor for 2D
    var i = Math.floor(xin+s);
    var j = Math.floor(yin+s);
    var k = Math.floor(zin+s);

    var t = (i+j+k)*G3;
    var x0 = xin-i+t; // The x,y distances from the cell origin, unskewed.
    var y0 = yin-j+t;
    var z0 = zin-k+t;

    // For the 3D case, the simplex shape is a slightly irregular tetrahedron.
    // Determine which simplex we are in.
    var i1, j1, k1; // Offsets for second corner of simplex in (i,j,k) coords
    var i2, j2, k2; // Offsets for third corner of simplex in (i,j,k) coords
    if(x0 >= y0) {
      if(y0 >= z0)      { i1=1; j1=0; k1=0; i2=1; j2=1; k2=0; }
      else if(x0 >= z0) { i1=1; j1=0; k1=0; i2=1; j2=0; k2=1; }
      else              { i1=0; j1=0; k1=1; i2=1; j2=0; k2=1; }
    } else {
      if(y0 < z0)      { i1=0; j1=0; k1=1; i2=0; j2=1; k2=1; }
      else if(x0 < z0) { i1=0; j1=1; k1=0; i2=0; j2=1; k2=1; }
      else             { i1=0; j1=1; k1=0; i2=1; j2=1; k2=0; }
    }
    // A step of (1,0,0) in (i,j,k) means a step of (1-c,-c,-c) in (x,y,z),
    // a step of (0,1,0) in (i,j,k) means a step of (-c,1-c,-c) in (x,y,z), and
    // a step of (0,0,1) in (i,j,k) means a step of (-c,-c,1-c) in (x,y,z), where
    // c = 1/6.
    var x1 = x0 - i1 + G3; // Offsets for second corner
    var y1 = y0 - j1 + G3;
    var z1 = z0 - k1 + G3;

    var x2 = x0 - i2 + 2 * G3; // Offsets for third corner
    var y2 = y0 - j2 + 2 * G3;
    var z2 = z0 - k2 + 2 * G3;

    var x3 = x0 - 1 + 3 * G3; // Offsets for fourth corner
    var y3 = y0 - 1 + 3 * G3;
    var z3 = z0 - 1 + 3 * G3;

    // Work out the hashed gradient indices of the four simplex corners
    i &= 255;
    j &= 255;
    k &= 255;
    var gi0 = gradP[i+   perm[j+   perm[k   ]]];
    var gi1 = gradP[i+i1+perm[j+j1+perm[k+k1]]];
    var gi2 = gradP[i+i2+perm[j+j2+perm[k+k2]]];
    var gi3 = gradP[i+ 1+perm[j+ 1+perm[k+ 1]]];

    // Calculate the contribution from the four corners
    var t0 = 0.6 - x0*x0 - y0*y0 - z0*z0;
    if(t0<0) {
      n0 = 0;
    } else {
      t0 *= t0;
      n0 = t0 * t0 * gi0.dot3(x0, y0, z0);  // (x,y) of grad3 used for 2D gradient
    }
    var t1 = 0.6 - x1*x1 - y1*y1 - z1*z1;
    if(t1<0) {
      n1 = 0;
    } else {
      t1 *= t1;
      n1 = t1 * t1 * gi1.dot3(x1, y1, z1);
    }
    var t2 = 0.6 - x2*x2 - y2*y2 - z2*z2;
    if(t2<0) {
      n2 = 0;
    } else {
      t2 *= t2;
      n2 = t2 * t2 * gi2.dot3(x2, y2, z2);
    }
    var t3 = 0.6 - x3*x3 - y3*y3 - z3*z3;
    if(t3<0) {
      n3 = 0;
    } else {
      t3 *= t3;
      n3 = t3 * t3 * gi3.dot3(x3, y3, z3);
    }
    // Add contributions from each corner to get the final noise value.
    // The result is scaled to return values in the interval [-1,1].
    return 32 * (n0 + n1 + n2 + n3);

  };

  // ##### Perlin noise stuff

  function fade(t) {
    return t*t*t*(t*(t*6-15)+10);
  }

  function lerp(a, b, t) {
    return (1-t)*a + t*b;
  }

  // 2D Perlin Noise
  module.perlin2 = function(x, y) {
    // Find unit grid cell containing point
    var X = Math.floor(x), Y = Math.floor(y);
    // Get relative xy coordinates of point within that cell
    x = x - X; y = y - Y;
    // Wrap the integer cells at 255 (smaller integer period can be introduced here)
    X = X & 255; Y = Y & 255;

    // Calculate noise contributions from each of the four corners
    var n00 = gradP[X+perm[Y]].dot2(x, y);
    var n01 = gradP[X+perm[Y+1]].dot2(x, y-1);
    var n10 = gradP[X+1+perm[Y]].dot2(x-1, y);
    var n11 = gradP[X+1+perm[Y+1]].dot2(x-1, y-1);

    // Compute the fade curve value for x
    var u = fade(x);

    // Interpolate the four results
    return lerp(
        lerp(n00, n10, u),
        lerp(n01, n11, u),
       fade(y));
  };

  // 3D Perlin Noise
  module.perlin3 = function(x, y, z) {
    // Find unit grid cell containing point
    var X = Math.floor(x), Y = Math.floor(y), Z = Math.floor(z);
    // Get relative xyz coordinates of point within that cell
    x = x - X; y = y - Y; z = z - Z;
    // Wrap the integer cells at 255 (smaller integer period can be introduced here)
    X = X & 255; Y = Y & 255; Z = Z & 255;

    // Calculate noise contributions from each of the eight corners
    var n000 = gradP[X+  perm[Y+  perm[Z  ]]].dot3(x,   y,     z);
    var n001 = gradP[X+  perm[Y+  perm[Z+1]]].dot3(x,   y,   z-1);
    var n010 = gradP[X+  perm[Y+1+perm[Z  ]]].dot3(x,   y-1,   z);
    var n011 = gradP[X+  perm[Y+1+perm[Z+1]]].dot3(x,   y-1, z-1);
    var n100 = gradP[X+1+perm[Y+  perm[Z  ]]].dot3(x-1,   y,   z);
    var n101 = gradP[X+1+perm[Y+  perm[Z+1]]].dot3(x-1,   y, z-1);
    var n110 = gradP[X+1+perm[Y+1+perm[Z  ]]].dot3(x-1, y-1,   z);
    var n111 = gradP[X+1+perm[Y+1+perm[Z+1]]].dot3(x-1, y-1, z-1);

    // Compute the fade curve value for x, y, z
    var u = fade(x);
    var v = fade(y);
    var w = fade(z);

    // Interpolate
    return lerp(
        lerp(
          lerp(n000, n100, u),
          lerp(n001, n101, u), w),
        lerp(
          lerp(n010, n110, u),
          lerp(n011, n111, u), w),
       v);
  };

})(this);

(function() {

RandomMaps.generateNoiseMap = function(width, height, scale) {
    noise.seed(MK.rng.randomInteger(1, 100000));

    return RandomMaps.createMatrix(
        width,
        height,
        (x, y) => noiseFunction(x, y, scale),
    );
}

RandomMaps.generateMultiNoiseMap = function({ width, height, scale, n }) {
    noise.seed(MK.rng.randomInteger(1, 100000));

    const noiseMaps = RandomMaps.times(n).map(() => RandomMaps.generateNoiseMap(width, height, scale));

    return RandomMaps.createMatrix(
        width,
        height,
        (x, y) => {
            const max = Math.max(...RandomMaps.times(n).map(i => noiseMaps[i][x][y]));
            return RandomMaps.times(n).findIndex(i => noiseMaps[i][x][y] == max);
        },
    );
}

function noiseFunction(x, y, scale) {
    return (noise.perlin2(x / scale, y / scale) + 1.0) * 0.5;
}

})();


// =====================================================================================
// Maze Algorithms
// =====================================================================================


(function() {

function buildTunnelPair(map, x, y, direction) {
    buildTunnel(map, x, y, direction);

    if ('top' == direction)     buildTunnel(map, x, y - 1, 'bottom');
    if ('left' == direction)    buildTunnel(map, x - 1, y, 'right');
    if ('right' == direction)   buildTunnel(map, x + 1, y, 'left');
    if ('bottom' == direction)  buildTunnel(map, x, y + 1, 'top');
}

MK.buildTunnelPair = function(map, x, y, direction) {
    buildTunnelPair(map, x, y, direction);
}

function buildTunnel(map, x, y, direction) {
    if (x < 0 || x >= map.length)       return;
    if (y < 0 || y >= map[0].length)    return;
    
    const current_id = map[x][y];
    let next_id;
    
    if (direction == "top"    && current_id < 16) next_id = current_id | 1;
    if (direction == "right"  && current_id < 16) next_id = current_id | 2;
    if (direction == "bottom" && current_id < 16) next_id = current_id | 4;
    if (direction == "left"   && current_id < 16) next_id = current_id | 8;
    
    if (direction == "top") {
        if (current_id == 16 + 0)  next_id = 32 + 0;
        if (current_id == 16 + 1)  next_id = 32 + 1;
        if (current_id == 16 + 2)  next_id = 32 + 2;
        if (current_id == 32 + 8)  next_id = 32 + 3;
        if (current_id == 32 + 9)  next_id = 32 + 8;
    }
    if (direction == "right") {
        if (current_id == 16 + 2)  next_id = 32 + 9;
        if (current_id == 16 + 5)  next_id = 32 + 14;
        if (current_id == 16 + 8)  next_id = 32 + 13;
        if (current_id == 32 + 2)  next_id = 32 + 7;
        if (current_id == 32 + 6)  next_id = 32 + 11;
    }
    if (direction == "bottom") {
        if (current_id == 16 + 6)  next_id = 32 + 4;
        if (current_id == 16 + 7)  next_id = 32 + 5;
        if (current_id == 16 + 8)  next_id = 32 + 6;
        if (current_id == 32 + 12) next_id = 32 + 15;
        if (current_id == 32 + 13) next_id = 32 + 11;
    }
    if (direction == "left") {
        if (current_id == 16 + 0)  next_id = 32 + 8;
        if (current_id == 16 + 3)  next_id = 32 + 10;
        if (current_id == 16 + 6)  next_id = 32 + 12;
        if (current_id == 32 + 0)  next_id = 32 + 3;
        if (current_id == 32 + 4)  next_id = 32 + 15;
    }
    if (next_id !== undefined) map[x][y] = next_id;
}

MK.mazeAlgorithms = { };

MK.mazeAlgorithms.prims = function(width, height) {
    const map = RandomMaps.createMatrix(width, height);
    const points = RandomMaps.iterateMatrix(width, height);
    
    map[1][0] = map[1][0] | 4;
    map[1][1] = map[1][1] | 1;
    
    let remaining = points.length;
    
    while (remaining > 0) {
        remaining -= 1;

        const options = points
            .filter(({x, y}) => !map[x][y])
            .filter(({x, y}) => (
                (x > 0          && map[x - 1][y]) ||
                (x < width - 1  && map[x + 1][y]) ||
                (y > 0          && map[x][y - 1]) ||
                (y < height - 1 && map[x][y + 1])
            ));
        
        if (!options.length) break;

        const point = MK.rng.pickRandom(options);
        const x = point.x;
        const y = point.y;

        const possibleDirections = [
            (y > 0          && map[x][y - 1]    && 'top'),
            (x > 0          && map[x - 1][y]    && 'left'),
            (x < width - 1  && map[x + 1][y]    && 'right'),
            (y < height - 1 && map[x][y + 1]    && 'bottom'),
        ].filter(Boolean);

        const direction = MK.rng.pickRandom(possibleDirections);
        buildTunnelPair(map, x, y, direction);
    }
    return map;
}

MK.mazeAlgorithms.cutOffDeadEnds = function (map, nArgument) {
    const width = map.length;
    const height = map[0].length;
    
    const n = (nArgument && nArgument.length == 2)
        ? MK.rng.randomInteger(nArgument[0], nArgument[1])
        : nArgument;

    RandomMaps.times(n).forEach(() => {
        const points = RandomMaps.iterateMatrix(width, height)
            .filter(({x, y}) => [1, 2, 4, 8].includes(map[x][y]));
        
        const point = MK.rng.pickRandom(points);
        const x     = point.x;
        const y     = point.y;
        
        if (map[x][y] == 1) // v
        {
            map[x][y] = 0;
            map[x][y-1] = map[x][y-1] & 11;
        }
        if (map[x][y] == 2) // <
        {
            map[x][y] = 0;
            map[x+1][y] = map[x+1][y] & 7;
        }
        if (map[x][y] == 4) // ^
        {
            map[x][y] = 0;
            map[x][y+1] = map[x][y+1] & 14;
        }
        if (map[x][y] == 8) // >
        {
            map[x][y] = 0;
            map[x-1][y] = map[x-1][y] & 13;
        }
    });
}

MK.mazeAlgorithms.additionalTunnels = function(map, nArgument) {
    const width = map.length;
    const height = map[0].length;
    
    const n = (nArgument && nArgument.length == 2)
        ? MK.rng.randomInteger(nArgument[0], nArgument[1])
        : nArgument;

    RandomMaps.times(n).forEach(() => {
        const options = RandomMaps.iterateMatrix(width, height)
            .filter(({x, y}) => map[x][y])
            .filter(({x, y}) => (
                (y > 0          && map[x][y - 1] && !(map[x][y] & 1)) ||
                (x + 1 < width  && map[x + 1][y] && !(map[x][y] & 2)) ||
                (y + 1 < height && map[x][y + 1] && !(map[x][y] & 4)) ||
                (x > 0          && map[x - 1][y] && !(map[x][y] & 8))
            ));
        
        if (options.length) {
            const point     = MK.rng.pickRandom(options);
            const x         = point.x;
            const y         = point.y;

            const directions = [
                y > 0          && map[x][y - 1] && !(map[x][y] & 1) && 'top',
                x + 1 < width  && map[x + 1][y] && !(map[x][y] & 2) && 'right',
                y + 1 < height && map[x][y + 1] && !(map[x][y] & 4) && 'bottom',
                x > 0          && map[x - 1][y] && !(map[x][y] & 8) && 'left',
            ].filter(Boolean);

            if (directions.length) {
                const direction = MK.rng.pickRandom(directions);
                buildTunnelPair(map, x, y, direction);
            }
        }
    });
}

})();



// =====================================================================================
// RNGMaps Core
// =====================================================================================

(function(){const _0x553c79='MK_RNGMaps_Core',_0xc2fd38=PluginManager['parameters'](_0x553c79),_0x1b7951='true'==_0xc2fd38['drawShadows'],_0x2568ab='true'==_0xc2fd38['overrideDisplayName'],_0x4ca00b=_0xc2fd38['displayNameFormat1'],_0x246409=_0xc2fd38['displayNameFormat2'],_0xcba1f7=Number(_0xc2fd38['maxRetries'])||0x3e7,_0x102326={};Object['entries'](JSON['parse'](_0xc2fd38['regionIds']))['forEach'](([_0x5ef53c,_0x4b8a36])=>_0x102326[_0x5ef53c]=Number(_0x4b8a36)),RandomMaps['RegionIds']=_0x102326;function _0x3607eb(){return RandomMaps['unlockKey']=='2573be24-48ba-4f54-b625-ffcf92ab1058';}function _0x182712(){return!Utils['isNwjs']()&&window['location']['hostname']=='play.aerosys.blog';}function _0x3faf8f(){return Utils['isNwjs']()&&(Utils['isOptionValid']('test')||Utils['isOptionValid']('btest')||Utils['isOptionValid']('etest'));}const _0x58da72=Scene_Boot['prototype']['start'];Scene_Boot['prototype']['start']=function(){_0x58da72['call'](this);if(!_0x3607eb()&&!_0x182712()){console['warn']('Using\x20free\x20trial\x20version\x20of\x20RNGMaps\x20-\x20Game\x20will\x20not\x20launch\x20when\x20exported.'),console['warn']('If\x20you\x20purchased\x20the\x20Full\x20Version,\x20please\x20add\x20MK_RNGMaps_Unlocker.js\x20to\x20unlock\x20this\x20Plugin.');const _0x35682b=Scene_Map['prototype']['create'];Scene_Map['prototype']['create']=function(){const _0x1d4059=$gameMap['mapId']();!$gamePlayer['isTransferring']()&&MapInjection['isForgedMapId'](_0x1d4059)&&!MapInjection['isOnInjectedMap']()&&($gamePlayer['_transferring']=!![],$gamePlayer['_needsMapReload']=!![],$gamePlayer['_newMapId']=MapInjection['getOriginalMapId'](_0x1d4059),$gamePlayer['_newX']=$gamePlayer['x'],$gamePlayer['_newY']=$gamePlayer['y']),_0x35682b['apply'](this,arguments);};const _0x2314bf=Game_Player['prototype']['clearTransferInfo'];Game_Player['prototype']['clearTransferInfo']=function(){_0x2314bf['apply'](this,arguments),$gameMap['_injectedDataMap']=undefined;};}if(!_0x3607eb()&&!_0x182712()&&_0xc2fd38['showIsTrialWarningBanner']!=='false'){const _0x4fcb60='MK_banner',_0x46d398='You\x20are\x20using\x20the\x20free\x20trial\x20of\x20RNGMaps.\x20'+'You\x20can\x20try\x20out\x20all\x20the\x20features\x20for\x20free,\x20however,\x20it\x20works\x20in\x20RPG\x20Maker\x27s\x20testplay\x20only.\x20'+'Generated\x20Maps\x20are\x20not\x20memorized.',_0x54118c=''+'z-index:\x2010;'+'position:\x20absolute;'+'left:\x2050%;'+'margin-right:\x20-50%;'+'transform:\x20translate(-50%,\x20-50%);'+'top:\x2040px;'+'padding:\x205px\x2010px;'+'font-family:\x20sans-serif;'+'color:\x20white;'+'background-color:\x20black;'+'opacity:\x2070%;'+'border-style:\x20solid;'+'border-width:\x200.5px;'+'border-radius:\x206px;'+'border-color:\x20#888888;',_0x4c3d4c=''+'margin:\x203px\x205px\x203px\x2020px;'+'padding:\x205px\x2010px;'+'font-family:\x20sans-serif;'+'color:\x20white;'+'background-color:\x20black;'+'border-style:\x20solid;'+'border-width:\x201px;'+'border-radius:\x206px;'+'border-color:\x20white;'+'border-color:\x20white;',_0x555134=''+'color:\x20black;'+'background-color:\x20white;'+'transition-duration:\x200.2s',_0x159ced=''+'border-color:\x20#1E88E5;',_0x328c90=document['createElement']('style');_0x328c90['innerHTML']=''+'#'+_0x4fcb60+'\x20{\x20'+_0x54118c+'\x20}\x20'+'#'+_0x4fcb60+'\x20button\x20{\x20'+_0x4c3d4c+'\x20}\x20'+'#'+_0x4fcb60+'\x20button:hover\x20{\x20'+_0x555134+'\x20}'+'#'+_0x4fcb60+'\x20button:first-child\x20{\x20'+_0x159ced+'\x20}',document['body']['appendChild'](_0x328c90);const _0x1b0a54=document['createElement']('div');_0x1b0a54['id']=_0x4fcb60,_0x1b0a54['innerHTML']=_0x46d398;const _0x3d6450=document['createElement']('button');_0x3d6450['innerHTML']='X',_0x3d6450['onclick']=()=>_0x1b0a54['remove'](),_0x1b0a54['appendChild'](_0x3d6450),document['body']['appendChild'](_0x1b0a54);}!_0x3607eb()&&!_0x3faf8f()&&!_0x182712()&&(alert('RNGMaps\x20(Free\x20Version)\x20only\x20usable\x20in\x20PLAYTEST\x0a\x0a'+'If\x20you\x20purchased\x20the\x20Full\x20Version,\x20please\x20add\x20MK_RNGMaps_Unlocker.js\x20to\x20unlock\x20this\x20Plugin.'),SceneManager['exit']());};const _0x3e9d10=(_0x4ca094,_0x12b815,_0x59335f,_0x553415,_0x2eb4d6)=>(_0x59335f*_0x2eb4d6+_0x12b815)*_0x553415+_0x4ca094,_0x5cab9d=(_0x39724f,_0x1661da,_0x56c326,_0x13f478)=>_0x39724f['data'][_0x3e9d10(_0x1661da,_0x56c326,_0x13f478,_0x39724f['width'],_0x39724f['height'])],_0x2d4831=(_0x49cdb1,_0x12a5ac,_0xab09b0)=>_0x5cab9d(_0x49cdb1,_0x12a5ac,_0xab09b0,0x5);class _0x30d56f{constructor(_0x9ce5fb){this['seed']=_0x9ce5fb;}}_0x30d56f['prototype']['randomInteger']=function(_0x54eb05,_0x2a8ddf){RandomMaps['rejectIfNotANumber']('randomInteger','a',_0x54eb05),RandomMaps['rejectIfNotANumber']('randomInteger','b',_0x2a8ddf);if(_0x2a8ddf<_0x54eb05)return 0x0;if(_0x54eb05==_0x2a8ddf)return _0x54eb05;return this['hasSeed']()?this['_seedableRandomInteger'](_0x54eb05,_0x2a8ddf):this['_mathRandomMinMax'](_0x54eb05,_0x2a8ddf);},_0x30d56f['prototype']['_seedableRandomInteger']=function(_0x4530f9,_0x49db2c){if(!MK['rng']['hasSeed']())RandomMaps['rejectFatal']('Seedable\x20PRNG\x20has\x20not\x20seed\x20right\x20now');this['seed']=(this['seed']*0x2455+0xc091)%0x38f40;const _0x268d88=this['seed']/0x38f40;return Math['floor'](_0x4530f9+_0x268d88*(_0x49db2c+0x1-_0x4530f9));},_0x30d56f['prototype']['_mathRandomMinMax']=function(_0x432efa,_0xde95f8){return Math['floor'](Math['random']()*(_0xde95f8-_0x432efa+0x1))+_0x432efa;},_0x30d56f['prototype']['pickRandom']=function(_0x4676b6){return!_0x4676b6['length']&&RandomMaps['rejectFatal']('Cannot\x20pickRandom\x20from\x20empty\x20list.'),_0x4676b6['length']==0x1?_0x4676b6[0x0]:_0x4676b6[MK['rng']['randomInteger'](0x0,_0x4676b6['length']-0x1)];},_0x30d56f['prototype']['setSeed']=function(_0x8b19a4){this['seed']=_0x8b19a4===0x0?0x1:_0x8b19a4;},_0x30d56f['prototype']['noSeedableRNG']=function(){this['seed']=undefined;},_0x30d56f['prototype']['hasSeed']=function(){return this['seed']||this['seed']===0x0;},MK['rng']=new _0x30d56f(),MK['generateSeed']=function(..._0x195468){return(!_0x195468||!_0x195468['some']||_0x195468['some'](_0x34d6d6=>typeof _0x34d6d6!=='number'||isNaN(_0x34d6d6)))&&RandomMaps['rejectFatal']('Generate\x20seed:\x20invalid\x20arguments:\x20'+_0x195468),_0x195468['reduce']((_0x4c1158,_0x41a568)=>(0x1f*_0x4c1158+_0x41a568)%0x92b,0x1);};class _0x30ad16 extends Error{constructor(_0x503bd3){super('Unable\x20to\x20find\x20spots\x20for\x20%1.\x20Try\x20to\x20make\x20it\x20easier\x20for\x20the\x20Plugin\x20to\x20find\x20spots.'['format'](_0x503bd3)),this['name']=_0x503bd3;}}RandomMaps['forceRetry']=function(_0x14d36b){throw new _0x30ad16(_0x14d36b);};function _0x1dbf86(_0x495b3f){let _0x4fe078=0x0;while(!![]){try{return _0x495b3f();}catch(_0x8387e0){if(!(_0x8387e0 instanceof _0x30ad16))throw _0x8387e0;if(_0x4fe078>_0xcba1f7){alert('Unable\x20to\x20find\x20spots\x20for\x20%1.\x20Try\x20to\x20make\x20it\x20easier\x20for\x20the\x20Plugin\x20to\x20find\x20spots.\x20The\x20plugin\x20tries\x20to\x20resume\x20map\x20generation.'['format'](_0x8387e0['name']));return;}_0x4fe078++;}}}function _0x43f027(_0x231177,_0x2b4bad){return Math['sqrt'](Math['abs'](_0x2b4bad['x']-_0x231177['x'])**0x2+Math['abs'](_0x2b4bad['y']-_0x231177['y'])**0x2);}function _0x13a369(_0x1c3368){const _0x102c00=[];return _0x1c3368['forEach']((_0x10f3ab,_0x230b2a)=>{_0x1c3368['forEach']((_0xb1eb90,_0x479ad6)=>{if(_0x230b2a==_0x479ad6)return;_0x102c00['push']([_0x10f3ab,_0xb1eb90]);});}),_0x102c00;}MK['kruskalMST']=function(_0x54d69a){if(_0x54d69a['length']==0x1)return[];const _0x316f0e=[],_0xa9e85a=[],_0x50fc2d=_0x13a369(_0x54d69a)['map'](([_0x428232,_0x2dee9f])=>({'start':_0x428232,'dest':_0x2dee9f,'weight':_0x43f027(_0x428232,_0x2dee9f)}));_0x50fc2d['sort']((_0x421615,_0x2f3011)=>_0x421615['weight']-_0x2f3011['weight']);const _0x196d9e=_0x7d3984=>_0xa9e85a['find'](_0x2e535a=>_0x2e535a['contains'](_0x7d3984['start'])&&_0x2e535a['contains'](_0x7d3984['dest'])),_0x39d79c=_0x4291b5=>{for(let _0x3ec1fc=0x0;_0x3ec1fc<_0xa9e85a['length'];_0x3ec1fc++){let _0x2f2970=_0xa9e85a[_0x3ec1fc];if(_0x2f2970['contains'](_0x4291b5['start'])){_0x2f2970['push'](_0x4291b5['dest']);for(let _0x5d8ef4=0x0;_0x5d8ef4<_0xa9e85a['length'];_0x5d8ef4++){if(_0x3ec1fc==_0x5d8ef4)continue;let _0x5b8128=_0xa9e85a[_0x5d8ef4];if(_0x5b8128['contains'](_0x4291b5['dest'])){_0x5b8128['forEach'](_0x529d1f=>_0x2f2970['push'](_0x529d1f)),_0xa9e85a['splice'](_0x5d8ef4,0x1);return;}}return;}else{if(_0x2f2970['contains'](_0x4291b5['dest'])){_0x2f2970['push'](_0x4291b5['start']);for(let _0x15cb22=0x0;_0x15cb22<_0xa9e85a['length'];_0x15cb22++){if(_0x3ec1fc==_0x15cb22)continue;let _0x46817f=_0xa9e85a[_0x15cb22];if(_0x46817f['contains'](_0x4291b5['start'])){_0x46817f['forEach'](_0x5639f9=>_0x2f2970['push'](_0x5639f9)),_0xa9e85a['splice'](_0x15cb22,0x1);return;}}return;}}}_0xa9e85a['push']([_0x4291b5['start'],_0x4291b5['dest']]);};for(let _0x3b2421=0x0;_0x3b2421<_0x50fc2d['length'];_0x3b2421++){const _0x5b8232=_0x50fc2d[_0x3b2421];!_0x196d9e(_0x5b8232)&&(_0x316f0e['push'](_0x5b8232),_0x39d79c(_0x5b8232));if(_0x316f0e['length']==_0x54d69a['length']-0x1)break;}return _0x316f0e;},RandomMaps['generate']=function({mapId:_0x459c6f,useSnippets:_0x45b025,templateName:_0x261cbf,seed:_0x28f3bb,seedVariableIds:seedVariableIds=[],roomLayout:roomLayout='single\x20room',exits:exits=['top','bottom'],enterFrom:_0x2543a8,startingRoom:_0x483280,spawnAt:_0x21ba01}){_0x459c6f||RandomMaps['reject']('You\x20need\x20to\x20pass\x20a\x20Map\x20Id!');!RandomMaps['isPositiveIntegerNumber'](_0x459c6f)&&RandomMaps['reject']('You\x20need\x20to\x20pass\x20a\x20number\x20as\x20Map\x20Id;\x20given\x20instead:\x20'+_0x459c6f);if($gameTemp['_generatingRandomMap'])return;$gameTemp['_generatingRandomMap']=!![],$gameSystem['_lastUsedRngTemplateName']=_0x261cbf,$gamePlayer['_nextSpawnLocation']=_0x2543a8,$gameSystem['_lastDungeonTechnique']=_0x45b025?'snippet-based':'snippetless',RandomMaps['setupMetaMaze'](_0x459c6f,roomLayout,_0x28f3bb,seedVariableIds,exits);const _0x30c97e=RandomMaps['determineStartingRoom'](_0x2543a8,_0x483280,$gameMap['_metaMazeExits']);RandomMaps['jumpToRoom'](_0x30c97e['x'],_0x30c97e['y']),_0x52408(),MK['rng']['setSeed'](MK['generateSeed']($gameMap['_metaMazeSeed'],_0x30c97e['x'],_0x30c97e['y'])),LoadAdditionalMaps['preload'](_0x459c6f,_0x6768cd=>{const _0x211721=_0x2d4ef4(_0x261cbf,_0x45b025);let _0x2e1d5f;_0x1dbf86(()=>{MK['rng']['seed']++,_0x2e1d5f=JsonEx['makeDeepCopy'](_0x6768cd),_0x45b025?RandomMaps['generateWithSnippets'](_0x2e1d5f,_0x211721,_0x5b3d44()):RandomMaps['generateWithoutSnippets'](_0x2e1d5f,_0x211721,_0x5b3d44());}),_0x4b0515(_0x2e1d5f,_0x211721);const _0x52d4b4=_0x3d91b2(_0x21ba01||_0x2543a8);MapInjection['injectDataMap'](_0x2e1d5f,_0x459c6f,_0x398d67(),_0x52d4b4['x'],_0x52d4b4['y'])['then'](()=>{_0x2ffbb8(),$gameTemp['_generatingRandomMap']=![];});});},RandomMaps['regenerate']=function(){if(!$gameSystem['_lastUsedRngTemplateName'])RandomMaps['reject']('You\x20can\x27t\x20call\x20RandomMaps.goTo\x20when\x20you\x20are\x20not\x20on\x20a\x20generated\x20map.');if($gameTemp['_generatingRandomMap'])return;$gameTemp['_generatingRandomMap']=!![];const _0x1efe03=RandomMaps['getNextRoomX'](),_0x3e296b=RandomMaps['getNextRoomY'](),_0xb71f70=$gameSystem['_lastDungeonTechnique']=='snippet-based',_0x4d5709=_0x2d4ef4($gameSystem['_lastUsedRngTemplateName'],_0xb71f70);!RandomMaps['existsRoom'](_0x1efe03,_0x3e296b)&&RandomMaps['reject']('You\x20are\x20about\x20to\x20go\x20to\x20Room\x20(%1/%2)\x20but\x20this\x20Room\x20doesn\x27t\x20exist\x20in\x20current\x20Layout.'['format'](_0x1efe03,_0x3e296b)),_0x52408(),MK['rng']['setSeed'](MK['generateSeed']($gameMap['_metaMazeSeed'],RandomMaps['getNextRoomX'](),RandomMaps['getNextRoomY']())),LoadAdditionalMaps['preload']($gameMap['mapId'](),_0x5a0e01=>{let _0x21907d;_0x1dbf86(()=>{MK['rng']['seed']++,_0x21907d=JsonEx['makeDeepCopy'](_0x5a0e01),_0xb71f70?RandomMaps['generateWithSnippets'](_0x21907d,_0x4d5709,_0x5b3d44()):RandomMaps['generateWithoutSnippets'](_0x21907d,_0x4d5709,_0x5b3d44());}),_0x4b0515(_0x21907d,_0x4d5709);const _0x2091ad=_0x3d91b2($gamePlayer['_nextSpawnLocation']);MapInjection['injectDataMap'](_0x21907d,$gameMap['mapId'](),_0x398d67(),_0x2091ad['x'],_0x2091ad['y'])['then'](()=>{_0x2ffbb8(),$gameTemp['_generatingRandomMap']=![];});});};function _0x398d67(){return'%1_%2_%3'['format'](RandomMaps['getUniqueDungeonIdentifier'](),RandomMaps['getNextRoomX'](),RandomMaps['getNextRoomY']());}RandomMaps['goTo']=function(_0x416052){if($gamePlayer['isTransferring']())return;!$gameSystem['_lastUsedRngTemplateName']&&RandomMaps['reject']('You\x20can\x27t\x20call\x20RandomMaps.goTo\x20when\x20you\x20are\x20not\x20on\x20a\x20generated\x20map.');!['top','left','right','bottom']['includes'](_0x416052)&&RandomMaps['reject']('RandomMaps.goTo:\x20You\x20need\x20to\x20type\x20a\x20direction.\x20'+'Choose\x20from\x20\x22top\x22,\x20\x22left\x22,\x20\x22right\x22,\x20\x22bottom\x22.');const _0x2d47c8={'left':-0x1,'right':0x1}[_0x416052]||0x0,_0x9abf30={'top':-0x1,'bottom':0x1}[_0x416052]||0x0;RandomMaps['jumpToRoom'](RandomMaps['getCurrentRoomX']()+_0x2d47c8,RandomMaps['getCurrentRoomY']()+_0x9abf30),$gamePlayer['_nextSpawnLocation']=_0x15a688(_0x416052);};function _0x15a688(_0x34e2e8){return{'top':'bottom','left':'right','right':'left','bottom':'top'}[_0x34e2e8];}function _0x2ffbb8(){$gamePlayer['_currentRoomX']=$gamePlayer['_nextRoomX'],$gamePlayer['_currentRoomY']=$gamePlayer['_nextRoomY'],$gamePlayer['_nextRoomX']=undefined,$gamePlayer['_nextRoomY']=undefined;}function _0x2d4ef4(_0x30102d,_0x22d3ec){!_0x30102d&&RandomMaps['reject']('You\x20forgot\x20to\x20pass\x20a\x20Template.');const _0x55b6d8=_0x22d3ec?PluginManager['parameters']('MK_RNGMaps_withSnippets'):PluginManager['parameters']('MK_RNGMaps_withoutSnippets'),_0x4db5d3=JSON['parse'](_0x55b6d8['templates'])['map'](JSON['parse']),_0x26ea6f=_0x4db5d3['find'](_0x33adb6=>_0x33adb6['name']['toLowerCase']()==_0x30102d['toLowerCase']());return _0x26ea6f||RandomMaps['reject']('The\x20Template\x20\x22%1\x22\x20does\x20not\x20exist.'['format'](_0x30102d));}function _0x5b3d44(){const _0x3dac4c=RandomMaps['getNextRoomShape'](),_0x5ee423=RandomMaps['getNextRoomX'](),_0xb3f9d1=RandomMaps['getNextRoomY'](),_0x5ae976=RandomMaps['getNumberOfRoomsHorizontal'](),_0x2e9aef=RandomMaps['getNumberOfRoomsVertical']();return{'top':(_0x3dac4c&0x1)>0x0,'right':(_0x3dac4c&0x2)>0x0,'bottom':(_0x3dac4c&0x4)>0x0,'left':(_0x3dac4c&0x8)>0x0,'mainExitTop':_0x3dac4c&0x1&&_0xb3f9d1==0x0,'mainExitRight':_0x3dac4c&0x2&&_0x5ee423==_0x5ae976-0x1,'mainExitBottom':_0x3dac4c&0x4&&_0xb3f9d1==_0x2e9aef-0x1,'mainExitLeft':_0x3dac4c&0x8&&_0x5ee423==0x0,'innerExitTop':_0x3dac4c&0x1&&_0xb3f9d1>0x0,'innerExitRight':_0x3dac4c&0x2&&_0x5ee423<_0x5ae976-0x1,'innerExitBottom':_0x3dac4c&0x4&&_0xb3f9d1<_0x2e9aef-0x1,'innerExitLeft':_0x3dac4c&0x8&&_0x5ee423>0x0};}function _0x2431de(_0x2eaac9,_0x2e5e27){const _0x194f8f={'top':_0x102326['northernSpawnLocation'],'left':_0x102326['westernSpawnLocation'],'right':_0x102326['easternSpawnLocation'],'bottom':_0x102326['southernSpawnLocation']}[_0x2e5e27],_0x2dc2e1=RandomMaps['iterateMatrix'](_0x2eaac9['width'],_0x2eaac9['height'])['filter'](({x:_0x2979c0,y:_0x3e2497})=>_0x2d4831(_0x2eaac9,_0x2979c0,_0x3e2497)==_0x194f8f);if(!_0x2dc2e1['length'])return alert('No\x20Spawn\x20Locations\x20found\x20for\x20direction\x20%1.\x20The\x20plugin\x20tries\x20to\x20resume\x20generation.'['format'](_0x2e5e27)),{'x':0x1,'y':0x1};const _0x541790=['top','bottom']['includes'](_0x2e5e27)?_0x2dc2e1['map'](_0x8f3b1e=>_0x8f3b1e['y']):_0x2dc2e1['map'](_0x434614=>_0x434614['x']),_0x39330c=['top','left']['includes'](_0x2e5e27)?Math['min'](..._0x541790):Math['max'](..._0x541790),_0x264092=['top','bottom']['includes'](_0x2e5e27)?_0x2dc2e1['filter'](_0xde4ea5=>Math['abs'](_0xde4ea5['y']-_0x39330c)<0x5):_0x2dc2e1['filter'](_0xc2e7f2=>Math['abs'](_0xc2e7f2['x']-_0x39330c)<0x5);return MK['rng']['pickRandom'](_0x264092);}function _0x4b0515(_0x1182a8,_0x2277d5){_0x81a4e5(_0x2277d5)?MK['fixShadows'](_0x1182a8):MK['removeShadows'](_0x1182a8),MK['fixAllAutotiles'](_0x1182a8,_0x2277d5['fixAutoTiles']);}function _0x81a4e5(_0x148b09){return'draw\x20Shadows'==_0x148b09['shadowMode']||'use\x20global\x20Settings'==_0x148b09['shadowMode']&&_0x1b7951;}MK['calculateXTimesMeta']=function(_0x2bee19,_0xd3b54,_0x10ead4){const _0x1f0d7f=MK['generateSeed']($gameMap['_metaMazeSeed'],_0x2bee19),_0x25cf51=new _0x30d56f(_0x1f0d7f);let _0x3d31c2=_0x25cf51['randomInteger'](_0xd3b54,_0x10ead4);const _0x523926=RandomMaps['getNumberOfRoomsHorizontal'](),_0x29777=RandomMaps['getNumberOfRoomsVertical'](),_0x1659a3=RandomMaps['createMatrix'](_0x523926,_0x29777,0x0);while(_0x3d31c2){const _0x42c22b=_0x25cf51['randomInteger'](0x0,_0x523926-0x1),_0x139730=_0x25cf51['randomInteger'](0x0,_0x29777-0x1);RandomMaps['existsRoom'](_0x42c22b,_0x139730)&&(_0x1659a3[_0x42c22b][_0x139730]=_0x1659a3[_0x42c22b][_0x139730]+0x1,_0x3d31c2--);}return _0x1659a3[RandomMaps['getNextRoomX']()][RandomMaps['getNextRoomY']()];};const _0x208c2b={};function _0x52408(){_0x208c2b['top']=undefined,_0x208c2b['left']=undefined,_0x208c2b['right']=undefined,_0x208c2b['bottom']=undefined;}RandomMaps['_setSpawnLocation']=function(_0x26859d,_0x104568){_0x208c2b[_0x26859d]=_0x104568;};function _0x3d91b2(_0x49240e){if(typeof _0x49240e=='object'&&'x'in _0x49240e&&'y'in _0x49240e)return _0x49240e;if(['top','left','right','bottom']['includes'](_0x49240e)){const _0x3edb58=_0x208c2b[_0x49240e];return _0x3edb58?_0x3edb58:(alert(('Wanted\x20to\x20spawn\x20from\x20direction\x20%1,\x20but\x20the\x20plugin\x20cannot\x20find\x20a\x20good\x20position.\x20'+'The\x20plugin\x20tries\x20to\x20resume\x20generation.')['format'](_0x49240e)),{'x':0x1,'y':0x1});}RandomMaps['reject']('You\x20forgot\x20to\x20tell\x20where\x20the\x20Player\x20should\x20spawn.\x20'+'Please\x20set\x20either\x20\x22enterFrom\x22\x20or\x20\x22spawnAt\x22.');}if(_0x2568ab){const _0x370110=Game_Map['prototype']['displayName'];Game_Map['prototype']['displayName']=function(){const _0x37c5bc=_0x370110['call'](this),_0x296d44=RandomMaps['isInDungeon'](),_0x287b76=RandomMaps['getNumberOfRoomsHorizontal'](),_0x19e555=RandomMaps['getNumberOfRoomsVertical']();if(_0x37c5bc&&_0x296d44&&_0x287b76>0x1&&_0x19e555>0x1)return _0x4ca00b['format'](_0x37c5bc,RandomMaps['getCurrentRoomX']()+0x1,_0x19e555-RandomMaps['getCurrentRoomY']());if(_0x37c5bc&&_0x296d44&&_0x19e555>0x1)return _0x246409['format'](_0x37c5bc,_0x19e555-RandomMaps['getCurrentRoomY']());return _0x37c5bc;};}if(PluginManager['registerCommand']){const _0xb32781=_0xd681d6=>'Variable'==_0xd681d6['mapIdMode']?$gameVariables['value'](Number(_0xd681d6['mapIdVariable'])):Number(_0xd681d6['mapId']),_0x347c47=_0x54ab29=>{const _0x39fd36=RandomMaps['commandStructure'](_0x54ab29['exits'],'Generate','Exits');return['true'==_0x39fd36['exitTop']&&'top','true'==_0x39fd36['exitLeft']&&'left','true'==_0x39fd36['exitRight']&&'right','true'==_0x39fd36['exitBottom']&&'bottom']['filter'](Boolean);},_0x212dc9=_0x5c9167=>{return _0x5c9167['seedVariableIds']&&JSON['parse'](_0x5c9167['seedVariableIds'])['map'](Number);},_0x1fa2d5=_0x5c6ff5=>{const _0x2fed61=_0x5c6ff5['startingRoomXYVariables']&&RandomMaps['commandStructure'](_0x5c6ff5['startingRoomXYVariables'],'Generate','Starting\x20Room\x20at\x20X,\x20Y');return _0x2fed61?_0x4af099(_0x2fed61):{'x':0x0,'y':0x0};},_0x503a62=_0x296edd=>{const _0x37c07e=RandomMaps['commandStructure'](_0x296edd['spawnLocationXYVariables'],'Generate','Spawn\x20on\x20Map\x20at\x20X,\x20Y');return _0x4af099(_0x37c07e);},_0x4af099=_0x2e1a92=>{return{'x':$gameVariables['value'](Number(_0x2e1a92['x'])),'y':$gameVariables['value'](Number(_0x2e1a92['y']))};};PluginManager['registerCommand'](_0x553c79,'generate',_0x4b52a1=>{const _0x4727fe=_0xb32781(_0x4b52a1),_0x78d596=_0x212dc9(_0x4b52a1),_0xff18ac=_0x347c47(_0x4b52a1);RandomMaps['generate']({'mapId':_0x4727fe,'useSnippets':'true'==_0x4b52a1['useSnippets'],'templateName':_0x4b52a1['templateName'],'seedVariableIds':_0x78d596,'roomLayout':_0x4b52a1['layoutName'],'exits':_0xff18ac,'enterFrom':_0x4b52a1['enterFrom']});}),PluginManager['registerCommand'](_0x553c79,'generateAndTeleport',_0x3d9278=>{const _0xb67de6=_0xb32781(_0x3d9278),_0x27c1e4=_0x212dc9(_0x3d9278),_0x2f6a0f=_0x347c47(_0x3d9278),_0x49a501=_0x1fa2d5(_0x3d9278),_0x6a1c34=_0x503a62(_0x3d9278);RandomMaps['generate']({'mapId':_0xb67de6,'useSnippets':'true'==_0x3d9278['useSnippets'],'templateName':_0x3d9278['templateName'],'seedVariableIds':_0x27c1e4,'roomLayout':_0x3d9278['layoutName'],'exits':_0x2f6a0f,'startingRoom':_0x49a501,'spawnAt':_0x6a1c34});}),PluginManager['registerCommand'](_0x553c79,'goTo',_0x247687=>{RandomMaps['goTo'](_0x247687['direction']);}),PluginManager['registerCommand'](_0x553c79,'willStayInDungeon',_0x3c416d=>{$gameSwitches['setValue'](Number(_0x3c416d['switchId']),RandomMaps['willStayInDungeon']());}),PluginManager['registerCommand'](_0x553c79,'regenerate',()=>{RandomMaps['regenerate']();}),PluginManager['registerCommand'](_0x553c79,'doesRoomExist',_0x4c9cc9=>{const _0x3e1a28=RandomMaps['existsRoom']($gameVariables['value'](Number(_0x4c9cc9['x'])),$gameVariables['value'](Number(_0x4c9cc9['y'])));$gameSwitches['setValue'](Number(_0x4c9cc9['switchId']),_0x3e1a28);}),PluginManager['registerCommand'](_0x553c79,'isRoomVisited',_0xc6147c=>{let _0xbb9630;'current\x20Room'==_0xc6147c['mode']&&(_0xbb9630={'x':RandomMaps['getCurrentRoomX'](),'y':RandomMaps['getCurrentRoomY']()}),'by\x20X,\x20Y'==_0xc6147c['mode']&&(_0xbb9630=_0x4af099(RandomMaps['commandStructure'](_0xc6147c['whenByVariables'],'Is\x20Room\x20visited?','when\x20by\x20X,\x20Y'))),$gameSwitches['setValue'](Number(_0xc6147c['switchId']),RandomMaps['isRoomVisited'](_0xbb9630['x'],_0xbb9630['y']));}),PluginManager['registerCommand'](_0x553c79,'getVariableData',_0x1a4474=>{let _0x5094f4=0x0;'Room\x20X\x20in\x20Dungeon\x20Layout'==_0x1a4474['data']&&(_0x5094f4=RandomMaps['getCurrentRoomX']()),'Room\x20Y\x20in\x20Dungeon\x20Layout'==_0x1a4474['data']&&(_0x5094f4=RandomMaps['getCurrentRoomY']()),'Number\x20of\x20Rooms\x20horz'==_0x1a4474['data']&&(_0x5094f4=RandomMaps['getNumberOfRoomsHorizontal']()),'Number\x20of\x20Rooms\x20vert'==_0x1a4474['data']&&(_0x5094f4=RandomMaps['getNumberOfRoomsVertical']()),$gameVariables['setValue'](Number(_0x1a4474['variableId']),_0x5094f4);}),PluginManager['registerCommand'](_0x553c79,'setSeed',_0x23bf93=>{const _0x231930=_0x212dc9(_0x23bf93);if(_0x231930&&_0x231930['length']){const _0x4d9bcb=_0x231930['map'](_0x14087a=>$gameVariables['value'](_0x14087a)),_0x351eb3=MK['generateSeed'](..._0x4d9bcb);MK['rng']['setSeed'](_0x351eb3);}}),PluginManager['registerCommand'](_0x553c79,'getRandomNumber',_0x338a74=>{const _0x257615=MK['rng']['randomInteger'](Number(_0x338a74['min'])||0x0,Number(_0x338a74['max'])||0x0);$gameVariables['setValue'](Number(_0x338a74['variableId']),_0x257615);}),PluginManager['registerCommand'](_0x553c79,'getOriginalMapId',_0x5682bf=>{const _0x552233=$gameMap['mapId'](),_0x1662e4=MK['MapInjection']['getOriginalMapId'](_0x552233);$gameVariables['setValue'](Number(_0x5682bf['variableId']),_0x1662e4);}),PluginManager['registerCommand'](_0x553c79,'hasSavepoint',_0x17ef3c=>{$gameSwitches['setValue'](Number(_0x17ef3c['switchId']),RandomMaps['hasSavepoint']());}),PluginManager['registerCommand'](_0x553c79,'makeSavepoint',()=>{RandomMaps['makeSavepoint']();}),PluginManager['registerCommand'](_0x553c79,'returnToSavepoint',()=>{RandomMaps['returnToSavepoint']();}),PluginManager['registerCommand'](_0x553c79,'clearSavepoint',()=>{RandomMaps['clearSavepoint']();});}}());
(function(){const _0x392015='MK_RNGMaps_Core',_0x1b721b=_0x32f984=>{if(typeof _0x32f984=='string'&&_0x32f984['split']('-')['length']==0x2)return[Number(_0x32f984['split']('-')[0x0]),Number(_0x32f984['split']('-')[0x1])];if(Number(_0x32f984)||Number(_0x32f984)===0x0)return Number(_0x32f984);},_0x464976=PluginManager['parameters'](_0x392015),_0x4252b8=RandomMaps['parameterStructure'](_0x464976['layouts'],'Room\x20Layouts')['map'](_0xaf535e=>RandomMaps['parameterStructure'](_0xaf535e,'Room\x20Layouts'));RandomMaps['setupMetaMaze']=function(_0x12e7f1,_0x6b18cc,_0x11c410,_0x17c2b0,_0x10d555){$gameMap['_metaMazeSeed']=_0x393b99(_0x11c410,_0x17c2b0),$gameMap['_uniqueDungeonIdentifier']=_0x1aa712(_0x17c2b0,$gameMap['_metaMazeSeed']),MK['rng']['setSeed']($gameMap['_metaMazeSeed']),$gameMap['_metaMaze']=_0x4ed03d(_0x6b18cc);const _0x2906f0=_0x53d7a1(_0x6b18cc)||{};_0x3fea73($gameMap['_metaMaze'],_0x10d555,'true'==_0x2906f0['centerExits']);};function _0x393b99(_0x281d79,_0x462de0){if(typeof _0x281d79=='number')return _0x281d79;if(_0x462de0&&_0x462de0['length']){const _0x528765=_0x462de0['map'](_0xab9c83=>$gameVariables['value'](_0xab9c83));return MK['generateSeed'](..._0x528765);}return MK['rng']['_mathRandomMinMax'](0x1,0xf423f);}function _0x1aa712(_0x2bf59b,_0x79f68d){return _0x2bf59b&&_0x2bf59b['length']?_0x2bf59b['map'](_0x5edc34=>$gameVariables['value'](_0x5edc34))['map'](String)['join']('_'):String(_0x79f68d);}RandomMaps['getUniqueDungeonIdentifier']=function(){return $gameMap['_uniqueDungeonIdentifier'];},RandomMaps['willStayInDungeon']=function(){const _0x1858d4=RandomMaps['getNextRoomX'](),_0x1b0691=RandomMaps['getNextRoomY'](),_0x5448be=RandomMaps['getNumberOfRoomsHorizontal'](),_0x13b155=RandomMaps['getNumberOfRoomsVertical']();return 0x0<=_0x1858d4&&_0x1858d4<_0x5448be&&0x0<=_0x1b0691&&_0x1b0691<_0x13b155;},RandomMaps['willLeaveDungeon']=function(){return!RandomMaps['willStayInDungeon']();},RandomMaps['isInDungeon']=function(){const _0x4a9d9a=RandomMaps['getCurrentRoomX'](),_0x19dee6=RandomMaps['getCurrentRoomY'](),_0x27ad39=RandomMaps['getNumberOfRoomsHorizontal'](),_0x290d3e=RandomMaps['getNumberOfRoomsVertical']();return MapInjection['isForgedMapId']($gameMap['mapId']())&&0x0<=_0x4a9d9a&&_0x4a9d9a<_0x27ad39&&0x0<=_0x19dee6&&_0x19dee6<_0x290d3e;},RandomMaps['isSingleRoom']=function(){return RandomMaps['getNumberOfRoomsHorizontal']()==0x1&&RandomMaps['getNumberOfRoomsVertical']()==0x1;},RandomMaps['getNumberOfRoomsHorizontal']=function(){return $gameMap['_metaMaze']&&$gameMap['_metaMaze']['length'];},RandomMaps['getNumberOfRoomsVertical']=function(){return $gameMap['_metaMaze']&&$gameMap['_metaMaze'][0x0]&&$gameMap['_metaMaze'][0x0]['length'];},RandomMaps['existsRoom']=function(_0x504aea,_0x2337d8){const _0x593def=$gameMap['_metaMaze'];return _0x593def&&(RandomMaps['isSingleRoom']()&&_0x504aea==0x0&&_0x2337d8==0x0||_0x593def[_0x504aea]&&_0x593def[_0x504aea][_0x2337d8]);},RandomMaps['getRoomShape']=function(_0x5f35c3,_0x19b633){return $gameMap['_metaMaze']&&$gameMap['_metaMaze'][_0x5f35c3]&&$gameMap['_metaMaze'][_0x5f35c3][_0x19b633];},RandomMaps['getCurrentRoomShape']=function(){return RandomMaps['getRoomShape'](RandomMaps['getCurrentRoomX'](),RandomMaps['getCurrentRoomY']());},RandomMaps['getNextRoomShape']=function(){return RandomMaps['getRoomShape'](RandomMaps['getNextRoomX'](),RandomMaps['getNextRoomY']());},RandomMaps['getCurrentRoomX']=function(){return $gamePlayer['_currentRoomX']||0x0;},RandomMaps['getCurrentRoomY']=function(){return $gamePlayer['_currentRoomY']||0x0;},RandomMaps['getNextRoomX']=function(){return $gamePlayer['_nextRoomX'];},RandomMaps['getNextRoomY']=function(){return $gamePlayer['_nextRoomY'];},RandomMaps['jumpToRoom']=function(_0x5bd32c,_0x5c2be7){$gamePlayer['_nextRoomX']=_0x5bd32c,$gamePlayer['_nextRoomY']=_0x5c2be7;},RandomMaps['hasExitTop']=function(){return RandomMaps['getCurrentRoomShape']()&0x1;},RandomMaps['hasExitRight']=function(){return RandomMaps['getCurrentRoomShape']()&0x2;},RandomMaps['hasExitBottom']=function(){return RandomMaps['getCurrentRoomShape']()&0x4;},RandomMaps['hasExitLeft']=function(){return RandomMaps['getCurrentRoomShape']()&0x8;},RandomMaps['hasMainExitTop']=function(){return RandomMaps['hasExitTop']()&&RandomMaps['getCurrentRoomY']()==0x0;},RandomMaps['hasMainExitLeft']=function(){return RandomMaps['hasExitLeft']()&&RandomMaps['getCurrentRoomX']()==0x0;},RandomMaps['hasMainExitRight']=function(){return RandomMaps['hasExitRight']()&&RandomMaps['getCurrentRoomX']()==RandomMaps['getNumberOfRoomsHorizontal']()-0x1;},RandomMaps['hasMainExitBottom']=function(){return RandomMaps['hasExitBottom']()&&RandomMaps['getCurrentRoomY']()==RandomMaps['getNumberOfRoomsVertical']()-0x1;},RandomMaps['getLayout']=function(_0x5eec55){const _0x561d86=_0x4252b8['find'](_0x2f0525=>_0x2f0525['name']['toLowerCase']()==_0x5eec55['toLowerCase']());return _0x561d86||RandomMaps['reject']('The\x20Room\x20Layout\x20\x22%1\x22\x20does\x20not\x20exist.'['format'](_0x5eec55));};function _0x53d7a1(_0x2c066a){const _0x2150d6=RandomMaps['getLayout'](_0x2c066a),_0x3233c8={'Grid':'gridSettings','Maze':'mazeSettings','Imperfect\x20Maze':'imperfectMazeSettings','Road':'roadSettings'}[_0x2150d6['layout']];return _0x3233c8&&RandomMaps['parameterStructure'](_0x2150d6[_0x3233c8],'Layout\x20Settings');}RandomMaps['getLayoutWidth']=function(_0x39f808){const _0x888e74=_0x53d7a1(_0x39f808);if(Number(_0x888e74['nRoomsHorizontal']))return Number(_0x888e74['nRoomsHorizontal']);if(Number(_0x888e74['width']))return Number(_0x888e74['width']);return 0x1;},RandomMaps['getLayoutHeight']=function(_0x5f9e01){const _0x833daf=_0x53d7a1(_0x5f9e01);if(Number(_0x833daf['nRoomsVertical']))return Number(_0x833daf['nRoomsVertical']);if(Number(_0x833daf['height']))return Number(_0x833daf['height']);return 0x1;};function _0x4ed03d(_0x511fee){const _0x3a8c81=RandomMaps['getLayout'](_0x511fee),_0x1fd202=_0x53d7a1(_0x511fee),_0x494efc=RandomMaps['getLayoutWidth'](_0x511fee),_0x8a63da=RandomMaps['getLayoutHeight'](_0x511fee),_0x4e35f9=_0x1b721b(_0x1fd202['cutOffDeadEnds']),_0x827e4f=_0x1b721b(_0x1fd202['additionalTunnels']),_0x56a6e4=_0x1b721b(_0x1fd202['nDeadEnds']);if('Grid'==_0x3a8c81['layout'])return _0x5f28d6(_0x494efc,_0x8a63da);if('Maze'==_0x3a8c81['layout'])return _0x329d3b(_0x494efc,_0x8a63da,0x0,0x0);if('Road'==_0x3a8c81['layout'])return _0x3644b3(_0x494efc,_0x8a63da,_0x3a8c81['orientation'],_0x56a6e4);if('Imperfect\x20Maze'==_0x3a8c81['layout'])return _0x329d3b(_0x494efc,_0x8a63da,_0x4e35f9,_0x827e4f);RandomMaps['reject']('Invalid\x20Room\x20Layout:\x20\x22%1\x22'['format'](_0x511fee));}function _0x5f28d6(_0x509944,_0x449628){const _0x5ebf03=RandomMaps['createMatrix'](_0x509944,_0x449628,0xf);return RandomMaps['times'](_0x509944)['forEach'](_0x2c75af=>_0x5ebf03[_0x2c75af][0x0]=_0x5ebf03[_0x2c75af][0x0]&0xe),RandomMaps['times'](_0x509944)['forEach'](_0x56bef0=>_0x5ebf03[_0x56bef0][_0x449628-0x1]=_0x5ebf03[_0x56bef0][_0x449628-0x1]&0xb),RandomMaps['times'](_0x449628)['forEach'](_0xe97649=>_0x5ebf03[0x0][_0xe97649]=_0x5ebf03[0x0][_0xe97649]&0x7),RandomMaps['times'](_0x449628)['forEach'](_0x2c95a4=>_0x5ebf03[_0x509944-0x1][_0x2c95a4]=_0x5ebf03[_0x509944-0x1][_0x2c95a4]&0xd),_0x5ebf03;}function _0x329d3b(_0x1783c8,_0x683bb,_0x4ff651,_0x52e2ec){const _0x3f1089=MK['mazeAlgorithms']['prims'](_0x1783c8,_0x683bb);return MK['mazeAlgorithms']['cutOffDeadEnds'](_0x3f1089,_0x4ff651),MK['mazeAlgorithms']['additionalTunnels'](_0x3f1089,_0x52e2ec),_0x3f1089;}function _0x3644b3(_0xb918dd,_0x259cbb,_0x4cac46,_0x4ff8d5){const _0x2f8e1c=RandomMaps['createMatrix'](_0xb918dd,_0x259cbb,0x0),_0x612256=(_0x4d7db8,_0x57edf5)=>'horizontal'==_0x4cac46?_0x403b5c(_0x4d7db8,_0x57edf5):_0x2e1e0d(_0x4d7db8,_0x57edf5),_0x403b5c=(_0x46b61f,_0x305fbe)=>[_0x305fbe>0x0&&!_0x2f8e1c[_0x46b61f][_0x305fbe-0x1]&&'top','right',_0x305fbe<_0x259cbb-0x1&&!_0x2f8e1c[_0x46b61f][_0x305fbe+0x1]&&'bottom']['filter'](Boolean),_0x2e1e0d=(_0x2876f2,_0x2ca46d)=>[_0x2876f2>0x0&&!_0x2f8e1c[_0x2876f2-0x1][_0x2ca46d]&&'left','top',_0x2876f2<_0xb918dd-0x1&&!_0x2f8e1c[_0x2876f2+0x1][_0x2ca46d]&&'right']['filter'](Boolean),_0x25ca5d=_0x47ba8f=>{const _0x3456c8=_0x612256(_0x47ba8f['x'],_0x47ba8f['y']),_0x1aa3fd=MK['rng']['pickRandom'](_0x3456c8);MK['buildTunnelPair'](_0x2f8e1c,_0x47ba8f['x'],_0x47ba8f['y'],_0x1aa3fd);if('top'==_0x1aa3fd)return{'x':_0x47ba8f['x'],'y':_0x47ba8f['y']-0x1};if('left'==_0x1aa3fd)return{'x':_0x47ba8f['x']-0x1,'y':_0x47ba8f['y']};if('right'==_0x1aa3fd)return{'x':_0x47ba8f['x']+0x1,'y':_0x47ba8f['y']};if('bottom'==_0x1aa3fd)return{'x':_0x47ba8f['x'],'y':_0x47ba8f['y']+0x1};},_0x453656='horizontal'==_0x4cac46?{'x':0x0,'y':MK['rng']['randomInteger'](0x0,_0x259cbb-0x1)}:{'x':MK['rng']['randomInteger'](0x0,_0xb918dd-0x1),'y':_0x259cbb-0x1};let _0x21e76f=_0x25ca5d(_0x453656);while('horizontal'==_0x4cac46?_0x21e76f['x']<_0xb918dd-0x1:_0x21e76f['y']>0x0){_0x21e76f=_0x25ca5d(_0x21e76f);}return MK['mazeAlgorithms']['additionalTunnels'](_0x2f8e1c,_0x4ff8d5),_0x2f8e1c;}function _0x3fea73(_0x23d1ff,_0x514b52,_0x52b039){$gameMap['_metaMazeExits']={},_0x514b52['map'](_0x5ed7d8=>_0x5ed7d8['toLowerCase']())['forEach'](_0x38b27f=>{const _0x510ee7=_0x46cfc2(_0x23d1ff,_0x38b27f,_0x52b039),_0x566075=MK['rng']['pickRandom'](_0x510ee7),_0x559c6b=_0x566075['x'],_0x53531d=_0x566075['y'],_0x385cd7=_0x49868d(_0x38b27f);_0x23d1ff[_0x559c6b][_0x53531d]=_0x23d1ff[_0x559c6b][_0x53531d]|_0x385cd7,$gameMap['_metaMazeExits'][_0x38b27f]={'x':_0x559c6b,'y':_0x53531d};});}function _0x46cfc2(_0x57ae87,_0x23e2bf,_0x5b36b4){const _0x45e25a=_0x57ae87['length'],_0x3e3ac8=_0x57ae87[0x0]['length'];let _0x55943d;'top'==_0x23e2bf&&(_0x55943d=RandomMaps['times'](_0x45e25a)['map'](_0x4fdc6c=>({'x':_0x4fdc6c,'y':0x0})));'left'==_0x23e2bf&&(_0x55943d=RandomMaps['times'](_0x3e3ac8)['map'](_0x28531f=>({'x':0x0,'y':_0x28531f})));'right'==_0x23e2bf&&(_0x55943d=RandomMaps['times'](_0x3e3ac8)['map'](_0x4ef556=>({'x':_0x45e25a-0x1,'y':_0x4ef556})));'bottom'==_0x23e2bf&&(_0x55943d=RandomMaps['times'](_0x45e25a)['map'](_0x27d9e3=>({'x':_0x27d9e3,'y':_0x3e3ac8-0x1})));const _0x23a024=_0x55943d['length']>0x1?_0x55943d['filter'](({x:_0x4aa6ce,y:_0x1a25b2})=>_0x57ae87[_0x4aa6ce][_0x1a25b2]):_0x55943d;if(_0x5b36b4){const _0x1662ae=_0x43fe53(_0x23a024['map'](_0x4cbfde=>_0x4cbfde['x'])),_0x4edc2b=_0x43fe53(_0x23a024['map'](_0x55e35e=>_0x55e35e['y']));return _0x23a024['filter'](_0x26062f=>_0x26062f['x']==_0x1662ae&&_0x26062f['y']==_0x4edc2b);}return _0x23a024;}function _0x43fe53(_0x4c3bb6){return Math['floor'](_0x4c3bb6['reduce']((_0x4a038a,_0x43a80e)=>_0x4a038a+_0x43a80e,0x0)/_0x4c3bb6['length']);}function _0x49868d(_0x36b46d){return{'top':0x1,'right':0x2,'bottom':0x4,'left':0x8}[_0x36b46d];}RandomMaps['determineStartingRoom']=function(_0x302e4d,_0x2fe058,_0x29b3db){if(RandomMaps['isSingleRoom']())return{'x':0x0,'y':0x0};_0x2fe058&&!RandomMaps['existsRoom'](_0x2fe058['x'],_0x2fe058['y'])&&RandomMaps['reject']('Wanted\x20to\x20start\x20from\x20Room\x20(%1/%2)\x20but\x20this\x20Room\x20does\x20not\x20exist\x20in\x20current\x20Layout.'['format'](_0x2fe058['x'],_0x2fe058['y']));if(_0x2fe058)return _0x2fe058;const _0x2934a0=['top','left','right','bottom']['find'](_0x23290c=>_0x23290c==_0x302e4d);_0x2934a0&&!_0x29b3db[_0x2934a0]&&RandomMaps['reject']('Wanted\x20to\x20start\x20from\x20%1\x20but\x20current\x20Room\x20Layout\x20does\x20not\x20have\x20an\x20exit\x20here.'['format'](_0x2934a0));if(_0x2934a0)return _0x29b3db[_0x2934a0];RandomMaps['reject']('The\x20plugin\x20does\x20not\x20know\x20in\x20which\x20Room\x20to\x20start.\x20'+'Please\x20set\x20either\x20\x22enterFrom\x22\x20or\x20\x22startingRoom\x22,\x20or\x20set\x20roomLayout\x20to\x20\x22Single\x20Room\x22.');};}());
(function(){const _0xb12d2a=PluginManager['parameters']('MK_RNGMaps_Core'),_0x12de26=Number(_0xb12d2a['isRoomSolvedSwitchId'])||0x0,_0x4317e5=RandomMaps['setupMetaMaze'];RandomMaps['setupMetaMaze']=function(_0x65dde1,_0x4c25dc){_0x4317e5['apply'](this,arguments);const _0x499969=RandomMaps['getLayoutWidth'](_0x4c25dc),_0x264ba4=RandomMaps['getLayoutHeight'](_0x4c25dc);_0x32ddb9(_0x65dde1,_0x499969,_0x264ba4),_0x58838c(_0x65dde1,_0x499969,_0x264ba4);};function _0x32ddb9(_0x5072e1,_0xb2893f,_0x2a4d41){$gameMap['_metaMazeVisited']=_0x4e005f(_0x5072e1,_0xb2893f,_0x2a4d41,'_visitedMaps');}function _0x58838c(_0x386ab3,_0x133610,_0x390e9d){$gameMap['_metaMazeSolved']=_0x4e005f(_0x386ab3,_0x133610,_0x390e9d,'_solvedMaps');}function _0x4e005f(_0x161f89,_0x5a210d,_0x32acfd,_0x3003f1){const _0x2300f8='%1_%2'['format'](_0x161f89,RandomMaps['getUniqueDungeonIdentifier']());return $gameSystem[_0x3003f1]=$gameSystem[_0x3003f1]||{},$gameSystem[_0x3003f1][_0x2300f8]=$gameSystem[_0x3003f1][_0x2300f8]||RandomMaps['createMatrix'](_0x5a210d,_0x32acfd,initialValue=![]),$gameSystem[_0x3003f1][_0x2300f8];}const _0x2e2f1d=Game_Map['prototype']['setup'];Game_Map['prototype']['setup']=function(){_0x2e2f1d['apply'](this,arguments),RandomMaps['isInDungeon']()&&(_0x3f4319(),_0x134a6f());};function _0x3f4319(){const _0x33ddb8=RandomMaps['getNextRoomX'](),_0x9e1f67=RandomMaps['getNextRoomY'](),_0x33fe62=$gameMap['_metaMazeVisited'],_0x51f7c4=_0x33fe62&&_0x33fe62['length'],_0x20d6fb=_0x33fe62&&_0x33fe62[0x0]&&_0x33fe62[0x0]['length'];_0x33fe62&&0x0<=_0x33ddb8&&_0x33ddb8<_0x51f7c4&&0x0<=_0x9e1f67&&_0x9e1f67<_0x20d6fb&&(_0x33fe62[_0x33ddb8][_0x9e1f67]=!![]);}function _0x134a6f(){const _0x384996=RandomMaps['getNextRoomX'](),_0x5cf3a7=RandomMaps['getNextRoomY'](),_0xc18013=Boolean($gameMap['_metaMazeSolved']&&$gameMap['_metaMazeSolved'][_0x384996]&&$gameMap['_metaMazeSolved'][_0x384996][_0x5cf3a7]);_0x12de26&&$gameSwitches['setValue'](_0x12de26,_0xc18013);}const _0x3d6949=Game_Switches['prototype']['setValue'];Game_Switches['prototype']['setValue']=function(_0x2a0f25,_0x16016b){_0x12de26&&_0x12de26==_0x2a0f25&&RandomMaps['isInDungeon']()&&$gamePlayer['_nextRoomX']==undefined&&RandomMaps['solveRoom'](RandomMaps['getCurrentRoomX'](),RandomMaps['getCurrentRoomY'](),_0x16016b),_0x3d6949['call'](this,_0x2a0f25,_0x16016b);},RandomMaps['solveRoom']=function(_0x220260,_0x3c0603,_0x1a6c86){$gameMap['_metaMazeSolved']&&$gameMap['_metaMazeSolved'][_0x220260]&&($gameMap['_metaMazeSolved'][_0x220260][_0x3c0603]=_0x1a6c86);},RandomMaps['isRoomVisited']=function(_0x315fdb,_0x377597){return RandomMaps['existsRoom'](_0x315fdb,_0x377597)&&$gameMap['_metaMazeVisited'][_0x315fdb][_0x377597];};}());
(function(){const _0x4bd479=RandomMaps['setupMetaMaze'];RandomMaps['setupMetaMaze']=function(_0x513e3a,_0x2cb555){_0x4bd479['apply'](this,arguments);const _0x313b4b=RandomMaps['getLayout'](_0x2cb555),_0x5bd49e=_0x13e262(_0x313b4b),_0x5570cf=_0xa7b305(_0x313b4b);_0x2f3c90(_0x5bd49e['map'](_0x3fd4a6=>_0x3fd4a6['switchId']),_0x5570cf['map'](_0x5a7187=>_0x5a7187['switchId'])),_0x173463(_0x5bd49e,_0x5570cf['map'](_0x3fa02b=>_0x3fa02b['switchId']),RandomMaps['getNumberOfRoomsHorizontal'](),RandomMaps['getNumberOfRoomsVertical']()),_0x5deec2(_0x5bd49e,_0x5570cf);};function _0x2f3c90(_0x475fa3,_0x1546ee){$gameMap['_autoSwitchIds']=[],_0x475fa3['forEach'](_0x49c758=>{if(!$gameMap['_autoSwitchIds']['includes'](_0x49c758))$gameMap['_autoSwitchIds']['push'](_0x49c758);}),_0x1546ee['forEach'](_0xf345fc=>{if(!$gameMap['_autoSwitchIds']['includes'](_0xf345fc))$gameMap['_autoSwitchIds']['push'](_0xf345fc);});}function _0x173463(_0x3a93eb,_0x16267c,_0x36ee57,_0x40f1e1){const _0x8706a0=RandomMaps['createMatrix'](_0x36ee57,_0x40f1e1);_0x3a93eb['forEach'](({switchId:_0x3907fb,n:_0x50a6f8})=>{RandomMaps['times'](_0x50a6f8)['forEach'](()=>{const _0x55a89f=RandomMaps['iterateMatrix'](_0x36ee57,_0x40f1e1)['filter'](({x:_0x5f4e63,y:_0x242462})=>RandomMaps['existsRoom'](_0x5f4e63,_0x242462))['filter'](({x:_0x25e515,y:_0x5d3240})=>!_0x8706a0[_0x25e515][_0x5d3240]);if(_0x55a89f['length']){const _0x53cc7e=MK['rng']['pickRandom'](_0x55a89f);_0x8706a0[_0x53cc7e['x']][_0x53cc7e['y']]=_0x3907fb;}});});if(_0x16267c&&_0x16267c['length']){let _0x14c8a6=MK['rng']['randomInteger'](0x1,_0x16267c['length'])-0x1;while(!![]){const _0x51e601=RandomMaps['iterateMatrix'](_0x36ee57,_0x40f1e1)['filter'](({x:_0x344f4d,y:_0x4156d2})=>RandomMaps['existsRoom'](_0x344f4d,_0x4156d2))['filter'](({x:_0x11f752,y:_0x25ae4f})=>!_0x8706a0[_0x11f752][_0x25ae4f]);if(_0x51e601['length']){const _0x390dc7=_0x16267c[_0x14c8a6],_0x4ed8c2=MK['rng']['pickRandom'](_0x51e601);_0x8706a0[_0x4ed8c2['x']][_0x4ed8c2['y']]=_0x390dc7,_0x14c8a6=(_0x14c8a6+0x1)['mod'](_0x16267c['length']);}else break;}}$gameMap['_metaMazeAutoSwitchMap']=_0x8706a0;}const _0x58664a=RandomMaps['jumpToRoom'];RandomMaps['jumpToRoom']=function(_0xf8c9dc,_0x220aa9){_0x58664a['call'](this,_0xf8c9dc,_0x220aa9),_0x1d0f87(_0xf8c9dc,_0x220aa9);};function _0x1d0f87(_0x4c3052,_0x51a976){const _0x4bbd0c=_0x1c4d11(_0x4c3052,_0x51a976);$gameMap['_autoSwitchIds']&&$gameMap['_autoSwitchIds']['forEach'](_0x3e1469=>{$gameSwitches['setValue'](_0x3e1469,_0x3e1469&&_0x3e1469==_0x4bbd0c);});}function _0x1c4d11(_0x485c94,_0x1959c3){return $gameMap['_metaMazeAutoSwitchMap']&&$gameMap['_metaMazeAutoSwitchMap'][_0x485c94]&&$gameMap['_metaMazeAutoSwitchMap'][_0x485c94][_0x1959c3];}function _0x5deec2(_0x21142d,_0x16b209){RandomMaps['iterateMatrix'](RandomMaps['getNumberOfRoomsHorizontal'](),RandomMaps['getNumberOfRoomsVertical']())['filter'](({x:_0x3082cb,y:_0xf8c01e})=>!_0x5a911e(_0x21142d,_0x16b209,_0x3082cb,_0xf8c01e))['forEach'](({x:_0x138bc6,y:_0x4a00f5})=>RandomMaps['solveRoom'](_0x138bc6,_0x4a00f5,!![]));}function _0x5a911e(_0x2c9d38,_0x53b33e,_0x3fbbf6,_0x25da0e){const _0x36f5af=_0x1c4d11(_0x3fbbf6,_0x25da0e),_0x27da56=_0x2c9d38['find'](_0x48ffc4=>_0x48ffc4['switchId']==_0x36f5af),_0x419c51=_0x53b33e['find'](_0x3c4f01=>_0x3c4f01['switchId']==_0x36f5af);return _0x27da56&&_0x27da56['isPuzzle']||_0x419c51&&_0x419c51['isPuzzle'];}function _0x13e262(_0x5d895a){return _0x5d895a['requiredSwitchIds']&&JSON['parse'](_0x5d895a['requiredSwitchIds'])['map'](JSON['parse'])['map'](_0x4a8f24=>({'switchId':Number(_0x4a8f24['switchId'])||0x0,'n':Number(_0x4a8f24['n'])||0x0,'isPuzzle':'true'==_0x4a8f24['isPuzzle']}))||[];}function _0xa7b305(_0xcfcbea){return _0xcfcbea['regularSwitchIds']&&JSON['parse'](_0xcfcbea['regularSwitchIds'])['map'](JSON['parse'])['map'](_0x32e7c=>({'switchId':Number(_0x32e7c['switchId'])||0x0,'isPuzzle':'true'==_0x32e7c['isPuzzle']}))||[];}}());
(function(){const _0x169fd1='MK_RNGMaps_Core',_0x35da18=PluginManager['parameters'](_0x169fd1),_0x464663=RandomMaps['customFunction'](_0x35da18['isDungeonWideSwitchOrVariableFunction']),_0x2130e1=RandomMaps['customFunction'](_0x35da18['isRoomWideSwitchOrVariableFunction']),_0x500f80=Game_Switches['prototype']['value'];Game_Switches['prototype']['value']=function(_0x2f9adf){this['_rngSwitches']=this['_rngSwitches']||{};if(RandomMaps['isInDungeon']()&&_0x3c4328(_0x2f9adf)){const _0x4656f5=_0x365fc5(_0x2f9adf);return!!this['_rngSwitches'][_0x4656f5];}if(_0x3c4328(_0x2f9adf))return![];if(RandomMaps['isInDungeon']()&&_0xac7ebb(_0x2f9adf)){const _0x314c94=_0x24a7e1(_0x2f9adf);return!!this['_rngSwitches'][_0x314c94];}if(_0xac7ebb(_0x2f9adf))return![];return _0x500f80['call'](this,_0x2f9adf);};const _0x4ef5c3=Game_Switches['prototype']['setValue'];Game_Switches['prototype']['setValue']=function(_0x5df82c,_0x3d3008){this['_rngSwitches']=this['_rngSwitches']||{};if(RandomMaps['isInDungeon']()&&_0x3c4328(_0x5df82c)){const _0x7c511a=_0x365fc5(_0x5df82c);this['_rngSwitches'][_0x7c511a]=_0x3d3008;}if(RandomMaps['isInDungeon']()&&_0xac7ebb(_0x5df82c)){const _0x620010=_0x24a7e1(_0x5df82c);this['_rngSwitches'][_0x620010]=_0x3d3008;}_0x4ef5c3['call'](this,_0x5df82c,_0x3d3008);};const _0x5a030a=Game_Variables['prototype']['value'];Game_Variables['prototype']['value']=function(_0x5f4757){this['_rngVariables']=this['_rngVariables']||{};if(RandomMaps['isInDungeon']()&&_0x3087a4(_0x5f4757)){const _0x4eca9c=_0x365fc5(_0x5f4757);return this['_rngVariables'][_0x4eca9c]||0x0;}if(_0x3087a4(_0x5f4757))return 0x0;if(RandomMaps['isInDungeon']()&&_0x251a56(_0x5f4757)){const _0x499745=_0x24a7e1(_0x5f4757);return this['_rngVariables'][_0x499745]||0x0;}if(_0x251a56(_0x5f4757))return 0x0;return _0x5a030a['call'](this,_0x5f4757);};const _0x323895=Game_Variables['prototype']['setValue'];Game_Variables['prototype']['setValue']=function(_0x45da31,_0x1547fe){this['_rngVariables']=this['_rngVariables']||{};if(RandomMaps['isInDungeon']()&&_0x3087a4(_0x45da31)){const _0x6b306=_0x365fc5(_0x45da31);this['_rngVariables'][_0x6b306]=_0x1547fe;}if(RandomMaps['isInDungeon']()&&_0x251a56(_0x45da31)){const _0x24016a=_0x24a7e1(_0x45da31);this['_rngVariables'][_0x24016a]=_0x1547fe;}_0x323895['call'](this,_0x45da31,_0x1547fe);};function _0x3c4328(_0x75828a){const _0x5c0a16=_0x23c69b(_0x75828a);return _0x5c0a16&&_0x464663&&_0x464663(_0x5c0a16);}function _0xac7ebb(_0x162af4){const _0x59f559=_0x23c69b(_0x162af4);return _0x59f559&&_0x2130e1&&_0x2130e1(_0x59f559);}function _0x3087a4(_0x3790f5){const _0x57c63b=_0x1adbac(_0x3790f5);return _0x57c63b&&_0x464663&&_0x464663(_0x57c63b);}function _0x251a56(_0x5fd72b){const _0x47f971=_0x1adbac(_0x5fd72b);return _0x47f971&&_0x2130e1&&_0x2130e1(_0x47f971);}function _0x23c69b(_0xe518f){return $dataSystem['switches'][_0xe518f];}function _0x1adbac(_0x38e2f5){return $dataSystem['variables'][_0x38e2f5];}function _0x365fc5(_0x1c6d49){return'%1_%2-%3'['format'](_0x1c6d49,MapInjection['getOriginalMapId']($gameMap['mapId']()),RandomMaps['getUniqueDungeonIdentifier']());}function _0x24a7e1(_0x37cc12){return'%1_%2'['format'](_0x37cc12,$gameMap['mapId']());}}());
(function(){const _0x3aea63=RandomMaps['generate'];RandomMaps['generate']=function(_0xe4ea86){$gameSystem['rngCommandArgs']=_0xe4ea86,_0x3aea63['apply'](this,arguments);};function _0x1788d3(){return $gameSystem['rngCommandArgs'];}function _0x17bb87(){return $gameSystem['memorizedRngCommandArgs'];}function _0x41c375(){$gameSystem['memorizedRngCommandArgs']={'settings':JsonEx['makeDeepCopy']($gameSystem['rngCommandArgs']),'seed':$gameMap['_metaMazeSeed'],'xRoom':RandomMaps['getCurrentRoomX'](),'yRoom':RandomMaps['getCurrentRoomY'](),'xPlayer':$gamePlayer['x'],'yPlayer':$gamePlayer['y']};}RandomMaps['hasSavepoint']=function(){return!!_0x17bb87();},RandomMaps['makeSavepoint']=function(){_0x1788d3()&&_0x41c375();},RandomMaps['clearSavepoint']=function(){$gameSystem['memorizedRngCommandArgs']=null;},RandomMaps['returnToSavepoint']=function(){const _0x163552=_0x17bb87();if(_0x163552){const _0x434362=JsonEx['makeDeepCopy'](_0x163552['settings']);_0x434362['startingRoom']={'x':_0x163552['xRoom'],'y':_0x163552['yRoom']},_0x434362['spawnAt']={'x':_0x163552['xPlayer'],'y':_0x163552['yPlayer']},_0x434362['seed']=_0x163552['seed'],RandomMaps['generate'](_0x434362);}};}());