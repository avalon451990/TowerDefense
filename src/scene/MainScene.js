
var MainScene = cc.Layer.extend({

    ctor : function() {
        this._super();

        var sp = new cc.Sprite("res/8M_Beginscene_BGpic.jpg");
        this.addChild(sp);
        sp.setPosition(cc.p(cc.winSize.width/2, cc.winSize.height/2));

        //开始按钮;
        var mainItem = cc.MenuItemSprite.create(
            new cc.Sprite("#8M_Button_Startgame.png"),
            new cc.Sprite("#8M_Button_Startgame.png"),
            this.menuCallBack, this);
        mainItem.setPosition(cc.p(cc.winSize.width/2, 100));
        var menu = cc.Menu.create(mainItem);
        menu.setPosition(cc.p(0, 0));
        this.addChild(menu, 1);
    },

    menuCallBack : function(sender){
        cc.director.runScene(ThemeScene.scene());

    }
});


MainScene.scene = function(){
    var scene = new cc.Scene();
    var layer = new MainScene();
    scene.addChild(layer);
    return scene;
};