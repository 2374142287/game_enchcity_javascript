/**
 * Created with JetBrains WebStorm.
 * User: john
 * Date: 13-3-3
 * Time: 下午7:56
 * To change this template use File | Settings | File Templates.
 */
define(['Furniture'],function(Furniture) {
    var FurnitureManager = Class.extend({
        init: function() {
            this.Furnitures = new Array();
            this.FurnitureIndex = 0;
        },

        add: function(Furniture){
            this.Furnitures[this.FurnitureIndex] = Furniture;
            this.FurnitureIndex++;
        },

        clear:function(){
            this.Furnitures = [];
            this.FurnitureIndex = 0;
        },
        get: function(furnitureid){
            for(var i=0;i<this.Furnitures.length;i++)
            {
                if(this.Furnitures[i].Furniture.userfurnitureid == furnitureid) return this.Furnitures[i];
            }
        },

        remove:function(furnitureid){
            for(var i=0;i<this.FurnitureIndex && i<this.Furnitures.length;i++){
                if(this.Furnitures[i].Furniture.furnitureid == furnitureid) this.Furnitures[i] = this.Furnitures[i+1];
            }
            this.FurnitureIndex--;
        },

        Count: function(){
            return this.FurnitureIndex;
        }
    });
    return FurnitureManager;
});