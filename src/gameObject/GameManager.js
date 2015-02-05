
GameManager = cc.Class.extend({
    //对象容器;
    _monsterArr : [],   //怪物
    _towerArr : [],     //塔
    _bulletArr : [],    //子弹
    _partArr : [],      //摆件
    _buffArr : [],      //buff;

    _addArr : [],//添加数组
    _deadArr : [],//移除数组

    ctor : function(){
        this._monsterArr = [];
        this._towerArr = [];
        this._bulletArr = [];
        this._partArr = [];
        this._addArr = [];
        this._deadArr = [];
    },

    clean : function(){
        this._monsterArr = [];
        this._towerArr = [];
        this._bulletArr = [];
        this._partArr = [];
        this._addArr = [];
        this._deadArr = [];
    },

    getObjArray : function (type) {
        switch (type){
            case MONSTER:{
                return this._monsterArr;
                break;
            }
            case TOWER:{
                return this._towerArr;
                break;
            }
            case BULLET:{
                return this._bulletArr;
                break;
            }
            case PART:{
                return this._partArr;
                break;
            }
            case BUFF:{
                return this._buffArr;
                break;
            }
            default :{
                return [];
            }
        }
    },

    //刷新所有对象
    updateObject : function(dt){
        //加入新对象
        if(this._addArr.length > 0){
            for(var i = 0; i < this._addArr.length; i++){
                var obj = this._addArr[i];
                switch (obj.getType()){
                    case MONSTER:{
                        this._monsterArr.push(obj);
                        break;
                    }
                    case TOWER:{
                        this._towerArr.push(obj);
                        break;
                    }
                    case BULLET:{
                        this._bulletArr.push(obj);
                        break;
                    }
                    case PART:{
                        this._partArr.push(obj);
                        break;
                    }
                    case BUFF:{
                        this._buffArr.push(obj);
                        break;
                    }
                }
            }
            this._addArr = [];
        }


        //刷新对象
        for(var i = 0; i < this._monsterArr.length; i++){
            this._monsterArr[i].updateObject(dt);
            if(this._monsterArr[i].getState() === STATE_DEAD){
                this.removeGameObject(this._monsterArr[i]);
            }
            if(this._monsterArr[i].getState() === STATE_NONE){
                this._monsterArr[i].setState(STATE_DEAD);
            }
        }

        for(var i = 0; i < this._buffArr.length; i++){
            this._buffArr[i].updateObject(dt);
            if(this._buffArr[i].getState() === STATE_DEAD){
                this.removeGameObject(this._buffArr[i]);
            }
            if(this._buffArr[i].getState() === STATE_NONE){
                this._buffArr[i].setState(STATE_DEAD);
            }
        }

        for(var i = 0; i < this._towerArr.length; i++){
            this._towerArr[i].updateObject(dt);
            if(this._towerArr[i].getState() === STATE_DEAD){
                this.removeGameObject(this._towerArr[i]);
            }
            if(this._towerArr[i].getState() === STATE_NONE){
                this._towerArr[i].setState(STATE_DEAD);
            }
        }

        for(var i = 0; i < this._bulletArr.length; i++){
            this._bulletArr[i].updateObject(dt);
            if(this._bulletArr[i].getState() === STATE_DEAD){
                this.removeGameObject(this._bulletArr[i]);
            }
            if(this._bulletArr[i].getState() === STATE_NONE){
                this._bulletArr[i].setState(STATE_DEAD);
            }
        }

        for(var i = 0; i < this._partArr.length; i++){
            this._partArr[i].updateObject(dt);
            if(this._partArr[i].getState() === STATE_DEAD){
                this.removeGameObject(this._partArr[i]);
                //修改地图的二维数组;
                g_disPlayLayer.changeMapArr(this._partArr[i].getPositionX(), this._partArr[i].getPositionY(),
                    this._partArr[i].getObjectWidth(), this._partArr[i].getObjectHeight());
            }
            if(this._partArr[i].getState() === STATE_NONE){
                this._partArr[i].setState(STATE_DEAD);
            }
        }


        //删除对象
        if(this._deadArr.length > 0){
            for(var i = 0; i < this._deadArr.length; i++){
                var obj = this._deadArr[i];
                switch (obj.getType()){
                    case MONSTER:{
                        this._monsterArr = this._monsterArr.deleteObject(obj);
                        break;
                    }
                    case TOWER:{
                        this._towerArr = this._towerArr.deleteObject(obj);
                        break;
                    }
                    case BULLET:{
                        this._bulletArr = this._bulletArr.deleteObject(obj);
                        break;
                    }
                    case PART:{
                        this._partArr = this._partArr.deleteObject(obj);
                        break;
                    }
                    case BUFF:{
                        this._buffArr = this._buffArr.deleteObject(obj);
                        break;
                    }
                }
                obj.removeFromParent();
            }
            this._deadArr = [];
        }

        //重排z值;
        this.reOrderObjectZ();
    },

    //添加对象
    addGameObject : function(obj){
        this._addArr.push(obj);
    },
    //移除对象
    removeGameObject : function(obj){
        this._deadArr.push(obj);
    },

    reOrderObjectZ : function(){
        //重排z坐标,只重排摆件， 塔，怪物;
        //按照y的坐标值来算;
        for(var i = 0; i < this._towerArr.length; i++){
            this._towerArr[i].setLocalZOrder(MAP_GRID_HEIGHT*MAP_HEIGHT-parseInt(this._towerArr[i].getPositionY()));
        }
        for(var i = 0; i < this._monsterArr.length; i++){
            this._monsterArr[i].setLocalZOrder(MAP_GRID_HEIGHT*MAP_HEIGHT-parseInt(this._monsterArr[i].getPositionY()));
        }
        //摆件的z值设为负的;
        for(var i = 0; i < this._partArr.length; i++){
            this._partArr[i].setLocalZOrder(MAP_GRID_HEIGHT*MAP_HEIGHT-parseInt(this._partArr[i].getPositionY()));
        }
    }
});

Array.prototype.deleteObject = function(obj){
    //增加这个方法是因为slice只是将那个位置置空，总长度没变，会出问题
    if(this.length <= 0){
        return this;
    }
    var n = -1;
    //寻找其下标
    for(var i = 0; i < this.length; i++){
        if(this[i] === obj){
            n = i;
            break;
        }
    }
    if(n == -1){
        return this;
    }else{
        return this.slice(0,n).concat(this.slice(n+1,this.length));
    }

};