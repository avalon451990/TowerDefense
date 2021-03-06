
var SuolakaTower = Tower.extend({

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
        var targetArr = [];
        var objArr = g_disPlayLayer.getGameManager().getObjArray(MONSTER);
        for(var i = 0; i < objArr.length; i++){
            if(objArr[i].getState() === STATE_ACTIVE){
                if(cc.pDistance(objArr[i].getPosition(), this.getPosition()) <= this._towerData.atkRange+objArr[i].getRadius()){
                    targetArr.push(objArr[i]);
                }
            }
        }
        objArr = g_disPlayLayer.getGameManager().getObjArray(PART);
        for(var i = 0; i < objArr.length; i++){
            if(objArr[i].getState() === STATE_ACTIVE){
                if(cc.pDistance(objArr[i].getPosition(), this.getPosition()) <= this._towerData.atkRange+objArr[i].getRadius()){
                    targetArr.push(objArr[i]);
                }
            }
        }

        for(var i = 0; i < targetArr.length; i++){
            //创建子弹;
            var bullet = GameObjectFactory.createGameObject(BULLET, this._towerData.normalAtk);
            if(bullet == null){
                return;
            }
            bullet.setTarget(targetArr[i]);
            bullet.setDamage(this._towerData.atkPower);
            bullet.setPosition(cc.pAdd(targetArr[i].getPosition(), cc.p(0,150)));
            this.getParent().addChild(bullet, targetArr[i].getLocalZOrder());
            g_disPlayLayer.getGameManager().addGameObject(bullet);
        }
        targetArr = [];//删除数组;


    }
});
