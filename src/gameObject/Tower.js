
/* 英雄的动作：show,attack,skill,go,attack_back,skill_back,win,lose*/

var Tower = GameObject.extend({
    _towerId : 0,
    _towerData : null,
    _atkTime : 0,
    _animation: null,//动画;
    _target : null,//目标;
    _towerState : null,//塔的状态;

    ctor : function(id){
        this._super(TOWER);
        this._towerId = id;
        this._type = TOWER;
        this._state = STATE_STAY;
        if(this.initData() == false){
            cc.assert(false, "there is no tower data!");
        }
        this.setRectSize(1, 1);
        //this._atkTime = this._towerData.atkSpeed;
    },
    initData: function(){
        var count = g_heroData.length;
        for(var i = 0; i < count ; i++)
        {
            var data = g_heroData[i];
            if(data.id == this._towerId){
                this._towerData = data;
                break;
            }
        }
        if(this._towerData){
            return true;
        }else{
            return false;
        }
    },

    upGrade : function(){
        this._towerId += 1;
        this.initData();
    },

    updateObject : function(dt){

    },

    updateTips : function(mushroom){
        if(this._towerData.level >= 3){
            return;
        }else{
            var data = getHeroDataById(this._towerId+1);
            if(data != null){
                if(data.buildCost <= mushroom){
                    this.showTips();
                }
            }
            this.hideTips();
        }
    },

    getTowerData : function(){
        return this._towerData;
    },

    //获得目标
    getTargetObject : function(){
        //寻找怪物;
        var objArr = g_disPlayLayer.getGameManager().getObjArray(MONSTER);
        for(var i = 0; i < objArr.length; i++){
            if(objArr[i].getState() === STATE_ACTIVE){
                if(cc.pDistance(objArr[i].getPosition(), this.getPosition()) <= this._towerData.atkRange){
                    this._target = objArr[i];
                    return;
                }
            }
        }
        this._target = null;
    },

    setTarget : function(target){
        this._target = target;
    },

    showWinAction : function(){
        this._animation.getAnimation().play("win");
    },
    showLoseAction : function(){
        this._animation.getAnimation().play("lose");
    }


});