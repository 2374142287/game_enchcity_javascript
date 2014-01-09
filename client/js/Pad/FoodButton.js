/**
 * Created with JetBrains WebStorm.
 * User: john
 * Date: 13-2-14
 * Time: 下午3:01
 * To change this template use File | Settings | File Templates.
 */
define(['jquery'],function($){
    var FoodButton = function(food,action)
    {
        FoodButton.superClass.constructor.call(this);
        this.init(food,action);
    };

    Q.inherit(FoodButton, Q.DisplayObjectContainer);

    FoodButton.prototype.init = function(food,action){
        //this.iconSize = Views.MainView.ToolBarContainer.FunctionBarContainer.childSize;
        this.width = food.photow;
        this.height = food.photoh;
        //库存量指示半径
        this.CircleSize = 5;
        //库存量指示位置
        this.CircleX = 85;
        this.CircleY = 74;// 10;
        this.CircleMargin = 3;
        this.Btn = this.GetBtn(food,action);
        this.addChildAt(this.Btn,0);
    };

    FoodButton.prototype.setEnabled = function(enabled){
        this.Btn.setEnabled(enabled);
    },

    FoodButton.prototype.GetBtn = function(food,action){
        //trace("w"+food.photow+"h:"+food.photoh+"x:"+food.photox+"y:"+food.photoy);
        var btn = new Q.Button({image:Resources.getImage(food.photo), width:food.photow, height:food.photoh,
            up:{rect:[food.photox,food.photoy,food.photow,food.photoh]},
            down:{rect:[food.photox,food.photoy,food.photow,food.photoh]}
        });

        btn.addEventListener(events[2], function(e)
        {
            action(food);
        });
        return btn;
    };
    /*
    FoodButton.prototype.GetIcon = function(food,action){
        var sx = food.id * self.iconSize;
        var btn = new Q.Button({image:LoadedImages.foodui.image, width:self.iconSize, height:self.iconSize,
            up:{rect:[sx,0,self.iconSize,self.iconSize]},
            over:{rect:[sx,0,self.iconSize,self.iconSize]},
            down:{rect:[sx,0,self.iconSize,self.iconSize]}
        });

        btn.addEventListener(events[2], function(e)
        {
            action(food);
        });
        return btn;
    };
    */
    return FoodButton;
});