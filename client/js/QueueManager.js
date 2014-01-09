/**
 * Created with JetBrains WebStorm.
 * User: john
 * Date: 13-2-23
 * Time: 上午10:19
 * To change this template use File | Settings | File Templates.
 */
define(function() {
    var QueueManager = Class.extend({
        init: function() {
            this.queues = new Array();
        },

        add: function(queue){
            this.queues.push(queue);
        },
        clear:function(){
            this.queues = [];
        },

        get: function(taskid){
            for(var i=0;i<this.queues.length;i++)
            {
                if(this.queues[i].taskid == taskid) return this.queues[i];
            }
            return -1;
        },

        remove:function(taskid){
            for(var i=0;i<this.queues.length;i++){
                if(this.queues[i].taskid == taskid) this.queues.splice(i,1);
            }
        },

        Count: function(){
            return this.queues.length;
        }

    });
    return QueueManager;
});