/*:
 * @author Casper Gaming
 * @url https://www.caspergaming.com/plugins/cgmz/daynightsystem/
 * @target MZ
 * @base CGMZ_Core
 * @orderAfter CGMZ_Core
 * @plugindesc Creates a day and night system
 * @help
 * ============================================================================
 * For terms and conditions using this plugin in your game please visit:
 * https://www.caspergaming.com/terms-of-use/
 * ============================================================================
 * Become a Patron to get access to beta/alpha plugins plus other goodies!
 * https://www.patreon.com/CasperGamingRPGM
 * ============================================================================
 * Version: Alpha R3
 * ----------------------------------------------------------------------------
 * Compatibility: Only tested with my CGMZ plugins.
 * Made for RPG Maker MZ 1.8.0
 * ----------------------------------------------------------------------------
 * Description: Creates a day and night system in your game. Can handle
 * tinting maps automatically as well as setting or getting the current time
 * of day. You can use standard time units such as second/minutes/hours, or
 * create your own. It will also keep track of the amount of days that go by
 * in the time system.
 * ----------------------------------------------------------------------------
 * Documentation:
 * ------------------------------Alpha Notes-----------------------------------
 * This plugin is in *ALPHA* stage, which means it is not feature complete.
 * I plan to add the following features before it reaches *BETA* stage:
 * 1) Settings for when time should count (currently just the map scene).
 *
 * Want additional features not already present/listed above? Make suggestions
 * on the Patreon Post or in my discord under the #suggestions channel!
 * https://discord.gg/Gbx7JXP
 * ----------------------------Plugin Commands---------------------------------
 * • Add Time
 * Can add (or subtract if param is negative) time in frames from the current
 * time. This can affect the day counter.
 * 
 * • Set Time
 * Will set the time to a specific frame within a "day" (maximum time unit).
 * This will not affect the day counter.
 * 
 * • Get Time
 * Will set a variable to be equal to the current frame of the "day" (maximum
 * time unit)
 * 
 * • Get Days
 * Will set a variable to be equal to the current day counter
 * 
 * • Stop Time
 * Will enable/disable time tracking. Tints will still apply even if time is
 * frozen. This just enables/disables the progression of the time.
 * -------------------------------Note Tags------------------------------------
 * This plugin supports automatic application of tints to the game screen
 * based on the time of day. This only works on maps that have the following
 * meta tag somewhere in the map properties notebox:
 * <cgmzDNStintable>
 * ------------------------------Time Tracking---------------------------------
 * This plugin can track time in frames automatically when the player is on the
 * map scene, menu scene, or battle scene. This plugin separately tracks
 * "added" time which is time you add or set via plugin commands.
 *
 * The plugin only stores frames. Time units are calculated when necessary
 * based off number of frames elapsed. For this reason, time units are not
 * saved so you can change the time unit parameters and have them work in
 * saved games.
 * -------------------------------Time Units-----------------------------------
 * The time unit parameter is used to create completely fictional units of
 * time, or to recreate the seconds/minutes/hours/days that the real world
 * uses.
 *
 * The order you create units of time is important! The first will be the
 * most basic unit of time (e.g. second), the next will be the second most
 * basic unit of time (e.g. minute), and so on. The last unit of time will
 * count up infinitely.
 *
 * The most basic unit of time uses frames as a measurement for the parameter
 * "Num Previous Units". For example, if you want to make seconds, you would
 * make it first in the list and then set Num Previous Units to 60 (60f = 1s).
 * ------------------------------Saved Games-----------------------------------
 * This plugin is fully compatible with saved games. This means you can:
 *
 * ✓ Add this plugin to a saved game and it will work as expected
 * ✓ Change any plugin params and changes will be reflected in saved games
 * ✓ Remove the plugin with no issue to save data
 * -----------------------------Filename---------------------------------------
 * The filename for this plugin MUST remain CGMZ_DayNightSystem.js
 * This is what it comes as when downloaded. The filename is used to load
 * parameters and execute plugin commands. If you change it, things will begin
 * behaving incorrectly and your game will probably crash. Please do not
 * rename the js file.
 * -------------------------Version History------------------------------------
 * Version Alpha R2
 * - Added a way to track the total amount of in game days
 * - Added option to run a common event when the day counter increases
 * - This plugin now warns instead of crashes when JSON params are invalid
 *
 * Version Alpha R3
 * - Added option to track time on the map screen
 * - Added option to track time while in battle
 * - Added option to track time while in menus
 * - Fix crash when trying to do an event test
 *
 * @command Add Time
 * @desc Add (or subtract) time from the current time.
 *
 * @arg Frames
 * @type number
 * @desc The amount of frames to add (set to negative to subtract).
 * @default 0
 *
 * @command Set Time
 * @desc Set time to a specific frame value
 *
 * @arg Frame
 * @type number
 * @desc The frame to set the time to (must be within 0 to maximum frames per day)
 * @min 0
 * @default 0
 *
 * @command Get Time
 * @desc Get the current time (in frames) and store in a variable
 *
 * @arg Variable
 * @type variable
 * @desc The variable to store the current time
 * @default 0
 *
 * @command Get Days
 * @desc Get the current day count and store in a variable
 *
 * @arg Variable
 * @type variable
 * @desc The variable to store the current day count
 * @default 0
 *
 * @command Stop Time
 * @desc Stop or Resume time
 *
 * @arg stop
 * @type boolean
 * @desc Whether time is stopped or not
 * @default true
 *
 * @param Main Settings
 * 
 * @param Time Units
 * @parent Main Settings
 * @type struct<TimeUnit>[]
 * @desc The units of time in order. See documentation for more info.
 * @default []
 *
 * @param Tints
 * @parent Main Settings
 * @type struct<Tint>[]
 * @desc Automatic tint screen settings
 * @default []
 *
 * @param Other Settings
 * 
 * @param Starting Frames
 * @parent Other Settings
 * @type number
 * @min 0
 * @desc The amount of frames to begin the game with. Affects starting time.
 * @default 0
 * 
 * @param Day Common Event
 * @parent Other Settings
 * @type common_event
 * @desc The common event to run after a full day
 * @default 0
 * 
 * @param Count Time In Battle
 * @parent Other Settings
 * @type boolean
 * @desc Continue to count the time while the player is in battle?
 * @default false
 * 
 * @param Count Time In Menu
 * @parent Other Settings
 * @type boolean
 * @desc Continue to count the time while the player is in the menu?
 * @default false
 * 
 * @param Count Time In Map
 * @parent Other Settings
 * @type boolean
 * @desc Continue to count the time while the player is on the map?
 * @default true
*/
/*~struct~TimeUnit:
 * @param Name
 * @desc The time unit name.
 *
 * @param Short Name
 * @desc The shortened name to use for the time unit.
 *
 * @param Abbr Name
 * @desc The abbreviated name to use for the time unit.
 *
 * @param Plural
 * @desc Letters to add to the end of the Name and Short Name if plural
 *
 * @param Num Previous Units
 * @type number
 * @default 60
 * @min 1
 * @desc Amount of previous time unit required before this increases
*/
/*~struct~Tint:
 * @param Start Time
 * @desc The number of the most basic time units to start the tint
 * @default 0
 * @type number
 * @min 0
 *
 * @param Red
 * @desc The amount of red in the tint
 * @default 0
 * @type number
 * @min -255
 * @max 255
 *
 * @param Green
 * @desc The amount of green in the tint
 * @default 0
 * @type number
 * @min -255
 * @max 255
 *
 * @param Blue
 * @desc The amount of blue in the tint
 * @default 0
 * @type number
 * @min -255
 * @max 255
 *
 * @param Gray
 * @desc The amount of gray in the tint
 * @default 0
 * @type number
 * @min 0
 * @max 255
 *
 * @param Duration
 * @type number
 * @min 0
 * @default 60
 * @desc Amount of frames for tint transition
*/
Imported.CGMZ_DayNightSystem = true;
CGMZ.Versions["Day Night System"] = "Alpha R3";
CGMZ.DayNightSystem = {};
CGMZ.DayNightSystem.parameters = PluginManager.parameters('CGMZ_DayNightSystem');
CGMZ.DayNightSystem.StartingFrames = Number(CGMZ.DayNightSystem.parameters["Starting Frames"]);
CGMZ.DayNightSystem.DayCommonEvent = Number(CGMZ.DayNightSystem.parameters["Day Common Event"]);
CGMZ.DayNightSystem.CountTimeInBattle = (CGMZ.DayNightSystem.parameters["Count Time In Battle"] === 'true');
CGMZ.DayNightSystem.CountTimeInMenu = (CGMZ.DayNightSystem.parameters["Count Time In Menu"] === 'true');
CGMZ.DayNightSystem.CountTimeInMap = (CGMZ.DayNightSystem.parameters["Count Time In Map"] === 'true');
CGMZ.DayNightSystem.TimeUnits = CGMZ_Utils.parseJSON(CGMZ.DayNightSystem.parameters["Time Units"], [], "CGMZ Day Night System", "Your Time Units parameter is set up incorrectly and could not be read.");
CGMZ.DayNightSystem.Tints = CGMZ_Utils.parseJSON(CGMZ.DayNightSystem.parameters["Tints"], [], "CGMZ Day Night System", "Your Tints parameter is set up incorrectly and could not be read.");
//=============================================================================
// CGMZ_TimeUnit
//-----------------------------------------------------------------------------
// Temp data class used to track time unit properties
//=============================================================================
function CGMZ_TimeUnit() {
    this.initialize(...arguments);
}
//-----------------------------------------------------------------------------
// Initialize
//-----------------------------------------------------------------------------
CGMZ_TimeUnit.prototype.initialize = function(unit) {
	this._name = unit.Name;
	this._shortName = unit["Short Name"];
	this._abbrName = unit["Abbr Name"];
	this._plural = unit.Plural;
	this._numPreviousUnits = Number(unit["Num Previous Units"]);
	this._currentAmount = 0;
};
//=============================================================================
// CGMZ_DayNightSystemTint
//-----------------------------------------------------------------------------
// Temp data class used to track tint properties
//=============================================================================
function CGMZ_DayNightSystemTint() {
    this.initialize(...arguments);
}
//-----------------------------------------------------------------------------
// Initialize
//-----------------------------------------------------------------------------
CGMZ_DayNightSystemTint.prototype.initialize = function(tint) {
	this._startTime = Number(tint["Start Time"]);
	this._tint = [Number(tint.Red), Number(tint.Green), Number(tint.Blue), Number(tint.Gray)];
	this._duration = Number(tint.Duration);
};
//=============================================================================
// CGMZ_Temp
//-----------------------------------------------------------------------------
// Create time system data. This is all temporary and based on graphics frame
// count.
//=============================================================================
//-----------------------------------------------------------------------------
// Create time system data
//-----------------------------------------------------------------------------
const CGMZ_DayNightSystem_CGMZTemp_createPluginData = CGMZ_Temp.prototype.createPluginData;
CGMZ_Temp.prototype.createPluginData = function() {
	CGMZ_DayNightSystem_CGMZTemp_createPluginData.call(this);
	this._timeUnits = [];
	for(const timeUnitJSON of CGMZ.DayNightSystem.TimeUnits) {
		const timeUnit = CGMZ_Utils.parseJSON(timeUnitJSON, null, "CGMZ Day Night System", "One of your time units was set up incorrectly and could not be read.");
		if(!timeUnit) continue;
		const unitObj = new CGMZ_TimeUnit(timeUnit);
		this._timeUnits.push(unitObj);
	}
	this._minimumTimeUnitFrames = this._timeUnits[0]._numPreviousUnits;
	this._totalFramesPerDayNightSystem = 1;
	for(let i = this._timeUnits.length - 1; i>=0; i--) {
		this._totalFramesPerDayNightSystem *= this._timeUnits[i]._numPreviousUnits;
	}
	this._dayNightSystemTints = [];
	for(const tintJSON of CGMZ.DayNightSystem.Tints) {
		const tint = CGMZ_Utils.parseJSON(tintJSON, null, "CGMZ Day Night System", "One of your tints was set up incorrectly and could not be read.");
		if(!tint) continue;
		const tintObj = new CGMZ_DayNightSystemTint(tint);
		this._dayNightSystemTints.push(tintObj);
	}
	this._dayNightSystemTints.sort((a, b) => {return a._startTime - b._startTime});
};
//-----------------------------------------------------------------------------
// Get the total amount of frames per day
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.getDNSFramesPerDay = function() {
	return this._totalFramesPerDayNightSystem;
};
//-----------------------------------------------------------------------------
// Calculate total frames
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.calculateDNSTotalFrames = function() {
	return $cgmz._cgmzDNSMapFrames + $cgmz._addedDNSFrames;
};
//-----------------------------------------------------------------------------
// Calculate Current Time (in most basic time unit)
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.calculateDNSTime = function() {
	const totalFrames = $cgmz._cgmzDNSMapFrames + $cgmz._addedDNSFrames;
	const dayFrames = totalFrames % this._totalFramesPerDayNightSystem;
	const basicTimeUnits = Math.floor(dayFrames / this._minimumTimeUnitFrames);
	return basicTimeUnits;
};
//-----------------------------------------------------------------------------
// Calculate Current Tint
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.calculateDNSTint = function(currentTime) {
	let currentTint = 0;
	for(let i = this._dayNightSystemTints.length - 1; i >= 0; i--) {
		if(this._dayNightSystemTints[i]._startTime <= currentTime) {
			currentTint = i;
			break;
		}
	}
	return currentTint;
};
//-----------------------------------------------------------------------------
// Alias. Register Day Night System Plugin Commands
//-----------------------------------------------------------------------------
const CGMZ_DayNightSystem_CGMZTemp_registerPluginCommands = CGMZ_Temp.prototype.registerPluginCommands;
CGMZ_Temp.prototype.registerPluginCommands = function() {
	CGMZ_DayNightSystem_CGMZTemp_registerPluginCommands.call(this);
	PluginManager.registerCommand("CGMZ_DayNightSystem", "Add Time", this.pluginCommandDayNightSystemAddTime);
	PluginManager.registerCommand("CGMZ_DayNightSystem", "Set Time", this.pluginCommandDayNightSystemSetTime);
	PluginManager.registerCommand("CGMZ_DayNightSystem", "Get Time", this.pluginCommandDayNightSystemGetTime);
	PluginManager.registerCommand("CGMZ_DayNightSystem", "Get Days", this.pluginCommandDayNightSystemGetDays);
	PluginManager.registerCommand("CGMZ_DayNightSystem", "Stop Time", this.pluginCommandDayNightSystemStopTime);
};
//-----------------------------------------------------------------------------
// Plugin Command - Add Time (frames)
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.pluginCommandDayNightSystemAddTime = function(args) {
	const oldDay = Math.floor($cgmzTemp.calculateDNSTotalFrames() / $cgmzTemp.getDNSFramesPerDay());
	$cgmz._addedDNSFrames += Number(args.Frames);
	const newDay = Math.floor($cgmzTemp.calculateDNSTotalFrames() / $cgmzTemp.getDNSFramesPerDay());
	if(newDay !== oldDay && newDay - oldDay > 0) {
		for(let i = 0; i < newDay - oldDay; i++) {
			$cgmz.increaseDNSDay();
		}
	}
};
//-----------------------------------------------------------------------------
// Plugin Command - Set Time (specific frame)
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.pluginCommandDayNightSystemSetTime = function(args) {
	const desiredFrameOfDay = Number(args.Frame) % $cgmzTemp._totalFramesPerDayNightSystem;
	const currentFrameOfDay = ($cgmz._addedDNSFrames + $cgmz._cgmzDNSMapFrames) % $cgmzTemp._totalFramesPerDayNightSystem;
	let framesToAdd = 0;
	if(currentFrameOfDay < desiredFrameOfDay) {
		framesToAdd = desiredFrameOfDay - currentFrameOfDay;
	} else {
		framesToAdd = $cgmzTemp._totalFramesPerDayNightSystem - currentFrameOfDay + desiredFrameOfDay;
	}
	$cgmz._addedDNSFrames += framesToAdd;
};
//-----------------------------------------------------------------------------
// Plugin Command - Get Time
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.pluginCommandDayNightSystemGetTime = function(args) {
	$gameVariables.setValue(Number(args.Variable), ($cgmz._addedDNSFrames + $cgmz._cgmzDNSMapFrames) % $cgmzTemp._totalFramesPerDayNightSystem);
};
//-----------------------------------------------------------------------------
// Plugin Command - Get Days
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.pluginCommandDayNightSystemGetDays = function(args) {
	$gameVariables.setValue(Number(args.Variable), $cgmz._dayNightSystemDays);
};
//-----------------------------------------------------------------------------
// Plugin Command - Freeze Time
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.pluginCommandDayNightSystemStopTime = function(args) {
	$cgmz.setStopDNStime(args.stop === 'true');
};
//=============================================================================
// CGMZ_Core
//-----------------------------------------------------------------------------
// Store amount of frames in time system
//=============================================================================
//-----------------------------------------------------------------------------
// Also keep track of added frames for time system
//-----------------------------------------------------------------------------
const CGMZ_DayNightSystem_CGMZCore_createPluginData = CGMZ_Core.prototype.createPluginData;
CGMZ_Core.prototype.createPluginData = function() {
	CGMZ_DayNightSystem_CGMZCore_createPluginData.call(this);
	this._addedDNSFrames = CGMZ.DayNightSystem.StartingFrames;
	this._cgmzDNSMapFrames = 0;
	this._dayNightCurrentTint = -1;
	this._dayNightSystemDays = 0;
	this._DNSTimeStopped = false;
};
//-----------------------------------------------------------------------------
// Add day night variables if save file doesn't have them
//-----------------------------------------------------------------------------
const CGMZ_DayNightSystem_CGMZCore_onAfterLoad = CGMZ_Core.prototype.onAfterLoad;
CGMZ_Core.prototype.onAfterLoad = function() {
	CGMZ_DayNightSystem_CGMZCore_onAfterLoad.call(this);
	if(typeof this._addedDNSFrames === 'undefined') { // Means this plugin is new in the saved game
		this._addedDNSFrames = CGMZ.DayNightSystem.StartingFrames;
		this._cgmzDNSMapFrames = 0;
		this._dayNightCurrentTint = -1;
		this._DNSTimeStopped = false;
	}
	if(typeof this._dayNightSystemDays === 'undefined') { // After alpha R2
		this._dayNightSystemDays = 0;
	}
};
//-----------------------------------------------------------------------------
// Freeze the time tracking of the day night system
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.setStopDNStime = function(setting) {
	this._DNSTimeStopped = setting;
};
//-----------------------------------------------------------------------------
// Check if DNS time is frozen
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.isDNSTimeStopped = function() {
	return this._DNSTimeStopped;
};
//-----------------------------------------------------------------------------
// Add one frame to the DNS map frames
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.addDNSFrame = function() {
	const oldFrames = this._cgmzDNSMapFrames;
	this._cgmzDNSMapFrames += 1 * !this.isDNSTimeStopped();
	if(oldFrames !== this._cgmzDNSMapFrames) {
		if($cgmzTemp.calculateDNSTotalFrames() % $cgmzTemp.getDNSFramesPerDay() === 0) {
			this.increaseDNSDay();
		}
	}
};
//-----------------------------------------------------------------------------
// Handling for when one day ticks over to another day
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.increaseDNSDay = function() {
	this._dayNightSystemDays++;
	if(CGMZ.DayNightSystem.DayCommonEvent) $gameTemp.reserveCommonEvent(CGMZ.DayNightSystem.DayCommonEvent);
};
//=============================================================================
// Game_Map
//-----------------------------------------------------------------------------
// Add function for determining if it is a tintable map
//=============================================================================
//-----------------------------------------------------------------------------
// Setup map for day night system
//-----------------------------------------------------------------------------
const alias_CGMZ_DayNightSystem_GameMap_setup = Game_Map.prototype.setup;
Game_Map.prototype.setup = function(mapId) {
	alias_CGMZ_DayNightSystem_GameMap_setup.call(this, mapId);
    this._cgmzIsTintableDayNightMap = ($dataMap?.meta?.cgmzDNStintable);
	this._cgmzDNSFrames = 0;
	if(this._cgmzIsTintableDayNightMap) {
		const currentTime = $cgmzTemp.calculateDNSTime();
		const currentTint = $cgmzTemp.calculateDNSTint(currentTime);
		const tint = $cgmzTemp._dayNightSystemTints[currentTint];
		$gameScreen.startTint(tint._tint, 0);
	}
};
//-----------------------------------------------------------------------------
// Update Day Night System
//-----------------------------------------------------------------------------
const alias_CGMZ_DayNightSystem_GameMap_update = Game_Map.prototype.update;
Game_Map.prototype.update = function(sceneActive) {
    alias_CGMZ_DayNightSystem_GameMap_update.call(this, sceneActive);
	if(CGMZ.DayNightSystem.CountTimeInMap) $cgmz.addDNSFrame();
	if(this._cgmzIsTintableDayNightMap) {
		this.updateCGMZDNS();
	}
};
//-----------------------------------------------------------------------------
// Check for tint change every basic time unit.
//-----------------------------------------------------------------------------
Game_Map.prototype.updateCGMZDNS = function() {
	this._cgmzDNSFrames++;
	if(this._cgmzDNSFrames >= $cgmzTemp._minimumTimeUnitFrames) {
		this._cgmzDNSFrames = 0;
		this.updateCGMZDNSTint();
	}
};
//-----------------------------------------------------------------------------
// Update tint if needed
//-----------------------------------------------------------------------------
Game_Map.prototype.updateCGMZDNSTint = function() {
	const currentTime = $cgmzTemp.calculateDNSTime();
	const currentTint = $cgmzTemp.calculateDNSTint(currentTime);
	if(currentTint !== $cgmz._dayNightCurrentTint) {
		$cgmz._dayNightCurrentTint = currentTint;
		const tint = $cgmzTemp._dayNightSystemTints[currentTint];
		$gameScreen.startTint(tint._tint, tint._duration);
	}
};
//=============================================================================
// Scene_MenuBase
//-----------------------------------------------------------------------------
// Add function to count time in menus (if needed)
//=============================================================================
//-----------------------------------------------------------------------------
// Also check if need to update time
//-----------------------------------------------------------------------------
const alias_CGMZ_DayNightSystem_SceneMenuBase_update = Scene_MenuBase.prototype.update
Scene_MenuBase.prototype.update = function() {
    alias_CGMZ_DayNightSystem_SceneMenuBase_update.call(this);
    if(CGMZ.DayNightSystem.CountTimeInMenu) $cgmz.addDNSFrame();
};
//=============================================================================
// Scene_Battle
//-----------------------------------------------------------------------------
// Add function to count time in battle (if needed)
//=============================================================================
//-----------------------------------------------------------------------------
// Also check if need to update time
//-----------------------------------------------------------------------------
const alias_CGMZ_DayNightSystem_SceneBattle_update = Scene_Battle.prototype.update
Scene_Battle.prototype.update = function() {
    alias_CGMZ_DayNightSystem_SceneBattle_update.call(this);
	if(CGMZ.DayNightSystem.CountTimeInBattle) $cgmz.addDNSFrame();
};