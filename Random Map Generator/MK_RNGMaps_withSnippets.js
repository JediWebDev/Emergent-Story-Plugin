/*:
 * @target MZ
 * @plugindesc [Tier 2] [Version 3.2.0] [MV & MZ]
 * @author Aerosys
 * @url https://aerosys.blog
 * @base MK_RNGMaps_Core
 * @orderAfter MK_RNGMaps_Core
 * 
 * @param templates
 * @text Templates
 * @type struct<Template>[]
 * @default ["{\"name\":\"Classic Maze\",\"width\":\"6\",\"height\":\"6\",\"algorithm\":\"Maze\",\"classicMazeParams\":\"{\\\"cutOffDeadEnds\\\":\\\"0\\\",\\\"additionalTunnels\\\":\\\"0\\\"}\",\"randomWalkParams\":\"\",\"roomsAndCorridorsParams\":\"\",\"exitMode\":\"from Asset Map\",\"assets\":\"-----\",\"commonAssetIds\":\"[\\\"1\\\",\\\"2\\\",\\\"3\\\",\\\"4\\\"]\",\"specialAssets\":\"[\\\"{\\\\\\\"name\\\\\\\":\\\\\\\"Chests\\\\\\\",\\\\\\\"regionId\\\\\\\":\\\\\\\"20\\\\\\\",\\\\\\\"min\\\\\\\":\\\\\\\"2\\\\\\\",\\\\\\\"max\\\\\\\":\\\\\\\"3\\\\\\\",\\\\\\\"meta\\\\\\\":\\\\\\\"count over Meta Maze\\\\\\\",\\\\\\\"requireSwitch\\\\\\\":\\\\\\\"false\\\\\\\",\\\\\\\"switchId\\\\\\\":\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"name\\\\\\\":\\\\\\\"Mobs\\\\\\\",\\\\\\\"regionId\\\\\\\":\\\\\\\"21\\\\\\\",\\\\\\\"isDifferentTargetRegionId\\\\\\\":\\\\\\\"true\\\\\\\",\\\\\\\"targetRegionId\\\\\\\":\\\\\\\"20\\\\\\\",\\\\\\\"number\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"fixedOrVariables\\\\\\\":\\\\\\\"fixed\\\\\\\",\\\\\\\"min\\\\\\\":\\\\\\\"3\\\\\\\",\\\\\\\"max\\\\\\\":\\\\\\\"4\\\\\\\",\\\\\\\"minVariables\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"maxVariables\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"meta\\\\\\\":\\\\\\\"count over this map\\\\\\\",\\\\\\\"isImportant\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"requireSwitch\\\\\\\":\\\\\\\"false\\\\\\\",\\\\\\\"switchId\\\\\\\":\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"name\\\\\\\":\\\\\\\"Switch\\\\\\\",\\\\\\\"regionId\\\\\\\":\\\\\\\"22\\\\\\\",\\\\\\\"isDifferentTargetRegionId\\\\\\\":\\\\\\\"true\\\\\\\",\\\\\\\"targetRegionId\\\\\\\":\\\\\\\"20\\\\\\\",\\\\\\\"number\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"fixedOrVariables\\\\\\\":\\\\\\\"fixed\\\\\\\",\\\\\\\"min\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"max\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"minVariables\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"maxVariables\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"meta\\\\\\\":\\\\\\\"count over this map\\\\\\\",\\\\\\\"isImportant\\\\\\\":\\\\\\\"true\\\\\\\",\\\\\\\"requireSwitch\\\\\\\":\\\\\\\"false\\\\\\\",\\\\\\\"switchId\\\\\\\":\\\\\\\"\\\\\\\"}\\\"]\",\"shadings\":\"\",\"scale\":\"10\",\"minValue\":\"0.6\",\"borderWidth\":\"1\",\"fixAutoTiles\":\"\",\"shadowMode\":\"use global Settings\"}","{\"name\":\"Imperfect Maze\",\"width\":\"6\",\"height\":\"6\",\"algorithm\":\"Maze\",\"classicMazeParams\":\"{\\\"cutOffDeadEnds\\\":\\\"1-2\\\",\\\"additionalTunnels\\\":\\\"2-3\\\"}\",\"randomWalkParams\":\"\",\"roomsAndCorridorsParams\":\"\",\"exitMode\":\"from Asset Map\",\"assets\":\"-----\",\"commonAssetIds\":\"[\\\"1\\\",\\\"2\\\",\\\"3\\\",\\\"4\\\"]\",\"specialAssets\":\"[\\\"{\\\\\\\"name\\\\\\\":\\\\\\\"Chests\\\\\\\",\\\\\\\"regionId\\\\\\\":\\\\\\\"20\\\\\\\",\\\\\\\"isDifferentTargetRegionId\\\\\\\":\\\\\\\"false\\\\\\\",\\\\\\\"targetRegionId\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"number\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"fixedOrVariables\\\\\\\":\\\\\\\"fixed\\\\\\\",\\\\\\\"min\\\\\\\":\\\\\\\"2\\\\\\\",\\\\\\\"max\\\\\\\":\\\\\\\"3\\\\\\\",\\\\\\\"minVariables\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"maxVariables\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"meta\\\\\\\":\\\\\\\"count over Meta Maze\\\\\\\",\\\\\\\"isImportant\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"requireSwitch\\\\\\\":\\\\\\\"false\\\\\\\",\\\\\\\"switchId\\\\\\\":\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"name\\\\\\\":\\\\\\\"Mobs\\\\\\\",\\\\\\\"regionId\\\\\\\":\\\\\\\"21\\\\\\\",\\\\\\\"isDifferentTargetRegionId\\\\\\\":\\\\\\\"true\\\\\\\",\\\\\\\"targetRegionId\\\\\\\":\\\\\\\"20\\\\\\\",\\\\\\\"number\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"fixedOrVariables\\\\\\\":\\\\\\\"fixed\\\\\\\",\\\\\\\"min\\\\\\\":\\\\\\\"3\\\\\\\",\\\\\\\"max\\\\\\\":\\\\\\\"4\\\\\\\",\\\\\\\"minVariables\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"maxVariables\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"meta\\\\\\\":\\\\\\\"count over this map\\\\\\\",\\\\\\\"isImportant\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"requireSwitch\\\\\\\":\\\\\\\"false\\\\\\\",\\\\\\\"switchId\\\\\\\":\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"name\\\\\\\":\\\\\\\"Switch\\\\\\\",\\\\\\\"regionId\\\\\\\":\\\\\\\"22\\\\\\\",\\\\\\\"isDifferentTargetRegionId\\\\\\\":\\\\\\\"true\\\\\\\",\\\\\\\"targetRegionId\\\\\\\":\\\\\\\"20\\\\\\\",\\\\\\\"number\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"fixedOrVariables\\\\\\\":\\\\\\\"fixed\\\\\\\",\\\\\\\"min\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"max\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"minVariables\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"maxVariables\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"meta\\\\\\\":\\\\\\\"count over this map\\\\\\\",\\\\\\\"isImportant\\\\\\\":\\\\\\\"true\\\\\\\",\\\\\\\"requireSwitch\\\\\\\":\\\\\\\"false\\\\\\\",\\\\\\\"switchId\\\\\\\":\\\\\\\"\\\\\\\"}\\\"]\",\"shadings\":\"\",\"scale\":\"10\",\"minValue\":\"0.6\",\"borderWidth\":\"1\",\"fixAutoTiles\":\"\",\"shadowMode\":\"use global Settings\"}","{\"name\":\"Sewers\",\"width\":\"6\",\"height\":\"6\",\"algorithm\":\"Maze\",\"classicMazeParams\":\"{\\\"cutOffDeadEnds\\\":\\\"1-2\\\",\\\"additionalTunnels\\\":\\\"2-3\\\"}\",\"randomWalkParams\":\"\",\"roomsAndCorridorsParams\":\"\",\"exitMode\":\"None\",\"assets\":\"-----\",\"commonAssetIds\":\"[\\\"1\\\",\\\"2\\\",\\\"3\\\",\\\"4\\\"]\",\"specialAssets\":\"[\\\"{\\\\\\\"name\\\\\\\":\\\\\\\"Entrance\\\\\\\",\\\\\\\"regionId\\\\\\\":\\\\\\\"5\\\\\\\",\\\\\\\"isDifferentTargetRegionId\\\\\\\":\\\\\\\"false\\\\\\\",\\\\\\\"targetRegionId\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"number\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"fixedOrVariables\\\\\\\":\\\\\\\"fixed\\\\\\\",\\\\\\\"min\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"max\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"minVariables\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"maxVariables\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"meta\\\\\\\":\\\\\\\"count over this map\\\\\\\",\\\\\\\"isImportant\\\\\\\":\\\\\\\"true\\\\\\\",\\\\\\\"requireSwitch\\\\\\\":\\\\\\\"false\\\\\\\",\\\\\\\"switchId\\\\\\\":\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"name\\\\\\\":\\\\\\\"Exit\\\\\\\",\\\\\\\"regionId\\\\\\\":\\\\\\\"13\\\\\\\",\\\\\\\"isDifferentTargetRegionId\\\\\\\":\\\\\\\"false\\\\\\\",\\\\\\\"targetRegionId\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"number\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"fixedOrVariables\\\\\\\":\\\\\\\"fixed\\\\\\\",\\\\\\\"min\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"max\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"minVariables\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"maxVariables\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"meta\\\\\\\":\\\\\\\"count over this map\\\\\\\",\\\\\\\"isImportant\\\\\\\":\\\\\\\"true\\\\\\\",\\\\\\\"requireSwitch\\\\\\\":\\\\\\\"false\\\\\\\",\\\\\\\"switchId\\\\\\\":\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"name\\\\\\\":\\\\\\\"Chests\\\\\\\",\\\\\\\"regionId\\\\\\\":\\\\\\\"20\\\\\\\",\\\\\\\"min\\\\\\\":\\\\\\\"2\\\\\\\",\\\\\\\"max\\\\\\\":\\\\\\\"3\\\\\\\",\\\\\\\"meta\\\\\\\":\\\\\\\"count over Meta Maze\\\\\\\",\\\\\\\"requireSwitch\\\\\\\":\\\\\\\"false\\\\\\\",\\\\\\\"switchId\\\\\\\":\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"name\\\\\\\":\\\\\\\"Mobs\\\\\\\",\\\\\\\"regionId\\\\\\\":\\\\\\\"21\\\\\\\",\\\\\\\"isDifferentTargetRegionId\\\\\\\":\\\\\\\"true\\\\\\\",\\\\\\\"targetRegionId\\\\\\\":\\\\\\\"20\\\\\\\",\\\\\\\"number\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"fixedOrVariables\\\\\\\":\\\\\\\"fixed\\\\\\\",\\\\\\\"min\\\\\\\":\\\\\\\"3\\\\\\\",\\\\\\\"max\\\\\\\":\\\\\\\"4\\\\\\\",\\\\\\\"minVariables\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"maxVariables\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"meta\\\\\\\":\\\\\\\"count over this map\\\\\\\",\\\\\\\"isImportant\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"requireSwitch\\\\\\\":\\\\\\\"false\\\\\\\",\\\\\\\"switchId\\\\\\\":\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"name\\\\\\\":\\\\\\\"Switch\\\\\\\",\\\\\\\"regionId\\\\\\\":\\\\\\\"22\\\\\\\",\\\\\\\"isDifferentTargetRegionId\\\\\\\":\\\\\\\"true\\\\\\\",\\\\\\\"targetRegionId\\\\\\\":\\\\\\\"20\\\\\\\",\\\\\\\"number\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"fixedOrVariables\\\\\\\":\\\\\\\"fixed\\\\\\\",\\\\\\\"min\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"max\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"minVariables\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"maxVariables\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"meta\\\\\\\":\\\\\\\"count over this map\\\\\\\",\\\\\\\"isImportant\\\\\\\":\\\\\\\"true\\\\\\\",\\\\\\\"requireSwitch\\\\\\\":\\\\\\\"false\\\\\\\",\\\\\\\"switchId\\\\\\\":\\\\\\\"\\\\\\\"}\\\"]\",\"shadings\":\"\",\"scale\":\"10\",\"minValue\":\"0.6\",\"borderWidth\":\"1\",\"fixAutoTiles\":\"\",\"shadowMode\":\"use global Settings\"}","{\"name\":\"Cave\",\"width\":\"6\",\"height\":\"6\",\"algorithm\":\"Random Walk\",\"classicMazeParams\":\"\",\"randomWalkParams\":\"nothing to do\",\"roomsAndCorridorsParams\":\"\",\"exitMode\":\"from Asset Map\",\"assets\":\"-----\",\"commonAssetIds\":\"[\\\"1\\\",\\\"2\\\",\\\"3\\\",\\\"4\\\"]\",\"specialAssets\":\"[\\\"{\\\\\\\"name\\\\\\\":\\\\\\\"Chests\\\\\\\",\\\\\\\"regionId\\\\\\\":\\\\\\\"20\\\\\\\",\\\\\\\"min\\\\\\\":\\\\\\\"2\\\\\\\",\\\\\\\"max\\\\\\\":\\\\\\\"3\\\\\\\",\\\\\\\"meta\\\\\\\":\\\\\\\"count over Meta Maze\\\\\\\",\\\\\\\"requireSwitch\\\\\\\":\\\\\\\"false\\\\\\\",\\\\\\\"switchId\\\\\\\":\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"name\\\\\\\":\\\\\\\"Mobs\\\\\\\",\\\\\\\"regionId\\\\\\\":\\\\\\\"21\\\\\\\",\\\\\\\"isDifferentTargetRegionId\\\\\\\":\\\\\\\"true\\\\\\\",\\\\\\\"targetRegionId\\\\\\\":\\\\\\\"20\\\\\\\",\\\\\\\"number\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"fixedOrVariables\\\\\\\":\\\\\\\"fixed\\\\\\\",\\\\\\\"min\\\\\\\":\\\\\\\"3\\\\\\\",\\\\\\\"max\\\\\\\":\\\\\\\"4\\\\\\\",\\\\\\\"minVariables\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"maxVariables\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"meta\\\\\\\":\\\\\\\"count over this map\\\\\\\",\\\\\\\"isImportant\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"requireSwitch\\\\\\\":\\\\\\\"false\\\\\\\",\\\\\\\"switchId\\\\\\\":\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"name\\\\\\\":\\\\\\\"Switch\\\\\\\",\\\\\\\"regionId\\\\\\\":\\\\\\\"22\\\\\\\",\\\\\\\"isDifferentTargetRegionId\\\\\\\":\\\\\\\"true\\\\\\\",\\\\\\\"targetRegionId\\\\\\\":\\\\\\\"20\\\\\\\",\\\\\\\"number\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"fixedOrVariables\\\\\\\":\\\\\\\"fixed\\\\\\\",\\\\\\\"min\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"max\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"minVariables\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"maxVariables\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"meta\\\\\\\":\\\\\\\"count over this map\\\\\\\",\\\\\\\"isImportant\\\\\\\":\\\\\\\"true\\\\\\\",\\\\\\\"requireSwitch\\\\\\\":\\\\\\\"false\\\\\\\",\\\\\\\"switchId\\\\\\\":\\\\\\\"\\\\\\\"}\\\"]\",\"shadings\":\"\",\"scale\":\"10\",\"minValue\":\"0.6\",\"borderWidth\":\"1\",\"fixAutoTiles\":\"\",\"shadowMode\":\"use global Settings\"}","{\"name\":\"Castle\",\"width\":\"6\",\"height\":\"6\",\"algorithm\":\"Rooms & Corridors\",\"classicMazeParams\":\"\",\"randomWalkParams\":\"\",\"roomsAndCorridorsParams\":\"{\\\"minRooms\\\":\\\"3\\\",\\\"maxRooms\\\":\\\"4\\\",\\\"minRoomWidth\\\":\\\"1\\\",\\\"maxRoomWidth\\\":\\\"2\\\",\\\"minRoomHeight\\\":\\\"1\\\",\\\"maxRoomHeight\\\":\\\"2\\\"}\",\"exitMode\":\"from Asset Map\",\"assets\":\"-----\",\"commonAssetIds\":\"[\\\"1\\\",\\\"2\\\",\\\"3\\\",\\\"4\\\"]\",\"specialAssets\":\"[\\\"{\\\\\\\"name\\\\\\\":\\\\\\\"Chests\\\\\\\",\\\\\\\"regionId\\\\\\\":\\\\\\\"20\\\\\\\",\\\\\\\"min\\\\\\\":\\\\\\\"2\\\\\\\",\\\\\\\"max\\\\\\\":\\\\\\\"3\\\\\\\",\\\\\\\"meta\\\\\\\":\\\\\\\"count over Meta Maze\\\\\\\",\\\\\\\"requireSwitch\\\\\\\":\\\\\\\"false\\\\\\\",\\\\\\\"switchId\\\\\\\":\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"name\\\\\\\":\\\\\\\"Mobs\\\\\\\",\\\\\\\"regionId\\\\\\\":\\\\\\\"21\\\\\\\",\\\\\\\"isDifferentTargetRegionId\\\\\\\":\\\\\\\"true\\\\\\\",\\\\\\\"targetRegionId\\\\\\\":\\\\\\\"20\\\\\\\",\\\\\\\"number\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"fixedOrVariables\\\\\\\":\\\\\\\"fixed\\\\\\\",\\\\\\\"min\\\\\\\":\\\\\\\"3\\\\\\\",\\\\\\\"max\\\\\\\":\\\\\\\"4\\\\\\\",\\\\\\\"minVariables\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"maxVariables\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"meta\\\\\\\":\\\\\\\"count over this map\\\\\\\",\\\\\\\"isImportant\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"requireSwitch\\\\\\\":\\\\\\\"false\\\\\\\",\\\\\\\"switchId\\\\\\\":\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"name\\\\\\\":\\\\\\\"Switch\\\\\\\",\\\\\\\"regionId\\\\\\\":\\\\\\\"22\\\\\\\",\\\\\\\"isDifferentTargetRegionId\\\\\\\":\\\\\\\"true\\\\\\\",\\\\\\\"targetRegionId\\\\\\\":\\\\\\\"20\\\\\\\",\\\\\\\"number\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"fixedOrVariables\\\\\\\":\\\\\\\"fixed\\\\\\\",\\\\\\\"min\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"max\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"minVariables\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"maxVariables\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"meta\\\\\\\":\\\\\\\"count over this map\\\\\\\",\\\\\\\"isImportant\\\\\\\":\\\\\\\"true\\\\\\\",\\\\\\\"requireSwitch\\\\\\\":\\\\\\\"false\\\\\\\",\\\\\\\"switchId\\\\\\\":\\\\\\\"\\\\\\\"}\\\"]\",\"shadings\":\"\",\"scale\":\"10\",\"minValue\":\"0.6\",\"borderWidth\":\"1\",\"fixAutoTiles\":\"\",\"shadowMode\":\"use global Settings\"}","{\"name\":\"Town\",\"width\":\"6\",\"height\":\"6\",\"algorithm\":\"Maze\",\"classicMazeParams\":\"{\\\"cutOffDeadEnds\\\":\\\"1-2\\\",\\\"additionalTunnels\\\":\\\"2-3\\\"}\",\"randomWalkParams\":\"\",\"roomsAndCorridorsParams\":\"\",\"exitMode\":\"Paths to Map's End\",\"assets\":\"-----\",\"commonAssetIds\":\"[\\\"1\\\",\\\"2\\\",\\\"3\\\",\\\"4\\\"]\",\"specialAssets\":\"[\\\"{\\\\\\\"name\\\\\\\":\\\\\\\"Chests\\\\\\\",\\\\\\\"regionId\\\\\\\":\\\\\\\"20\\\\\\\",\\\\\\\"min\\\\\\\":\\\\\\\"2\\\\\\\",\\\\\\\"max\\\\\\\":\\\\\\\"3\\\\\\\",\\\\\\\"meta\\\\\\\":\\\\\\\"count over Meta Maze\\\\\\\",\\\\\\\"requireSwitch\\\\\\\":\\\\\\\"false\\\\\\\",\\\\\\\"switchId\\\\\\\":\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"name\\\\\\\":\\\\\\\"Mobs\\\\\\\",\\\\\\\"regionId\\\\\\\":\\\\\\\"21\\\\\\\",\\\\\\\"isDifferentTargetRegionId\\\\\\\":\\\\\\\"true\\\\\\\",\\\\\\\"targetRegionId\\\\\\\":\\\\\\\"20\\\\\\\",\\\\\\\"number\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"fixedOrVariables\\\\\\\":\\\\\\\"fixed\\\\\\\",\\\\\\\"min\\\\\\\":\\\\\\\"3\\\\\\\",\\\\\\\"max\\\\\\\":\\\\\\\"4\\\\\\\",\\\\\\\"minVariables\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"maxVariables\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"meta\\\\\\\":\\\\\\\"count over this map\\\\\\\",\\\\\\\"isImportant\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"requireSwitch\\\\\\\":\\\\\\\"false\\\\\\\",\\\\\\\"switchId\\\\\\\":\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"name\\\\\\\":\\\\\\\"Switch\\\\\\\",\\\\\\\"regionId\\\\\\\":\\\\\\\"22\\\\\\\",\\\\\\\"isDifferentTargetRegionId\\\\\\\":\\\\\\\"true\\\\\\\",\\\\\\\"targetRegionId\\\\\\\":\\\\\\\"20\\\\\\\",\\\\\\\"number\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"fixedOrVariables\\\\\\\":\\\\\\\"fixed\\\\\\\",\\\\\\\"min\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"max\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"minVariables\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"maxVariables\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"meta\\\\\\\":\\\\\\\"count over this map\\\\\\\",\\\\\\\"isImportant\\\\\\\":\\\\\\\"true\\\\\\\",\\\\\\\"requireSwitch\\\\\\\":\\\\\\\"false\\\\\\\",\\\\\\\"switchId\\\\\\\":\\\\\\\"\\\\\\\"}\\\"]\",\"shadings\":\"\",\"scale\":\"10\",\"minValue\":\"0.6\",\"borderWidth\":\"0\",\"fixAutoTiles\":\"\",\"shadowMode\":\"use global Settings\"}","{\"name\":\"REQUIRED!\",\"width\":\"6\",\"height\":\"6\",\"algorithm\":\"Maze\",\"classicMazeParams\":\"{\\\"cutOffDeadEnds\\\":\\\"1-2\\\",\\\"additionalTunnels\\\":\\\"2-3\\\"}\",\"randomWalkParams\":\"nothing to do\",\"roomsAndCorridorsParams\":\"\",\"exitMode\":\"from Asset Map\",\"assets\":\"-----\",\"commonAssetIds\":\"[\\\"1\\\",\\\"2\\\",\\\"3\\\",\\\"4\\\"]\",\"specialAssets\":\"[\\\"{\\\\\\\"name\\\\\\\":\\\\\\\"Chests\\\\\\\",\\\\\\\"regionId\\\\\\\":\\\\\\\"20\\\\\\\",\\\\\\\"min\\\\\\\":\\\\\\\"2\\\\\\\",\\\\\\\"max\\\\\\\":\\\\\\\"3\\\\\\\",\\\\\\\"meta\\\\\\\":\\\\\\\"count over Meta Maze\\\\\\\",\\\\\\\"requireSwitch\\\\\\\":\\\\\\\"false\\\\\\\",\\\\\\\"switchId\\\\\\\":\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"name\\\\\\\":\\\\\\\"Mobs\\\\\\\",\\\\\\\"regionId\\\\\\\":\\\\\\\"21\\\\\\\",\\\\\\\"min\\\\\\\":\\\\\\\"3\\\\\\\",\\\\\\\"max\\\\\\\":\\\\\\\"4\\\\\\\",\\\\\\\"meta\\\\\\\":\\\\\\\"count over this map\\\\\\\",\\\\\\\"requireSwitch\\\\\\\":\\\\\\\"false\\\\\\\",\\\\\\\"switchId\\\\\\\":\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"name\\\\\\\":\\\\\\\"Switch\\\\\\\",\\\\\\\"regionId\\\\\\\":\\\\\\\"22\\\\\\\",\\\\\\\"min\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"max\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"meta\\\\\\\":\\\\\\\"count over this map\\\\\\\",\\\\\\\"requireSwitch\\\\\\\":\\\\\\\"false\\\\\\\",\\\\\\\"switchId\\\\\\\":\\\\\\\"\\\\\\\"}\\\"]\",\"shadings\":\"\",\"scale\":\"10\",\"minValue\":\"0.6\",\"borderWidth\":\"1\",\"fixAutoTiles\":\"\",\"shadowMode\":\"use global Settings\"}"]
 * 
 */


/*
 * =====================================================================================
 * STRUCTS
 * =====================================================================================
 */

/*~struct~Template:
 *
 * @param name
 * @text Name
 * @type string
 * @desc Name of the Template. Must be unique.
 * @default REQUIRED!
 * 
 * @param width
 * @text Width
 * @type number
 * @desc Number of Snippets
 * @default 6
 * 
 * @param height
 * @text Height
 * @type number
 * @desc Number of Snippets
 * @default 6
 * 
 * @param algorithm
 * @text Base Algorithm
 * @type select
 * @option Maze
 * @option Random Walk
 * @option Rooms & Corridors
 * @default Maze
 * 
 * @param classicMazeParams
 * @parent algorithm
 * @text when Classic Maze
 * @type struct<ClassicMazeParams>
 * @default {"cutOffDeadEnds":"1-2","additionalTunnels":"2-3"}
 * 
 * @param randomWalkParams
 * @parent algorithm
 * @text when Random Walk
 * @default nothing to do
 * 
 * @param roomsAndCorridorsParams
 * @parent algorithm
 * @text when Rooms & Corridors
 * @type struct<RoomsAndCorridorsParams>
 * 
 * @param exitMode
 * @text Exit Mode
 * @type select
 * @option None
 * @option from Asset Map
 * @option Paths to Map's End
 * @default from Asset Map
 * 
 * @param assets
 * @text Assets & Decoration
 * @default -----
 * 
 * @param commonAssetIds
 * @parent assets
 * @text Common Assets: Region Ids
 * @type number[]
 * @desc Region Ids of all assets that are drawn automatically, usually decorative assets.
 * @default ["1","2","3","4"]
 * 
 * @param specialAssets
 * @parent assets
 * @text Special Assets
 * @type struct<AssetConfig>[]
 * @default ["{\"name\":\"Chests\",\"regionId\":\"20\",\"min\":\"2\",\"max\":\"3\",\"meta\":\"count over Meta Maze\",\"requireSwitch\":\"false\",\"switchId\":\"\"}","{\"name\":\"Mobs\",\"regionId\":\"21\",\"min\":\"3\",\"max\":\"4\",\"meta\":\"count over this map\",\"requireSwitch\":\"false\",\"switchId\":\"\"}","{\"name\":\"Switch\",\"regionId\":\"22\",\"min\":\"1\",\"max\":\"1\",\"meta\":\"count over this map\",\"requireSwitch\":\"false\",\"switchId\":\"\"}"]
 * 
 * @param shadings
 * @text Shadings
 * 
 * @param scale
 * @parent shadings
 * @text Scale
 * @type number
 * @default 10
 * 
 * @param minValue
 * @parent shadings
 * @text min Value
 * @type number
 * @decimals 2
 * @default 0.6
 * 
 * @param borderWidth
 * @text Border Width
 * @type number
 * @desc a Margin that goes aroung the generated map
 * @default 1
 * 
 * @param fixAutoTiles
 * @text Fix AutoTiles?
 * @type struct<FixAutoTiles>
 * 
 * @param shadowMode
 * @text Shadows?
 * @type select
 * @option use global Settings
 * @option draw Shadows
 * @option no Shadows
 * @default use global Settings
 */

/*~struct~ClassicMazeParams:
* 
* @param cutOffDeadEnds
* @text Cut off Dead-Ends
* @default 1-2
* @desc You can type a single number or use "1-2" format
* 
* @param additionalTunnels
* @text Additional Tunnels
* @default 2-3
* @desc You can type a single number or use "1-2" format
*/

/*~struct~RoomsAndCorridorsParams:
* 
* @param minRooms
* @text min number of Rooms
* @type Number
* @default 3
* 
* @param maxRooms
* @text max number of Rooms
* @type Number
* @default 4
* 
* @param minRoomWidth
* @text min Width of a Room
* @type Number
* @default 1
* 
* @param maxRoomWidth
* @text max Width of a Room
* @type Number
* @default 2
* 
* @param minRoomHeight
* @text min Height of a Room
* @type Number
* @default 1
* 
* @param maxRoomHeight
* @text max Height of a Room
* @type Number
* @default 2
*/

/*~struct~AssetConfig:
* 
* @param name
* @text name (not used)
* @desc Not used by the Plugin. Only for quality of life.
* 
* @param regionId
* @text Region Id
* @type number
* @default 20
* 
* @param isDifferentTargetRegionId
* @text different Target Region Id?
* @type boolean
* @default false
* 
* @param targetRegionId
* @parent isDifferentTargetRegionId
* @text Target Region Id
* @type number
* 
* @param number
* @text Count
* 
* @param fixedOrVariables
* @parent number
* @text fixed / by Variables?
* @type select
* @option fixed
* @option Variables
* @default fixed
* 
* @param min
* @parent fixedOrVariables
* @text when fixed: min
* @type number
* @default 1
* 
* @param max
* @parent fixedOrVariables
* @text when fixed: max
* @type number
* @default 1
* 
* @param minVariables
* @parent fixedOrVariables
* @text when Variables: min
* @type variable
* 
* @param maxVariables
* @parent fixedOrVariables
* @text when Variables: max
* @type variable
* 
* @param meta
* @type select
* @option count over this map
* @option count over Meta Maze
* @default count over this map
* @desc When the Meta Maze is not active, "count over this map" is used
* 
* @param isImportant
* @text is important?
* @type boolean
* @desc When true, the Plugin uses Trial&Error to ensure this asset spawns
* 
* @param requireSwitch
* @text Switch?
* @type boolean
* @default false
* @desc When enabled, this asset it placed if and only if a given Switch is switched ON.
* 
* @param switchId
* @parent requireSwitch
* @text Switch
* @type switch
*/

/*~struct~FixAutoTiles:
*
* @param mode
* @text Mode
* @type select
* @option Fix all AutoTiles
* @option Fix no AutoTiles
* @option Custom
* @default Fix all AutoTiles
* 
* @param custom
* @text when custom: Types
* 
* @param A1_water
* @parent custom
* @text Water
* @type boolean
* @default true
* 
* @param A1_waterfall
* @parent custom
* @text Waterfall
* @type boolean
* @default true
* 
* @param A2
* @parent custom
* @text Ground (A2)
* @type boolean
* @default true
* 
* @param A3_top
* @parent custom
* @text Building Top (A3)
* @type boolean
* @default true
* 
* @param A3_side
* @parent custom
* @text Building Side (A3)
* @type boolean
* @default true
* 
* @param A4_top
* @parent custom
* @text Wall Top (A4)
* @type boolean
* @default true
* 
* @param A4_side
* @parent custom
* @text Wall Side (A4)
* @type boolean
* @default true
* 
* @param layers
* @text when custom: Layers
* 
* @param layer1
* @parent layers
* @text 1 (Lower)
* @type boolean
* @default true
* 
* @param layer2
* @parent layers
* @text 2
* @type boolean
* @default true
* 
* @param layer3
* @parent layers
* @text 3
* @type boolean
* @default true
* 
* @param layer4
* @parent layers
* @text 4 (Upper)
* @type boolean
* @default true
*/


var MK = MK || { };

(function(){const _0x4ec028=(_0x203d1a,_0x24c408)=>{if(!_0x203d1a)RandomMaps['reject']('The\x20Plugin\x20\x22%1\x22\x20is\x20missing.\x20Please\x20add\x20it\x20to\x20the\x20Plugin\x20Manager.'['format'](_0x24c408));};_0x4ec028(MK['generateSeed'],'MK_RNGMaps_Core');const _0x4fe603=_0x4de535=>{if(typeof _0x4de535=='string'&&_0x4de535['split']('-')['length']==0x2)return[Number(_0x4de535['split']('-')[0x0]),Number(_0x4de535['split']('-')[0x1])];if(Number(_0x4de535)||Number(_0x4de535)===0x0)return Number(_0x4de535);},_0x59cb87=(_0x936d33,_0x3b19b2,_0x105063)=>typeof _0x105063=='function'?RandomMaps['times'](_0x936d33)['map'](_0x429fb=>RandomMaps['times'](_0x3b19b2)['map'](_0x1cc4ab=>_0x105063(_0x429fb,_0x1cc4ab))):RandomMaps['times'](_0x936d33)['map'](()=>RandomMaps['times'](_0x3b19b2)['map'](()=>_0x105063||0x0)),_0x55d5d8=RandomMaps['RegionIds'],_0x43e713=(_0x1e7db7,_0x27b120,_0x59721c,_0x4f0a58,_0xe4d68b)=>(_0x59721c*_0xe4d68b+_0x27b120)*_0x4f0a58+_0x1e7db7,_0x5cfd4e=(_0x1fafcc,_0x353194,_0x42e8e9,_0x262aac)=>_0x1fafcc['data'][_0x43e713(_0x353194,_0x42e8e9,_0x262aac,_0x1fafcc['width'],_0x1fafcc['height'])],_0x2868e5=(_0x17963b,_0x5e9fbd,_0x5f2b4e)=>RandomMaps['times'](0x6)['map'](_0x2b1ad5=>_0x5cfd4e(_0x17963b,_0x5e9fbd,_0x5f2b4e,_0x2b1ad5)),_0x350ff9=(_0x337396,_0x1b343c,_0x2a4587,_0x5a43a5,_0x3d62c3)=>_0x337396['data'][_0x43e713(_0x1b343c,_0x2a4587,_0x5a43a5,_0x337396['width'],_0x337396['height'])]=_0x3d62c3,_0x13f221=(_0x436e61,_0x22879d,_0x2b063e,_0x3fe3df)=>RandomMaps['times'](0x4)['forEach'](_0x4ef29e=>_0x350ff9(_0x436e61,_0x22879d,_0x2b063e,_0x4ef29e,_0x3fe3df[_0x4ef29e])),_0x2cf4f2=(_0x3c3090,_0xd6213f,_0x3df369)=>_0x5cfd4e(_0x3c3090,_0xd6213f,_0x3df369,0x5),_0x80f7be=(_0x329eb8,_0x2e12f8,_0x44590e)=>_0x350ff9(_0x329eb8,_0x2e12f8,_0x44590e,0x5,0x0),_0x3d0916=(_0x5130b4,_0x4e6dda,_0x3afb74)=>[0x0,0x1,0x2,0x3,0x5]['every'](_0x2b9237=>_0x5cfd4e(_0x5130b4,_0x4e6dda,_0x3afb74,_0x2b9237)==0x0);function _0x14b4b2(_0x4f01b9,_0x484cca,_0x407cc5){return _0x23003a(_0x484cca,_0x407cc5,_0x4f01b9['length'],_0x4f01b9[0x0]?_0x4f01b9[0x0]['length']:0x0);}function _0x23003a(_0x4c2f8f,_0x54d9e6,_0x5f00d8,_0x5bb575){return 0x0<=_0x4c2f8f&&_0x4c2f8f<_0x5f00d8&&0x0<=_0x54d9e6&&_0x54d9e6<_0x5bb575;}RandomMaps['generateWithSnippets']=function(_0x4e2ff3,_0x422062,_0x15d7bc){const _0x743fd3=LoadAdditionalMaps['getByFilter'](_0x556ee3=>/^snippets\d?$/i['test'](_0x556ee3));_0x6bf7e(_0x743fd3);const _0x46df39=Math['floor']((_0x743fd3[0x0]['width']-0x5)/0x4),_0x3db87e=Math['floor']((_0x743fd3[0x0]['height']-0x5)/0x4),_0x538206=Number(_0x422062['borderWidth'])||0x0,_0x526d88=(Number(_0x422062['width'])||0x6)['clamp'](0x3,0x14),_0x1f3033=(Number(_0x422062['height'])||0x6)['clamp'](0x3,0x14),_0x6faf04=_0x65ed6f(_0x422062,_0x526d88,_0x1f3033,_0x15d7bc);_0xd9688a(_0x4e2ff3,_0x526d88*_0x46df39+0x2*_0x538206,_0x1f3033*_0x3db87e+0x2*_0x538206),_0x4df29c(_0x6faf04,_0x422062,_0x15d7bc),_0x46a34a(_0x6faf04),_0x54c664(_0x4e2ff3,_0x6faf04,_0x538206),_0x417575(_0x4e2ff3,Number(_0x422062['scale'])||0x1,Number(_0x422062['minValue'])||0.6),_0x57fea7(_0x4e2ff3,_0x422062,_0x15d7bc),_0x11b161(_0x4e2ff3,_0x422062),_0x53974f(_0x4e2ff3,_0x422062),_0x3af15d(_0x4e2ff3,_0x15d7bc),_0x42931b(_0x4e2ff3);};function _0x6bf7e(_0x255d38){!_0x255d38['length']&&RandomMaps['reject']('You\x20don\x27t\x20have\x20any\x20Snippets\x20Map.'),_0x255d38['find'](_0xf39a82=>_0xf39a82['width']!=_0x255d38[0x0]['width']||_0xf39a82['height']!=_0x255d38[0x0]['height'])&&RandomMaps['reject']('Your\x20Snippets\x20Maps\x20have\x20different\x20sizes\x20which\x20is\x20not\x20allowed.');}function _0xd9688a(_0x4ace16,_0x363e65,_0x4e8c6d){const _0x5452a7=_0x2868e5(_0x4ace16,0x0,0x0);_0x4ace16['width']=_0x363e65,_0x4ace16['height']=_0x4e8c6d,RandomMaps['times'](_0x363e65)['forEach'](_0x50ad80=>RandomMaps['times'](_0x4e8c6d)['forEach'](_0x2b34fb=>_0x13f221(_0x4ace16,_0x50ad80,_0x2b34fb,_0x5452a7)));}function _0x65ed6f(_0x29ad39,_0x1efa82,_0x8bd537,_0x50360b){if('Maze'==_0x29ad39['algorithm'])return _0x4645b4(RandomMaps['parameterStructure'](_0x29ad39['classicMazeParams'],'Classic\x20Maze\x20Parameters\x20in\x20Template\x20%1'['format'](_0x29ad39['name'])),_0x1efa82,_0x8bd537);if('Random\x20Walk'==_0x29ad39['algorithm'])return _0x45ecfa(_0x1efa82,_0x8bd537,_0x50360b);if('Rooms\x20&\x20Corridors'==_0x29ad39['algorithm'])return _0x5b302a(RandomMaps['parameterStructure'](_0x29ad39['roomsAndCorridorsParams'],'Rooms&Corridors\x20Parameters\x20in\x20Template\x20%1'['format'](_0x29ad39['name'])),_0x1efa82,_0x8bd537);RandomMaps['reject']('Template\x20\x22%1\x22\x20is\x20corrupted.'['format'](_0x29ad39&&_0x29ad39['name']));}function _0x4645b4(_0x21b6cb,_0x53295,_0x4ae8f4){const _0xb2b9aa=_0x4fe603(_0x21b6cb['cutOffDeadEnds']||'1-2')||0x0,_0x2adb3d=_0x4fe603(_0x21b6cb['additionalTunnels']||'2-3')||0x0,_0x118ca4=MK['mazeAlgorithms']['prims'](_0x53295,_0x4ae8f4);return MK['mazeAlgorithms']['cutOffDeadEnds'](_0x118ca4,_0xb2b9aa),MK['mazeAlgorithms']['additionalTunnels'](_0x118ca4,_0x2adb3d),_0x118ca4;}function _0x45ecfa(_0x47ccf7,_0x1df9a3,_0x1de21d){const _0x5d9630=_0x59cb87(_0x47ccf7,_0x1df9a3);if(_0x1de21d['top']&&_0x1de21d['bottom']){const _0x32a9d6=MK['rng']['pickRandom'](['top','bottom']),_0x1c1d82=_0x28bcc9(_0x32a9d6),_0x11b9db=_0xb4156d(_0x47ccf7,_0x1df9a3,_0x32a9d6,_0x1c1d82);_0x11b9db['forEach'](({x:_0x1dbe6e,y:_0x6d044f})=>_0x5d9630[_0x1dbe6e][_0x6d044f]=!![]);}if(_0x1de21d['left']&&_0x1de21d['right']){const _0x47b9ba=MK['rng']['pickRandom'](['left','right']),_0x1b77b6=_0x28bcc9(_0x47b9ba),_0x363869=_0xb4156d(_0x47ccf7,_0x1df9a3,_0x47b9ba,_0x1b77b6);_0x363869['forEach'](({x:_0x20149f,y:_0x1029bf})=>_0x5d9630[_0x20149f][_0x1029bf]=!![]);}const _0x2ea3c2=!_0x5d9630['some'](_0xa6e74=>_0xa6e74['some'](Boolean));if(_0x2ea3c2){const _0x16ca3b=MK['rng']['pickRandom'](['top','left','right','bottom']),_0x351c39=_0x28bcc9(_0x16ca3b),_0x3db389=_0xb4156d(_0x47ccf7,_0x1df9a3,_0x16ca3b,_0x351c39);_0x3db389['forEach'](({x:_0x190e8a,y:_0x563bf8})=>_0x5d9630[_0x190e8a][_0x563bf8]=!![]);}return _0xde6f85(_0x5d9630);}function _0xb4156d(_0x5d3b36,_0x239fb8,_0x557f71,_0x13b3ab){const _0x118b78=_0x59cb87(_0x5d3b36,_0x239fb8),_0x2ce92b=_0x59cb87(_0x5d3b36,_0x239fb8),_0x1cdedc='left'==_0x557f71?0x0:'right'==_0x557f71?_0x5d3b36-0x1:Math['floor'](_0x5d3b36/0x2),_0x3ff97e='top'==_0x557f71?0x0:'bottom'==_0x557f71?_0x239fb8-0x1:Math['floor'](_0x239fb8/0x2);_0x118b78[_0x1cdedc][_0x3ff97e]=!![],_0x2ce92b[_0x1cdedc][_0x3ff97e]=!![];const _0x153034=[{'x':_0x1cdedc,'y':_0x3ff97e}];while(!![]){const _0x1fec24=_0x153034[_0x153034['length']-0x1]['x'],_0x355b3f=_0x153034[_0x153034['length']-0x1]['y'];_0x118b78[_0x1fec24][_0x355b3f]=!![],_0x2ce92b[_0x1fec24][_0x355b3f]=!![];if('top'==_0x13b3ab&&_0x355b3f==0x0)break;if('left'==_0x13b3ab&&_0x1fec24==0x0)break;if('right'==_0x13b3ab&&_0x1fec24==_0x5d3b36-0x1)break;if('bottom'==_0x13b3ab&&_0x355b3f==_0x239fb8-0x1)break;const _0x4db223=[{'x':_0x1fec24,'y':_0x355b3f-0x1},{'x':_0x1fec24-0x1,'y':_0x355b3f},{'x':_0x1fec24+0x1,'y':_0x355b3f},{'x':_0x1fec24,'y':_0x355b3f+0x1}]['filter'](({x:_0x36b936,y:_0x540c83})=>_0x14b4b2(_0x118b78,_0x36b936,_0x540c83))['filter'](({x:_0x3e3f90,y:_0x33d1eb})=>!_0x118b78[_0x3e3f90][_0x33d1eb])['filter'](({x:_0x2984e0,y:_0x5b133d})=>!_0x2ce92b[_0x2984e0][_0x5b133d]);if(_0x4db223['length']){const _0x12d225=MK['rng']['pickRandom'](_0x4db223);_0x153034['push'](_0x12d225);}else _0x153034['pop']();}return RandomMaps['iterateMatrix'](_0x5d3b36,_0x239fb8)['filter'](({x:_0x448c58,y:_0x3b2808})=>_0x118b78[_0x448c58][_0x3b2808]);}function _0xde6f85(_0x41f911){const _0x5e2c22=_0x41f911['length'],_0x1bcbe9=_0x41f911[0x0]['length'],_0x49e08a=_0x59cb87(_0x5e2c22,_0x1bcbe9),_0xb18f05=(_0x4401c9,_0x2c1a63)=>0x0<=_0x4401c9&&_0x4401c9<_0x5e2c22&&0x0<=_0x2c1a63&&_0x2c1a63<_0x1bcbe9,_0x550f40=(_0x169376,_0x3760c1)=>_0xb18f05(_0x169376,_0x3760c1)&&_0x41f911[_0x169376][_0x3760c1],_0x21743f=(_0x540934,_0xb1ae3)=>_0x550f40(_0x540934+0x1,_0xb1ae3)&&_0x550f40(_0x540934+0x1,_0xb1ae3+0x1)&&_0x550f40(_0x540934,_0xb1ae3+0x1),_0x404a7b=(_0x326e90,_0x284d14)=>_0x550f40(_0x326e90-0x1,_0x284d14)&&_0x550f40(_0x326e90-0x1,_0x284d14+0x1)&&_0x550f40(_0x326e90,_0x284d14+0x1),_0x8a6f83=(_0x47a850,_0x36747e)=>_0x550f40(_0x47a850-0x1,_0x36747e)&&_0x550f40(_0x47a850-0x1,_0x36747e-0x1)&&_0x550f40(_0x47a850,_0x36747e-0x1),_0x28506f=(_0x38dda8,_0x5e4ea3)=>_0x550f40(_0x38dda8,_0x5e4ea3-0x1)&&_0x550f40(_0x38dda8+0x1,_0x5e4ea3-0x1)&&_0x550f40(_0x38dda8+0x1,_0x5e4ea3),_0xf89757=(_0x1ccd3e,_0x506749)=>_0x21743f(_0x1ccd3e,_0x506749)||_0x404a7b(_0x1ccd3e,_0x506749)||_0x28506f(_0x1ccd3e,_0x506749)||_0x8a6f83(_0x1ccd3e,_0x506749);for(let _0x4d5598=0x0;_0x4d5598<_0x5e2c22;_0x4d5598++){for(let _0x1a6133=0x0;_0x1a6133<_0x1bcbe9;_0x1a6133++){if(!_0x41f911[_0x4d5598][_0x1a6133]){_0x49e08a[_0x4d5598][_0x1a6133]=0x0;continue;}let _0xfc41ca=0x0;if(!_0xf89757(_0x4d5598,_0x1a6133)){if(_0x550f40(_0x4d5598,_0x1a6133-0x1))_0xfc41ca=_0xfc41ca|0x1;if(_0x550f40(_0x4d5598+0x1,_0x1a6133))_0xfc41ca=_0xfc41ca|0x2;if(_0x550f40(_0x4d5598,_0x1a6133+0x1))_0xfc41ca=_0xfc41ca|0x4;if(_0x550f40(_0x4d5598-0x1,_0x1a6133))_0xfc41ca=_0xfc41ca|0x8;}else{_0x21743f(_0x4d5598,_0x1a6133)&&(_0xfc41ca=_0xfc41ca|0x1);_0x404a7b(_0x4d5598,_0x1a6133)&&(_0xfc41ca=_0xfc41ca|0x2);_0x8a6f83(_0x4d5598,_0x1a6133)&&(_0xfc41ca=_0xfc41ca|0x4);_0x28506f(_0x4d5598,_0x1a6133)&&(_0xfc41ca=_0xfc41ca|0x8);const _0x50b4bd=[undefined,0x0,0x2,0x1,0x8,0xe,0x5,0xc,0x6,0x3,0xb,0xd,0x7,0xa,0x9,0x4];_0xfc41ca=_0x50b4bd[_0xfc41ca]!==undefined?_0x50b4bd[_0xfc41ca]:_0xfc41ca;if(_0xfc41ca==0x0&&_0x550f40(_0x4d5598,_0x1a6133-0x1)&&_0x550f40(_0x4d5598-0x1,_0x1a6133))_0xfc41ca=0x10+0x3;else{if(_0xfc41ca==0x2&&_0x550f40(_0x4d5598,_0x1a6133-0x1)&&_0x550f40(_0x4d5598+0x1,_0x1a6133))_0xfc41ca=0x10+0x7;else{if(_0xfc41ca==0x6&&_0x550f40(_0x4d5598,_0x1a6133+0x1)&&_0x550f40(_0x4d5598-0x1,_0x1a6133))_0xfc41ca=0x10+0xf;else{if(_0xfc41ca==0x8&&_0x550f40(_0x4d5598,_0x1a6133+0x1)&&_0x550f40(_0x4d5598+0x1,_0x1a6133))_0xfc41ca=0x10+0xb;else{if(_0xfc41ca==0x0&&_0x550f40(_0x4d5598,_0x1a6133-0x1))_0xfc41ca=0x10+0x0;else{if(_0xfc41ca==0x1&&_0x550f40(_0x4d5598,_0x1a6133-0x1))_0xfc41ca=0x10+0x1;else{if(_0xfc41ca==0x2&&_0x550f40(_0x4d5598,_0x1a6133-0x1))_0xfc41ca=0x10+0x2;else{if(_0xfc41ca==0x6&&_0x550f40(_0x4d5598,_0x1a6133+0x1))_0xfc41ca=0x10+0x4;else{if(_0xfc41ca==0x7&&_0x550f40(_0x4d5598,_0x1a6133+0x1))_0xfc41ca=0x10+0x5;else{if(_0xfc41ca==0x8&&_0x550f40(_0x4d5598,_0x1a6133+0x1))_0xfc41ca=0x10+0x6;else{if(_0xfc41ca==0x0&&_0x550f40(_0x4d5598-0x1,_0x1a6133))_0xfc41ca=0x10+0x8;else{if(_0xfc41ca==0x2&&_0x550f40(_0x4d5598+0x1,_0x1a6133))_0xfc41ca=0x10+0x9;else{if(_0xfc41ca==0x3&&_0x550f40(_0x4d5598-0x1,_0x1a6133))_0xfc41ca=0x10+0xa;else{if(_0xfc41ca==0x6&&_0x550f40(_0x4d5598-0x1,_0x1a6133))_0xfc41ca=0x10+0xc;else{if(_0xfc41ca==0x8&&_0x550f40(_0x4d5598+0x1,_0x1a6133))_0xfc41ca=0x10+0xd;else{if(_0xfc41ca==0x5&&_0x550f40(_0x4d5598+0x1,_0x1a6133))_0xfc41ca=0x10+0xe;}}}}}}}}}}}}}}}_0xfc41ca+=0x10;}_0x49e08a[_0x4d5598][_0x1a6133]=_0xfc41ca;}}return _0x49e08a;}function _0x28bcc9(_0xe50d9f){return{'top':'bottom','left':'right','right':'left','bottom':'top'}[_0xe50d9f];}function _0x5b302a(_0x21085c,_0x5731ad,_0x1e2b98){const _0x444e38=MK['rng']['randomInteger'](Number(_0x21085c['minRooms']),Number(_0x21085c['maxRooms'])),_0xd45c22=(_0x2f56b7,_0x5c7fdf)=>!(_0x5c7fdf['x']>=_0x2f56b7['x']+_0x2f56b7['width']||_0x2f56b7['x']>=_0x5c7fdf['x']+_0x5c7fdf['width']||_0x5c7fdf['y']>=_0x2f56b7['y']+_0x2f56b7['height']||_0x2f56b7['y']>=_0x5c7fdf['y']+_0x5c7fdf['height']),_0x385283=[];let _0x352b60=0x0;while(_0x385283['length']<_0x444e38&&_0x352b60<0x270f){const _0x1ca2d1={};_0x1ca2d1['width']=MK['rng']['randomInteger'](Number(_0x21085c['minRoomWidth']),Number(_0x21085c['maxRoomWidth'])),_0x1ca2d1['height']=MK['rng']['randomInteger'](Number(_0x21085c['minRoomHeight']),Number(_0x21085c['maxRoomHeight'])),_0x1ca2d1['width']==0x1&&_0x1ca2d1['height']==0x1&&(_0x1ca2d1['width']=0x2,_0x1ca2d1['height']=0x2),_0x1ca2d1['x']=MK['rng']['randomInteger'](0x1,_0x5731ad-_0x1ca2d1['width'])-0x1,_0x1ca2d1['y']=MK['rng']['randomInteger'](0x1,_0x1e2b98-_0x1ca2d1['height'])-0x1,_0x385283['some'](_0x41e965=>_0xd45c22(_0x1ca2d1,_0x41e965))?_0x385283['shift']():_0x385283['push'](_0x1ca2d1),_0x352b60++;}_0x385283['length']<0x2&&(_0x385283['length']=0x0,_0x385283[0x0]={'x':0x0,'y':0x0,'width':0x2,'height':0x2},_0x385283[0x1]={'x':_0x5731ad-0x2,'y':0x0,'width':0x2,'height':0x2},_0x385283[0x2]={'x':0x0,'y':_0x1e2b98-0x2,'width':0x2,'height':0x2},_0x385283[0x3]={'x':_0x5731ad-0x2,'y':_0x1e2b98-0x2,'width':0x2,'height':0x2});const _0x5ec27a=_0x59cb87(_0x5731ad,_0x1e2b98,0x0);_0x385283['forEach'](_0xb582d2=>{if(_0xb582d2['width']==0x1)RandomMaps['times'](_0xb582d2['height'])['forEach'](_0xec4fe2=>_0x5ec27a[_0xb582d2['x']][_0xb582d2['y']+_0xec4fe2]=0x5),_0x5ec27a[_0xb582d2['x']][_0xb582d2['y']]=0x4,_0x5ec27a[_0xb582d2['x']][_0xb582d2['y']+_0xb582d2['height']-0x1]=0x1;else _0xb582d2['height']==0x1?(RandomMaps['times'](_0xb582d2['width'])['forEach'](_0x139d81=>_0x5ec27a[_0xb582d2['x']+_0x139d81][_0xb582d2['y']]=0xa),_0x5ec27a[_0xb582d2['x']][_0xb582d2['y']]=0x2,_0x5ec27a[_0xb582d2['x']+_0xb582d2['width']-0x1][_0xb582d2['y']]=0x8):(RandomMaps['times'](_0xb582d2['width'])['forEach'](_0x2cbfdf=>RandomMaps['times'](_0xb582d2['height'])['forEach'](_0x5b6759=>_0x5ec27a[_0xb582d2['x']+_0x2cbfdf][_0xb582d2['y']+_0x5b6759]=0x10+0x4)),RandomMaps['times'](_0xb582d2['width'])['forEach'](_0x149018=>_0x5ec27a[_0xb582d2['x']+_0x149018][_0xb582d2['y']]=0x10+0x1),RandomMaps['times'](_0xb582d2['width'])['forEach'](_0x4818c3=>_0x5ec27a[_0xb582d2['x']+_0x4818c3][_0xb582d2['y']+_0xb582d2['height']-0x1]=0x10+0x7),RandomMaps['times'](_0xb582d2['height'])['forEach'](_0x24fd09=>_0x5ec27a[_0xb582d2['x']][_0xb582d2['y']+_0x24fd09]=0x10+0x3),RandomMaps['times'](_0xb582d2['height'])['forEach'](_0x2978b5=>_0x5ec27a[_0xb582d2['x']+_0xb582d2['width']-0x1][_0xb582d2['y']+_0x2978b5]=0x10+0x5),_0x5ec27a[_0xb582d2['x']][_0xb582d2['y']]=0x10,_0x5ec27a[_0xb582d2['x']+_0xb582d2['width']-0x1][_0xb582d2['y']]=0x10+0x2,_0x5ec27a[_0xb582d2['x']][_0xb582d2['y']+_0xb582d2['height']-0x1]=0x10+0x6,_0x5ec27a[_0xb582d2['x']+_0xb582d2['width']-0x1][_0xb582d2['y']+_0xb582d2['height']-0x1]=0x10+0x8);});const _0x4c3c06=_0x385283['map'](_0x2a52ee=>({'x':_0x2a52ee['x']+Math['floor']((_0x2a52ee['width']-0x1)/0x2),'y':_0x2a52ee['y']+Math['floor']((_0x2a52ee['height']-0x1)/0x2)})),_0x4283d9=MK['kruskalMST'](_0x4c3c06);return _0x4283d9['forEach'](({start:_0x612573,dest:_0x11fe1c})=>{if(_0x612573['x']==_0x11fe1c['x']){const _0x81624e=_0x612573['x'],_0x729e4a=Math['min'](_0x612573['y'],_0x11fe1c['y']),_0x3ddecd=Math['max'](_0x612573['y'],_0x11fe1c['y']);RandomMaps['times'](_0x729e4a,_0x3ddecd)['forEach'](_0x137695=>MK['buildTunnelPair'](_0x5ec27a,_0x81624e,_0x137695,'bottom'));}else{if(_0x612573['y']==_0x11fe1c['y']){const _0xdcd022=_0x612573['y'],_0x37605d=Math['min'](_0x612573['x'],_0x11fe1c['x']),_0x362fe4=Math['max'](_0x612573['x'],_0x11fe1c['x']);RandomMaps['times'](_0x37605d,_0x362fe4)['forEach'](_0x159595=>MK['buildTunnelPair'](_0x5ec27a,_0x159595,_0xdcd022,'right'));}else{const _0x398059=_0x612573['y'],_0x580bc5=Math['min'](_0x612573['x'],_0x11fe1c['x']),_0x428bd0=Math['max'](_0x612573['x'],_0x11fe1c['x']);RandomMaps['times'](_0x580bc5,_0x428bd0)['forEach'](_0x35876f=>MK['buildTunnelPair'](_0x5ec27a,_0x35876f,_0x398059,'right'));const _0x5ebad8=_0x11fe1c['x'],_0xd39d25=Math['min'](_0x612573['y'],_0x11fe1c['y']),_0x2ecd0b=Math['max'](_0x612573['y'],_0x11fe1c['y']);RandomMaps['times'](_0xd39d25,_0x2ecd0b)['forEach'](_0xbb5a94=>MK['buildTunnelPair'](_0x5ec27a,_0x5ebad8,_0xbb5a94,'bottom'));}}}),_0x5ec27a;}function _0x4df29c(_0x167f62,_0x1b77f3,_0xf30600){'Paths\x20to\x20Map\x27s\x20End'==_0x1b77f3['exitMode']&&(_0xf30600['top']&&_0x3a9959(_0x167f62,'top'),_0xf30600['left']&&_0x3a9959(_0x167f62,'left'),_0xf30600['right']&&_0x3a9959(_0x167f62,'right'),_0xf30600['bottom']&&_0x3a9959(_0x167f62,'bottom'));}function _0x3a9959(_0xb8b1dc,_0x5a28e5){const _0x38238b=_0xb8b1dc['length'],_0xe36813=_0xb8b1dc[0x0]['length'];let _0x250dd4;'top'==_0x5a28e5&&(_0x250dd4=RandomMaps['times'](_0x38238b)['filter'](_0x36714d=>_0xb8b1dc[_0x36714d][0x0])['map'](_0x278fdb=>({'x':_0x278fdb,'y':0x0})));'left'==_0x5a28e5&&(_0x250dd4=RandomMaps['times'](_0xe36813)['filter'](_0x4ae6b2=>_0xb8b1dc[0x0][_0x4ae6b2])['map'](_0x76e65a=>({'x':0x0,'y':_0x76e65a})));'right'==_0x5a28e5&&(_0x250dd4=RandomMaps['times'](_0xe36813)['filter'](_0x36f6b7=>_0xb8b1dc[_0x38238b-0x1][_0x36f6b7])['map'](_0x3179c0=>({'x':_0x38238b-0x1,'y':_0x3179c0})));'bottom'==_0x5a28e5&&(_0x250dd4=RandomMaps['times'](_0x38238b)['filter'](_0x28f071=>_0xb8b1dc[_0x28f071][_0xe36813-0x1])['map'](_0x344f50=>({'x':_0x344f50,'y':_0xe36813-0x1})));const _0x39626b=MK['rng']['pickRandom'](_0x250dd4);buildTunnelPair(_0xb8b1dc,_0x39626b['x'],_0x39626b['y'],_0x5a28e5);}function _0x46a34a(_0x578d6d){const _0x13c7f0=[0x0,0xc,0xd,0x9,0xe,0x4,0x1,0x5,0xf,0xb,0x8,0xa,0x3,0x7,0x2,0x6],_0x249a92=_0x578d6d['length'],_0x3c1339=_0x578d6d[0x0]['length'];RandomMaps['iterateMatrix'](_0x249a92,_0x3c1339)['filter'](({x:_0x4b3050,y:_0xbbeea})=>_0x578d6d[_0x4b3050][_0xbbeea]<_0x13c7f0['length'])['forEach'](({x:_0x1abeb0,y:_0x29473e})=>_0x578d6d[_0x1abeb0][_0x29473e]=_0x13c7f0[_0x578d6d[_0x1abeb0][_0x29473e]]);}function _0x54c664(_0x4e32f0,_0x165526,_0x1d69e0){const _0x414e40=_0x165526['length'],_0x1532db=_0x165526[0x0]['length'],_0x38486b=LoadAdditionalMaps['getByFilter'](_0x31ba7d=>/^snippets\d?$/i['test'](_0x31ba7d)),_0x409470=LoadAdditionalMaps['getByFilter'](_0x558733=>/^snippetsArea\d?$/i['test'](_0x558733)),_0x41707b=LoadAdditionalMaps['getByFilter'](_0x468332=>/^snippetsTransitions\d?$/i['test'](_0x468332)),_0x2debc9=LoadAdditionalMaps['getByFilter'](_0x25b1c2=>/^snippetsOuter\d?$/i['test'](_0x25b1c2)),_0x520d47=Math['floor']((_0x38486b[0x0]['width']-0x5)/0x4),_0x317250=Math['floor']((_0x38486b[0x0]['height']-0x5)/0x4);function _0x27bd87(_0x4703b6,_0x285edb,_0x3dc209){_0x52487b(MK['rng']['pickRandom'](_0x38486b),_0x4703b6,_0x285edb,_0x3dc209,0x4);}function _0x5cb343(_0x2343a2,_0x240c09,_0x4c4f2e){!_0x409470['length']&&RandomMaps['reject']('The\x20chosen\x20algorithm\x20requires\x20to\x20have\x20some\x20snippetsAreas.\x20'+'You\x20either\x20define\x20them,\x20or\x20switch\x20to\x20\x22Imperfect\x20Maze\x22\x20template.'),_0x52487b(MK['rng']['pickRandom'](_0x409470),_0x2343a2-0x10,_0x240c09,_0x4c4f2e,0x3);}function _0x1e38e4(_0x2634be,_0x17dbd1,_0x4fb487){!_0x41707b['length']&&RandomMaps['reject']('The\x20chosen\x20algorithm\x20requires\x20to\x20have\x20some\x20snippetsTransitions.\x20'+'You\x20either\x20define\x20them,\x20or\x20switch\x20to\x20\x22Imperfect\x20Maze\x22\x20template.'),_0x52487b(MK['rng']['pickRandom'](_0x41707b),_0x2634be-0x20,_0x17dbd1,_0x4fb487,0x4);}function _0x597cf1(_0x454516,_0x9e351b,_0x321f6c){if(_0x2debc9['length'])_0x52487b(MK['rng']['pickRandom'](_0x2debc9),_0x454516-0x40,_0x9e351b,_0x321f6c,0x3);}function _0x52487b(_0x219a56,_0x4b1bb1,_0x3ac1b7,_0x31f222,_0x18efc4){const _0x3acebe=_0x4b1bb1%_0x18efc4*(_0x520d47+0x1)+0x1,_0x3a7dd6=Math['floor'](_0x4b1bb1/_0x18efc4)*(_0x317250+0x1)+0x1,_0x75ceae=_0x3ac1b7*_0x520d47+_0x1d69e0,_0x461a23=_0x31f222*_0x317250+_0x1d69e0;MK['copyTiles'](_0x3acebe,_0x3a7dd6,_0x520d47,_0x317250,_0x75ceae,_0x461a23,_0x219a56,_0x4e32f0),MK['cloneEvents'](_0x3acebe,_0x3a7dd6,_0x520d47,_0x317250,_0x75ceae,_0x461a23,_0x219a56,_0x4e32f0);}RandomMaps['iterateMatrix'](_0x414e40,_0x1532db)['forEach'](({x:_0x1e6dd8,y:_0x141322})=>{const _0x1d086d=_0x165526[_0x1e6dd8][_0x141322];if(_0x1d086d<0x10)_0x27bd87(_0x1d086d,_0x1e6dd8,_0x141322);else{if(_0x1d086d<0x20)_0x5cb343(_0x1d086d,_0x1e6dd8,_0x141322);else{if(_0x1d086d<0x30)_0x1e38e4(_0x1d086d,_0x1e6dd8,_0x141322);else{if(_0x1d086d>=0x40)_0x597cf1(_0x1d086d,_0x1e6dd8,_0x141322);}}}});}function _0x57fea7(_0x157748,_0x56ea52,_0x3b7e9d){'from\x20Asset\x20Map'==_0x56ea52['exitMode']&&(_0x3b7e9d['top']&&_0x34c0c9(_0x157748,_0x3b7e9d['mainExitTop'],'top'),_0x3b7e9d['left']&&_0x34c0c9(_0x157748,_0x3b7e9d['mainExitLeft'],'left'),_0x3b7e9d['right']&&_0x34c0c9(_0x157748,_0x3b7e9d['mainExitRight'],'right'),_0x3b7e9d['bottom']&&_0x34c0c9(_0x157748,_0x3b7e9d['mainExitBottom'],'bottom'));}function _0x34c0c9(_0x36d31c,_0x26fc72,_0xe0a85f){const _0x2d357f=_0x31dd87(_0xe0a85f),_0x2e1a08=RandomMaps['iterateMatrix'](_0x36d31c['width'],_0x36d31c['height'])['filter'](({x:_0x42f8e0,y:_0x31ab6c})=>_0x2cf4f2(_0x36d31c,_0x42f8e0,_0x31ab6c)==_0x2d357f);!_0x2e1a08['length']&&RandomMaps['forceRetry'](_0xe0a85f+'\x20Exit');const _0x185c2a=['top','bottom']['includes'](_0xe0a85f)?_0x2e1a08['map'](_0x4c11ec=>_0x4c11ec['y']):_0x2e1a08['map'](_0x2b6e2b=>_0x2b6e2b['x']),_0x394901=['top','left']['includes'](_0xe0a85f)?Math['min'](..._0x185c2a):Math['max'](..._0x185c2a),_0x4ebd9d=['top','bottom']['includes'](_0xe0a85f)?_0x2e1a08['filter'](_0x1b7ae9=>Math['abs'](_0x1b7ae9['y']-_0x394901)<0x5):_0x2e1a08['filter'](_0x3b0a93=>Math['abs'](_0x3b0a93['x']-_0x394901)<0x5),_0x10f5e4=MK['rng']['pickRandom'](_0x4ebd9d);_0x30b05c(_0x36d31c,_0x233743(_0xe0a85f,_0x26fc72),_0x10f5e4['x'],_0x10f5e4['y']);}function _0x233743(_0x413111,_0xf80eb){const _0x4ec29d={'top':_0x55d5d8['northernExit'],'left':_0x55d5d8['westernExit'],'right':_0x55d5d8['easternExit'],'bottom':_0x55d5d8['southernExit']}[_0x413111];return _0xf80eb&&_0xb10439()[_0x4ec29d]?_0x4ec29d:_0x31dd87(_0x413111);}function _0x31dd87(_0x2868c4){return{'top':_0x55d5d8['northernExit'],'left':_0x55d5d8['westernExit'],'right':_0x55d5d8['easternExit'],'bottom':_0x55d5d8['southernExit']}[_0x2868c4];}function _0x3af15d(_0x358db5,_0x516747){_0x516747['top']&&_0x1cdd63(_0x358db5,'top',_0x55d5d8['northernSpawnLocation']),_0x516747['left']&&_0x1cdd63(_0x358db5,'left',_0x55d5d8['westernSpawnLocation']),_0x516747['right']&&_0x1cdd63(_0x358db5,'right',_0x55d5d8['easternSpawnLocation']),_0x516747['bottom']&&_0x1cdd63(_0x358db5,'bottom',_0x55d5d8['southernSpawnLocation']);}function _0x1cdd63(_0xec4659,_0x1317e9,_0x44379a){const _0x3a14e3=RandomMaps['iterateMatrix'](_0xec4659['width'],_0xec4659['height'])['filter'](({x:_0x64cd2e,y:_0x45ef3a})=>_0x2cf4f2(_0xec4659,_0x64cd2e,_0x45ef3a)==_0x44379a);if(_0x3a14e3['length']){const _0x5e7c86=['top','bottom']['includes'](_0x1317e9)?_0x3a14e3['map'](_0x62640d=>_0x62640d['y']):_0x3a14e3['map'](_0x3b2b19=>_0x3b2b19['x']),_0x441a0e=['top','left']['includes'](_0x1317e9)?Math['min'](..._0x5e7c86):Math['max'](..._0x5e7c86),_0x12b8c1=['top','bottom']['includes'](_0x1317e9)?_0x3a14e3['filter'](_0x26cf80=>Math['abs'](_0x26cf80['y']-_0x441a0e)<0x5):_0x3a14e3['filter'](_0x57a804=>Math['abs'](_0x57a804['x']-_0x441a0e)<0x5),_0x3011ee=MK['rng']['pickRandom'](_0x12b8c1);RandomMaps['_setSpawnLocation'](_0x1317e9,_0x3011ee);}}function _0x417575(_0x2c6678,_0x1d9b97,_0x4ca6a9){const _0x1f5971=LoadAdditionalMaps['get']('shadings');if(!_0x1f5971)return;RandomMaps['times'](0x0,_0x2c6678['height'])['filter'](_0x5811ef=>!_0x3d0916(_0x1f5971,0x0,_0x5811ef))['forEach'](_0x2e3d01=>{const _0x2409b5=_0x2868e5(_0x1f5971,0x0,_0x2e3d01),_0x4df4df=_0x2868e5(_0x1f5971,0x2,_0x2e3d01),_0x497dec=(_0x21038d,_0x259d47)=>Tilemap['isSameKindTile'](_0x5cfd4e(_0x2c6678,_0x21038d,_0x259d47,0x0),_0x2409b5[0x0])&&Tilemap['isSameKindTile'](_0x5cfd4e(_0x2c6678,_0x21038d,_0x259d47,0x1),_0x2409b5[0x1]),_0x9db4ba=RandomMaps['generateNoiseMap'](_0x2c6678['width'],_0x2c6678['height'],_0x1d9b97);RandomMaps['iterateMatrix'](_0x2c6678['width'],_0x2c6678['height'])['filter'](({x:_0x2957e2,y:_0x5a9484})=>_0x9db4ba[_0x2957e2][_0x5a9484]>_0x4ca6a9)['filter'](({x:_0x3afed6,y:_0x198a27})=>_0x497dec(_0x3afed6,_0x198a27))['forEach'](({x:_0x20d68f,y:_0x360a04})=>{_0x350ff9(_0x2c6678,_0x20d68f,_0x360a04,0x0,_0x4df4df[0x0]),_0x350ff9(_0x2c6678,_0x20d68f,_0x360a04,0x1,_0x4df4df[0x1]);});});}function _0x11b161(_0x594ae5,_0xa2aeac){const _0x3adfcd=JsonEx['parse'](_0xa2aeac['specialAssets']||'[\x20]')['map'](JSON['parse'])['map'](_0x20ddf7=>({'regionId':Number(_0x20ddf7['regionId']),'targetRegionId':'true'==_0x20ddf7['isDifferentTargetRegionId']&&Number(_0x20ddf7['targetRegionId']),'min':'fixed'==_0x20ddf7['fixedOrVariables']?Number(_0x20ddf7['min']):$gameVariables['value'](Number(_0x20ddf7['minVariables'])),'max':'fixed'==_0x20ddf7['fixedOrVariables']?Number(_0x20ddf7['max']):$gameVariables['value'](Number(_0x20ddf7['maxVariables'])),'isMeta':'count\x20over\x20Meta\x20Maze'==_0x20ddf7['meta'],'isImportant':'true'==_0x20ddf7['isImportant'],'switchId':'true'==_0x20ddf7['requireSwitch']&&Number(switchId)}));_0x3adfcd['filter'](_0x27effb=>!_0x27effb['switchId']||$gameSwitches['value'](_0x27effb['switchId']))['filter'](_0x349f0e=>_0xb10439()[_0x349f0e['regionId']])['forEach'](_0x4f5f5f=>{const _0xb8bd03=_0x4f5f5f['isMeta']?MK['calculateXTimesMeta'](_0x4f5f5f['regionId'],_0x4f5f5f['min'],_0x4f5f5f['max']):MK['rng']['randomInteger'](_0x4f5f5f['min'],_0x4f5f5f['max']);RandomMaps['times'](_0xb8bd03)['forEach'](()=>_0x10164c(_0x594ae5,_0x4f5f5f['regionId'],_0x4f5f5f['targetRegionId'],_0x4f5f5f['isImportant']));});const _0x5dde04=_0x3adfcd['map'](_0xd75e21=>_0xd75e21['regionId'])['concat'](_0x3adfcd['map'](_0x13c4af=>_0x13c4af['targetRegionId']))['filter'](Boolean);RandomMaps['iterateMatrix'](_0x594ae5['width'],_0x594ae5['height'])['filter'](({x:_0x10e419,y:_0x12745a})=>_0x5dde04['includes'](_0x2cf4f2(_0x594ae5,_0x10e419,_0x12745a)))['forEach'](({x:_0x35ef9d,y:_0x7ca12})=>_0x80f7be(_0x594ae5,_0x35ef9d,_0x7ca12));}function _0x10164c(_0x4d0ca6,_0x56024e,_0x120b24,_0x2c8ab0){const _0x2396d5=RandomMaps['iterateMatrix'](_0x4d0ca6['width'],_0x4d0ca6['height'])['filter'](({x:_0x51d335,y:_0x19dd7f})=>_0x2cf4f2(_0x4d0ca6,_0x51d335,_0x19dd7f)==(_0x120b24||_0x56024e));if(_0x2396d5['length']){const _0x3ac972=MK['rng']['pickRandom'](_0x2396d5);_0x30b05c(_0x4d0ca6,_0x56024e,_0x3ac972['x'],_0x3ac972['y']);}else _0x2c8ab0&&RandomMaps['forceRetry']('Asset\x20'+_0x56024e);}function _0x53974f(_0x432cc8,_0x524c51){JSON['parse'](_0x524c51['commonAssetIds']||'[\x20]')['map'](Number)['forEach'](_0x58c640=>{RandomMaps['iterateMatrix'](_0x432cc8['width'],_0x432cc8['height'])['forEach'](({x:_0x54fe0e,y:_0x1edccd})=>_0x2cf4f2(_0x432cc8,_0x54fe0e,_0x1edccd)==_0x58c640&&_0x30b05c(_0x432cc8,_0x58c640,_0x54fe0e,_0x1edccd)),RandomMaps['iterateMatrix'](_0x432cc8['width'],_0x432cc8['height'])['filter'](({x:_0x4bd99e,y:_0x1b19f1})=>_0x2cf4f2(_0x432cc8,_0x4bd99e,_0x1b19f1)==_0x58c640)['forEach'](({x:_0x576b77,y:_0xcfaf14})=>_0x80f7be(_0x432cc8,_0x576b77,_0xcfaf14));});}function _0x30b05c(_0x3573ce,_0x3bad2,_0x195471,_0x5d4264){const _0x1d3c0b=LoadAdditionalMaps['get']('assets'),_0x509977=_0xb10439()[_0x3bad2],_0x139e7f=MK['rng']['randomInteger'](0x1,_0x509977['n'])-0x1;_0x509977&&(RandomMaps['times'](_0x509977['width'])['forEach'](_0x3bf1db=>RandomMaps['times'](_0x509977['height'])['forEach'](_0x42c854=>_0x80f7be(_0x3573ce,_0x3bf1db+_0x195471,_0x42c854+_0x5d4264))),MK['copyTiles'](_0x139e7f*_0x509977['width']+_0x509977['x'],_0x509977['y'],_0x509977['width'],_0x509977['height'],_0x195471,_0x5d4264,_0x1d3c0b,_0x3573ce),MK['cloneEvents'](_0x139e7f*_0x509977['width']+_0x509977['x'],_0x509977['y'],_0x509977['width'],_0x509977['height'],_0x195471,_0x5d4264,_0x1d3c0b,_0x3573ce));}function _0xb10439(){const _0x2b9a9b=LoadAdditionalMaps['get']('assets');if(!_0x2b9a9b)RandomMaps['reject']('Asset\x20Map\x20not\x20found.');const _0x1ae050=RandomMaps['times'](_0x2b9a9b['height'])['map'](_0x440808=>_0x2cf4f2(_0x2b9a9b,0x0,_0x440808)),_0xabe7c3={};return RandomMaps['times'](0x1,0x100)['filter'](_0x263df4=>_0x1ae050['includes'](_0x263df4))['map'](_0x1c2c6b=>{const _0x43d13b=_0x1ae050['indexOf'](_0x1c2c6b),_0x48f324=RandomMaps['times'](_0x2b9a9b['width'])['findIndex'](_0x23600b=>_0x2cf4f2(_0x2b9a9b,_0x23600b,_0x43d13b)!=_0x1c2c6b),_0x14ecb9=RandomMaps['times'](_0x2b9a9b['height'])['findIndex'](_0x352981=>_0x2cf4f2(_0x2b9a9b,0x0,_0x352981+_0x43d13b)!=_0x1c2c6b),_0x214d53=_0x48f324,_0x293e36=Math['floor']((RandomMaps['times'](_0x214d53,_0x2b9a9b['width'])['find'](_0x2cd69e=>_0x2cf4f2(_0x2b9a9b,_0x2cd69e,_0x43d13b)==_0x55d5d8['decorationStopperId'])-_0x214d53)/_0x48f324),_0x3d5a96=Math['floor'](RandomMaps['times'](_0x214d53,_0x2b9a9b['width'])['find'](_0x745cea=>_0x1bc505(_0x2b9a9b,(_0x745cea-_0x214d53)*_0x48f324+_0x214d53,_0x43d13b,_0x48f324,_0x14ecb9)))-_0x214d53,_0x21bd7e=Math['floor']((_0x2b9a9b['width']-_0x214d53)/_0x48f324),_0x130c94=[_0x293e36,_0x3d5a96,_0x21bd7e]['find'](Boolean);return{'regionId':_0x1c2c6b,'x':_0x214d53,'y':_0x43d13b,'width':_0x48f324,'height':_0x14ecb9,'n':_0x130c94};})['filter'](_0x1f592d=>_0x1f592d&&_0x1f592d['regionId']>0x0&&_0x1f592d['x']>=0x0&&_0x1f592d['y']>=0x0)['forEach'](_0x4a2877=>_0xabe7c3[_0x4a2877['regionId']]=_0x4a2877),_0xabe7c3;}function _0x1bc505(_0x148bcd,_0x1b14c4,_0x38451a,_0x4b1779,_0x5b2798){return _0x389779(_0x148bcd,_0x1b14c4,_0x38451a,_0x4b1779,_0x5b2798)&&!_0x4b633f(_0x148bcd,_0x1b14c4,_0x38451a,_0x4b1779,_0x5b2798);}function _0x389779(_0x471e4e,_0x1fbebb,_0x594686,_0x4e62a5,_0x28f139){return RandomMaps['times'](_0x4e62a5)['every'](_0x302fee=>RandomMaps['times'](_0x28f139)['every'](_0x42b3d6=>{const _0x36c610=_0x1fbebb+_0x302fee,_0x12a7d1=_0x594686+_0x42b3d6;return _0x36c610<_0x471e4e['width']&&_0x12a7d1<_0x471e4e['height']&&_0x3d0916(_0x471e4e,_0x36c610,_0x12a7d1);}));}function _0x4b633f(_0x3b7190,_0x5f35ce,_0x39e4c4,_0x351960,_0x455396){return _0x3b7190['events']['some'](_0x212e91=>_0x212e91&&_0x5f35ce<=_0x212e91['x']&&_0x212e91['x']<_0x5f35ce+_0x351960&&_0x39e4c4<=_0x212e91['y']&&_0x212e91['y']<_0x39e4c4+_0x455396);}function _0x42931b(_0x31ef54){RandomMaps['iterateMatrix'](_0x31ef54['width'],_0x31ef54['height'])['filter'](({x:_0xa67701,y:_0x48f929})=>Object['values'](_0x55d5d8)['filter'](Boolean)['includes'](_0x2cf4f2(_0x31ef54,_0xa67701,_0x48f929)))['forEach'](({x:_0x2ae682,y:_0x326a7f})=>_0x80f7be(_0x31ef54,_0x2ae682,_0x326a7f));}}());