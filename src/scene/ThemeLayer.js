//章节界面;
var ThemeLayer = cc.Layer.extend({
    _container : null,

    ctor : function(){
        this._super();

        this._container = new cc.Node();
        var viewSize = cc.size(960, 640);
        var scroll = new cc.ScrollView(viewSize, this._container);
        this.addChild(scroll);
        scroll.setPosition(cc.p(cc.winSize.width/2-viewSize.width/2, cc.winSize.height/2-viewSize.height/2));
        scroll.setBounceable(true);
        scroll.setDirection(cc.SCROLLVIEW_DIRECTION_HORIZONTAL);
        scroll.setTouchEnabled(true);
        this._container.setContentSize(viewSize);

        //创建关卡;
        var name = ["#8M_Mainpage_Forest.png", "#8M_Mainpage_Snow.png", "#8M_Mainpage_Desert.png"];
        for(var i = 0; i < 3; i++){
            var chapter = cc.sys.localStorage.getItem("chapter"+i);
            if(!chapter){
                if(i == 0){
                    cc.sys.localStorage.setItem("chapter"+i, 0);//0解锁了;
                    chapter = 0;
                }else{
                    cc.sys.localStorage.setItem("chapter"+i, -1);//-1锁定了;
                    chapter = -1;
                }
            }

            var item = new cc.MenuItemSprite(
                new cc.Sprite(name[i]), new cc.Sprite(name[i]),this.themeSelectCallBack, this );
            item.setTag(i);
            var menu = cc.Menu.create(item);
            menu.setPosition(cc.p(480-(310) + 310*i, 320));
            this._container.addChild(menu);

            if(chapter == -1){
                item.setEnabled(false);
            }else{
                item.setEnabled(true);
            }

            if(i == 1 && chapter == -1){
                var label = cc.LabelTTF.create("please through previous chapter!", "arial", 24);
                label.setPosition(cc.p(item.getContentSize().width/2, item.getContentSize().height/2));
                item.addChild(label);
            }
        }
    },


    themeSelectCallBack : function(sender){
        var tag = sender.getTag();
        this.setTag(tag);
        this._callBack.call(this._target, this);
    },

    setCallBack : function(callBack, target){
        this._callBack = callBack;
        this._target = target;
    }


});