
var GameObject = cc.Node.extend({
    _type : NONE_TYPE,
    _state : STATE_NONE,
    _rect : cc.RectZero,

    ctor : function(){
        this._super();
        this.init();
    },

    init : function(){

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
                            this._rect.w,
                            this._rect.h);
    },
    setRectSize : function(wid, hei){
        this._rect = cc.rect(
            -wid*MAP_GRID_WIDTH/2, -hei*MAP_GRID_HEIGHT/2,
                wid*MAP_GRID_WIDTH, hei*MAP_GRID_HEIGHT
        );
    }

});

