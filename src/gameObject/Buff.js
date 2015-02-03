
var Buff = GameObject.extend({
    _buffType : null,//buff类型;
    _time : 0,  //持续时间;
    _value : 0, //数值;
    _target : null,//挂载的目标

    ctor : function(type, time, value, target){
        this._super();
        this._type = BUFF;
        this._buffType = type;
        this._time = time;
        this._value = value;
        this._target = target;
        this._state = STATE_ACTIVE;

        this.initSp();
    },

    initSp : function(){
        var url, action;
        if(this._buffType == BUFF_DOT){
            url = "res/Armature/effect_002/buff_burning.csb"
            action = "buff_burning";
        }else if(this._buffType == BUFF_SLOW){
            url = "res/Armature/effect_002/buff_speed.csb"
            action = "buff_speed";
        }
        ccs.armatureDataManager.addArmatureFileInfo(url);
        this._animation = new ccs.Armature(action);
        this._animation.getAnimation().play("show");
        this.addChild(this._animation);
    },

    updateObject : function(dt){
        if(this._state != STATE_ACTIVE){
            return;
        }
        if(this._target.getState() != STATE_ACTIVE){
            this._state = STATE_DEAD;
        }

        this._time -= dt;

        if(this._buffType == BUFF_DOT){
            //还需上海buff;
            this._target.beHurt(this._value);
        }
        if(this._buffType == BUFF_SLOW){
            this._target.setSpeedRate(this._value, false);
        }
        this.setPosition(this._target.getPosition());
        this.setLocalZOrder(this._target.getLocalZOrder()+1);

        if(this._time <= 0){
            this._state = STATE_DEAD;
            if(this._buffType == BUFF_SLOW){
                this._target.setSpeedRate(1.0, true);//回复原速;
            }

        }
    }

});
