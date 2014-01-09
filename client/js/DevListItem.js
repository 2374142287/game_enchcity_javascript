/**
 * Created with JetBrains WebStorm.
 * User: john
 * Date: 13-2-14
 * Time: 上午9:52
 * To change this template use File | Settings | File Templates.
 */
define(function() {
    var DevListItem = Class.extend({
        init: function() {
            this.x = -1;
            this.y = -1;
            this.fcomp = null;
        }
    });
    return DevListItem;
});