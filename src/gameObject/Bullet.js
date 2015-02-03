
var Bullet = GameObject.extend({
    _bulletId : 0,
    _bulletData : null,
    _animation: null,//动画;
    _target : null,//目标;
    _damage : 0,
    _attacked : false,//攻击了，这个变量是为了播放子弹的第二段动画;

    ctor : function(id){
        this._super(BULLET);
        this._bulletId = id;
        this._type = BULLET;
        this._state = STATE_ACTIVE;
        if(this.initData() == false){
            cc.assert(false, "there is no bullet data!");
        }

        this._attacked = false;
        this._radius = 10;//碰撞半径;
    },

    initData: function(){
        this._bulletData = null;
        var count = g_skill.length;
        for(var i = 0; i < count ; i++)
        {
            var data = g_skill[i];
            if(data.id == this._bulletId){
                this._bulletData = data;
                break;
            }
        }
        if(this._bulletData != null){
            return true;
        }else{
            return false;
        }
    },

    setDamage : function(value){
        this._damage = value;
    },

    setTarget : function(target){
        this._target = target;
    },

    updateObject : function(dt){

    }
});