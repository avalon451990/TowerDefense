//对象的选取还是用矩形来判断，攻击范围这种用内切圆来做

var GameObject = cc.Node.extend({
    _type : NONE_TYPE,
    _state : STATE_NONE,
    _rect : cc.RectZero,
    _width : 1,
    _height : 1,
    _radius : 0,
    _tipsAnimation : null,

    ctor : function(type){
        this._super();
        this._type = type;
        this.init();
    },

    init : function(){
        //创建提示动画，怪物摆件是一个，塔是一个;
        if(this._type == TOWER){
            ccs.armatureDataManager.addArmatureFileInfo("res/Armature/world_effect/jiantou_lvup.csb");
            this._tipsAnimation = new ccs.Armature("jiantou_lvup");
            this._tipsAnimation.getAnimation().play("show");
            this.addChild(this._tipsAnimation, 10);
            this.hideTips();
        }else if(this._type == MONSTER || this._type == PART){
            ccs.armatureDataManager.addArmatureFileInfo("res/Armature/world_effect/jiantou_target.csb");
            this._tipsAnimation = new ccs.Armature("jiantou_target");
            this._tipsAnimation.getAnimation().play("show");
            this.addChild(this._tipsAnimation, 10);
            this.hideTips();
        }

    },

    showTips : function(){
        if(this._tipsAnimation != null){
            this._tipsAnimation.setVisible(true);
            this._tipsAnimation.setPositionY(this.getObjectHeight()*MAP_GRID_HEIGHT/2);
        }

    },

    hideTips : function(){
        if(this._tipsAnimation != null){
            this._tipsAnimation.setVisible(false);
        }

    },
    isTipsShowing : function(){
        if(this._tipsAnimation != null) {
            return this._tipsAnimation.isVisible();
        }
    },

    updateObject : function(dt){
        cc.log("say in gameObject");
    },

    getType : function () {
        return this._type;
    },
    getState : function(){
      return this._state;
    },
    setState : function(state){
        this._state = state;
    },
    getRect : function(){
        return cc.rect(this._rect.x + this.getPosition().x,
                            this._rect.y + this.getPosition().y,
                            this._rect.width,
                            this._rect.height);
    },
    setRectSize : function(wid, hei){
        this._width = wid;
        this._height = hei;
        if(wid > 1 && hei > 1){
            this._radius = 40;
        }else{
            this._radius = 20;
        }
        this._rect = cc.rect(
            -wid*MAP_GRID_WIDTH/2, -hei*MAP_GRID_HEIGHT/2,
                wid*MAP_GRID_WIDTH, hei*MAP_GRID_HEIGHT
        );
    },
    getRadius : function(){
      return this._radius;
    },

    getObjectHeight : function(){
        return this._height;
    },
    getObjectWidth : function(){
        return this._width;
    }
});

