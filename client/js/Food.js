/**
 * Created with JetBrains WebStorm.
 * User: john
 * Date: 13-2-14
 * Time: 上午9:52
 * To change this template use File | Settings | File Templates.
 */
define(function() {
    var Food = Class.extend({
        init: function(id,foodname,xiaohaoshijian,tiaozhishijian,starclass,stocknumber) {
            this.id = id;
            this.foodName = foodname;
            //消耗时间
            this.xiaohaoshiJian = xiaohaoshijian;
            //调制时间
            this.tiaozhishiJian = tiaozhishijian;
            //价格，即收入
            this.starClass = starclass;
            //库存量
            this.stockNumber = stocknumber;
        }
    });
    return Food;
});