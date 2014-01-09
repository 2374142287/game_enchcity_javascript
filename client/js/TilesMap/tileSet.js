/**
 * Created with JetBrains WebStorm.
 * User: john
 * Date: 13-2-25
 * Time: 下午2:34
 * To change this template use File | Settings | File Templates.
 */
define(function() {

    var tileSet = Class.extend({
        init:function(){
            //this.tileheight = 425;
            //this.tilewidth = 144;
            //this.imageheight = 425;
            //this.imagewidth = 288;
			this.tileheight = 473;
            this.tilewidth = 160;
            this.imageheight = 473;
            this.imagewidth = 320;
            this.firstgid = 1;
            this.image = "ground.png";
            this.margin = 0;
            this.spacing = 0;
            this.tileproperties = new Array();
        },
        addtileProperties:function(id){
            this.tileproperties.push(id);
        }
    });

    return tileSet;
});