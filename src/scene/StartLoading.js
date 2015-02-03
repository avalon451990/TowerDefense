
var StartLoading = cc.Layer.extend({

    ctor : function(){
        this._super();

        this._time = 0.0;

        //加载资源;
        cc.spriteFrameCache.addSpriteFrames(res.Main_UI_plist, res.Main_UI_png);

        //动画;
        var url = "res/Armature/hero_nunu/hero_nunu.csb";
        //cc.log(url);
        ccs.armatureDataManager.addArmatureFileInfo(url);
        var animation = new ccs.Armature("hero_nunu");
        animation.getAnimation().play("show");
        this.addChild(animation);
        animation.setPosition(cc.p(cc.winSize.width/2, 150));

        //进度条;
        var sp = new cc.Sprite("res/ui_hp_board.png");
        this.addChild(sp);
        sp.setScaleX(4);
        sp.setPosition(cc.p(cc.winSize.width/2, 100));

        this._bar = new cc.ProgressTimer(cc.Sprite.create("res/ui_hp_tiao.png"));
        this._bar.setPosition(cc.p(sp.getContentSize().width/2, sp.getContentSize().height/2));
        sp.addChild(this._bar);
        this._bar.setType(cc.ProgressTimer.TYPE_BAR);
        this._bar.setMidpoint(cc.p(0, 0.5));
        this._bar.setBarChangeRate(cc.p(1, 0));
        this._bar.setPercentage(0);

        this.scheduleUpdate();
    },

    update : function(dt){
        this._time += dt;
        var percent = this._time*100/2.5;
        this._bar.setPercentage(percent);
        if(percent >= 100){
            this.loadingEnd();
        }
    },


    loadingEnd : function(){

        cc.director.runScene(MainScene.scene());

    }

});


StartLoading.scene = function(){
    var scene = new cc.Scene();
    var layer = new StartLoading();
    scene.addChild(layer);
    return scene;
};