
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
            var item = new cc.MenuItemSprite(
                new cc.Sprite(name[i]), new cc.Sprite(name[i]),this.themeSelectCallBack, this );
            item.setTag(i);
            var menu = cc.Menu.create(item);
            menu.setPosition(cc.p(480-(310) + 310*i, 320));
            this._container.addChild(menu);
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