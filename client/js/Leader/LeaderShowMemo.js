/**
 * Created with JetBrains WebStorm.
 * User: john
 * Date: 13-3-24
 * Time: 下午4:57
 * To change this template use File | Settings | File Templates.
 */
define(function(){
    var LeaderShowMemo = function(msg,typeid,px,py,callback)
    {
        LeaderShowMemo.superClass.constructor.call(this);
        this.init(msg,typeid,px,py,callback);
    };

    Q.inherit(LeaderShowMemo, Q.DisplayObjectContainer);

    LeaderShowMemo.prototype.init = function(msg,typeid,px,py,callback){
        switch(typeid){
            case "A":
            this.width = 960;
            this.height = 56;
        }
    };

    return LeaderShowMemo;
});