
/* 英雄的动作：show,attack,skill,go,attack_back,skill_back,win,lose*/

var Tower = GameObject.extend({
    _towerId : 0,
    _towerData : null,
    _atkTime : 0,
    _animation: null,//动画;
    _target : null,//目标;
    _towerState : null,//塔的状态;

    ctor : function(id){
        this._super();
        this._towerId = id;
        this._type = TOWER;
        this._state = STATE_STAY;
        if(this.initData() == false){
            cc.assert(false, "there is no tower data!");
        }
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
    updateObject : function(dt){

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
//        //寻找摆件;
//        var objArr = g_disPlayLayer.getGameManager().getObjArray(PART);
//        for(var i = 0; i < objArr.length; i++){
//            if(objArr[i].getState() === STATE_ACTIVE){
//                if(cc.pDistance(objArr[i].getPosition(), this.getPosition()) <= this._towerData.atkRange){
//                    this._target = objArr[i];
//                    return;
//                }
//            }
//        }
        this._target = null;
    },

    showWinAction : function(){
        this._animation.getAnimation().play("win");
    },
    showLoseAction : function(){
        this._animation.getAnimation().play("lose");
    }

});