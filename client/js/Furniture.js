/**
 * Created with JetBrains WebStorm.
 * User: john
 * Date: 13-3-3
 * Time: 下午7:17
 * To change this template use File | Settings | File Templates.
 */
define(function() {
    var Furniture = Class.extend({
        init: function(Furniture){
            this.Furniture = Furniture;
            this.Components = new Array();
            this.ComponentIndex = 0;
        },

        setPosition:function(){
            var px = this.Furniture.posx;
            var py = this.Furniture.posy;
            //根据组件的相对坐标放置家具组件
            for(var i=0;i<this.Components.length;i++){
                var compx = this.Components[i].relativex;
                var compy = this.Components[i].relativey;
                this.Components[i].setPosition(px+compx,py+compy);
            }
        },

        add: function(Component){
            this.Components[this.ComponentIndex] = Component;
            this.ComponentIndex++;
        },

        clear:function(){
            this.Components = [];
            this.ComponentIndex = 0;
        },

        get: function(componentId){
            for(var i=0;i<this.Components.length;i++)
            {
                if(this.Components[i].componentid == componentId) return this.Components[i];
            }
        },

        remove:function(componentId){
            for(var i=0;i<this.ComponentIndex && i<this.Components.length;i++){
                if(this.Components[i].componentid == componentId) this.Components[i] = this.Components[i+1];
            }
            this.ComponentIndex--;
        },

        Count: function(){
            return this.ComponentIndex;
        }

    });


    return Furniture;
});