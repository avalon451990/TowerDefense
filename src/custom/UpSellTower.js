
var UpSellTower = cc.Node.extend({
    _gridTouch : null,
    _target : null,
    _callBack : null,
    _menuItem : [],//升级和出售按钮;
    _priceLabel : [],//升级和出售价格标签;
    _tower : null,
    _upPrice : 0,//升级价格;

    ctor : function(target, callBack){
        this._super();

        if(callBack != undefined || target != undefined){
            this._target = target;
            this._callBack = callBack;
        }
        var grid = cc.Sprite.createWithSpriteFrameName("ui_build_target.png");
        this.addChild(grid);

        this._menu = cc.Menu.create();
        this._menu.setPosition(cc.p(0, 0));
        this.addChild(this._menu, 1);

        //动画;
        var fadein = cc.FadeIn.create(1);
        var fadeout = cc.FadeOut.create(1);
        grid.runAction(cc.RepeatForever(cc.Sequence(fadein, fadeout)));

        //攻击范围标示;
        this._atkRangeSp = cc.Sprite.createWithSpriteFrameName("ui_build_atackrange.png");
        this.addChild(this._atkRangeSp);

        this.initBtn();
    },
    initBtn : function(){
        //升级按钮;///////////////////
        var nor = cc.Sprite.createWithSpriteFrameName("ui_build_lvlupbutton.png");
        var sel = cc.Sprite.createWithSpriteFrameName("ui_build_lvlupbutton.png");
        sel.setColor(cc.color(100, 100, 100));
        var item = cc.MenuItemSprite(nor, sel, this.menuItemCallBack, this);
        this._menu.addChild(item);
        item.setScale(0.8);
        item.setTag(0);
        //价格;
        var label = cc.LabelTTF.create("", "arial", 20);
        label.setPosition(cc.p(item.getContentSize().width/2+6, 15));
        item.addChild(label);

        this._menuItem.push(item);
        this._priceLabel.push(label);
        //出售按钮;///////////////////////////
        nor = cc.Sprite.createWithSpriteFrameName("ui_build_sellbutton.png");
        sel = cc.Sprite.createWithSpriteFrameName("ui_build_sellbutton.png");
        sel.setColor(cc.color(100, 100, 100));
        item = cc.MenuItemSprite(nor, sel, this.menuItemCallBack, this);
        this._menu.addChild(item);
        item.setScale(0.8);
        item.setTag(1);
        //价格;
        label = cc.LabelTTF.create("", "arial", 20);
        label.setPosition(cc.p(item.getContentSize().width/2+5, 15));
        item.addChild(label);

        this._menuItem.push(item);
        this._priceLabel.push(label);
        //满级按钮;
        nor = cc.Sprite.createWithSpriteFrameName("ui_build_max.png");
        sel = cc.Sprite.createWithSpriteFrameName("ui_build_max.png");
        item = cc.MenuItemSprite(nor, sel, this.menuItemCallBack, this);
        this._menu.addChild(item);
        this._menuItem.push(item);
        item.setScale(0.8);
    },

    getTower : function(){
        return this._tower;
    },

    //刷新升级按钮;
    updateBtn : function(mushroom){
        if(this.isVisible() == true){
            if(this._upPrice <= mushroom){
                this._menuItem[0].setEnabled(true);
            }else{
                this._menuItem[0].setEnabled(false);
                this._menuItem[0].selected();
            }
        }
    },

    showUpSellBtn : function(gridTouch, tower){
        this._tower = tower;
        this._gridTouch = gridTouch;
        //计算两个按钮的位置;
        var x = parseInt(this._gridTouch.x);
        var y = parseInt(this._gridTouch.y);
        var posX = 0, posY = 0;
        {//升级按钮;
            if(y < MAP_HEIGHT-2){
                posX = 0;
                posY = MAP_GRID_HEIGHT;
            }else{
                if(x < MAP_WIDTH-2){
                    posX = MAP_GRID_WIDTH;
                    posY = 0;
                }else{
                    posX = -MAP_GRID_WIDTH;
                    posY = 0;
                }
            }
            this._menuItem[0].setPosition(cc.p(posX, posY));
        }
        {//出售按钮;
            if(y > 0){
                posX = 0;
                posY = -MAP_GRID_HEIGHT;
            }else{
                if(x < MAP_WIDTH-2){
                    posX = MAP_GRID_WIDTH;
                    posY = 0;
                }else{
                    posX = -MAP_GRID_WIDTH;
                    posY = 0;
                }
            }
            this._menuItem[1].setPosition(cc.p(posX, posY));
        }

        //刷新按钮价格;
        this._priceLabel[1].setString(tower.getTowerData().sellPrice);
        this._atkRangeSp.setScale(tower.getTowerData().atkRange*2/this._atkRangeSp.getContentSize().width);
        if(tower.getTowerData().level >= 3){
            //满级了;
            this._menuItem[0].setVisible(false);
            this._menuItem[2].setVisible(true);
            this._menuItem[2].setPosition(this._menuItem[0].getPosition());
        }else{
            this._menuItem[0].setVisible(true);
            this._menuItem[2].setVisible(false);
            var data = getHeroDataById(tower.getTowerData().id+1);
            this._priceLabel[0].setString(data.buildCost);
            this._upPrice = data.buildCost;
        }
        this.setVisible(true);
        this.setScale(0.0);
        this.stopAllActions();
        this.runAction(cc.EaseBackOut(cc.ScaleTo(0.2, 1.0)));
    },

    //升级的价格;
    getUpgradePrice : function(){
        return this._upPrice;
    },

    hideBtn : function(){
        this.stopAllActions();
        this.runAction(cc.Sequence(cc.EaseBackIn(cc.ScaleTo(0.2, 0.0)), cc.CallFunc.create(
            function(){this.setVisible(false);}, this
        )));
    },

    menuItemCallBack : function(sender){

        var tag = sender.getTag();
        if(tag == 0 || tag == 1){
            this.hideBtn();
            this.setTag(tag);
            if(this._target != null && this._callBack != null){
                this._callBack.call(this._target, this);
            }
        }


    }
});
