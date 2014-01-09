/**
 * Created with JetBrains WebStorm.
 * User: john
 * Date: 13-2-14
 * Time: 上午9:58
 * To change this template use File | Settings | File Templates.
 */
define(['Food'],function(Food) {
    var FoodManager = Class.extend({
        init: function() {
            this.foods = new Array();
            this.foodIndex = 0;
        },
        add: function(id,foodname,xiaohaoshijian,tiaozhishijian,starclass){
            this.foods[this.foodIndex] = new Food(id,foodname,xiaohaoshijian,tiaozhishijian,starclass,5);
            this.foodIndex++;
        },

        add: function(food){
            if(this.get(food.foodid) == -1){
                this.foods[this.foodIndex] = food;
                this.foodIndex++;
            }
        },

        get: function(id){
            for(var i=0;i<this.foods.length;i++)
            {
                if(this.foods[i].foodid == id) return this.foods[i];
            }
            return -1;
        },

        clear:function(){
            this.foods = [];
            this.foodIndex = 0;
        },

        remove:function(id){
            var hasFood = false;
            for(var i=0;i<this.foodIndex && i<this.foods.length;i++){
                if(this.foods[i].foodid == id)
                {
                    hasFood = true;                    
                    this.foods.splice(i,1);
                }
            }
            if(hasFood) this.foodIndex--;
        },

        Count: function(){
            return this.foodIndex;
        }

    });
    return FoodManager;
});