/**
 * Created with JetBrains WebStorm.
 * User: john
 * Date: 13-2-25
 * Time: 下午2:22
 * To change this template use File | Settings | File Templates.
 */
define(function() {

    var map = Class.extend({
        init:function(){
            this.height = 0;
            this.width = 0;
            this.tileheight = 72;
            this.tilewidth = 144;
            this.orientation = "isometric";
            this.layers = new Array();
            this.tilesets = new Array();
        }
    });

    return map;
});