/**
 * Created with JetBrains WebStorm.
 * User: dk647
 * QQ 499871835
 */
define(['Wupin'],function(Wupin) {
    var WupinManager = Class.extend({
        init: function() {
            this.Wupins = new Array();
            this.WupinIndex = 0;
        },
        add: function(id,name,price){
            this.Wupins[this.WupinIndex] = new Wupin(id,name,price,5);
            this.WupinIndex++;
        },

        add: function(Wupin){
            if(this.get(Wupin.id) == -1){
                this.Wupins[this.WupinIndex] = Wupin;
                this.WupinIndex++;
            }
        },

        get: function(id){
            for(var i=0;i<this.Wupins.length;i++)
            {
                if(this.Wupins[i].id == id) return this.Wupins[i];
            }
            return -1;
        },

        clear:function(){
            this.Wupins = [];
            this.WupinIndex = 0;
        },

        remove:function(id){
            var hasWupin = false;
            for(var i=0;i<this.WupinIndex && i<this.Wupins.length;i++){
                if(this.Wupins[i].id == id)
                {
                    hasWupin = true;                    
                    this.Wupins.splice(i,1);
                }
            }
            if(hasWupin) this.WupinIndex--;
        },

        Count: function(){
            return this.WupinIndex;
        },

        randomWupinCount: function(){
            for(var i=0; i<this.Wupins.length; i++){
                this.Wupins[i].count = Math.ceil(Math.random()*10);
            }
        }

    });
    return WupinManager;
});