
var WaveTips = cc.Node.extend({
    _waveLabel : null,
    _waveCountLabel : null,
    ctor : function(){
        this._super();

        //骷髅头;
        var sp = cc.Sprite.createWithSpriteFrameName("ui_battle_kulou.png");
        this.addChild(sp);
        sp.setPositionX(-80);
        //斜杠;
        var sp = cc.Sprite.createWithSpriteFrameName("UI_battle_xiegang.png");
        this.addChild(sp);
        sp.setPositionX(30);
        //波数标签;
        this._waveLabel = cc.LabelAtlas.create("00", "res/number.png", 30, 32, '0');
        this.addChild(this._waveLabel);
        this._waveLabel.setPositionX(-20);
        this._waveLabel.setScale(1.3);

        //总波数标签;
        this._waveCountLabel = cc.LabelAtlas.create("00", "res/number.png", 30, 32, '0');
        this.addChild(this._waveCountLabel);
        this._waveCountLabel.setPositionX(80);
        this._waveCountLabel.setScale(1.3);

    },

    updateLabel : function(index, count){
        if(index < 10){
            this._waveLabel.setString("0"+index);
            this._waveLabel.setAnchorPoint(cc.p(0.5, 0.5));
        }else{
            this._waveLabel.setString(index);
            this._waveLabel.setAnchorPoint(cc.p(0.5, 0.5));
        }
        if(count < 10){
            this._waveCountLabel.setString("0"+count);
            this._waveCountLabel.setAnchorPoint(cc.p(0.5, 0.5));
        }else{
            this._waveCountLabel.setString(count);
            this._waveCountLabel.setAnchorPoint(cc.p(0.5, 0.5));
        }
    }
});
