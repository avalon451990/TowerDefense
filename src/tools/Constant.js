
//游戏对象类型
var NONE_TYPE = -1;
var MONSTER = 0;
var TOWER = 1;
var BULLET = 2;
var PART = 3;

//地图格子大小;
var MAP_GRID_WIDTH = 64;
var MAP_GRID_HEIGHT = 64;
var MAP_WIDTH = 15;
var MAP_HEIGHT = 10;

//游戏对象状态;
var STATE_NONE = -1;    //无;
var STATE_DEAD = 0;     //死亡;
var STATE_ACTIVE = 1;   //活跃;
var STATE_STAY = 2;     //待机;

//塔的状态;
var TOWER_STATE_WAITE = 0;//等待
var TOWER_STATE_ATK = 1;//攻击;