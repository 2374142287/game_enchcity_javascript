/**
 * Created with JetBrains WebStorm.
 * User: john
 * Date: 13-2-11
 * Time: 下午3:34
 * To change this template use File | Settings | File Templates.
 */
define(['TilesMap/mapCoordinater'], function(MapCoordinater) {

    var fitment = Class.extend({
        init: function(id,px,py,sizex,sizey,img,tilewidth,tileheight,mapwidth,opacity,rect,isblock){
            this.id=id;
            this.mapCoordinater = new MapCoordinater;
            this.tilewidth = tilewidth;
            this.tileheight = tileheight;
            this.mapwidth = mapwidth;
            this.sizex = sizex;
            this.sizey = sizey;
            this.x = px + this.sizex - 1;
            this.y = py + this.sizey - 1;
            this.imgx = this.getImgx(px,py);
            this.imgy = this.getImgy(px,py);
            this.imgy = this.imgy + this.sizex * this.tileheight/2;
            this.image = new Q.Bitmap({image:img,x:this.imgx,y:this.imgy,alpha:opacity,rect:rect});
            this.isblock = isblock;
        },

        getImgx:function(x,y){
            return this.mapCoordinater.getGx(x,y,this.tilewidth,this.mapwidth);
        },
        getImgy:function(x,y){
            return this.mapCoordinater.getGy(x,y,this.tileheight);
        },

        setPosition:function(px,py){
            //放入最高层
            this.x = px + this.sizex - 1;
            this.y = py + this.sizey - 1;
            //this.imgx = this.getImgx(px,py);
            //this.imgy = this.getImgy(px,py);
            //根据最高层的tiled计算图像应放入的坐标
            this.imgx = this.getImgx(this.x,this.y);
            this.imgy = this.getImgy(this.x,this.y);
            //然后在X向做补偿
            this.imgx = this.imgx - this.sizey * this.tilewidth/4;
            this.image.x = this.imgx;
            this.image.y = this.imgy;
        }
    });
    return fitment;
});