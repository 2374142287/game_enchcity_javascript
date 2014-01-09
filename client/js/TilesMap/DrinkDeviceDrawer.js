/**
 * Created with JetBrains WebStorm.
 * User: john
 * Date: 13-3-20
 * Time: 下午11:30
 * To change this template use File | Settings | File Templates.
 */
define(['Worker'],function(Worker) {
    var DrinkDeviceDrawer = Class.extend({
        init: function(mapWidth){
            this.components = new Array();
            this.mapWidth = mapWidth;
        },
        addFurniture:function(component){
            this.components.push(component);
        },

        getWorker:function(){
            if(this.components.length>=2)
            {
                var drinker = Views.MainView.ToolBarContainer.workerManager.getAlcohol();
                var dir = 'right';
                if(this.components[0].dirphoto=='furnituresLeft') dir = 'left';
                var px = 0;
                var py = 0;
                if(this.components[0].posx == this.components[1].posx) px = this.components[0].posx;
                else px = (this.components[0].posx+this.components[1].posx)/2;
                if(this.components[0].posy == this.components[1].posy) py = this.components[0].posy;
                else py = (this.components[0].posy+this.components[1].posy)/2;
                var worker = new Worker({},drinker,"manBartenderDanniel.gif",px,py,dir,this.mapWidth);
                return worker;
            }
        },

        getItem:function(id){
            var self = this;
            switch(id){
                case 0:
                    return this.components[0].componentid < this.components[1].componentid ? this.components[0] : this.components[1];
                case 1:
                    return self.getWorker();
                case 2:
                    return this.components[0].componentid > this.components[1].componentid ? this.components[0] : this.components[1];
            }
        }
    });
    return DrinkDeviceDrawer;
});

