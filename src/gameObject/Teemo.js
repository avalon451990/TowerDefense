
var Teemo = cc.Node.extend({
    _teemoId : null,
    _currentHP : null,

    ctor : function() {
        this._super();
        this._teemoId = 1;
        this._currentHP = 10;

        var url = "res/Armature/hero_timo/hero_timo.csb";
        //cc.log(url);
        ccs.armatureDataManager.addArmatureFileInfo(url);
        this._animation = new ccs.Armature("hero_timo");
        this._animation.setScale(0.5);
        this._animation.getAnimation().play("show");
        this.addChild(this._animation);

        //血量显示;
        var hpBg = cc.Sprite.createWithSpriteFrameName("ui_hp_teemo.png");
        this.addChild(hpBg);
        hpBg.setPosition(cc.p(-40, 40));
        //标签;
        this._hpLabel = cc.LabelTTF.create(this._currentHP, "arial", 30);
        this._hpLabel.setPosition(cc.p(hpBg.getContentSize().width/2, hpBg.getContentSize().height/2));
        hpBg.addChild(this._hpLabel);
        this._hpLabel.setScale(0.6);
    },

    beHurt : function(damage){
        this._currentHP -= damage;
        if(this._currentHP < 0){
            this._currentHP = 0;
        }
        this._hpLabel.setString(this._currentHP);
        //创建漂浮字;
        var tips = new DropTips(DROP_TYPE_HURT, damage);
        this.getParent().addChild(tips, MAP_GRID_HEIGHT*MAP_HEIGHT);
        tips.setPosition(cc.pAdd(this.getPosition() , cc.p(0, 30)));
    },

    getTeemoHP : function(){
        return this._currentHP;
    }
});
