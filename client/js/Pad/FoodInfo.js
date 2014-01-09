/**
 * Created with JetBrains WebStorm.
 * User: john
 * Date: 13-2-27
 * Time: 上午1:23
 * To change this template use File | Settings | File Templates.
 */
define(function(){
    var FoodInfo = function(food)
    {
        FoodInfo.superClass.constructor.call(this);
        this.init(food);
    };

    Q.inherit(FoodInfo, Q.DisplayObjectContainer);

    FoodInfo.prototype.init = function(food){
        this.food = food;
        this.width = 582;
        this.height = 332;
        this.addChildAt(this.getBg(),0);
        this.addChildAt(this.getTitle(food.name),1);
        this.addChildAt(this.getTiaozhishiJian(food.yieldingtime),1);
        this.addChildAt(this.getKuCunLiang(food.quantity),1);
        this.drawStar(food.star);
        this.addChildAt(this.getUpgradeBtn(),2);
        this.addChildAt(this.getRectBtn(),2);
        this.addChildAt(this.getCloseBtn(),2);
        trace("food.foodName:"+food.name);
    };

    FoodInfo.prototype.getTitle = function(text) {
        return this.getTxt(text,23,38);
    };
    FoodInfo.prototype.getTiaozhishiJian= function(text){
        return this.getTxt("调制时间:"+text,107,35);
    };
    FoodInfo.prototype.getKuCunLiang= function(text){
        return this.getTxt("库存量:"+text,145,35);
    };
    FoodInfo.prototype.getTxt = function(text,py,height){
        var px=55;
        var w = 280;
        return new Q.Text({font:(height - 2)+"px arial",x:px,y:py,width:w,height:height,lineWidth:w,color:"#fff",text:text,textAlign:"left"});
    };
    FoodInfo.prototype.drawStar = function(starNum){
       for(var i=0;i<starNum;i++){
           this.addChildAt(this.getYellowStar(i),1);
       }
        for(var i=starNum; i<5; i++){
            this.addChildAt(this.getWhiteStar(i),1);
        }
    };
    FoodInfo.prototype.getYellowStar = function(id){
        var bmp = this.getStar(0);
        bmp.x = 55 + (4+bmp.width)*id;
        bmp.y = 70;
        return bmp;
    };
    FoodInfo.prototype.getWhiteStar = function(id){
        var bmp = this.getStar(1);
        bmp.x = 55 + (4+bmp.width)*id;
        bmp.y = 70;
        return bmp;
    };
    FoodInfo.prototype.getStar = function(id){
        var width = 31;
        var height = 30;
        var cx = 1 + (width + 1)*id;
        var cy = 296;
        return new Q.Bitmap({image:LoadedImages.foodinfoui.image,x:0,y:0,width:width,height:height,rect:[cx,cy,width,height]});
    };
    FoodInfo.prototype.getUpgradeBtn = function(star){
        var btn = this.getBtn(0);
        btn.addEventListener(events[2], function(e)
        {
            var starNum = "一";
            switch(star){
                case 1:
                    starNum = "一";
                    break;
                case 2:
                    starNum = "二";
                    break;
                case 3:
                    starNum = "三";
                    break;
                case 4:
                    starNum = "四";
                    break;
                case 5:
                    starNum = "五";
                    break;
            }
            if(Views.MainView.hasChild(Views.MainView.foodInfo))
                Views.MainView.removeChild(Views.MainView.foodInfo);
            Views.MainView.showCommonDialog("升级需要“"+starNum+"星秘方”，是否升级?",function(){});
        });
        return btn;
    };
    FoodInfo.prototype.getRectBtn = function(){
        var btn = this.getBtn(1);
        btn.addEventListener(events[2], function(e)
        {
            if(Views.MainView.hasChild(Views.MainView.foodInfo))
                Views.MainView.removeChild(Views.MainView.foodInfo);
            Views.MainView.ShowRectificateContainer();
            Views.MainView.IsShowFoodRectificater = !Views.MainView.IsShowFoodRectificater;
        });
        return btn;
    };
    FoodInfo.prototype.getCloseBtn = function(){
        var btn = this.getBtn(2);
        btn.addEventListener(events[2], function(e)
        {
            if(Views.MainView.hasChild(Views.MainView.foodInfo))
                Views.MainView.removeChild(Views.MainView.foodInfo);
        });
        return btn;
    };
    FoodInfo.prototype.getBtn = function(id){
        var width = 174;
        var height = 48;
        var margin = 1;
        var cx = 1;
        var cy = margin + (height + margin)*id*2;
        var px = 22 + (width + 10)*id;
        var py = 252;
        return new Q.Button({image:LoadedImages.foodinfoui.image,x:px,y:py,width:width,height:height,
            up:{rect:[cx,cy,width,height]},
            down:{rect:[cx,cy + (height + margin),width,height]}
        });
    };
    FoodInfo.prototype.getBg = function(){
        return new Q.Bitmap({image:LoadedImages.foodinfoui.image,x:0,y:0,width:this.width,height:this.height,rect:[176,1,this.width,this.height]});
    };

    return FoodInfo;
});