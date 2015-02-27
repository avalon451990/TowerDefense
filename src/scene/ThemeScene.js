

var ThemeScene = cc.Layer.extend({
    _levelLayer : [],

    ctor : function() {
        this._super();
        this._levelLayer = [];
        for(var i = 0; i < 8; i++){
            var sp = new cc.Sprite("res/8M_Mainboard.jpg");
            this.addChild(sp);
            sp.setPosition(cc.p(cc.winSize.width/2-3.5*sp.getContentSize().width+i*sp.getContentSize().width
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
        g_currentChapter = tag;
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
            //cc.director.runScene(GameLoading.scene());
            var layer = new RoleSelectLayer();
            this.addChild(layer, 100);
            layer.setPosition(cc.p(cc.winSize.width/2, cc.winSize.height/2));
        }

    },

    menuCallBack : function(sender){
        cc.director.runScene(GameLoading.scene());
    }
});


ThemeScene.scene = function(value){
    var scene = new cc.Scene();
    var layer = new ThemeScene();
    scene.addChild(layer);

    if(value != undefined){
        var node = new cc.Node();
        node.setTag(value);
        layer.themeCallBack(node);
    }
    return scene;
};
