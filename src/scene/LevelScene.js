

var LevelScene = cc.Layer.extend({

    ctor : function() {
        this._super();

        for(var i = 0; i < 7; i++){
            var sp = new cc.Sprite("res/8M_Mainboard.jpg");
            this.addChild(sp);
            sp.setPosition(cc.p(cc.winSize.width/2-3*sp.getContentSize().width+i*sp.getContentSize().width
                , cc.winSize.height/2));
        }


        //开始按钮;
        var mainItem = cc.MenuItemSprite.create(
            new cc.Sprite("#8M_Button_Startgame.png"),
            new cc.Sprite("#8M_Button_Startgame.png"),
            this.menuCallBack, this);
        mainItem.setPosition(cc.p(cc.winSize.width/2, 65));
        var menu = cc.Menu.create(mainItem);
        menu.setPosition(cc.p(0, 0));
        this.addChild(menu, 1);
    },

    menuCallBack : function(sender){
        cc.director.runScene(GameLoading.scene());
    }
});


LevelScene.scene = function(){
    var scene = new cc.Scene();
    var layer = new LevelScene();
    scene.addChild(layer);
    return scene;
};
