/**
 * Created with JetBrains WebStorm.
 * User: john
 * Date: 13-2-25
 * Time: 下午2:44
 * To change this template use File | Settings | File Templates.
 * 地图生成器
 */

define(['TilesMap/map','TilesMap/layer','TilesMap/tileSet'],function(Map,Layer,TileSet) {

    var MapGenerater = Class.extend({
        init:function(width,height,tilewidth,tileheight,tilecuheight,tileimageWidth){
            this.mapWidth = width;
            this.mapHeight = height;
            //地板尺寸
            this.tileWidth = tilewidth;
            this.tileHeight = tileheight;
            //tiles高度尺寸
            this.tileCurrentheight = tilecuheight;

            this.map = new Map();
            this.map.tilewidth = this.tileWidth;
            this.map.tileheight = this.tileHeight;
            this.map.height = this.mapWidth;
            this.map.width = this.mapHeight;
            //添加层
            this.addLayer(this.mapWidth,this.mapHeight);
            //添加图块
            this.addTileSet(this.tileCurrentheight,this.tileWidth,this.tileCurrentheight,tileimageWidth);
        },
        getMap:function(){
           return this.map;
        },
        addLayer:function(width,height){
            var layer = new Layer();
            layer.setSize(width,height);
            this.map.layers.push(layer);
        },
        addTileSet:function(tileheight,tilewidth,imageheight,imagewidth){
            var tileset = new TileSet();
            tileset.tileheight = tileheight;
            tileset.tilewidth = tilewidth;
            tileset.imageheight = imageheight;
            tileset.imagewidth = imagewidth;
            tileset.addtileProperties(2);
            this.map.tilesets.push(tileset);
        }
    });

    return MapGenerater;
});
