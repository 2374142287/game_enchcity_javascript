/**
 * Created with JetBrains WebStorm.
 * User: john
 * Date: 13-2-14
 * Time: 下午1:48
 * To change this template use File | Settings | File Templates.
 */

define(['jquery',winSize+'/Rectificater'],function($,Rectificater){
    var rectificateContainer = function()
    {
        rectificateContainer.superClass.constructor.call(this);
        this.init();
    };

    Q.inherit(rectificateContainer, Q.DisplayObjectContainer);

    rectificateContainer.prototype.init = function(){
        this.width = 1030;
        this.height = 240;
        this.x = 424;
        this.y = 585;

        this.childx = 37;
        this.childy = 35;
        this.childSize  = 106;
        this.childMargin = 15;

        this.MaxRectificater = 8;

        this.startbtn = this.startBtn();
        this.addChildAt(this.GetBg(),0);
        this.addChildAt(this.startbtn,2);
        this.addChildAt(this.closeBtn(),2);
        //存取食物
        this.Rectificaters = new Array();
        this.rectificaterIndex = 0;
        this.FoodContainer = this.getFoodContainer();
        this.addChildAt(this.FoodContainer,1);
        this.ShowFood();
    };

    rectificateContainer.prototype.GetBg = function(){
        var bg = new Q.Bitmap({image:LoadedImages.foodui.image,x:0,y:0,rect:[424,585,1030,240]});
        return bg;
    };

    rectificateContainer.prototype.ShowDisable = function(){
        for(var i = Player.foodcook;i<this.MaxRectificater;i++){
            this.addChildAt(this.getDisableContainer(i),2);
        }
    };

    rectificateContainer.prototype.getFoodContainer = function(){
        return new Q.DisplayObjectContainer({x:0,y:0,width:this.width,height:this.height});
    };

    rectificateContainer.prototype.ShowFood = function(){
        this.FoodContainer.removeAllChildren();
        this.ShowDisable();
        for(var i=0;i<this.rectificaterIndex;i++){
            this.Rectificaters[i].x = this.childx +(this.childSize + this.childMargin)*i;
            this.Rectificaters[i].y = this.childy;
            this.FoodContainer.addChildAt(this.Rectificaters[i],0);
        }
    };

    rectificateContainer.prototype.addFood = function(food){
        //控制调制容器数量小于Player.RctificateNumber
        if(!this.hasChild(food)&&this.rectificaterIndex<Player.foodcook){
            this.Rectificaters[this.rectificaterIndex] = new Rectificater(food);
            this.rectificaterIndex ++;
            this.ShowFood();

            trace("rectificateContainer:"+this.getFoodIds());
        }
    };

    rectificateContainer.prototype.getFoodIds = function(){
        var Ids = new Array();
        for(var i=0;i<this.rectificaterIndex&&i<this.Rectificaters.length;i++){
            Ids.push(this.Rectificaters[i].food.foodid);
        }
        return Ids;
    };

    rectificateContainer.prototype.setFoodButtonDisable = function(){
        for(var i=0;i<this.rectificaterIndex;i++){
            this.Rectificaters[i].foodButton.setEnabled(false);
        }
        Views.MainView.RectificateContainer.startbtn.setEnabled(false);
    };

    rectificateContainer.prototype.hasChild = function(food){
        for(var i=0;i<this.rectificaterIndex;i++){
            if(this.Rectificaters[i].food.foodid == food.foodid) return true;
        }
        return false;
    };

    rectificateContainer.prototype.RemoveByFoodId = function(id){
        for(var i=0;i<this.rectificaterIndex;i++){
            if(this.Rectificaters[i].food.foodid == id){
                this.RemoveById(i);
            }
        }
    };

    rectificateContainer.prototype.Remove = function(food){
        for(var i=0;i<this.rectificaterIndex;i++){
            if(this.Rectificaters[i].food == food){
                this.RemoveById(i);
            }
        }
    };

    rectificateContainer.prototype.RemoveById = function(id){
        for(var i=id;i<this.rectificaterIndex;i++){
            this.Rectificaters[i] = this.Rectificaters[i+1];
        }
        this.Rectificaters[this.rectificaterIndex-1] = "";
        this.rectificaterIndex --;
        this.ShowFood();
    };

    rectificateContainer.prototype.RemoveFrist = function(){
        this.RemoveById(0);
    };

    rectificateContainer.prototype.rectificate = function(){
        //Views.MainView.RectificateContainer.removeChild(Views.MainView.RectificateContainer.startbtn);
       if(Views.MainView.RectificateContainer.rectificaterIndex>0)
       {
           this.setFoodButtonDisable();
       }else{
           Views.MainView.RectificateContainer.startbtn.setEnabled(true);
           Sockets.send_ReqFoodAllData();
       }
        for(var i=0;i<1&&i<Views.MainView.RectificateContainer.rectificaterIndex;i++){
            Views.MainView.RectificateContainer.Rectificaters[i].startRectificate();
        }

    };
    rectificateContainer.prototype.rectificateNext = function(){
        this.RemoveFrist();
        this.rectificate();
    };

    rectificateContainer.prototype.getDisableContainer = function(i){
        var px =this.childx +(this.childSize + this.childMargin)*i;
        var py = this.childy;
        var container = new Q.DisplayObjectContainer({x:px,y:py,width:this.childSize,height:this.childSize});
        container.addChildAt(this.getDisableBg(),0);
        container.addChildAt(this.getDisableImg(),1);
        return container;
    };

    rectificateContainer.prototype.getDisableImg = function(){
        var btn = new Q.Button({image:LoadedImages.foodui.image,x:0,y:0, width:this.childSize, height:this.childSize,
            up:{rect:[1280,301,this.childSize,this.childSize]},
            //over:{rect:[1420,301,this.childSize,this.childSize]},
            down:{rect:[1420,301,this.childSize,this.childSize]}
        });
        return btn;
    };

    rectificateContainer.prototype.getDisableBg = function(){
        return new Q.Bitmap({image:LoadedImages.foodui.image,x:0,y:0,width:this.childSize,height:this.childSize,rect:[1117,301,this.childSize,this.childSize]});
    };

    rectificateContainer.prototype.startBtn = function(){
        return this.getBtn(324,515,function(){
            Views.MainView.RectificateContainer.startbtn.setEnabled(false);
            Sockets.send_ReqFoodYielding();
        });
    };

    rectificateContainer.prototype.closeBtn = function(){
        return this.getBtn(531,722,function(){
            Views.MainView.HideRectificateContainer();
            Views.MainView.IsShowFoodRectificater = false;
        });
    };

    rectificateContainer.prototype.getBtn = function(px,cx,action){
        var btnwidth = 175;
        var btnheight = 50;
        var btn = new Q.Button({image:LoadedImages.foodui.image,x:px,y:173, width:btnwidth, height:btnheight,
            up:{rect:[cx,331,btnwidth,btnheight]},
            //over:{rect:[cx,331+72,btnwidth,btnheight]},
            down:{rect:[cx,402,btnwidth,btnheight]}
        });

        btn.addEventListener(events[2], function(e)
        {
            action();
        });
        return btn;
    };

    return rectificateContainer;
});