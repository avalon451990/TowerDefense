
var GameScene = cc.Layer.extend({
	backGroundlayer:null,
	displaylayer:null,
	uilayer:null,
	
	ctor:function(){
		this._super();
		this.init();
        g_gameScene = this;
	},

	init:function(){

		//背景层
		this.backGroundlayer = new BackGroundLayer();
		this.addChild(this.backGroundlayer, 0, 0);
		
		//显示层
		this.displaylayer = new DisplayLayer();
		this.addChild(this.displaylayer);
		//ui层
		this.uilayer = new UiLayer();
		this.addChild(this.uilayer);
		
		return true;
	},
	
	getBackGroundLayer:function(){
		return this.backGroundlayer;
	},
	
	getDisplayLayer:function(){
		return this.displaylayer;
	},
	
	getUiLayer:function(){
		return this.uilayer;
	}
});

GameScene.g_gameScene = null;

GameScene.getGameLayer = function(){
    return g_gameScene;
};

GameScene.scene = function(){
	var scene = new cc.Scene();
	var layer = new GameScene();
	scene.addChild(layer);
	return scene;
};
