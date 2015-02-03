
var NunuTower = Tower.extend({

    ctor : function(id){
        this._super(id);

        this.initSp();
    },

    initSp : function(){
        var url = "res/Armature/" + this._towerData.resource + "/" + this._towerData.resource + ".csb";
        //cc.log(url);
        ccs.armatureDataManager.addArmatureFileInfo(url);
        this._animation = new ccs.Armature(this._towerData.resource);
        this._animation.getAnimation().play("show");
        this.addChild(this._animation);
    },

    updateObject : function(dt){
        if(this._target == null || this._target.getState() != STATE_ACTIVE
            || cc.pDistance(this._target.getPosition(), this.getPosition()) > this._towerData.atkRange+this._target.getRadius()){
            this.getTargetObject();
        }
        //攻击倒计时;
        this._atkTime -= dt*g_disPlayLayer.getGameSpeed();
        this._animation.getAnimation().setSpeedScale(1.0/this._towerData.atkSpeed*g_disPlayLayer.getGameSpeed());

        if(this._atkTime <= 0){
            if(this._target != null){
                this._atkTime = this._towerData.atkSpeed;
                this._animation.getAnimation().play("attack");
                this._animation.getAnimation().setSpeedScale(1.0/this._towerData.atkSpeed*g_disPlayLayer.getGameSpeed());
                //开始攻击;
                this.attack();
            }else{
                //没有目标待机;
                if(this._animation.getAnimation().getCurrentPercent() >= 1){
                    this._animation.getAnimation().play("show");
                }
            }
        }else{
            //攻击间隔没到;
            if(this._animation.getAnimation().getCurrentPercent() >= 1){
                this._animation.getAnimation().play("show");
            }
        }

    },

    attack : function(){
        //创建子弹;
        var bullet = GameObjectFactory.createGameObject(BULLET, this._towerData.normalAtk);
        if(bullet == null){
            return;
        }
        bullet.setTarget(this._target);
        bullet.setDamage(this._towerData.atkPower);
        bullet.setPosition(cc.pAdd(this.getPosition(), cc.p(0,0)));
        this.getParent().addChild(bullet, this.getLocalZOrder());
        g_disPlayLayer.getGameManager().addGameObject(bullet);
    }
});
