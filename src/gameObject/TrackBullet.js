//追踪子弹;
var TrackBullet = Bullet.extend({

    ctor : function(id){
       this._super(id);

        this.initSp();
    },

    initSp : function(){
        var url = "res/Armature/" + this._bulletData.resouce1 + "/" + this._bulletData.action + ".csb";
        cc.log(url);
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
        this._animation.getAnimation().setSpeedScale(g_disPlayLayer.getGameSpeed());
        //向着目标前进;
        var pos = cc.pSub(this._target.getPosition(), this.getPosition());
        pos = cc.pNormalize(pos);
        pos = cc.pMult(pos, this._bulletData.bulletSpeed*dt*g_disPlayLayer.getGameSpeed());
        pos = cc.pAdd(this.getPosition() , pos)
        this.setPosition(pos);
        //判断是否碰撞;
        if(this._target.getRadius()+this.getRadius() >= cc.pDistance(this._target.getPosition(), this.getPosition())){
            this._target.beHurt(this._damage);
            cc.log(this._damage);
            this._state = STATE_NONE;
        }
    }
});