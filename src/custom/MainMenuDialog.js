
var MainMenuDialog = MyLayer.extend({

    ctor : function(){
        this._super();

        //背景;
        var bg = cc.Scale9Sprite.createWithSpriteFrameName("UI_Common_Board.png", cc.rect(105, 102, 1, 1));
        bg.setContentSize(cc.size(300, 400));
        this._uiNode.addChild(bg);

        var menu = cc.Menu.create();
        menu.setPosition(cc.p(0, 0));
        this._uiNode.addChild(menu);
        //继续游戏，重新开始，返回地图按钮;
        var item = cc.MenuItemSprite.create(
            new cc.Sprite("#UI_Pause_Continue1.png"), new cc.Sprite("#UI_Pause_Continue1.png"), this.menuCallBack, this);
        item.setTag(0);
        item.setPosition(cc.p(0, 90));
        menu.addChild(item);

        item = cc.MenuItemSprite.create(
            new cc.Sprite("#UI_Pause_Replay1.png"), new cc.Sprite("#UI_Pause_Replay1.png"), this.menuCallBack, this);
        item.setTag(1);
        item.setPosition(cc.p(0, 0));
        menu.addChild(item);

        item = cc.MenuItemSprite.create(
            new cc.Sprite("#UI_Pause_Return1.png"), new cc.Sprite("#UI_Pause_Return1.png"), this.menuCallBack, this);
        item.setTag(2);
        item.setPosition(cc.p(0, -90));
        menu.addChild(item);


        this.playAppearAnimation();
    },


    menuCallBack : function(sender){
        var tag = sender.getTag();
        this.setTag(tag);

        this.playHideAnimation();
    }
});
