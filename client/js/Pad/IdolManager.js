/**
 * Created with JetBrains WebStorm.
 * User: john
 * Date: 13-2-11
 * Time: 下午5:55
 * To change this template use File | Settings | File Templates.
 */
define([winSize+'/idol'],function() {

    var IdolManager = function(props,displayer,container)
    {
        IdolManager.superClass.constructor.call(this, props);
        this.init(displayer,container);
    };

    Q.inherit(IdolManager, Q.DisplayObjectContainer);

    IdolManager.prototype.init = function(displayer,container){
        this.container = container;
        this.displayer = displayer;
        this.idols = new Array();
        this.selectedId = 0;
        this.InitIdols();
    };

    IdolManager.prototype.InitIdols = function(){
        this.addIdol(this.addTiTi(),0);
        this.addIdol(this.addKiKi(),1);
        this.addIdol(this.addXiaoDing(),2);
        this.addIdol(this.addMiNa(),3);
        this.addIdol(this.addXiangShangYeYe(),4);
        this.addIdol(this.addHuaChiPoPo(),5);

        for(var i=0;i<this.idols.length;i++) {
            this.idols[i].SetNormal();
        }
    };

    IdolManager.prototype.addIdol = function(idolTmp,id){
        this.idols[id] = idolTmp;
        this.displayer.SetDisplayObjectPosition(this.idols[id],this.getCurrentHeight(),this.displayer.fixWinHeight);
        this.addChild(this.idols[id]);
    };

    IdolManager.prototype.addTiTi = function(){
        var idol = new Idol({x:(202+(238+14)*0), y:191, autoSize:false},0);
        return idol;
    };
    IdolManager.prototype.addKiKi = function(){
        var idol = new Idol({x:(202+(238+14)*1), y:191, autoSize:false},1);
        return idol;
    };
    IdolManager.prototype.addXiaoDing = function(){
        var idol = new Idol({x:(202+(238+14)*2), y:191, autoSize:false},2);
        return idol;
    };
    IdolManager.prototype.addMiNa = function(){
        var idol = new Idol({x:(202+(238+14)*3), y:191, autoSize:false},3);
        return idol;
    };
    IdolManager.prototype.addXiangShangYeYe = function(){
        var idol = new Idol({x:(202+(238+14)*4), y:191, autoSize:false},4);
        return idol;
    };
    IdolManager.prototype.addHuaChiPoPo = function(){
        var idol = new Idol({x:(202+(238+14)*5), y:191, autoSize:false},5);
        return idol;
    };
    IdolManager.prototype.setIdolNormal = function(id){
        Views.LoginView.idolManager.selectedId = id;
        trace(Views.LoginView.idolManager.selectedId);
        for(var i=0;i<this.idols.length;i++){
            this.idols[i].SetNormal();
            //if(this.idols[i] == this) trace("IDol:"+i);
        }
    };
/*
        InitIdols:function(){
            this.addIdol(this.addTiTi(),0);
            this.addIdol(this.addKiKi(),1);
            this.addIdol(this.addXiaoDing(),2);
            this.addIdol(this.addMiNa(),3);
            this.addIdol(this.addXiangShangYeYe(),4);
            this.addIdol(this.addHuaChiPoPo(),5);

            for(var i=0;i<idols.length;i++) {
                idols[i].SetNormal();
            }
        },

        addIdol:function(idolTmp,id){
            idols[id] = idolTmp;
            this.displayer.SetDisplayObjectPosition(idols[id],this.container.getCurrentHeight(),this.displayer.fixWinHeight);
            this.container.addChild(idols[id]);
        },

        addTiTi:function(){
            var idol = new Idol({id:"titi", x:215, y:188, autoSize:false},219,206,210,187,67,61);
            idol.addEventListener(events[2], idol.SetTouched);
            return idol;
        },
        addKiKi:function(){
            var idol = new Idol({id:"kiki", x:464, y:188, autoSize:false},468,206,480,187,309,61);
            idol.addEventListener(events[2], idol.SetTouched);
            return idol;
        },
        addXiaoDing:function(){
            var idol = new Idol({id:"xiaoding", x:713, y:188, autoSize:false},717,206,747,187,557,61);
            idol.addEventListener(events[2], idol.SetTouched);
            return idol;
        },
        addMiNa:function(){
            var idol = new Idol({id:"mina", x:962, y:188, autoSize:false},966,206,1016,187,808,61);
            idol.addEventListener(events[2], idol.SetTouched);
            return idol;
        },
        addXiangShangYeYe:function(){
            var idol = new Idol({id:"xiangshangyeye", x:1210, y:188, autoSize:false},1214,206,1284,187,1054,61);
            idol.addEventListener(events[2], idol.SetTouched);
            return idol;
        },
        addHuaChiPoPo:function(){
            var idol = new Idol({id:"huachipopo", x:1459, y:188, autoSize:false},1463,206,1553,187,1307,61);
            idol.addEventListener(events[2], idol.SetTouched);
            return idol;
        }
    });
    */
    return IdolManager;
});