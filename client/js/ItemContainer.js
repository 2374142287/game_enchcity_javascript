/**
 * Created with JetBrains WebStorm.
 * User: john
 * Date: 13-2-28
 * Time: 上午12:11
 * To change this template use File | Settings | File Templates.
 */
define(['Resources'],function(Resources){
    var ItemContainer = function(prop,item,callback)
    {
        ItemContainer.superClass.constructor.call(this,prop,item,callback);
        this.init(item,callback);
    };

    Q.inherit(ItemContainer, Q.DisplayObjectContainer);

    ItemContainer.prototype.init = function(item,callback){
        this.iconSize = 106;
        this.Resources = new Resources();
        this.addChild(this.getIcon(item,callback));
        this.addChildAt(this.SetStockNumber(item.stockNumber),1);
    };

    ItemContainer.prototype.getIcon = function(item,callback){
        var img = this.Resources.getImage(item.Photo);
        var btn = new Q.Button({image:img,width:this.iconSize+1, height:this.iconSize+1,
                up:{rect:item.PhotoRect},
                down:{rect:item.PhotoRect}});
        btn.addEventListener(events[2], function(e)
        {
            callback(item);
        });
        return btn;
    };

    ItemContainer.prototype.SetStockNumber = function(){
        for(var i=0;i<this.food.stockNumber;i++){
            var Circle = this.GetCircle(this.CircleX,this.CircleY-(this.CircleSize*2+this.CircleMargin)*i);
            this.addChildAt(Circle,1);
        }
    };

    ItemContainer.prototype.GetCircle = function(px,py){
        var g = new Q.Graphics({width:12, height:12, x:px, y:py});
        g.drawCircle(2, 2, this.CircleSize).beginFill("#6EFF5B").endFill().cache();
        return g;
    };

    return ItemContainer;
});