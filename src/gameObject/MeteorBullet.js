
var MeteorBullet = Bullet.extend({

    ctor : function(id){
        this._super(id);

        this.initSp();
    },

    initSp : function(){
        var url = "res/Armature/" + this._bulletData.resouce1 + "/" + this._bulletData.action + ".csb";
        //cc.log(url);
        ccs.armatureDataManager.addArmatureFileInfo(url);
        this._animation = new ccs.Armature(this._bulletData.action);
        this._animation.getAnimation().play("show");
        this.addChild(this._animation);
    },

    updateObject : function(dt){
        if(this._state != STATE_ACTIVE){
            return;
        }
        if(this._target == null || this._target.getState() != STATE_ACTIVE){
            this._state = STATE_NONE;
            this._target = null;
            return;
        }
        if(this._attacked === false){
            this._animation.getAnimation().setSpeedScale(g_disPlayLayer.getGameSpeed());
            //向着目标前进;

            this.setPositionY(this.getPositionY() - this._bulletData.bulletSpeed*dt*g_disPlayLayer.getGameSpeed());
            this.setPositionX(this._target.getPositionX());

            this.setLocalZOrder(this._target.getLocalZOrder());
            //判断是否碰撞;
            if(this.getPositionY() <= this._target.getPositionY()){
                this.attack();
                this._attacked = true;
            }
        }else{
            if(this._animation.getAnimation().getCurrentPercent() >= 1.0){
                this._state = STATE_NONE;
            }
        }

    },

    attack : function(){
        this.removeChild(this._animation);
        var url = "res/Armature/" + this._bulletData.resouce2 + "/" + this._bulletData.actionHit + ".csb";
        //cc.log(url);
        ccs.armatureDataManager.addArmatureFileInfo(url);
        this._animation = new ccs.Armature(this._bulletData.actionHit);
        this._animation.getAnimation().play("show");
        this.addChild(this._animation);

        this._target.beHurt(this._damage);


    }
});
