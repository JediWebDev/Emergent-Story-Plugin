/*:
 * @author Casper Gaming
 * @url https://www.caspergaming.com/plugins/cgmz/gathering/
 * @target MZ
 * @base CGMZ_Core
 * @orderAfter CGMZ_Core
 * @plugindesc Automatically handles gathering nodes
 * @help
 * ============================================================================
 * For terms and conditions using this plugin in your game please visit:
 * https://www.caspergaming.com/terms-of-use/
 * ============================================================================
 * Become a Patron to get access to beta/alpha plugins plus other goodies!
 * https://www.patreon.com/CasperGamingRPGM
 * ============================================================================
 * Version: Alpha R9
 * ----------------------------------------------------------------------------
 * Compatibility: Only tested with my CGMZ plugins.
 * Made for RPG Maker MZ 1.9.0
 * ----------------------------------------------------------------------------
 * Description: This plugin adds a gathering node system which handles things
 * such as gathering, item variance, rare items, automatic growth, growth
 * stages, and much more. You can use to to create an easy farming system
 * set up in your plugin manager and then use an easy comment in an event to
 * designate it as a cgmz gathering node.
 * ----------------------------------------------------------------------------
 * Documentation:
 * ------------------------------Event Setup-----------------------------------
 * To set an event up as a gathering node, make a comment event command
 * that contains the following text:
 * CGMZ GATHERING nodeId
 * 
 * For example, if your node id is "stone", your comment text would be:
 * CGMZ GATHERING stone
 *
 * Important: IDs for nodes should not contain spaces
 * ----------------------------Event Commands----------------------------------
 * The gathering events can also run other event commands. However, the
 * event commands will only run if the player can currently harvest the node.
 * For example, if the player does not have the profession level, required
 * tools, or if the node is not in a harvestable stage, interacting with the 
 * event will *NOT* run the event commands in the event.
 * --------------------------------Tools---------------------------------------
 * Each node can be harvested by as many different "tool tiers" as you want,
 * with some tiers giving bonus chances to gathering success rate. This plugin
 * use the tool that has the highest success bonus in the player's inventory.
 * --------------------------------Stages--------------------------------------
 * Nodes automatically grow to the next stage after the set amount of frames
 * set up via the plugin parameters. A growth time of 0 will be infinite (it
 * will not advance to the next stage). Note that if you set the growth time to
 * 0 but then add variance, it will make the growth time no longer 0 (infinite)
 *
 * Further, node stages must be marked as Mature to be gatherable. You can
 * optionally have an expired stage which will award the expired items and
 * apply the exp penalty when gathered. The expired stage still needs to be
 * marked as mature, the expired flag only determines whether the gather will
 * produce the expired items or the normal items.
 *
 * Discover Stage - Note that this is a number, not the stage id. 0 will be
 * the first stage, 1 will be the second stage, and so on. You can enter -1
 * and the plugin will choose a random stage.
 * ------------------------------Animations------------------------------------
 * Each node (and stage within each node) supports its own animation or still
 * image. To set up the animation, create an image with each frame of the
 * animation being an equal width then set this width as the frame width.
 * The animation system supports an unlimited number of frames and will cycle
 * through them from frame 0 to the max frame where it will reset to frame 0.
 * To set how much time (in frames) before switching to the next frame, use
 * the Animation Delay parameter.
 * -------------------------------Planting-------------------------------------
 * To start planting, use the Start Planting plugin command. All you need to
 * do is provide the type of plantable you want to be planted in that event.
 * The plugin will handle displaying the window of the player's inventory with
 * seeds that can be planted there, and turn it into a gathering node. There is
 * no need for the gathering comment if it is a plantable event.
 *
 * You can optionally use the script call:
 * this.CGMZ_getGatheringState() === 'none';
 * in a conditional branch in your event. The return will be "none" when it is
 * not yet planted, and "growing" when it is already planted. This will allow
 * you to event different actions depending on the state the event is in.
 * ------------------------------Text Codes------------------------------------
 * The gather success and fail text in toast windows supports all standard text
 * codes, such as \c[x] or \i[x].
 * 
 * Some text parameters support additional text codes.
 * 
 * The param "Profession Fail Message" supports the following:
 * - %prof: will be replaced with the profession's name.
 * - %level: will be replaced with the required level.
 * ------------------------------Fallbacks-------------------------------------
 * Certain parameters exist globally as well as for each node. These are:
 * • Success Sound Effect
 * • Fail Sound Effect
 * • Tool Fail Message
 * • Profession Fail Message
 *
 * For the sound effects, any node-specific sound effects will be combined 
 * with the global sound effect parameters, and a random sound effect will be
 * chosen from this combined list.
 *
 * For the messages, any node-specific message will override the global
 * message parameter for that node. It will fall back to the global message if
 * the node has an empty message parameter for that message type.
 * ---------------------------CGMZ Professions---------------------------------
 * This plugin can integrate with [CGMZ] Professions to add features:
 * 1) Profession level requirements to harvest nodes
 * 2) Profession success bonus for higher level than required
 * 3) Automatic exp awarded for profession upon successful gather
 * --------------------------CGMZ Toast Manager--------------------------------
 * This plugin can integrate with [CGMZ] Toast Manager to add features:
 * 1) Toast window on gather fail
 * 2) Toast window on gather success
 *
 * You can use the string %item in your preset to show the items obtained from
 * gather. You can also use the string %amt to show the amount obtained. The
 * preset must be a text type preset.
 * ------------------------------Saved Games-----------------------------------
 * This plugin is fully compatible with saved games. This means you can:
 *
 * ✓ Add this plugin to a saved game and it will work as expected
 * ✓ Change any plugin params and changes will be reflected in saved games
 * ✓ Remove the plugin with no issue to save data
 * -----------------------------Filename---------------------------------------
 * The filename for this plugin MUST remain CGMZ_Gathering.js
 * This is what it comes as when downloaded. The filename is used to load
 * parameters and execute plugin commands. If you change it, things will begin
 * behaving incorrectly and your game will probably crash. Please do not
 * rename the js file.
 * -----------------------------Latest Version---------------------------------
 * Hi all, this latest version adds the option to allow your players to harvest
 * nodes more than once before they reset. This includes a variance so you can
 * make it between 3 - 7 harvests per growth, for example. Of course, you can
 * also still make gather nodes that reset after one gather as was previously
 * how all gather nodes worked.
 *
 * The [CGMZ] Toast Manager integration has been improved, as it now uses the
 * preset id system. You can control any toast parameter via the preset, which
 * is much less limited than before. This also allowed for per-node presets,
 * in case you want a special toast window to display for some of your rare
 * gathering nodes. If no node specific preset is found, it will use the
 * global gather success or fail preset set up in the plugin parameters.
 *
 * The journal windows can now be customized with [CGMZ] Window Backgrounds and
 * [CGMZ] Window Settings.
 *
 * The plugin will now automatically set your last growth stage's growth time
 * and variance to 0, fixing an extremely common user error.
 *
 * Version Alpha R9
 * - Added option to harvest nodes multiple times
 * - Added [CGMZ] Window Backgrounds integration for journal
 * - Added [CGMZ] Window Settings integration for journal
 * - Growth time no longer possible to set up incorrectly
 * - Improved [CGMZ] Toast Manager integration
 *
 * @command Call Scene
 * @desc Call the gathering journal scene
 *
 * @arg Categories
 * @type text[]
 * @default []
 * @desc The category ids to include (leave empty array to include all).
 *
 * @command Start Planting
 * @desc Start planting a gathering node
 *
 * @arg Type
 * @desc The plantable type to select from
 *
 * @command Advance Node Stage
 * @desc Advance a node's stage by 1
 *
 * @arg Map Id
 * @type map
 * @desc The map id the node is on
 *
 * @arg Event Id
 * @type number
 * @default 0
 * @desc The event id the node is on
 *
 * @arg Node Id
 * @desc The node's id
 *
 * @command Reset Node
 * @desc Reset's a node to be as if it was just discovered
 *
 * @arg Map Id
 * @type map
 * @desc The map id the node is on
 *
 * @arg Event Id
 * @type number
 * @default 0
 * @desc The event id the node is on
 *
 * @arg Node Id
 * @desc The node's id
 *
 * @command Get Node Stage
 * @desc Get a node's stage into a variable for eventing
 *
 * @arg Map Id
 * @type map
 * @desc The map id the node is on
 *
 * @arg Event Id
 * @type number
 * @default 0
 * @desc The event id the node is on
 *
 * @arg Node Id
 * @desc The node's id
 *
 * @arg Variable Id
 * @type variable
 * @default 0
 * @desc The variable to store the node stage in
 *
 * @command Advance Every Node
 * @desc Advance every node's stage by 1
 *
 * @arg id
 * @desc If provided, will only advance nodes with matching id. Blank = advance every node
 *
 * @arg Exclusion Mode
 * @type boolean
 * @default false
 * @desc If true, it will advance all nodes that do NOT match the id above.
 *
 * @command Get Harvest Amount
 * @desc Store the amount of times a node type has been harvested in a variable
 *
 * @arg Node Id
 * @desc Node Id to get harvest count of
 *
 * @arg Variable Id
 * @type variable
 * @default 0
 * @desc The game variable to store the harvest count in
 *
 * @param Gathering Options
 *
 * @param Nodes
 * @parent Gathering Options
 * @type struct<Node>[]
 * @default []
 * @desc Set up gathering nodes here
 *
 * @param Plantables
 * @parent Gathering Options
 * @type struct<Plantable>[]
 * @default []
 * @desc Set up plantable items here
 *
 * @param Message Options
 *
 * @param Tool Fail Message
 * @parent Message Options
 * @default You do not have necessary equipment to harvest this.
 * @desc Text string to show when gather node tool check fails.
 *
 * @param Profession Fail Message
 * @parent Message Options
 * @default You need a %prof level of at least %level to gather this!
 * @desc Text string to show when gather node profession check fails (requires CGMZ Professions).
 *
 * @param Message Background
 * @parent Message Options
 * @type select
 * @option Normal
 * @value 0
 * @option Dim
 * @value 1
 * @option Transparent
 * @value 2
 * @default 0
 * @desc Background to make the message window when displaying a gathering message
 *
 * @param Window Options
 *
 * @param Gauge Color 1
 * @parent Window Options
 * @type color
 * @default 28
 * @desc Color 1 to use in the progress gauge
 *
 * @param Gauge Color 2
 * @parent Window Options
 * @type color
 * @default 29
 * @desc Color 2 to use in the progress gauge
 *
 * @param Gather Width
 * @parent Window Options
 * @type number
 * @min 0
 * @max 100
 * @default 50
 * @desc The width of the gather progress window
 *
 * @param Gather Y Offset
 * @parent Window Options
 * @type number
 * @min -9999
 * @default 0
 * @desc The Y offset for the gathering window, in case you want to move it up or down the screen
 *
 * @param Gather Gauge Height
 * @parent Window Options
 * @type number
 * @min 0
 * @default 36
 * @desc Amount of pixels tall the gather progress gauge is
 *
 * @param Gather Text
 * @parent Window Options
 * @default Gathering %name
 * @desc The text to display in the gathering window. %name will be replaced by the node's name
 *
 * @param Draw Text Over Bar
 * @parent Window Options
 * @type boolean
 * @default false
 * @desc If the progress bar text should be drawn over the progress bar
 *
 * @param Sound Options
 * 
 * @param Fail Sound Effects
 * @parent Sound Options
 * @type struct<SoundEffect>[]
 * @default []
 * @desc An array of possible sound effects to play when gathering fails
 * 
 * @param Success Sound Effects
 * @parent Sound Options
 * @type struct<SoundEffect>[]
 * @default []
 * @desc An array of possible sound effects to play when gathering succeeds
 *
 * @param Journal Options
 *
 * @param Journal Categories
 * @parent Journal Options
 * @type struct<JournalCategory>[]
 * @default []
 * @desc The list of categories and their options to use for the gather journal scene
 *
 * @param List Window Right
 * @parent Journal Options
 * @type boolean
 * @default false
 * @desc If true, the list window will be on the right side of the screen instead of the left.
 *
 * @param List Window Width
 * @parent Journal Options
 * @type number
 * @default 40
 * @desc The width of the list window, as a percentage of total screen width.
 *
 * @param Disable Touch UI Space
 * @parent Journal Options
 * @type boolean
 * @default false
 * @desc If true, touch ui space will not display if touch ui is OFF.
 *
 * @param Category Columns
 * @parent Journal Options
 * @type number
 * @default 4
 * @desc Maximum amount of columns to show in the category window before moving to a new row
 *
 * @param Category Icon Alignment
 * @parent Journal Options
 * @type select
 * @option left
 * @option right
 * @default left
 * @desc Alignment for icons in the category window.
 *
 * @param Category Text Alignment
 * @parent Journal Options
 * @type select
 * @option left
 * @option center
 * @option right
 * @default center
 * @desc Alignment for text in the category window.
 *
 * @param List Icon Alignment
 * @parent Journal Options
 * @type select
 * @option left
 * @option right
 * @default left
 * @desc Alignment for icons in the list window.
 *
 * @param List Text Alignment
 * @parent Journal Options
 * @type select
 * @option left
 * @option center
 * @option right
 * @default center
 * @desc Alignment for text in the list window.
 *
 * @param Display Info
 * @parent Journal Options
 * @type select[]
 * @option Name
 * @option Image
 * @option Success Chance
 * @option Gather Times
 * @option Exp
 * @option Profession
 * @option Level Requirement
 * @option Location
 * @option Description
 * @option Flavor Text
 * @option Flavor Image
 * @option Flavor Header
 * @option Info Header
 * @option Description Header
 * @option Stats Header
 * @option Blank Line
 * @option Custom Space
 * @default ["Name","Image","Gather Times","Success Chance","Description Header","Description","Info Header","Location"]
 * @desc Display line items to possibly show in the journal display window.
 *
 * @param Custom Space
 * @parent Journal Options
 * @type number
 * @default 6
 * @desc Amount of blank vertical space (in pixels) to leave for custom space line item.
 *
 * @param Description Text Alignment
 * @parent Journal Options
 * @type select
 * @option left
 * @option center
 * @option right
 * @default center
 * @desc Alignment for description line item in the display window.
 *
 * @param Text Options
 * @parent Journal Options
 * 
 * @param Header Color 1
 * @parent Text Options
 * @type color
 * @default 1
 * @desc The first color in the header line gradient
 * 
 * @param Header Color 2
 * @parent Text Options
 * @type color
 * @default 0
 * @desc The second color in the header line gradient
 * 
 * @param Label Color
 * @parent Text Options
 * @type color
 * @default 1
 * @desc The text color for label text
 * 
 * @param Info Header Text
 * @parent Text Options
 * @default Info
 * @desc Text to show in the info header display item
 * 
 * @param Description Header Text
 * @parent Text Options
 * @default Description
 * @desc Text to show in the description header display item
 * 
 * @param Stats Header Text
 * @parent Text Options
 * @default Stats
 * @desc Text to show in the stats header display item
 * 
 * @param Description Label Text
 * @parent Text Options
 * @default Description:
 * @desc Label text for description chance line item.
 * 
 * @param Success Label Text
 * @parent Text Options
 * @default Chance:
 * @desc Label text for success chance line item.
 * 
 * @param Gather Times Label Text
 * @parent Text Options
 * @default Gathered:
 * @desc Label text for gather times line item.
 * 
 * @param Exp Label Text
 * @parent Text Options
 * @default Experience:
 * @desc Label text for exp line item.
 * 
 * @param Profession Label Text
 * @parent Text Options
 * @default Profession:
 * @desc Label text for profession line item.
 * 
 * @param Level Requirement Label Text
 * @parent Text Options
 * @default Level:
 * @desc Label text for level requirement line item.
 * 
 * @param Location Label Text
 * @parent Text Options
 * @default Location:
 * @desc Label text for location line item.
 * 
 * @param Empty List Text
 * @parent Text Options
 * @type multiline_string
 * @default Harvest things of this type to see them here.
 * @desc Text to show when the list window is empty.
 * 
 * @param Empty Category Text
 * @parent Text Options
 * @type multiline_string
 * @default Harvest things to see them here.
 * @desc Text to show when the category window is empty.
 *
 * @param Integrations
 * 
 * @param Gather Success Toast
 * @parent Integrations
 * @desc [CGMZ] Toast Manager preset id to show when gather succeeds
 * 
 * @param Gather Fail Toast
 * @parent Integrations
 * @desc [CGMZ] Toast Manager preset id to show when gather fails
 * 
 * @param Success Rumble
 * @parent Integrations
 * @type struct<Rumble>
 * @default {"Start Delay":"0","Duration":"0","Weak Magnitude":"1.00","Strong Magnitude":"1.00"}
 * @desc [CGMZ] Rumble played when gathering is successful
 * 
 * @param Fail Rumble
 * @parent Integrations
 * @type struct<Rumble>
 * @default {"Start Delay":"0","Duration":"0","Weak Magnitude":"1.00","Strong Magnitude":"1.00"}
 * @desc [CGMZ] Rumble played when gathering is not successful
 * 
 * @param Journal Scene Background
 * @parent Integrations
 * @desc A [CGMZ] Scene Backgrounds preset id for the gather journal scene
 * 
 * @param Journal Controls Window
 * @parent Integrations
 * @desc A [CGMZ] Controls Window preset id for the gather journal scene
 * 
 * @param Category Window Settings
 * @parent Integrations
 * @desc A [CGMZ] Window Settings preset id for the journal scene - category window
 * 
 * @param List Window Settings
 * @parent Integrations
 * @desc A [CGMZ] Window Settings preset id for the journal scene - list window
 * 
 * @param Display Window Settings
 * @parent Integrations
 * @desc A [CGMZ] Window Settings preset id for the journal scene - display window
 * 
 * @param Category Window Background
 * @parent Integrations
 * @desc A [CGMZ] Window Backgrounds preset id for the journal scene - category window
 * 
 * @param List Window Background
 * @parent Integrations
 * @desc A [CGMZ] Window Backgrounds preset id for the journal scene - list window
 * 
 * @param Display Window Background
 * @parent Integrations
 * @desc A [CGMZ] Window Backgrounds preset id for the journal scene - display window
 * 
 * @param Gather Window Settings
 * @parent Integrations
 * @desc A [CGMZ] Window Settings preset id for the gathering progress window
 * 
 * @param Plant Window Settings
 * @parent Integrations
 * @desc A [CGMZ] Window Settings preset id for the plant select window
*/
/*~struct~Node:
 * @param Id
 * @desc The unique id of the node. Does not need to be a number, just unique.
 *
 * @param Name
 * @desc The name of the gathering node.
 *
 * @param Type
 * @desc The type of the node, such as "mining".
 * 
 * @param Success Chance
 * @type number
 * @default 100
 * @min -9999
 * @desc The base success chance of gathering the node
 * 
 * @param Gather Time
 * @type number
 * @default 120
 * @min 0
 * @desc The base time (in frames) it takes to gather the node. If 0, it will be an instant gather (no progress window)
 * 
 * @param Gather Times
 * @type number
 * @default 1
 * @min 1
 * @desc The base amount of times the player can gather this node
 * 
 * @param Gather Times Variance
 * @type number
 * @default 0
 * @min 0
 * @desc A random number added to the gather times for this node
 *
 * @param Items
 * @type struct<Item>[]
 * @default []
 * @desc The items to be received when the node is harvested
 *
 * @param Tool Requirements
 * @type struct<Tool>[]
 * @default []
 * @desc The tools needed before harvest is actionable
 * 
 * @param Growth Stages
 * @type struct<Stage>[]
 * @default []
 * @desc The various stages of growth.
 * 
 * @param Discover Stage
 * @type number
 * @default 0
 * @min -1
 * @desc The stage of growth the node will be at when the map with the node is loaded for the first time. -1 = random
 * 
 * @param Success Common Event
 * @type common_event
 * @default 0
 * @desc Common Event ID to run on successful gather
 * 
 * @param Fail Common Event
 * @type common_event
 * @default 0
 * @desc Common Event ID to run on failed gather
 *
 * @param Gauge Color 1
 * @type color
 * @default 28
 * @desc Color 1 to use in the progress gauge
 *
 * @param Gauge Color 2
 * @type color
 * @default 29
 * @desc Color 2 to use in the progress gauge
 *
 * @param Message Options
 * 
 * @param Tool Fail Message
 * @parent Message Options
 * @default You do not have necessary equipment to harvest this.
 * @desc Text string to show when gather node tool check fails.
 *
 * @param Profession Fail Message
 * @parent Message Options
 * @default You need a %prof level of at least %level to gather this!
 * @desc Text string to show when gather node profession check fails (requires CGMZ Professions).
 *
 * @param Sound Options
 * 
 * @param Fail Sound Effects
 * @parent Sound Options
 * @type struct<SoundEffect>[]
 * @default []
 * @desc An array of possible sound effects to play when gathering fails
 * 
 * @param Success Sound Effects
 * @parent Sound Options
 * @type struct<SoundEffect>[]
 * @default []
 * @desc An array of possible sound effects to play when gathering succeeds
 *
 * @param Profession Options
 *
 * @param Profession
 * @parent Profession Options
 * @desc The profession to associate with this node
 *
 * @param Exp
 * @parent Profession Options
 * @type number
 * @default 0
 * @desc The amount of exp to gain when successful harvest
 *
 * @param Expired Exp Penalty
 * @parent Profession Options
 * @type number
 * @default 50
 * @min 0
 * @max 100
 * @desc The rate of exp gained when node is gathered while expired (ex: 50 = 50% of full exp).
 *
 * @param Level Requirement
 * @parent Profession Options
 * @type number
 * @default 0
 * @desc The required profession level to harvest the node
 *
 * @param Level Success Bonus
 * @parent Profession Options
 * @type number
 * @default 0
 * @desc The amount to add per level to the success chance of harvesting the node
 *
 * @param Toast Options
 *
 * @param Fail Toast
 * @parent Toast Options
 * @desc [CGMZ] Toast Manager preset id to use for only this node when gather fails
 *
 * @param Success Toast
 * @parent Toast Options
 * @desc [CGMZ] Toast Manager preset id to use for only this node when gather succeeds
 *
 * @param Journal Options
 *
 * @param Journal Category
 * @parent Journal Options
 * @desc The category id this node will show under.
 *
 * @param Journal Name
 * @parent Journal Options
 * @desc The name of the node in the journal, if blank will use the node's name set above.
 *
 * @param Journal Description
 * @parent Journal Options
 * @type multiline_string
 * @desc The node description to show in the journal
 *
 * @param Journal Image
 * @parent Journal Options
 * @type file
 * @dir img
 * @desc An image to show for this node in the journal. Leave blank to not use.
 *
 * @param Journal Icon
 * @parent Journal Options
 * @type icon
 * @default 0
 * @desc An icon to show for this node in the journal, set to 0 to not use an icon.
 *
 * @param Journal Location
 * @parent Journal Options
 * @desc A location flavor string to show for this node in the journal
 *
 * @param Flavor Texts
 * @parent Journal Options
 * @type text[]
 * @default []
 * @desc Flavor text to show in the journal for this node.
 *
 * @param Flavor Headers
 * @parent Journal Options
 * @type text[]
 * @default []
 * @desc Flavor headers to show in the journal for this node.
 *
 * @param Flavor Images
 * @parent Journal Options
 * @type file[]
 * @dir img
 * @default []
 * @desc Flavor images to show in the journal for this node.
*/
/*~struct~Item:
 * @param Item
 * @type item
 * @default 0
 * @desc The item to receive.
 * 
 * @param Amount
 * @type number
 * @default 1
 * @min 1
 * @desc The base amount received.
 * 
 * @param Amount Variance
 * @type number
 * @default 1
 * @min 0
 * @desc The amount to vary the amount received
 * 
 * @param Add Variance Only
 * @type boolean
 * @default false
 * @desc Whether variance param is added AND subtracted from base amount, or only added.
 * 
 * @param Chance
 * @type number
 * @default 100
 * @max 100
 * @desc Odds (out of 100) that the item is received.
 * 
 * @param Award When Expired
 * @type boolean
 * @default false
 * @desc If true, this item will only be awarded when the node is expired.
*/
/*~struct~Tool:
 * @param Item
 * @type item
 * @desc The item needed to harvest the node for this tier.
 * 
 * @param Weapon
 * @type weapon
 * @desc The weapon needed to harvest the node for this tier.
 * 
 * @param Armor
 * @type armor
 * @desc The armor needed to harvest the node for this tier.
 * 
 * @param Success Bonus
 * @type number
 * @default 0
 * @desc The amount to add to the success chance when this tier of tools is used to harvest.
*/
/*~struct~Stage:
 * @param Id
 * @desc The id of the stage. Does not need to be a number, just unique (per node).
 * 
 * @param Growth Time
 * @type number
 * @default 0
 * @min 0
 * @desc The amount of frames (60f = 1sec) needed before advancement to next stage of growth. Set to 0 for infinite
 * 
 * @param Growth Variance
 * @type number
 * @default 0
 * @min 0
 * @desc The amount to vary the growth time parameter by.
 * 
 * @param Image
 * @type file
 * @dir img/
 * @desc Image file to use for this stage.
 * 
 * @param Frame Width
 * @type number
 * @default 48
 * @min 0
 * @desc Width of one frame of the image animation. If not animated make this image width
 * 
 * @param Animation Delay
 * @type number
 * @default 3
 * @min 0
 * @desc Frames to wait before switching animation frame.
 *
 * @param Event Priority
 * @type select
 * @option Below Characters
 * @value 0
 * @option Same As Characters
 * @value 1
 * @option Above Characters
 * @value 2
 * @default 1
 * @desc The priority of the event at this growth stage
 * 
 * @param Mature
 * @type boolean
 * @default false
 * @desc Whether the node can be gathered in this stage.
 * 
 * @param Expired
 * @type boolean
 * @default false
 * @desc Whether the node is considered expired in this stage. Expired nodes award different items and have the exp penalty applied when harvested
*/
/*~struct~Plantable:
 * @param Plantable Types
 * @type text[]
 * @default []
 * @desc The plantable type(s) that will provide this plantable as an option
 *
 * @param Node Id
 * @desc The node id that will be spawned when this is planted
 *
 * @param Item
 * @type item
 * @default 0
 * @desc The item required to plant this
 *
 * @param Profession Options
 *
 * @param Profession
 * @parent Profession Options
 * @desc The profession to associate with this plantable
 *
 * @param Level Requirement
 * @parent Profession Options
 * @type number
 * @default 0
 * @desc The required profession level to plant this
*/
/*~struct~JournalCategory:
 * @param id
 * @desc The category id, used to refer to this category elsewhere in the plugin.
 * 
 * @param Name
 * @desc The displayed category name
 * 
 * @param Icon
 * @type icon
 * @default 0
 * @desc An icon to show for this category
 * 
 * @param Background Image
 * @type file
 * @dir img
 * @desc An image to show for the category selectable rect background
 * 
 * @param Background Image X
 * @type number
 * @default 0
 * @desc The x coordinate of the top-left corner to start copying from the source image
 * 
 * @param Background Image Y
 * @type number
 * @default 0
 * @desc The x coordinate of the top-left corner to start copying from the source image
*/
/*~struct~SoundEffect:
 * @param Name
 * @type file
 * @dir audio/se
 * @desc The sound effect file to play
 * 
 * @param Volume
 * @type number
 * @min 0
 * @max 100
 * @default 90
 * @desc The volume of the sound effect
 * 
 * @param Pitch
 * @type number
 * @min 50
 * @max 150
 * @default 100
 * @desc The pitch of the sound effect
 * 
 * @param Pan
 * @type number
 * @min -100
 * @max 100
 * @default 0
 * @desc The pan of the sound effect
*/
/*~struct~Rumble:
 * @param Start Delay
 * @type number
 * @min 0
 * @max 4800
 * @default 0
 * @desc The delay (in ms) before the rumble starts
 * 
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
*/
Imported.CGMZ_Gathering = true;
CGMZ.Versions["Gathering"] = "Alpha R9";
CGMZ.Gathering = {};
CGMZ.Gathering.parameters = PluginManager.parameters('CGMZ_Gathering');
CGMZ.Gathering.ProfessionFailMsg = CGMZ.Gathering.parameters["Profession Fail Message"];
CGMZ.Gathering.ToolFailMsg = CGMZ.Gathering.parameters["Tool Fail Message"];
CGMZ.Gathering.GatherSuccessToast = CGMZ.Gathering.parameters["Gather Success Toast"];
CGMZ.Gathering.GatherFailToast = CGMZ.Gathering.parameters["Gather Fail Toast"];
CGMZ.Gathering.GatherWindowSettings = CGMZ.Gathering.parameters["Gather Window Settings"];
CGMZ.Gathering.PlantWindowSettings = CGMZ.Gathering.parameters["Plant Window Settings"];
CGMZ.Gathering.InfoHeaderText = CGMZ.Gathering.parameters["Info Header Text"];
CGMZ.Gathering.DescriptionHeaderText = CGMZ.Gathering.parameters["Description Header Text"];
CGMZ.Gathering.StatsHeaderText = CGMZ.Gathering.parameters["Stats Header Text"];
CGMZ.Gathering.SuccessLabelText = CGMZ.Gathering.parameters["Success Label Text"];
CGMZ.Gathering.GatherTimesLabelText = CGMZ.Gathering.parameters["Gather Times Label Text"];
CGMZ.Gathering.ProfessionLabelText = CGMZ.Gathering.parameters["Profession Label Text"];
CGMZ.Gathering.ExpLabelText = CGMZ.Gathering.parameters["Exp Label Text"];
CGMZ.Gathering.LevelRequirementLabelText = CGMZ.Gathering.parameters["Level Requirement Label Text"];
CGMZ.Gathering.LocationLabelText = CGMZ.Gathering.parameters["Location Label Text"];
CGMZ.Gathering.DescriptionLabelText = CGMZ.Gathering.parameters["Description Label Text"];
CGMZ.Gathering.GatherText = CGMZ.Gathering.parameters["Gather Text"];
CGMZ.Gathering.JournalSceneBackground = CGMZ.Gathering.parameters["Journal Scene Background"];
CGMZ.Gathering.JournalControlsWindow = CGMZ.Gathering.parameters["Journal Controls Window"];
CGMZ.Gathering.CategoryIconAlignment = CGMZ.Gathering.parameters["Category Icon Alignment"];
CGMZ.Gathering.CategoryTextAlignment = CGMZ.Gathering.parameters["Category Text Alignment"];
CGMZ.Gathering.ListIconAlignment = CGMZ.Gathering.parameters["List Icon Alignment"];
CGMZ.Gathering.ListTextAlignment = CGMZ.Gathering.parameters["List Text Alignment"];
CGMZ.Gathering.DescriptionTextAlignment = CGMZ.Gathering.parameters["Description Text Alignment"];
CGMZ.Gathering.EmptyListText = CGMZ.Gathering.parameters["Empty List Text"];
CGMZ.Gathering.EmptyCategoryText = CGMZ.Gathering.parameters["Empty Category Text"];
CGMZ.Gathering.CategoryWindowSettings = CGMZ.Gathering.parameters["Category Window Settings"];
CGMZ.Gathering.ListWindowSettings = CGMZ.Gathering.parameters["List Window Settings"];
CGMZ.Gathering.DisplayWindowSettings = CGMZ.Gathering.parameters["Display Window Settings"];
CGMZ.Gathering.CategoryWindowBackground = CGMZ.Gathering.parameters["Category Window Background"];
CGMZ.Gathering.ListWindowBackground = CGMZ.Gathering.parameters["List Window Background"];
CGMZ.Gathering.DisplayWindowBackground = CGMZ.Gathering.parameters["Display Window Background"];
CGMZ.Gathering.MessageBackground = Number(CGMZ.Gathering.parameters["Message Background"]);
CGMZ.Gathering.GaugeColor1 = Number(CGMZ.Gathering.parameters["Gauge Color 1"]);
CGMZ.Gathering.GaugeColor2 = Number(CGMZ.Gathering.parameters["Gauge Color 2"]);
CGMZ.Gathering.GatherWidth = Number(CGMZ.Gathering.parameters["Gather Width"]);
CGMZ.Gathering.GatherYOffset = Number(CGMZ.Gathering.parameters["Gather Y Offset"]);
CGMZ.Gathering.GatherGaugeHeight = Number(CGMZ.Gathering.parameters["Gather Gauge Height"]);
CGMZ.Gathering.ListWindowWidth = Number(CGMZ.Gathering.parameters["List Window Width"]);
CGMZ.Gathering.CustomSpace = Number(CGMZ.Gathering.parameters["Custom Space"]);
CGMZ.Gathering.HeaderColor1 = Number(CGMZ.Gathering.parameters["Header Color 1"]);
CGMZ.Gathering.HeaderColor2 = Number(CGMZ.Gathering.parameters["Header Color 2"]);
CGMZ.Gathering.LabelColor = Number(CGMZ.Gathering.parameters["Label Color"]);
CGMZ.Gathering.CategoryColumns = Number(CGMZ.Gathering.parameters["Category Columns"]);
CGMZ.Gathering.DrawTextOverBar = (CGMZ.Gathering.parameters["Draw Text Over Bar"] === 'true');
CGMZ.Gathering.DisableTouchUISpace = (CGMZ.Gathering.parameters["Disable Touch UI Space"] === 'true');
CGMZ.Gathering.ListWindowRight = (CGMZ.Gathering.parameters["List Window Right"] === 'true');
CGMZ.Gathering.Nodes = CGMZ_Utils.parseJSON(CGMZ.Gathering.parameters["Nodes"], [], "[CGMZ] Gathering", "Your gathering nodes parameter had invalid JSON, no nodes could be parsed");
CGMZ.Gathering.Plantables = CGMZ_Utils.parseJSON(CGMZ.Gathering.parameters["Plantables"], [], "[CGMZ] Gathering", "Your plantables parameter had invalid JSON, no plantables could be parsed");
CGMZ.Gathering.SuccessSounds = CGMZ_Utils.parseJSON(CGMZ.Gathering.parameters["Success Sound Effects"], [], "[CGMZ] Gathering", "Your Success Sound Effects parameter had invalid JSON, no sounds could be parsed").map(json => {
	return CGMZ_Utils.parseSoundEffectJSON(json, "[CGMZ] Gathering");
}).filter(x => !!x.name);
CGMZ.Gathering.FailSounds = CGMZ_Utils.parseJSON(CGMZ.Gathering.parameters["Fail Sound Effects"], [], "[CGMZ] Gathering", "Your Fail Sound Effects parameter had invalid JSON, no sounds could be parsed").map(json => {
	return CGMZ_Utils.parseSoundEffectJSON(json, "[CGMZ] Gathering");
}).filter(x => !!x.name);
CGMZ.Gathering.DisplayInfo = CGMZ_Utils.parseJSON(CGMZ.Gathering.parameters["Display Info"], [], "[CGMZ] Gathering", "Your Display Info parameter had invalid JSON, no sounds could be parsed");
CGMZ.Gathering.JournalCategories = CGMZ_Utils.parseJSON(CGMZ.Gathering.parameters["Journal Categories"], [], "[CGMZ] Gathering", "Your Journal Categories parameter had invalid JSON, no sounds could be parsed");
CGMZ.Gathering.SuccessRumble = CGMZ_Utils.parseRumbleJSON(CGMZ.Gathering.parameters["Success Rumble"], "[CGMZ] Gathering");
CGMZ.Gathering.FailRumble = CGMZ_Utils.parseRumbleJSON(CGMZ.Gathering.parameters["Fail Rumble"], "[CGMZ] Gathering");
//=============================================================================
// CGMZ_GatherNode
//-----------------------------------------------------------------------------
// Temp data class used to track gathering node properties
//=============================================================================
function CGMZ_GatherNode() {
    this.initialize(...arguments);
}
//-----------------------------------------------------------------------------
// Initialize
//-----------------------------------------------------------------------------
CGMZ_GatherNode.prototype.initialize = function(node) {
	this._id = node.Id;
	this._name = node.Name;
	this._type = node.Type;
	this._successChance = Number(node["Success Chance"]);
	this._gatherTime = Number(node["Gather Time"]);
	this._discoveryStage = Number(node["Discover Stage"]);
	this._successCommonEvent = Number(node["Success Common Event"]);
	this._failCommonEvent = Number(node["Fail Common Event"]);
	this._gaugeColor1 = Number(node["Gauge Color 1"]);
	this._gaugeColor2 = Number(node["Gauge Color 2"]);
	this._gatherTimes = Number(node["Gather Times"]);
	this._gatherTimesVariance = Number(node["Gather Times Variance"]);
	this._toolFailMessage = node["Tool Fail Message"];
	this._professionFailMessage = node["Profession Fail Message"];
	this.setupGrowthStages(CGMZ_Utils.parseJSON(node["Growth Stages"], [], "[CGMZ] Gathering", `Your Gathering node with id ${this._id} had invalid growth stages JSON which could not be read.`));
	this.setupHarvest(CGMZ_Utils.parseJSON(node.Items, [], "[CGMZ] Gathering", `Your Gathering node with id ${this._id} had invalid items JSON which could not be read.`));
	this.setupTools(CGMZ_Utils.parseJSON(node["Tool Requirements"], [], "[CGMZ] Gathering", `Your Gathering node with id ${this._id} had invalid tool JSON which could not be read.`));
	// Sound Effect Setup
	this._soundEffects = {success: [], fail: []};
	this.setupSE("success", node["Success Sound Effects"]);
	this.setupSE("fail", node["Fail Sound Effects"]);
	// CGMZ Professions Integration
	this._profession = node.Profession;
	this._exp = Number(node.Exp);
	this._expPenaltyRate = Number(node["Expired Exp Penalty"]) / 100.0;
	this._levelReq = Number(node["Level Requirement"]);
	this._levelSuccessBonus = Number(node["Level Success Bonus"]);
	// CGMZ Toast Manager integration
	this._failToast = node["Fail Toast"];
	this._successToast = node["Success Toast"];
	// Journal Options
	this.journalCategory = node["Journal Category"];
	this.journalName = node["Journal Name"] || node.Name;
	this.journalDescription = node["Journal Description"];
	this.journalImage = node["Journal Image"];
	this.journalIcon = Number(node["Journal Icon"]);
	this.journalLocation = node["Journal Location"];
	this.journalFlavorTexts = CGMZ_Utils.parseJSON(node["Flavor Texts"], [], "[CGMZ] Gathering", `Your Gathering node with id ${this._id} had invalid Flavor Texts JSON which could not be read.`);
	this.journalFlavorHeaders = CGMZ_Utils.parseJSON(node["Flavor Headers"], [], "[CGMZ] Gathering", `Your Gathering node with id ${this._id} had invalid Flavor Headers JSON which could not be read.`);
	this.journalFlavorImages = CGMZ_Utils.parseJSON(node["Flavor Images"], [], "[CGMZ] Gathering", `Your Gathering node with id ${this._id} had invalid Flavor Images JSON which could not be read.`);
};
//-----------------------------------------------------------------------------
// Setup growth stages
//-----------------------------------------------------------------------------
CGMZ_GatherNode.prototype.setupGrowthStages = function(stages) {
	this._stages = [];
	for(const stageJSON of stages) {
		const stage = {};
		const parsedStage = CGMZ_Utils.parseJSON(stageJSON, null, "[CGMZ] Gathering", `Your Gathering node with id ${this._id} had an invalid growth stage JSON which could not be read`);
		if(!parsedStage) continue;
		stage.id = parsedStage.Id;
		stage.growthTime = Number(parsedStage["Growth Time"]);
		stage.growthVariance = Number(parsedStage["Growth Variance"]);
		stage.image = parsedStage.Image;
		stage.frameWidth = Number(parsedStage["Frame Width"]);
		stage.animationDelay = Number(parsedStage["Animation Delay"]);
		stage.mature = (parsedStage.Mature === 'true');
		stage.expired = (parsedStage.Expired === 'true');
		stage.eventPriority = Number(parsedStage["Event Priority"]);
		this._stages.push(stage);
	}
	// Make sure the last growth stage has a growth time of 0 and variance of 0 to prevent extremely common user error
	if(this._stages.length) {
		this._stages[this._stages.length - 1].growthTime = 0;
		this._stages[this._stages.length - 1].growthVariance = 0;
	}
};
//-----------------------------------------------------------------------------
// Setup harvest items
//-----------------------------------------------------------------------------
CGMZ_GatherNode.prototype.setupHarvest = function(items) {
	this._harvest = [];
	for(const itemJSON of items) {
		const harvestItem = {};
		const item = CGMZ_Utils.parseJSON(itemJSON, null, "[CGMZ] Gathering", `Your Gathering node with id ${this._id} had an invalid item JSON which could not be read`);
		if(!item) continue;
		harvestItem.itemId = Number(item.Item);
		harvestItem.amount = Number(item.Amount);
		harvestItem.variance = Number(item["Amount Variance"]);
		harvestItem.addVarianceOnly = (item["Add Variance Only"] === 'true');
		harvestItem.chance = Number(item.Chance);
		harvestItem.expired = (item["Award When Expired"] === 'true');
		this._harvest.push(harvestItem);
	}
};
//-----------------------------------------------------------------------------
// Setup tool tiers
//-----------------------------------------------------------------------------
CGMZ_GatherNode.prototype.setupTools = function(tools) {
	this._toolTiers = [];
	for(const toolJSON of tools) {
		const toolObj = {};
		const tool = CGMZ_Utils.parseJSON(toolJSON, null, "[CGMZ] Gathering", `Your Gathering node with id ${this._id} had an invalid tool JSON which could not be read`);
		if(!tool) continue;
		toolObj.itemId = Number(tool.Item);
		toolObj.weaponId = Number(tool.Weapon);
		toolObj.armorId = Number(tool.Armor);
		toolObj.successBonus = Number(tool["Success Bonus"]);
		this._toolTiers.push(toolObj);
	}
};
//-----------------------------------------------------------------------------
// Setup sound effects
//-----------------------------------------------------------------------------
CGMZ_GatherNode.prototype.setupSE = function(type, seJSONArray) {
const seArray = CGMZ_Utils.parseJSON(seJSONArray, [], "[CGMZ] Gathering", `Your gathering node with id ${this._id} had invalid sound effects of type ${type}`);
	for(const seJSON of seArray) {
		const se = CGMZ_Utils.parseSoundEffectJSON(seJSON, "[CGMZ] Gathering");
		if(!se.name) continue;
		if(type === "success") {
			this._soundEffects.success.push(se);
		} else {
			this._soundEffects.fail.push(se);
		}
	}
};
//-----------------------------------------------------------------------------
// Get sound effects of specified type
//-----------------------------------------------------------------------------
CGMZ_GatherNode.prototype.getSoundEffects = function(type) {
	switch(type) {
		case 'success': return this._soundEffects.success;
		case 'fail': return this._soundEffects.fail;
	}
};
//-----------------------------------------------------------------------------
// Determine which stage to be when first discovered
//-----------------------------------------------------------------------------
CGMZ_GatherNode.prototype.getDiscoveryStage = function() {
	if(this._discoveryStage !== -1) return this._discoveryStage;
	return Math.floor(Math.random() * this._stages.length);
};
//-----------------------------------------------------------------------------
// Determine which stage to be when first discovered
//-----------------------------------------------------------------------------
CGMZ_GatherNode.prototype.getGrowthTime = function(stage) {
	let growthTime = this._stages[stage].growthTime;
	growthTime += (Math.round(Math.random()) * 2 - 1) * Math.floor(Math.random() * this._stages[stage].growthVariance);
	return growthTime;
};
//-----------------------------------------------------------------------------
// Determine amount of times this node will be harvestable
//-----------------------------------------------------------------------------
CGMZ_GatherNode.prototype.makeGatherTimes = function() {
	return Math.max(1, CGMZ_Utils.applyAddVariance(this._gatherTimes, this._gatherTimesVariance));
};
//-----------------------------------------------------------------------------
// Get a stage
//-----------------------------------------------------------------------------
CGMZ_GatherNode.prototype.getStage = function(num) {
	return this._stages[num];
};
//-----------------------------------------------------------------------------
// Get highest tool tier available
//-----------------------------------------------------------------------------
CGMZ_GatherNode.prototype.getBestToolTierAvailable = function() {
	let tool = null;
	for(const toolObj of this._toolTiers) {
		if(toolObj.itemId > 0 && !$gameParty.hasItem(CGMZ_Utils.lookupItem('item', toolObj.itemId), false)) {
			continue;
		}
		if(toolObj.weaponId > 0 && !$gameParty.hasItem(CGMZ_Utils.lookupItem('weapon', toolObj.weaponId), true)) {
			continue;
		}
		if(toolObj.armorId > 0 && !$gameParty.hasItem(CGMZ_Utils.lookupItem('armor', toolObj.armorId), true)) {
			continue;
		}
		if(!tool) {
			tool = toolObj;
		} else if(toolObj.successBonus > tool.successBonus) {
			tool = toolObj;
		}
	}
	return tool;
};
//-----------------------------------------------------------------------------
// Check if the node has tools required for gathering
//-----------------------------------------------------------------------------
CGMZ_GatherNode.prototype.hasTools = function() {
	return this._toolTiers.length > 0;
};
//=============================================================================
// CGMZ_GatherNodeManager
//-----------------------------------------------------------------------------
// Data class used to manage gathering nodes
//=============================================================================
function CGMZ_GatherNodeManager() {
    this.initialize(...arguments);
}
//-----------------------------------------------------------------------------
// Initialize
//-----------------------------------------------------------------------------
CGMZ_GatherNodeManager.prototype.initialize = function() {
	this._nodes = {};
};
//-----------------------------------------------------------------------------
// Register node - does nothing if node already exists
//-----------------------------------------------------------------------------
CGMZ_GatherNodeManager.prototype.registerNode = function(key, nodeId, resetMode) {
	if(!this._nodes[key]) {
		this.generateNewNode(key, nodeId, resetMode);
	}
};
//-----------------------------------------------------------------------------
// Generate a new node (possibly over existing node)
//-----------------------------------------------------------------------------
CGMZ_GatherNodeManager.prototype.generateNewNode = function(key, nodeId, resetMode) {
	const nodeInfo = $cgmzTemp.getGatheringNode(nodeId);
	if(!nodeInfo) return;
	const node = {};
	node.id = nodeId;
	node.gatherTimes = nodeInfo.makeGatherTimes();
	node.stage = nodeInfo.getDiscoveryStage();
	const growthTime = nodeInfo.getGrowthTime(node.stage);
	node.frameCount = growthTime === 0 ? 0 : growthTime + Graphics.frameCount;
	node.resetMode = resetMode;
	this._nodes[key] = node;
};
//-----------------------------------------------------------------------------
// Advance a node's stage by 1
//-----------------------------------------------------------------------------
CGMZ_GatherNodeManager.prototype.advanceNodeStage = function(key) {
	const node = this.node(key);
	if(!node) return;
	const nodeInfo = $cgmzTemp.getGatheringNode(node.id);
	if(!nodeInfo || nodeInfo._stages.length - 1 <= node.stage) return;
	node.stage++;
	const growthTime = nodeInfo.getGrowthTime(node.stage);
	node.frameCount = (growthTime === 0) ? 0 : growthTime + node.frameCount;
	this.checkNodePriority(key);
};
//-----------------------------------------------------------------------------
// Check a node's priority
//-----------------------------------------------------------------------------
CGMZ_GatherNodeManager.prototype.checkNodePriority = function(key) {
	if(!key) return;
	const parts = key.split('-');
	if(Number(parts[0]) === $gameMap.mapId()) {
		const ev = $gameMap.event(Number(parts[1]));
		if(ev) ev.CGMZ_setGatheringPriority();
	}
};
//-----------------------------------------------------------------------------
// Reset a node
//-----------------------------------------------------------------------------
CGMZ_GatherNodeManager.prototype.onPostGather = function(key) {
	const node = this.node(key);
	if(!node) return;
	if(!node.gatherTimes) node.gatherTimes = 1;
	node.gatherTimes--;
	if(node.gatherTimes > 0) return;
	if(!node.resetMode) {
		this.resetNode(key);
		return;
	}
	switch(node.resetMode) {
		case 'delete': this.deleteNode(key); break;
		case 'reset':
		default: this.resetNode(key);
	}
};
//-----------------------------------------------------------------------------
// Reset a node
//-----------------------------------------------------------------------------
CGMZ_GatherNodeManager.prototype.resetNode = function(key) {
	const node = this.node(key);
	if(!node) return;
	const nodeInfo = $cgmzTemp.getGatheringNode(node.id);
	if(!nodeInfo) return;
	node.stage = 0;
	node.gatherTimes = nodeInfo.makeGatherTimes();
	const growthTime = nodeInfo.getGrowthTime(node.stage);
	node.frameCount = (growthTime === 0) ? 0 : growthTime + Graphics.frameCount;
};
//-----------------------------------------------------------------------------
// Delete a node entirely
//-----------------------------------------------------------------------------
CGMZ_GatherNodeManager.prototype.deleteNode = function(key) {
	const node = this.node(key);
	if(!node) return;
	delete this._nodes[key];
	const keyParts = key.split("-");
	const mapId = Number(keyParts[0]);
	const eventId = Number(keyParts[1]);
	if($gameMap.mapId() === mapId) {
		const ev = $gameMap.event(eventId);
		if(ev) {
			ev.CGMZ_clearGatherInfo();
		}
	}
};
//-----------------------------------------------------------------------------
// Get a node
//-----------------------------------------------------------------------------
CGMZ_GatherNodeManager.prototype.node = function(key) {
	return this._nodes[key];
};
//-----------------------------------------------------------------------------
// Get all nodes
//-----------------------------------------------------------------------------
CGMZ_GatherNodeManager.prototype.getAllNodes = function() {
	return this._nodes;
};
//-----------------------------------------------------------------------------
// Get Plantable node
//-----------------------------------------------------------------------------
CGMZ_GatherNodeManager.prototype.getPlantableNode = function(mapId, eventId) {
	for(const key of Object.keys(this._nodes)) {
		const keyParts = key.split("-");
		const keyMapId = Number(keyParts[0]);
		const keyEventId = Number(keyParts[1]);
		if(mapId === keyMapId && eventId === keyEventId) {
			return key;
		}
	}
	return "";
};
//=============================================================================
// CGMZ_GatherPlantable
//-----------------------------------------------------------------------------
// Temp data class used to track gathering plantables
//=============================================================================
function CGMZ_GatherPlantable() {
    this.initialize(...arguments);
}
//-----------------------------------------------------------------------------
// Initialize
//-----------------------------------------------------------------------------
CGMZ_GatherPlantable.prototype.initialize = function(data) {
	this._nodeId = data["Node Id"];
	this._profession = data.Profession;
	this._levelReq = Number(data["Level Requirement"]);
	this._item = Number(data.Item);
};
//=============================================================================
// CGMZ_GatherJournalCategory
//-----------------------------------------------------------------------------
// Temp data class used to track gather journal categories
//=============================================================================
function CGMZ_GatherJournalCategory() {
    this.initialize(...arguments);
}
//-----------------------------------------------------------------------------
// Initialize
//-----------------------------------------------------------------------------
CGMZ_GatherJournalCategory.prototype.initialize = function(data) {
	this.id = data.id;
	this.name = data.Name;
	this.icon = Number(data.Icon);
	this.backImg = data["Background Image"];
	this.backImgX = Number(data["Background Image X"]);
	this.backImgY = Number(data["Background Image Y"]);
};
//=============================================================================
// CGMZ_GatherNodeSaved
//-----------------------------------------------------------------------------
// Saved data class used to track gathering node saved info
//=============================================================================
function CGMZ_GatherNodeSaved() {
    this.initialize(...arguments);
}
//-----------------------------------------------------------------------------
// Initialize
//-----------------------------------------------------------------------------
CGMZ_GatherNodeSaved.prototype.initialize = function(id) {
	this._id = id;
	this._gatherTimes = 0;
	this._isDiscovered = false;
	this._isNew = false;
};
//-----------------------------------------------------------------------------
// Processing on gather
//-----------------------------------------------------------------------------
CGMZ_GatherNodeSaved.prototype.onGather = function() {
	this._gatherTimes++;
	this.tryDiscover();
};
//-----------------------------------------------------------------------------
// Try to discover this node, only works if not already discovered
//-----------------------------------------------------------------------------
CGMZ_GatherNodeSaved.prototype.tryDiscover = function() {
	if(!this._isDiscovered) {
		this._isDiscovered = true;
		this._isNew = true;
	}
};
//-----------------------------------------------------------------------------
// Get the gatheirng count
//-----------------------------------------------------------------------------
CGMZ_GatherNodeSaved.prototype.getGatheringCount = function() {
	return this._gatherTimes;
};
//=============================================================================
// CGMZ_Core
//-----------------------------------------------------------------------------
// Handle saved gathering node data
//=============================================================================
//-----------------------------------------------------------------------------
// Also initialize gather node manager data
//-----------------------------------------------------------------------------
const alias_CGMZ_Gathering_CGMZ_Core_createPluginData = CGMZ_Core.prototype.createPluginData;
CGMZ_Core.prototype.createPluginData = function() {
	alias_CGMZ_Gathering_CGMZ_Core_createPluginData.call(this);
	this.initializeGatheringData(false);
};
//-----------------------------------------------------------------------------
// Initialize character part data
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.initializeGatheringData = function(reinitialize) {
	if(!this._gatherNodeManager || reinitialize) {
		this._gatherNodeManager = new CGMZ_GatherNodeManager();
	}
	if(!this._gatherNodeStats) {
		this._gatherNodeStats = {};
	}
};
//-----------------------------------------------------------------------------
// Check if gather node manager should be created in save game.
//-----------------------------------------------------------------------------
const alias_CGMZ_Gathering_CGMZ_Core_onAfterLoad = CGMZ_Core.prototype.onAfterLoad;
CGMZ_Core.prototype.onAfterLoad = function() {
	alias_CGMZ_Gathering_CGMZ_Core_onAfterLoad.call(this);
	this.initializeGatheringData(false);
};
//-----------------------------------------------------------------------------
// Get the gather node manager
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.gatherNodeManager = function() {
	return this._gatherNodeManager;
};
//-----------------------------------------------------------------------------
// Get gather node saved data
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.getGatherStats = function(nodeId) {
	return this._gatherNodeStats[nodeId];
};
//-----------------------------------------------------------------------------
// Add 1 to amount of times a node type has been gathered
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.onGatheringFinish = function(nodeId, success) {
	if(!this._gatherNodeStats[nodeId] || typeof this._gatherNodeStats[nodeId] === 'number') { // typeof check needed for backward compatibility with pre Alpha R7
		this._gatherNodeStats[nodeId] = new CGMZ_GatherNodeSaved(nodeId);
	}
	const stat = this._gatherNodeStats[nodeId];
	stat?.onGather();
};
//-----------------------------------------------------------------------------
// Get amount of times a node has been gathered
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.getGatheringCount = function(nodeId) {
	const stat = this._gatherNodeStats[nodeId];
	return (stat) ? stat.getGatheringCount() : 0;
};
//=============================================================================
// CGMZ_Temp
//-----------------------------------------------------------------------------
// Add temp gathering node data and plugin commands
//=============================================================================
//-----------------------------------------------------------------------------
// Also initialize gathering node data
//-----------------------------------------------------------------------------
const alias_CGMZ_Gathering_CGMZ_Temp_createPluginData = CGMZ_Temp.prototype.createPluginData;
CGMZ_Temp.prototype.createPluginData = function() {
	alias_CGMZ_Gathering_CGMZ_Temp_createPluginData.call(this);
	this.initializeGatheringData();
};
//-----------------------------------------------------------------------------
// Initialize gathering data
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.initializeGatheringData = function() {
	this._gatheringNodes = {};
	this._gatheringPlantables = {};
	this._isPlanting = false;
	this.ignorePlantingCommand = false;
	this.plantedNodeId = "";
	this.plantingType = "";
	for(const nodeJSON of CGMZ.Gathering.Nodes) {
		const node = CGMZ_Utils.parseJSON(nodeJSON, null, "[CGMZ] Gathering", "One of your gathering nodes had invalid JSON and could not be parsed");
		if(!node) continue;
		this._gatheringNodes[node.Id] = new CGMZ_GatherNode(node);
	}
	for(const plantJSON of CGMZ.Gathering.Plantables) {
		const plant = CGMZ_Utils.parseJSON(plantJSON, null, "[CGMZ] Gathering", "One of your plantables had invalid JSON and could not be parsed");
		if(!plant) continue;
		const types = CGMZ_Utils.parseJSON(plant["Plantable Types"], [], "[CGMZ] Gathering", `One of your plantables with node id ${plant["Node Id"]} had invalid Plantable Types and could not be added`);
		const plantable = new CGMZ_GatherPlantable(plant);
		for(const type of types) {
			if(!type) continue;
			if(!this._gatheringPlantables.hasOwnProperty(type)) {
				this._gatheringPlantables[type] = [];
			}
			this._gatheringPlantables[type].push(plantable);
		}
	}
	this._gatheringJournalCategories = {};
	for(const catJSON of CGMZ.Gathering.JournalCategories) {
		const p = CGMZ_Utils.parseJSON(catJSON, null, '[CGMZ] Gathering', 'One of your journal categories was invalid and could not be read.');
		if(!p) continue;
		const cat = new CGMZ_GatherJournalCategory(p);
		this._gatheringJournalCategories[cat.id] = cat;
	}
};
//-----------------------------------------------------------------------------
// Check if player is planting something
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.isPlanting = function() {
	return this._isPlanting;
};
//-----------------------------------------------------------------------------
// Get gathering node by id
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.getGatheringNode = function(id) {
	return this._gatheringNodes[id];
};
//-----------------------------------------------------------------------------
// Get plantable object array by plantable type
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.getGatheringPlantablesForType = function(type) {
	return this._gatheringPlantables[type];
};
//-----------------------------------------------------------------------------
// Get gathering journal category by id
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.getGatheringJournalCategory = function(id) {
	return this._gatheringJournalCategories[id];
};
//-----------------------------------------------------------------------------
// Get all journal categories
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.getAllGatherJournalCategories = function() {
	return Object.keys(this._gatheringJournalCategories);
};
//-----------------------------------------------------------------------------
// Get all journal categories
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.getAllDiscoveredGatherJournalCategories = function() {
	const possibleCategories = this.getAllGatherJournalCategories();
	return possibleCategories.filter(cat => $cgmzTemp.getAllDiscoveredGatherNodesInCategory(cat).length > 0)
};
//-----------------------------------------------------------------------------
// Get all gathering nodes in a specific category of the gather journal
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.getAllGatherNodesInCategory = function(categoryId) {
	const nodeIds = Object.keys(this._gatheringNodes);
	const nodes = [];
	for(const nodeId of nodeIds) {
		const node = this.getGatheringNode(nodeId);
		if(node.journalCategory === categoryId) nodes.push(nodeId);
	}
	return nodes;
};
//-----------------------------------------------------------------------------
// Get all gathering nodes in a specific category of the gather journal
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.getAllDiscoveredGatherNodesInCategory = function(categoryId) {
	const nodeIds = Object.keys(this._gatheringNodes);
	const nodes = [];
	for(const nodeId of nodeIds) {
		const node = this.getGatheringNode(nodeId);
		const nodeSaved = $cgmz.getGatherStats(nodeId);
		if(node.journalCategory === categoryId && nodeSaved && nodeSaved._isDiscovered) nodes.push(nodeId);
	}
	return nodes;
};
//-----------------------------------------------------------------------------
// Start the planting process
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.startGatherPlanting = function(type) {
	this._isPlanting = true;
	this.plantingType = type;
	this.plantedNodeId = "";
};
//-----------------------------------------------------------------------------
// Stop the planting process
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.stopGatherPlanting = function(item) {
	this._isPlanting = false;
	this.plantingType = "";
	this.plantedNodeId = (item) ? item._nodeId : "";
};
//-----------------------------------------------------------------------------
// Check if party can gather the node
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.checkGatheringAbility = function(node, stage) {
	if(!node.getStage(stage).mature) {
		return false;
	}
	if(Imported.CGMZ_Professions && !this.gatheringProfessionCheck(node)) {
		$gameMessage.setBackground(CGMZ.Gathering.MessageBackground);
		$gameMessage.add(this.getGatherFailMessage("profession", node));
		return false;
	}
	if(!this.gatheringToolCheck(node)) {
		$gameMessage.setBackground(CGMZ.Gathering.MessageBackground);
		$gameMessage.add(this.getGatherFailMessage("tool", node));
		return false;
	}
	if(!this.gatheringCustomCheck(node)) {
		return false;
	}
	return true;
};
//-----------------------------------------------------------------------------
// Check if gather node profession requirements are met
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.gatheringProfessionCheck = function(node) {
	const profession = $cgmz.getProfession(node._profession);
	if(profession) {
		return profession.getBuffedLevel() >= node._levelReq;
	}
	return true;
};
//-----------------------------------------------------------------------------
// Check if gather node profession requirements are met
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.gatheringToolCheck = function(node) {
	if(!node.hasTools()) return true;
	return !!node.getBestToolTierAvailable();
};
//-----------------------------------------------------------------------------
// Get failure message for gather
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.getGatherFailMessage = function(failType, node) {
	let failMessage = "";
	switch(failType) {
		case "profession": failMessage = node._professionFailMessage || CGMZ.Gathering.ProfessionFailMsg; break;
		case "tool": failMessage = node._toolFailMessage || CGMZ.Gathering.ToolFailMsg; break;
	}
	failMessage = failMessage.replace(/%level/g, node._levelReq);
	if(Imported.CGMZ_Professions) {
		const prof = $cgmz.getProfession(node._profession);
		if(prof) {
			failMessage = failMessage.replace(/%prof/g, prof._name);
		}
	}
	return failMessage;
};
//-----------------------------------------------------------------------------
// Custom gathering conditions
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.gatheringCustomCheck = function(node) {
	return true;
};
//-----------------------------------------------------------------------------
// Register Gathering Plugin Commands
//-----------------------------------------------------------------------------
const alias_CGMZ_Gathering_CGMZ_Temp_registerPluginCommands = CGMZ_Temp.prototype.registerPluginCommands;
CGMZ_Temp.prototype.registerPluginCommands = function() {
	alias_CGMZ_Gathering_CGMZ_Temp_registerPluginCommands.call(this);
	PluginManager.registerCommand("CGMZ_Gathering", "Call Scene", this.pluginCommandGatheringCallScene);
	PluginManager.registerCommand("CGMZ_Gathering", "Start Planting", this.pluginCommandGatheringStartPlanting);
	PluginManager.registerCommand("CGMZ_Gathering", "Advance Node Stage", this.pluginCommandGatheringAdvanceNodeStage);
	PluginManager.registerCommand("CGMZ_Gathering", "Reset Node", this.pluginCommandGatheringResetNode);
	PluginManager.registerCommand("CGMZ_Gathering", "Get Node Stage", this.pluginCommandGatheringGetNodeStage);
	PluginManager.registerCommand("CGMZ_Gathering", "Advance Every Node", this.pluginCommandGatheringAdvanceEveryNode);
	PluginManager.registerCommand("CGMZ_Gathering", "Get Harvest Amount", this.pluginCommandGatheringGetHarvestAmount);
};
//-----------------------------------------------------------------------------
// Plugin Command - Call Scene
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.pluginCommandGatheringCallScene = function(args) {
	const categories = CGMZ_Utils.parseJSON(args.Categories, [], "[CGMZ] Gathering", "Your categories list in the Call Scene Plugin Command were set up incorrectly and could not be read.");
	SceneManager.push(CGMZ_Scene_GatherJournal);
	SceneManager.prepareNextScene(categories);
};
//-----------------------------------------------------------------------------
// Plugin Command - Start Planting
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.pluginCommandGatheringStartPlanting = function(args) {
	if(this.CGMZ_getGatheringState() !== 'none' || $cgmzTemp.ignorePlantingCommand) return;
	const type = args["Type"];
	const plants = $cgmzTemp.getGatheringPlantablesForType(type);
	if(!plants) return;
	$cgmzTemp.startGatherPlanting(type);
	this.setWaitMode('CGMZ_gatheringPlanting');
};
//-----------------------------------------------------------------------------
// Plugin Command - Advance Node Stage
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.pluginCommandGatheringAdvanceNodeStage = function(args) {
	const key = args["Map Id"] + "-" + args["Event Id"] + "-" + args["Node Id"];
	const node = $cgmz.gatherNodeManager().advanceNodeStage(key);
};
//-----------------------------------------------------------------------------
// Plugin Command - Reset Node
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.pluginCommandGatheringResetNode = function(args) {
	const key = args["Map Id"] + "-" + args["Event Id"] + "-" + args["Node Id"];
	const node = $cgmz.gatherNodeManager().resetNode(key);
};
//-----------------------------------------------------------------------------
// Plugin Command - Get Node Stage
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.pluginCommandGatheringGetNodeStage = function(args) {
	const key = args["Map Id"] + "-" + args["Event Id"] + "-" + args["Node Id"];
	const node = $cgmz.gatherNodeManager().node(key);
	if(node) {
		$gameVariables.setValue(Number(args["Variable Id"]), node.stage);
	}
};
//-----------------------------------------------------------------------------
// Plugin Command - Advance Every Node
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.pluginCommandGatheringAdvanceEveryNode = function(args) {
	const manager = $cgmz.gatherNodeManager();
	const nodes = manager.getAllNodes();
	const exclusion = (args["Exclusion Mode"] === 'true');
	for(const key of Object.keys(nodes)) {
		node = manager.node(key);
		if(!args.id) {
			manager.advanceNodeStage(key);
		} else if(node.id === args.id) {
			if(!exclusion) {
				manager.advanceNodeStage(key);
			}
		} else {
			if(exclusion) {
				manager.advanceNodeStage(key);
			}
		}
	}
};
//-----------------------------------------------------------------------------
// Plugin Command - Get Harvest Amount
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.pluginCommandGatheringGetHarvestAmount = function(args) {
	const nodeId = args["Node Id"];
	const varId = Number(args["Variable Id"]);
	$gameVariables.setValue(varId, $cgmz.getGatheringCount(nodeId));
};
//=============================================================================
// Game_Event
//-----------------------------------------------------------------------------
// Handling for gathering nodes
//=============================================================================
//-----------------------------------------------------------------------------
// Also initialize gathering node property
//-----------------------------------------------------------------------------
const alias_CGMZ_Gathering_Game_Event_initMembers = Game_Event.prototype.initMembers;
Game_Event.prototype.initMembers = function() {
	alias_CGMZ_Gathering_Game_Event_initMembers.call(this);
	this.CGMZ_clearGatherInfo();
};
//-----------------------------------------------------------------------------
// Clear any gathering info stored in the event
//-----------------------------------------------------------------------------
Game_Event.prototype.CGMZ_clearGatherInfo = function() {
    this._CGMZ_gatheringNodeKey = "";
};
//-----------------------------------------------------------------------------
// Check if page identifies itself as gathering node
//-----------------------------------------------------------------------------
const alias_CGMZ_Gathering_Game_Event_setupPageSettings = Game_Event.prototype.setupPageSettings;
Game_Event.prototype.setupPageSettings = function() {
    alias_CGMZ_Gathering_Game_Event_setupPageSettings.call(this);
	this.CGMZ_clearGatherInfo();
	const page = this.page();
	for(const command of page.list) {
		if(command.code === 108 && command.parameters[0].trim().includes("CGMZ GATHERING")) {
			const nodeId = command.parameters[0].split(" ")[2];
			this.CGMZ_setNewGatherNodeId(nodeId, "reset");
			break;
		} else if(command.code === 357) {
			const pluginName = Utils.extractFileName(command.parameters[0]);
			if(pluginName === 'CGMZ_Gathering' && command.parameters[1] === 'Start Planting') {
				const plantedKey = $cgmz.gatherNodeManager().getPlantableNode($gameMap.mapId(), this.eventId());
				if(plantedKey) this._CGMZ_gatheringNodeKey = plantedKey;
			}
		}
	}
};
//-----------------------------------------------------------------------------
// Clear ignore plant command when event starts
//-----------------------------------------------------------------------------
const alias_CGMZGathering_GameEvent_start = Game_Event.prototype.start;
Game_Event.prototype.start = function() {
    alias_CGMZGathering_GameEvent_start.call(this);
	$cgmzTemp.ignorePlantingCommand = false;
};
//-----------------------------------------------------------------------------
// Set a new gather node id
//-----------------------------------------------------------------------------
Game_Event.prototype.CGMZ_setNewGatherNodeId = function(nodeId, resetMode) {
    this._CGMZ_gatheringNodeKey = this._mapId + "-" + this._eventId + "-" + nodeId;
	$cgmz.gatherNodeManager().registerNode(this._CGMZ_gatheringNodeKey, nodeId, resetMode);
	const node = $cgmz.gatherNodeManager().node(this._CGMZ_gatheringNodeKey);
	const nodeInfo = $cgmzTemp.getGatheringNode(nodeId);
	if(nodeInfo) {
		const stageInfo = nodeInfo.getStage(node.stage);
		this.setPriorityType(stageInfo.eventPriority);
	}
};
//-----------------------------------------------------------------------------
// Also update event gathering node
//-----------------------------------------------------------------------------
const alias_CGMZ_Gathering_Game_Event_update = Game_Event.prototype.update;
Game_Event.prototype.update = function() {
    alias_CGMZ_Gathering_Game_Event_update.call(this);
    this.CGMZ_updateGatheringNode();
};
//-----------------------------------------------------------------------------
// Update node if exists
//-----------------------------------------------------------------------------
Game_Event.prototype.CGMZ_updateGatheringNode = function() {
	if(this._CGMZ_gatheringNodeKey) {
		const node = $cgmz.gatherNodeManager().node(this._CGMZ_gatheringNodeKey);
		if(node) {
			while(node.frameCount > 0 && node.frameCount <= Graphics.frameCount) {
				$cgmz.gatherNodeManager().advanceNodeStage(this._CGMZ_gatheringNodeKey);
				this.CGMZ_setGatheringPriority();
			}
		}
	}
};
//-----------------------------------------------------------------------------
// Set the gathering priority for this event
//-----------------------------------------------------------------------------
Game_Event.prototype.CGMZ_setGatheringPriority = function() {
	if(this._CGMZ_gatheringNodeKey) {
		const node = $cgmz.gatherNodeManager().node(this._CGMZ_gatheringNodeKey);
		const nodeInfo = $cgmzTemp.getGatheringNode(node.id);
		if(nodeInfo) {
			const stageInfo = nodeInfo.getStage(node.stage);
			this.setPriorityType(stageInfo.eventPriority);
		}
	}
};
//-----------------------------------------------------------------------------
// Check if event is gathering node
//-----------------------------------------------------------------------------
Game_Event.prototype.CGMZ_isGatheringNode = function() {
	return !!this._CGMZ_gatheringNodeKey;
};
//-----------------------------------------------------------------------------
// Check if event is gathering node
//-----------------------------------------------------------------------------
Game_Event.prototype.CGMZ_gatheringState = function() {
	if(this._CGMZ_gatheringNodeKey) {
		return "growing";
	}
	return "none";
};
//=============================================================================
// Spriteset_Map
//-----------------------------------------------------------------------------
// Add sprites of gathering nodes
//=============================================================================
//-----------------------------------------------------------------------------
// Also create gathering node sprites
//-----------------------------------------------------------------------------
const alias_CGMZ_Gathering_Spriteset_Map_createCharacters = Spriteset_Map.prototype.createCharacters;
Spriteset_Map.prototype.createCharacters = function() {
	alias_CGMZ_Gathering_Spriteset_Map_createCharacters.call(this);
	this._CGMZ_gatherSprites = [];
	for(const event of $gameMap.events()) {
		const sprite = new CGMZ_Sprite_GatherNode(event);
		this._CGMZ_gatherSprites.push(sprite);
		this._tilemap.addChild(sprite);
	}
};
//=============================================================================
// CGMZ_Sprite_GatherNode
//-----------------------------------------------------------------------------
// Sprite class for gather node images
//=============================================================================
function CGMZ_Sprite_GatherNode() {
    this.initialize(...arguments);
}
CGMZ_Sprite_GatherNode.prototype = Object.create(Sprite.prototype);
CGMZ_Sprite_GatherNode.prototype.constructor = CGMZ_Sprite_GatherNode;
//-----------------------------------------------------------------------------
// Initialize
//-----------------------------------------------------------------------------
CGMZ_Sprite_GatherNode.prototype.initialize = function(event) {
    Sprite.prototype.initialize.call(this);
	this._event = event;
	this.visible = false;
    this.initMembers();
};
//-----------------------------------------------------------------------------
// Initialize data
//-----------------------------------------------------------------------------
CGMZ_Sprite_GatherNode.prototype.initMembers = function() {
	this.anchor.x = 0.5;
    this.anchor.y = 1;
	this._nodeStage = 0;
	this._waitCounter = 0;
	this._nodeKey = "";
	this._node = null;
	this._anim = {};
};
//-----------------------------------------------------------------------------
// After bitmap is loaded
//-----------------------------------------------------------------------------
CGMZ_Sprite_GatherNode.prototype.onImageLoaded = function(bitmap) {
	this.bitmap = bitmap;
	this._waitCounter = 0;
	this._anim.currentFrame = 0;
	this._anim.maxFrames = Math.floor(this.bitmap.width / this._anim.frameWidth);
	this._anim.frameHeight = this.bitmap.height;
	const pw = this._anim.frameWidth;
	const ph = this._anim.frameHeight;
	const sx = 0;
	const sy = 0;
    this.setFrame(sx, sy, pw, ph);
	this.visible = true;
};
//-----------------------------------------------------------------------------
// Update sprite
//-----------------------------------------------------------------------------
CGMZ_Sprite_GatherNode.prototype.update = function() {
    Sprite.prototype.update.call(this);
	this.updatePosition();
	this.checkForNewNode();
	if(this._needsUpdate) {
		this.checkForNewStage();
		if(this.visible) {
			this.updateFrame();
		}
	}
};
//-----------------------------------------------------------------------------
// Check if node has changed
//-----------------------------------------------------------------------------
CGMZ_Sprite_GatherNode.prototype.checkForNewNode = function() {
	if(this._nodeKey !== this._event._CGMZ_gatheringNodeKey) {
		this._nodeKey = this._event._CGMZ_gatheringNodeKey;
		this._node = $cgmz.gatherNodeManager().node(this._nodeKey);
		this.visible = false;
		if(this._node) this.setupNode();
		this._needsUpdate = !!this._node;
	}
};
//-----------------------------------------------------------------------------
// Check if node stage has changed
//-----------------------------------------------------------------------------
CGMZ_Sprite_GatherNode.prototype.checkForNewStage = function() {
	if(this._nodeStage !== this._node.stage) {
		this.setupNode();
	}
};
//-----------------------------------------------------------------------------
// Set up gathering node stage
//-----------------------------------------------------------------------------
CGMZ_Sprite_GatherNode.prototype.setupNode = function() {
	this._nodeStage = this._node.stage;
	const nodeInfo = $cgmzTemp.getGatheringNode(this._node.id);
	const stage = nodeInfo.getStage(this._node.stage);
	this._anim.animationDelay = stage.animationDelay;
	this._anim.frameWidth = stage.frameWidth;
	this._anim.maxFrames = 1;
	const imageData = CGMZ_Utils.getImageData(stage.image, "img");
	const bitmap = ImageManager.loadBitmap(imageData.folder, imageData.filename);
	bitmap.addLoadListener(this.onImageLoaded.bind(this, bitmap));
	if(this._nodeStage === 0) this._event?.CGMZ_setGatheringPriority();
};
//-----------------------------------------------------------------------------
// Update position of gather node
//-----------------------------------------------------------------------------
CGMZ_Sprite_GatherNode.prototype.updatePosition = function() {
	this.x = this._event.screenX();
    this.y = this._event.screenY();
    this.z = this._event.screenZ();
};
//-----------------------------------------------------------------------------
// Update frame of gather node
//-----------------------------------------------------------------------------
CGMZ_Sprite_GatherNode.prototype.updateFrame = function() {
	this._waitCounter++;
	if(this._waitCounter > this._anim.animationDelay) {
		this._waitCounter = 0;
		this._anim.currentFrame = (this._anim.currentFrame + 1) % this._anim.maxFrames;
		const pw = this._anim.frameWidth;
		const ph = this._anim.frameHeight;
		const sx = this._anim.currentFrame * pw;
		const sy = 0;
        this.setFrame(sx, sy, pw, ph);
	}
};
//=============================================================================
// Game_Map
//-----------------------------------------------------------------------------
// Add processing of gathering node events
//=============================================================================
//-----------------------------------------------------------------------------
// Add gathering properties
//-----------------------------------------------------------------------------
const alias_CGMZ_Gathering_Game_Map_initialize = Game_Map.prototype.initialize;
Game_Map.prototype.initialize = function() {
	alias_CGMZ_Gathering_Game_Map_initialize.call(this);
	this._CGMZ_isGathering = false;
	this._CGMZ_gatherInfo = {node: null, params: null, nodeManagerRef: null};
};
//-----------------------------------------------------------------------------
// Check if event is gathering node, if so, perform gathering node functionality
// Also check if plantable event
//-----------------------------------------------------------------------------
const alias_CGMZ_Gathering_Game_Map_setupStartingMapEvent = Game_Map.prototype.setupStartingMapEvent
Game_Map.prototype.setupStartingMapEvent = function() {
	for (const event of this.events()) {
        if(event.isStarting() && event.CGMZ_isGatheringNode()) {
			this.CGMZ_attemptGather(event._CGMZ_gatheringNodeKey);
			if(!this.CGMZ_isGathering()) {
				event.clearStartingFlag();
			}
        }
    }
    return alias_CGMZ_Gathering_Game_Map_setupStartingMapEvent.call(this);
};
//-----------------------------------------------------------------------------
// Check if currently gathering something
//-----------------------------------------------------------------------------
Game_Map.prototype.CGMZ_isGathering = function() {
	return this._CGMZ_isGathering;
};
//-----------------------------------------------------------------------------
// Attempt to start gathering process
//-----------------------------------------------------------------------------
Game_Map.prototype.CGMZ_attemptGather = function(key) {
	const node = $cgmz.gatherNodeManager().node(key);
	const nodeInfo = $cgmzTemp.getGatheringNode(node.id);
	if(!nodeInfo || this._CGMZ_isGathering) return;
	if(this.CGMZ_isGathering() || !$cgmzTemp.checkGatheringAbility(nodeInfo, node.stage)) {
		return;
	}
	this.CGMZ_startGather(nodeInfo, key);
};
//-----------------------------------------------------------------------------
// Get amount of bonus to add to success
//-----------------------------------------------------------------------------
Game_Map.prototype.CGMZ_calculateNodeSuccessBonus = function(node) {
	let amount = 0;
	if(Imported.CGMZ_Professions) amount += this.CGMZ_gatheringProfessionSuccessBonus(node);
	amount += this.CGMZ_gatheringToolSuccessBonus(node);
	return amount;
};
//-----------------------------------------------------------------------------
// Get profession bonus amount
//-----------------------------------------------------------------------------
Game_Map.prototype.CGMZ_gatheringProfessionSuccessBonus = function(node) {
	const profession = $cgmz.getProfession(node._profession);
	if(profession) {
		return (profession.getBuffedLevel() - node._levelReq) * node._levelSuccessBonus;
	}
	return 0;
};
//-----------------------------------------------------------------------------
// Get tool bonus amount
//-----------------------------------------------------------------------------
Game_Map.prototype.CGMZ_gatheringToolSuccessBonus = function(node) {
	const bestTool = node.getBestToolTierAvailable();
	if(!bestTool) return 0;
	return bestTool.successBonus;
};
//-----------------------------------------------------------------------------
// Start gathering process
//-----------------------------------------------------------------------------
Game_Map.prototype.CGMZ_startGather = function(nodeInfo, key) {
	const nodeParams = {successBonus: 0};
	nodeParams.successBonus = this.CGMZ_calculateNodeSuccessBonus(nodeInfo);
	this._CGMZ_gatherInfo = {node: nodeInfo, params: nodeParams, nodeManagerRef: key};
	this._CGMZ_isGathering = true;
};
//-----------------------------------------------------------------------------
// Stop gathering process
//-----------------------------------------------------------------------------
Game_Map.prototype.CGMZ_stopGather = function(success) {
	this.CGMZ_playGatherFinishSoundEffect(success);
	if(success) {
		this.CGMZ_giveHarvestItems();
		this.CGMZ_awardGatheringProfessionExp();
	} else {
		this.CGMZ_showGatherFailMessage(this._CGMZ_gatherInfo.node._failToast);
	}
	this.CGMZ_doRumbleForGather(success);
	this.CGMZ_runGatheringCommonEvents(success);
	$cgmz.onGatheringFinish(this._CGMZ_gatherInfo.node._id, success);
	$cgmz.gatherNodeManager().onPostGather(this._CGMZ_gatherInfo.nodeManagerRef);
	this._CGMZ_isGathering = false;
};
//-----------------------------------------------------------------------------
// Rumble the controller if applicable
//-----------------------------------------------------------------------------
Game_Map.prototype.CGMZ_doRumbleForGather = function(success) {
	if(!Imported.CGMZ_Rumble) return;
	(success) ? $cgmzTemp.startRumble(CGMZ.Gathering.SuccessRumble) : $cgmzTemp.startRumble(CGMZ.Gathering.FailRumble);
};
//-----------------------------------------------------------------------------
// Play the gathering sound effect if one exists
//-----------------------------------------------------------------------------
Game_Map.prototype.CGMZ_playGatherFinishSoundEffect = function(success) {
	const globalSe = (success) ? CGMZ.Gathering.SuccessSounds : CGMZ.Gathering.FailSounds;
	const nodeSe = this._CGMZ_gatherInfo.node.getSoundEffects((success) ? 'success' : 'fail');
	const seArray = globalSe.concat(nodeSe);
	if(seArray.length > 0) {
		const i = Math.randomInt(seArray.length);
		AudioManager.playSe(seArray[i]);
	}
};
//-----------------------------------------------------------------------------
// SRun gathering common events
//-----------------------------------------------------------------------------
Game_Map.prototype.CGMZ_runGatheringCommonEvents = function(success) {
	const commonEvent = success ? this._CGMZ_gatherInfo.node._successCommonEvent : this._CGMZ_gatherInfo.node._failCommonEvent;
	if(commonEvent) {
		$gameTemp.reserveCommonEvent(commonEvent);
	}
};
//-----------------------------------------------------------------------------
// Show gather fail message
//-----------------------------------------------------------------------------
Game_Map.prototype.CGMZ_showGatherFailMessage = function(preset) {
	if(!Imported.CGMZ_ToastManager) return;
	const toast = $cgmzTemp.getToastObjectFromPreset(preset || CGMZ.Gathering.GatherFailToast);
	if(!toast) return;
	$cgmzTemp.createNewToast(toast);
};
//-----------------------------------------------------------------------------
// Show gather success message
//-----------------------------------------------------------------------------
Game_Map.prototype.CGMZ_showGatherSuccessMessage = function(item, amount, preset) {
	if(!Imported.CGMZ_ToastManager) return;
	const toast = $cgmzTemp.getToastObjectFromPreset(preset || CGMZ.Gathering.GatherSuccessToast);
	if(!toast) return;
	toast.lineOne = toast.lineOne.replace('%amt', amount).replace('%item', `\\i[${item.iconIndex}]${item.name}`);
	toast.lineTwo = toast.lineTwo.replace('%amt', amount).replace('%item', `\\i[${item.iconIndex}]${item.name}`);
	$cgmzTemp.createNewToast(toast);
};
//-----------------------------------------------------------------------------
// Give the harvested items
//-----------------------------------------------------------------------------
Game_Map.prototype.CGMZ_giveHarvestItems = function() {
	const node = $cgmz.gatherNodeManager().node(this._CGMZ_gatherInfo.nodeManagerRef);
	const stage = node.stage;
	const expired = !!this._CGMZ_gatherInfo.node.getStage(stage).expired;
	for(const harvestObj of this._CGMZ_gatherInfo.node._harvest) {
		if(expired !== harvestObj.expired) continue;
		if(Math.floor(Math.random() * 100) < harvestObj.chance) {
			const item = $dataItems[harvestObj.itemId];
			const variance = (Math.round(Math.random()) * 2 - 1) * Math.randomInt(harvestObj.variance + 1);
			const amount = (harvestObj.addVarianceOnly) ? Math.abs(variance) + harvestObj.amount : variance + harvestObj.amount;
			if(amount > 0) {
				$gameParty.gainItem(item, amount, false);
				this.CGMZ_showGatherSuccessMessage(item, amount, this._CGMZ_gatherInfo.node._successToast);
			}
		}
	}
};
//-----------------------------------------------------------------------------
// Give the harvested items
//-----------------------------------------------------------------------------
Game_Map.prototype.CGMZ_awardGatheringProfessionExp = function() {
	if(!Imported.CGMZ_Professions) return;
	const professionName = this._CGMZ_gatherInfo.node._profession;
	let expAmount = this._CGMZ_gatherInfo.node._exp;
	const node = $cgmz.gatherNodeManager().node(this._CGMZ_gatherInfo.nodeManagerRef);
	const stage = node.stage;
	const expired = !!this._CGMZ_gatherInfo.node.getStage(stage).expired;
	if(expired) expAmount = Math.round(expAmount * this._CGMZ_gatherInfo.node._expPenaltyRate);
	$cgmz.changeProfessionExp(professionName, "+", expAmount);
};
//=============================================================================
// Scene_Map
//-----------------------------------------------------------------------------
// Add gathering progress window
//=============================================================================
//-----------------------------------------------------------------------------
// Also initialize planting check
//-----------------------------------------------------------------------------
const alias_CGMZGathering_SceneMap_initialize = Scene_Map.prototype.initialize;
Scene_Map.prototype.initialize = function() {
    alias_CGMZGathering_SceneMap_initialize.call(this);
    this._cgmz_gatheringPlanting = false;
};
//-----------------------------------------------------------------------------
// Also create gathering progress window
//-----------------------------------------------------------------------------
const alias_CGMZ_Gathering_Scene_Map_createAllWindows = Scene_Map.prototype.createAllWindows;
Scene_Map.prototype.createAllWindows = function() {
	this.CGMZ_createGatheringProgressWindow();
	this.CGMZ_createGatheringPlantingWindow();
    alias_CGMZ_Gathering_Scene_Map_createAllWindows.call(this);
};
//-----------------------------------------------------------------------------
// Handle creation of gathering progress window
//-----------------------------------------------------------------------------
Scene_Map.prototype.CGMZ_createGatheringProgressWindow = function() {
	const rect = this.CGMZ_gatheringProgressWindowRect();
    this._CGMZ_gatheringProgressWindow = new CGMZ_Window_GatheringProgress(rect);
    this.addChild(this._CGMZ_gatheringProgressWindow);
};
//-----------------------------------------------------------------------------
// Rect for the gathering progress window
//-----------------------------------------------------------------------------
Scene_Map.prototype.CGMZ_gatheringProgressWindowRect = function() {
	const width = Graphics.boxWidth * (CGMZ.Gathering.GatherWidth / 100.0);
	const lines = (CGMZ.Gathering.DrawTextOverBar) ? 1 : 2;
	const height = this.calcWindowHeight(lines, false);
	const x = Graphics.boxWidth / 2 - width / 2;
	const y = Graphics.boxHeight * 0.3 + CGMZ.Gathering.GatherYOffset;
	return new Rectangle(x, y, width, height);
};
//-----------------------------------------------------------------------------
// Handle creation of gathering planting window
//-----------------------------------------------------------------------------
Scene_Map.prototype.CGMZ_createGatheringPlantingWindow = function() {
	const rect = this.CGMZ_gatheringPlantingWindowRect();
    this._CGMZ_gatheringPlantSelectWindow = new CGMZ_Window_GatheringPlantSelect(rect);
	this._CGMZ_gatheringPlantSelectWindow.setHandler('cancel', this.CGMZ_onGatherPlantCancel.bind(this));
	this._CGMZ_gatheringPlantSelectWindow.setHandler('ok', this.CGMZ_onGatherPlantOk.bind(this));
    this.addChild(this._CGMZ_gatheringPlantSelectWindow);
};
//-----------------------------------------------------------------------------
// Rect for the gathering planting window
//-----------------------------------------------------------------------------
Scene_Map.prototype.CGMZ_gatheringPlantingWindowRect = function() {
	const width = Graphics.boxWidth * 0.50;
	const height = this.calcWindowHeight(6, false);
	const x = Graphics.boxWidth / 2 - width / 2;
	const y = Graphics.boxHeight / 2 - height / 2;
	return new Rectangle(x, y, width, height);
};
//-----------------------------------------------------------------------------
// Handling for cancel input from plantable window
//-----------------------------------------------------------------------------
Scene_Map.prototype.CGMZ_onGatherPlantCancel = function() {
	$cgmzTemp.stopGatherPlanting(null);
	this._CGMZ_gatheringPlantSelectWindow.clear();
};
//-----------------------------------------------------------------------------
// Handling for ok input from plantable window
//-----------------------------------------------------------------------------
Scene_Map.prototype.CGMZ_onGatherPlantOk = function() {
	const item = this._CGMZ_gatheringPlantSelectWindow.item();
	if(item) {
		const dataItem = $dataItems[item._item];
		$gameParty.loseItem(dataItem, 1, false);
	}
	$cgmzTemp.stopGatherPlanting(item);
	this._CGMZ_gatheringPlantSelectWindow.clear();
};
//-----------------------------------------------------------------------------
// Also update gathering flows
//-----------------------------------------------------------------------------
const alias_CGMZGathering_SceneMap_update = Scene_Map.prototype.update;
Scene_Map.prototype.update = function() {
	alias_CGMZGathering_SceneMap_update.call(this);
	this.CGMZ_updateGathering();
};
//-----------------------------------------------------------------------------
// Update gathering flows
//-----------------------------------------------------------------------------
Scene_Map.prototype.CGMZ_updateGathering = function() {
	const isPlanting = $cgmzTemp.isPlanting();
	if(isPlanting !== this._cgmz_gatheringPlanting) {
		this._cgmz_gatheringPlanting = isPlanting;
		if(isPlanting) {
			this._CGMZ_gatheringPlantSelectWindow.setType($cgmzTemp.plantingType);
		}
	}
};
//=============================================================================
// CGMZ_Window_GatheringProgress
//-----------------------------------------------------------------------------
// Window displaying gathering progress
//=============================================================================
function CGMZ_Window_GatheringProgress() {
    this.initialize.apply(this, arguments);
}
CGMZ_Window_GatheringProgress.prototype = Object.create(Window_Base.prototype);
CGMZ_Window_GatheringProgress.prototype.constructor = CGMZ_Window_GatheringProgress;
//-----------------------------------------------------------------------------
// Initialize
//-----------------------------------------------------------------------------
CGMZ_Window_GatheringProgress.prototype.initialize = function(rect) {
    Window_Base.prototype.initialize.call(this, rect);
	if(Imported.CGMZ_WindowSettings && CGMZ.Gathering.GatherWindowSettings) this.CGMZ_setWindowSettings(CGMZ.Gathering.GatherWindowSettings);
	const gaugeY = (CGMZ.Gathering.DrawTextOverBar) ? 0 : this.lineHeight();
	this._gaugeRect = new Rectangle(0, gaugeY, this.contents.width, CGMZ.Gathering.GatherGaugeHeight);
	this.clearGatherData();
	this.hide();
};
//-----------------------------------------------------------------------------
// Clear Gather Data
//-----------------------------------------------------------------------------
CGMZ_Window_GatheringProgress.prototype.clearGatherData = function() {
	this._info = null;
	this._node = null;
	this._isGathering = false;
	this._gatherProgress = 0;
	this._gatherTime = 1;
	this._success = false;
};
//-----------------------------------------------------------------------------
// Start the crafting process
//-----------------------------------------------------------------------------
CGMZ_Window_GatheringProgress.prototype.startGather = function() {
	this._isGathering = true;
	this._info = $gameMap._CGMZ_gatherInfo;
	this._gatherProgress = 0;
	this._success = this.successCheck();
	this._gatherTime = this._info.node._gatherTime;
	if(this._gatherTime) {
		this.contents.clear();
		this.show();
	} else {
		$cgmzTemp.ignorePlantingCommand = true;
		this.stopGather();
	}
};
//-----------------------------------------------------------------------------
// Check if gathering is going to succeed or fail
//-----------------------------------------------------------------------------
CGMZ_Window_GatheringProgress.prototype.successCheck = function() {
	return Math.floor(Math.random() * 100) < this._info.params.successBonus + this._info.node._successChance;
};
//----------------------------------------------------------------------------
// Stop the crafting process
//-----------------------------------------------------------------------------
CGMZ_Window_GatheringProgress.prototype.stopGather = function() {
	$gameMap.CGMZ_stopGather(this._success);
	this._isGathering = false;
	this.clearGatherData();
	this.hide();
};
//-----------------------------------------------------------------------------
// Update the gathering process
//-----------------------------------------------------------------------------
CGMZ_Window_GatheringProgress.prototype.update = function() {
	Window_Base.prototype.update.call(this);
	this.updateGatherState();
	this.updateGather();
};
//-----------------------------------------------------------------------------
// Update the gathering state
//-----------------------------------------------------------------------------
CGMZ_Window_GatheringProgress.prototype.updateGatherState = function() {
	if($gameMap.CGMZ_isGathering() && !this._isGathering) {
		this.startGather();
	} else if(this._isGathering && this._gatherProgress >= this._gatherTime) {
		this.stopGather();
	}
};
//-----------------------------------------------------------------------------
// Update gather process
//-----------------------------------------------------------------------------
CGMZ_Window_GatheringProgress.prototype.updateGather = function() {
	if(this.visible) {
		this._gatherProgress++;
		this.refresh();
	}
};
//-----------------------------------------------------------------------------
// Refresh
//-----------------------------------------------------------------------------
CGMZ_Window_GatheringProgress.prototype.refresh = function() {
	if(!this.visible) return; // This check is needed because VS Debugger tries to call this function when it shouldn't
	this.contents.clear();
	const gc1 = this._info?.node?._gaugeColor1 || CGMZ.Gathering.GaugeColor1;
	const gc2 = this._info?.node?._gaugeColor2 || CGMZ.Gathering.GaugeColor2;
	this.CGMZ_drawGauge(this._gaugeRect, this._gatherProgress / this._gatherTime, ColorManager.textColor(gc1), ColorManager.textColor(gc2));
	if(CGMZ.Gathering.GatherText) {
		const nameString = CGMZ.Gathering.GatherText.replace('%name', this._info.node._name);
		this.CGMZ_drawTextLine(nameString, 0, 0, this.contents.width, "center");
	}
};
//=============================================================================
// CGMZ_Window_GatheringPlantSelect
//-----------------------------------------------------------------------------
// Selectable window for choosing something to plant
//=============================================================================
function CGMZ_Window_GatheringPlantSelect(rect) {
	this.initialize.apply(this, arguments);
}
CGMZ_Window_GatheringPlantSelect.prototype = Object.create(Window_Selectable.prototype);
CGMZ_Window_GatheringPlantSelect.prototype.constructor = CGMZ_Window_GatheringPlantSelect;
//-----------------------------------------------------------------------------
// Initialize
//-----------------------------------------------------------------------------
CGMZ_Window_GatheringPlantSelect.prototype.initialize = function(rect) {
	Window_Selectable.prototype.initialize.call(this, rect);
	if(Imported.CGMZ_WindowSettings && CGMZ.Gathering.PlantWindowSettings) this.CGMZ_setWindowSettings(CGMZ.Gathering.PlantWindowSettings);
	this._type = "";
	this._data = [];
	this.deactivate();
	this.hide();
};
//-----------------------------------------------------------------------------
// Current item
//-----------------------------------------------------------------------------
CGMZ_Window_GatheringPlantSelect.prototype.item = function() {
	return this._data[this.index()];
};
//-----------------------------------------------------------------------------
// Max items
//-----------------------------------------------------------------------------
CGMZ_Window_GatheringPlantSelect.prototype.maxItems = function() {
	return this._data ? this._data.length : 1;
};
//-----------------------------------------------------------------------------
// Set a new type
//-----------------------------------------------------------------------------
CGMZ_Window_GatheringPlantSelect.prototype.setType = function(type) {
	this._type = type;
	this.refresh();
	(this._data.length > 0) ? this.select(0) : this.deselect();
	this.activate();
	this.show();
};
//-----------------------------------------------------------------------------
// Clear the window
//-----------------------------------------------------------------------------
CGMZ_Window_GatheringPlantSelect.prototype.clear = function() {
	this._data = [];
	this._type = "";
	this.deselect();
	this.deactivate();
	this.hide();
};
//-----------------------------------------------------------------------------
// Clear the window
//-----------------------------------------------------------------------------
CGMZ_Window_GatheringPlantSelect.prototype.refresh = function() {
	if(!this._type) return;
	this.makeItemList();
	Window_Selectable.prototype.refresh.call(this);
};
//-----------------------------------------------------------------------------
// Make item list
//-----------------------------------------------------------------------------
CGMZ_Window_GatheringPlantSelect.prototype.makeItemList = function() {
	if(!this._type) {
		this._data = [];
	} else {
		const plants = $cgmzTemp.getGatheringPlantablesForType(this._type);
		if(!plants) {
			this._data = [];
		} else {
			this._data = plants.filter(plant => {
				return this.isPlantEligible(plant);
			});
		}
	}
};
//-----------------------------------------------------------------------------
// Check if plant should be included
//-----------------------------------------------------------------------------
CGMZ_Window_GatheringPlantSelect.prototype.isPlantEligible = function(plant) {
	if(!plant) return false;
	const item = $dataItems[plant._item];
	if(!$gameParty.hasItem(item)) return false;
	if(Imported.CGMZ_Professions && plant._profession) {
		const profession = $cgmz.getProfession(plant._profession);
		if(profession && profession.getBuffedLevel() < plant._levelReq) return false;
	}
	return true;
};
//-----------------------------------------------------------------------------
// Draw item in list
//-----------------------------------------------------------------------------
CGMZ_Window_GatheringPlantSelect.prototype.drawItem = function(index) {
	const plant = this._data[index];
	const rect = this.itemRectWithPadding(index);
	const item = $dataItems[plant._item];
	const nameString = `\\i[${item.iconIndex}]${item.name}`;
	const amountString = `x${$gameParty.numItems(item)}`;
	this.CGMZ_drawTextLine(nameString, rect.x, rect.y, rect.width, 'left');
	this.CGMZ_drawTextLine(amountString, rect.x, rect.y, rect.width, 'right');
};
//=============================================================================
// Game_Player
//-----------------------------------------------------------------------------
// Restrict movement while gathering
//=============================================================================
//-----------------------------------------------------------------------------
// Also check if gathering, return false if so.
//-----------------------------------------------------------------------------
const alias_CGMZ_Gathering_Game_Player_canMove = Game_Player.prototype.canMove;
Game_Player.prototype.canMove = function() {
    if($gameMap.CGMZ_isGathering() || $cgmzTemp.isPlanting()) {
        return false;
    }
    return alias_CGMZ_Gathering_Game_Player_canMove.call(this);
};
//=============================================================================
// Game_Interpreter
//-----------------------------------------------------------------------------
// Wait for gathering processes to finish
//=============================================================================
//-----------------------------------------------------------------------------
// Easy script call to check if planted, gatherable, etc.
//-----------------------------------------------------------------------------
Game_Interpreter.prototype.CGMZ_getGatheringState = function() {
	const ev = this.character(0);
	return ev.CGMZ_gatheringState();
};
//-----------------------------------------------------------------------------
// Also check if planting, if so wait
//-----------------------------------------------------------------------------
const alias_CGMZGathering_GameInterpreter_updateWaitMode = Game_Interpreter.prototype.updateWaitMode;
Game_Interpreter.prototype.updateWaitMode = function() {
	if(this._waitMode === 'CGMZ_gatheringPlanting') {
		if($cgmzTemp.isPlanting()) return true;
		if($cgmzTemp.plantedNodeId) {
			const ev = this.character(0);
			ev.CGMZ_setNewGatherNodeId($cgmzTemp.plantedNodeId, "delete");
		}
	}
	return alias_CGMZGathering_GameInterpreter_updateWaitMode.call(this);
};
//=============================================================================
// CGMZ_Scene_GatherJournal
//-----------------------------------------------------------------------------
// Handle the gather journal scene
//=============================================================================
function CGMZ_Scene_GatherJournal(types) {
	this.initialize.apply(this, arguments);
}
CGMZ_Scene_GatherJournal.prototype = Object.create(Scene_MenuBase.prototype);
CGMZ_Scene_GatherJournal.prototype.constructor = CGMZ_Scene_GatherJournal;
//-----------------------------------------------------------------------------
// Initialize
//-----------------------------------------------------------------------------
CGMZ_Scene_GatherJournal.prototype.initialize = function(categories = null) {
	this._categories = (categories) ? categories : [];
	Scene_MenuBase.prototype.initialize.call(this);
};
//-----------------------------------------------------------------------------
// Prepare
//-----------------------------------------------------------------------------
CGMZ_Scene_GatherJournal.prototype.prepare = function(categories = null) {
	this._categories = (categories) ? categories : [];
};
//-----------------------------------------------------------------------------
// Create journal windows
//-----------------------------------------------------------------------------
CGMZ_Scene_GatherJournal.prototype.create = function() {
	Scene_MenuBase.prototype.create.call(this);
	this.createCategoryWindow();
	this.createListWindow();
	this.createDisplayWindow();
};
//-----------------------------------------------------------------------------
// Create category window
//-----------------------------------------------------------------------------
CGMZ_Scene_GatherJournal.prototype.createCategoryWindow = function() {
	const rect = this.categoryWindowRect();
	this._categoryWindow = new CGMZ_Window_GatherJournalCategory(rect, this._categories);
	this._categoryWindow.setHandler('cancel', this.popScene.bind(this));
	this._categoryWindow.setHandler('ok', this.onCategoryOk.bind(this));
	this.addWindow(this._categoryWindow);
};
//-----------------------------------------------------------------------------
// Get the category window rect
//-----------------------------------------------------------------------------
CGMZ_Scene_GatherJournal.prototype.categoryWindowRect = function() {
	const width = Graphics.boxWidth;
	const height = this.calcWindowHeight(1, true);
	const x = 0;
	const y = this.hasTouchUI() ? this.buttonAreaHeight() : 0;
	return new Rectangle(x, y, width, height);
};
//-----------------------------------------------------------------------------
// Create list window
//-----------------------------------------------------------------------------
CGMZ_Scene_GatherJournal.prototype.createListWindow = function() {
	const rect = this.listWindowRect();
	this._listWindow = new CGMZ_Window_GatherJournalList(rect);
	this._listWindow.setHandler('cancel', this.onListCancel.bind(this));
	this._categoryWindow.setListWindow(this._listWindow);
	this.addWindow(this._listWindow);
};
//-----------------------------------------------------------------------------
// Get the list window rect
//-----------------------------------------------------------------------------
CGMZ_Scene_GatherJournal.prototype.listWindowRect = function() {
	const width = Graphics.boxWidth * (CGMZ.Gathering.ListWindowWidth / 100.0);
	const x = CGMZ.Gathering.ListWindowRight ? Graphics.boxWidth - width : 0;
	const y = this._categoryWindow.y + this._categoryWindow.height;
	const height = Graphics.boxHeight - y;
	return new Rectangle(x, y, width, height);
};
//-----------------------------------------------------------------------------
// Create display window
//-----------------------------------------------------------------------------
CGMZ_Scene_GatherJournal.prototype.createDisplayWindow = function() {
	const rect = this.displayWindowRect();
	this._displayWindow = new CGMZ_Window_GatherJournalDisplay(rect);
	this._listWindow.setDisplayWindow(this._displayWindow);
	this.addWindow(this._displayWindow);
};
//-----------------------------------------------------------------------------
// Get the display window rect
//-----------------------------------------------------------------------------
CGMZ_Scene_GatherJournal.prototype.displayWindowRect = function() {
	const x = CGMZ.Gathering.ListWindowRight ? 0 : this._listWindow.width;
	const y = this._listWindow.y;
	const height = this._listWindow.height;
	const width = Graphics.boxWidth - this._listWindow.width;
	return new Rectangle(x, y, width, height);
};
//-----------------------------------------------------------------------------
// Check if should make room for Touch UI
//-----------------------------------------------------------------------------
CGMZ_Scene_GatherJournal.prototype.hasTouchUI = function() {
	return !CGMZ.Gathering.DisableTouchUISpace || ConfigManager.touchUI;
};
//-----------------------------------------------------------------------------
// Get the scene's custom scene background for [CGMZ] Scene Backgrounds
// No need to check if Scene Backgrounds is installed because this custom func
// is only called by that plugin
//-----------------------------------------------------------------------------
CGMZ_Scene_GatherJournal.prototype.CGMZ_getCustomSceneBackground = function() {
	return $cgmzTemp.sceneBackgroundPresets[CGMZ.Gathering.JournalSceneBackground];
};
//-----------------------------------------------------------------------------
// Get the controls window preset if any exists
// No need to check if Controls Window is installed, function only called from
// that plugin
//-----------------------------------------------------------------------------
CGMZ_Scene_GatherJournal.prototype.CGMZ_getControlsWindowOtherPreset = function() {
	return $cgmzTemp.getControlWindowPresetOther(CGMZ.Gathering.JournalControlsWindow);
};
//-----------------------------------------------------------------------------
// On Category OK
//-----------------------------------------------------------------------------
CGMZ_Scene_GatherJournal.prototype.onCategoryOk = function() {
	this._listWindow.activate();
	this._listWindow.select(0);
};
//-----------------------------------------------------------------------------
// On List Cancel
//-----------------------------------------------------------------------------
CGMZ_Scene_GatherJournal.prototype.onListCancel = function() {
	this._listWindow.deactivate();
	this._listWindow.deselect();
	this._displayWindow.setItem(null);
	this._categoryWindow.activate();
};
//=============================================================================
// CGMZ_Window_GatherJournalCategory
//-----------------------------------------------------------------------------
// Command window for choosing a category in the gather journal scene
//=============================================================================
function CGMZ_Window_GatherJournalCategory(rect) {
	this.initialize.apply(this, arguments);
}
CGMZ_Window_GatherJournalCategory.prototype = Object.create(Window_Selectable.prototype);
CGMZ_Window_GatherJournalCategory.prototype.constructor = CGMZ_Window_GatherJournalCategory;
//-----------------------------------------------------------------------------
// Initialize
//-----------------------------------------------------------------------------
CGMZ_Window_GatherJournalCategory.prototype.initialize = function(rect, categories) {
	this._categories = categories;
	Window_Selectable.prototype.initialize.call(this, rect);
	if(Imported.CGMZ_WindowSettings && CGMZ.Gathering.CategoryWindowSettings) this.CGMZ_setWindowSettings(CGMZ.Gathering.CategoryWindowSettings);
	if(Imported.CGMZ_WindowBackgrounds && CGMZ.Gathering.CategoryWindowBackground) this.CGMZ_setWindowBackground(CGMZ.Gathering.CategoryWindowBackground);
	this._data = categories;
	this.refresh();
	this.activate();
	if(this._data.length > 0) this.select(0);
};
//-----------------------------------------------------------------------------
// Max columns to display
//-----------------------------------------------------------------------------
CGMZ_Window_GatherJournalCategory.prototype.maxCols = function() {
	if(this._categories.length) return Math.min(this._categories.length, CGMZ.Gathering.CategoryColumns);
	const categories = $cgmzTemp.getAllDiscoveredGatherJournalCategories();
	return Math.min(categories.length, CGMZ.Gathering.CategoryColumns);
};
//-----------------------------------------------------------------------------
// Max items
//-----------------------------------------------------------------------------
CGMZ_Window_GatherJournalCategory.prototype.maxItems = function() {
	return this._data ? this._data.length : 1;
};
//-----------------------------------------------------------------------------
// Current item
//-----------------------------------------------------------------------------
CGMZ_Window_GatherJournalCategory.prototype.item = function() {
	return this._data[this.index()];
};
//-----------------------------------------------------------------------------
// Refresh
//-----------------------------------------------------------------------------
CGMZ_Window_GatherJournalCategory.prototype.refresh = function() {
	this.makeItemList();
	Window_Selectable.prototype.refresh.call(this);
	if(this._data.length === 0) {
		this.CGMZ_drawTextLine(CGMZ.Gathering.EmptyCategoryText, 0, 4, this.contents.width, 'center');
	}
};
//-----------------------------------------------------------------------------
// Make item list
//-----------------------------------------------------------------------------
CGMZ_Window_GatherJournalCategory.prototype.makeItemList = function() {
	if(this._data.length === 0) {
		this._data = $cgmzTemp.getAllDiscoveredGatherJournalCategories();
	}
};
//-----------------------------------------------------------------------------
// Get the category icon
//-----------------------------------------------------------------------------
CGMZ_Window_GatherJournalCategory.prototype.CGMZ_icon = function(index) {
	const category = $cgmzTemp.getGatheringJournalCategory(this._data[index]);
	return category?.icon;
};
//-----------------------------------------------------------------------------
// Draw the item with text codes
//-----------------------------------------------------------------------------
CGMZ_Window_GatherJournalCategory.prototype.drawItem = function(index) {
	const category = $cgmzTemp.getGatheringJournalCategory(this._data[index]);
	const rect = this.itemRectWithPadding(index);
	const icon = this.CGMZ_icon(index);
	if(icon) {
		const iconX = (CGMZ.Gathering.CategoryIconAlignment === 'left') ? rect.x : rect.x + rect.width - ImageManager.iconWidth;
		this.drawIcon(icon, Math.round(iconX), Math.round(rect.y + 2));
		rect.x += (ImageManager.iconWidth + 2) * (CGMZ.Gathering.CategoryIconAlignment === 'left');
		rect.width -= ImageManager.iconWidth + 2;
	}
	this.CGMZ_drawTextLine(category?.name, rect.x, rect.y, rect.width, CGMZ.Gathering.CategoryTextAlignment);
};
//-----------------------------------------------------------------------------
// Get selectable cgmz options
//-----------------------------------------------------------------------------
CGMZ_Window_GatherJournalCategory.prototype.CGMZ_getSelectableCGMZOptions = function(index) {
	const category = $cgmzTemp.getGatheringJournalCategory(this._data[index]);
	if(category?.backImg) {
		const bg = {
			img: category.backImg,
			imgX: category.backImgX,
			imgY: category.backImgY
		}
		return {bg: bg};
	}
	return Window_Selectable.prototype.CGMZ_getSelectableCGMZOptions.call(this, index);
};
//-----------------------------------------------------------------------------
// Set list (helper) window
//-----------------------------------------------------------------------------
CGMZ_Window_GatherJournalCategory.prototype.setListWindow = function(listWindow) {
	this._listWindow = listWindow;
	this.callUpdateHelp();
};
//-----------------------------------------------------------------------------
// See if able to update helper windows
//-----------------------------------------------------------------------------
CGMZ_Window_GatherJournalCategory.prototype.callUpdateHelp = function() {
	if(this.active) this.updateHelperWindows();
};
//-----------------------------------------------------------------------------
// See if able to update helper windows
//-----------------------------------------------------------------------------
CGMZ_Window_GatherJournalCategory.prototype.updateHelperWindows = function() {
	if(this._listWindow) this._listWindow.setItem(this.item());
};
//=============================================================================
// CGMZ_Window_GatherJournalList
//-----------------------------------------------------------------------------
// Command window for choosing a category in the gather journal scene
//=============================================================================
function CGMZ_Window_GatherJournalList(rect) {
	this.initialize.apply(this, arguments);
}
CGMZ_Window_GatherJournalList.prototype = Object.create(Window_Selectable.prototype);
CGMZ_Window_GatherJournalList.prototype.constructor = CGMZ_Window_GatherJournalList;
//-----------------------------------------------------------------------------
// Initialize
//-----------------------------------------------------------------------------
CGMZ_Window_GatherJournalList.prototype.initialize = function(rect) {
	Window_Selectable.prototype.initialize.call(this, rect);
	if(Imported.CGMZ_WindowSettings && CGMZ.Gathering.ListWindowSettings) this.CGMZ_setWindowSettings(CGMZ.Gathering.ListWindowSettings);
	if(Imported.CGMZ_WindowBackgrounds && CGMZ.Gathering.ListWindowBackground) this.CGMZ_setWindowBackground(CGMZ.Gathering.ListWindowBackground);
	this._data = [];
	this._category = "";
};
//-----------------------------------------------------------------------------
// Max items
//-----------------------------------------------------------------------------
CGMZ_Window_GatherJournalList.prototype.maxItems = function() {
	return this._data ? this._data.length : 1;
};
//-----------------------------------------------------------------------------
// Current item
//-----------------------------------------------------------------------------
CGMZ_Window_GatherJournalList.prototype.item = function() {
	return this._data[this.index()];
};
//-----------------------------------------------------------------------------
// Refresh
//-----------------------------------------------------------------------------
CGMZ_Window_GatherJournalList.prototype.refresh = function() {
	this.makeItemList();
	Window_Selectable.prototype.refresh.call(this);
	if(this._category && this._data.length === 0) {
		this.CGMZ_drawText(CGMZ.Gathering.EmptyListText, 0, 0, 0, this.contents.width, 'center');
	}
};
//-----------------------------------------------------------------------------
// Set a new item
//-----------------------------------------------------------------------------
CGMZ_Window_GatherJournalList.prototype.setItem = function(categoryId) {
	if(this._category === categoryId) return;
	this._category = categoryId;
	this.refresh();
};
//-----------------------------------------------------------------------------
// Make item list
//-----------------------------------------------------------------------------
CGMZ_Window_GatherJournalList.prototype.makeItemList = function() {
	this._data = $cgmzTemp.getAllDiscoveredGatherNodesInCategory(this._category);
};
//-----------------------------------------------------------------------------
// Get the category icon
//-----------------------------------------------------------------------------
CGMZ_Window_GatherJournalList.prototype.CGMZ_icon = function(index) {
	const node = $cgmzTemp.getGatheringNode(this._data[index]);
	return node?.journalIcon;
};
//-----------------------------------------------------------------------------
// Draw the item with text codes
//-----------------------------------------------------------------------------
CGMZ_Window_GatherJournalList.prototype.drawItem = function(index) {
	const node = $cgmzTemp.getGatheringNode(this._data[index]);
	const rect = this.itemRectWithPadding(index);
	const icon = this.CGMZ_icon(index);
	if(icon) {
		const iconX = (CGMZ.Gathering.ListIconAlignment === 'left') ? rect.x : rect.x + rect.width - ImageManager.iconWidth;
		this.drawIcon(icon, Math.round(iconX), Math.round(rect.y + 2));
		rect.x += (ImageManager.iconWidth + 2) * (CGMZ.Gathering.ListIconAlignment === 'left');
		rect.width -= ImageManager.iconWidth + 2;
	}
	this.CGMZ_drawTextLine(node?.journalName, rect.x, rect.y, rect.width, CGMZ.Gathering.ListTextAlignment);
};
//-----------------------------------------------------------------------------
// Set display (helper) window
//-----------------------------------------------------------------------------
CGMZ_Window_GatherJournalList.prototype.setDisplayWindow = function(displayWindow) {
	this._displayWindow = displayWindow;
	this.callUpdateHelp();
};
//-----------------------------------------------------------------------------
// See if able to update helper windows
//-----------------------------------------------------------------------------
CGMZ_Window_GatherJournalList.prototype.callUpdateHelp = function() {
	if(this.active) this.updateHelperWindows();
};
//-----------------------------------------------------------------------------
// See if able to update helper windows
//-----------------------------------------------------------------------------
CGMZ_Window_GatherJournalList.prototype.updateHelperWindows = function() {
	if(this._displayWindow) this._displayWindow.setItem(this.item());
};
//=============================================================================
// CGMZ_Window_GatherJournalDisplay
//-----------------------------------------------------------------------------
// Window displaying gather node information in the journal
//=============================================================================
function CGMZ_Window_GatherJournalDisplay() {
	this.initialize.apply(this, arguments);
}
CGMZ_Window_GatherJournalDisplay.prototype = Object.create(CGMZ_Window_Scrollable.prototype);
CGMZ_Window_GatherJournalDisplay.prototype.constructor = CGMZ_Window_GatherJournalDisplay;
//-----------------------------------------------------------------------------
// Initialize
//-----------------------------------------------------------------------------
CGMZ_Window_GatherJournalDisplay.prototype.initialize = function(rect) {
	const heightMultiplier = 10; // maximum of 10 windows tall of data to scroll
	CGMZ_Window_Scrollable.prototype.initialize.call(this, rect, heightMultiplier, CGMZ.Core.ScrollWait, CGMZ.Core.ScrollSpeed, CGMZ.Core.AutoScroll, CGMZ.Core.ScrollDeceleration);
	if(Imported.CGMZ_WindowSettings && CGMZ.Gathering.DisplayWindowSettings) this.CGMZ_setWindowSettings(CGMZ.Gathering.DisplayWindowSettings);
	if(Imported.CGMZ_WindowBackgrounds && CGMZ.Gathering.DisplayWindowBackground) this.CGMZ_setWindowBackground(CGMZ.Gathering.DisplayWindowBackground);
	this._id = "";
	this._imagesToLoad = 0;
	this._imagesLoaded = 0;
};
//-----------------------------------------------------------------------------
// Set the troop to be displayed (do nothing if already being displayed)
//-----------------------------------------------------------------------------
CGMZ_Window_GatherJournalDisplay.prototype.setItem = function(id) {
	if(this._id === id) return;
	this._imagesToLoad = 0;
	this._imagesLoaded = 0;
	this._id = id;
	this.setupWindowForNewEntry();
	this.refresh();
};
//-----------------------------------------------------------------------------
// Refresh
//-----------------------------------------------------------------------------
CGMZ_Window_GatherJournalDisplay.prototype.refresh = function() {
	this.contents.clear();
	if(!this._id) return;
	const data = $cgmzTemp.getGatheringNode(this._id);
	if(!data) {
		this.drawInfo();
		return;
	}
	this._imagesToLoad = data.journalFlavorImages.length;
	if(data.journalImage) {
		this._imagesToLoad++;
		const imgData = CGMZ_Utils.getImageData(data.journalImage, "img");
		const bitmap = ImageManager.loadBitmap(imgData.folder, imgData.filename);
		bitmap.addLoadListener(this.onImageLoaded.bind(this));
	}
	for(const img of data.journalFlavorImages) {
		const imgData = CGMZ_Utils.getImageData(img, "img");
		const bitmap = ImageManager.loadBitmap(imgData.folder, imgData.filename);
		bitmap.addLoadListener(this.onImageLoaded.bind(this));
	}
	if(this._imagesToLoad == 0) {
		this.drawInfo();
	}
};
//-----------------------------------------------------------------------------
// Count loaded images, if all done loading draw info
//-----------------------------------------------------------------------------
CGMZ_Window_GatherJournalDisplay.prototype.onImageLoaded = function() {
	this._imagesLoaded++;
	if(this._imagesLoaded === this._imagesToLoad) {
		this.drawInfo();
	}
};
//-----------------------------------------------------------------------------
// Draw the node info
//-----------------------------------------------------------------------------
CGMZ_Window_GatherJournalDisplay.prototype.drawInfo = function() {
	const node = $cgmzTemp.getGatheringNode(this._id);
	const nodeSaved = $cgmz.getGatherStats(this._id);
	if(!node || !nodeSaved) {
		this._neededHeight += this.padding * 2;
		this.checkForScroll();
		return;
	}
	this._neededHeight = 0;
	const hc1 = CGMZ.Gathering.HeaderColor1;
	const hc2 = CGMZ.Gathering.HeaderColor2;
	let flavorText = 0;
	let flavorHeader = 0;
	let flavorImage = 0;
	this._offsetNeeded = {x: 0, start: 0, end: 0};
	for(const info of CGMZ.Gathering.DisplayInfo) {
		switch(info) {
			case 'Name': this.drawName(node.journalName); break;
			case 'Image': this.drawJournalImage(node.journalImage, node.journalIcon); break;
			case 'Description': this.drawDescription(node.journalDescription); break;
			case 'Location': this.drawStandardLine(CGMZ.Gathering.LocationLabelText, node.journalLocation); break;
			case 'Gather Times': this.drawStandardLine(CGMZ.Gathering.GatherTimesLabelText, nodeSaved.getGatheringCount()); break;
			case 'Success Chance': this.drawStandardLine(CGMZ.Gathering.SuccessLabelText, node._successChance + "%"); break;
			case 'Exp': this.drawStandardLine(CGMZ.Gathering.ExpLabelText, node._exp); break;
			case 'Level Requirement': this.drawStandardLine(CGMZ.Gathering.LevelRequirementLabelText, node._levelReq); break;
			case 'Profession': this.drawStandardLine(CGMZ.Gathering.ProfessionLabelText, node._profession); break;
			case 'Flavor Text': 
				const flavor = node.journalFlavorTexts[flavorText++];
				if(flavor) this.drawStandardLine("", flavor); break;
			case 'Description Header': this._neededHeight += this.CGMZ_drawHeader(CGMZ.Gathering.DescriptionHeaderText, this._neededHeight, hc1, hc2); break;
			case 'Info Header': this._neededHeight += this.CGMZ_drawHeader(CGMZ.Gathering.InfoHeaderText, this._neededHeight, hc1, hc2); break;
			case 'Stats Header': this._neededHeight += this.CGMZ_drawHeader(CGMZ.Gathering.StatsHeaderText, this._neededHeight, hc1, hc2); break;
			case 'Flavor Header': 
				const header = node.journalFlavorHeaders[flavorHeader++];
				if(header) this._neededHeight += this.CGMZ_drawHeader(header, this._neededHeight, hc1, hc2); break;
			case 'Flavor Image': 
				const img = node.journalFlavorImages[flavorImage++];
				if(img) this.drawFlavorImg(img); break;
			case 'Blank Line': this._neededHeight += this.lineHeight(); break;
			case 'Custom Space': this._neededHeight += CGMZ.Gathering.CustomSpace; break;
		}
	}
	this._neededHeight += this.padding * 2;
	this.checkForScroll();
};
//-----------------------------------------------------------------------------
// Draw name
//-----------------------------------------------------------------------------
CGMZ_Window_GatherJournalDisplay.prototype.drawName = function(name) {
	this.contents.fontBold = true;
	this._neededHeight += this.CGMZ_drawTextLine(name, 0, this._neededHeight, this.contents.width, 'center');
	this.contents.fontBold = false;
};
//-----------------------------------------------------------------------------
// Draw description
//-----------------------------------------------------------------------------
CGMZ_Window_GatherJournalDisplay.prototype.drawDescription = function(description) {
	const string = `\\c[${CGMZ.Gathering.LabelColor}]${CGMZ.Gathering.DescriptionLabelText}\\c[0]${description}`;
	this._neededHeight += this.CGMZ_drawText(string, 0, 0, this._neededHeight, this.contents.width, CGMZ.Gathering.DescriptionTextAlignment);
};
//-----------------------------------------------------------------------------
// Draw standard line
//-----------------------------------------------------------------------------
CGMZ_Window_GatherJournalDisplay.prototype.drawStandardLine = function(label, text) {
	const x = this.calculateX();
	const string = `\\c[${CGMZ.Gathering.LabelColor}]${label}\\c[0]${text}`;
	this._neededHeight += this.CGMZ_drawTextLine(string, x, this._neededHeight, this.contents.width, 'left');
};
//-----------------------------------------------------------------------------
// Calculate the x offset needed for journal image
//-----------------------------------------------------------------------------
CGMZ_Window_GatherJournalDisplay.prototype.calculateX = function() {
	if(this._neededHeight < this._offsetNeeded.start || this._neededHeight > this._offsetNeeded.end) return 0;
	return this._offsetNeeded.x;
};
//-----------------------------------------------------------------------------
// Draw flavor image
//-----------------------------------------------------------------------------
CGMZ_Window_GatherJournalDisplay.prototype.drawJournalImage = function(img, iconIndex) {
	if(!img && !iconIndex) return;
	if(img) {
		const imgData = CGMZ_Utils.getImageData(img, "img");
		const bitmap = ImageManager.loadBitmap(imgData.folder, imgData.filename);
		const dw = bitmap.width;
		const dh = bitmap.height;
		const dy = this._neededHeight;
		const dx = 0;
		this.contents.blt(bitmap, 0, 0, bitmap.width, bitmap.height, dx, dy, dw, dh);
		this._offsetNeeded = {x: dw + 4, start: this._neededHeight, end: this._neededHeight + dh + 4};
	} else {
		const bitmap = ImageManager.loadSystem('IconSet');
		const pw = ImageManager.iconWidth;
		const ph = ImageManager.iconHeight;
		const isx = (iconIndex % 16) * pw;
		const isy = Math.floor(iconIndex / 16) * ph;
		this.contents.blt(bitmap, isx, isy, pw, ph, 0, this._neededHeight, pw * 2, ph * 2);
		this._offsetNeeded = {x: pw * 2 + 4, start: this._neededHeight, end: this._neededHeight + ph * 2 + 4};
	}
};
//-----------------------------------------------------------------------------
// Draw flavor image
//-----------------------------------------------------------------------------
CGMZ_Window_GatherJournalDisplay.prototype.drawFlavorImg = function(img) {
	const imgData = CGMZ_Utils.getImageData(img, "img");
	const bitmap = ImageManager.loadBitmap(imgData.folder, imgData.filename);
	const dw = bitmap.width > this.contents.width ? this.contents.width : bitmap.width;
	const dh = bitmap.height;
	const dy = this._neededHeight;
	const dx = (this.contents.width - dw) / 2
	this.contents.blt(bitmap, 0, 0, bitmap.width, bitmap.height, dx, dy, dw, dh);
	this._neededHeight += bitmap.height + 4;
};