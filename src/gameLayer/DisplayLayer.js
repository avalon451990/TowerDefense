
var DisplayLayer = cc.Layer.extend({
	_gameManager : null,
    _levelData : null,
    _mapArray : [], //数组中-1表示无法放置，0表示空，1表示塔，2表示摆件;
	ctor:function(){
		this._super();
		this.init();
        g_disPlayLayer = this;
	},
	
	init:function(){
        //初始化二维地图数组;
        for(var i = 0; i < 15; i++){
            this._mapArray[i] = [];
            for(var j = 0; j < 10; j++){
                this._mapArray[i][j] = 0;
            }
        }
        var count = g_mapLevel.length;
        for(var i = 0; i < count; i++){
            if(g_mapLevel[i].id == g_currentLevel){
                this._levelData = g_mapLevel[i];
                break;
            }
        }
        if(this._levelData == null){
            cc.assert(false, "there is no level data!");
        }

        this._gameManager = new GameManager();
		this.initMap();
        //二次初始化;
        this.initMapArr();


        var monster = GameObjectFactory.createGameObject(MONSTER,100253);
        this._tmxMap.addChild(monster, 10);
        monster.setPosition(g_pathArray[0]);
        this._gameManager.addGameObject(monster);

        this.scheduleUpdate();

        //触摸代理;
        var listener = cc.EventListener.create({
            event : cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches:true,
            onTouchBegan: this.onTouchBegan.bind(this)
        });
        cc.eventManager.addListener(listener, this);
		return true;
	},
	
	//初始化地图;
	initMap:function(){
        var url = "res/map/" + this._levelData.tmx + ".tmx";
		this._tmxMap = new cc.TMXTiledMap(url);
		this.addChild(this._tmxMap);
		this._tmxMap.setAnchorPoint(cc.p(0.5, 0.5));
		this._tmxMap.setPosition(cc.p(cc.winSize.width/2,
                cc.winSize.height/2));

        var mapSize = this._tmxMap.getMapSize();

		//读取路径点;
        g_pathArray = [];
        
        var ObjectGroups = this._tmxMap.getObjectGroups();
        var count = ObjectGroups.length;
        for(var i = 0; i < count; i++){
            var objArr = ObjectGroups[i];
            
            switch (objArr.getGroupName()){
                case "path":{//路径点;
                    var pathArr = objArr.getObjects();
                    for(var j = 0; j < pathArr.length; j++){
                    	g_pathArray.push(cc.p(pathArr[j]["x"], pathArr[j]["y"]));

                        var label = new cc.LabelTTF(j.toString(), "arial", 30);
                        label.setPosition(g_pathArray[j]);
                        this._tmxMap.addChild(label, 10);
                    }
                    break;
                }
                case "blocked":{
                    var blockArr = objArr.getObjects();
                    for(var j = 0; j < blockArr.length; j++) {
                        var posX = blockArr[j]["x"];
                        var posY = blockArr[j]["y"];
                        var indexY = parseInt(posY/MAP_GRID_HEIGHT);
                        this._mapArray[getTouchIndex_X(posX)][indexY] = -1;
                    }
                    break;
                }
                case "item":{
                    var itemArr = objArr.getObjects();
                    var wid = parseInt(objArr.getProperties()["sizeW"]);
                    var hei = parseInt(objArr.getProperties()["sizeH"]);
                    for(var j = 0; j < itemArr.length; j++) {
                        var part = GameObjectFactory.createGameObject(PART,objArr.getProperties()["id"]);
                        this._tmxMap.addChild(part, 10);
                        this._gameManager.addGameObject(part);
                        part.setRectSize(wid, hei);
                        var posX = itemArr[j]["x"];
                        var posY = itemArr[j]["y"];
                        posX = parseInt(posX/MAP_GRID_WIDTH) * MAP_GRID_WIDTH + MAP_GRID_WIDTH/2*objArr.getProperties()["sizeW"];
                        if(objArr.getProperties()["sizeH"] == 1){
                            posY = parseInt(posY/MAP_GRID_HEIGHT) * MAP_GRID_HEIGHT + MAP_GRID_HEIGHT/2;
                        }else{
                            posY = parseInt(posY/MAP_GRID_HEIGHT) * MAP_GRID_HEIGHT;
                        }

                        part.setPosition(cc.p(posX, posY));
                        //修改地图;
                        var indexX = getTouchIndex_X(itemArr[j]["x"]);
                        var indexY = getTouchIndex_Y(itemArr[j]["y"]);
                        for(var n = 0; n < wid; n++){
                            for(var m = 0; m < hei; m++){
                                this._mapArray[indexX+n][indexY-m] = 2;
                            }
                        }
                    }
                    break;
                }
                case "tower":{
                    var towerArr = objArr.getObjects();
                    var wid = parseInt(objArr.getProperties()["sizeW"]);
                    var hei = parseInt(objArr.getProperties()["sizeH"]);
                    for(var j = 0; j < towerArr.length; j++) {
                        var posX = towerArr[j]["x"];
                        var posY = towerArr[j]["y"];
                        //创建塔;

                        //修改地图;
                        var indexX = getTouchIndex_X(towerArr[j]["x"]);
                        var indexY = getTouchIndex_Y(towerArr[j]["y"]);
                        for(var n = 0; n < wid; n++){
                            for(var m = 0; m < hei; m++){
                                this._mapArray[indexX+n][indexY-m] = 1;
                            }
                        }
                    }
                    break;
                }
                case "teemo":{
                    var teemoArr = objArr.getObjects();
                    var wid = parseInt(objArr.getProperties()["sizeW"]);
                    var hei = parseInt(objArr.getProperties()["sizeH"]);
                    this._teemo = new Teemo();
                    this._tmxMap.addChild(this._teemo, 10);
                   // this._teemo.setPosition(cc.p(teemoArr[0]["x"], teemoArr[0]["y"]));
                    var posX = teemoArr[0]["x"];
                    var posY = teemoArr[0]["y"];
                    posX = parseInt(posX/MAP_GRID_WIDTH) * MAP_GRID_WIDTH + MAP_GRID_WIDTH/2*objArr.getProperties()["sizeW"];
                    if(objArr.getProperties()["sizeH"] == 1){
                        posY = parseInt(posY/MAP_GRID_HEIGHT) * MAP_GRID_HEIGHT + MAP_GRID_HEIGHT/2;
                    }else{
                        posY = parseInt(posY/MAP_GRID_HEIGHT) * MAP_GRID_HEIGHT;
                    }

                    this._teemo.setPosition(cc.p(posX, posY));

                    //修改地图;
                    var indexX = getTouchIndex_X(teemoArr[0]["x"]);
                    var indexY = getTouchIndex_Y(teemoArr[0]["y"]);
                    for(var n = 0; n < wid; n++){
                        for(var m = 0; m < hei; m++){
                            this._mapArray[indexX+n][indexY-m] = -1;
                        }
                    }
                    break;
                }
                case "random":{
                    var randomArr = objArr.getObjects();
                    for(var j = 0; j < randomArr.length; j++) {
                        var posX = randomArr[j]["x"];
                        var posY = randomArr[j]["y"];
                        //这里不知道是干什么用的，先按空白处理;
                    }
                    break;
                }
                default:{break;}
            }
            
        }

	},

    //初始化地图数组;
    initMapArr : function(){
        //一部分已经初始化完毕，还要去掉路径;
        for(var i = 0; i < g_pathArray.length-1; i++){
            var pos1 = g_pathArray[i];
            var pos2 = g_pathArray[i+1];
            var indexX = getTouchIndex_X(pos1.x);
            var indexY = getTouchIndex_Y(pos1.y);
            var disX = getTouchIndex_X(pos2.x)-indexX;
            var disY = getTouchIndex_Y(pos2.y)-indexY;
            if(disX >= 0){
                for(var m = 0; m <= disX; m++){
                    if(disY >= 0){
                        for(var n = 0; n <= disY; n++){
                            this._mapArray[indexX+m][indexY+n] = -1;
                        }
                    }else{
                        for(var n = 0; n >= disY; n--){
                            this._mapArray[indexX+m][indexY+n] = -1;
                        }
                    }
                }
            }else{
                for(var m = 0; m >= disX; m--){
                    if(disY >= 0){
                        for(var n = 0; n <= disY; n++){
                            this._mapArray[indexX+m][indexY+n] = -1;
                        }
                    }else{
                        for(var n = 0; n >= disY; n--){
                            this._mapArray[indexX+m][indexY+n] = -1;
                        }
                    }
                }
            }
        }
    },

    //游戏主循环
    update : function(dt){
        if(this._pause){
            return;
        }

       this._gameManager.updateObject(dt);

        if(this._teemo.getTeemoHP() <= 0){
            this.gameOver(0);
        }
    },

    onTouchBegan : function(touch, event){
        var localTouch = this._tmxMap.convertToNodeSpace(touch.getLocation());
        localTouch = cc.p(parseInt(localTouch.x), parseInt(localTouch.y));
        var mapSize = this._tmxMap.getMapSize();
        if(cc.rectContainsPoint(cc.rect(0, MAP_GRID_HEIGHT, mapSize.width*MAP_GRID_WIDTH, (mapSize.height-2)*MAP_GRID_HEIGHT),localTouch) == false){
            return true;
        }

        var index_X = getTouchIndex_X(localTouch.x);
        var index_Y = getTouchIndex_Y(localTouch.y);

        switch (this._mapArray[index_X][index_Y]){
            case -1:{
                cc.log("you can not touch there!");
                break;
            }
            case 0:{
                cc.log("there is nothing!");
                break;
            }
            case 1:{
                cc.log("there is a tower!");
                break;
            }
            case 2:{
                cc.log("there is a part!");
                break;
            }
        }
        return true;
    },

    //创建怪物;
    createMonster : function(id, posX, posY) {
		
	},
	
    //增加蘑菇;
    addMushroom : function(value){

    },

    //增加金币;
    addGold : function(value){

    },

    //受伤;
    beHurt : function(value){
        this._teemo.beHurt(value);
    },

    getMap : function(){
        return this._tmxMap;
    },
    getGameManager : function(){
        return this._gameManager;
    },
    //游戏结束;
    gameOver : function(type){
        this._pause = true;
        if(type == 0){
            //游戏失败;
        }else{
            //游戏成功;
        }
    }
});