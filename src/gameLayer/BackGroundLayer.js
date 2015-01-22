
var BackGroundLayer = cc.Layer.extend({
	
	ctor:function(){
		this._super();
		this.init();
	},
	init:function(){
		var size = cc.director.getWinSize();
		//背景图
		var background = cc.Sprite.create(res.BackGround_png);
		background.attr({
			x:size.width/2,
			y:size.height/2
		});
		this.addChild(background, 0, 0);
		
		return true;
	}
	
});