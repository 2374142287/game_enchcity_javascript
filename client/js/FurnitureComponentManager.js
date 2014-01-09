/**
 * Created with JetBrains WebStorm.
 * User: john
 * Date: 13-3-19
 * Time: 下午11:05
 * To change this template use File | Settings | File Templates.
 */
define(['FurnitureComponent'],function(FurnitureComponent) {

    var FurnitureComponentManager = Class.extend({
        init: function(){
            this.Components = new Array();
        },
        add:function(component){
            var furnitureComponent = new FurnitureComponent(component);
            this.Components.push(furnitureComponent);
        },
        count:function(){
            return this.Components.length;
        },
        indexOfByComponentId:function(componentid){
            for(var i=0;i<this.Components.length;i++)
            {
                if(this.Components[i].componentid == componentid)
                    return i;
            }
            return -1;
        },
        get: function(componentid){
            var id = this.indexOfByComponentId(componentid);
            if(id !=-1) return this.Components[id];
            return -1;
        },

        clear:function(){
            this.Components = [];
        },

        remove:function(componentid){
            if(isNaN(componentid)){return false;}
            var id = this.indexOfByGuestId(componentid);
            if(id !=-1) this.Components.splice(id,1);
        },

        contains : function(component){
            if(this.indexOfByGuestId(component.componentid) == -1) return false;
            return true;
        }

    });
    return FurnitureComponentManager;
});