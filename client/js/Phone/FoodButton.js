/**
 * Created with JetBrains WebStorm.
 * User: john
 * Date: 13-2-14
 * Time: 下午3:01
 * To change this template use File | Settings | File Templates.
 */
define(['jquery'],function($){
    var FoodButton = function(props,food,action)
    {
        FoodButton.superClass.constructor.call(this,props);
        this.init(food,action);
    };

    Q.inherit(FoodButton, Q.DisplayObjectContainer);

    FoodButton.prototype.init = function(food,action){
        //this.iconSize = Views.MainView.ToolBarContainer.FunctionBarContainer.childSize;
        this.width = food.photow;
        this.height = food.photoh;
        this.Btn = this.GetBtn(food,action);
        this.addChildAt(this.Btn,0);
    };

    FoodButton.prototype.setEnabled = function(enabled){
        this.Btn.setEnabled(enabled);
    },

    FoodButton.prototype.GetBtn = function(food,action){
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

    return FoodButton;
});