/**
 * Created with JetBrains WebStorm.
 * User: john
 * Date: 13-2-19
 * Time: 下午8:19
 * To change this template use File | Settings | File Templates.
 */
define(function() {
    var Queue = Class.extend({
        init: function() {
            this.taskid = 0;
            this.name = "";
            this.comment = "";
            this.bonus = "";
            this.status = 0;
        }
    });
    return Queue;
});