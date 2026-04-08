/*:
 * @author Casper Gaming
 * @url https://www.caspergaming.com/plugins/cgmz/questsystem/
 * @target MZ
 * @base CGMZ_Core
 * @orderAfter CGMZ_Core
 * @plugindesc Creates and manages quests
 * @help
 * ============================================================================
 * For terms and conditions using this plugin in your game please visit:
 * https://www.caspergaming.com/terms-of-use/
 * ============================================================================
 * Become a Patron to get access to beta/alpha plugins plus other goodies!
 * https://www.patreon.com/CasperGamingRPGM
 * ============================================================================
 * Version: Alpha R15
 * ----------------------------------------------------------------------------
 * Compatibility: Only tested with my CGMZ plugins.
 * Made for RPG Maker MZ 1.10.0
 * ----------------------------------------------------------------------------
 * Description: This plugin adds a powerful quest system to your game. It
 * can handle automatic or manual tracking of quest progress, multiple quest
 * categories which can be sorted, and pinning quests to the top of the list.
 * The player can choose to accept / decline quests, and can track quests.
 * ----------------------------------------------------------------------------
 * Documentation:
 * ------------------------------Alpha Notes-----------------------------------
 * This plugin is in *ALPHA* stage, which means it is not feature complete.
 * I plan to add the following features before it reaches *BETA* stage:
 * 1) Integrations for other CGMZ plugins
 * 2) Tracking for additional objective types (monsters, etc)
 *
 * Want additional features not already present/listed above? Make suggestions
 * on the Patreon Post or in my discord under the #suggestions channel!
 * https://discord.gg/Gbx7JXP
 * ---------------------------Assumptions--------------------------------------
 * This plugin makes the following assumptions:
 * 1) A quest cannot be both completed AND failed
 * 2) A quest's name is UNIQUE
 * 3) A category's name is UNIQUE
 *
 * Make sure you follow these assumptions when setting up parameters.
 * --------------------------Resource Specs------------------------------------
 * The list window image should be 72 x 72 px
 * The background image should be 460px x 108px if using default resolution
 * ---------------------------Quest Stages-------------------------------------
 * Quests are structured by "stages" which determine where the player is
 * in the overall quest. If the player is on stage 2, then they will need to
 * complete all objectives for stage 2 before the plugin will advance them
 * to stage 3. This process is automatic, but you can advance stages manually
 * before all objectives of a stage have been completed if you wish.
 * ---------------------------Descriptions-------------------------------------
 * Quest descriptions are set up as a list of descriptions, with the first
 * in the list corresponding to the description that will be shown for the
 * first stage of the quest. Once you advance to the next stage, the next
 * description in the list will be used. If a stage does not have a
 * description, the last description in the list will be used.
 * ----------------------------Objectives--------------------------------------
 * Each automatic tracking objective can only track one of the available
 * categories. If you want to track both gold and an item, you will need to
 * make two objectives with one for gold and one for the item.
 *
 * When an objective is automatically tracked, it will potentially auto
 * complete the entire quest if the automatic tracked objective is last needed
 * objective of the last stage. Make sure you have a manual objective last if
 * you want the quest to need to be turned in to a specific NPC.
 *
 * If there are no objectives for a given stage, this plugin assumes that
 * the quest is complete at that point and automatically completes the quest.
 *
 * Once an objective has been completed, it will be saved as completed and
 * will NOT automatically become incomplete if the player no longer meets the
 * requirements of the objective. You can manually set an objective to
 * incomplete if you wish.
 *
 * Objective IDs just need to be unique for each quest. You can re-use the
 * ID in separate quests.
 * -----------------------------Rewards----------------------------------------
 * This plugin will automatically award the gold, items/weapons/armors, and
 * experience rewards. You will need to manually award any custom rewards.
 * ----------------------Drag and Drop Sorting---------------------------------
 * Categories are sorted in the order they are listed in the Category Sort
 * Order list. If you want a certain location to appear above another location,
 * make sure the category is listed in the correct order.
 *
 * Sort options are sorted in the order they are listed in the Sort Options
 * parameter. You can change the order or which options are available to sort
 * by here by either dragging and dropping or deleting sort types.
 * ---------------------------Date Formats-------------------------------------
 * The following numbers correspond to the following date formats:
 * 0-2: Day / Month / Year are numeric
 * 3-4: Day and Year numeric, Month long string
 * 5-6: Day and Year numeric, Month short string
 * 7-8: Day and Month numeric, no Year
 *
 * These will be according to the user's locale (or the forced locale as set
 * in CGMZ Core). For example, USA may see March 22, 2024 while Mexico may see
 * 22 de marzo de 2024. This helps your users see dates that make sense to
 * them.
 * ---------------------------Script Calls-------------------------------------
 * To call the quest scene via JS, use:
 * SceneManager.push(CGMZ_Scene_QuestSystem);
 * -----------------------------Option-----------------------------------------
 * The quest tracker can obey an option from the Options scene. To access this,
 * you will need a plugin such as [CGMZ] Options that can create custom
 * options. There are likely other options plugins out there as well.
 *
 * When creating your custom option, set the symbol parameter to:
 * cgmz_questTracker
 * making sure your capitalization matches as well.
 *
 * This should be a simple on/off option. When set to true, it will allow the
 * quest tracker to display if other conditions are also met. When set to
 * false, it will prevent the quest tracker from displaying.
 * -------------------------Plugin Commands------------------------------------
 * This plugin supports the following Plugin Commands:
 * • Call Scene
 * Calls the Quest Log scene which displays discovered quests
 *
 * • Call Accept Scene
 * Calls the scene for accepting a single quest
 *
 * • Call Quest Board Scene
 * Calls the scene for accepting multiple quests
 *
 * • Set Objective Progress
 * Change the progress of an objective that is not being automatically
 * tracked.
 *
 * • Advance Quest Stage
 * Forcibly advances the quest's stage by 1.
 *
 * • Get Quest Stage
 * Puts the current stage of the quest into a variable
 *
 * • Get Quest Status
 * Sets a variable to number based on quest discover/start/completion/fail
 * status.
 * 0 = undiscovered
 * 1 = discovered
 * 2 = started
 * 3 = failed
 * 4 = completed
 *
 * • Discover Quest
 * Discovers the quest but does not start it.
 *
 * • Start Quest
 * Starts the quest. Optionally also discovers it.
 *
 * • Complete Quest
 * Marks a quest as completed.
 *
 * • Fail Quest
 * Marks a quest as failed.
 *
 * • Reset Quest
 * Resets a quest as if the player has not yet started / discovered it. You
 * can optionally cause this to only reset the quest if the quest is finished,
 * which means failed / completed.
 *
 * • Change Pin Status
 * Change the pin status of a quest, either pinning it, unpinning it, or
 * toggling the pin status (if pinned, will become unpinned; if unpinned, will
 * become pinned).
 *
 * • Get Statistic
 * Get a quest system statistic such as amount of quests completed, failed,
 * started, or objectives completed.
 * ------------------------------Integrations----------------------------------
 * This plugin has special functionality when used with certain other CGMZ
 * plugins:
 *
 * [CGMZ] Toast Manager
 * You can show toasts for quest completion, start, objectives, and more.
 * These are windows that display briefly that tell the player some useful but
 * short info and then disappear. You can use the text code %questname which
 * will be replaced by the quest's name in the toast.
 *
 * [CGMZ] Infinite Colors
 * If you would like to use custom colors not present on the windowskin for
 * your quests, you can set the custom color up via [CGMZ] Infinite Colors
 * and then input the color id into the color parameter. To do so, click
 * the text tab to turn the color parameter into a text field instead of the 
 * built-in color select ui which is limited to windowskin colors.
 *
 * [CGMZ] Scene Backgrounds
 * Set up a scene background preset and then enter the preset id into the
 * background image parameters here. This allows you to have a lot more
 * options when setting up your background image, including scrolling
 * backgrounds.
 *
 * [CGMZ] Controls Window
 * Set up a controls window preset and then enter the preset id into the
 * controls window parameter here. This allows you to easily show keyboard or
 * gamepad controls for the Profession scene, depending on player's last input
 * type.
 *
 * [CGMZ] Window Settings
 * Control any window's windowskin, tone, style, etc. including all of the
 * Quest windows.
 *
 * [CGMZ] Window Backgrounds
 * Add an image as a window background, including scrolling parallax images,
 * to any quest system window.
 *
 * [CGMZ] Drop Tables
 * Give the player rewards from a table of items, with different odds of each 
 * reward. Can help increase randomness in your quest rewards.
 *
 * [CGMZ] Rumble
 * Rumble the controller when a quest is completed or failed. You can have
 * different rumble settings for failing or completing a quest.
 * ---------------------------Saved Games--------------------------------------
 * This plugin partially supports saved games. You should be able to add this
 * plugin to a saved game and have it show up with your quests. Other saved
 * game functionality may/may not work as the plugin is still in alpha. Please
 * do your testing with new games, and if issue arises with specifically a
 * saved game only bring the issue to my attention.
 * ----------------------------Required Plugin---------------------------------
 * Please note that all [CGMZ] plugins require [CGMZ] Core to be installed
 * above them in the plugin manager. You can download it from my website:
 * https://www.caspergaming.com/plugins/cgmz/core/
 * -----------------------------Filename---------------------------------------
 * The filename of this plugin's JavaScript file MUST be CGMZ_QuestSystem.js
 * This is what it comes as when downloaded. The filename is used to load
 * parameters and execute plugin commands. If you change it, things will begin
 * behaving incorrectly and your game will probably crash. Please do not
 * rename the js file.
 * --------------------------Latest Version------------------------------------
 * Hi all, this latest version adds the option to automatically remove any
 * automatic objectives' requirements when the objective is completed. Note
 * that this only works for automatically tracked objectives. This is a new
 * setting you can set to true or false when creating your objectives.
 *
 * This version also adds an integration with [CGMZ] Rumble so you can now
 * rumble the controller whenever a quest is completed or failed. You can set
 * up different rumble settings for both scenarios.
 * 
 * Version Alpha R15
 * - Added option to automatically remove required items if objective complete
 * - Added [CGMZ] Rumble integration
 * 
 * @command Call Scene
 * @desc Calls the Quest scene
 * 
 * @command Call Accept Scene
 * @desc Calls the scene to accept / decline a quest
 *
 * @arg Quest Name
 * @desc The name of the quest to accept / decline
 *
 * @arg Decision Switch
 * @type switch
 * @default 0
 * @desc Sets the given switch to true (if accepted) and false (if declined / cancel)
 *
 * @arg SE
 * @type struct<SoundEffect>
 * @default {"Name":"","Volume":"90","Pitch":"100","Pan":"0"}
 * @desc Sound effect to play on quest accept
 *
 * @arg Disable Decline
 * @type boolean
 * @default false
 * @desc If false, the player will be forced to accept this quest inside the accept scene
 * 
 * @command Call Quest Board Scene
 * @desc Calls the scene to show a quest board where players can choose from provided quests
 *
 * @arg Window Name
 * @default Quest Board
 * @desc Text to display in a window at the top of the scene. Blank = no window
 *
 * @arg Quest Names
 * @type text[]
 * @desc The name of the quests to offer on the quest board
 *
 * @arg Scene Background
 * @desc [CGMZ] Scene Background preset id to use for the scene background
 *
 * @arg Category Icon Type
 * @desc The category type to display icons for (leave blank for no icons)
 *
 * @arg Show Legend
 * @type boolean
 * @default false
 * @desc Determines if a legend window appears to explain the category icons shown. No effect if no category icon type.
 *
 * @arg Exit After Accept
 * @type boolean
 * @default false
 * @desc If true, the quest board scene will automatically exit after a quest has been accepted within it
 *
 * @arg SE
 * @type struct<SoundEffect>
 * @default {"Name":"","Volume":"90","Pitch":"100","Pan":"0"}
 * @desc Sound effect to play on quest accept
 * 
 * @command Set Objective Progress
 * @desc Set an objective's progress
 *
 * @arg Quest Name
 * @desc The name of the quest to change objective status
 *
 * @arg id
 * @desc The objective id to change
 *
 * @arg mode
 * @type select
 * @option +
 * @option -
 * @option =
 * @desc Whether to add, subtract, or set
 *
 * @arg amount
 * @type number
 * @default 0
 * @desc The amount to change
 *
 * @arg variable
 * @type variable
 * @default 0
 * @desc Change amount by variable
 * 
 * @command Advance Quest Stage
 * @desc Advance a quest's stage by one
 *
 * @arg Quest Name
 * @desc The name of the quest to change stage of
 * 
 * @command Get Quest Stage
 * @desc Check the stage of the given quest
 *
 * @arg Quest Name
 * @desc The name of the quest to check
 * 
 * @arg Variable ID
 * @type variable
 * @default 0
 * @desc Variable to set to quest stage
 * 
 * @command Get Quest Objective
 * @desc Check the objective progress of the given objective
 *
 * @arg Quest Name
 * @desc The name of the quest to check
 *
 * @arg Objective
 * @desc The name of the objective to check
 * 
 * @arg Variable ID
 * @type variable
 * @default 0
 * @desc Variable to set to objective progress
 * 
 * @command Get Quest Status
 * @desc Check the status of the given quest
 *
 * @arg Quest Name
 * @desc The name of the quest to check
 * 
 * @arg Variable ID
 * @type variable
 * @default 0
 * @desc Sets variable to quest status, see documentation.
 * 
 * @command Discover Quest
 * @desc Discover (or undiscover) a quest
 *
 * @arg Quest Name
 * @desc The name of the quest to change discovered status
 *
 * @arg Discover
 * @type boolean
 * @default true
 * @desc Set quest to discovered or undiscovered
 * 
 * @command Start Quest
 * @desc Start (or unstart) a quest
 *
 * @arg Quest Name
 * @desc The name of the quest to change started status
 *
 * @arg Start
 * @type boolean
 * @default true
 * @desc Set quest to started or unstarted.
 *
 * @arg Discover
 * @type boolean
 * @default true
 * @desc Also discover the quest?
 * 
 * @command Complete Quest
 * @desc Complete a quest. This will also advance the quest stage to the last stage.
 *
 * @arg Quest Name
 * @desc The name of the quest to change completion status
 * 
 * @command Fail Quest
 * @desc Fail a quest
 *
 * @arg Quest Name
 * @desc The name of the quest to change failed status
 * 
 * @command Reset Quest
 * @desc Resets a quest, so it can be completed again.
 *
 * @arg Quest Name
 * @desc The name of the quest to reset
 *
 * @arg Finished Only
 * @type boolean
 * @default true
 * @desc If true, this plugin command will only work if the quest is finished (failed or completed)
 * 
 * @command Change Pin Status
 * @desc Change Pin Status of a quest
 *
 * @arg Quest Name
 * @desc The name of the quest to change pinned status
 *
 * @arg Status
 * @type select
 * @option Pin
 * @option Unpin
 * @option Toggle
 * @default Pin
 * @desc Pin, unpin, or toggle pinned status for a quest.
 * 
 * @command Get Statistic
 * @desc Get a quest system statistic
 *
 * @arg Statistic
 * @type select
 * @option Completed
 * @option Failed
 * @option Started
 * @option Objectives Completed
 * @default Completed
 * @desc The statistic to get
 *
 * @arg Variable
 * @type variable
 * @default 0
 * @desc The game variable to store the statistic in
 *
 * @param Quests
 * @type struct<Quest>[]
 * @desc Set up quests here
 * @default []
 *
 * @param Categories
 * @type struct<QuestCategory>[]
 * @desc Set up quest categories here
 * @default []
 *
 * @param Quest Options
 *
 * @param Objective Complete Icon
 * @parent Quest Options
 * @type icon
 * @default 164
 * @desc The icon to show in the check box next to the objective if completed.
 *
 * @param Objective Failed Icon
 * @parent Quest Options
 * @type icon
 * @default 162
 * @desc The icon to show in the check box next to the objective if failed.
 *
 * @param Recommend Level Options
 *
 * @param List Show Rec Level
 * @parent Recommend Level Options
 * @type boolean
 * @default true
 * @desc Show the recommended level for the quest in the list window?
 *
 * @param Rec Level Positive Colors
 * @parent Recommend Level Options
 * @type color[]
 * @default ["6", "21", "20", "2", "10"]
 * @desc Colors to use for recommended level if higher than average party level
 *
 * @param Rec Level Equal Color
 * @parent Recommend Level Options
 * @type color
 * @default 0
 * @desc Color to use for recommended level if equal to average party level
 *
 * @param Rec Level Negative Colors
 * @parent Recommend Level Options
 * @type color[]
 * @default ["24", "29", "3", "11", "28"]
 * @desc Colors to use for recommended level if lower than average party level
 *
 * @param Completed Quests
 *
 * @param Separate Complete Quests
 * @parent Completed Quests
 * @type boolean
 * @desc Create a separate category for completed quests at bottom of scene?
 * @default true
 *
 * @param Always Show Complete Category
 * @parent Completed Quests
 * @type boolean
 * @desc Show the completed category even if 0 quests are completed?
 * @default true
 *
 * @param Completed Category
 * @parent Completed Quests
 * @type struct<QuestCategory>
 * @desc Set up the Completed Category here
 * @default {"Name":"Completed","Type":"Category","Display Name":"Completed","Description":"These are all of the quests you have \\c[3]completed\\c[0]!","Color1":"rgba(24, 171, 109, 1)","Color2":"rgba(31, 107, 75, 0.5)","Text Color":"11","Start Expanded":"true"}
 *
 * @param Failed Quests
 *
 * @param Separate Failed Quests
 * @parent Failed Quests
 * @type boolean
 * @desc Create a separate category for failed quests at bottom of scene?
 * @default true
 *
 * @param Always Show Failed Category
 * @parent Failed Quests
 * @type boolean
 * @desc Show the failed category even if 0 quests are failed?
 * @default true
 *
 * @param Failed Category
 * @parent Failed Quests
 * @type struct<QuestCategory>
 * @desc Set up the Failed Category here
 * @default {"Name":"Failed","Type":"Category","Display Name":"Failed","Description":"These are all of the quests that you have \\c[2]failed\\c[0]!","Color1":"rgba(110, 43, 29, 1)","Color2":"rgba(191, 49, 19, 0.5)","Text Color":"10","Start Expanded":"true"}
 *
 * @param Pinned Quests
 *
 * @param Allow Pinned Quests
 * @parent Pinned Quests
 * @type boolean
 * @desc Allow the player to pin / unpin quests?
 * @default true
 *
 * @param Always Show Pinned Category
 * @parent Pinned Quests
 * @type boolean
 * @desc Show the pinned category even if 0 quests are pinned?
 * @default true
 *
 * @param Unpin on Complete
 * @parent Pinned Quests
 * @type boolean
 * @desc Automatically unpin the quest when it is completed?
 * @default true
 *
 * @param Unpin on Fail
 * @parent Pinned Quests
 * @type boolean
 * @desc Automatically unpin the quest when it is failed?
 * @default true
 *
 * @param Allow Fail Pins
 * @parent Pinned Quests
 * @type boolean
 * @desc If true, the player can manually pin failed quests
 * @default false
 *
 * @param Allow Complete Pins
 * @parent Pinned Quests
 * @type boolean
 * @desc If true, the player can manually pin completed quests
 * @default false
 *
 * @param Pinned Category
 * @parent Pinned Quests
 * @type struct<QuestCategory>
 * @desc Set up the Pinned Category here
 * @default {"Name":"Pinned","Type":"Category","Display Name":"Pinned","Description":"Quests shown here have been pinned. To pin or unpin a quest, select the quest in the list then press OK to bring up the pin menu.","Color1":"rgba(142, 56, 217, 0.5)","Color2":"rgba(104, 47, 153, 0.5)","Text Color":"0","Start Expanded":"true"}
 *
 * @param Tracker Options
 *
 * @param Show Tracked Quests
 * @parent Tracker Options
 * @type boolean
 * @desc If true, will show a quest tracker window on the map scene
 * @default true
 *
 * @param Tracker Block Touch Input
 * @parent Tracker Options
 * @type boolean
 * @desc If true, clicking over the tracker window will prevent touch input from moving the player
 * @default false
 *
 * @param Max Tracked Quests
 * @parent Tracker Options
 * @type number
 * @desc Maximum amount of tracked quests to draw even if more are tracked, 0 = no maximum
 * @default 5
 *
 * @param Quest Tracker Height
 * @parent Tracker Options
 * @type number
 * @desc Maximum height (in pixels) to take up for the quest tracker window
 * @default 400
 *
 * @param Quest Tracker Width
 * @parent Tracker Options
 * @type number
 * @desc Width of the quest tracker window
 * @default 360
 *
 * @param Quest Tracker X
 * @parent Tracker Options
 * @type number
 * @desc X of the quest tracker window
 * @default 448
 *
 * @param Quest Tracker Y
 * @parent Tracker Options
 * @type number
 * @desc Y of the quest tracker window
 * @default 52
 *
 * @param Quest Tracker Update Interval
 * @parent Tracker Options
 * @type number
 * @min 1
 * @desc Minimum frames between quest tracker window update
 * @default 30
 *
 * @param Quest Tracker Name Font Size
 * @parent Tracker Options
 * @type number
 * @min 0
 * @desc Font Size for quest names (set to 0 to use default)
 * @default 0
 *
 * @param Quest Tracker Objective Font Size
 * @parent Tracker Options
 * @type number
 * @min 0
 * @desc Font Size for quest objectives (set to 0 to use default)
 * @default 0
 *
 * @param Quest Tracker Spacing
 * @parent Tracker Options
 * @type number
 * @min 0
 * @desc Spacing (in pixels) between each quest
 * @default 6
 *
 * @param Auto Hide Tracker
 * @parent Tracker Options
 * @type boolean
 * @desc Hide the quest tracker window when message is displaying?
 * @default true
 *
 * @param Tracker Switch
 * @parent Tracker Options
 * @type switch
 * @desc If set, the tracker will not display while the switch is OFF.
 * @default 0
 *
 * @param Scene Options
 *
 * @param Draw Category Info
 * @parent Scene Options
 * @type boolean
 * @desc Whether the display window should draw info about the category
 * @default true
 *
 * @param Quest Info Order
 * @parent Scene Options
 * @type select[]
 * @option Divider - Info
 * @option Completion Date
 * @option Type
 * @option Difficulty
 * @option Length
 * @option Location
 * @option Quest Giver
 * @option Recommended Level
 * @option Missable
 * @option Divider - Description
 * @option Description
 * @option Divider - Objectives
 * @option Objectives
 * @option Divider - Rewards
 * @option Rewards
 * @option Blank Line
 * @option Custom Space
 * @desc The categories to allow sorting by
 * @default ["Divider - Info","Completion Date","Type","Difficulty","Length","Location","Quest Giver","Recommended Level","Divider - Description","Description","Divider - Objectives","Objectives","Divider - Rewards","Rewards"]
 *
 * @param Custom Space
 * @parent Scene Options
 * @type number
 * @desc Custom amount of blank vertical space to leave when the Custom Space display option is encountered
 * @default 6
 *
 * @param Allow Sorting
 * @parent Scene Options
 * @type boolean
 * @desc Whether the player should be able to sort the quests by different category types or not
 * @default true
 *
 * @param Sort Options
 * @parent Scene Options
 * @type select[]
 * @option Category
 * @option Difficulty
 * @option Length
 * @option Location
 * @desc The categories to allow sorting by
 * @default ["Category","Difficulty","Length","Location"]
 *
 * @param Sort Options Text
 * @parent Scene Options
 * @type text[]
 * @desc The text displayed for the categories (in the same order as Sort Options)
 * @default ["Category","Difficulty","Length","Location"]
 *
 * @param Sort Key
 * @parent Scene Options
 * @default s
 * @desc Key that will trigger the sort process while list window is active
 *
 * @param Show Sort Button
 * @parent Scene Options
 * @type boolean
 * @desc Whether to show a sort button for Touch UI next to cancel button
 * @default true
 *
 * @param Sort Button Offset
 * @parent Scene Options
 * @type number
 * @min 0
 * @default 11
 * @desc Sort Button index on the button sheet
 *
 * @param Sort Button Width
 * @parent Scene Options
 * @type number
 * @min 1
 * @default 1
 * @desc Sort Button width (in multiple of 48 pixels)
 *
 * @param Category Sort Order
 * @parent Scene Options
 * @type text[]
 * @desc Type category names here, and the order listed will be the same order in scene
 * @default []
 *
 * @param Always Show Past Objectives
 * @parent Scene Options
 * @type boolean
 * @desc Whether to show previous quest stage objectives always (if false, only after completion)
 * @default true
 *
 * @param Date Format
 * @parent Scene Options
 * @type number
 * @min 0
 * @max 8
 * @desc Number specifying completion date format. See documentation for help. Valid Range: 0-8
 * @default 0
 *
 * @param Divider Lines
 * @parent Scene Options
 * @type boolean
 * @desc Whether to draw the horizontal lines in divider elements
 * @default true
 *
 * @param Divider Padding
 * @parent Scene Options
 * @type number
 * @min -1
 * @desc Divider element padding, set to -1 for default
 * @default -1
 *
 * @param Fade Sprite Opacity
 * @parent Scene Options
 * @type number
 * @min 0
 * @max 255
 * @desc Opacity to make the black rectangle behind quest name above quest image
 * @default 100
 *
 * @param ScrollSpeed
 * @parent Scene Options
 * @type number
 * @min 0
 * @desc speed at which the quest display window scrolls (if needed)
 * @default 1
 *
 * @param ScrollWait
 * @parent Scene Options
 * @type number
 * @min 0
 * @desc amount of time (in frames) to wait before beginning to scroll
 * @default 300
 *
 * @param Scroll Deceleration
 * @parent Scene Options
 * @type number
 * @min 0.01
 * @max 0.99
 * @decimals 2
 * @desc Rate of deceleration after letting go of touch
 * @default 0.92
 *
 * @param Auto Scroll
 * @parent Scene Options
 * @type boolean
 * @desc Determine if the display window should automatically scroll after so long of no user input
 * @default true
 *
 * @param Disable Touch UI Space
 * @parent Scene Options
 * @type boolean
 * @desc If true, will not leave space for Touch UI buttons if Touch UI is disabled
 * @default false
 *
 * @param Accept From Quest Log
 * @parent Scene Options
 * @type boolean
 * @desc Allow the player to accept unstarted but discovered quests from the quest log scene?
 * @default false
 *
 * @param Complete Objectives With Quest
 * @parent Scene Options
 * @type boolean
 * @desc If true, the quest log will always draw the complete objective icon if the quest is completed
 * @default false
 *
 * @param Allow Cancel In Accept Scene
 * @parent Scene Options
 * @type boolean
 * @desc If true, the player will be able to cancel out of the quest accept scene (in addition to accept or decline quest)
 * @default true
 *
 * @param Always Show Gold Reward
 * @parent Scene Options
 * @type boolean
 * @desc If true, the gold reward will be drawn even if it is 0
 * @default false
 *
 * @param Always Show Exp Reward
 * @parent Scene Options
 * @type boolean
 * @desc If true, the exp reward will be drawn even if it is 0
 * @default false
 *
 * @param Draw Icon In List
 * @parent Scene Options
 * @type boolean
 * @desc If true, will attempt to draw category icon in list window
 * @default true
 *
 * @param List Window Width
 * @parent Scene Options
 * @type number
 * @min 0
 * @max 100
 * @desc Width as screen % of the quest list window
 * @default 40
 *
 * @param List Window Right
 * @parent Scene Options
 * @type boolean
 * @desc If true, will display the quest list window on the right side of the screen
 * @default false
 *
 * @param List Window Entry Height
 * @parent Scene Options
 * @type number
 * @min 1
 * @desc Amount of lines tall to make list window entry lines
 * @default 2
 *
 * @param Reverse Objective Order
 * @parent Scene Options
 * @type boolean
 * @desc If true, objective order will be reversed
 * @default false
 *
 * @param Quest Board Options
 *
 * @param Board Columns
 * @parent Quest Board Options
 * @type number
 * @desc Number of columns to display in the quest board window
 * @default 2
 *
 * @param Mechanics
 *
 * @param Quest Accept Scene Discovers
 * @parent Mechanics
 * @type boolean
 * @desc If true, seeing the quest in the Quest Accept Scene will mark the quest as discovered
 * @default true
 *
 * @param Text Options
 *
 * @param Label Text Color
 * @parent Text Options
 * @type color
 * @default 1
 * @desc The color of the label text
 *
 * @param Updated Text Color
 * @parent Text Options
 * @type color
 * @desc Color to display the updated text in if the quest has been updated since last view
 * @default 14
 *
 * @param Header Gradient Color 1
 * @parent Text Options
 * @type color
 * @default 0
 * @desc The first color for the header line gradient color
 *
 * @param Header Gradient Color 2
 * @parent Text Options
 * @type color
 * @default 1
 * @desc The second color for the header line gradient color
 *
 * @param Updated Text
 * @parent Text Options
 * @desc Text to show when a quest has been updated (on list window)
 * @default !
 *
 * @param Sort Info Text
 * @parent Text Options
 * @desc Text to describe how to sort
 * @default S Key / Sort Icon: Sort
 *
 * @param Pin Text
 * @parent Text Options
 * @desc Text to describe the pin action
 * @default Pin
 *
 * @param Unpin Text
 * @parent Text Options
 * @desc Text to describe the unpin action
 * @default Unpin
 *
 * @param Accept Log Title Text
 * @parent Text Options
 * @desc Text to show above the options to accept a quest from the quest log scene
 * @default Start Quest?
 *
 * @param Cancel Text
 * @parent Text Options
 * @desc Text to describe the cancel action
 * @default Cancel
 *
 * @param Yes Text
 * @parent Text Options
 * @desc Text used to represent the word yes, such as if a quest is missable.
 * @default Yes
 *
 * @param No Text
 * @parent Text Options
 * @desc Text used to represent the word no, such as if a quest is missable.
 * @default No
 *
 * @param Completion Text
 * @parent Text Options
 * @desc Text used in the label for the completion date on completed quests
 * @default Completed:
 *
 * @param Category Text
 * @parent Text Options
 * @desc Text used in the label for the category of a quest
 * @default Type:
 *
 * @param Difficulty Text
 * @parent Text Options
 * @desc Text used in the label for the difficulty of a quest
 * @default Difficulty:
 *
 * @param Length Text
 * @parent Text Options
 * @desc Text used in the label for the length of a quest
 * @default Length:
 *
 * @param Location Text
 * @parent Text Options
 * @desc Text used in the label for the location of a quest
 * @default Location:
 *
 * @param Quest Giver Text
 * @parent Text Options
 * @desc Text used in the label for the quest giver of a quest
 * @default Quest Giver:
 *
 * @param Recommended Level Text
 * @parent Text Options
 * @desc Text used in the label for the recommended level of a quest
 * @default Recommended Level:
 *
 * @param Missable Text
 * @parent Text Options
 * @desc Text used in the label for the missable flag
 * @default Missable:
 *
 * @param Exp Text
 * @parent Text Options
 * @desc Text used in the label for the exp reward
 * @default Experience:
 *
 * @param Gold Text
 * @parent Text Options
 * @desc Text used in the label for the gold reward
 * @default Currency:
 *
 * @param Info Text
 * @parent Text Options
 * @desc Text used in the divider for Quest Info
 * @default Info
 *
 * @param Description Text
 * @parent Text Options
 * @desc Text used in the divider for Quest Description
 * @default Description
 *
 * @param Objectives Text
 * @parent Text Options
 * @desc Text used in the divider for Quest Objectives
 * @default Objectives
 *
 * @param Rewards Text
 * @parent Text Options
 * @desc Text used in the divider for Quest Rewards
 * @default Rewards
 *
 * @param New Quest Text
 * @parent Text Options
 * @desc Text used in the display window for accepting a quest before the quest name
 * @default New Quest:
 *
 * @param Accept Text
 * @parent Text Options
 * @desc Text used in the command window for accepting a quest
 * @default Accept
 *
 * @param Decline Text
 * @parent Text Options
 * @desc Text used in the command window for declining a quest
 * @default Decline
 *
 * @param Empty Quest Board Text
 * @parent Text Options
 * @type multiline_string
 * @desc Text used when a quest board has no quests to offer.
 * @default This quest board currently has no listings. Check back later and more might appear.
 *
 * @param Quest Tracker Text
 * @parent Text Options
 * @desc Text shown at the top of the quest tracker (if changing font size, use text code)
 * @default Quests
 *
 * @param Quest Tracker Complete Text
 * @parent Text Options
 * @desc Text shown for completed quests in the tracker
 * @default \c[3]Completed
 *
 * @param Quest Tracker Fail Text
 * @parent Text Options
 * @desc Text shown for failed quests in the tracker
 * @default \c[2]Failed
 *
 * @param Integrations
 *
 * @param Success Rumble
 * @parent Integrations
 * @type struct<Rumble>
 * @default {"Duration":"0","Weak Magnitude":"1.00","Strong Magnitude":"1.00","Start Delay":"0"}
 * @desc [CGMZ] Rumble settings to use when a quest is completed successfully
 *
 * @param Fail Rumble
 * @type struct<Rumble>
 * @parent Integrations
 * @default {"Duration":"0","Weak Magnitude":"1.00","Strong Magnitude":"1.00","Start Delay":"0"}
 * @desc [CGMZ] Rumble settings to use when a quest is failed
 *
 * @param Scene Background
 * @parent Integrations
 * @desc [CGMZ] Scene Background preset id to use in the Quest Log
 *
 * @param Controls Window
 * @parent Integrations
 * @desc [CGMZ] Controls Window preset id to use in the Quest Log
 *
 * @param List Window Settings
 * @parent Integrations
 * @desc [CGMZ] Window Settings preset id to use in the Quest Log - List window
 *
 * @param Display Window Settings
 * @parent Integrations
 * @desc [CGMZ] Window Settings preset id to use in the Quest Log - Display window
 *
 * @param Pin Confirm Window Settings
 * @parent Integrations
 * @desc [CGMZ] Window Settings preset id to use in the Quest Log - Pin Confirm window
 *
 * @param Accept Confirm Window Settings
 * @parent Integrations
 * @desc [CGMZ] Window Settings preset id to use in the Quest Log - Accept Confirm window
 *
 * @param Sort Info Window Settings
 * @parent Integrations
 * @desc [CGMZ] Window Settings preset id to use in the Quest Log - Sort Info window
 *
 * @param Sort Window Settings
 * @parent Integrations
 * @desc [CGMZ] Window Settings preset id to use in the Quest Log - Sort window
 *
 * @param Tracker Window Settings
 * @parent Integrations
 * @desc [CGMZ] Window Settings preset id to use in the Quest Tracker window
 *
 * @param Quest Accept Window Settings
 * @parent Integrations
 * @desc [CGMZ] Window Settings preset id to use in the Quest Accept scene - Display window
 *
 * @param Quest Accept Command Window Settings
 * @parent Integrations
 * @desc [CGMZ] Window Settings preset id to use in the Quest Accept scene - Command window
 *
 * @param Quest Board Window Settings
 * @parent Integrations
 * @desc [CGMZ] Window Settings preset id to use in the Quest Board scene - Board window
 *
 * @param Quest Board Name Window Settings
 * @parent Integrations
 * @desc [CGMZ] Window Settings preset id to use in the Quest Board scene - Name window
 *
 * @param Quest Board Legend Window Settings
 * @parent Integrations
 * @desc [CGMZ] Window Settings preset id to use in the Quest Board scene - Legend window
 *
 * @param List Window Background
 * @parent Integrations
 * @desc [CGMZ] Window Backgrounds preset id to use in the Quest Log - List window
 *
 * @param Display Window Background
 * @parent Integrations
 * @desc [CGMZ] Window Backgrounds preset id to use in the Quest Log - Display window
 *
 * @param Pin Confirm Window Background
 * @parent Integrations
 * @desc [CGMZ] Window Backgrounds preset id to use in the Quest Log - Pin Confirm window
 *
 * @param Accept Confirm Window Background
 * @parent Integrations
 * @desc [CGMZ] Window Backgrounds preset id to use in the Quest Log - Accept Confirm window
 *
 * @param Sort Info Window Background
 * @parent Integrations
 * @desc [CGMZ] Window Backgrounds preset id to use in the Quest Log - Sort Info window
 *
 * @param Sort Window Background
 * @parent Integrations
 * @desc [CGMZ] Window Backgrounds preset id to use in the Quest Log - Sort window
 *
 * @param Tracker Window Background
 * @parent Integrations
 * @desc [CGMZ] Window Backgrounds preset id to use in the Quest Tracker window
 *
 * @param Quest Accept Window Background
 * @parent Integrations
 * @desc [CGMZ] Window Backgrounds preset id to use in the Quest Accept scene - Display window
 *
 * @param Quest Accept Command Window Background
 * @parent Integrations
 * @desc [CGMZ] Window Backgrounds preset id to use in the Quest Accept scene - Command window
 *
 * @param Quest Board Window Background
 * @parent Integrations
 * @desc [CGMZ] Window Backgrounds preset id to use in the Quest Board scene - Board window
 *
 * @param Quest Board Name Window Background
 * @parent Integrations
 * @desc [CGMZ] Window Backgrounds preset id to use in the Quest Board scene - Name window
 *
 * @param Quest Board Legend Window Background
 * @parent Integrations
 * @desc [CGMZ] Window Backgrounds preset id to use in the Quest Board scene - Legend window
 *
 * @param Toast Options
 * @parent Integrations
 *
 * @param Quest Discover Toast
 * @parent Toast Options
 * @desc The default toast to display when a quest is discovered
 *
 * @param Quest Started Toast
 * @parent Toast Options
 * @desc The default toast to display when a quest is started
 *
 * @param Quest Completed Toast
 * @parent Toast Options
 * @desc The default toast to display when a quest is completed
 *
 * @param Quest Failed Toast
 * @parent Toast Options
 * @desc The default toast to display when a quest is failed
 *
 * @param Quest Objective Complete Toast
 * @parent Toast Options
 * @desc The default toast to display when a quest objective is completed
*/
/*~struct~QuestCategory:
 * @param Name
 * @desc The name of the category used throughout the quest system
 *
 * @param Type
 * @type select
 * @option Category
 * @option Difficulty
 * @option Length
 * @option Location
 * @default Category
 * @desc The type of category this is classified as
 *
 * @param Display Name
 * @desc The display name of the category
 *
 * @param Icon
 * @type icon
 * @default 0
 * @desc The icon of the category. Will be ignored if set to 0
 *
 * @param Description
 * @type multiline_string
 * @desc The description of the category
 *
 * @param Color1
 * @default rgba(32, 32, 32, 0.5)
 * @desc The first color to use to represent the category. RGBA format
 *
 * @param Color2
 * @default rgba(0, 0, 0, 0.5)
 * @desc The second color to use to represent the category. RGBA format
 *
 * @param Text Color
 * @type color
 * @default 0
 * @desc The color of the text for the category
 *
 * @param Start Expanded
 * @type boolean
 * @default true
 * @desc Whether the category should be expanded by default
*/
/*~struct~Quest:
 * @param Name
 * @desc The name of the quest (must be unique)
 *
 * @param Difficulty
 * @desc The difficulty of the quest
 *
 * @param Length
 * @desc The length of the quest
 *
 * @param Location
 * @desc The location of the quest
 *
 * @param Quest Giver
 * @desc The person who gives you the quest
 *
 * @param Category
 * @desc The category of the quest (such as main quest, sidequest, etc)
 *
 * @param Recommended Level
 * @type number
 * @default 0
 * @desc The recommended level of the quest (leave 0 if not using)
 *
 * @param Missable
 * @type boolean
 * @default false
 * @desc If true, the quest will be marked as missable. This is mostly for display purposes.
 *
 * @param Disable Unpin
 * @type boolean
 * @default false
 * @desc If true, the player will not be able to unpin the quest in the quest log.
 *
 * @param List Image
 * @type file
 * @dir img
 * @desc The image of the quest displayed in the list window (recommended dimensions 72x72 px)
 *
 * @param Background Image
 * @type file
 * @dir img/
 * @desc The image to show behind the name of the quest (recommended 108px height)
 *
 * @param Accept Scene Image
 * @desc [CGMZ] Scene Background to use while the player is accepting the quest in accept scene
 *
 * @param Unstarted Objective
 * @type multiline_string
 * @default \c[3]Accept\c[0] this quest to see its objectives.
 * @desc What to show for objectives if the quest is discovered but not yet started.
 *
 * @param Unstarted Description
 * @type multiline_string
 * @desc The description to show before the quest is accepted
 *
 * @param Completed Description
 * @type multiline_string
 * @desc The description to show if the quest is completed
 *
 * @param Failed Description
 * @type multiline_string
 * @desc The description to show if the quest is failed
 *
 * @param Board Description
 * @type multiline_string
 * @desc The description to show on the quest board scene
 *
 * @param Board Switch
 * @type switch
 * @default 0
 * @desc Required switch to be ON to appear on quest board scene
 *
 * @param Started Switch
 * @type switch
 * @default 0
 * @desc Turns this switch ON when the quest is started
 *
 * @param Description
 * @type multiline_string[]
 * @default []
 * @desc The main description of the quest. See documentation.
 *
 * @param Objectives
 * @type struct<QuestObjective>[]
 * @default []
 * @desc Quest objectives
 *
 * @param Reward Gold
 * @type number
 * @default 0
 * @desc Amount of gold to award upon completion
 *
 * @param Hide Reward Gold
 * @type boolean
 * @default false
 * @desc If true, the reward gold will be hidden even if it is not 0.
 *
 * @param Reward Exp
 * @type number
 * @default 0
 * @desc Amount of exp to award the entire party upon completion
 *
 * @param Hide Reward Exp
 * @type boolean
 * @default false
 * @desc If true, the reward exp will be hidden even if it is not 0.
 *
 * @param Reward Common Event
 * @type common_event
 * @default 0
 * @desc A common event that will run when the quest is completed.
 *
 * @param Reward Items
 * @type struct<RewardItem>[]
 * @default []
 * @desc Items to award upon completion
 *
 * @param Reward Weapons
 * @type struct<RewardWeapon>[]
 * @default []
 * @desc Weapons to award upon completion
 *
 * @param Reward Armors
 * @type struct<RewardArmor>[]
 * @default []
 * @desc Armors to award upon completion
 *
 * @param Reward Custom
 * @type text[]
 * @default []
 * @desc Custom rewards to give (not automatically given)
 *
 * @param Integrations
 *
 * @param Reward Drop Tables
 * @parent Integrations
 * @type struct<RewardDropTable>[]
 * @default []
 * @desc [CGMZ] Drop Tables to pick a reward from upon completion
 *
 * @param Discover Toast
 * @parent Integrations
 * @desc The toast to display when a quest is discovered
 *
 * @param Start Toast
 * @parent Integrations
 * @desc The toast to display when a quest is started
 *
 * @param Complete Toast
 * @parent Integrations
 * @desc The toast to display when a quest is completed
 *
 * @param Fail Toast
 * @parent Integrations
 * @desc The toast to display when a quest is failed
 *
 * @param Objective Complete Toast
 * @parent Integrations
 * @desc The toast to display when a quest objective is completed
*/
/*~struct~QuestObjective:
 * @param id
 * @desc The id of the objective, can be anything but must be unique and not blank.
 *
 * @param Description
 * @type multiline_string
 * @desc The description of the objective
 *
 * @param Stage
 * @type number
 * @default 1
 * @min 1
 * @desc The stage of the quest where this objective becomes visible (quests start at stage 1)
 *
 * @param Max Progress
 * @type number
 * @default 0
 * @min 0
 * @desc The max progress of the objective if tracking manually or via variable
 *
 * @param Use Automatic Tracking
 * @type boolean
 * @default false
 * @desc Enable this to automatically track the progress if item, weapon, armor, variable, or gold
 *
 * @param Auto Remove Items
 * @type boolean
 * @default false
 * @desc Enable this to automatically remove any item, weapon, armor, or gold requirements when completed
 *
 * @param Gold Tracking
 * @type number
 * @default 0
 * @min 0
 * @desc The amount of gold to track (leave 0 if no gold needed)
 *
 * @param Item Tracking
 * @type struct<QuestItem>
 * @desc The item to track and amount needed
 *
 * @param Weapon Tracking
 * @type struct<QuestWeapon>
 * @desc The weapon to track and amount needed
 *
 * @param Armor Tracking
 * @type struct<QuestArmor>
 * @desc The armor to track and amount needed
 *
 * @param Variable Tracking
 * @type variable
 * @default 0
 * @desc Automatic tracking for a variable. Uses Max Progress param for tracking
 *
 * @param Switch Tracking
 * @type switch
 * @default 0
 * @desc Automatic tracking for a switch.
 *
 * @param Objective Switch
 * @type switch
 * @default 0
 * @desc A switch that will be turned on automatically when the objective is marked complete
*/
/*~struct~QuestItem:
 * @param Item
 * @type item
 * @desc The item to use
 *
 * @param Amount
 * @type number
 * @default 0
 * @desc Amount of the item to use
*/
/*~struct~QuestWeapon:
 * @param Weapon
 * @type weapon
 * @desc The weapon to use
 *
 * @param Amount
 * @type number
 * @default 0
 * @desc Amount of the weapon to use
*/
/*~struct~QuestArmor:
 * @param Armor
 * @type armor
 * @desc The armor to use
 *
 * @param Amount
 * @type number
 * @default 0
 * @desc Amount of the armor to use
*/
/*~struct~RewardItem:
 * @param Item
 * @type item
 * @desc The item to use
 *
 * @param Amount
 * @type number
 * @default 0
 * @desc Amount of the item to use
 *
 * @param Hidden
 * @type boolean
 * @default false
 * @desc If true, this item will not be displayed as a reward.
*/
/*~struct~RewardWeapon:
 * @param Weapon
 * @type weapon
 * @desc The weapon to use
 *
 * @param Amount
 * @type number
 * @default 0
 * @desc Amount of the weapon to use
 *
 * @param Hidden
 * @type boolean
 * @default false
 * @desc If true, this weapon will not be displayed as a reward.
*/
/*~struct~RewardArmor:
 * @param Armor
 * @type armor
 * @desc The armor to use
 *
 * @param Amount
 * @type number
 * @default 0
 * @desc Amount of the armor to use
 *
 * @param Hidden
 * @type boolean
 * @default false
 * @desc If true, this armor will not be displayed as a reward.
*/
/*~struct~RewardDropTable:
 * @param Id
 * @desc The [CGMZ] Drop Table id to pick the reward from
 *
 * @param Description
 * @default 1 - 3 Potions
 * @desc Descriptive text used to communicate the reward to the player
 *
 * @param Hidden
 * @type boolean
 * @default false
 * @desc If true, this will not be displayed as a reward
*/
/*~struct~SoundEffect:
 * @param Name
 * @type file
 * @dir audio/se
 * @desc Sound Effect file to play
 *
 * @param Volume
 * @type number
 * @default 90
 * @min 0
 * @max 100
 * @desc Volume of the sound effect
 *
 * @param Pitch
 * @type number
 * @default 100
 * @min 50
 * @max 150
 * @desc Pitch of the sound effect
 *
 * @param Pan
 * @type number
 * @default 0
 * @min -100
 * @max 100
 * @desc Pan of the sound effect
*/
/*~struct~Rumble:
 * @param Duration
 * @type number
 * @min 0
 * @max 5000
 * @default 0
 * @desc The duration (in ms) of the rumble
 *
 * @param Weak Magnitude
 * @type number
 * @decimals 2
 * @min 0.00
 * @max 1.00
 * @default 1.00
 * @desc The weak magnitude of the rumble
 *
 * @param Strong Magnitude
 * @type number
 * @decimals 2
 * @min 0.00
 * @max 1.00
 * @default 1.00
 * @desc The strong magnitude of the rumble
 *
 * @param Start Delay
 * @type number
 * @min 0
 * @max 4800
 * @default 0
 * @desc The delay (in ms) before the rumble starts
*/
Imported.CGMZ_QuestSystem = true;
CGMZ.Versions["Quest System"] = "Alpha R15";
CGMZ.QuestSystem = {};
CGMZ.QuestSystem.parameters = PluginManager.parameters('CGMZ_QuestSystem');
CGMZ.QuestSystem.LabelTextColor = Number(CGMZ.QuestSystem.parameters["Label Text Color"]);
CGMZ.QuestSystem.ScrollSpeed = Number(CGMZ.QuestSystem.parameters["ScrollSpeed"]);
CGMZ.QuestSystem.ScrollWait = Number(CGMZ.QuestSystem.parameters["ScrollWait"]);
CGMZ.QuestSystem.FadeSpriteOpacity = Number(CGMZ.QuestSystem.parameters["Fade Sprite Opacity"]);
CGMZ.QuestSystem.SortButtonOffset = Number(CGMZ.QuestSystem.parameters["Sort Button Offset"]);
CGMZ.QuestSystem.SortButtonWidth = Number(CGMZ.QuestSystem.parameters["Sort Button Width"]);
CGMZ.QuestSystem.DateFormat = Number(CGMZ.QuestSystem.parameters["Date Format"]);
CGMZ.QuestSystem.ObjectiveCompleteIcon = Number(CGMZ.QuestSystem.parameters["Objective Complete Icon"]);
CGMZ.QuestSystem.ObjectiveFailedIcon = Number(CGMZ.QuestSystem.parameters["Objective Failed Icon"]);
CGMZ.QuestSystem.UpdatedTextColor = Number(CGMZ.QuestSystem.parameters["Updated Text Color"]);
CGMZ.QuestSystem.ListWindowWidth = Number(CGMZ.QuestSystem.parameters["List Window Width"]);
CGMZ.QuestSystem.HeaderGradientColor1 = Number(CGMZ.QuestSystem.parameters["Header Gradient Color 1"]);
CGMZ.QuestSystem.HeaderGradientColor2 = Number(CGMZ.QuestSystem.parameters["Header Gradient Color 2"]);
CGMZ.QuestSystem.DividerPadding = Number(CGMZ.QuestSystem.parameters["Divider Padding"]);
CGMZ.QuestSystem.MaxTrackedQuests = Number(CGMZ.QuestSystem.parameters["Max Tracked Quests"]);
CGMZ.QuestSystem.QuestTrackerHeight = Number(CGMZ.QuestSystem.parameters["Quest Tracker Height"]);
CGMZ.QuestSystem.QuestTrackerWidth = Number(CGMZ.QuestSystem.parameters["Quest Tracker Width"]);
CGMZ.QuestSystem.QuestTrackerX = Number(CGMZ.QuestSystem.parameters["Quest Tracker X"]);
CGMZ.QuestSystem.QuestTrackerY = Number(CGMZ.QuestSystem.parameters["Quest Tracker Y"]);
CGMZ.QuestSystem.QuestTrackerUpdateInterval = Number(CGMZ.QuestSystem.parameters["Quest Tracker Update Interval"]);
CGMZ.QuestSystem.QuestTrackerNameFS = Number(CGMZ.QuestSystem.parameters["Quest Tracker Name Font Size"]);
CGMZ.QuestSystem.QuestTrackerObjectiveFS = Number(CGMZ.QuestSystem.parameters["Quest Tracker Objective Font Size"]);
CGMZ.QuestSystem.QuestTrackerSpacing = Number(CGMZ.QuestSystem.parameters["Quest Tracker Spacing"]);
CGMZ.QuestSystem.TrackerSwitch = Number(CGMZ.QuestSystem.parameters["Tracker Switch"]);
CGMZ.QuestSystem.RecLvlEqualColor = Number(CGMZ.QuestSystem.parameters["Rec Level Equal Color"]);
CGMZ.QuestSystem.CustomSpace = Number(CGMZ.QuestSystem.parameters["Custom Space"]);
CGMZ.QuestSystem.ListWindowEntryHeight = Number(CGMZ.QuestSystem.parameters["List Window Entry Height"]);
CGMZ.QuestSystem.BoardColumns = Number(CGMZ.QuestSystem.parameters["Board Columns"]);
CGMZ.QuestSystem.ScrollDeceleration = parseFloat(CGMZ.QuestSystem.parameters["Scroll Deceleration"]);
CGMZ.QuestSystem.SceneBackground = CGMZ.QuestSystem.parameters["Scene Background"];
CGMZ.QuestSystem.ControlsWindow = CGMZ.QuestSystem.parameters["Controls Window"];
CGMZ.QuestSystem.SortInfoText = CGMZ.QuestSystem.parameters["Sort Info Text"];
CGMZ.QuestSystem.SortKey = CGMZ.QuestSystem.parameters["Sort Key"];
CGMZ.QuestSystem.PinText = CGMZ.QuestSystem.parameters["Pin Text"];
CGMZ.QuestSystem.UnpinText = CGMZ.QuestSystem.parameters["Unpin Text"];
CGMZ.QuestSystem.AcceptLogTitleText = CGMZ.QuestSystem.parameters["Accept Log Title Text"];
CGMZ.QuestSystem.CancelText = CGMZ.QuestSystem.parameters["Cancel Text"];
CGMZ.QuestSystem.UpdatedText = CGMZ.QuestSystem.parameters["Updated Text"];
CGMZ.QuestSystem.YesText = CGMZ.QuestSystem.parameters["Yes Text"];
CGMZ.QuestSystem.NoText = CGMZ.QuestSystem.parameters["No Text"];
CGMZ.QuestSystem.CompletionText = CGMZ.QuestSystem.parameters["Completion Text"];
CGMZ.QuestSystem.CategoryText = CGMZ.QuestSystem.parameters["Category Text"];
CGMZ.QuestSystem.DifficultyText = CGMZ.QuestSystem.parameters["Difficulty Text"];
CGMZ.QuestSystem.LengthText = CGMZ.QuestSystem.parameters["Length Text"];
CGMZ.QuestSystem.LocationText = CGMZ.QuestSystem.parameters["Location Text"];
CGMZ.QuestSystem.QuestGiverText = CGMZ.QuestSystem.parameters["Quest Giver Text"];
CGMZ.QuestSystem.MissableText = CGMZ.QuestSystem.parameters["Missable Text"];
CGMZ.QuestSystem.ExpText = CGMZ.QuestSystem.parameters["Exp Text"];
CGMZ.QuestSystem.GoldText = CGMZ.QuestSystem.parameters["Gold Text"];
CGMZ.QuestSystem.InfoText = CGMZ.QuestSystem.parameters["Info Text"];
CGMZ.QuestSystem.DescriptionText = CGMZ.QuestSystem.parameters["Description Text"];
CGMZ.QuestSystem.ObjectivesText = CGMZ.QuestSystem.parameters["Objectives Text"];
CGMZ.QuestSystem.RewardsText = CGMZ.QuestSystem.parameters["Rewards Text"];
CGMZ.QuestSystem.RecommendedLevelText = CGMZ.QuestSystem.parameters["Recommended Level Text"];
CGMZ.QuestSystem.AcceptText = CGMZ.QuestSystem.parameters["Accept Text"];
CGMZ.QuestSystem.DeclineText = CGMZ.QuestSystem.parameters["Decline Text"];
CGMZ.QuestSystem.NewQuestText = CGMZ.QuestSystem.parameters["New Quest Text"];
CGMZ.QuestSystem.ListWindowSettings = CGMZ.QuestSystem.parameters["List Window Settings"];
CGMZ.QuestSystem.DisplayWindowSettings = CGMZ.QuestSystem.parameters["Display Window Settings"];
CGMZ.QuestSystem.PinConfirmWindowSettings = CGMZ.QuestSystem.parameters["Pin Confirm Window Settings"];
CGMZ.QuestSystem.AcceptConfirmWindowSettings = CGMZ.QuestSystem.parameters["Accept Confirm Window Settings"];
CGMZ.QuestSystem.SortWindowSettings = CGMZ.QuestSystem.parameters["Sort Window Settings"];
CGMZ.QuestSystem.SortInfoWindowSettings = CGMZ.QuestSystem.parameters["Sort Info Window Settings"];
CGMZ.QuestSystem.TrackerWindowSettings = CGMZ.QuestSystem.parameters["Tracker Window Settings"];
CGMZ.QuestSystem.QuestAcceptWindowSettings = CGMZ.QuestSystem.parameters["Quest Accept Window Settings"];
CGMZ.QuestSystem.QuestAcceptCommandWindowSettings = CGMZ.QuestSystem.parameters["Quest Accept Command Window Settings"];
CGMZ.QuestSystem.QuestBoardWindowSettings = CGMZ.QuestSystem.parameters["Quest Board Window Settings"];
CGMZ.QuestSystem.QuestBoardNameWindowSettings = CGMZ.QuestSystem.parameters["Quest Board Name Window Settings"];
CGMZ.QuestSystem.QuestBoardLegendWindowSettings = CGMZ.QuestSystem.parameters["Quest Board Legend Window Settings"];
CGMZ.QuestSystem.ListWindowBackground = CGMZ.QuestSystem.parameters["List Window Background"];
CGMZ.QuestSystem.DisplayWindowBackground = CGMZ.QuestSystem.parameters["Display Window Background"];
CGMZ.QuestSystem.PinConfirmWindowBackground = CGMZ.QuestSystem.parameters["Pin Confirm Window Background"];
CGMZ.QuestSystem.AcceptConfirmWindowBackground = CGMZ.QuestSystem.parameters["Accept Confirm Window Background"];
CGMZ.QuestSystem.SortWindowBackground = CGMZ.QuestSystem.parameters["Sort Window Background"];
CGMZ.QuestSystem.SortInfoWindowBackground = CGMZ.QuestSystem.parameters["Sort Info Window Background"];
CGMZ.QuestSystem.TrackerWindowBackground = CGMZ.QuestSystem.parameters["Tracker Window Background"];
CGMZ.QuestSystem.QuestAcceptWindowBackground = CGMZ.QuestSystem.parameters["Quest Accept Window Background"];
CGMZ.QuestSystem.QuestAcceptCommandWindowBackground = CGMZ.QuestSystem.parameters["Quest Accept Command Window Background"];
CGMZ.QuestSystem.QuestBoardWindowBackground = CGMZ.QuestSystem.parameters["Quest Board Window Background"];
CGMZ.QuestSystem.QuestBoardNameWindowBackground = CGMZ.QuestSystem.parameters["Quest Board Name Window Background"];
CGMZ.QuestSystem.QuestBoardLegendWindowBackground = CGMZ.QuestSystem.parameters["Quest Board Legend Window Background"];
CGMZ.QuestSystem.EmptyQuestBoardText = CGMZ.QuestSystem.parameters["Empty Quest Board Text"];
CGMZ.QuestSystem.QuestTrackerText = CGMZ.QuestSystem.parameters["Quest Tracker Text"];
CGMZ.QuestSystem.QuestTrackerCompleteText = CGMZ.QuestSystem.parameters["Quest Tracker Complete Text"];
CGMZ.QuestSystem.QuestTrackerFailText = CGMZ.QuestSystem.parameters["Quest Tracker Fail Text"];
CGMZ.QuestSystem.QuestDiscoverToast = CGMZ.QuestSystem.parameters["Quest Discover Toast"];
CGMZ.QuestSystem.QuestStartToast = CGMZ.QuestSystem.parameters["Quest Started Toast"];
CGMZ.QuestSystem.QuestFailToast = CGMZ.QuestSystem.parameters["Quest Failed Toast"];
CGMZ.QuestSystem.QuestCompleteToast = CGMZ.QuestSystem.parameters["Quest Completed Toast"];
CGMZ.QuestSystem.QuestObjCompleteToast = CGMZ.QuestSystem.parameters["Quest Objective Complete Toast"];
CGMZ.QuestSystem.AutoScroll = (CGMZ.QuestSystem.parameters["Auto Scroll"] === "true");
CGMZ.QuestSystem.SeparateCompleteQuests = (CGMZ.QuestSystem.parameters["Separate Complete Quests"] === "true");
CGMZ.QuestSystem.AlwaysShowCompleteCategory = (CGMZ.QuestSystem.parameters["Always Show Complete Category"] === "true");
CGMZ.QuestSystem.SeparateFailedQuests = (CGMZ.QuestSystem.parameters["Separate Failed Quests"] === "true");
CGMZ.QuestSystem.AlwaysShowFailedCategory = (CGMZ.QuestSystem.parameters["Always Show Failed Category"] === "true");
CGMZ.QuestSystem.DrawCategoryInformation = (CGMZ.QuestSystem.parameters["Draw Category Info"] === "true");
CGMZ.QuestSystem.AllowSorting = (CGMZ.QuestSystem.parameters["Allow Sorting"] === "true");
CGMZ.QuestSystem.ShowSortButton = (CGMZ.QuestSystem.parameters["Show Sort Button"] === "true");
CGMZ.QuestSystem.AllowPinnedQuests = (CGMZ.QuestSystem.parameters["Allow Pinned Quests"] === "true");
CGMZ.QuestSystem.AlwaysShowPinnedCategory = (CGMZ.QuestSystem.parameters["Always Show Pinned Category"] === "true");
CGMZ.QuestSystem.AlwaysShowPastObjectives = (CGMZ.QuestSystem.parameters["Always Show Past Objectives"] === "true");
CGMZ.QuestSystem.DisableTouchUISpace = (CGMZ.QuestSystem.parameters["Disable Touch UI Space"] === "true");
CGMZ.QuestSystem.ListWindowRight = (CGMZ.QuestSystem.parameters["List Window Right"] === "true");
CGMZ.QuestSystem.AllowCancelInAcceptScene = (CGMZ.QuestSystem.parameters["Allow Cancel In Accept Scene"] === "true");
CGMZ.QuestSystem.AlwaysShowGoldReward = (CGMZ.QuestSystem.parameters["Always Show Gold Reward"] === "true");
CGMZ.QuestSystem.AlwaysShowExpReward = (CGMZ.QuestSystem.parameters["Always Show Exp Reward"] === "true");
CGMZ.QuestSystem.DrawIconInList = (CGMZ.QuestSystem.parameters["Draw Icon In List"] === "true");
CGMZ.QuestSystem.UnpinOnComplete = (CGMZ.QuestSystem.parameters["Unpin on Complete"] === "true");
CGMZ.QuestSystem.UnpinOnFail = (CGMZ.QuestSystem.parameters["Unpin on Fail"] === "true");
CGMZ.QuestSystem.AcceptFromQuestLog = (CGMZ.QuestSystem.parameters["Accept From Quest Log"] === "true");
CGMZ.QuestSystem.ObjectivesCompleteWithQuest = (CGMZ.QuestSystem.parameters["Complete Objectives With Quest"] === "true");
CGMZ.QuestSystem.AllowFailPins = (CGMZ.QuestSystem.parameters["Allow Fail Pins"] === "true");
CGMZ.QuestSystem.AllowCompletePins = (CGMZ.QuestSystem.parameters["Allow Complete Pins"] === "true");
CGMZ.QuestSystem.DividerLines = (CGMZ.QuestSystem.parameters["Divider Lines"] === "true");
CGMZ.QuestSystem.ShowTrackedQuests = (CGMZ.QuestSystem.parameters["Show Tracked Quests"] === "true");
CGMZ.QuestSystem.TrackerBlockTouchInput = (CGMZ.QuestSystem.parameters["Tracker Block Touch Input"] === "true");
CGMZ.QuestSystem.AutoHideTracker = (CGMZ.QuestSystem.parameters["Auto Hide Tracker"] === "true");
CGMZ.QuestSystem.ListShowRecLevel = (CGMZ.QuestSystem.parameters["List Show Rec Level"] === "true");
CGMZ.QuestSystem.QuestAcceptSceneDiscovers = (CGMZ.QuestSystem.parameters["Quest Accept Scene Discovers"] === "true");
CGMZ.QuestSystem.ReverseObjectiveOrder = (CGMZ.QuestSystem.parameters["Reverse Objective Order"] === "true");
CGMZ.QuestSystem.SuccessRumble = CGMZ_Utils.parseRumbleJSON(CGMZ.QuestSystem.parameters["Success Rumble"], "[CGMZ] Quest System");
CGMZ.QuestSystem.FailRumble = CGMZ_Utils.parseRumbleJSON(CGMZ.QuestSystem.parameters["Fail Rumble"], "[CGMZ] Quest System");
CGMZ.QuestSystem.RecLvlNegativeColors = CGMZ_Utils.parseJSON(CGMZ.QuestSystem.parameters["Rec Level Negative Colors"], [], "[CGMZ] Quest System", "Your Rec Level Negative Colors parameter is set up incorrectly and could not be read.").map(x => Number(x));
CGMZ.QuestSystem.RecLvlPositiveColors = CGMZ_Utils.parseJSON(CGMZ.QuestSystem.parameters["Rec Level Positive Colors"], [], "[CGMZ] Quest System", "Your Rec Level Positive Colors parameter is set up incorrectly and could not be read.").map(x => Number(x));
CGMZ.QuestSystem.CompleteCategory = CGMZ_Utils.parseJSON(CGMZ.QuestSystem.parameters["Completed Category"], null, "[CGMZ] Quest System", "Your Completed Category parameter is set up incorrectly and could not be read.");
CGMZ.QuestSystem.FailedCategory = CGMZ_Utils.parseJSON(CGMZ.QuestSystem.parameters["Failed Category"], null, "[CGMZ] Quest System", "Your Failed Category parameter is set up incorrectly and could not be read.");
CGMZ.QuestSystem.PinnedCategory = CGMZ_Utils.parseJSON(CGMZ.QuestSystem.parameters["Pinned Category"], null, "[CGMZ] Quest System", "Your Pinned Category parameter is set up incorrectly and could not be read.");
CGMZ.QuestSystem.CategorySortOrder = CGMZ_Utils.parseJSON(CGMZ.QuestSystem.parameters["Category Sort Order"], [], "[CGMZ] Quest System", "Your Category Sort Order parameter is set up incorrectly and could not be read.");
CGMZ.QuestSystem.SortOptions = CGMZ_Utils.parseJSON(CGMZ.QuestSystem.parameters["Sort Options"], [], "[CGMZ] Quest System", "Your Sort Options parameter is set up incorrectly and could not be read.");
CGMZ.QuestSystem.SortOptionsText = CGMZ_Utils.parseJSON(CGMZ.QuestSystem.parameters["Sort Options Text"], [], "[CGMZ] Quest System", "Your Sort Options Text parameter is set up incorrectly and could not be read.");
CGMZ.QuestSystem.QuestInfoOrder = CGMZ_Utils.parseJSON(CGMZ.QuestSystem.parameters["Quest Info Order"], [], "[CGMZ] Quest System", "Your Quest Info Order parameter is set up incorrectly and could not be read.");
CGMZ.QuestSystem.Quests = CGMZ_Utils.parseJSON(CGMZ.QuestSystem.parameters["Quests"], [], "[CGMZ] Quest System", "Your Quests parameter was set up incorrectly and could not be read.");
CGMZ.QuestSystem.QuestCategories = CGMZ_Utils.parseJSON(CGMZ.QuestSystem.parameters["Categories"], [], "[CGMZ] Quest System", "Your Categories parameter was set up incorrectly and could not be read.");
//=============================================================================
// CGMZ_Quest
//-----------------------------------------------------------------------------
// Data class used to store quest data which is added to save file
//=============================================================================
function CGMZ_Quest() {
	this.initialize(...arguments);
}
//-----------------------------------------------------------------------------
// Initialize
//-----------------------------------------------------------------------------
CGMZ_Quest.prototype.initialize = function() {
	this._isDiscovered = false;
	this._isStarted = false;
	this._isCompleted = false;
	this._isFailed = false;
	this._isPinned = false;
	this._isUpdated = false;
	this._completionDate = "";
	this._objectiveProgress = {};
	this._objectivesCompleted = {};
	this._stage = 1;
	this._pinOrder = 0;
};
//-----------------------------------------------------------------------------
// Discover quest
//-----------------------------------------------------------------------------
CGMZ_Quest.prototype.discover = function(discovered) {
	this._isDiscovered = discovered;
	this._isUpdated = true;
	if(this._isPinned) $cgmzTemp.requestQuestTrackerUpdate();
};
//-----------------------------------------------------------------------------
// Start quest
//-----------------------------------------------------------------------------
CGMZ_Quest.prototype.start = function(started, discovered) {
	this._isStarted = started;
	this._isDiscovered = discovered;
	this._isUpdated = true;
	if(this._isPinned) $cgmzTemp.requestQuestTrackerUpdate();
};
//-----------------------------------------------------------------------------
// Complete quest
//-----------------------------------------------------------------------------
CGMZ_Quest.prototype.complete = function() {
	this._isCompleted = true;
	this._completionDate = CGMZ_Utils.createDateText(CGMZ.QuestSystem.DateFormat, new Date(Date.now()));
	if(CGMZ.QuestSystem.UnpinOnComplete) this._isPinned = false;
	this._isUpdated = true;
	$cgmzTemp.requestQuestTrackerUpdate();
	if(Imported.CGMZ_Rumble) $cgmzTemp.startRumble(CGMZ.QuestSystem.SuccessRumble);
};
//-----------------------------------------------------------------------------
// Fail quest
//-----------------------------------------------------------------------------
CGMZ_Quest.prototype.fail = function() {
	this._isFailed = true;
	if(CGMZ.QuestSystem.UnpinOnFail) this._isPinned = false;
	this._isUpdated = true;
	$cgmzTemp.requestQuestTrackerUpdate();
	if(Imported.CGMZ_Rumble) $cgmzTemp.startRumble(CGMZ.QuestSystem.FailRumble);
};
//-----------------------------------------------------------------------------
// Reset quest
//-----------------------------------------------------------------------------
CGMZ_Quest.prototype.resetQuest = function() {
	this.unpin();
	this.initialize();
	$cgmzTemp.requestQuestTrackerUpdate();
};
//-----------------------------------------------------------------------------
// Toggle whether the quest is pinned
//-----------------------------------------------------------------------------
CGMZ_Quest.prototype.togglePin = function() {
	if(this._isPinned) {
		this.unpin();
	} else {
		this.pin();
	}
};
//-----------------------------------------------------------------------------
// Pin the quest
//-----------------------------------------------------------------------------
CGMZ_Quest.prototype.pin = function() {
	if(this._isPinned) return;
	this._isPinned = true;
	this._pinOrder = $cgmz.getQuestPinNextOrder();
	$cgmzTemp.requestQuestTrackerUpdate();
};
//-----------------------------------------------------------------------------
// Unpin the quest
//-----------------------------------------------------------------------------
CGMZ_Quest.prototype.unpin = function() {
	if(!this._isPinned) return;
	this._isPinned = false;
	this._pinOrder = 0;
	$cgmz.removeQuestOrderPin();
	$cgmzTemp.requestQuestTrackerUpdate();
};
//-----------------------------------------------------------------------------
// Is quest in progress (started but not completed/failed) ?
//-----------------------------------------------------------------------------
CGMZ_Quest.prototype.isInProgress = function() {
	return (this._isStarted && !this._isCompleted && !this._isFailed);
};
//-----------------------------------------------------------------------------
// Is quest finished (completed/failed) ?
//-----------------------------------------------------------------------------
CGMZ_Quest.prototype.isFinished = function() {
	return (this._isCompleted || this._isFailed);
};
//-----------------------------------------------------------------------------
// Is quest completed ?
//-----------------------------------------------------------------------------
CGMZ_Quest.prototype.isCompleted = function() {
	return this._isCompleted;
};
//-----------------------------------------------------------------------------
// Is quest failed ?
//-----------------------------------------------------------------------------
CGMZ_Quest.prototype.isFailed = function() {
	return this._isFailed;
};
//-----------------------------------------------------------------------------
// See the actual progress of an objective (may be undefined)
//-----------------------------------------------------------------------------
CGMZ_Quest.prototype.objectiveProgress = function(id) {
	return this._objectiveProgress[id];
};
//-----------------------------------------------------------------------------
// Get objective completed
//-----------------------------------------------------------------------------
CGMZ_Quest.prototype.isObjectiveComplete = function(id) {
	return this._objectivesCompleted[id];
};
//-----------------------------------------------------------------------------
// Get objective progress clamped by min/max progress
//-----------------------------------------------------------------------------
CGMZ_Quest.prototype.getObjectiveProgress = function(id, maxProgress) {
	if(this.isObjectiveComplete(id)) return maxProgress;
	if(!this._objectiveProgress.hasOwnProperty(id)) {
		this._objectiveProgress[id] = 0;
	}
	return this._objectiveProgress[id].clamp(0, maxProgress);
};
//-----------------------------------------------------------------------------
// Set the objective's progress
//-----------------------------------------------------------------------------
CGMZ_Quest.prototype.setObjectiveProgress = function(id, progress) {
	this._objectiveProgress[id] = progress;
	this._isUpdated = true;
	if(this._isPinned) $cgmzTemp.requestQuestTrackerUpdate();
};
//-----------------------------------------------------------------------------
// Set the objective's completion status
//-----------------------------------------------------------------------------
CGMZ_Quest.prototype.setObjectiveComplete = function(id, complete) {
	this._objectivesCompleted[id] = complete;
	this._isUpdated = true;
	if(this._isPinned) $cgmzTemp.requestQuestTrackerUpdate();
};
//-----------------------------------------------------------------------------
// Progress Stage
//-----------------------------------------------------------------------------
CGMZ_Quest.prototype.advanceStage = function() {
	this._stage++;
	this._isUpdated = true;
	if(this._isPinned) $cgmzTemp.requestQuestTrackerUpdate();
};
//-----------------------------------------------------------------------------
// Get current stage
//-----------------------------------------------------------------------------
CGMZ_Quest.prototype.currentStage = function() {
	return this._stage;
};
//=============================================================================
// CGMZ_QuestData
//-----------------------------------------------------------------------------
// Data class used to store temporary quest data (not saved)
//=============================================================================
function CGMZ_QuestData() {
	this.initialize(...arguments);
}
//-----------------------------------------------------------------------------
// Initialize
//-----------------------------------------------------------------------------
CGMZ_QuestData.prototype.initialize = function(quest) {
	this._name = quest.Name;
	this._difficulty = quest.Difficulty;
	this._location = quest.Location;
	this._length = quest.Length;
	this._category = quest.Category;
	this._questGiver = quest["Quest Giver"];
	this._missable = (quest.Missable === 'true');
	this.disableUnpin = (quest["Disable Unpin"] === 'true');
	this._needsRefresh = false;
	this._recommendedLevel = Number(quest["Recommended Level"]);
	this._listImage = quest["List Image"];
	this._backgroundImage = quest["Background Image"];
	this._acceptSceneImage = quest["Accept Scene Image"];
	this._unstartedObjective = quest["Unstarted Objective"];
	this._unstartedDescription = quest["Unstarted Description"];
	this._boardDescription = quest["Board Description"];
	this._completedDescription = quest["Completed Description"];
	this._failedDescription = quest["Failed Description"];
	this.discoverToast = quest["Discover Toast"];
	this.startToast = quest["Start Toast"];
	this.completeToast = quest["Complete Toast"];
	this.failToast = quest["Fail Toast"];
	this.objectiveCompleteToast = quest["Objective Complete Toast"];
	this._boardSwitch = Number(quest["Board Switch"]);
	this._startSwitch = Number(quest["Started Switch"]);
	this._descriptions = CGMZ_Utils.parseJSON(quest.Description, [], "[CGMZ] Quest System", `Your description parameter for quest ${this._name} was set up incorrectly and could not be read`);
	this._rewardCommonEvent = Number(quest["Reward Common Event"]);
	this._rewardExp = Number(quest["Reward Exp"]);
	this._hideRewardExp = (quest["Hide Reward Exp"] === 'true');
	this._rewardGold = Number(quest["Reward Gold"]);
	this._hideRewardGold = (quest["Hide Reward Gold"] === 'true');
	this._customRewards = CGMZ_Utils.parseJSON(quest["Reward Custom"], [], "[CGMZ] Quest System", `Your Reward Custom parameter for quest ${this._name} was set up incorrectly and could not be read`);
	this._autoRewards = [];
	const rewardArmors = CGMZ_Utils.parseJSON(quest["Reward Armors"], [], "[CGMZ] Quest System", `Your Reward Armors parameter for quest ${this._name} was set up incorrectly and could not be read`);
	for(const json of rewardArmors) {
		const data = CGMZ_Utils.parseJSON(json, null, "[CGMZ] Quest System", `An armor reward for quest ${this._name} was set up incorrectly and could not be read`);
		if(!data) continue;
		const reward = {type: "armor", id: Number(data.Armor), amount: Number(data.Amount), hide: (data.Hidden === 'true')}
		this._autoRewards.push(reward);
	}
	const rewardWeapons = CGMZ_Utils.parseJSON(quest["Reward Weapons"], [], "[CGMZ] Quest System", `Your Reward Weapons parameter for quest ${this._name} was set up incorrectly and could not be read`);
	for(const json of rewardWeapons) {
		const data = CGMZ_Utils.parseJSON(json, null, "[CGMZ] Quest System", `A weapon reward for quest ${this._name} was set up incorrectly and could not be read`);
		if(!data) continue;
		const reward = {type: "weapon", id: Number(data.Weapon), amount: Number(data.Amount), hide: (data.Hidden === 'true')}
		this._autoRewards.push(reward);
	}
	const rewardItems = CGMZ_Utils.parseJSON(quest["Reward Items"], [], "[CGMZ] Quest System", `Your Reward Items parameter for quest ${this._name} was set up incorrectly and could not be read`);
	for(const json of rewardItems) {
		const data = CGMZ_Utils.parseJSON(json, null, "[CGMZ] Quest System", `An item reward for quest ${this._name} was set up incorrectly and could not be read`);
		if(!data) continue;
		const reward = {type: "item", id: Number(data.Item), amount: Number(data.Amount), hide: (data.Hidden === 'true')}
		this._autoRewards.push(reward);
	}
	const rewardDropTables = CGMZ_Utils.parseJSON(quest["Reward Drop Tables"], [], "[CGMZ] Quest System", `Your Reward Drop Tables parameter for quest ${this._name} was set up incorrectly and could not be read`);
	for(const json of rewardDropTables) {
		const data = CGMZ_Utils.parseJSON(json, null, "[CGMZ] Quest System", `An drop table reward for quest ${this._name} was set up incorrectly and could not be read`);
		if(!data || !Imported.CGMZ_DropTables) continue;
		const reward = {type: "dropTable", id: data.Id, description: data.Description, hide: (data.Hidden === 'true')}
		this._autoRewards.push(reward);
	}
	this.setupObjectives(CGMZ_Utils.parseJSON(quest.Objectives, [], "[CGMZ] Quest System", `Your Objectives parameter for quest ${this._name} was set up incorrectly and could not be read`));
};
//-----------------------------------------------------------------------------
// Setup Objectives
//-----------------------------------------------------------------------------
CGMZ_QuestData.prototype.setupObjectives = function(objectives) {
	this._objectives = [];
	for(const jsonObj of objectives) {
		const objective = CGMZ_Utils.parseJSON(jsonObj, null, "[CGMZ] Quest System", `An objective for quest ${this._name} was set up incorrectly and could not be read`);
		if(!objective) continue;
		const obj = {};
		obj.stage = Number(objective.Stage);
		obj.id = objective.id;
		obj.description = objective.Description;
		obj.maxProgress = Number(objective["Max Progress"]);
		obj.autoTrack = (objective["Use Automatic Tracking"] === 'true');
		obj.autoRemoveItems = (objective["Auto Remove Items"] === 'true');
		obj.completeSwitch = Number(objective["Objective Switch"]);
		if(obj.autoTrack) {
			obj.goldTracking = Number(objective["Gold Tracking"]);
			obj.variableTracking = Number(objective["Variable Tracking"]);
			obj.switchTracking = Number(objective["Switch Tracking"]);
			let data;
			if(objective["Item Tracking"]) {
				data = CGMZ_Utils.parseJSON(objective["Item Tracking"], null, "[CGMZ] Quest System", `An item tracking objective for quest ${this._name} was set up incorrectly and could not be read`);
				if(!data) continue;
				obj.otherTracking = {type: "item", id: Number(data.Item), amount: Number(data.Amount)}
			} else if(objective["Weapon Tracking"]) {
				data = CGMZ_Utils.parseJSON(objective["Weapon Tracking"], null, "[CGMZ] Quest System", `A weapon tracking objective for quest ${this._name} was set up incorrectly and could not be read`);
				if(!data) continue;
				obj.otherTracking = {type: "weapon", id: Number(data.Weapon), amount: Number(data.Amount)}
			} else if(objective["Armor Tracking"]) {
				data = CGMZ_Utils.parseJSON(objective["Armor Tracking"], null, "[CGMZ] Quest System", `An armor tracking objective for quest ${this._name} was set up incorrectly and could not be read`);
				if(!data) continue;
				obj.otherTracking = {type: "armor", id: Number(data.Armor), amount: Number(data.Amount)}
			}
		}
		this._objectives.push(obj);
	}
	if(CGMZ.QuestSystem.ReverseObjectiveOrder) this._objectives.reverse();
};
//-----------------------------------------------------------------------------
// Get Objective Max Progress
//-----------------------------------------------------------------------------
CGMZ_QuestData.prototype.getMaxProgressForObjective = function(id) {
	const obj = this.getObjectiveById(id);
	if(obj.maxProgress > 0) return obj.maxProgress;
	if(obj.goldTracking > 0 ) return obj.goldTracking;
	if(obj.otherTracking) return obj.otherTracking.amount;
	if(obj.switchTracking) return 1;
	return 0;
};
//-----------------------------------------------------------------------------
// Get Objective by id
//-----------------------------------------------------------------------------
CGMZ_QuestData.prototype.getObjectiveById = function(id) {
	return this._objectives.find(objective => objective.id === id);
};
//-----------------------------------------------------------------------------
// Get Objectives of Stage x
//-----------------------------------------------------------------------------
CGMZ_QuestData.prototype.getObjectivesOfStage = function(stage) {
	const objectives = [];
	for(const objective of this._objectives) {
		if(objective.stage === stage) {
			objectives.push(objective);
		}
	}
	return objectives;
};
//-----------------------------------------------------------------------------
// Check if quest should display on board
//-----------------------------------------------------------------------------
CGMZ_QuestData.prototype.canDisplayOnBoard = function() {
	return (this._boardSwitch) ? $gameSwitches.value(this._boardSwitch) : true;
};
//-----------------------------------------------------------------------------
// Check if quest has rewards
//-----------------------------------------------------------------------------
CGMZ_QuestData.prototype.hasRewards = function() {
	return (this._rewardExp || this._rewardGold || this._customRewards.length > 0 || (this._autoRewards.length > 0 && this._autoRewards.some(reward => !reward.hide)))
};
//=============================================================================
// CGMZ_QuestCategory
//-----------------------------------------------------------------------------
// Data class for quest category data. Not saved
//=============================================================================
function CGMZ_QuestCategory() {
	this.initialize(...arguments);
}
//-----------------------------------------------------------------------------
// Initialize
//-----------------------------------------------------------------------------
CGMZ_QuestCategory.prototype.initialize = function(questCategory) {
	this._color1 = questCategory.Color1;
	this._color2 = questCategory.Color2;
	this._textColor = Number(questCategory["Text Color"]);
	this._icon = Number(questCategory.Icon);
	this._name = questCategory.Name;
	this._displayName = questCategory["Display Name"];
	this._description = questCategory.Description;
	this._type = questCategory.Type;
	this._expanded = (questCategory["Start Expanded"] === 'true');
};
//=============================================================================
// CGMZ_Core
//-----------------------------------------------------------------------------
// Handle saved Quest data
//=============================================================================
//-----------------------------------------------------------------------------
// Also initialize Quest Data
//-----------------------------------------------------------------------------
const alias_CGMZ_QuestSystem_CGMZ_Core_createPluginData = CGMZ_Core.prototype.createPluginData;
CGMZ_Core.prototype.createPluginData = function() {
	alias_CGMZ_QuestSystem_CGMZ_Core_createPluginData.call(this);
	this.initializeQuestData(false);
};
//-----------------------------------------------------------------------------
// Initialize Quest Data
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.initializeQuestData = function(reinitialize) {
	if(!this._questData || reinitialize) {
		this._questData = {};
	}
	if(!this._questStatistics || reinitialize) {
		this._questStatistics = {
			completed: 0,
			failed: 0,
			objectivesCompleted: 0,
			started: 0
		};
	}
	if(!this._questPinOrder) this._questPinOrder = 0;
	for(const questJSON of CGMZ.QuestSystem.Quests) {
		const quest = CGMZ_Utils.parseJSON(questJSON, null, "[CGMZ] Quest System", "One of your quests was set up incorrectly and could not be read.");
		if(!quest) continue;
		if(!this._questData.hasOwnProperty(quest.Name)) {
			this._questData[quest.Name] = new CGMZ_Quest();
		}
	}
};
//-----------------------------------------------------------------------------
// Check if new quests have been added after load
//-----------------------------------------------------------------------------
const alias_CGMZ_QuestSystem_CGMZ_Core_onAfterLoad = CGMZ_Core.prototype.onAfterLoad;
CGMZ_Core.prototype.onAfterLoad = function() {
	alias_CGMZ_QuestSystem_CGMZ_Core_onAfterLoad.call(this);
	this.initializeQuestData(false);
	$cgmzTemp.populateQuestAutoTracking();
};
//-----------------------------------------------------------------------------
// Get specific quest 
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.getQuest = function(name) {
	return this._questData[name];
};
//-----------------------------------------------------------------------------
// Get discovered quests
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.getDiscoveredQuests = function() {
	return Object.keys(this._questData).filter(key => this._questData[key]._isDiscovered);
};
//-----------------------------------------------------------------------------
// Get started quests
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.getStartedQuests = function() {
	return Object.keys(this._questData).filter(key => this._questData[key]._isStarted);
};
//-----------------------------------------------------------------------------
// Get completed quests
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.getCompletedQuests = function() {
	return Object.keys(this._questData).filter(key => this._questData[key]._isCompleted);
};
//-----------------------------------------------------------------------------
// Get failed quests
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.getFailedQuests = function() {
	return Object.keys(this._questData).filter(key => this._questData[key]._isFailed);
};
//-----------------------------------------------------------------------------
// Get in progress quests
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.getInProgressQuests = function() {
	return Object.keys(this._questData).filter(key => this._questData[key].isInProgress());
};
//-----------------------------------------------------------------------------
// Get pinned quests
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.getPinnedQuests = function() {
	return Object.keys(this._questData).filter(key => this._questData[key]._isPinned).sort((a, b) => {
		const q1 = $cgmz.getQuest(a);
		const q2 = $cgmz.getQuest(b);
		const o1 = (q1._pinOrder) ? q1._pinOrder : 0;
		const o2 = (q2._pinOrder) ? q2._pinOrder : 0;
		return o1 - o2;
	});
};
//-----------------------------------------------------------------------------
// Get the next pin order
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.getQuestPinNextOrder = function() {
	return this._questPinOrder++;
};
//-----------------------------------------------------------------------------
// Remove a quest from the pin order
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.removeQuestOrderPin = function() {
	this._questPinOrder--;
	if(this._questPinOrder < 0) this._questPinOrder = 0;
	if(this._questPinOrder > 0) {
		const quests = this.getPinnedQuests();
		for(let o = 0; o < quests.length; o++) {
			const quest = this.getQuest(quests[o]);
			quest._pinOrder = o;
		}
	}
};
//-----------------------------------------------------------------------------
// Get total quests completed
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.getQuestCompletedCount = function() {
	return this._questStatistics.completed;
};
//-----------------------------------------------------------------------------
// Get total quests failed
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.getQuestFailedCount = function() {
	return this._questStatistics.failed;
};
//-----------------------------------------------------------------------------
// Get total quests started
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.getQuestStartedCount = function() {
	return this._questStatistics.started;
};
//-----------------------------------------------------------------------------
// Get total objectives completed
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.getQuestObjectivesCompletedCount = function() {
	return this._questStatistics.objectivesCompleted;
};
//-----------------------------------------------------------------------------
// Discover a quest
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.discoverQuest = function(questName, discover) {
	const quest = this.getQuest(questName);
	if(quest && quest._isDiscovered !== discover) {
		if(discover) $cgmzTemp.showQuestToast("discover", questName);
		quest.discover(discover);
	}
};
//-----------------------------------------------------------------------------
// Start a quest
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.startQuest = function(questName, start, discover) {
	const quest = this.getQuest(questName);
	if(quest && quest._isStarted !== start) {
		const questTemp = $cgmzTemp.getQuest(questName);
		if(discover) this.discoverQuest(questName, discover);
		quest.start(start, discover);
		if(start) {
			this._questStatistics.started++;
			$cgmzTemp.showQuestToast("start", questName);
			$gameSwitches.setValue(questTemp._startSwitch, true);
		}
		$cgmzTemp.checkAutoTrackingForQuest(questName);
	}
};
//-----------------------------------------------------------------------------
// Complete a quest
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.completeQuest = function(questName) {
	const quest = this.getQuest(questName);
	if(quest && !quest._isCompleted) {
		quest.complete();
		this._questStatistics.completed++;
		$cgmzTemp.showQuestToast("complete", questName);
		while($cgmzTemp.getQuest(questName).getObjectivesOfStage(quest.currentStage()).length > 0) {
			$cgmzTemp.saveQuestObjectiveProgress(questName, quest);
			quest.advanceStage();
		}
		$cgmzTemp.removeQuestAutoTracking(questName);
		$cgmzTemp.giveQuestRewards(questName);
	}
};
//-----------------------------------------------------------------------------
// Fail a quest
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.failQuest = function(questName) {
	const quest = this.getQuest(questName);
	if(quest && !quest._isFailed) {
		quest.fail();
		this._questStatistics.failed++;
		$cgmzTemp.showQuestToast("fail", questName);
		$cgmzTemp.saveQuestObjectiveProgress(questName, quest);
		$cgmzTemp.removeQuestAutoTracking(questName);
	}
};
//-----------------------------------------------------------------------------
// Advance a quest's stage. If stage has no objectives, assume completed
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.advanceQuestStage = function(questName) {
	const quest = this.getQuest(questName);
	if(quest) {
		$cgmzTemp.saveQuestObjectiveProgress(questName, quest);
		quest.advanceStage();
		$cgmzTemp.checkAutoTrackingForQuest(questName);
		$cgmzTemp.checkAllAutomaticQuestObjectives();
		const objectives = $cgmzTemp.getQuest(questName).getObjectivesOfStage(quest.currentStage());
		if(objectives.length === 0) {
			this.completeQuest(questName, true);
		}
	}
};
//=============================================================================
// CGMZ_Temp
//-----------------------------------------------------------------------------
// Add temp quest data and handle plugin commands
//=============================================================================
//-----------------------------------------------------------------------------
// Also initialize quest data
//-----------------------------------------------------------------------------
const alias_CGMZ_QuestSystem_CGMZ_Temp_createPluginData = CGMZ_Temp.prototype.createPluginData;
CGMZ_Temp.prototype.createPluginData = function() {
	alias_CGMZ_QuestSystem_CGMZ_Temp_createPluginData.call(this);
	this.initializeQuestData();
};
//-----------------------------------------------------------------------------
// Initialize Quest Temp Data
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.initializeQuestData = function() {
	this._currentQuestCategorySortType = "Category";
	this._questData = {};
	this._questBoardSettings = {questList: [], img: "", name: "", categoryIcons: "", legend: false};
	this._questTrackerNeedsUpdate = false;
	this.initializeQuestAutoTracking();
	for(const questJSON of CGMZ.QuestSystem.Quests) {
		const quest = CGMZ_Utils.parseJSON(questJSON, null, "[CGMZ] Quest System", "One of your quests was set up incorrectly and could not be read.");
		if(!quest) continue;
		this._questData[quest.Name] = new CGMZ_QuestData(quest);
	}
	this._questCategoryData = {};
	if(CGMZ.QuestSystem.PinnedCategory) {
		this._questCategoryData[CGMZ.QuestSystem.PinnedCategory.Name] = new CGMZ_QuestCategory(CGMZ.QuestSystem.PinnedCategory);
		this._questCategoryData[CGMZ.QuestSystem.PinnedCategory.Name]._type = "CGMZ_Internal_Category";
	}
	for(const categoryJSON of CGMZ.QuestSystem.QuestCategories) {
		const category = CGMZ_Utils.parseJSON(categoryJSON, null, "[CGMZ] Quest System", "One of your categories was set up incorrectly and could not be read.");
		if(!category) continue;
		this._questCategoryData[category.Name] = new CGMZ_QuestCategory(category);
	}
	if(CGMZ.QuestSystem.CompleteCategory) {
		this._questCategoryData[CGMZ.QuestSystem.CompleteCategory.Name] = new CGMZ_QuestCategory(CGMZ.QuestSystem.CompleteCategory);
		this._questCategoryData[CGMZ.QuestSystem.CompleteCategory.Name]._type = "CGMZ_Internal_Category";
	}
	if(CGMZ.QuestSystem.FailedCategory) {
		this._questCategoryData[CGMZ.QuestSystem.FailedCategory.Name] = new CGMZ_QuestCategory(CGMZ.QuestSystem.FailedCategory);
		this._questCategoryData[CGMZ.QuestSystem.FailedCategory.Name]._type = "CGMZ_Internal_Category";
	}
};
//-----------------------------------------------------------------------------
// Initialize auto tracking object
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.initializeQuestAutoTracking = function() {
	this._autoTrackQuests = {"gold": [], "variable": [], "item": [], "switches": []}
};
//-----------------------------------------------------------------------------
// Populate auto tracking object (for use after saved game is loaded)
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.populateQuestAutoTracking = function() {
	this.initializeQuestAutoTracking();
	for(const quest of $cgmz.getInProgressQuests()) {
		this.checkAutoTrackingForQuest(quest);
	}
};
//-----------------------------------------------------------------------------
// Check for a quest to be auto tracked after removing existing auto track entries
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.checkAutoTrackingForQuest = function(questName) {
	const questState = $cgmz.getQuest(questName);
	const questTemp = this.getQuest(questName);
	const stage = questState.currentStage();
	this.removeQuestAutoTracking(questName);
	for(const objective of questTemp.getObjectivesOfStage(stage)) {
		this.checkQuestObjectiveForAutoTrack(objective, questName);
	}
};
//-----------------------------------------------------------------------------
// Check an individual objective for auto track properties
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.checkQuestObjectiveForAutoTrack = function(objective, questName) {
	if(objective.autoTrack) {
		if(objective.goldTracking > 0 && !this._autoTrackQuests.gold.includes(questName)) {
			this._autoTrackQuests.gold.push(questName);
		} else if(objective.variableTracking > 0 && !this._autoTrackQuests.variable.includes(questName)) {
			this._autoTrackQuests.variable.push(questName);
		} else if(objective.hasOwnProperty('otherTracking') && !this._autoTrackQuests.item.includes(questName)) {
			this._autoTrackQuests.item.push(questName);
		}  else if(objective.switchTracking > 0 && !this._autoTrackQuests.switches.includes(questName)) {
			this._autoTrackQuests.switches.push(questName);
		}
	}
};
//-----------------------------------------------------------------------------
// Remove a quest from auto tracking
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.removeQuestAutoTracking = function(questName) {
	const goldIndex = this._autoTrackQuests.gold.indexOf(questName);
	if(goldIndex >= 0) this._autoTrackQuests.gold.splice(goldIndex, 1);
	const varIndex = this._autoTrackQuests.variable.indexOf(questName);
	if(varIndex >= 0) this._autoTrackQuests.variable.splice(varIndex, 1);
	const itemIndex = this._autoTrackQuests.item.indexOf(questName);
	if(itemIndex >= 0) this._autoTrackQuests.item.splice(itemIndex, 1);
	const switchIndex = this._autoTrackQuests.switches.indexOf(questName);
	if(switchIndex >= 0) this._autoTrackQuests.switches.splice(switchIndex, 1);
};
//-----------------------------------------------------------------------------
// Check quest quto-tracked objectives in case they might be complete already
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.checkAllAutomaticQuestObjectives = function() {
	this.checkAutomaticGoldQuests();
	this.checkAutomaticVariableQuests();
	this.checkAutomaticItemQuests();
	this.checkAutomaticSwitchQuests();
};
//-----------------------------------------------------------------------------
// Check if automatic tracking gold quest objective is satisfied, if so
// check the other objectives for that quest
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.checkAutomaticGoldQuests = function() {
	for(let i = this._autoTrackQuests.gold.length - 1; i >= 0; i--) {
		const quest = this._autoTrackQuests.gold[i];
		const questState = $cgmz.getQuest(quest);
		const questTemp = this.getQuest(quest);
		const stage = questState.currentStage();
		const gold = $gameParty.gold();
		const objectives = questTemp.getObjectivesOfStage(stage);
		for(const objective of objectives) {
			if(questState.isObjectiveComplete(objective.id)) continue;
			if(objective.goldTracking > 0) {
				if(gold >= objective.goldTracking) {
					const questStage = questState.currentStage();
					this.setObjectiveComplete(objective, quest, questState, objectives);
					const newQuestStage = questState.currentStage();
					if(questStage !== newQuestStage) break;
				} else {
					questState.setObjectiveProgress(objective.id, gold);
				}
			}
		}
	}
};
//-----------------------------------------------------------------------------
// Check if automatic tracking variable quest objective is satisfied, if so
// check the other objectives for that quest
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.checkAutomaticVariableQuests = function() {
	for(let i = this._autoTrackQuests.variable.length - 1; i >= 0; i--) {
		const quest = this._autoTrackQuests.variable[i];
		const questState = $cgmz.getQuest(quest);
		const questTemp = this.getQuest(quest);
		const stage = questState.currentStage();
		const objectives = questTemp.getObjectivesOfStage(stage);
		for(const objective of objectives) {
			if(questState.isObjectiveComplete(objective.id)) continue;
			const value = $gameVariables.value(objective.variableTracking);
			if(objective.variableTracking > 0) {
				if(value >= objective.maxProgress) {
					const questStage = questState.currentStage();
					this.setObjectiveComplete(objective, quest, questState, objectives);
					const newQuestStage = questState.currentStage();
					if(questStage !== newQuestStage) break;
				} else {
					questState.setObjectiveProgress(objective.id, value);
				}
			}
		}
	}
};
//-----------------------------------------------------------------------------
// Check if automatic tracking switches quest objective is satisfied, if so
// check the other objectives for that quest
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.checkAutomaticSwitchQuests = function() {
	for(let i = this._autoTrackQuests.switches.length - 1; i >= 0; i--) {
		const quest = this._autoTrackQuests.switches[i];
		const questState = $cgmz.getQuest(quest);
		const questTemp = this.getQuest(quest);
		const stage = questState.currentStage();
		const objectives = questTemp.getObjectivesOfStage(stage);
		for(const objective of objectives) {
			if(questState.isObjectiveComplete(objective.id)) continue;
			if(objective.switchTracking > 0) {
				const value = $gameSwitches.value(objective.switchTracking);
				if(value) {
					const questStage = questState.currentStage();
					this.setObjectiveComplete(objective, quest, questState, objectives);
					const newQuestStage = questState.currentStage();
					if(questStage !== newQuestStage) break;
				} else {
					questState.setObjectiveProgress(objective.id, 0);
				}
			}
		}
	}
};
//-----------------------------------------------------------------------------
// Check if automatic tracking item quest objective is satisfied, if so
// check the other objectives for that quest
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.checkAutomaticItemQuests = function() {
	for(let i = this._autoTrackQuests.item.length - 1; i >= 0; i--) {
		const quest = this._autoTrackQuests.item[i];
		const questState = $cgmz.getQuest(quest);
		const questTemp = this.getQuest(quest);
		const stage = questState.currentStage();
		const objectives = questTemp.getObjectivesOfStage(stage);
		for(const objective of objectives) {
			if(questState.isObjectiveComplete(objective.id)) continue;
			if(objective.hasOwnProperty('otherTracking')) {
				const item = CGMZ_Utils.lookupItem(objective.otherTracking.type, objective.otherTracking.id);
				const amountOwned = $gameParty.numItems(item);
				if(amountOwned >= objective.otherTracking.amount) {
					const questStage = questState.currentStage();
					this.setObjectiveComplete(objective, quest, questState, objectives);
					const newQuestStage = questState.currentStage();
					if(questStage !== newQuestStage) break;
				} else {
					questState.setObjectiveProgress(objective.id, amountOwned);
				}
			}
		}
	}
};
//-----------------------------------------------------------------------------
// Check if automatic tracking item quest objective is satisfied, if so
// check the other objectives for that quest
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.checkForQuestStageAdvance = function(quest, objectives) {
	const questState = $cgmz.getQuest(quest);
	if(objectives.every(objective => questState.isObjectiveComplete(objective.id))) {
		$cgmz.advanceQuestStage(quest);
	}
};
//-----------------------------------------------------------------------------
// Set a quest objective to be complete
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.setObjectiveComplete = function(objective, questName, questState, objectives) {
	if(questState.isObjectiveComplete(objective.id)) return;
	questState.setObjectiveComplete(objective.id, true);
	this.showQuestToast("objectiveComplete", questName);
	$cgmz._questStatistics.objectivesCompleted++;
	if(objective.completeSwitch) $gameSwitches.setValue(objective.completeSwitch, true);
	this.checkForQuestStageAdvance(questName, objectives);
	if(objective.autoRemoveItems && objective.autoTrack) this.removeQuestRequiredItems(objective);
};
//-----------------------------------------------------------------------------
// Remove required items for a quest if enabled
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.removeQuestRequiredItems = function(objective) {
	if(objective.goldTracking) {
		$gameParty.loseGold(objective.goldTracking);
	} else if(objective.hasOwnProperty('otherTracking')) {
		const item = CGMZ_Utils.lookupItem(objective.otherTracking.type, objective.otherTracking.id);
		$gameParty.loseItem(item, objective.otherTracking.amount, true);
	}
};
//-----------------------------------------------------------------------------
// Save the progress made on automatic objectives
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.saveQuestObjectiveProgress = function(questName, questState) {
	const objectives = this.getQuest(questName).getObjectivesOfStage(questState.currentStage());
	for(const objective of objectives) {
		if(objective.autoTrack) {
			if(objective.goldTracking > 0) {
				questState.setObjectiveProgress(objective.id, $gameParty.gold());
			} else if(objective.variableTracking > 0) {
				questState.setObjectiveProgress(objective.id, $gameVariables.value(objective.variableTracking));
			} else if(objective.hasOwnProperty('otherTracking')) {
				const item = CGMZ_Utils.lookupItem(objective.otherTracking.type, objective.otherTracking.id);
				questState.setObjectiveProgress(objective.id, $gameParty.numItems(item));
			}  else if(objective.switchTracking > 0) {
				const value = $gameSwitches.value(objective.switchTracking) ? 1 : 0;
				questState.setObjectiveProgress(objective.id, value);
			}
		}
	}
};
//-----------------------------------------------------------------------------
// Show a quest toast
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.showQuestToast = function(type, questName) {
	if(!Imported.CGMZ_ToastManager) return;
	const quest = this.getQuest(questName);
	let preset;
	switch(type) {
		case 'discover': preset = quest?.discoverToast || CGMZ.QuestSystem.QuestDiscoverToast; break;
		case 'start': preset = quest?.startToast || CGMZ.QuestSystem.QuestStartToast; break;
		case 'complete': preset = quest?.completeToast || CGMZ.QuestSystem.QuestCompleteToast; break;
		case 'fail': preset = quest?.failToast || CGMZ.QuestSystem.QuestFailToast; break;
		case 'objectiveComplete': preset = quest?.objectiveCompleteToast || CGMZ.QuestSystem.QuestObjCompleteToast; break;
	}
	if(!preset) return;
	const toast = $cgmzTemp.getToastObjectFromPreset(preset);
	if(!toast) return;
	toast.lineOne = toast.lineOne.replace("%questname", questName);
	toast.lineTwo = toast.lineTwo.replace("%questname", questName);
	this.createNewToast(toast);
};
//-----------------------------------------------------------------------------
// Award the rewards from completing a quest
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.giveQuestRewards = function(questName) {
	const quest = this.getQuest(questName);
	$gameParty.gainGold(quest._rewardGold);
	if(quest._rewardCommonEvent) $gameTemp.reserveCommonEvent(quest._rewardCommonEvent);
	for(const actor of $gameParty.allMembers()) {
		actor.gainExp(quest._rewardExp);
	}
	for(const itemObj of quest._autoRewards) {
		if(itemObj.type === 'dropTable') {
			const drop = $cgmzTemp.getDropTableDrop(itemObj.id);
			$cgmzTemp.awardDropTableDrop(drop);
		} else {
			const item = CGMZ_Utils.lookupItem(itemObj.type, itemObj.id);
			$gameParty.gainItem(item, itemObj.amount, false);
		}
	}
};
//-----------------------------------------------------------------------------
// Check if tracker needs update
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.questTrackerNeedsUpdate = function() {
	return this._questTrackerNeedsUpdate;
};
//-----------------------------------------------------------------------------
// Processing when quest tracker window updates itself
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.onQuestTrackerUpdate = function() {
	this._questTrackerNeedsUpdate = false;
};
//-----------------------------------------------------------------------------
// Request quest tracker to update
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.requestQuestTrackerUpdate = function() {
	this._questTrackerNeedsUpdate = true;
};
//-----------------------------------------------------------------------------
// Register Quest Plugin Commands
//-----------------------------------------------------------------------------
const alias_CGMZ_QuestSystem_CGMZ_Temp_registerPluginCommands = CGMZ_Temp.prototype.registerPluginCommands;
CGMZ_Temp.prototype.registerPluginCommands = function() {
	alias_CGMZ_QuestSystem_CGMZ_Temp_registerPluginCommands.call(this);
	PluginManager.registerCommand("CGMZ_QuestSystem", "Call Scene", this.pluginCommandQuestSystemCallScene);
	PluginManager.registerCommand("CGMZ_QuestSystem", "Call Accept Scene", this.pluginCommandQuestSystemCallAcceptScene);
	PluginManager.registerCommand("CGMZ_QuestSystem", "Call Quest Board Scene", this.pluginCommandQuestSystemCallQuestBoardScene);
	PluginManager.registerCommand("CGMZ_QuestSystem", "Set Objective Progress", this.pluginCommandQuestSystemSetObjectiveProgress);
	PluginManager.registerCommand("CGMZ_QuestSystem", "Advance Quest Stage", this.pluginCommandQuestSystemAdvanceQuestStage);
	PluginManager.registerCommand("CGMZ_QuestSystem", "Get Quest Stage", this.pluginCommandQuestSystemGetQuestStage);
	PluginManager.registerCommand("CGMZ_QuestSystem", "Get Quest Objective", this.pluginCommandQuestSystemGetQuestObjective);
	PluginManager.registerCommand("CGMZ_QuestSystem", "Get Quest Status", this.pluginCommandQuestSystemGetQuestStatus);
	PluginManager.registerCommand("CGMZ_QuestSystem", "Discover Quest", this.pluginCommandQuestSystemDiscoverQuest);
	PluginManager.registerCommand("CGMZ_QuestSystem", "Start Quest", this.pluginCommandQuestSystemStartQuest);
	PluginManager.registerCommand("CGMZ_QuestSystem", "Complete Quest", this.pluginCommandQuestSystemCompleteQuest);
	PluginManager.registerCommand("CGMZ_QuestSystem", "Fail Quest", this.pluginCommandQuestSystemFailQuest);
	PluginManager.registerCommand("CGMZ_QuestSystem", "Reset Quest", this.pluginCommandQuestSystemResetQuest);
	PluginManager.registerCommand("CGMZ_QuestSystem", "Change Pin Status", this.pluginCommandQuestSystemChangePinStatus);
	PluginManager.registerCommand("CGMZ_QuestSystem", "Get Statistic", this.pluginCommandQuestSystemGetStatistic);
};
//-----------------------------------------------------------------------------
// Plugin Command - Call quest scene
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.pluginCommandQuestSystemCallScene = function() {
	SceneManager.push(CGMZ_Scene_QuestSystem);
};
//-----------------------------------------------------------------------------
// Plugin Command - Call quest accept scene
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.pluginCommandQuestSystemCallAcceptScene = function(args) {
	const questName = args["Quest Name"];
	const decisionSwitch = Number(args["Decision Switch"]);
	const quest = $cgmz.getQuest(questName);
	const se = CGMZ_Utils.parseSoundEffectJSON(args.SE, "[CGMZ] Quest System");
	const disableDecline = (args["Disable Decline"] === 'true');
	if(quest && !quest._isStarted) {
		const argObj = {quest: questName, gameSwitch: decisionSwitch, se: se, disableDecline: disableDecline};
		SceneManager.push(CGMZ_Scene_QuestSystemAcceptQuest);
		SceneManager.prepareNextScene(argObj);
	}
};
//-----------------------------------------------------------------------------
// Plugin Command - Call quest board scene
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.pluginCommandQuestSystemCallQuestBoardScene = function(args) {
	const questBoardObject = {
		questList: CGMZ_Utils.parseJSON(args["Quest Names"], [], "[CGMZ] Quest System", "Your Call Quest Board Scene plugin command had invalid JSON in the Quest Names parameter and could not be read."),
		background: args["Scene Background"],
		name: args["Window Name"],
		categoryIcons: args["Category Icon Type"],
		legend: (args["Show Legend"] === 'true'),
		exitOnAccept: (args["Exit After Accept"] === 'true'),
		se: CGMZ_Utils.parseSoundEffectJSON(args.SE, "[CGMZ] Quest System")
	};
	$cgmzTemp._questBoardSettings = questBoardObject;
	SceneManager.push(CGMZ_Scene_QuestSystemQuestBoard);
};
//-----------------------------------------------------------------------------
// Plugin Command - Discover quest
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.pluginCommandQuestSystemDiscoverQuest = function(args) {
	$cgmz.discoverQuest(args["Quest Name"], args.Discover === 'true');
};
//-----------------------------------------------------------------------------
// Plugin Command - Start quest
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.pluginCommandQuestSystemStartQuest= function(args) {
	$cgmz.startQuest(args["Quest Name"], args.Start === 'true', args.Discover === 'true');
};
//-----------------------------------------------------------------------------
// Plugin Command - Complete quest
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.pluginCommandQuestSystemCompleteQuest = function(args) {
	$cgmz.completeQuest(args["Quest Name"]);
};
//-----------------------------------------------------------------------------
// Plugin Command - Fail quest
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.pluginCommandQuestSystemFailQuest = function(args) {
	$cgmz.failQuest(args["Quest Name"]);
};
//-----------------------------------------------------------------------------
// Plugin Command - Complete quest
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.pluginCommandQuestSystemResetQuest = function(args) {
	const quest = $cgmz.getQuest(args["Quest Name"]);
	const finishedOnly = (args["Finished Only"] === 'true');
	if(quest && (quest.isFinished() || !finishedOnly)) {
		quest.resetQuest();
	}
};
//-----------------------------------------------------------------------------
// Plugin Command - Set objective progress
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.pluginCommandQuestSystemSetObjectiveProgress = function(args) {
	const quest = $cgmz.getQuest(args["Quest Name"]);
	const questTemp = $cgmzTemp.getQuest(args["Quest Name"]);
	const questObjective = questTemp.getObjectiveById(args.id);
	if(quest && questObjective) {
		const maxProgress = questTemp.getMaxProgressForObjective(args.id);
		let objectiveProgress = quest.getObjectiveProgress(args.id, maxProgress);
		switch(args.mode) {
			case "+": objectiveProgress += Number(args.amount) + $gameVariables.value(Number(args.variable)); break
			case "-": objectiveProgress -= Number(args.amount) + $gameVariables.value(Number(args.variable)); break
			case "=": objectiveProgress = Number(args.amount) + $gameVariables.value(Number(args.variable));
		}
		quest.setObjectiveProgress(args.id, objectiveProgress);
		if(objectiveProgress >= questObjective.maxProgress) {
			const objectives = $cgmzTemp.getQuest(args["Quest Name"]).getObjectivesOfStage(quest.currentStage());
			$cgmzTemp.setObjectiveComplete(questObjective, args["Quest Name"], quest, objectives);
		}
	}
};
//-----------------------------------------------------------------------------
// Plugin Command - Advance a quest's stage by one
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.pluginCommandQuestSystemAdvanceQuestStage = function(args) {
	$cgmz.advanceQuestStage(args["Quest Name"]);
};
//-----------------------------------------------------------------------------
// Plugin Command - Get quest stage
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.pluginCommandQuestSystemGetQuestStage = function(args) {
	const quest = $cgmz.getQuest(args["Quest Name"]);
	const variableId = Number(args["Variable ID"]);
	if(quest && variableId) {
		$gameVariables.setValue(variableId, quest.currentStage());
	}
};
//-----------------------------------------------------------------------------
// Plugin Command - Get objective progress
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.pluginCommandQuestSystemGetQuestObjective = function(args) {
	const quest = $cgmz.getQuest(args["Quest Name"]);
	const questTemp = $cgmzTemp.getQuest(args["Quest Name"]);
	const questObjective = questTemp.getObjectiveById(args.Objective);
	const variableId = Number(args["Variable ID"]);
	if(quest && questObjective) {
		const maxProgress = questTemp.getMaxProgressForObjective(args.Objective);
		const objectiveProgress = quest.getObjectiveProgress(args.Objective, maxProgress);
		$gameVariables.setValue(variableId, objectiveProgress);
	}
};
//-----------------------------------------------------------------------------
// Plugin Command - Get quest status into variable
// 0 = undiscovered
// 1 = discovered
// 2 = started
// 3 = failed
// 4 = completed
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.pluginCommandQuestSystemGetQuestStatus = function(args) {
	const quest = $cgmz.getQuest(args["Quest Name"]);
	const variableId = Number(args["Variable ID"]);
	if(quest && variableId) {
		if(quest._isCompleted) {
			$gameVariables.setValue(variableId, 4);
		} else if(quest._isFailed) {
			$gameVariables.setValue(variableId, 3);
		} else if(quest._isStarted) {
			$gameVariables.setValue(variableId, 2);
		} else if(quest._isDiscovered) {
			$gameVariables.setValue(variableId, 1);
		} else {
			$gameVariables.setValue(variableId, 0);
		}
	}
};
//-----------------------------------------------------------------------------
// Plugin Command - Change Pin Status
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.pluginCommandQuestSystemChangePinStatus = function(args) {
	const quest = $cgmz.getQuest(args["Quest Name"]);
	if(quest) {
		switch(args.Status) {
			case 'Pin': quest.pin(); break;
			case 'Unpin': quest.unpin(); break;
			case 'Toggle': quest.togglePin(); break;
		}
	}
};
//-----------------------------------------------------------------------------
// Plugin Command - Get Statistic
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.pluginCommandQuestSystemGetStatistic = function(args) {
	let stat = 0;
	switch(args.Statistic) {
		case 'Completed': stat = $cgmz.getQuestCompletedCount(); break;
		case 'Failed': stat = $cgmz.getQuestFailedCount(); break;
		case 'Started': stat = $cgmz.getQuestStartedCount(); break;
		case 'Objectives Completed': stat = $cgmz.getQuestObjectivesCompletedCount(); break;
	}
	$gameVariables.setValue(Number(args.Variable), stat);
};
//-----------------------------------------------------------------------------
// Get quest board settings
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.getQuestBoardSettings = function() {
	return this._questBoardSettings;
};
//-----------------------------------------------------------------------------
// Get specific quest
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.getQuest = function(name) {
	return this._questData[name];
};
//-----------------------------------------------------------------------------
// Get specific quest category
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.getQuestCategory = function(name) {
	return this._questCategoryData[name];
};
//-----------------------------------------------------------------------------
// Get specific type of quest category
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.getQuestCategoriesByType = function(type) {
	return Object.keys(this._questCategoryData).filter(key => this._questCategoryData[key]._type === type);
};
//-----------------------------------------------------------------------------
// Get all quests of a specific category
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.getQuestsByCategory = function(category) {
	return Object.keys(this._questData).filter(key => this._questData[key]._category === category);
};
//-----------------------------------------------------------------------------
// Get all quests of a specific difficulty
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.getQuestsByDifficulty = function(difficulty) {
	return Object.keys(this._questData).filter(key => this._questData[key]._difficulty === difficulty);
};
//-----------------------------------------------------------------------------
// Get all quests of a specific length
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.getQuestsByLength = function(length) {
	return Object.keys(this._questData).filter(key => this._questData[key]._length === length);
};
//-----------------------------------------------------------------------------
// Get all quests of a specific location
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.getQuestsByLocation = function(location) {
	return Object.keys(this._questData).filter(key => this._questData[key]._location === location);
};
//=============================================================================
// CGMZ_Scene_QuestSystem
//-----------------------------------------------------------------------------
// Handle the quest scene
//=============================================================================
function CGMZ_Scene_QuestSystem() {
	this.initialize.apply(this, arguments);
}
CGMZ_Scene_QuestSystem.prototype = Object.create(Scene_MenuBase.prototype);
CGMZ_Scene_QuestSystem.prototype.constructor = CGMZ_Scene_QuestSystem;
//-----------------------------------------------------------------------------
// Create quest system windows
//-----------------------------------------------------------------------------
CGMZ_Scene_QuestSystem.prototype.create = function() {
	Scene_MenuBase.prototype.create.call(this);
	this.createListWindow();
	this.createDisplayWindow();
	this.createPinConfirmWindow();
	this.createAcceptConfirmWindow();
	if(CGMZ.QuestSystem.AllowSorting) {
		this.createSortInfoWindow();
		this.createSortWindow();
	}
};
//-----------------------------------------------------------------------------
// Create list window
//-----------------------------------------------------------------------------
CGMZ_Scene_QuestSystem.prototype.createListWindow = function() {
	const rect = this.listWindowRect();
	this._listWindow = new CGMZ_Window_QuestList(rect);
	this._listWindow.setHandler('ok', this.onListOk.bind(this));
	this._listWindow.setHandler('cancel', this.popScene.bind(this));
	this._listWindow.setHandler('cgmzSort', this.startSort.bind(this));
	this.addWindow(this._listWindow);
};
//-----------------------------------------------------------------------------
// Get list window rect
//-----------------------------------------------------------------------------
CGMZ_Scene_QuestSystem.prototype.listWindowRect = function() {
	const y = this.hasTouchUI() ? this.buttonAreaHeight() : 0;
	const width = Graphics.boxWidth * (CGMZ.QuestSystem.ListWindowWidth / 100.0);
	const height = Graphics.boxHeight - y - (this.calcWindowHeight(1, false) * CGMZ.QuestSystem.AllowSorting);
	const x = (CGMZ.QuestSystem.ListWindowRight) ? Graphics.boxWidth - width : 0;
	return new Rectangle(x, y, width, height);
};
//-----------------------------------------------------------------------------
// Create list window
//-----------------------------------------------------------------------------
CGMZ_Scene_QuestSystem.prototype.createDisplayWindow = function() {
	const rect = this.displayWindowRect();
	this._displayWindow = new CGMZ_Window_QuestDisplay(rect);
	this._listWindow.setDisplayWindow(this._displayWindow);
	this._listWindow.select(0);
	this.addWindow(this._displayWindow);
};
//-----------------------------------------------------------------------------
// Get list window rect
//-----------------------------------------------------------------------------
CGMZ_Scene_QuestSystem.prototype.displayWindowRect = function() {
	const x = (CGMZ.QuestSystem.ListWindowRight) ? 0 : this._listWindow.width;
	const y = this._listWindow.y;
	const width = Graphics.boxWidth - this._listWindow.width;
	const height = Graphics.boxHeight - y;
	return new Rectangle(x, y, width, height);
};
//-----------------------------------------------------------------------------
// Create sort info window
//-----------------------------------------------------------------------------
CGMZ_Scene_QuestSystem.prototype.createSortInfoWindow = function() {
	const rect = this.sortInfoWindowRect();
	this._sortInfoWindow = new CGMZ_Window_QuestSortInfo(rect);
	this.addWindow(this._sortInfoWindow);
};
//-----------------------------------------------------------------------------
// Get sort info window rect
//-----------------------------------------------------------------------------
CGMZ_Scene_QuestSystem.prototype.sortInfoWindowRect = function() {
	const x = this._listWindow.x;
	const y = this._listWindow.y + this._listWindow.height;
	const width = this._listWindow.width;
	const height = this.calcWindowHeight(1, false);
	return new Rectangle(x, y, width, height);
};
//-----------------------------------------------------------------------------
// Create sort window
//-----------------------------------------------------------------------------
CGMZ_Scene_QuestSystem.prototype.createSortWindow = function() {
	const rect = this.sortWindowRect();
	this._sortWindow = new CGMZ_Window_QuestSort(rect);
	this._sortWindow.setHandler('ok', this.onSortOk.bind(this));
	this._sortWindow.setHandler('cancel', this.onSortCancel.bind(this));
	this.addWindow(this._sortWindow);
};
//-----------------------------------------------------------------------------
// Get sort window rect
//-----------------------------------------------------------------------------
CGMZ_Scene_QuestSystem.prototype.sortWindowRect = function() {
	const width = Graphics.boxWidth / 2;
	const height = this.calcWindowHeight(CGMZ.QuestSystem.SortOptions.length, true);
	const x = Graphics.boxWidth / 2 - width / 2;
	const y = Graphics.boxHeight / 2 - height / 2;
	return new Rectangle(x, y, width, height);
};
//-----------------------------------------------------------------------------
// Create pin confirmation window
//-----------------------------------------------------------------------------
CGMZ_Scene_QuestSystem.prototype.createPinConfirmWindow = function() {
	const rect = this.pinWindowRect();
	this._pinWindow = new CGMZ_Window_QuestPinConfirm(rect);
	this._pinWindow.setHandler('ok', this.onPinOk.bind(this));
	this._pinWindow.setHandler('cancel', this.onPinCancel.bind(this));
	this._listWindow.setPinWindow(this._pinWindow);
	this.addWindow(this._pinWindow);
};
//-----------------------------------------------------------------------------
// Get pin confirmation window rect
//-----------------------------------------------------------------------------
CGMZ_Scene_QuestSystem.prototype.pinWindowRect = function() {
	const width = Graphics.boxWidth / 2;
	const height = this.calcWindowHeight(2, true);
	const x = Graphics.boxWidth / 2 - width / 2;
	const y = Graphics.boxHeight / 2 - height / 2;
	return new Rectangle(x, y, width, height);
};
//-----------------------------------------------------------------------------
// Create accept confirmation window
//-----------------------------------------------------------------------------
CGMZ_Scene_QuestSystem.prototype.createAcceptConfirmWindow = function() {
	const rect = this.acceptConfirmWindowRect();
	this._acceptConfirmWindow = new CGMZ_Window_QuestAcceptConfirm(rect);
	this._acceptConfirmWindow.setHandler('ok', this.onAcceptOk.bind(this));
	this._acceptConfirmWindow.setHandler('cancel', this.onAcceptCancel.bind(this));
	this.addWindow(this._acceptConfirmWindow);
};
//-----------------------------------------------------------------------------
// Get accept confirmation window rect
//-----------------------------------------------------------------------------
CGMZ_Scene_QuestSystem.prototype.acceptConfirmWindowRect = function() {
	const width = this._pinWindow.width;
	const height = this._pinWindow.height;
	const x = this._pinWindow.x;
	const y = this._pinWindow.y;
	return new Rectangle(x, y, width, height);
};
//-----------------------------------------------------------------------------
// Check if should make room for Touch UI
//-----------------------------------------------------------------------------
CGMZ_Scene_QuestSystem.prototype.hasTouchUI = function() {
	return !CGMZ.QuestSystem.DisableTouchUISpace || ConfigManager.touchUI;
};
//-----------------------------------------------------------------------------
// Start the sort process
//-----------------------------------------------------------------------------
CGMZ_Scene_QuestSystem.prototype.startSort = function() {
	this._listWindow.deactivate();
	this._sortWindow.show();
	this._sortWindow.activate();
	this._sortButton?.hide();
};
//-----------------------------------------------------------------------------
// End the sort process
//-----------------------------------------------------------------------------
CGMZ_Scene_QuestSystem.prototype.onSortOk = function() {
	$cgmzTemp._currentQuestCategorySortType = this._sortWindow.item();
	this._sortWindow.deactivate();
	this._sortWindow.hide();
	this._listWindow.refresh();
	this._listWindow.select(0);
	this._listWindow.activate();
	this._sortButton?.show();
};
//-----------------------------------------------------------------------------
// Cancel the sort process
//-----------------------------------------------------------------------------
CGMZ_Scene_QuestSystem.prototype.onSortCancel = function() {
	this._sortWindow.deactivate();
	this._sortWindow.hide();
	this._listWindow.activate();
	this._sortButton?.show();
};
//-----------------------------------------------------------------------------
// On list window OK
//-----------------------------------------------------------------------------
CGMZ_Scene_QuestSystem.prototype.onListOk = function() {
	this._listWindow.deactivate();
	const quest = $cgmz.getQuest(this._listWindow.item()?.questName);
	const questTemp = $cgmzTemp.getQuest(this._listWindow.item()?.questName);
	if(CGMZ.QuestSystem.AcceptFromQuestLog && quest && !quest._isStarted && !quest._isCompleted && !quest._isFailed) {
		this._acceptConfirmWindow.activate();
		this._acceptConfirmWindow.select(0);
		this._acceptConfirmWindow.show();
		this._sortButton?.hide();
	} else {
		if(this.canPinQuest(quest, questTemp)) {
			this._pinWindow.activate();
			this._pinWindow.show();
			this._pinWindow.select(0);
			this._sortButton?.hide();
		} else {
			this._listWindow.activate();
		}
	}
};
//-----------------------------------------------------------------------------
// On pin window cancel
//-----------------------------------------------------------------------------
CGMZ_Scene_QuestSystem.prototype.onPinCancel = function() {
	this._pinWindow.deactivate();
	this._pinWindow.hide();
	this._listWindow.activate();
	this._sortButton?.show();
};
//-----------------------------------------------------------------------------
// On pin window ok
//-----------------------------------------------------------------------------
CGMZ_Scene_QuestSystem.prototype.onPinOk = function() {
	this._pinWindow.deactivate();
	this._pinWindow.hide();
	const quest = $cgmz.getQuest(this._pinWindow._quest.questName);
	quest.togglePin();
	this._listWindow.refresh();
	this._listWindow.select(0);
	this._listWindow.activate();
	this._sortButton?.show();
};
//-----------------------------------------------------------------------------
// On accept confirm window cancel
//-----------------------------------------------------------------------------
CGMZ_Scene_QuestSystem.prototype.onAcceptCancel = function() {
	this._acceptConfirmWindow.deactivate();
	this._acceptConfirmWindow.hide();
	this._listWindow.activate();
	this._sortButton?.show();
};
//-----------------------------------------------------------------------------
// On accept confirm window ok
//-----------------------------------------------------------------------------
CGMZ_Scene_QuestSystem.prototype.onAcceptOk = function() {
	this._acceptConfirmWindow.deactivate();
	this._acceptConfirmWindow.hide();
	const questName = this._listWindow.item().questName;
	$cgmz.startQuest(questName, true, true);
	this._listWindow.activate();
	this._displayWindow.forceRefresh();
	this._sortButton?.show();
};
//-----------------------------------------------------------------------------
// Check if the quest can be pinned
//-----------------------------------------------------------------------------
CGMZ_Scene_QuestSystem.prototype.canPinQuest = function(quest, questTemp) {
	if(quest._isCompleted && !CGMZ.QuestSystem.AllowCompletePins) return false;
	if(quest._isFailed && !CGMZ.QuestSystem.AllowFailPins) return false;
	if(quest._isPinned && questTemp?.disableUnpin) return false;
	return CGMZ.QuestSystem.AllowPinnedQuests;
};
//-----------------------------------------------------------------------------
// Create sort button if needed
//-----------------------------------------------------------------------------
CGMZ_Scene_QuestSystem.prototype.createButtons = function() {
	Scene_MenuBase.prototype.createButtons.call(this);
	if(ConfigManager.touchUI && CGMZ.QuestSystem.ShowSortButton) {
		this.createSortButton();
	}
};
//-----------------------------------------------------------------------------
// Create Sort Button
//-----------------------------------------------------------------------------
CGMZ_Scene_QuestSystem.prototype.createSortButton = function() {
	this._sortButton = new Sprite_Button("cgmzSort");
	this._sortButton.x = Graphics.boxWidth - this._sortButton.width - 4 - this._cancelButton.width - 4;
	this._sortButton.y = this.buttonY();
	this._sortButton.setClickHandler(this.startSort.bind(this));
	this.addWindow(this._sortButton);
};
//-----------------------------------------------------------------------------
// Get the scene's custom scene background
// No need to check if Scene Backgrounds is installed because this custom func
// is only called by that plugin
//-----------------------------------------------------------------------------
CGMZ_Scene_QuestSystem.prototype.CGMZ_getCustomSceneBackground = function() {
	return $cgmzTemp.sceneBackgroundPresets[CGMZ.QuestSystem.SceneBackground];
};
//-----------------------------------------------------------------------------
// Get controls window preset for [CGMZ] Controls Window
// No need to check if plugin is installed because this custom func is only called by that plugin
//-----------------------------------------------------------------------------
CGMZ_Scene_QuestSystem.prototype.CGMZ_getControlsWindowOtherPreset = function() {
	return $cgmzTemp.getControlWindowPresetOther(CGMZ.QuestSystem.ControlsWindow);
};
//=============================================================================
// CGMZ_Window_QuestSortInfo
//-----------------------------------------------------------------------------
// Window that displays controls for sorting
//=============================================================================
function CGMZ_Window_QuestSortInfo(rect) {
	this.initialize.apply(this, arguments);
}
CGMZ_Window_QuestSortInfo.prototype = Object.create(Window_Base.prototype);
CGMZ_Window_QuestSortInfo.prototype.constructor = CGMZ_Window_QuestSortInfo;
//-----------------------------------------------------------------------------
// Initialize
//-----------------------------------------------------------------------------
CGMZ_Window_QuestSortInfo.prototype.initialize = function(rect) {
	Window_Base.prototype.initialize.call(this, rect);
	if(Imported.CGMZ_WindowSettings && CGMZ.QuestSystem.SortInfoWindowSettings) this.CGMZ_setWindowSettings(CGMZ.QuestSystem.SortInfoWindowSettings);
	if(Imported.CGMZ_WindowBackgrounds && CGMZ.QuestSystem.SortInfoWindowBackground) this.CGMZ_setWindowBackground(CGMZ.QuestSystem.SortInfoWindowBackground);
	this.refresh();
};
//-----------------------------------------------------------------------------
// Refresh
//-----------------------------------------------------------------------------
CGMZ_Window_QuestSortInfo.prototype.refresh = function() {
	this.contents.clear();
	this.CGMZ_drawTextLine(CGMZ.QuestSystem.SortInfoText, 0, 0, this.contents.width, 'center');
};
//=============================================================================
// CGMZ_Window_QuestSort
//-----------------------------------------------------------------------------
// Selectable window for choosing a quest in a list.
//=============================================================================
function CGMZ_Window_QuestSort(rect) {
	this.initialize.apply(this, arguments);
}
CGMZ_Window_QuestSort.prototype = Object.create(Window_Selectable.prototype);
CGMZ_Window_QuestSort.prototype.constructor = CGMZ_Window_QuestSort;
//-----------------------------------------------------------------------------
// Initialize
//-----------------------------------------------------------------------------
CGMZ_Window_QuestSort.prototype.initialize = function(rect) {
	CGMZ_Window_Selectable.prototype.initialize.call(this, rect);
	if(Imported.CGMZ_WindowSettings && CGMZ.QuestSystem.SortWindowSettings) this.CGMZ_setWindowSettings(CGMZ.QuestSystem.SortWindowSettings);
	if(Imported.CGMZ_WindowBackgrounds && CGMZ.QuestSystem.SortWindowBackground) this.CGMZ_setWindowBackground(CGMZ.QuestSystem.SortWindowBackground);
	this.select(0);
	this.refresh();
	this.deactivate();
	this.hide();
};
//-----------------------------------------------------------------------------
// Get current selected item
//-----------------------------------------------------------------------------
CGMZ_Window_QuestSort.prototype.item = function() {
	return this._data[this.index()];
};
//-----------------------------------------------------------------------------
// Max items
//-----------------------------------------------------------------------------
CGMZ_Window_QuestSort.prototype.maxItems = function() {
	return CGMZ.QuestSystem.SortOptions.length;
};
//-----------------------------------------------------------------------------
// Refresh
//-----------------------------------------------------------------------------
CGMZ_Window_QuestSort.prototype.refresh = function() {
	this.makeItemList();
	CGMZ_Window_Selectable.prototype.refresh.call(this);
};
//-----------------------------------------------------------------------------
// Make item list
//-----------------------------------------------------------------------------
CGMZ_Window_QuestSort.prototype.makeItemList = function() {
	this._data = CGMZ.QuestSystem.SortOptions;
};
//-----------------------------------------------------------------------------
// Draw item in list
//-----------------------------------------------------------------------------
CGMZ_Window_QuestSort.prototype.drawItem = function(index) {
	const item = CGMZ.QuestSystem.SortOptionsText[index];
	const rect = this.itemRectWithPadding(index);
	this.CGMZ_drawTextLine(item, rect.x, rect.y, rect.width, 'center');
};
//=============================================================================
// CGMZ_Window_QuestPinConfirm
//-----------------------------------------------------------------------------
// Selectable window for choosing to pin or unpin a quest
//=============================================================================
function CGMZ_Window_QuestPinConfirm(rect) {
	this.initialize.apply(this, arguments);
}
CGMZ_Window_QuestPinConfirm.prototype = Object.create(Window_Selectable.prototype);
CGMZ_Window_QuestPinConfirm.prototype.constructor = CGMZ_Window_QuestPinConfirm;
//-----------------------------------------------------------------------------
// Initialize
//-----------------------------------------------------------------------------
CGMZ_Window_QuestPinConfirm.prototype.initialize = function(rect) {
	Window_Selectable.prototype.initialize.call(this, rect);
	if(Imported.CGMZ_WindowSettings && CGMZ.QuestSystem.PinConfirmWindowSettings) this.CGMZ_setWindowSettings(CGMZ.QuestSystem.PinConfirmWindowSettings);
	if(Imported.CGMZ_WindowBackgrounds && CGMZ.QuestSystem.PinConfirmWindowBackground) this.CGMZ_setWindowBackground(CGMZ.QuestSystem.PinConfirmWindowBackground);
	this._data = [];
	this._quest = null;
	this.deactivate();
	this.hide();
};
//-----------------------------------------------------------------------------
// Get current selected item
//-----------------------------------------------------------------------------
CGMZ_Window_QuestPinConfirm.prototype.setItem = function(quest) {
	if(this._quest === quest) return;
	this._quest = quest;
	this.refresh();
};
//-----------------------------------------------------------------------------
// Process Ok
//-----------------------------------------------------------------------------
CGMZ_Window_QuestPinConfirm.prototype.processOk = function() {
	if (this.index() === 0) {
		Window_Selectable.prototype.processOk.call(this);
	} else {
		this.processCancel();
	}
};
//-----------------------------------------------------------------------------
// Max items
//-----------------------------------------------------------------------------
CGMZ_Window_QuestPinConfirm.prototype.maxItems = function() {
	return (!this._quest || this._quest.isCategory) ? 0 : 2;
};
//-----------------------------------------------------------------------------
// Refresh
//-----------------------------------------------------------------------------
CGMZ_Window_QuestPinConfirm.prototype.refresh = function() {
	this.makeItemList();
	Window_Selectable.prototype.refresh.call(this);
};
//-----------------------------------------------------------------------------
// Make item list
//-----------------------------------------------------------------------------
CGMZ_Window_QuestPinConfirm.prototype.makeItemList = function() {
	if(!this._quest || this._quest.isCategory) return;
	this._data = [];
	const quest = $cgmz.getQuest(this._quest.questName);
	(quest._isPinned) ? this._data.push(CGMZ.QuestSystem.UnpinText) : this._data.push(CGMZ.QuestSystem.PinText);
	this._data.push(CGMZ.QuestSystem.CancelText);
};
//-----------------------------------------------------------------------------
// Draw item in list
//-----------------------------------------------------------------------------
CGMZ_Window_QuestPinConfirm.prototype.drawItem = function(index) {
	const item = this._data[index];
	const rect = this.itemRectWithPadding(index);
	this.CGMZ_drawTextLine(item, rect.x, rect.y, rect.width, 'center');
};
//=============================================================================
// CGMZ_Window_QuestAcceptConfirm
//-----------------------------------------------------------------------------
// Selectable window for choosing to accept a quest from the quest log
//=============================================================================
function CGMZ_Window_QuestAcceptConfirm(rect) {
	this.initialize.apply(this, arguments);
}
CGMZ_Window_QuestAcceptConfirm.prototype = Object.create(Window_Selectable.prototype);
CGMZ_Window_QuestAcceptConfirm.prototype.constructor = CGMZ_Window_QuestAcceptConfirm;
//-----------------------------------------------------------------------------
// Initialize
//-----------------------------------------------------------------------------
CGMZ_Window_QuestAcceptConfirm.prototype.initialize = function(rect) {
	Window_Selectable.prototype.initialize.call(this, rect);
	if(Imported.CGMZ_WindowSettings && CGMZ.QuestSystem.AcceptConfirmWindowSettings) this.CGMZ_setWindowSettings(CGMZ.QuestSystem.AcceptConfirmWindowSettings);
	if(Imported.CGMZ_WindowBackgrounds && CGMZ.QuestSystem.AcceptConfirmWindowBackground) this.CGMZ_setWindowBackground(CGMZ.QuestSystem.AcceptConfirmWindowBackground);
	this.refresh();
	this.deactivate();
	this.hide();
};
//-----------------------------------------------------------------------------
// Process Ok
//-----------------------------------------------------------------------------
CGMZ_Window_QuestAcceptConfirm.prototype.processOk = function() {
	if (this.index() === 0) {
		Window_Selectable.prototype.processOk.call(this);
	} else {
		this.processCancel();
	}
};
//-----------------------------------------------------------------------------
// Adjust item rect down one item
//-----------------------------------------------------------------------------
CGMZ_Window_QuestAcceptConfirm.prototype.itemRect = function(index) {
    const rect = Window_Selectable.prototype.itemRect.call(this, index);
	rect.y += this.itemHeight();
	return rect;
};
//-----------------------------------------------------------------------------
// Max columns
//-----------------------------------------------------------------------------
CGMZ_Window_QuestAcceptConfirm.prototype.maxCols = function() {
	return 2;
};
//-----------------------------------------------------------------------------
// Max items
//-----------------------------------------------------------------------------
CGMZ_Window_QuestAcceptConfirm.prototype.maxItems = function() {
	return 2;
};
//-----------------------------------------------------------------------------
// Refresh
//-----------------------------------------------------------------------------
CGMZ_Window_QuestAcceptConfirm.prototype.refresh = function() {
	Window_Selectable.prototype.refresh.call(this);
	this.CGMZ_drawTextLine(CGMZ.QuestSystem.AcceptLogTitleText, 0, 0, this.contents.width, 'center');
};
//-----------------------------------------------------------------------------
// Draw item in list
//-----------------------------------------------------------------------------
CGMZ_Window_QuestAcceptConfirm.prototype.drawItem = function(index) {
	const item = (index === 0) ? CGMZ.QuestSystem.AcceptText : CGMZ.QuestSystem.DeclineText;
	const rect = this.itemRectWithPadding(index);
	this.CGMZ_drawTextLine(item, rect.x, rect.y, rect.width, 'center');
};
//=============================================================================
// CGMZ_Window_QuestList
//-----------------------------------------------------------------------------
// Selectable window for choosing a quest in a list.
//=============================================================================
function CGMZ_Window_QuestList(rect) {
	this.initialize.apply(this, arguments);
}
CGMZ_Window_QuestList.prototype = Object.create(CGMZ_Window_Selectable.prototype);
CGMZ_Window_QuestList.prototype.constructor = CGMZ_Window_QuestList;
//-----------------------------------------------------------------------------
// Initialize
//-----------------------------------------------------------------------------
CGMZ_Window_QuestList.prototype.initialize = function(rect) {
	CGMZ_Window_Selectable.prototype.initialize.call(this, rect);
	if(Imported.CGMZ_WindowSettings && CGMZ.QuestSystem.ListWindowSettings) this.CGMZ_setWindowSettings(CGMZ.QuestSystem.ListWindowSettings);
	if(Imported.CGMZ_WindowBackgrounds && CGMZ.QuestSystem.ListWindowBackground) this.CGMZ_setWindowBackground(CGMZ.QuestSystem.ListWindowBackground);
	this.refresh();
	this.activate();
};
//-----------------------------------------------------------------------------
// Update
//-----------------------------------------------------------------------------
CGMZ_Window_QuestList.prototype.update = function() {
	CGMZ_Window_Selectable.prototype.update.call(this);
	if(this.active && $cgmzTemp.isKeyPressed(CGMZ.QuestSystem.SortKey)) {
		this.callHandler('cgmzSort');
	}
};
//-----------------------------------------------------------------------------
// Select - also update updated flag
//-----------------------------------------------------------------------------
CGMZ_Window_QuestList.prototype.select = function(index) {
	CGMZ_Window_Selectable.prototype.select.call(this, index);
	this.setUpdatedFlag(index);
};
//-----------------------------------------------------------------------------
// Select - also update updated flag
//-----------------------------------------------------------------------------
CGMZ_Window_QuestList.prototype.setUpdatedFlag = function(index) {
	const item = this.item(index);
	if(item && !item.isCategory) {
		const quest = $cgmz.getQuest(item.questName);
		if(quest?._isUpdated) {
			quest._isUpdated = false;
			this.redrawItem(index);
		}
	}
};
//-----------------------------------------------------------------------------
// Max items
//-----------------------------------------------------------------------------
CGMZ_Window_QuestList.prototype.maxItems = function() {
	return this._data ? this._data.length : 1;
};
//-----------------------------------------------------------------------------
// Set new category. Used by individual instances to set category.
//-----------------------------------------------------------------------------
CGMZ_Window_QuestList.prototype.setNewCategory = function(item) {
	this._category = $cgmzTemp.getQuestCategory(item.name);
};
//-----------------------------------------------------------------------------
// Handling for when category is selected and OK press occurs
//-----------------------------------------------------------------------------
CGMZ_Window_QuestList.prototype.handleCategorySelection = function(item) {
	const category = $cgmzTemp.getQuestCategory(item.name);
	category._expanded = !category._expanded;
	this.refresh();
};
//-----------------------------------------------------------------------------
// Refresh
//-----------------------------------------------------------------------------
CGMZ_Window_QuestList.prototype.refresh = function() {
	this.makeItemList();
	CGMZ_Window_Selectable.prototype.refresh.call(this);
};
//-----------------------------------------------------------------------------
// Get included categories
//-----------------------------------------------------------------------------
CGMZ_Window_QuestList.prototype.getIncludedCategories = function() {
	const categories = [];
	const categoriesByType = $cgmzTemp.getQuestCategoriesByType($cgmzTemp._currentQuestCategorySortType);
	for(const category of CGMZ.QuestSystem.CategorySortOrder) {
		if(categoriesByType.includes(category)) {
			categories.push(category);
			categoriesByType.remove(category);
		}
	}
	for(const cat of categoriesByType) {
		categories.push(cat);
	}
	return categories;
};
//-----------------------------------------------------------------------------
// Get included quests
//-----------------------------------------------------------------------------
CGMZ_Window_QuestList.prototype.getIncludedQuests = function(name) {
	switch($cgmzTemp._currentQuestCategorySortType) {
		case "Category": return $cgmzTemp.getQuestsByCategory(name);
		case "Difficulty": return $cgmzTemp.getQuestsByDifficulty(name);
		case "Length": return $cgmzTemp.getQuestsByLength(name);
		case "Location": return $cgmzTemp.getQuestsByLocation(name);
	}
};
//-----------------------------------------------------------------------------
// Make item list
//-----------------------------------------------------------------------------
CGMZ_Window_QuestList.prototype.makeItemList = function() {
	this._data = [];
	const discoveredQuests = $cgmz.getDiscoveredQuests();
	const pinnedQuests = $cgmz.getPinnedQuests();
	const completedQuests = $cgmz.getCompletedQuests();
	const failedQuests = $cgmz.getFailedQuests();
	this.addSpecialCategory(pinnedQuests, [], CGMZ.QuestSystem.AlwaysShowPinnedCategory, CGMZ.QuestSystem.PinnedCategory);
	for(const categoryName of this.getIncludedCategories()) {
		const category = $cgmzTemp.getQuestCategory(categoryName);
		if(!category) {
			const script = "CGMZ_QuestSystem";
			const error = "Could not find Category [" + categoryName + "]";
			const suggestion = "Check that category exists in Categories parameter";
			CGMZ_Utils.reportError(error, script, suggestion);
			continue;
		}
		let categoryQuests = this.getIncludedQuests(category._name);
		categoryQuests = categoryQuests.filter(questName => discoveredQuests.includes(questName) && !pinnedQuests.includes(questName));
		if(CGMZ.QuestSystem.SeparateCompleteQuests) categoryQuests = categoryQuests.filter(questName => !completedQuests.includes(questName));
		if(CGMZ.QuestSystem.SeparateFailedQuests) categoryQuests = categoryQuests.filter(questName => !failedQuests.includes(questName));
		if(categoryQuests.length > 0) {
			const categoryObj = {level: 0, isCategory: true, name: category._name, amount: categoryQuests.length};
			this._data.push(categoryObj);
		}
		if(category._expanded) {
			for(const quest of categoryQuests) {
				const questObj = {level: 1, isCategory: false, heightMultiplier: CGMZ.QuestSystem.ListWindowEntryHeight, questName: quest};
				this._data.push(questObj);
			}
		}
	}
	if(CGMZ.QuestSystem.SeparateCompleteQuests) this.addSpecialCategory($cgmz.getCompletedQuests(), pinnedQuests, CGMZ.QuestSystem.AlwaysShowCompleteCategory, CGMZ.QuestSystem.CompleteCategory);
	if(CGMZ.QuestSystem.SeparateFailedQuests) this.addSpecialCategory($cgmz.getFailedQuests(), pinnedQuests, CGMZ.QuestSystem.AlwaysShowFailedCategory, CGMZ.QuestSystem.FailedCategory);
};
//-----------------------------------------------------------------------------
// Add a special category (pinned, failed, completed)
//-----------------------------------------------------------------------------
CGMZ_Window_QuestList.prototype.addSpecialCategory = function(questList, filterList, alwaysShow, categoryObject) {
	if(!categoryObject) return;
	if(filterList.length > 0) questList = questList.filter(quest => !filterList.includes(quest));
	if(questList.length === 0 && !alwaysShow) return;
	const category = $cgmzTemp.getQuestCategory(categoryObject.Name);
	const categoryObj = {level: 0, isCategory: true, name: category._name, amount: questList.length};
	this._data.push(categoryObj);
	if(category._expanded) {
		for(const quest of questList) {
			const questObj = {level: 1, isCategory: false, heightMultiplier: 2, questName: quest};
			this._data.push(questObj);
		}
	}
};
//-----------------------------------------------------------------------------
// Draw item in list.
//-----------------------------------------------------------------------------
CGMZ_Window_QuestList.prototype.drawItem = function(index) {
	const item = this._data[index];
	const rect = this.itemRectWithPadding(index);
	this.resetFontSettings();
	(item.isCategory) ? this.drawCategory(item, rect, index) : this.drawQuest(item, rect, index);
};
//-----------------------------------------------------------------------------
// Draw category in list
// index is not currently used, but passed for convenience
//-----------------------------------------------------------------------------
CGMZ_Window_QuestList.prototype.drawCategory = function(item, rect, index) {
	const icon = (CGMZ.QuestSystem.DrawIconInList && this._category._icon) ? `\\i[${this._category._icon}]` : "";
	const prefix = (this._category._expanded) ? "- " : "+ ";
	const string = `\\c[${this._category._textColor}]${prefix}${icon}${this._category._displayName} (${item.amount})\\c[0]`;
	this.CGMZ_drawTextLine(string, rect.x, rect.y, rect.width, 'left');
};
//-----------------------------------------------------------------------------
// Draw quest in list
//-----------------------------------------------------------------------------
CGMZ_Window_QuestList.prototype.drawQuest = function(item, rect, index) {
	const quest = $cgmzTemp.getQuest(item.questName);
	const isUpdated = $cgmz.getQuest(item.questName)._isUpdated;
	let xOffset = 0;
	if(quest._listImage) {
		const imageData = CGMZ_Utils.getImageData(quest._listImage, "img");
		const bitmap = ImageManager.loadBitmap(imageData.folder, imageData.filename);
		bitmap.addLoadListener(this.bltBitmap.bind(this, bitmap, rect, isUpdated));
		xOffset += 76;
	} else if(isUpdated) {
		this.drawUpdatedText(rect);
	}
	if(CGMZ.QuestSystem.ListShowRecLevel) {
		const recLevelColor = this.getTextCodeForRecLevel(quest._recommendedLevel);
		const recLevelString = `\\c[${recLevelColor}]${quest._recommendedLevel}\\c[0]`;
		this.CGMZ_drawTextLine(recLevelString, rect.x + xOffset, rect.y + this.lineHeight() / 2, rect.width, 'left');
		xOffset += this.CGMZ_textSizeEx(recLevelString).width + 4;
	}
	this.contents.fontSize -= 4;
	this.CGMZ_drawTextLine(item.questName, rect.x + xOffset, rect.y, rect.width - xOffset, 'left');
	this.CGMZ_drawTextLine(quest._location, rect.x + xOffset, rect.y + this.lineHeight(), rect.width - xOffset, 'left');
	const lineRect = this.itemRect(index);
	this.contentsBack.fillRect(lineRect.x - 8, lineRect.y, 4, lineRect.height + this.rowSpacing(), this._category._color1, true);
};
//-----------------------------------------------------------------------------
// Draw list image
//-----------------------------------------------------------------------------
CGMZ_Window_QuestList.prototype.bltBitmap = function(bitmap, rect, isUpdated) {
	this.contents.blt(bitmap, 0, 0, bitmap.width, bitmap.height, rect.x, rect.y + 2);
	if(isUpdated) this.drawUpdatedText(rect);
};
//-----------------------------------------------------------------------------
// Draw updated text
//-----------------------------------------------------------------------------
CGMZ_Window_QuestList.prototype.drawUpdatedText = function(rect) {
	this.CGMZ_drawTextLine(`\\c[${CGMZ.QuestSystem.UpdatedTextColor}]${CGMZ.QuestSystem.UpdatedText}\\c[0]`, rect.x, rect.y, rect.width, 'left');
};
//-----------------------------------------------------------------------------
// Set text color for recommended level
//-----------------------------------------------------------------------------
CGMZ_Window_QuestList.prototype.getTextCodeForRecLevel = function(recLevel) {
	const avgLevel = CGMZ_Utils.calcAvgPartyLevel();
	let levelDif = Math.abs(avgLevel - recLevel);
	if(avgLevel === recLevel) {
		return CGMZ.QuestSystem.RecLvlEqualColor;
	} else if(avgLevel > recLevel) {
		if(levelDif >= CGMZ.QuestSystem.RecLvlNegativeColors.length) levelDif = CGMZ.QuestSystem.RecLvlNegativeColors.length;
		return CGMZ.QuestSystem.RecLvlNegativeColors[levelDif - 1];
	} else {
		if(levelDif >= CGMZ.QuestSystem.RecLvlPositiveColors.length) levelDif = CGMZ.QuestSystem.RecLvlPositiveColors.length;
		return CGMZ.QuestSystem.RecLvlPositiveColors[levelDif - 1];
	}
};
//-----------------------------------------------------------------------------
// Set Display Window
//-----------------------------------------------------------------------------
CGMZ_Window_QuestList.prototype.setDisplayWindow = function(displayWindow) {
	this._displayWindow = displayWindow;
};
//-----------------------------------------------------------------------------
// Set Pin Window
//-----------------------------------------------------------------------------
CGMZ_Window_QuestList.prototype.setPinWindow = function(pinWindow) {
	this._pinWindow = pinWindow;
};
//-----------------------------------------------------------------------------
// Update helper windows
//-----------------------------------------------------------------------------
CGMZ_Window_QuestList.prototype.callUpdateHelp = function() {
	if(this.active && this._displayWindow) this._displayWindow.setItem(this.item());
	if(this.active && this._pinWindow) this._pinWindow.setItem(this.item());
};
//=============================================================================
// CGMZ_Window_QuestDisplay
//-----------------------------------------------------------------------------
// Window displaying quest information
//=============================================================================
function CGMZ_Window_QuestDisplay() {
	this.initialize.apply(this, arguments);
}
CGMZ_Window_QuestDisplay.prototype = Object.create(CGMZ_Window_Scrollable.prototype);
CGMZ_Window_QuestDisplay.prototype.constructor = CGMZ_Window_QuestDisplay;
//-----------------------------------------------------------------------------
// Initialize
//-----------------------------------------------------------------------------
CGMZ_Window_QuestDisplay.prototype.initialize = function(rect) {
	const heightMultiplier = 20; // maximum of 20 windows tall of data to scroll
	CGMZ_Window_Scrollable.prototype.initialize.call(this, rect, heightMultiplier, CGMZ.QuestSystem.ScrollWait, CGMZ.QuestSystem.ScrollSpeed, CGMZ.QuestSystem.AutoScroll, CGMZ.QuestSystem.ScrollDeceleration);
	if(Imported.CGMZ_WindowSettings && CGMZ.QuestSystem.DisplayWindowSettings) this.CGMZ_setWindowSettings(CGMZ.QuestSystem.DisplayWindowSettings);
	if(Imported.CGMZ_WindowBackgrounds && CGMZ.QuestSystem.DisplayWindowBackground) this.CGMZ_setWindowBackground(CGMZ.QuestSystem.DisplayWindowBackground);
	this._quest = "";
	this._questBackgroundImage = new Sprite();
	this._questBackgroundImage.hide();
	this._textBoxBackground = new Sprite(new Bitmap(this.contents.width, this.contents.height));
	this._textBoxBackground.bitmap.paintOpacity = CGMZ.QuestSystem.FadeSpriteOpacity;
	this._textBoxBackground.hide();
	this._textSprite = new Sprite(new Bitmap(this.contents.width, this.lineHeight()));
	this._textSprite.bitmap.fontFace = $gameSystem.mainFontFace();
	this._textSprite.bitmap.fontSize = $gameSystem.mainFontSize();
	this._textSprite.bitmap.fontBold = true;
	this._textSprite.hide();
	this.addInnerChild(this._questBackgroundImage);
	this.addInnerChild(this._textBoxBackground);
	this.addInnerChild(this._textSprite);
	this.deactivate();
};
//-----------------------------------------------------------------------------
// Force a Refresh
//-----------------------------------------------------------------------------
CGMZ_Window_QuestDisplay.prototype.forceRefresh = function() {
	const temp = this._quest;
	this.setItem(null);
	this.setItem(temp);
};
//-----------------------------------------------------------------------------
// Set the quest to be displayed (do nothing if already being displayed)
//-----------------------------------------------------------------------------
CGMZ_Window_QuestDisplay.prototype.setItem = function(quest) {
	if(this._quest === quest) return;
	this._quest = quest;
	this.setupWindowForNewEntry();
	this.refresh();
};
//-----------------------------------------------------------------------------
// Refresh
//-----------------------------------------------------------------------------
CGMZ_Window_QuestDisplay.prototype.refresh = function() {
	if(!this._quest) return;
	this._questBackgroundImage.hide();
	this._textBoxBackground.hide();
	this._textSprite.hide();
	this._neededHeight = 0;
	if(this._quest.isCategory) {
		if(CGMZ.QuestSystem.DrawCategoryInformation) this.drawCategoryInfo();
	} else {
		this.loadQuestImage();
	}
};
//-----------------------------------------------------------------------------
// Draw Category Info
//-----------------------------------------------------------------------------
CGMZ_Window_QuestDisplay.prototype.drawCategoryInfo = function() {
	const category = $cgmzTemp.getQuestCategory(this._quest.name);
	this.contents.fontBold = true;
	this.CGMZ_drawTextLine(category._displayName, 0, 0, this.contents.width, 'center');
	this.contents.fontBold = false;
	this._neededHeight += this.CGMZ_drawText(category._description, 0, 0, this.lineHeight(), this.contents.width);
	this._neededHeight += this.padding * 2;
	this.checkForScroll();
};
//-----------------------------------------------------------------------------
// Draw Quest Info
//-----------------------------------------------------------------------------
CGMZ_Window_QuestDisplay.prototype.loadQuestImage = function() {
	const quest = $cgmzTemp.getQuest(this._quest.questName);
	const questState = $cgmz.getQuest(this._quest.questName);
	if(quest._backgroundImage) {
		const imageData = CGMZ_Utils.getImageData(quest._backgroundImage, "img");
		this._questBackgroundImage.bitmap = ImageManager.loadBitmap(imageData.folder, imageData.filename);
		this._questBackgroundImage.bitmap.addLoadListener(this.drawQuestInfo.bind(this, quest, questState, true));
	} else {
		this.drawQuestInfo(quest, questState, false);
	}
};
//-----------------------------------------------------------------------------
// Draw Quest Text Info
//-----------------------------------------------------------------------------
CGMZ_Window_QuestDisplay.prototype.drawQuestInfo = function(quest, questState, showImage) {
	const dividerOpts = {drawDividers: CGMZ.QuestSystem.DividerLines, padding: (CGMZ.QuestSystem.DividerPadding >= 0) ? CGMZ.QuestSystem.DividerPadding : null};
	if(showImage) {
		let scale = 1;
		if(this._questBackgroundImage.width > this.contents.width) {
			scale = this._questBackgroundImage.width / this.contents.width;
		}
		this._questBackgroundImage.scale.x = scale;
		this._questBackgroundImage.show();
		this._textBoxBackground.bitmap.clear();
		const rectY = 0;
		const width = this.textWidth(quest._name) + this.padding * 2;
		const x = this.contents.width / 2 - width / 2;
		const height = this.lineHeight();
		const rect = new Rectangle(x, rectY, width, height);
		this._textBoxBackground.bitmap.fillRect(x, this._neededHeight, width, this.lineHeight(), "#000000");
		this._textBoxBackground.show();
		this._textSprite.bitmap.clear();
		this._textSprite.bitmap.drawText(quest._name, 0, 0, this.contents.width, this.lineHeight(), 'center');
		this._textSprite.show();
		this._neededHeight += this._questBackgroundImage.height;
	} else {
		this.contents.fontBold = true;
		this._neededHeight += this.CGMZ_drawTextLine(quest._name, 0, 0, this.contents.width, 'center');
		this.contents.fontBold = false;
	}
	for(const infoType of CGMZ.QuestSystem.QuestInfoOrder) {
		switch(infoType) {
			case "Divider - Info": this._neededHeight += this.CGMZ_drawHeader(CGMZ.QuestSystem.InfoText, this._neededHeight, CGMZ.QuestSystem.HeaderGradientColor1, CGMZ.QuestSystem.HeaderGradientColor2, dividerOpts); break;
			case "Divider - Description": this._neededHeight += this.CGMZ_drawHeader(CGMZ.QuestSystem.DescriptionText, this._neededHeight, CGMZ.QuestSystem.HeaderGradientColor1, CGMZ.QuestSystem.HeaderGradientColor2, dividerOpts); break;
			case "Divider - Objectives": this._neededHeight += this.CGMZ_drawHeader(CGMZ.QuestSystem.ObjectivesText, this._neededHeight, CGMZ.QuestSystem.HeaderGradientColor1, CGMZ.QuestSystem.HeaderGradientColor2, dividerOpts); break;
			case "Divider - Rewards":
				if(quest.hasRewards()) {
					this._neededHeight += this.CGMZ_drawHeader(CGMZ.QuestSystem.RewardsText, this._neededHeight, CGMZ.QuestSystem.HeaderGradientColor1, CGMZ.QuestSystem.HeaderGradientColor2, dividerOpts);
				}
				break;
			case "Completion Date": this.drawCompletionDate(questState._completionDate); break;
			case "Type": this.drawCategory(quest._category); break;
			case "Difficulty": this.drawDifficulty(quest._difficulty); break;
			case "Length": this.drawLength(quest._length); break;
			case "Location": this.drawLocation(quest._location); break;
			case "Quest Giver": this.drawQuestGiver(quest._questGiver); break;
			case "Recommended Level": this.drawRecommendedLevel(quest._recommendedLevel); break;
			case "Missable": this.drawMissable(quest._missable); break;
			case "Description": this.drawDescription(quest, questState); break;
			case "Objectives": this.drawObjectives(quest, questState); break;
			case "Rewards":
				if(quest.hasRewards()) {
					this.drawRewards(quest);
				}
				break;
			case 'Blank Line': this._neededHeight += this.lineHeight(); break;
			case 'Custom Space': this._neededHeight += CGMZ.QuestSystem.CustomSpace; break;
		}
	}
	this._neededHeight += this.padding * 2;
	this.checkForScroll();
};
//-----------------------------------------------------------------------------
// Draw Standard Line
//-----------------------------------------------------------------------------
CGMZ_Window_QuestDisplay.prototype.drawStandardLine = function(label, string) {
	this._neededHeight += this.CGMZ_drawTextLine(`\\c[${CGMZ.QuestSystem.LabelTextColor}]${label}\\c[0]${string}`, 0, this._neededHeight, this.contents.width, 'left');
};
//-----------------------------------------------------------------------------
// Draw Completion Date
//-----------------------------------------------------------------------------
CGMZ_Window_QuestDisplay.prototype.drawCompletionDate = function(date) {
	if(!date) return;
	const label = CGMZ.QuestSystem.CompletionText;
	this.drawStandardLine(label, date);
};
//-----------------------------------------------------------------------------
// Draw Category
//-----------------------------------------------------------------------------
CGMZ_Window_QuestDisplay.prototype.drawCategory = function(category) {
	const label = CGMZ.QuestSystem.CategoryText;
	this.drawStandardLine(label, category);
};
//-----------------------------------------------------------------------------
// Draw Difficulty
//-----------------------------------------------------------------------------
CGMZ_Window_QuestDisplay.prototype.drawDifficulty = function(difficulty) {
	const label = CGMZ.QuestSystem.DifficultyText;
	this.drawStandardLine(label, difficulty);
};
//-----------------------------------------------------------------------------
// Draw Length
//-----------------------------------------------------------------------------
CGMZ_Window_QuestDisplay.prototype.drawLength = function(length) {
	const label = CGMZ.QuestSystem.LengthText;
	this.drawStandardLine(label, length);
};
//-----------------------------------------------------------------------------
// Draw Location
//-----------------------------------------------------------------------------
CGMZ_Window_QuestDisplay.prototype.drawLocation = function(loc) {
	const label = CGMZ.QuestSystem.LocationText;
	this.drawStandardLine(label, loc);
};
//-----------------------------------------------------------------------------
// Draw Quest Giver
//-----------------------------------------------------------------------------
CGMZ_Window_QuestDisplay.prototype.drawQuestGiver = function(questGiver) {
	const label = CGMZ.QuestSystem.QuestGiverText;
	this.drawStandardLine(label, questGiver);
};
//-----------------------------------------------------------------------------
// Draw Recommended Level
//-----------------------------------------------------------------------------
CGMZ_Window_QuestDisplay.prototype.drawRecommendedLevel = function(recommendedLevel) {
	const label = CGMZ.QuestSystem.RecommendedLevelText;
	this.drawStandardLine(label, recommendedLevel);
};
//-----------------------------------------------------------------------------
// Draw Missable flag
//-----------------------------------------------------------------------------
CGMZ_Window_QuestDisplay.prototype.drawMissable = function(missable) {
	const label = CGMZ.QuestSystem.MissableText;
	const flag = (missable) ? CGMZ.QuestSystem.YesText : CGMZ.QuestSystem.NoText;
	this.drawStandardLine(label, flag);
};
//-----------------------------------------------------------------------------
// Draw Description
//-----------------------------------------------------------------------------
CGMZ_Window_QuestDisplay.prototype.drawDescription = function(quest, questState) {
	let description = (questState._isCompleted) ? quest._completedDescription : (questState._isFailed) ? quest._failedDescription : quest._descriptions[questState._stage - 1];
	if(!description) description = quest._descriptions[quest._descriptions.length - 1];
	this._neededHeight += this.CGMZ_drawText(description, 0, 0, this._neededHeight, this.contents.width);
};
//-----------------------------------------------------------------------------
// Draw Rewards
//-----------------------------------------------------------------------------
CGMZ_Window_QuestDisplay.prototype.drawRewards = function(quest) {
	if(!quest._hideRewardExp && (quest._rewardExp > 0 || CGMZ.QuestSystem.AlwaysShowExpReward)) {
		this.drawStandardLine(CGMZ.QuestSystem.ExpText, quest._rewardExp.toLocaleString());
	}
	if(!quest._hideRewardGold && (quest._rewardGold > 0 || CGMZ.QuestSystem.AlwaysShowGoldReward)) {
		this.drawStandardLine(CGMZ.QuestSystem.GoldText, quest._rewardGold.toLocaleString() + " " + TextManager.currencyUnit);
	}
	for(const reward of quest._autoRewards) {
		if(reward.hide) continue;
		if(reward.type === 'dropTable') {
			this._neededHeight += this.CGMZ_drawTextLine(reward.description, 0, this._neededHeight, this.contents.width);
		} else {
			const item = CGMZ_Utils.lookupItem(reward.type, reward.id);
			if(item) {
				const string = `${reward.amount}x \\i[${item.iconIndex}]${item.name}`;
				this._neededHeight += this.CGMZ_drawTextLine(string, 0, this._neededHeight, this.contents.width);
			}
		}
	}
	for(const customReward of quest._customRewards) {
		this._neededHeight += this.CGMZ_drawText(customReward, 0, 0, this._neededHeight, this.contents.width);
	}
};
//-----------------------------------------------------------------------------
// Draw Objectives
//-----------------------------------------------------------------------------
CGMZ_Window_QuestDisplay.prototype.drawObjectives = function(quest, questState) {
	if(!questState._isStarted) {
		this._neededHeight += this.CGMZ_drawText(quest._unstartedObjective, 0, 0, this._neededHeight, this.contents.width);
	}
	const stage = questState._stage;
	const isFailed = questState._isFailed;
	let objectives = quest.getObjectivesOfStage(stage);
	this.drawObjectivesFromObjectiveArray(objectives, questState, false, isFailed);
	if(CGMZ.QuestSystem.AlwaysShowPastObjectives || questState._isCompleted) {
		this.changePaintOpacity(false);
		for(let i = stage - 1; i > 0; i--) {
			objectives = quest.getObjectivesOfStage(i);
			if(objectives.length === 0) break;
			this.drawObjectivesFromObjectiveArray(objectives, questState, true, isFailed);
		}
		this.changePaintOpacity(true);
	}
};
//-----------------------------------------------------------------------------
// Draw Objectives from an array of objectives
//-----------------------------------------------------------------------------
CGMZ_Window_QuestDisplay.prototype.drawObjectivesFromObjectiveArray = function(objectives, questState, isPastStage, isFailed) {
	for(const objective of objectives) {
		if(objective.autoTrack) {
			const completed = questState.isObjectiveComplete(objective.id);
			this.drawAutoTrackObjective(questState, objective, completed, isPastStage, isFailed);
		} else {
			this.drawManualObjective(questState, objective, isPastStage, isFailed);
		}
	}
};
//-----------------------------------------------------------------------------
// Draw Manually Tracked Objectives
//-----------------------------------------------------------------------------
CGMZ_Window_QuestDisplay.prototype.drawManualObjective = function(questState, objective, isPastStage, isFailed) {
	const maxProgress = objective.maxProgress;
	const progress = questState.getObjectiveProgress(objective.id, maxProgress);
	let progressString = " (" + progress + "/" + maxProgress + ")";
	if(maxProgress <= 1) {
		progressString = "";
	}
	this.drawObjective(objective.description + progressString, progress >= maxProgress, isPastStage, isFailed, questState);
};
//-----------------------------------------------------------------------------
// Draw Automatically Tracked Objectives
//-----------------------------------------------------------------------------
CGMZ_Window_QuestDisplay.prototype.drawAutoTrackObjective = function(questState, objective, completed, isPastStage, isFailed) {
	if(objective.goldTracking > 0) {
		this.drawGoldObjective(questState, objective, completed, isPastStage, isFailed);
	} else if(objective.variableTracking > 0) {
		this.drawVariableObjective(questState, objective, completed, isPastStage, isFailed);
	} else if(objective.hasOwnProperty('otherTracking')) {
		this.drawItemObjective(questState, objective, completed, isPastStage, isFailed);
	} else if(objective.switchTracking > 0) {
		this.drawSwitchObjective(questState, objective, completed, isPastStage, isFailed);
	}
};
//-----------------------------------------------------------------------------
// Draw automatic gold objective
//-----------------------------------------------------------------------------
CGMZ_Window_QuestDisplay.prototype.drawGoldObjective = function(questState, objective, completed, isPastStage, isFailed) {
	const maxProgress = objective.goldTracking;
	const progress = (completed) ? maxProgress : (isFailed || isPastStage) ? questState.getObjectiveProgress(objective.id, maxProgress) : $gameParty.gold();
	const progressString = ` (${progress}/${maxProgress})`;
	this.drawObjective(objective.description + progressString, progress >= maxProgress, isPastStage, isFailed, questState);
};
//-----------------------------------------------------------------------------
// Draw automatic variable objective
//-----------------------------------------------------------------------------
CGMZ_Window_QuestDisplay.prototype.drawVariableObjective = function(questState, objective, completed, isPastStage, isFailed) {
	const maxProgress = objective.maxProgress;
	const progress = (completed) ? maxProgress : (isFailed || isPastStage) ? questState.getObjectiveProgress(objective.id, maxProgress) : $gameVariables.value(objective.variableTracking);
	const progressString = ` (${progress}/${maxProgress})`;
	this.drawObjective(objective.description + progressString, progress >= maxProgress, isPastStage, isFailed, questState);
};
//-----------------------------------------------------------------------------
// Draw automatic item objective
//-----------------------------------------------------------------------------
CGMZ_Window_QuestDisplay.prototype.drawItemObjective = function(questState, objective, completed, isPastStage, isFailed) {
	const item = CGMZ_Utils.lookupItem(objective.otherTracking.type, objective.otherTracking.id);
	const maxProgress = objective.otherTracking.amount;
	const progress = (completed) ? maxProgress : (isFailed || isPastStage) ? questState.getObjectiveProgress(objective.id, maxProgress) : $gameParty.numItems(item);
	const progressString = ` (${progress}/${maxProgress})`;
	this.drawObjective(objective.description + progressString, progress >= maxProgress, isPastStage, isFailed, questState);
};
//-----------------------------------------------------------------------------
// Draw automatic switch objective
//-----------------------------------------------------------------------------
CGMZ_Window_QuestDisplay.prototype.drawSwitchObjective = function(questState, objective, completed, isPastStage, isFailed) {
	const maxProgress = 1;
	const progress = (completed) ? maxProgress : (isFailed) ? 0 : ($gameSwitches.value(objective.switchTracking)) ? 1 : 0;
	const progressString = ` (${progress}/${maxProgress})`;
	this.drawObjective(objective.description + progressString, progress >= maxProgress, isPastStage, isFailed, questState);
};
//-----------------------------------------------------------------------------
// Draw an objective
//-----------------------------------------------------------------------------
CGMZ_Window_QuestDisplay.prototype.drawObjective = function(string, complete, isPastStage, isFailed, questState) {
	this.contents.strokeRect(2, this._neededHeight + 2, 28, 28, '#FFFFFF');
	if(complete || (questState._isCompleted && CGMZ.QuestSystem.ObjectivesCompleteWithQuest)) {
		this.drawIcon(CGMZ.QuestSystem.ObjectiveCompleteIcon, 0, this._neededHeight);
	} else if(isPastStage || isFailed) {
		this.drawIcon(CGMZ.QuestSystem.ObjectiveFailedIcon, 0, this._neededHeight);
	}
	this._neededHeight += this.CGMZ_drawText(string, 0, 40, this._neededHeight, this.contents.width);
};
//=============================================================================
// Sprite_Button
//-----------------------------------------------------------------------------
// Add sort button
//=============================================================================
//-----------------------------------------------------------------------------
// If undefined, check if sort button and return expected results
//-----------------------------------------------------------------------------
const alias_CGMZ_QuestSystem_SpriteButton_buttonData = Sprite_Button.prototype.buttonData;
Sprite_Button.prototype.buttonData = function() {
	data = alias_CGMZ_QuestSystem_SpriteButton_buttonData.call(this);
	if(data) return data;
	const CGMZQuestSystemButtonTable = {
		cgmzSort: {x: CGMZ.QuestSystem.SortButtonOffset, w: CGMZ.QuestSystem.SortButtonWidth}
	};
	return CGMZQuestSystemButtonTable[this._buttonType];
};
//=============================================================================
// Game_Party
//-----------------------------------------------------------------------------
// Check automatic quest gold and item objectives when changing gold / items
//=============================================================================
//-----------------------------------------------------------------------------
// Also check quest automatic gold objectives
//-----------------------------------------------------------------------------
const alias_CGMZ_QuestSystem_GameParty_gainGold = Game_Party.prototype.gainGold;
Game_Party.prototype.gainGold = function(amount) {
	alias_CGMZ_QuestSystem_GameParty_gainGold.call(this, amount);
	$cgmzTemp.checkAutomaticGoldQuests();
};
//-----------------------------------------------------------------------------
// Also check quest automatic item objectives
//-----------------------------------------------------------------------------
const alias_CGMZ_QuestSystem_GameParty_gainItem = Game_Party.prototype.gainItem;
Game_Party.prototype.gainItem = function(item, amount, includeEquip) {
	alias_CGMZ_QuestSystem_GameParty_gainItem.call(this, item, amount, includeEquip);
	$cgmzTemp.checkAutomaticItemQuests();
};
//=============================================================================
// Game_Variables
//-----------------------------------------------------------------------------
// Check automatic quest variable objectives when changing variables
//=============================================================================
//-----------------------------------------------------------------------------
// Also check quest automatic variable objectives
//-----------------------------------------------------------------------------
const alias_CGMZ_QuestSystem_GameVariables_setValue = Game_Variables.prototype.setValue;
Game_Variables.prototype.setValue = function(variableId, value) {
	alias_CGMZ_QuestSystem_GameVariables_setValue.call(this, variableId, value);
	$cgmzTemp.checkAutomaticVariableQuests();
};
//=============================================================================
// Game_Switches
//-----------------------------------------------------------------------------
// Check automatic quest switch objectives when changing switches
//=============================================================================
//-----------------------------------------------------------------------------
// Also check quest automatic switch objectives
//-----------------------------------------------------------------------------
const alias_CGMZ_QuestSystem_GameSwitches_setValue = Game_Switches.prototype.setValue;
Game_Switches.prototype.setValue = function(switchId, value) {
	alias_CGMZ_QuestSystem_GameSwitches_setValue.call(this, switchId, value);
	$cgmzTemp.checkAutomaticSwitchQuests();
};
//=============================================================================
// CGMZ_Scene_QuestSystemAcceptQuest
//-----------------------------------------------------------------------------
// Handle the quest scene where players can accept / decline a single quest
//=============================================================================
function CGMZ_Scene_QuestSystemAcceptQuest() {
	this.initialize.apply(this, arguments);
}
CGMZ_Scene_QuestSystemAcceptQuest.prototype = Object.create(Scene_MenuBase.prototype);
CGMZ_Scene_QuestSystemAcceptQuest.prototype.constructor = CGMZ_Scene_QuestSystemAcceptQuest;
//-----------------------------------------------------------------------------
// Initialize
//-----------------------------------------------------------------------------
CGMZ_Scene_QuestSystemAcceptQuest.prototype.initialize = function() {
	Scene_MenuBase.prototype.initialize.call(this);
	this._quest = "";
	this._switch = 0;
	this._se = {name:"",volume:90,pitch:100,pan:0};
	this._allowDecline = true;
};
//-----------------------------------------------------------------------------
// Prepare the scene
//-----------------------------------------------------------------------------
CGMZ_Scene_QuestSystemAcceptQuest.prototype.prepare = function(obj) {
	this._quest = obj.quest;
	this._switch = obj.gameSwitch;
	if(obj.se?.name) this._se = obj.se;
	this._disableDecline = obj.disableDecline;
};
//-----------------------------------------------------------------------------
// Create scene windows
//-----------------------------------------------------------------------------
CGMZ_Scene_QuestSystemAcceptQuest.prototype.create = function() {
	Scene_MenuBase.prototype.create.call(this);
	this.createDisplayWindow();
	this.createCommandWindow();
};
//-----------------------------------------------------------------------------
// Create display window
//-----------------------------------------------------------------------------
CGMZ_Scene_QuestSystemAcceptQuest.prototype.createDisplayWindow = function() {
	const rect = this.displayWindowRect();
	this._displayWindow = new CGMZ_Window_QuestPromptDisplay(rect, this._quest);
	this.addWindow(this._displayWindow);
};
//-----------------------------------------------------------------------------
// Get display window rect
//-----------------------------------------------------------------------------
CGMZ_Scene_QuestSystemAcceptQuest.prototype.displayWindowRect = function() {
	const width = Graphics.boxWidth * 0.8;
	const height = Graphics.boxHeight  * 0.6;
	const x = Graphics.boxWidth / 2 - width / 2;
	const y = Graphics.boxHeight / 2 - height / 2 - this.calcWindowHeight(1, true) / 2;
	return new Rectangle(x, y, width, height);
};
//-----------------------------------------------------------------------------
// Create command window
//-----------------------------------------------------------------------------
CGMZ_Scene_QuestSystemAcceptQuest.prototype.createCommandWindow = function() {
	const rect = this.commandWindowRect();
	this._commandWindow = new CGMZ_Window_QuestPromptCommand(rect, this._se, this._disableDecline);
	this._commandWindow.setHandler('accept', this.onAccept.bind(this));
	if(!this._disableDecline) {
		this._commandWindow.setHandler('decline', this.onDecline.bind(this));
		if(CGMZ.QuestSystem.AllowCancelInAcceptScene) this._commandWindow.setHandler('cancel', this.onDecline.bind(this));
	}
	this.addWindow(this._commandWindow);
};
//-----------------------------------------------------------------------------
// Get command window rect
//-----------------------------------------------------------------------------
CGMZ_Scene_QuestSystemAcceptQuest.prototype.commandWindowRect = function() {
	const width = this._displayWindow.width;
	const height = this.calcWindowHeight(1, true);
	const x = this._displayWindow.x;
	const y = this._displayWindow.y + this._displayWindow.height;
	return new Rectangle(x, y, width, height);
};
//-----------------------------------------------------------------------------
// On quest accept
//-----------------------------------------------------------------------------
CGMZ_Scene_QuestSystemAcceptQuest.prototype.onAccept = function() {
	if(this._se.name) AudioManager.playSe(this._se);
	$cgmz.startQuest(this._quest, true, true);
	$gameSwitches.setValue(this._switch, true);
	$cgmzTemp.questBoardQuestAccepted = true;
	this.popScene();
};
//-----------------------------------------------------------------------------
// On quest decline
//-----------------------------------------------------------------------------
CGMZ_Scene_QuestSystemAcceptQuest.prototype.onDecline = function() {
	if(this._se.name) SoundManager.playCancel();
	if(CGMZ.QuestSystem.QuestAcceptSceneDiscovers) $cgmz.discoverQuest(this._quest, true);
	$gameSwitches.setValue(this._switch, false);
	this.popScene();
};
//-----------------------------------------------------------------------------
// Get the scene's custom scene background
// No need to check if Scene Backgrounds is installed because this custom func
// is only called by that plugin
//-----------------------------------------------------------------------------
CGMZ_Scene_QuestSystemAcceptQuest.prototype.CGMZ_getCustomSceneBackground = function() {
	const quest = $cgmzTemp.getQuest(this._quest);
	return $cgmzTemp.sceneBackgroundPresets[quest?._acceptSceneImage];
};
//-----------------------------------------------------------------------------
// Do not show cancel button
//-----------------------------------------------------------------------------
CGMZ_Scene_QuestSystemAcceptQuest.prototype.needsCancelButton = function() {
	return CGMZ.QuestSystem.AllowCancelInAcceptScene && !this._disableDecline;
};
//=============================================================================
// CGMZ_Window_QuestPromptCommand
//-----------------------------------------------------------------------------
// Command window for choosing to accept / decline a quest
//=============================================================================
function CGMZ_Window_QuestPromptCommand(rect) {
	this.initialize.apply(this, arguments);
}
CGMZ_Window_QuestPromptCommand.prototype = Object.create(Window_HorzCommand.prototype);
CGMZ_Window_QuestPromptCommand.prototype.constructor = CGMZ_Window_QuestPromptCommand;
//-----------------------------------------------------------------------------
// Initialize
//-----------------------------------------------------------------------------
CGMZ_Window_QuestPromptCommand.prototype.initialize = function(rect, se, disableDecline) {
	this._disableDecline = disableDecline;
	Window_HorzCommand.prototype.initialize.call(this, rect);
	if(Imported.CGMZ_WindowSettings && CGMZ.QuestSystem.QuestAcceptCommandWindowSettings) this.CGMZ_setWindowSettings(CGMZ.QuestSystem.QuestAcceptCommandWindowSettings);
	if(Imported.CGMZ_WindowBackgrounds && CGMZ.QuestSystem.QuestAcceptCommandWindowBackground) this.CGMZ_setWindowBackground(CGMZ.QuestSystem.QuestAcceptCommandWindowBackground);
	this._hasSound = !!(se?.name);
};
//-----------------------------------------------------------------------------
// Max columns to display
//-----------------------------------------------------------------------------
CGMZ_Window_QuestPromptCommand.prototype.maxCols = function() {
	return (this._disableDecline) ? 1 : 2;
};
//-----------------------------------------------------------------------------
// Make list of commands to display
//-----------------------------------------------------------------------------
CGMZ_Window_QuestPromptCommand.prototype.makeCommandList = function() {
	this.addCommand(CGMZ.QuestSystem.AcceptText, 'accept', true);
	if(!this._disableDecline) this.addCommand(CGMZ.QuestSystem.DeclineText, 'decline', true);
};
//-----------------------------------------------------------------------------
// Only play ok sound if there is not a special quest sound
//-----------------------------------------------------------------------------
CGMZ_Window_QuestPromptCommand.prototype.playOkSound = function() {
    if(!this._hasSound) Window_HorzCommand.prototype.playOkSound.call(this);
};
//=============================================================================
// CGMZ_Window_QuestPromptDisplay
//-----------------------------------------------------------------------------
// Window displaying quest information during accept / decline scene
//=============================================================================
function CGMZ_Window_QuestPromptDisplay() {
	this.initialize.apply(this, arguments);
}
CGMZ_Window_QuestPromptDisplay.prototype = Object.create(CGMZ_Window_Scrollable.prototype);
CGMZ_Window_QuestPromptDisplay.prototype.constructor = CGMZ_Window_QuestPromptDisplay;
//-----------------------------------------------------------------------------
// Initialize
//-----------------------------------------------------------------------------
CGMZ_Window_QuestPromptDisplay.prototype.initialize = function(rect, quest) {
	const heightMultiplier = 20; // maximum of 20 windows tall of data to scroll
	CGMZ_Window_Scrollable.prototype.initialize.call(this, rect, heightMultiplier, CGMZ.QuestSystem.ScrollWait, CGMZ.QuestSystem.ScrollSpeed, CGMZ.QuestSystem.AutoScroll, CGMZ.QuestSystem.ScrollDeceleration);
	if(Imported.CGMZ_WindowSettings && CGMZ.QuestSystem.QuestAcceptWindowSettings) this.CGMZ_setWindowSettings(CGMZ.QuestSystem.QuestAcceptWindowSettings);
	if(Imported.CGMZ_WindowBackgrounds && CGMZ.QuestSystem.QuestAcceptWindowBackground) this.CGMZ_setWindowBackground(CGMZ.QuestSystem.QuestAcceptWindowBackground);
	this._quest = quest;
	this._neededHeight = 0;
	this.deactivate();
	this.setupWindowForNewEntry();
	this.requestRefresh();
};
//-----------------------------------------------------------------------------
// Refresh
//-----------------------------------------------------------------------------
CGMZ_Window_QuestPromptDisplay.prototype.refresh = function() {
	const quest = $cgmzTemp.getQuest(this._quest);
	if(!quest) return;
	const dividerOpts = {drawDividers: CGMZ.QuestSystem.DividerLines, padding: (CGMZ.QuestSystem.DividerPadding >= 0) ? CGMZ.QuestSystem.DividerPadding : null};
	this.contents.fontBold = true;
	this._neededHeight += this.CGMZ_drawTextLine(CGMZ.QuestSystem.NewQuestText + quest._name, 0, 0, this.contents.width, 'center');
	this.contents.fontBold = false;
	this._neededHeight += this.CGMZ_drawText(quest._unstartedDescription, 0, 0, this._neededHeight, this.contents.width);
	this._neededHeight += this.CGMZ_drawHeader(CGMZ.QuestSystem.RewardsText, this._neededHeight, CGMZ.QuestSystem.HeaderGradientColor1, CGMZ.QuestSystem.HeaderGradientColor2, dividerOpts);
	this.drawRewards(quest);
};
//-----------------------------------------------------------------------------
// Draw Standard Line
//-----------------------------------------------------------------------------
CGMZ_Window_QuestPromptDisplay.prototype.drawStandardLine = function(label, string) {
	this._neededHeight += this.CGMZ_drawTextLine(`\\c[${CGMZ.QuestSystem.LabelTextColor}]${label}\\c[0]${string}`, 0, this._neededHeight, this.contents.width, 'left');
};
//-----------------------------------------------------------------------------
// Draw Rewards
//-----------------------------------------------------------------------------
CGMZ_Window_QuestPromptDisplay.prototype.drawRewards = function(quest) {
	let label = CGMZ.QuestSystem.ExpText;
	if(!quest._hideRewardExp) this.drawStandardLine(label, quest._rewardExp.toLocaleString());
	label = CGMZ.QuestSystem.GoldText;
	if(!quest._hideRewardGold) this.drawStandardLine(label, quest._rewardGold.toLocaleString() + " " + TextManager.currencyUnit);
	for(const reward of quest._autoRewards) {
		if(reward.hide) continue;
		if(reward.type === 'dropTable') {
			this._neededHeight += this.CGMZ_drawTextLine(reward.description, 0, this._neededHeight, this.contents.width);
		} else {
			const item = CGMZ_Utils.lookupItem(reward.type, reward.id);
			if(item) {
				const string = reward.amount + 'x \\i[' + item.iconIndex + ']' + item.name;
				this._neededHeight += this.CGMZ_drawTextLine(string, 0, this._neededHeight, this.contents.width);
			}
		}
	}
	for(const customReward of quest._customRewards) {
		this._neededHeight += this.CGMZ_drawText(customReward, 0, 0, this._neededHeight, this.contents.width);
	}
};
//=============================================================================
// CGMZ_Scene_QuestSystemQuestBoard
//-----------------------------------------------------------------------------
// Handle the quest scene where players can choose from a list of quests which
// ones they want to accept.
//=============================================================================
function CGMZ_Scene_QuestSystemQuestBoard() {
	this.initialize.apply(this, arguments);
}
CGMZ_Scene_QuestSystemQuestBoard.prototype = Object.create(Scene_MenuBase.prototype);
CGMZ_Scene_QuestSystemQuestBoard.prototype.constructor = CGMZ_Scene_QuestSystemQuestBoard;
//-----------------------------------------------------------------------------
// Initialize
//-----------------------------------------------------------------------------
CGMZ_Scene_QuestSystemQuestBoard.prototype.initialize = function() {
	Scene_MenuBase.prototype.initialize.call(this);
	const settings = $cgmzTemp.getQuestBoardSettings();
	this._questList = settings.questList;
	this._sceneBackground = settings.background;
	this._name = settings.name;
	this._categoryIconType = settings.categoryIcons;
	this._showLegend = settings.legend;
	this._exitOnAccept = settings.exitOnAccept;
	this._se = settings.se;
};
//-----------------------------------------------------------------------------
// Create scene windows
//-----------------------------------------------------------------------------
CGMZ_Scene_QuestSystemQuestBoard.prototype.create = function() {
	const previousScene = SceneManager.isPreviousScene(CGMZ_Scene_QuestSystemAcceptQuest);
	if(previousScene && this._exitOnAccept && $cgmzTemp.questBoardQuestAccepted) {
		$cgmzTemp.questBoardQuestAccepted = false;
		this.popScene();
		return;
	}
	$cgmzTemp.questBoardQuestAccepted = false;
	Scene_MenuBase.prototype.create.call(this);
	this.createQuestBoardWindow();
	if(this._name) {
		this.createQuestBoardNameWindow();
	}
	if(this._showLegend) {
		this.createQuestBoardLegendWindow();
	}
};
//-----------------------------------------------------------------------------
// Create quest board window
//-----------------------------------------------------------------------------
CGMZ_Scene_QuestSystemQuestBoard.prototype.createQuestBoardWindow = function() {
	const rect = this.questBoardWindowRect();
	this._questBoardWindow = new CGMZ_Window_QuestBoardSelectable(rect, this._questList, this._categoryIconType);
	this._questBoardWindow.setHandler('ok', this.onQuestSelect.bind(this));
	this._questBoardWindow.setHandler('cancel', this.popScene.bind(this));
	this.addWindow(this._questBoardWindow);
};
//-----------------------------------------------------------------------------
// Get quest board window rect
//-----------------------------------------------------------------------------
CGMZ_Scene_QuestSystemQuestBoard.prototype.questBoardWindowRect = function() {
	const showBoth = !!this._name && this._showLegend;
	const width = Graphics.boxWidth * 0.8;
	const height = Graphics.boxHeight * 0.8;
	const x = (Graphics.boxWidth  - width) / 2;
	const y = Graphics.boxHeight / 2 - height / 2 + (!!this._name * this.calcWindowHeight(1, false)) - (showBoth * this.calcWindowHeight(1, false));
	return new Rectangle(x, y, width, height);
};
//-----------------------------------------------------------------------------
// Create quest board name window
//-----------------------------------------------------------------------------
CGMZ_Scene_QuestSystemQuestBoard.prototype.createQuestBoardNameWindow = function() {
	const rect = this.questBoardNameWindowRect();
	this._questBoardNameWindow = new CGMZ_Window_QuestBoardName(rect, this._name);
	this.addWindow(this._questBoardNameWindow);
};
//-----------------------------------------------------------------------------
// Get quest board window name rect
//-----------------------------------------------------------------------------
CGMZ_Scene_QuestSystemQuestBoard.prototype.questBoardNameWindowRect = function() {
	const width = this._questBoardWindow.width;
	const height = this.calcWindowHeight(1, false);
	const x = this._questBoardWindow.x;
	const y = this._questBoardWindow.y - height;
	return new Rectangle(x, y, width, height);
};
//-----------------------------------------------------------------------------
// Create quest board legend window
//-----------------------------------------------------------------------------
CGMZ_Scene_QuestSystemQuestBoard.prototype.createQuestBoardLegendWindow = function() {
	const rect = this.questBoardLegendWindowRect();
	this._questBoardLegendWindow = new CGMZ_Window_QuestBoardLegend(rect, this._questList, this._categoryIconType);
	this.addWindow(this._questBoardLegendWindow);
};
//-----------------------------------------------------------------------------
// Get quest board legend window rect
//-----------------------------------------------------------------------------
CGMZ_Scene_QuestSystemQuestBoard.prototype.questBoardLegendWindowRect = function() {
	const width = Graphics.boxWidth;
	const height = this.calcWindowHeight(1, false);
	const x = 0;
	const y = Graphics.boxHeight - height;
	return new Rectangle(x, y, width, height);
};
//-----------------------------------------------------------------------------
// On quest select
//-----------------------------------------------------------------------------
CGMZ_Scene_QuestSystemQuestBoard.prototype.onQuestSelect = function() {
	const argObj = {quest: this._questBoardWindow.item(), gameSwitch: 0, se: this._se, disableDecline: false};
	SceneManager.push(CGMZ_Scene_QuestSystemAcceptQuest);
	SceneManager.prepareNextScene(argObj);
};
//-----------------------------------------------------------------------------
// Get the scene's custom scene background
// No need to check if Scene Backgrounds is installed because this custom func
// is only called by that plugin
//-----------------------------------------------------------------------------
CGMZ_Scene_QuestSystemQuestBoard.prototype.CGMZ_getCustomSceneBackground = function() {
	return $cgmzTemp.sceneBackgroundPresets[this._sceneBackground];
};
//=============================================================================
// CGMZ_Window_QuestBoardName
//-----------------------------------------------------------------------------
// Base window that displays quest board name if exists
//=============================================================================
function CGMZ_Window_QuestBoardName(rect) {
	this.initialize.apply(this, arguments);
}
CGMZ_Window_QuestBoardName.prototype = Object.create(Window_Base.prototype);
CGMZ_Window_QuestBoardName.prototype.constructor = CGMZ_Window_QuestBoardName;
//-----------------------------------------------------------------------------
// Initialize
//-----------------------------------------------------------------------------
CGMZ_Window_QuestBoardName.prototype.initialize = function(rect, name) {
	Window_Base.prototype.initialize.call(this, rect);
	if(Imported.CGMZ_WindowSettings && CGMZ.QuestSystem.QuestBoardNameWindowSettings) this.CGMZ_setWindowSettings(CGMZ.QuestSystem.QuestBoardNameWindowSettings);
	if(Imported.CGMZ_WindowBackgrounds && CGMZ.QuestSystem.QuestBoardNameWindowBackground) this.CGMZ_setWindowBackground(CGMZ.QuestSystem.QuestBoardNameWindowBackground);
	this._name = name;
	this.refresh();
};
//-----------------------------------------------------------------------------
// Refresh
//-----------------------------------------------------------------------------
CGMZ_Window_QuestBoardName.prototype.refresh = function() {
	this.contents.clear();
	this.CGMZ_drawTextLine(this._name, 0, 0, this.contents.width, 'center');
};
//=============================================================================
// CGMZ_Window_QuestBoardLegend
//-----------------------------------------------------------------------------
// Base window that displays quest board legend
//=============================================================================
function CGMZ_Window_QuestBoardLegend(rect) {
	this.initialize.apply(this, arguments);
}
CGMZ_Window_QuestBoardLegend.prototype = Object.create(Window_Base.prototype);
CGMZ_Window_QuestBoardLegend.prototype.constructor = CGMZ_Window_QuestBoardLegend;
//-----------------------------------------------------------------------------
// Initialize
//-----------------------------------------------------------------------------
CGMZ_Window_QuestBoardLegend.prototype.initialize = function(rect, questList, categoryType) {
	Window_Base.prototype.initialize.call(this, rect);
	if(Imported.CGMZ_WindowSettings && CGMZ.QuestSystem.QuestBoardLegendWindowSettings) this.CGMZ_setWindowSettings(CGMZ.QuestSystem.QuestBoardLegendWindowSettings);
	if(Imported.CGMZ_WindowBackgrounds && CGMZ.QuestSystem.QuestBoardLegendWindowBackground) this.CGMZ_setWindowBackground(CGMZ.QuestSystem.QuestBoardLegendWindowBackground);
	this.createLegendEntries(questList, categoryType);
	this.refresh();
};
//-----------------------------------------------------------------------------
// Refresh
//-----------------------------------------------------------------------------
CGMZ_Window_QuestBoardLegend.prototype.createLegendEntries = function(questList, categoryType) {
	this._legend = [];
	const categoryNames = [];
	for(const questName of questList) {
		const quest = $cgmzTemp.getQuest(questName);
		const questSave = $cgmz.getQuest(questName);
		if(!quest || !questSave || questSave._isStarted || !quest.canDisplayOnBoard()) continue;
		let category = null;
		switch(categoryType) {
			case 'Category': category = $cgmzTemp.getQuestCategory(quest._category); break;
			case 'Difficulty': category = $cgmzTemp.getQuestCategory(quest._difficulty); break;
			case 'Length': category = $cgmzTemp.getQuestCategory(quest._length); break;
			case 'Location': category = $cgmzTemp.getQuestCategory(quest._location); break;
		}
		if(!category || categoryNames.includes(category._displayName)) continue;
		const categoryString = '\\c[' + category._textColor + ']\\i[' + category._icon + ']' + category._displayName + '\\c[0]';
		categoryNames.push(category._displayName);
		this._legend.push(categoryString);
	}
};
//-----------------------------------------------------------------------------
// Refresh
//-----------------------------------------------------------------------------
CGMZ_Window_QuestBoardLegend.prototype.refresh = function() {
	this.contents.clear();
	const columns = this._legend.length;
	for(let col = 0; col < this._legend.length; col++) {
		const colSpace = 12;
		const colWidth = (this.contents.width / columns) - colSpace;
		const x = col * (colWidth + colSpace);
		const string = this._legend[col];
		const rect = new Rectangle(x - 4, 0, colWidth + 8, this.lineHeight());
		this.CGMZ_drawBackgroundRectangle(rect, 'rgba(0, 0, 0, 0.2)');
		this.CGMZ_drawTextLine(string, x, 0, colWidth, 'center');
	}
};
//=============================================================================
// CGMZ_Window_QuestBoardSelectable
//-----------------------------------------------------------------------------
// Selectable window for choosing a quest in a list.
//=============================================================================
function CGMZ_Window_QuestBoardSelectable(rect) {
	this.initialize.apply(this, arguments);
}
CGMZ_Window_QuestBoardSelectable.prototype = Object.create(Window_Selectable.prototype);
CGMZ_Window_QuestBoardSelectable.prototype.constructor = CGMZ_Window_QuestBoardSelectable;
//-----------------------------------------------------------------------------
// Initialize
//-----------------------------------------------------------------------------
CGMZ_Window_QuestBoardSelectable.prototype.initialize = function(rect, questList, categoryIconType) {
	Window_Selectable.prototype.initialize.call(this, rect);
	if(Imported.CGMZ_WindowSettings && CGMZ.QuestSystem.QuestBoardWindowSettings) this.CGMZ_setWindowSettings(CGMZ.QuestSystem.QuestBoardWindowSettings);
	if(Imported.CGMZ_WindowBackgrounds && CGMZ.QuestSystem.QuestBoardWindowBackground) this.CGMZ_setWindowBackground(CGMZ.QuestSystem.QuestBoardWindowBackground);
	this._questList = questList;
	this._categoryIconType = categoryIconType;
	this.refresh();
	this.activate();
};
//-----------------------------------------------------------------------------
// Maximum columns
//-----------------------------------------------------------------------------
CGMZ_Window_QuestBoardSelectable.prototype.maxCols = function() {
	return CGMZ.QuestSystem.BoardColumns;
};
//-----------------------------------------------------------------------------
// Height of each item
//-----------------------------------------------------------------------------
CGMZ_Window_QuestBoardSelectable.prototype.itemHeight = function() {
	return this.lineHeight() * 4 + 8;
};
//-----------------------------------------------------------------------------
// Current item
//-----------------------------------------------------------------------------
CGMZ_Window_QuestBoardSelectable.prototype.item = function() {
	return this._data[this.index()];
};
//-----------------------------------------------------------------------------
// Max items
//-----------------------------------------------------------------------------
CGMZ_Window_QuestBoardSelectable.prototype.maxItems = function() {
	return this._data ? this._data.length : 1;
};
//-----------------------------------------------------------------------------
// Refresh
//-----------------------------------------------------------------------------
CGMZ_Window_QuestBoardSelectable.prototype.refresh = function() {
	this.makeItemList();
	Window_Selectable.prototype.refresh.call(this);
	if(this._data.length <= 0) {
		this.CGMZ_drawText(CGMZ.QuestSystem.EmptyQuestBoardText, 0, 0, 0, this.contents.width, 'center');
	} else {
		this.select(0);
	}
};
//-----------------------------------------------------------------------------
// Make item list
//-----------------------------------------------------------------------------
CGMZ_Window_QuestBoardSelectable.prototype.makeItemList = function() {
	this._data = this._questList.filter(questName => $cgmz.getQuest(questName) && !$cgmz.getQuest(questName)._isStarted && $cgmzTemp.getQuest(questName).canDisplayOnBoard());
};
//-----------------------------------------------------------------------------
// Check if current item is enabled
//-----------------------------------------------------------------------------
CGMZ_Window_QuestBoardSelectable.prototype.isCurrentItemEnabled = function() {
	return $cgmzTemp.getQuest(this.item());
};
//-----------------------------------------------------------------------------
// Draw item in list
//-----------------------------------------------------------------------------
CGMZ_Window_QuestBoardSelectable.prototype.drawItem = function(index) {
	const item = this._data[index];
	const rect = this.itemRectWithPadding(index);
	const quest = $cgmzTemp.getQuest(item);
	const categoryIcon = this.getCategoryIcon(index);
	const questNameString = (categoryIcon) ? '\\i[' + categoryIcon + '] ' + item : item;
	this.contents.fontBold = true;
	this.CGMZ_drawTextLine(questNameString, rect.x, rect.y, rect.width, 'center');
	this.contents.fontBold = false;
	this.CGMZ_drawText(quest._boardDescription, rect.x, rect.x, rect.y + this.lineHeight(), rect.width, 'center');
};
//-----------------------------------------------------------------------------
// Draw item in list
//-----------------------------------------------------------------------------
CGMZ_Window_QuestBoardSelectable.prototype.getCategoryIcon = function(index) {
	const item = this._data[index];
	const quest = $cgmzTemp.getQuest(item);
	let category = null;
	switch(this._categoryIconType) {
		case 'Category': category = $cgmzTemp.getQuestCategory(quest._category); break;
		case 'Difficulty': category = $cgmzTemp.getQuestCategory(quest._difficulty); break;
		case 'Length': category = $cgmzTemp.getQuestCategory(quest._length); break;
		case 'Location': category = $cgmzTemp.getQuestCategory(quest._location); break;
	}
	return (category) ? category._icon : 0;
};
//=============================================================================
// Scene_Map
//-----------------------------------------------------------------------------
// Create on-map quest tracker window
//=============================================================================
//-----------------------------------------------------------------------------
// Also create the quest tracker window
//-----------------------------------------------------------------------------
const alias_CGMZQuestSystem_SceneMap_createAllWindows = Scene_Map.prototype.createAllWindows;
Scene_Map.prototype.createAllWindows = function() {
    this.CGMZ_createQuestTrackerWindow();
    alias_CGMZQuestSystem_SceneMap_createAllWindows.call(this);
};
//-----------------------------------------------------------------------------
// Create the quest tracker window
//-----------------------------------------------------------------------------
Scene_Map.prototype.CGMZ_createQuestTrackerWindow = function() {
    const rect = this.CGMZ_questTrackerWindowRect();
    this._cgmz_questTrackerWindow = new CGMZ_Window_QuestTracker(rect);
    this.addWindow(this._cgmz_questTrackerWindow);
};
//-----------------------------------------------------------------------------
// Get the quest tracker window rectangle
//-----------------------------------------------------------------------------
Scene_Map.prototype.CGMZ_questTrackerWindowRect = function() {
    const wy = CGMZ.QuestSystem.QuestTrackerY;
    const ww = CGMZ.QuestSystem.QuestTrackerWidth;
    const wh = CGMZ.QuestSystem.QuestTrackerHeight;
	const wx = CGMZ.QuestSystem.QuestTrackerX;
    return new Rectangle(wx, wy, ww, wh);
};
//-----------------------------------------------------------------------------
// Also update the quest tracker window
//-----------------------------------------------------------------------------
const alias_CGMZQuestSystem_SceneMap_update = Scene_Map.prototype.update;
Scene_Map.prototype.update = function() {
    alias_CGMZQuestSystem_SceneMap_update.call(this);
    this.CGMZ_updateQuestTrackerWindow();
};
//-----------------------------------------------------------------------------
// Update the quest tracker window rectangle
//-----------------------------------------------------------------------------
Scene_Map.prototype.CGMZ_updateQuestTrackerWindow = function() {
    this._cgmz_questTrackerWindow.update();
};
//-----------------------------------------------------------------------------
// Do nothing if touch input is over quest window
//-----------------------------------------------------------------------------
const alias_CGMZQuestSystem_SceneMap_onMapTouch = Scene_Map.prototype.onMapTouch;
Scene_Map.prototype.onMapTouch = function() {
	const x = TouchInput.x;
	const y = TouchInput.y;
	const w = this._cgmz_questTrackerWindow;
	if(!(CGMZ.QuestSystem.TrackerBlockTouchInput && w && w.visible && (x > w.x && x < w.x + w.width) && (y > w.y && y < w.y + w.height))) {
		alias_CGMZQuestSystem_SceneMap_onMapTouch.call(this);
	}
};
//=============================================================================
// CGMZ_Window_QuestTracker
//-----------------------------------------------------------------------------
// Window for displaying tracked quests on the map scene
//=============================================================================
function CGMZ_Window_QuestTracker(rect) {
	this.initialize.apply(this, arguments);
}
CGMZ_Window_QuestTracker.prototype = Object.create(CGMZ_Window_Scrollable.prototype);
CGMZ_Window_QuestTracker.prototype.constructor = CGMZ_Window_QuestTracker;
//-----------------------------------------------------------------------------
// Initialize
//-----------------------------------------------------------------------------
CGMZ_Window_QuestTracker.prototype.initialize = function(rect) {
	const heightMultiplier = 20; // maximum of 20 windows tall of data to scroll
	CGMZ_Window_Scrollable.prototype.initialize.call(this, rect, heightMultiplier, CGMZ.QuestSystem.ScrollWait, CGMZ.QuestSystem.ScrollSpeed, CGMZ.QuestSystem.AutoScroll, CGMZ.QuestSystem.ScrollDeceleration);
	if(Imported.CGMZ_WindowSettings && CGMZ.QuestSystem.TrackerWindowSettings) this.CGMZ_setWindowSettings(CGMZ.QuestSystem.TrackerWindowSettings);
	if(Imported.CGMZ_WindowBackgrounds && CGMZ.QuestSystem.TrackerWindowBackground) this.CGMZ_setWindowBackground(CGMZ.QuestSystem.TrackerWindowBackground);
	this._trackedQuests = $cgmz.getPinnedQuests();
	this._refreshMinFrame = CGMZ.QuestSystem.QuestTrackerUpdateInterval;
	this._currentRefreshFrame = 0;
	this._wasRefreshed = false;
	if(!CGMZ.QuestSystem.ShowTrackedQuests || this._trackedQuests.length === 0) {
		this.hide();
	} else {
		this.refresh();
	}
};
//-----------------------------------------------------------------------------
// Update the window
//-----------------------------------------------------------------------------
CGMZ_Window_QuestTracker.prototype.update = function() {
	this._currentRefreshFrame++;
	this.updateTrackerVisibility();
	if(this.canUpdateWindow()) {
		this._wasRefreshed = false;
		this._currentRefreshFrame = 0;
		this._trackedQuests = $cgmz.getPinnedQuests();
		if(this._trackedQuests.length) {
			this.refresh();
		}
		if(this._wasRefreshed) $cgmzTemp.onQuestTrackerUpdate();
	}
};
//-----------------------------------------------------------------------------
// Check conditions for updating the window
//-----------------------------------------------------------------------------
CGMZ_Window_QuestTracker.prototype.canUpdateWindow = function() {
	if(!CGMZ.QuestSystem.ShowTrackedQuests) return false;
	if(this._currentRefreshFrame < this._refreshMinFrame) return false;
	if(!$cgmzTemp.questTrackerNeedsUpdate()) return false;
	return true;
};
//-----------------------------------------------------------------------------
// Update the window's visibility
//-----------------------------------------------------------------------------
CGMZ_Window_QuestTracker.prototype.updateTrackerVisibility = function() {
	const visibility = this.getTrackerVisibility();
	if(visibility && !this.visible) this.show();
	if(!visibility && this.visible) this.hide();
};
//-----------------------------------------------------------------------------
// Check if the window should hide itself
//-----------------------------------------------------------------------------
CGMZ_Window_QuestTracker.prototype.getTrackerVisibility = function() {
	if(CGMZ.QuestSystem.AutoHideTracker && $gameMessage.isBusy()) {
		return false;
	}
	if(this._trackedQuests.length === 0) {
		return false;
	}
	if(CGMZ.QuestSystem.TrackerSwitch && !$gameSwitches.value(CGMZ.QuestSystem.TrackerSwitch)) {
		return false;
	}
	if(ConfigManager.hasOwnProperty('cgmz_questTracker') && !ConfigManager.cgmz_questTracker) {
		return false;
	}
	return true;
};
//-----------------------------------------------------------------------------
// Refresh
//-----------------------------------------------------------------------------
CGMZ_Window_QuestTracker.prototype.refresh = function() {
	if(!this.visible) return;
	this.contents.clear();
	this._neededHeight = 0;
	this.changePaintOpacity(true);
	this.resetFontSettings();
	if(CGMZ.QuestSystem.QuestTrackerText) {
		this._neededHeight += this.CGMZ_drawTextLine(`${CGMZ.QuestSystem.QuestTrackerText}`, 0, 0, this.contents.width, 'center');
	}
	let drawnQuests = 0;
	for(const quest of this._trackedQuests) {
		this.resetFontSettings();
		this.changePaintOpacity(true);
		const questSave = $cgmz.getQuest(quest);
		const questTemp = $cgmzTemp.getQuest(quest);
		if(!questSave || !questTemp) continue;
		this.drawQuestInfo(questSave, questTemp);
		this._neededHeight += CGMZ.QuestSystem.QuestTrackerSpacing;
		drawnQuests++;
		if(CGMZ.QuestSystem.MaxTrackedQuests && drawnQuests >= CGMZ.QuestSystem.MaxTrackedQuests) break;
	}
	this._neededHeight -= CGMZ.QuestSystem.QuestTrackerSpacing;
	this.height = Math.min(this._neededHeight + this.padding * 2, CGMZ.QuestSystem.QuestTrackerHeight);
	this._neededHeight = this._windowHeight + this.padding * 2;
	this.checkForScroll();
	this._wasRefreshed = true;
};
//-----------------------------------------------------------------------------
// Refresh
//-----------------------------------------------------------------------------
CGMZ_Window_QuestTracker.prototype.drawQuestInfo = function(questSave, questTemp) {
	const nameString = (CGMZ.QuestSystem.QuestTrackerNameFS) ? `\\c[0]\\fs[${CGMZ.QuestSystem.QuestTrackerNameFS}]${questTemp._name}` : `\\c[0]\\fs[${$gameSystem.mainFontSize()}]${questTemp._name}`;
	this._neededHeight += this.CGMZ_drawTextLine(nameString, 0, this._neededHeight, this.contents.width, 'left');
	this.drawObjectives(questSave, questTemp);
};
//-----------------------------------------------------------------------------
// Draw Objectives
//-----------------------------------------------------------------------------
CGMZ_Window_QuestTracker.prototype.drawObjectives = function(questSave, questTemp) {
	if(!questSave._isStarted) {
		const unstartedString = (CGMZ.QuestSystem.QuestTrackerObjectiveFS) ? `\\fs[${CGMZ.QuestSystem.QuestTrackerObjectiveFS}]${questTemp._unstartedObjective}` : `\\fs[${$gameSystem.mainFontSize()}]${questTemp._unstartedObjective}`;
		this._neededHeight += this.CGMZ_drawText(unstartedString, 0, 0, this._neededHeight, this.contents.width);
	} else if(questSave._isCompleted) {
		const completeString = (CGMZ.QuestSystem.QuestTrackerObjectiveFS) ? `\\fs[${CGMZ.QuestSystem.QuestTrackerObjectiveFS}]${CGMZ.QuestSystem.QuestTrackerCompleteText}` : `\\fs[${$gameSystem.mainFontSize()}]${CGMZ.QuestSystem.QuestTrackerCompleteText}`;
		this._neededHeight += this.CGMZ_drawTextLine(completeString, 0, this._neededHeight, this.contents.width);
	} else if(questSave._isFailed) {
		const failString = (CGMZ.QuestSystem.QuestTrackerObjectiveFS) ? `\\fs[${CGMZ.QuestSystem.QuestTrackerObjectiveFS}]${CGMZ.QuestSystem.QuestTrackerFailText}` : `\\fs[${$gameSystem.mainFontSize()}]${CGMZ.QuestSystem.QuestTrackerFailText}`;
		this._neededHeight += this.CGMZ_drawTextLine(failString, 0, this._neededHeight, this.contents.width);
	} else {
		const objectives = questTemp.getObjectivesOfStage(questSave._stage);
		this.drawObjectivesFromObjectiveArray(objectives, questSave);
	}
};
//-----------------------------------------------------------------------------
// Draw Objectives from an array of objectives
//-----------------------------------------------------------------------------
CGMZ_Window_QuestTracker.prototype.drawObjectivesFromObjectiveArray = function(objectives, questSave) {
	for(const objective of objectives) {
		this.changePaintOpacity(true);
		if(objective.autoTrack) {
			const completed = questSave.isObjectiveComplete(objective.id);
			this.drawAutoTrackObjective(objective, completed);
		} else {
			this.drawManualObjective(questSave, objective);
		}
	}
};
//-----------------------------------------------------------------------------
// Draw Manually Tracked Objectives
//-----------------------------------------------------------------------------
CGMZ_Window_QuestTracker.prototype.drawManualObjective = function(questSave, objective) {
	const maxProgress = objective.maxProgress;
	const progress = questSave.getObjectiveProgress(objective.id, maxProgress);
	let progressString = " (" + progress + "/" + maxProgress + ")";
	if(maxProgress <= 1) {
		progressString = "";
	}
	this.drawObjective(objective.description + progressString, progress >= maxProgress);
};
//-----------------------------------------------------------------------------
// Draw Automatically Tracked Objectives
//-----------------------------------------------------------------------------
CGMZ_Window_QuestTracker.prototype.drawAutoTrackObjective = function(objective, completed) {
	if(objective.goldTracking > 0) {
		this.drawGoldObjective(objective, completed);
	} else if(objective.variableTracking > 0) {
		this.drawVariableObjective(objective, completed);
	} else if(objective.hasOwnProperty('otherTracking')) {
		this.drawItemObjective(objective, completed);
	} else if(objective.switchTracking > 0) {
		this.drawSwitchObjective(objective, completed);
	}
};
//-----------------------------------------------------------------------------
// Draw automatic gold objective
//-----------------------------------------------------------------------------
CGMZ_Window_QuestTracker.prototype.drawGoldObjective = function(objective, completed) {
	const maxProgress = objective.goldTracking;
	const progress = (completed) ? maxProgress : $gameParty.gold();
	const progressString = " (" + progress + "/" + maxProgress + ")";
	this.drawObjective(objective.description + progressString, completed);
};
//-----------------------------------------------------------------------------
// Draw automatic variable objective
//-----------------------------------------------------------------------------
CGMZ_Window_QuestTracker.prototype.drawVariableObjective = function(objective, completed) {
	const maxProgress = objective.maxProgress;
	const progress = (completed) ? maxProgress : $gameVariables.value(objective.variableTracking);
	const progressString = " (" + progress + "/" + maxProgress + ")";
	this.drawObjective(objective.description + progressString, completed);
};
//-----------------------------------------------------------------------------
// Draw automatic item objective
//-----------------------------------------------------------------------------
CGMZ_Window_QuestTracker.prototype.drawItemObjective = function(objective, completed) {
	const item = CGMZ_Utils.lookupItem(objective.otherTracking.type, objective.otherTracking.id);
	const maxProgress = objective.otherTracking.amount;
	const progress = (completed) ? maxProgress : $gameParty.numItems(item);
	const progressString = " (" + progress + "/" + maxProgress + ")";
	this.drawObjective(objective.description + progressString, completed);
};
//-----------------------------------------------------------------------------
// Draw automatic switch objective
//-----------------------------------------------------------------------------
CGMZ_Window_QuestTracker.prototype.drawSwitchObjective = function(objective, completed) {
	const maxProgress = 1;
	const progress = (completed) ? maxProgress : 0;
	const progressString = " (" + progress + "/" + maxProgress + ")";
	this.drawObjective(objective.description + progressString, completed);
};
//-----------------------------------------------------------------------------
// Draw an objective
//-----------------------------------------------------------------------------
CGMZ_Window_QuestTracker.prototype.drawObjective = function(string, completed) {
	const fsString = (CGMZ.QuestSystem.QuestTrackerObjectiveFS) ? `\\c[0]\\fs[${CGMZ.QuestSystem.QuestTrackerObjectiveFS}]${string}` : `\\c[0]\\fs[${$gameSystem.mainFontSize()}]${string}`;
	if(completed) this.changePaintOpacity(false);
	this._neededHeight += this.CGMZ_drawText(fsString, 0, 0, this._neededHeight, this.contents.width);
};