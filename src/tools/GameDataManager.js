
var g_pathArray = []; //路径点;

var g_heroData = [];//英雄数据;

var g_monster = [];//怪物数据;

var g_monsterWave = [];//怪物波束数据;

var g_mapLevel= [];//关卡数据;

var g_skill= [];//技能数据;

var g_item = [];//摆件信息;

var g_teemoSkill = [];//teemo技能;

var g_disPlayLayer = null;//在这里保存了一份display;

var g_currentLevel = 100101;
var g_currentChapter = 0;

//按照索引获取英雄数据;
var getHeroDataById = function(id){
    for(var i = 0; i < g_heroData.length; i++){
        if(g_heroData[i].id == id){
            return g_heroData[i];
        }
    }
    return null;
}

//取得触摸的x，y索引;
var getTouchIndex_X = function(posX){
    return parseInt(posX/MAP_GRID_WIDTH);
}
var getTouchIndex_Y = function(posY){
    return parseInt(posY/MAP_GRID_HEIGHT);
}

GameDataManager = cc.Class.extend({

    //初始化数据;
    initGameData: function(){
        this._initHeroData();
        this._initMonsterData();
        this._initMonsterWaveData();
        this._initMapLevelData();
        this._initSkillData();
        this._initItemData();
    },

    _initHeroData : function() {//初始化英雄数据;

        cc.loader.loadJson("res/data/Hero.json", function(err, res){
            if(err)
                cc.assert(false, "there is no HeroData!");
            var doc = res || [];
            var length = doc.length;
            for (var i = 2; i < length; i++) {//前两条是属性描述;
                var data = doc[i] || [];
                var item = {};
                item.id = data[0];
                item.heroType = data[1];
                item.resource = data[2];
                item.heroPic = data[3];
                item.heroName = data[4];
                item.name = data[5];
                item.heroInfo = data[6];
                item.heroDetail = data[7];
                item.skillDetail = data[8];
                item.level = data[9];
                item.buildCost = data[10];
                item.sellPrice = data[11];
                item.atkPower = data[12];
                item.atkSpeed = data[13];
                item.atkRange = data[14];
                item.normalAtk = data[15];
                item.skill = data[16];
                item.skillper = data[17];
                item.bones = data[18];

                g_heroData.push(item);
            }
        });
    },
    _initMonsterData : function(){//初始化怪物数据;

        var doc = cc.loader.loadJson("res/data/Monster.json", function(err, res) {
            if (err)
                cc.assert(false, "there is no MonsterData!");
            var doc = res || [];
            var length = doc.length;
            for (var i = 2; i < length; i++) {//前两条是属性描述;
                var data = doc[i] || [];
                var item = {};
                item.id = data[0];
                item.resource = data[1];
                item.action = data[2];
                item.hp = data[3];
                item.speed = data[4];
                item.mushroom = data[5];
                item.gold = data[6];
                item.damage = data[7];
                item.resistance = data[8];

                g_monster.push(item);
            }
        });
    },
    _initMonsterWaveData: function(){//初始化波数;

        var doc = cc.loader.loadJson("res/data/MonsterWave.json", function(err, res) {
            if (err)
                cc.assert(false, "there is no MonsterWaveData!");
            var doc = res || [];
            var length = doc.length;
            for (var i = 2; i < length; i++) {//前两条是属性描述;
                var data = doc[i] || [];
                var item = {};
                item.id = data[0];
                item.difficulty = data[1];
                item.pathnum = data[2];//出怪口;
                item.wavenum = data[3];//波数;
                item.monster = data[4];

                g_monsterWave.push(item);
            }
        });
    },
    _initMapLevelData : function(){//初始化地图配置;

        var doc = cc.loader.loadJson("res/data/MapLevel.json", function(err, res) {
            if (err)
                cc.assert(false, "there is no MapLevelData!");
            var doc = res || [];
            var length = doc.length;
            for (var i = 2; i < length; i++) {//前两条是属性描述;
                var data = doc[i] || [];
                var item = {};
                item.id = data[0];
                item.mapname = data[1];
                item.mapid = data[2];
                item.minmapid = data[3];
                item.type = data[4];
                item.tmx = data[5];
                item.difficult = data[6];
                item.nextlevelid = data[7];
                item.missionId = data[8];//过关条件组;
                item.energyCost = data[9];
                item.teemoHp = data[10];
                item.startMushuroom = data[11];
                item.goldNum = data[12];
                item.diamondPer = data[13];
                item.diamondNum = data[14];
                item.mapType = data[15];
                item.mapTime = data[16];
                item.mapGift = data[17];

                g_mapLevel.push(item);
            }
        });
    },
    _initSkillData : function(){//初始化技能;

        var doc = cc.loader.loadJson("res/data/Skill.json", function(err, res) {
            if (err)
                cc.assert(false, "there is no SkillData!");
            var doc = res || [];
            var length = doc.length;
            for (var i = 2; i < length; i++) {//前两条是属性描述;
                var data = doc[i] || [];
                var item = {};
                item.id = data[0];
                item.name = data[1];
                item.resouce1 = data[2];
                item.action = data[3];
                item.resouce2 = data[4];
                item.actionHit = data[5];
                item.damagePer = data[6];
                item.buffType = data[7];
                item.buffTime = data[8];
                item.bufferEffect = data[9];
                item.damageRange = data[10];
                item.criticalPer = data[11];
                item.criticalDamage = data[12];
                item.bulletSpeed = data[13];

                g_skill.push(item);
            }
        });
    },
    _initItemData : function(){
        var doc = cc.loader.loadJson("res/data/Item.json", function(err, res) {
            if (err)
                cc.assert(false, "there is no SkillData!");
            var doc = res || [];
            var length = doc.length;
            for (var i = 2; i < length; i++) {//前两条是属性描述;
                var data = doc[i] || [];
                var item = {};
                item.id = data[0];
                item.armtPath = data[1];
                item.armtName = data[2];
                item.hp = data[3];
                item.mushroom = data[4];
                item.gold = data[5];
                item.buffType = data[6];
                item.buffEffect = data[7];
                item.buffTime = data[8];

                g_item.push(item);
            }
        });
    },
    _initTeemoSkill : function(){
        var doc = cc.loader.loadJson("res/data/TeemoSkill.json", function(err, res) {
            if (err)
                cc.assert(false, "there is no SkillData!");
            var doc = res || [];
            var length = doc.length;
            for (var i = 2; i < length; i++) {//前两条是属性描述;
                var data = doc[i] || [];
                var item = {};
                item.id = data[0];
                item.skillName = data[1];
                item.skillTip = data[2];
                item.skillIcon = data[3];
                item.skillType = data[4];
                item.skillDamage = data[5];
                item.skillTime = data[6];
                item.buffEffect = data[7];
                item.skillCD = data[8];

                g_teemoSkill.push(item);
            }
        });
    }
});


GameDataManager.g_globle = null;

GameDataManager.getInstance = function(){
    if(!this.g_globle){
        this.g_globle = new GameDataManager();
        this.g_globle.initGameData();
    }
    return this.g_globle;
};