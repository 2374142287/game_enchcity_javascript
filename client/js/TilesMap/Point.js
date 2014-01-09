/**
 * Created with JetBrains WebStorm.
 * User: john
 * Date: 13-2-23
 * Time: 下午2:18
 * To change this template use File | Settings | File Templates.
 */
define(function() {
    var Point = Class.extend({
        init: function(x,y) {
            this.X = x;
            this.Y = y;
        }
    });
    return Point;
});