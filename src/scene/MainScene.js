
var MainScene = cc.Layer.extend({

    ctor : function() {
        this._super();

        var sp = new cc.Sprite("res/8M_Beginscene_BGpic.jpg");
        this.addChild(sp);
        sp.setPosition(cc.p(cc.winSize.width/2, cc.winSize.height/2));


    },

    menuCallBack : function(sender){
        cc.director.runScene(LevelScene.scene());
    }
});


MainScene.scene = function(){
    var scene = new cc.Scene();
    var layer = new MainScene();
    scene.addChild(layer);
    return scene;
};