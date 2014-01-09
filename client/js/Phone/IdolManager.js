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
        this.displayer.SetDisplayObjectPosition(this.idols[id],this);
        this.addChild(this.idols[id]);
    };

    IdolManager.prototype.addTiTi = function(){
        var idol = new Idol({x:(31+(149+1)*0), y:107, autoSize:false},0);
        return idol;
    };
    IdolManager.prototype.addKiKi = function(){
        var idol = new Idol({x:(31+(149+1)*1), y:107, autoSize:false},1);
        return idol;
    };
    IdolManager.prototype.addXiaoDing = function(id){
        var idol = new Idol({x:(31+(149+1)*2), y:107, autoSize:false},2);
        return idol;
    };
    IdolManager.prototype.addMiNa = function(id){
        var idol = new Idol({x:(31+(149+1)*3), y:107, autoSize:false},3);
        return idol;
    };
    IdolManager.prototype.addXiangShangYeYe = function(id){
        var idol = new Idol({x:(31+(149+1)*4), y:107, autoSize:false},4);
        return idol;
    };
    IdolManager.prototype.addHuaChiPoPo = function(id){
        var idol = new Idol({x:(31+(149+1)*5), y:107, autoSize:false},5);
        return idol;
    };

    IdolManager.prototype.getIdol = function(id,tag,x,normalx,touchedx){
        var idol = new Idol({id:tag, x:x, y:188, autoSize:false},id,normalx,666,touchedx,60,touchedx,500);
        return idol;
    };
    IdolManager.prototype.setIdolNormal = function(id){
        Views.LoginView.idolManager.selectedId = id;
        trace(Views.LoginView.idolManager.selectedId);
        for(var i=0;i<this.idols.length;i++){
            this.idols[i].SetNormal();
        }
    };
    return IdolManager;
});