/**
 * Created with JetBrains WebStorm.
 * User: dk647
 * QQ 499871835
 * To change this template use File | Settings | File Templates.
 */
define(function() {
    var Wupin = Class.extend({
        init: function(id,name,price,count) {
            this.id = id;
            this.name = name;
            //价格
            this.price = price;
            //数量
            this.count = count;
        }
    });
    return Wupin;
});