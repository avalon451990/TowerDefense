//工厂方法类;
var GameObjectFactory = cc.Class.extend({


});

//创建怪物;
GameObjectFactory._createMonster = function(id){
    if(id == 0){
        return null;
    }
    return new Monster(id);
};
//创建塔;
GameObjectFactory._createTower = function(id){
    switch (parseInt(id)){
        case 40011:{
            return new GailunTower(40011);
            break;
        }
        case 40021:{
            return new AixiTower(40021);
            break;
        }
        case 40031:{
            return new LuckyLadyTower(40031);
            break;
        }
        case 40041:{
            return new LakesTower(40041);
            break;
        }
        case 40051:{
            return new AnniTower(40051);
            break;
        }
        case 40061:{
            return new NunuTower(40061);
            break;
        }
        case 40071:{
            return new JinxTower(40071);
            break;
        }
        case 40081:{
            return new SuolakaTower(40081);
            break;
        }
        case 41001:{
            return new FixedTower(41001);
            break;
        }
        default :{
            return null;
        }
    }
};
//创建子弹;
GameObjectFactory._createBullet = function(id){
    switch (parseInt(id)){
        case 500004:case 500005:case 500006:{//减速子弹;
            return new TrackBullet(id);
            break;
        }
        case 500007:case 500008:case 500009:{//溅射子弹;
            return new TrackBullet(id);
            break;
        }
        case 500010:case 500011:case 500012:{
            return new TrackBullet(id);
            break;
        }
        case 500013:case 500014:case 500015:{//持续伤害子弹;
            return new TrackBullet(id);
            break;
        }
        case 500016:case 500017:case 500018:{//减速子弹;
            return new TrackBullet(id);
            break;
        }
        case 500019:case 500020:case 500021:{
            return new TrackBullet(id);
            break;
        }
        case 500022:case 500023:case 500024:{
            return new MeteorBullet(id);
            break;
        }
        case 530001:{
            return new TrackBullet(530001);
            break;
        }

        default :{
            return null;
        }
    }
};
//创建摆件;
GameObjectFactory._createPart = function(id){
    return new PartObject(id);
};

GameObjectFactory.createGameObject = function(type, id){
    switch (type){
        case MONSTER:{
            return GameObjectFactory._createMonster(id);
            break;
        }
        case TOWER:{
            return GameObjectFactory._createTower(id);
            break;
        }
        case BULLET:{
            return GameObjectFactory._createBullet(id);
            break;
        }
        case PART:{
            return GameObjectFactory._createPart(id);
            break;
        }
        default :{
            cc.assert(false, "wrong type!");
            return null;
        }
    }
};