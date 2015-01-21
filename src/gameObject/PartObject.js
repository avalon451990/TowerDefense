
var PartObject = GameObject.extend({
    _partId : null,
    _partData : null,
    _currentHP : null,

    ctor : function(partId){
        this._super();

        this._partId = partId;
        this._type = PART;
        this._state = STATE_ACTIVE;
        if(this.initData() == false){
            cc.assert(false, "there is no part data!");
        }
        this.initSp();
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
            this._currentHP = this._partData.hp;
            return true;
        }else{
            return false;
        }
    },

    initSp : function(){
    	var url = "res/Armature/" + this._partData.armtPath + "/" + this._partData.armtName + ".csb";
    	cc.log(url);
        ccs.armatureDataManager.addArmatureFileInfo(url);
        this._animation = new ccs.Armature(this._partData.armtName);
        this._animation.getAnimation().play("show");
        this.addChild(this._animation);
    },
    
    updateObject : function(dt){
    	if(this._state != STATE_ACTIVE){
    		return;
    	}

    	
    },

    beHurt : function(damage){
        this._currentHP -= damage;
        if(this._currentHP <= 0){
            this._state = STATE_DEAD;
            GameScene.getInstance().displaylayer.addMushroom(this._partData.mushroom);
            GameScene.getInstance().displaylayer.addGold(this._partData.gold);
        }
    }
});
