/**
 * Created with JetBrains WebStorm.
 * User: john
 * Date: 13-2-14
 * Time: 上午10:02
 * To change this template use File | Settings | File Templates.
 */
define(['jquery',winSize+'/FoodButton',winSize+'/FoodInfo'],function($,FoodButton,FoodInfo){
    var FoodContainer = function(food)
    {
        FoodContainer.superClass.constructor.call(this);
        this.init(food);
    };

    Q.inherit(FoodContainer, Q.DisplayObjectContainer);

    FoodContainer.prototype.init = function(food){
        //this.iconSize = 106;
        //库存量指示半径
        this.CircleSize = 5;
        //库存量指示位置
        this.CircleX = 85;
        this.CircleY = 74;// 10;
        this.CircleMargin = 3;
        this.food = food;
        var foodBtn = new FoodButton(this.food,function(food){
            /*
            if(!Views.MainView.IsShowFoodRectificater){
                Views.MainView.ShowRectificateContainer();
                Views.MainView.IsShowFoodRectificater = !Views.MainView.IsShowFoodRectificater;
            }else{
                Views.MainView.RectificateContainer.addFood(food);
            }*/
            //是否显示调制框
            if(!Views.MainView.IsShowFoodRectificater){
                //点击显示食品详情
                if(Views.MainView.hasChild(Views.MainView.foodInfo)) Views.MainView.removeChild(Views.MainView.foodInfo);
                Views.MainView.foodInfo = new FoodInfo(food);//Views.MainView.ToolBarContainer.foodManager.get(i));
                Views.MainView.addChildAt(Views.MainView.foodInfo,3);
                Views.MainView.displayer.SetDisplayObjectSize(Views.MainView.foodInfo,Views.MainView.getCurrentHeight(),Views.MainView.designHeight);
                Views.MainView.displayer.SetDisplayObjectCenter(Views.MainView.foodInfo,Views.MainView);
            }else{
                Views.MainView.RectificateContainer.addFood(food);
            }
        });
        this.addChildAt(foodBtn,0);
    };

    FoodContainer.prototype.SetStockNumber = function(){
        for(var i=0;i<this.food.quantity/100&&i<5;i++){
            var Circle = this.GetCircle(this.CircleX,this.CircleY-(this.CircleSize*2+this.CircleMargin)*i);
            this.addChildAt(Circle,1);
        }
    };

    FoodContainer.prototype.GetCircle = function(px,py){
        var g = new Q.Graphics({width:12, height:12, x:px, y:py});
        g.drawCircle(2, 2, this.CircleSize).beginFill("#6EFF5B").endFill().cache();
        return g;
    };

    return FoodContainer;
});

