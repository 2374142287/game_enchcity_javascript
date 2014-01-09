/**
 * Created with JetBrains WebStorm.
 * User: john
 * Date: 13-3-9
 * Time: 下午7:54
 * To change this template use File | Settings | File Templates.
 */
define([winSize+'/CloseBtn',winSize+'/FoodsContainer',winSize+"/ItemContainer"],function(CloseBtn,foodsContainer,itemContainer){
    var ItemsContainer = function(props)
    {
        ItemsContainer.superClass.constructor.call(this, props);
        this.init();
    };

    Q.inherit(ItemsContainer, Q.DisplayObjectContainer);

    ItemsContainer.prototype.init = function(){
        this.width = Views.DisplayObjectsDefine.displayer.fixWinWidth;
        this.height = Views.DisplayObjectsDefine.displayer.fixWinHeight;

        this.addChildAt(this.getBg(),0);
        this.addChildAt(this.getFoodBtn(),1);
        this.addChildAt(this.getItemBtn(),1);
        //关闭按钮
        this.addChildAt(new CloseBtn({x:15,y:20},function(){
            Views.MainView.HideItemsContainer();
        }),1);
        this.FoodsContainer = new foodsContainer();
        this.addChildAt(this.FoodsContainer,2);
        this.ItemContainer = new itemContainer();
    };

    ItemsContainer.prototype.showFoods= function(){
        this.FoodsContainer.showFood();
    };

    ItemsContainer.prototype.getFoodBtn = function()
    {
        var self = this;
        return this.getBtn(0,function(){
            if(self.contains(self.ItemContainer)) self.removeChild(self.ItemContainer);
            self.addChildAt(self.FoodsContainer,2);
            self.FoodsContainer.showFood();
        });
    };
    ItemsContainer.prototype.getItemBtn = function()
    {
        var self = this;
        return this.getBtn(2,function(){
            if(self.contains(self.FoodsContainer)) self.removeChild(self.FoodsContainer);
            self.addChildAt(self.ItemContainer,2);
            self.ItemContainer.showItems();
        });
    };
    ItemsContainer.prototype.clickItemBtn = function(){
        var self = this;
        if(self.contains(self.FoodsContainer)) self.removeChild(self.FoodsContainer);
        self.addChildAt(self.ItemContainer,2);
        self.ItemContainer.showItems();
    };
    ItemsContainer.prototype.getBtn = function(id,callback){
        var btnWidth = 82;
        var btnHeight = 192;
        var btnMargin = 1;
        var py = 87 + btnHeight*id/2;
        var cx = 210 + (btnWidth+btnMargin)*id;
        var btn = new Q.Button({image:LoadedImages.itemui.image,x:8,y:py,width:btnWidth,height:btnHeight,
            up:{rect:[cx + (btnWidth+btnMargin)*0,0,btnWidth,btnHeight]},
            down:{rect:[cx + (btnWidth+btnMargin)*1,0,btnWidth,btnHeight]}
        });
        btn.addEventListener(events[2], function(e)
        {
            callback();
        });
        return btn;
    };
    ItemsContainer.prototype.getBg = function(){
        return new Q.Bitmap({image:LoadedImages.itembg.image,x:0,y:0,width:this.width,height:this.height,
        rect:[0,0,this.width,this.height]});
    };

    return ItemsContainer;
});