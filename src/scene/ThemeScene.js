

var ThemeScene = cc.Layer.extend({
    _levelLayer : [],

    ctor : function() {
        this._super();

        for(var i = 0; i < 7; i++){
            var sp = new cc.Sprite("res/8M_Mainboard.jpg");
            this.addChild(sp);
            sp.setPosition(cc.p(cc.winSize.width/2-3*sp.getContentSize().width+i*sp.getContentSize().width
                , cc.winSize.height/2));
        }


        this._themeLayer = new ThemeLayer();
        this.addChild(this._themeLayer);
        this._themeLayer.setCallBack(this.themeCallBack, this);

        //创建两个关卡层;
        var levelLayer = new LevelLayer('1');
        this.addChild(levelLayer);
        this._levelLayer.push(levelLayer);
        levelLayer.setVisible(false);
        levelLayer.setCallBack(this.levelCallBack, this);

        levelLayer = new LevelLayer('2');
        this.addChild(levelLayer);
        this._levelLayer.push(levelLayer);
        levelLayer.setVisible(false);
        levelLayer.setCallBack(this.levelCallBack, this);
    },

    themeCallBack : function(sender){
        var tag = sender.getTag();
        this._themeLayer.setVisible(false);
        for(var i = 0; i < this._levelLayer.length; i++){
            this._levelLayer[i].setVisible(false);
        }
        this._levelLayer[tag].setVisible(true);
        this._levelLayer[tag].reset();
    },

    levelCallBack : function(sender){
        var tag = sender.getTag();
        if(tag == 0){
            //返回回调;
            this._themeLayer.setVisible(true);
            for(var i = 0; i < this._levelLayer.length; i++){
                this._levelLayer[i].setVisible(false);
            }
        }else{
            g_currentLevel = tag;
            cc.director.runScene(GameLoading.scene());
        }

    },

    menuCallBack : function(sender){
        cc.director.runScene(GameLoading.scene());
    }
});


ThemeScene.scene = function(){
    var scene = new cc.Scene();
    var layer = new ThemeScene();
    scene.addChild(layer);
    return scene;
};
