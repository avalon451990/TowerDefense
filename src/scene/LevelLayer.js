
var LevelLayer = cc.Layer.extend({

    ctor : function(themeId){
        this._super();

        var container = new cc.Node();
        var viewSize = cc.size(960, 500);
        this._scroll = new cc.ScrollView(viewSize, container);
        this.addChild(this._scroll);
        this._scroll.setPosition(cc.p(cc.winSize.width/2-viewSize.width/2, cc.winSize.height/2-viewSize.height/2+20));
        this._scroll.setBounceable(true);
        this._scroll.setDirection(cc.SCROLLVIEW_DIRECTION_VERTICAL);
        this._scroll.setTouchEnabled(true);
        container.setContentSize(cc.size(viewSize.width, viewSize.height));

        var levelArr = [];
        for(var i = 0; i < g_mapLevel.length/3; i++){
            levelArr.push(g_mapLevel[i + g_mapLevel.length/3*(themeId-1)]);
        }
        for(var i = 0; i < levelArr.length/2; i+=3){//目前只取每关的第一个难度,关卡配置不完整，只有钱20关;
            var level = cc.sys.localStorage.getItem("level"+levelArr[i].id);
            if(!level){
                if(i == 0){
                    cc.sys.localStorage.setItem("level"+levelArr[i].id, 0);//0解锁了;
                    level = 0;
                }else{
                    cc.sys.localStorage.setItem("level"+levelArr[i].id, -1);//-1锁定了;
                    level = -1;
                }
            }

            var name = "#8M_Stage_Lock.png";
            if(level == 0){
                name = "#8M_Stage_Tobattle.png";
            }else if(level > 0){
                name = "#8M_Stage_Completed.png";
            }
            var j = i/3;
            var item = new cc.MenuItemSprite(
                new cc.Sprite(name), new cc.Sprite(name),
                this.levelSelectCallBack, this );
            item.setTag(levelArr[i].id);
            var menu = cc.Menu.create(item);
            menu.setPosition(cc.p(480-(320) + 160*parseInt(j%5), 500-125/2-125*parseInt(j/5)));
            container.addChild(menu);

            //关卡号;
            var label = cc.LabelAtlas.create(j+1, "res/number.png", 30, 32, '0');
            label.setPosition(cc.p(item.getContentSize().width/2, 5));
            item.addChild(label);
            label.setAnchorPoint(cc.p(0.5, 0));
            label.setScale(0.7);

            if(parseInt(level) == -1){
                menu.setEnabled(false);
            }else{
                menu.setEnabled(true);
                if(level >= 1){
                    name = "#8M_Stage_Star"+level+".png";
                    var sp = cc.Sprite(name);
                    item.addChild(sp);
                    sp.setPosition(cc.p(item.getContentSize().width/2, 70));
                }
            }


        }

        this.reset();

        //返回按钮;
        var item = new cc.MenuItemSprite(
            new cc.Sprite("#8M_Common_Back.png"), new cc.Sprite("#8M_Common_Back.png"),
            this.levelSelectCallBack, this );
        item.setTag(0);
        var menu = cc.Menu.create(item);
        menu.setPosition(cc.p(item.getContentSize().width/2, item.getContentSize().height/2));
        this.addChild(menu);

        //this.schedule(this.updateLevelBtn, 0.1, cc.REPEAT_FOREVER, 0.1);
    },

    updateLevelBtn : function(dt){
        var children = this._scroll.getContainer().getChildren();
        for(var i = 0; i < children.length; i++){
            var pos = children[i].getParent().convertToNodeSpace(children[i].getPosition());
            pos = this._scroll.getContainer().convertToNodeSpace(pos);
            if(pos.y > this._scroll.getViewSize().length || pos.y < 0){
                children[i].setEnabled(false);
            }else{
                children[i].setEnabled(true);
            }
        }
    },

    reset : function(){
        this._scroll.setContentOffset(cc.p(0, 0), false);
    },

    levelSelectCallBack : function(sender){
        var tag = sender.getTag();
        this.setTag(tag);
        this._callBack.call(this._target, this);
    },

    setCallBack : function(callBack, target){
        this._callBack = callBack;
        this._target = target;
    }
});
