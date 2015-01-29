
var GailunTower = Tower.extend({

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
        //普通攻击动画;
        var skillData = this._towerData.normalAtk;
        for(var i = 0; i < g_skill.length; i++){
            if(g_skill[i].id == this._towerData.normalAtk){
                skillData = g_skill[i];
            }
        }
        url = "res/Armature/" + skillData.resouce1 + "/" + skillData.action + ".csb";
        ccs.armatureDataManager.addArmatureFileInfo(url);
        this._atkAnimation = new ccs.Armature(skillData.action);
        this._atkAnimation.getAnimation().play("show");
        this.addChild(this._atkAnimation);
        this._atkAnimation.setVisible(false);
    },

    updateObject : function(dt){
        if(this._target == null || this._target.getState() != STATE_ACTIVE
            || cc.pDistance(this._target.getPosition(), this.getPosition()) > this._towerData.atkRange+this._target.getRadius()){
            this.getTargetObject();
        }
        //攻击倒计时;
        this._atkTime -= dt*g_disPlayLayer.getGameSpeed();
        this._animation.getAnimation().setSpeedScale(1.0/this._towerData.atkSpeed*g_disPlayLayer.getGameSpeed());
        this._atkAnimation.getAnimation().setSpeedScale(1.0/this._towerData.atkSpeed*g_disPlayLayer.getGameSpeed());

        if(this._atkTime <= 0){
            if(this._target != null){
                this._atkTime = this._towerData.atkSpeed;
                this._animation.getAnimation().play("attack");
                this._animation.getAnimation().setSpeedScale(1.0/this._towerData.atkSpeed*g_disPlayLayer.getGameSpeed());
                this._atkAnimation.setVisible(true);
                this._atkAnimation.getAnimation().play("show");
                this._atkAnimation.setScale(parseFloat(this._towerData.atkRange)/this._towerBaseData.atkRange);
                this._atkAnimation.getAnimation().setSpeedScale(1.0/this._towerData.atkSpeed*g_disPlayLayer.getGameSpeed());
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
        if(this._atkAnimation.getAnimation().getCurrentPercent() >= 1){
            this._atkAnimation.setVisible(false);
        }

    },

    attack : function(){
        //所有在其攻击范围内的对象都受到伤害;
        var objArr = g_disPlayLayer.getGameManager().getObjArray(MONSTER);
        //遍历怪物;
        for(var i = 0; i < objArr.length; i++){
            if(cc.pDistance(this.getPosition(), objArr[i].getPosition()) <= this._towerData.atkRange+this._target.getRadius()){
                objArr[i].beHurt(this._towerData.atkPower);
            }
        }

        //遍历摆件;
        objArr = g_disPlayLayer.getGameManager().getObjArray(PART);
        for(var i = 0; i < objArr.length; i++){
            if(cc.pDistance(this.getPosition(), objArr[i].getPosition()) <= this._towerData.atkRange+this._target.getRadius()){
                objArr[i].beHurt(this._towerData.atkPower);
            }
        }
    }
});

