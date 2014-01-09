/**
 * Created with JetBrains WebStorm.
 * User: john
 * Date: 13-2-7
 * Time: 下午11:05
 * To change this template use File | Settings | File Templates.
 * 地图中tile元素
 */
define(function() {

    var tiles = Class.extend({
        init: function(id,img,rect,isblock){
            this.id = id;
            this.image = img;
            this.rect = rect;
            this.isblock = isblock;
        }
    });
    return tiles;
});