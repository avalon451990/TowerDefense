
var DROP_TYPE_RES = 0;
var DROP_TYPE_HURT = 1;

var DropTips = cc.Node.extend({

    ctor : function(type, num){
        this._super();

        var sp = null;
        if(type == DROP_TYPE_RES){
            sp = new cc.Sprite("#price_box.png");
        }else{
            sp = new cc.Sprite("#teemohp_box.png");
        }

        this.addChild(sp);

        //个数标签;
        var label = cc.LabelAtlas.create(num, "res/number.png", 30, 32, '0');
        label.setAnchorPoint(cc.p(0.5, 0.5));
        label.setPosition(cc.p(50, sp.getContentSize().height/2));
        sp.addChild(label);
        label.setScale(0.6);

        var move = new cc.MoveBy(0.5, cc.p(0, 50));
        var call = new cc.CallFunc(function(){this.removeFromParent()}, this);
        this.runAction(cc.sequence(move.easing(cc.easeOut(3.0)), call));
    }
});
