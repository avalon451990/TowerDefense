
var Monster = GameObject.extend({
    _monsterId : 0,
    _monsterData : null,
    _currentHP : 0.0,
    _maxHp : 0.0,
    _currentWayPointIndex: 0,
    _pathArr : [],
    _speedRate : 1,//速度的权值;

    ctor : function(monsterId){
        this._super(MONSTER);
        this._monsterId = monsterId;
        this._type = MONSTER;
        this._state = STATE_ACTIVE;
        if(this.initData() == false){
            cc.assert(false, "there is no monster data!");
        }
        this.initSp();
        this.setRectSize(1, 1);
    },

    initData: function(){
        var count = g_monster.length;
        for(var i = 0; i < count ; i++)
        {
            var data = g_monster[i];
            if(data.id == this._monsterId){
                this._monsterData = data;
                break;
            }
        }
        if(this._monsterData){
            this._currentHP = parseFloat(this._monsterData.hp);
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
        this._animation.getAnimation().playWithIndex(0);
        this.addChild(this._animation);

        this._rect = cc.rect(-20, -25, 40, 50);

        //血条;
        this._hpBg = cc.Sprite.create("res/ui_hp_board.png");
        this.addChild(this._hpBg);
        this._hpBg.setScale(0.8);
        this._hpBg.setPosition(cc.p(0, this._rect.height/2));
        this._hpBar =new cc.ProgressTimer(cc.Sprite.create("res/ui_hp_tiao.png"));
        this._hpBar.setPosition(cc.p(this._hpBg.getContentSize().width/2, this._hpBg.getContentSize().height/2));
        this._hpBg.addChild(this._hpBar);
        this._hpBar.setType(cc.ProgressTimer.TYPE_BAR);
        this._hpBar.setMidpoint(cc.p(0, 0.5));
        this._hpBar.setBarChangeRate(cc.p(1, 0));
        this._hpBar.setPercentage(100);
        this._hpBg.setVisible(false);
    },

    setHPRate : function(value){
        this._currentHP *= value;
        this._maxHp = this._currentHP;
    },

    setPathArray : function(pathArr){
        this._pathArr = pathArr;
    },

    updateObject : function(dt){
        if(this._state != STATE_ACTIVE){
            return;
        }
        this._animation.getAnimation().setSpeedScale(g_disPlayLayer.getGameSpeed());

        this.changeWayPoint(dt);
    },

    //移动;
    changeWayPoint: function(dt){
        var pos = this.getPosition();
        var nextPos = this._pathArr[this._currentWayPointIndex+1];

        var way = cc.pSub(nextPos , pos);
        way = cc.pNormalize(way);
        way = cc.pMult(way, this._monsterData.speed*dt*g_disPlayLayer.getGameSpeed()*this._speedRate);
        this.setPosition(cc.pAdd(pos , way));
        if(way.x > 0){
        	this._animation.setScaleX(-1);
        }else{
        	this._animation.setScaleX(1);
        }
        if(cc.pDistance(nextPos, this.getPosition()) <= 2){
            this._currentWayPointIndex++;
            if(this._currentWayPointIndex >= this._pathArr.length-1){
                this._state = STATE_NONE;
                g_disPlayLayer.beHurt(this._monsterData.damage);
            }
        }
    },

    //收到攻击;
    beHurt : function(damage){
        if(this._state === STATE_ACTIVE){
            this._currentHP -= parseFloat(damage);
            this.unschedule(this.hideHPBar);
            this.schedule(this.hideHPBar, 0, null, 5.0);
            this._hpBg.setVisible(true);
            this._hpBar.setPercentage(this._currentHP*100/this._maxHp);
            if(this._currentHP <= 0){
                this._currentHP = 0;
                this._state = STATE_NONE;
                g_disPlayLayer.addMushroom(this._monsterData.mushroom);
                g_disPlayLayer.addGold(this._monsterData.gold);

                //创建漂浮字;
                var tips = new DropTips(DROP_TYPE_RES, this._monsterData.mushroom);
                this.getParent().addChild(tips, MAP_GRID_HEIGHT*MAP_HEIGHT);
                tips.setPosition(cc.pAdd(this.getPosition() , cc.p(0, 30)));
            }
        }
    },

    hideHPBar : function(dt){
        this._hpBg.setVisible(false);
    },

    setSpeedRate : function(value, force){//是否强制设置;
        if(this._speedRate > value){
            this._speedRate = value;
        }
        if(force === true){
            this._speedRate = value;
        }

    }
});
