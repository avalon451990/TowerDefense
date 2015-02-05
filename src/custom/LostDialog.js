
var LostDialog = MyLayer.extend({

    ctor : function(){
        this._super();

        //背景;
        var bg = cc.Scale9Sprite.createWithSpriteFrameName("UI_Common_Board.png", cc.rect(105, 102, 1, 1));
        bg.setContentSize(cc.size(480, 400));
        this._uiNode.addChild(bg);
        //抬头;
        var title = new cc.Sprite("#UI_Lose_Text.png");
        title.setPosition(cc.p(bg.getContentSize().width/2, 315));
        bg.addChild(title);

        //teemo
        var url = "res/Armature/hero_timo/hero_timo.csb";
        //cc.log(url);
        ccs.armatureDataManager.addArmatureFileInfo(url);
        var animation = new ccs.Armature("hero_timo");
        animation.setScale(0.6);
        animation.getAnimation().play("dead");
        animation.setPosition(cc.p(bg.getContentSize().width/2, bg.getContentSize().height/2));
        bg.addChild(animation);

        //三个按钮;
        var menu = cc.Menu.create();
        menu.setPosition(cc.p(0, 0));
        bg.addChild(menu);

        //返回地图，重新开始，返回关卡按钮;
        var item = cc.MenuItemSprite.create(
            new cc.Sprite("#UI_Button_Home1.png"), new cc.Sprite("#UI_Button_Home1.png"), this.menuCallBack, this);
        item.setTag(0);
        item.setPosition(cc.p(bg.getContentSize().width/2-100, 70));
        menu.addChild(item);

        item = cc.MenuItemSprite.create(
            new cc.Sprite("#UI_Button_Replay1.png"), new cc.Sprite("#UI_Button_Replay1.png"), this.menuCallBack, this);
        item.setTag(1);
        item.setPosition(cc.p(bg.getContentSize().width/2, 70));
        menu.addChild(item);

        item = cc.MenuItemSprite.create(
            new cc.Sprite("#UI_Button_Next1.png"), new cc.Sprite("#UI_Button_Next1.png"), this.menuCallBack, this);
        item.setTag(2);
        item.setPosition(cc.p(bg.getContentSize().width/2+100, 70));
        menu.addChild(item);
    },

    menuCallBack : function(sender){
        var tag = sender.getTag();
        this.setTag(tag);

        this.playHideAnimation();
    }
});
