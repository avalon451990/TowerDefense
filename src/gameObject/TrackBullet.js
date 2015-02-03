//追踪子弹;
var TrackBullet = Bullet.extend({

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
            var pos = cc.pSub(this._target.getPosition(), this.getPosition());
            pos = cc.pNormalize(pos);
            pos = cc.pMult(pos, this._bulletData.bulletSpeed*dt*g_disPlayLayer.getGameSpeed());
            pos = cc.pAdd(this.getPosition() , pos)
            this.setPosition(pos);
            //子弹的旋转;
            var pos = cc.pNormalize(cc.pSub(this._target.getPosition(), this.getPosition()));
            cc.pToAngle(pos);
            this._animation.setRotation(-cc.pToAngle(pos)*180/3.1415);
            //判断是否碰撞;
            if(this._target.getRadius()+this.getRadius() >= cc.pDistance(this._target.getPosition(), this.getPosition())){
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
        if(this._bulletData.resouce2 != "null" && this._bulletData.actionHit != "null"){
            this.removeChild(this._animation);
            var url = "res/Armature/" + this._bulletData.resouce2 + "/" + this._bulletData.actionHit + ".csb";
            //cc.log(url);
            ccs.armatureDataManager.addArmatureFileInfo(url);
            this._animation = new ccs.Armature(this._bulletData.actionHit);
            this._animation.getAnimation().play("show");
            this.addChild(this._animation);
        }else{
            this.removeChild(this._animation);
            this._state = STATE_NONE;
        }

        this._target.beHurt(this._damage);

        //子弹特效;
        switch (this._bulletId){
            case 500007:case 500008:case 500009:{//溅射子弹;
                var type = this._target.getType();
                if(type == MONSTER){
                    var arr = g_disPlayLayer.getGameManager().getObjArray(MONSTER);
                    for(var i = 0; i < arr.length; i++){
                        if(arr[i].getRadius() + this._bulletData.damageRange >=
                            cc.pDistance(this._target.getPosition(), arr[i].getPosition())){
                            if(arr[i] != this._target){
                                arr[i].beHurt(this._damage);
                            }
                        }
                    }
                }else if(type == PART){
                    var arr = g_disPlayLayer.getGameManager().getObjArray(PART);
                    for(var i = 0; i < arr.length; i++){
                        if(arr[i].getRadius() + this._bulletData.damageRange >=
                            cc.pDistance(this._target.getPosition(), arr[i].getPosition())){
                            if(arr[i] != this._target){
                                arr[i].beHurt(this._damage);
                            }
                        }
                    }
                }
                break;
            }
            case 500013:case 500014:case 500015:{//持续伤害子弹;
                var buff = new Buff(BUFF_DOT, this._bulletData.buffTime, this._bulletData.bufferEffect, this._target);
                this._target.getParent().addChild(buff, 1);
                g_disPlayLayer.getGameManager().addGameObject(buff);
                break;
            }
            case 500016:case 500017:case 500018:case 500004:case 500005:case 500006:{//减速子弹;
                if(this._target.getType() == MONSTER){
                    var buff = new Buff(BUFF_SLOW, this._bulletData.buffTime, this._bulletData.bufferEffect, this._target);
                    this._target.getParent().addChild(buff, 1);
                    g_disPlayLayer.getGameManager().addGameObject(buff);
                }
                break;
            }
        }
    }
});