
var BuildTower = cc.Node.extend({
    _rect : null,
    _touch : null,
    _menuItem : [],//造塔按钮;
    _priceLabel : [],//造塔价格标签;
    ctor : function(viewRect, touch){
        this._super();

        this._rect = viewRect;
        this._touch = touch;

        var grid = cc.Sprite.createWithSpriteFrameName("ui_build_target.png");
        this.addChild(grid);

        this._menu = cc.Menu.create();
        this._menu.setPosition(cc.p(0, 0));
        this.addChild(this._menu);
        //动画;
        var fadein = cc.fadeOut.create(1);
        var fadeout = cc.fadeOut.create(1);
        grid.runAction(cc.RepeatForever(cc.Sequence(fadein, fadeout, null)));
    },
    initWithIds : function(towerIds){
        var count = arguments.length;
        if(count >= 1 || count <= 6){
            for(var i = 0; i < count; i++){
                var data = getHeroDataById(arguments[i]);
                if(data != null){
                    //创建造塔按钮;
                    var nor = cc.Sprite.createWithSpriteFrameName(data.heroPic);
                    var sel = cc.Sprite.createWithSpriteFrameName(data.heroPic);
                    sel.setColor(cc.color(100, 100, 100));
                    var item = cc.MenuItemSprite(nor, sel, this.menuItemCallBack(), this);
                    this._menu.addChild(item);
                    item.setPosition(this.getPos(count, i));
                    item.setTag(arguments[i]);

                    //价格;
                    var priceBg = cc.Sprite.createWithSpriteFrameName("price_box.png");
                    item.addChild(priceBg);
                    priceBg.setPosition(cc.p(item.getContentSize().width/2, 15));
                    var label = cc.LabelTTF.create(data.buildCost, "arial", 20);
                    label.setPosition(cc.p(50, priceBg.getContentSize().height/2));
                    priceBg.addChild(label);
                    //保存;
                    this._menuItem.push(item);
                    this._priceLabel.push(label);
                }
            }

        }else{
            cc.assert(false, "wrong id!");
        }
    },

    getPos : function(count, index){

    },


    menuItemCallBack : function(sender){
        var tag = sender.getTag();
        //可以造塔了;
    }
});