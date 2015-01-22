
var Monster = GameObject.extend({
    _monsterId : 0,
    _monsterData : null,
    _currentHP : 0,
    _currentWayPointIndex: 0,

    ctor : function(monsterId){
        this._super();
        this._monsterId = monsterId;
        this._type = MONSTER;
        this._state = STATE_ACTIVE;
        if(this.initData() == false){
            cc.assert(false, "there is no monster data!");
        }
        this.initSp();
    },

    initData: function(){
        var count = g_monster.length;
        for(var i = 0; i < count ; i++)
        {
            var data = g_monster[i];
            if(data.id === this._monsterId){
                this._monsterData = data;
                break;
            }
        }
        if(this._monsterData){
            this._currentHP = this._monsterData.hp;
            return true;
        }else{
            return false;
        }
    },
    initSp : function () {

        var url = "res/Armature/" + this._monsterData.resource + "/" + this._monsterData.action + ".csb";
        //cc.log(url);
        ccs.armatureDataManager.addArmatureFileInfo(url);
        this._animation = new ccs.Armature(this._monsterData.action);
        this._animation.getAnimation().play("show");
        this.addChild(this._animation);

        this._rect = cc.rect(-20, -25, 40, 50);
    },

    updateObject : function(dt){
        if(this._state != STATE_ACTIVE){
            return;
        }

        this.changeWayPoint(dt);
    },

    //移动;
    changeWayPoint: function(dt){
        var pos = this.getPosition();
        var nextPos = g_pathArray[this._currentWayPointIndex+1];

        var way = cc.pSub(nextPos , pos);
        way = cc.pNormalize(way);
        way = cc.pMult(way, this._monsterData.speed*dt);
        this.setPosition(cc.pAdd(pos , way));
        if(way.x > 0){
        	this._animation.setScaleX(-1);
        }else{
        	this._animation.setScaleX(1);
        }
        if(cc.pDistance(nextPos, this.getPosition()) <= 2){
            this._currentWayPointIndex++;
            if(this._currentWayPointIndex >= g_pathArray.length-1){
                this._state = STATE_NONE;
                GameScene.getGameLayer().displaylayer.beHurt(this._monsterData.damage);
            }
        }
    },

    //收到攻击;
    beHurt : function(damage){
        if(this._state === STATE_ACTIVE){
            this._currentHP -= damage;
            //cc.log(this._currentHP);
            if(this._currentHP <= 0){
                this._currentHP = 0;
                this._state = STATE_NONE;
                GameScene.getGameLayer().displaylayer.addMushroom(this._monsterData.mushroom);
                GameScene.getGameLayer().displaylayer.addGold(this._monsterData.gold);
            }
        }
    }
});
