
var GailunTower = Tower.extend({

    ctor : function(id){
        this._super(id);

        this.initSp();
    },

    initSp : function(){
        var url = "res/Armature/" + this._towerData.resource + "/" + this._towerData.resource + ".csb";
        cc.log(url);
        ccs.armatureDataManager.addArmatureFileInfo(url);
        this._animation = new ccs.Armature(this._monsterData.action);
        this._animation.getAnimation().play("show");
        this.addChild(this._animation);
    },

    updateObject : function(dt){
        if(this._target == null || this._target.getState != STATE_ACTIVE
            || cc.pDistance(this._target.getPosition(), this.getPosition()) <= this._towerData.atkRange){
            this.getTargetObject();
        }
        //攻击倒计时;
        this._atkTime -= dt;

        switch (this._towerState){
            case TOWER_STATE_WAITE:{
                break;
            }
            case TOWER_STATE_ATK:{
                if(this._atkTime <= 0){
                    this._atkTime = this._towerData.atkSpeed;
                    this._animation.getAnimation().play("attack");
                    //开始攻击;
                }
                break;
            }
        }
    }
});
