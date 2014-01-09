/**
 * Created with JetBrains WebStorm.
 * User: john
 * Date: 13-3-13
 * Time: 下午9:10
 * To change this template use File | Settings | File Templates.
 */


define([winSize+'/FoodButton'],function(FoodButton){
    var FoodUpgradeContainer = function()
    {
        FoodUpgradeContainer.superClass.constructor.call(this);
        this.init();
    };

    Q.inherit(FoodUpgradeContainer, Q.DisplayObjectContainer);

    FoodUpgradeContainer.prototype.init = function(){
        this.width = Views.DisplayObjectsDefine.displayer.fixWinWidth;
        this.height = Views.DisplayObjectsDefine.displayer.fixWinHeight;
        this.addChildAt(this.getBg(),0);
        var row = 0,col = 0;
       for(var i=0;i<Views.MainView.ToolBarContainer.foodManager.Count();i++){
           var iconSize = 84;
           var marginx = 48;
           var maringy = 37;
           var px = 109 + (iconSize + marginx)*col;
           var py = 78 + (iconSize + maringy)*row;
           col++;
           if(col>=6) {
               col = 0;
               row ++;
           }
           var foodButton = new FoodButton({x:px,y:py},Views.MainView.ToolBarContainer.foodManager.foods[i],function(food){
               Views.MainView.HideFoodUpgradeContainer();
               switch(food.star){
                   case 1:
                       Views.MainView.showDialogYesAndNo("是否花费一星秘方:味觉的秘密提升"+food.name+"到二星?",function(){
                           if(food.islocked == 0) Sockets.send_ReqPropUse(7,food.foodid);
                           else Views.MainView.ShowMessage("不能升级未解锁的食品");
                       });
                       break;
                   case 2:
                       Views.MainView.showDialogYesAndNo("是否花费二星秘方:口感的升华提升"+food.name+"到三星?",function(){
                           if(food.islocked == 0) Sockets.send_ReqPropUse(6,food.foodid);
                           else Views.MainView.ShowMessage("不能升级未解锁的食品");
                       });
                       break;
                   case 3:
                       Views.MainView.showDialogYesAndNo("是否花费三星秘方:神奇的魔法提升"+food.name+"到四星?",function(){
                           if(food.islocked == 0) Sockets.send_ReqPropUse(5,food.foodid);
                           else Views.MainView.ShowMessage("不能升级未解锁的食品");
                       });
                       break;
                   case 4:
                       Views.MainView.showDialogYesAndNo("是否花费四星秘方:幸福眷顾提升"+food.name+"到五星?",function(){
                           if(food.islocked == 0) Sockets.send_ReqPropUse(4,food.foodid);
                           else Views.MainView.ShowMessage("不能升级未解锁的食品");
                       });
                       break;
                   case 5:
                       Views.MainView.ShowMessage("当前食品已经达到最高星级！");
                       break;
               }

           });
           this.addChildAt(foodButton,1);
           this.addChildAt(this.getBackBtn(),2);
       }
    };

    FoodUpgradeContainer.prototype.getBackBtn = function()
    {
        return this.getBtn(6,function(){
            Views.MainView.HideFoodUpgradeContainer();
        });
    };


    FoodUpgradeContainer.prototype.getBtn = function(id,action){
        var btnWidth = 209;
        var btnHeight = 58;
        var btncMargin = 1;
        var px = (this.width - btnWidth)/2;
        var cy = 0 + (btnHeight+btncMargin)*id;
        var btn = new Q.Button({image:LoadedImages.itemui.image,x:px,y:430, width:btnWidth, height:btnHeight,
            up:{rect:[0,cy,btnWidth,btnHeight]},
            down:{rect:[0,cy,btnWidth,btnHeight]}
        });

        btn.addEventListener(events[2], function(e)
        {
            action();
        });
        return btn;
    };

    FoodUpgradeContainer.prototype.getBg = function(){
        return new Q.Bitmap({image:LoadedImages.foodupgradebg.image,x:0,y:0,width:this.width,height:this.height,rect:[0,0,this.width,this.height]});
    };

    return FoodUpgradeContainer;
});