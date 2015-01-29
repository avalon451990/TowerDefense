
var WaveManager = cc.Class.extend({
    _waveData : [],//怪物波数数据数组;
    _waveIndex : 0, //波数索引
    _blockIndex : 0,//块索引;
    _monsterIndex : 0,//怪物索引；
    _outFinished : false,
//    {
//        id : 0,
//        difficulty : 0,
//        out : 0,
//        waveId : 0,
//        monster : []
//    },


    addMonsterWave : function(value){
        var data = {};//一波怪物的数据;
        data.id = value.id;
        data.difficulty = value.difficulty;
        data.pathnum = value.pathnum;
        data.wavenum = value.wavenum;
        data.blockArr = [];
        var arr = value.monster.split('|');
        for(var i = 0; i < arr.length; i++){
           // cc.log(arr[i]);
            var monster = arr[i].split('_');
            var blockData = {       //怪物的块数据;
                monsterId : monster[0],
                count : monster[1]
            };
            data.blockArr.push(blockData);
        }
        this._waveData.push(data);
    },

    getWaveCount : function(){
        return this._waveData.length;
    },

    getCurrentWaveId : function(){
        return this._waveIndex;
    },
    isOutMonsterFinished : function(){
        return this._outFinished;
    },

    getMonsterInfo : function(){
        if(this._outFinished === true){
            return null;
        }else{
            var data = {};
            data.difficulty = this._waveData[this._waveIndex].difficulty;
            data.pathnum = this._waveData[this._waveIndex].pathnum;
            data.monsterId = this._waveData[this._waveIndex].blockArr[this._blockIndex].monsterId;

            //cc.log("wave:"+this._waveIndex+",block:"+this._blockIndex+",monster:"+this._monsterIndex);

            this._monsterIndex ++;
            if(this._monsterIndex >= this._waveData[this._waveIndex].blockArr[this._blockIndex].count){
                //切换块;
                this._monsterIndex = 0;
                this._blockIndex++;
                if(this._blockIndex >= this._waveData[this._waveIndex].blockArr.length){
                    this._blockIndex = 0;
                    //切换波数;
                    this._waveIndex++;
                    if(this._waveIndex >= this._waveData.length){
                        this._waveIndex = 0;
                        //所有怪物已出完;
                        this._outFinished = true;
                    }
                }
            }

            return data
        }
    }


});