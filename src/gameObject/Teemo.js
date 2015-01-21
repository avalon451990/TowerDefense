
var Teemo = cc.Node.extend({
    _teemoId : null,
    _currentHP : null,

    ctor : function() {
        this._super();
        this._teemoId = 1;
        this._currentHP = 10;

        var url = "res/Armature/hero_timo/hero_timo.csb";
        cc.log(url);
        ccs.armatureDataManager.addArmatureFileInfo(url);
        this._animation = new ccs.Armature("hero_timo");
        this._animation.setScale(0.5);
        this._animation.getAnimation().play("show");
        this.addChild(this._animation);
    },

    beHurt : function(damage){
        this._currentHP -= damage;
    },

    getTeemoHP : function(){
        return this._currentHP;
    }
});
