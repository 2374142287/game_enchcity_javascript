/**
 * Created with JetBrains WebStorm.
 * User: john
 * Date: 13-2-25
 * Time: 下午2:26
 * To change this template use File | Settings | File Templates.
 */
define(function() {

    var layer = Class.extend({
        init:function(){
            this.height = 0;
            this.width = 0;
            this.visible = true;
            this.opacity = 1;
            this.x = 0;
            this.y = 0;
            this.data = new Array();
        },

        setSize:function(width,height){
            this.height = height;
            this.width = width;
            var arr=new Array();

            var dataIndex = 0;
            for (var i = 0; i < this.width; i++){
            for (var j = 0; j < this.height; j++)
            {
                if (i != 0 && j != 0) this.data[dataIndex++] = 1;
                else this.data[dataIndex++] = 2;
            }}
            this.data[1] = 1;
        }
    });

    return layer;
});