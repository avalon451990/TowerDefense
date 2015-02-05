
var MyLayer = cc.Layer.extend({
    _uiNode : null,
    _target : null,
    _callBack : null,

    ctor : function(){
        this._super();

        //颜色层;
        var colorLayer = new cc.LayerColor(cc.color(30, 68, 105, 125));
        colorLayer.setPosition(cc.p(-cc.winSize.width/2, -cc.winSize.height/2));
        this.addChild(colorLayer);

        //ui节点;
        this._uiNode = new cc.Node();
        this.addChild(this._uiNode);

        var listener = cc.EventListener.create({
            event : cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches:true,
            onTouchBegan: this.onTouchBegan.bind(this)
        });
        cc.eventManager.addListener(listener, this);
    },

    onTouchBegan : function(touch, event){
        return true;
    },

    initWithCallBack : function(target, callBack){
        this._target = target;
        this._callBack = callBack;
    },

    //弹入效果;
    playAppearAnimation : function(){
        if(this._uiNode != null){
            this._uiNode.setScale(0);
            var scale = cc.ScaleTo.create(0.2, 1.0);
            var call = cc.CallFunc.create(this.appearAnimationEnd, this);
            this._uiNode.runAction(cc.Sequence(new cc.EaseBackOut(scale), call));
        }
    },

    //弹出效果;
    playHideAnimation : function(){
        if(this._uiNode != null){
            var scale = cc.ScaleTo.create(0.2, 0.0);
            var call = cc.CallFunc.create(this.hideAnimationEnd, this);
            this._uiNode.runAction(cc.Sequence(new cc.EaseBackIn(scale), call));
        }
    },

    appearAnimationEnd : function(){

    },

    hideAnimationEnd : function(){
        if(this._callBack && this._target){
            this._callBack.call(this._target, this);
        }
        this.removeFromParent();
    }


});