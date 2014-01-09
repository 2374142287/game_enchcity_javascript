/**
 * Created with JetBrains WebStorm.
 * User: john
 * Date: 13-3-9
 * Time: 下午8:49
 * To change this template use File | Settings | File Templates.
 */

define([winSize+'/RectificateContainer',winSize+'/FoodContainer'],function(rectificateContainer,foodContainer){
    var FoodsContainer = function()
    {
        FoodsContainer.superClass.constructor.call(this);
        this.init();
    };

    Q.inherit(FoodsContainer, Q.DisplayObjectContainer);

    FoodsContainer.prototype.init = function(){
        this.width = 860;
        this.height = 460;
        this.x = 90;
        this.y = 46;
        //一起显示食品数量
        this.showFoodsNum = 3;
        this.FoodInfoList = new Q.DisplayObjectContainer({x:0,y:0,width:860,height:260});
        this.addChildAt(this.FoodInfoList,2);
        this.currentShowFoodId = 0;
        //显示前三个食品
        this.RectificateContainer = new rectificateContainer();
        this.addChildAt(this.RectificateContainer,2);
        this.addChildAt(this.getNextBtn(),2);
        this.addChildAt(this.getLastBtn(),2);
    };

    FoodsContainer.prototype.showFood = function(){
        if(this.currentShowFoodId<0) this.currentShowFoodId = 0;
        else if(this.currentShowFoodId>=(Views.MainView.ToolBarContainer.foodManager.Count())) this.currentShowFoodId = Views.MainView.ToolBarContainer.foodManager.Count()-1;

        this.FoodInfoList.removeAllChildren();
        for(var i=this.currentShowFoodId;i<(this.showFoodsNum+this.currentShowFoodId) && i<Views.MainView.ToolBarContainer.foodManager.Count();i++){
            var FoodContainer = new foodContainer({x:67+(237+7)*(i-this.currentShowFoodId),y:8},Views.MainView.ToolBarContainer.foodManager.foods[i]);
            this.FoodInfoList.addChild(FoodContainer);
        }
    };

    FoodsContainer.prototype.getNextBtn = function(){
        var self = this;
        return this.getBtn(1,function(){
            self.currentShowFoodId++;
            self.showFood();
        });
    };

    FoodsContainer.prototype.getLastBtn = function(){
        var self = this;
        return this.getBtn(0,function(){
            self.currentShowFoodId--;
            self.showFood();
        });
    };

    FoodsContainer.prototype.getBtn = function(id,callback){
        var btnWidth = 41;
        var btnHeight = 94;
        var btnpMargin = 747;
        var btncMargin = 1;
        var px = 15 + (btnWidth + btnpMargin)*id;
        var cx = 1250 + (btnWidth+btncMargin)*id;
        var btn = new Q.Button({image:LoadedImages.foodui.image,x:px,y:91, width:btnWidth+10, height:btnHeight+10,
            up:{rect:[cx,86,btnWidth,btnHeight]},
            down:{rect:[cx,86,btnWidth,btnHeight]}
        });

        btn.addEventListener(events[2], function(e)
        {
            callback();
        });
        return btn;
    };
    return FoodsContainer;
});