/**
 * Created with JetBrains WebStorm.
 * User: john
 * Date: 13-2-14
 * Time: 上午9:58
 * To change this template use File | Settings | File Templates.
 */
define(['Item'],function(Food) {
    var ItemManager = Class.extend({
        init: function() {
            this.items = new Array();
            this.itemIndex = 0;
        },
        add: function(id,foodname,xiaohaoshijian,tiaozhishijian,starclass){
            this.items[this.foodIndex] = new Item(id,foodname,xiaohaoshijian,tiaozhishijian,starclass,5);
            this.itemIndex++;
        },

        add:function(citem){
            this.items.push(citem);
        },

        get: function(id){
            for(var i=0;i<this.items.length;i++)
            {
                if(this.items[i].itemid == id) return this.items[i];
            }
            return -1;
        },

        clear:function(){
            this.items = [];
            this.itemIndex = 0;
        },

        remove:function(id){
            var hasItem = false;
            for(var i=0;i<this.itemIndex && i<this.items.length;i++){
                if(this.items[i].itemid == id)
                {
                    hasItem = true;                    
                    this.items.splice(i,1);
                }
            }
            if(hasItem) this.itemIndex--;
        },

        Count: function(){
            return this.itemIndex;
        }

    });
    return ItemManager;
});