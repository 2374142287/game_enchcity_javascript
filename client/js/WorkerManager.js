/**
 * Created with JetBrains WebStorm.
 * User: john
 * Date: 13-3-23
 * Time: 下午9:04
 * To change this template use File | Settings | File Templates.
 */
define(function() {
    var WorkerManager = Class.extend({
        init: function() {
            this.workers = new Array();
        },

        add: function(worker){
            if(this.workers.length>3) this.workers.pop();
            this.workers.push(worker);
        },

        getDJ:function(){
            return this.getByRoleCode("D");
        },
        getAlcohol:function(){
            return this.getByRoleCode("A");
        },
        getWaiter:function(){
            return this.getByRoleCode("W");
        },
        getByRoleCode:function(roleCode){
            for(var i=0;i<this.workers.length;i++){
                if(this.workers[i].rolecode == roleCode) return this.workers[i];
            }
            return -1;
        },
        clear:function(){
            this.workers = [];
        }

    });
    return WorkerManager;
});