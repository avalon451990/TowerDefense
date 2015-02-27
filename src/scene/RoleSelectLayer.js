//角色选择界面;
var RoleSelectLayer = MyLayer.extend({
    _heroCard : [],
    _heroItem : [],

    ctor : function() {
        this._super();

        //背景;
        var bg = cc.Scale9Sprite.createWithSpriteFrameName("UI_Common_Board.png", cc.rect(105, 102, 1, 1));
        bg.setContentSize(cc.size(700, 480));
        this._uiNode.addChild(bg);

        var bg1 = cc.Scale9Sprite.createWithSpriteFrameName("UI_Crew_Board.png", cc.rect(44, 51, 2, 2));
        bg1.setContentSize(cc.size(600, 200));
        bg1.setPosition(cc.p(0, 70));
        this._uiNode.addChild(bg1);

        var bg2 = cc.Scale9Sprite.createWithSpriteFrameName("UI_Crew_Board.png", cc.rect(44, 51, 2, 2));
        bg2.setContentSize(cc.size(560, 120));
        bg2.setPosition(cc.p(0, -100));
        this._uiNode.addChild(bg2);

        //关闭按钮;
        var closeItem = cc.MenuItemSprite.create(
            new cc.Sprite("#UI_Button_Close1.png"), new cc.Sprite("#UI_Button_Close1.png"), this.menuCallBack, this);
        closeItem.setTag(0);
        var closeMenu = cc.Menu.create(closeItem);
        closeMenu.setPosition(cc.p(660, 440));
        bg.addChild(closeMenu);

        //卷屏;
        var container = new cc.Node();
        var viewSize = cc.size(580, 200);
        this._scroll = new cc.ScrollView(viewSize, container);
        this._uiNode.addChild(this._scroll);
        this._scroll.setPosition(cc.p(-300, -30));
        this._scroll.setBounceable(true);
        this._scroll.setDirection(cc.SCROLLVIEW_DIRECTION_HORIZONTAL);
        this._scroll.setTouchEnabled(true);
        container.setContentSize(cc.size(viewSize.width, viewSize.height));

        this._heroItem = [];
        for(var i = 0; i < g_heroIds.length; i++){
            var item = new HeroItem(i, this._scroll);
            container.addChild(item);
            item.setPosition(cc.p(60 + 110*i, viewSize.height/2-20));
            item.setTarget(this, this.heroItemCallBack);
            container.setContentSize(cc.size(115*(i+1), viewSize.height));
            this._heroItem.push(item);
        }

        //出战人物展示;
        this._heroCard = [];
        for(var i = 0; i < 5; i++){
            var card = new HeroCard();
            bg2.addChild(card, 1);
            card.setPosition(cc.p(56 + 112*i, bg2.getContentSize().height/2));

            this._heroCard.push(card);
        }

        this.refreshCard();

        //开始游戏按钮;
        var startItem = cc.MenuItemSprite.create(
            new cc.Sprite("#UI_Stagedetail_Battle.png"), new cc.Sprite("#UI_Stagedetail_Battle.png"), this.menuCallBack, this);
        startItem.setTag(1);
        var startMenu = cc.Menu.create(startItem);
        startMenu.setPosition(cc.p(350, 30));
        bg.addChild(startMenu);
    },

    refreshCard : function(){
        for(var i = 0; i < this._heroCard.length; i++){
            this._heroCard[i].setVisible(false);
        }
        var index = 0;
        for(var i = 0; i < g_heroIds.length; i++){
            var state = cc.sys.localStorage.getItem("tower"+i);
            if(state == 1){
                this._heroCard[index].setVisible(true);
                this._heroCard[index].setHeroCardId(i);
                index++;
                if(index >= this._heroCard.length-1){
                    break;
                }
            }
        }
    },

    purchaseSuccess : function(index){
        cc.sys.localStorage.setItem("tower"+index, 0);
        this._heroItem[index].refresh();
    },

    heroItemCallBack : function(sender){
        this.refreshCard();
    },

    menuCallBack : function(sender){
        var tag = sender.getTag();
        if(tag == 0) {
            this._heroCard = [];
            this.playHideAnimation();
        }else if(tag == 1){
            var count = 0;
            for(var i = 0; i < g_heroIds.length; i++){
                var state = cc.sys.localStorage.getItem("tower"+i);
                if(state == 1){
                    count++;
                }
            }
            if(count <= 0){
                return;
            }
            //开始游戏;
            cc.director.runScene(GameLoading.scene());
        }
    }
});


//人物项;
var HeroItem = cc.Node.extend({
    _target : null,
    _selector : null,

    ctor : function(index, scroll){
        this._super();

        this.setTag(index);
        this._scroll = scroll;

        var data = null;
        var count = g_heroData.length;
        for(var i = 0; i < count ; i++)
        {
            var value = g_heroData[i];
            if(value.id == g_heroIds[index]){
                data = value;
                break;
            }
        }
        if(data == null){
            return false;
        }
        var url = "res/Armature/" + data.resource + "/" + data.resource + ".csb";
        ccs.armatureDataManager.addArmatureFileInfo(url);
        this._animation = new ccs.Armature(data.resource);
        this._animation.getAnimation().play("show");
        this.addChild(this._animation);

        //出战标志;
        this._fightSp = new cc.Sprite("#UI_Common_Mark.png");
        this._fightSp.setPosition(cc.p(30, 30));
        this.addChild(this._fightSp, 1);

        //购买按钮;
        var buyItem = cc.MenuItemSprite.create(
            new cc.Sprite("#UI_Button_Buy2.png"), new cc.Sprite("#UI_Button_Buy2.png"), this.buyCallBack, this);
        this._buyMenu = cc.Menu.create(buyItem);
        this._buyMenu.setPosition(this._fightSp.getPosition());
        this.addChild(this._buyMenu, 1);

        //触摸代理;
        var listener = cc.EventListener.create({
            event : cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches:false,
            onTouchBegan: this.onTouchBegan.bind(this),
            onTouchMoved: this.onTouchMoved.bind(this),
            onTouchEnded: this.onTouchEnded.bind(this),
            onTouchCancelled: this.onTouchCancelled.bind(this)
        });
        cc.eventManager.addListener(listener, this);

        this.refresh();
    },

    setTarget : function(target, selector){
        this._target = target;
        this._selector = selector;
    },

    onTouchBegan : function(touch, event){
        var frame = cc.rect(0, 0,
            this._scroll.getViewSize().width, this._scroll.getViewSize().height);
        if(cc.rectContainsPoint(frame, this._scroll.convertToNodeSpace(touch.getLocation())) == false){
            return false;
        }
        var localTouch = this.convertToNodeSpace(touch.getLocation());
        var rect = cc.rect(-30, -30, 60, 60);
        if(cc.rectContainsPoint(rect, localTouch) == true){
            this._moved = false;
            return true;
        }else{
            return false;
        }
    },
    onTouchMoved : function(touch, event){
        var startPos = touch.getStartLocation();
        var pos = touch.getLocation();
        if(Math.abs(startPos.x-pos.x) >= 10){
            this._moved = true;
        }
    },
    onTouchEnded : function(touch, event){
        if(this._moved == false){
            var state = cc.sys.localStorage.getItem("tower"+this.getTag());
            if(state == 0){
                //判断是否满了;
                var count = 0;
                for(var i = 0; i < g_heroIds.length; i++){
                    var state = cc.sys.localStorage.getItem("tower"+i);
                    if(state == 1){
                        count++;
                    }
                }
                if(count < 5){
                    cc.sys.localStorage.setItem("tower"+this.getTag(), 1);
                    if(this._target && this._selector){
                        this._selector.call(this._target, this);
                    }
                }
            }else if(state == 1){
                cc.sys.localStorage.setItem("tower"+this.getTag(), 0);
                if(this._target && this._selector){
                    this._selector.call(this._target, this);
                }
            }
            this.refresh();
        }
    },
    onTouchCancelled : function(touch, event){
        this.onTouchEnded(touch, event);
    },

    refresh : function(){
        var state = 0;
        if(this.getTag() == 0){//0表示拥有且未出战，-1表示没有, 1表示出战;
            var state = cc.sys.localStorage.getItem("tower"+this.getTag());
            if(!state){
                cc.sys.localStorage.setItem("tower"+this.getTag(), 0);
                state = 0;
            }
        }else{
            var state = cc.sys.localStorage.getItem("tower"+this.getTag());
            if(!state){
                cc.sys.localStorage.setItem("tower"+this.getTag(), -1);
                state = -1;
            }
        }
        //
        if(state == -1){
            this._fightSp.setVisible(false);
            this._buyMenu.setVisible(true);
            this._animation.getAnimation().play("show");
        }else if(state == 0){
            this._fightSp.setVisible(false);
            this._buyMenu.setVisible(false);
            this._animation.getAnimation().play("show");
        }else{
            this._fightSp.setVisible(true);
            this._buyMenu.setVisible(false);
            this._animation.getAnimation().play("win");
        }
    },

    buyCallBack : function(sender){
        jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "purchaseByIndex", "(I)V", this.getTag());
    }

});

//出战人物卡片;
var HeroCard = cc.Node.extend({

    ctor : function(){
        this._super();

        //框;
        var board = new cc.Sprite("#UI_Crew_Headboard.png");
        this.addChild(board);

        this._icon = new cc.Sprite();
        this.addChild(this._icon, 1);
    },

    setHeroCardId : function(index){
        var data = null;
        var count = g_heroData.length;
        for(var i = 0; i < count ; i++)
        {
            var value = g_heroData[i];
            if(value.id == g_heroIds[index]){
                data = value;
                break;
            }
        }
        if(data == null){
            return false;
        }

        this._icon.initWithSpriteFrameName(data.heroPic);
    }
});
