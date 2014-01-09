/**
 * Created with JetBrains WebStorm.
 * User: john
 * Date: 13-2-8
 * Time: 下午4:53
 * To change this template use File | Settings | File Templates.
 */
define(function() {

    var tileBg = Class.extend({
        init: function(id,px,py,img,imgx,imgy,opacity,rect,isblock){
            this.id=id;
            this.image = new Q.Bitmap({image:img,x:imgx,y:imgy,alpha:opacity,rect:rect});
            this.x = px;
            this.y = py;
            this.isblock = isblock;

            this.image.addEventListener(events[2],function(){
                alert("x:"+this.x+",y:"+this.y);
            });
        }
    });
    return tileBg;
});