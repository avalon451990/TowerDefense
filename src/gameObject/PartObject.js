
var PartObject = GameObject.extend({
    _partId : null,
    _partData : null,
    _currentHP : 0.0,

    ctor : function(partId){
        this._super(PART);

        this._partId = partId;
        this._type = PART;
        this._state = STATE_ACTIVE;
        if(this.initData() == false){
            cc.assert(false, "there is no part data!");
        }
        this.initSp();
        this.setRectSize(1, 1);
    },

    initData: function(){
        var count = g_item.length;
        for(var i = 0; i < count ; i++)
        {
            var data = g_item[i];
            if(data.id == this._partId){
                this._partData = data;
                break;
            }
        }
        if(this._partData){
            this._currentHP = parseFloat(this._partData.hp);
            return true;
        }else{
            return false;
        }
    },

    initSp : function(){
    	var url = "res/Armature/" + this._partData.armtPath + "/" + this._partData.armtName + ".csb";
    	//cc.log(url);
        ccs.armatureDataManager.addArmatureFileInfo(url);
        this._animation = new ccs.Armature(this._partData.armtName);
        this._animation.getAnimation().play("show");
        this.addChild(this._animation);

        //血条;
        this._hpBg = cc.Sprite.create("res/ui_hp_board.png");
        this.addChild(this._hpBg);
        this._hpBg.setScale(0.8);
        this._hpBg.setPosition(cc.p(0, MAP_GRID_HEIGHT/2*this._height));
        this._hpBar =new cc.ProgressTimer(cc.Sprite.create("res/ui_hp_tiao.png"));
        this._hpBar.setPosition(cc.p(this._hpBg.getContentSize().width/2, this._hpBg.getContentSize().height/2));
        this._hpBg.addChild(this._hpBar);
        this._hpBar.setType(cc.ProgressTimer.TYPE_BAR);
        this._hpBar.setMidpoint(cc.p(0, 0.5));
        this._hpBar.setBarChangeRate(cc.p(1, 0));
        this._hpBar.setPercentage(100);
        this._hpBg.setVisible(false);
    },
    
    updateObject : function(dt){
    	if(this._state != STATE_ACTIVE){
    		return;
    	}

    	
    },

    beHurt : function(damage){
        this._currentHP -= parseFloat(damage);
        this.unschedule(this.hideHPBar);
        this.schedule(this.hideHPBar, 0, null, 5.0);
        this._hpBg.setVisible(true);
        this._hpBar.setPercentage(this._currentHP*100.0/this._partData.hp);
        if(this._currentHP <= 0){
            this._state = STATE_NONE;
            g_disPlayLayer.addMushroom(this._partData.mushroom);
            g_disPlayLayer.addGold(this._partData.gold);

            //创建漂浮字;
            var tips = new DropTips(DROP_TYPE_RES, this._partData.mushroom);
            this.getParent().addChild(tips, MAP_GRID_HEIGHT*MAP_HEIGHT);
            tips.setPosition(cc.pAdd(this.getPosition() , cc.p(0, 30)));
        }
    },
    hideHPBar : function(dt){
        this._hpBg.setVisible(false);
    },

    setPartSize : function(wid, hei){
        this._width = wid;
        this._height = hei;
    },
    getPartSizeWid : function(){
        return this._width;
    },
    getPartSizeHei : function(){
        return this._height;
    }
});
