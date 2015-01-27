
var BuildTower = cc.Node.extend({
    _gridTouch : null,
    _target : null,
    _callBack : null,
    _menuItem : [],//造塔按钮;
    _priceLabel : [],//造塔价格标签;
    ctor : function(towerIds){
        this._super();

        //this._gridRect = gridRect;

        var grid = cc.Sprite.createWithSpriteFrameName("ui_build_target.png");
        this.addChild(grid);

        this._menu = cc.Menu.create();
        this._menu.setPosition(cc.p(0, 0));
        this.addChild(this._menu);

        this.initWithIds(Array.prototype.slice.call(arguments, 0));
        //动画;
        var fadein = cc.FadeIn.create(1);
        var fadeout = cc.FadeOut.create(1);
        grid.runAction(cc.RepeatForever(cc.Sequence(fadein, fadeout)));
    },
    initWithIds : function(towerIds){
        var count = towerIds.length;
        if(count >= 1 && count <= 6){
            for(var i = 0; i < count; i++){
                var data = getHeroDataById(towerIds[i]);
                if(data != null){
                    //创建造塔按钮;
                    var nor = cc.Sprite.createWithSpriteFrameName(data.heroPic);
                    var sel = cc.Sprite.createWithSpriteFrameName(data.heroPic);
                    sel.setColor(cc.color(100, 100, 100));
                    var item = cc.MenuItemSprite(nor, sel, this.menuItemCallBack, this);
                    this._menu.addChild(item);
                    item.setTag(towerIds[i]);

                    //价格;
                    var priceBg = cc.Sprite.createWithSpriteFrameName("price_box.png");
                    item.addChild(priceBg);
                    priceBg.setScale(0.8);
                    priceBg.setPosition(cc.p(item.getContentSize().width/2, 15));
                    var label = cc.LabelTTF.create(data.buildCost, "arial", 20);
                    label.setPosition(cc.p(45, priceBg.getContentSize().height/2));
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

    initWithTarget : function(target, callBack){
        this._target = target;
        this._callBack = callBack;
    },

    getPos : function(count, index){
        switch (count){
            case 1:{
                return this._getPos1(index);
            }
            case 2:{
                return this._getPos2(index);
            }
            case 3:{
                return this._getPos3(index);
            }
            case 4:{
                return this._getPos4(index);
            }
            case 5:{
                return this._getPos5(index);
            }
            case 6:{
                return this._getPos6(index);
            }
        }
    },

    _getPos1 : function(index){
        var y = parseInt(this._gridTouch.y);
        if(y < MAP_HEIGHT-2){
            return cc.p(0, MAP_GRID_HEIGHT);
        }
        else{
            return cc.p(0, -MAP_GRID_HEIGHT);
        }
    },
    _getPos2 : function(index){
        var y = parseInt(this._gridTouch.y);
        var x = parseInt(this._gridTouch.x);
        var posX = 0;
        var posY = 0;
        if(y < MAP_HEIGHT-2){
            posY = MAP_GRID_HEIGHT;
        }else{
            posY = -MAP_GRID_HEIGHT;
        }
        if(x == 0){
            posX = index*MAP_GRID_WIDTH;
        }else if(x == MAP_WIDTH-1){
            posX = -MAP_GRID_WIDTH+index*MAP_GRID_WIDTH;
        }else{
            posX = -MAP_GRID_WIDTH/2+index*MAP_GRID_WIDTH;
        }
        return cc.p(posX, posY);
    },
    _getPos3 : function(index){
        var y = parseInt(this._gridTouch.y);
        var x = parseInt(this._gridTouch.x);
        var posX = 0;
        var posY = 0;
        if(y < MAP_HEIGHT-2){
            posY = MAP_GRID_HEIGHT;
        }else{
            posY = -MAP_GRID_HEIGHT;
        }
        if(x == 0){
            posX = index*MAP_GRID_WIDTH;
        }else if(x == MAP_WIDTH-1){
            posX = -MAP_GRID_WIDTH*2+index*MAP_GRID_WIDTH;
        }else{
            posX = -MAP_GRID_WIDTH+index*MAP_GRID_WIDTH;
        }
        return cc.p(posX, posY);
    },
    _getPos4 : function(index){
        var y = parseInt(this._gridTouch.y);
        var x = parseInt(this._gridTouch.x);
        var posX = 0;
        var posY = 0;
        if(y < MAP_HEIGHT-3){
            posY = MAP_GRID_HEIGHT*(2-parseInt(index/3));
        }else{
            posY = -MAP_GRID_HEIGHT*(1+parseInt(index/3));
        }
        if(x == 0){
            posX = MAP_GRID_WIDTH*parseInt(index%3);
        }else if(x == MAP_WIDTH-1){
            posX = -MAP_GRID_WIDTH*2+parseInt(index%3)*MAP_GRID_WIDTH;
        }else{
            posX = -MAP_GRID_WIDTH+parseInt(index%3)*MAP_GRID_WIDTH;
        }
        return cc.p(posX, posY);
    },
    _getPos5 : function(index){
        return this._getPos4(index);
    },
    _getPos6 : function(index){
        return this._getPos4(index);
    },


    //刷新建造按钮状态;
    updateBtn : function(mushroom){
        if(this.isVisible() == true){
            for(var i = 0; i < this._menuItem.length; i++){
                var data = getHeroDataById(this._menuItem[i].getTag());
                if(data.buildCost <= mushroom){
                    this._menuItem[i].setEnabled(true);
                }else{
                    this._menuItem[i].setEnabled(false);
                    this._menuItem[i].selected();
                }
            }
        }
    },

    showBuildBtn : function(gridTouch){
        this._gridTouch = gridTouch;
        this.setVisible(true);
        for(var i = 0; i < this._menuItem.length; i++){
            this._menuItem[i].setPosition(this.getPos(this._menuItem.length, i));
        }

        this.setScale(0.0);
        this.stopAllActions();
        this.runAction(cc.EaseBackOut(cc.ScaleTo(0.2, 1.0)));
    },
    hideBtn : function(){
        this.stopAllActions();
        this.runAction(cc.Sequence(cc.EaseBackIn(cc.ScaleTo(0.2, 0.0)), cc.CallFunc.create(
            function(){this.setVisible(false);}, this
        )));
    },

    menuItemCallBack : function(sender){
        this.hideBtn();
        var tag = sender.getTag();
        this.setTag(tag);
        //可以造塔了;
        if(this._target != null && this._callBack != null){
            this._callBack.call(this._target, this);
        }

    }
});