﻿/**
 * Created with JetBrains WebStorm.
 * User: john
 * Date: 13-2-14
 * Time: 下午2:51
 * To change this template use File | Settings | File Templates.
 */
define(['jquery',winSize+'/FoodButton'],function($,FoodButton){
    var Rectificater = function(food)
    {
        Rectificater.superClass.constructor.call(this);
        this.init(food);
    };

    Q.inherit(Rectificater, Q.DisplayObjectContainer);

    Rectificater.prototype.init = function(food){
        this.food = food;
        this.width = food.photow;
        this.height = food.photoh;
        this.foodButton = new FoodButton({},food,this.remove);
        this.addChildAt(this.foodButton,0);
    };

    Rectificater.prototype.remove = function(food){
        Views.MainView.ItemsContainer.FoodsContainer.RectificateContainer.Remove(food);
    };

    Rectificater.prototype.startRectificateFrom = function(allTime,lastTime){
        trace("startRectificate From:"+lastTime + "All:"+ allTime);
        //调制时间
        var lasttime = (allTime - lastTime)*1000;
        var py = this.height * (allTime - lastTime)/allTime;
        var bmp =this.getRectificaterBg();
        bmp.mask = this.getRectificaterMask(py);
        this.addChildAt(bmp,1);
        var timer = new Q.Timer(60);
        timer.addListener(Q.Tween);
        timer.start();
        trace("rectificate Start allTime:"+allTime+" lastTime:"+lasttime);
       
        Q.Tween.to(bmp.mask, {y:0}, {time:lasttime,
            
	    onComplete:function(tween)
            {
                trace("rectificate Next");
            	timer.stop();
            	Views.MainView.ItemsContainer.FoodsContainer.RectificateContainer.rectificateNext();
        }});
    };

    Rectificater.prototype.continueRectificate = function(){
        Views.MainView.ItemsContainer.FoodsContainer.RectificateContainer.setFoodButtonDisable();
        this.startRectificateFrom(this.food.yieldingtime,this.food.remainedtime);
    };

    Rectificater.prototype.startRectificate = function(){
        Views.MainView.ItemsContainer.FoodsContainer.RectificateContainer.setFoodButtonDisable();
         this.startRectificateFrom(this.food.yieldingtime,0);
    };

    Rectificater.prototype.getRectificaterMask = function(py){
        var g = new Q.Graphics({width:this.width, height:this.height, x:0, y:py});//this.height});
        g.drawRect(0, 0, this.width, this.height).beginFill("#000000").endFill().cache();
        return g;
    };
    Rectificater.prototype.getRectificaterBg = function(){
        return new Q.Bitmap({image:LoadedImages.foodui.image,x:0,y:0,width:this.width,height:this.height,rect:[1446,1,this.width,this.height]});
    };
    return Rectificater;
});