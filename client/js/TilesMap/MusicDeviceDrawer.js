/**
 * Created with JetBrains WebStorm.
 * User: john
 * Date: 13-3-20
 * Time: 下午10:05
 * To change this template use File | Settings | File Templates.
 */
define(['Worker'],function(Worker) {
    var MusicDeviceDrawer = Class.extend({
        init: function(mapWidth){
            this.components = new Array();
            this.mapWidth = mapWidth;
        },
        addFurniture:function(component){
            this.components.push(component);
        },

        getWorker:function(){
            if(this.components.length>0)
            {
                var musicer = Views.MainView.ToolBarContainer.workerManager.getDJ();
                var dir = 'right';
                if(this.components[0].dirphoto=='furnituresLeft') dir = 'left';

                var px = this.components[0].posx + this.components[0].sizex - 1;
                var py = this.components[0].posy + this.components[0].sizey - 1;

                var worker = new Worker({},musicer,"manMusicMeimei.gif",px,py,dir,this.mapWidth);
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
    return MusicDeviceDrawer;
});

