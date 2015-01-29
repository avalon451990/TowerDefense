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
    switch ((id-40011)/10){
        case 0:{
            return new GailunTower(40011);
            break;
        }
    }
};
//创建子弹;
GameObjectFactory._createBullet = function(id){

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
        }
    }
};