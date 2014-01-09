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
        this.width = 860;
        this.height = 200;
        this.x = 0;
        this.y = 260;

        this.childx = 27;
        this.childy = 22;
        this.childSize  = 84;
        this.childMargin = 18;

        this.MaxRectificater = 8;

        this.startbtn = this.startBtn();
        this.addChildAt(this.GetBg(),0);
        this.addChildAt(this.startbtn,2);
        this.startbtn.setEnabled(false);
        this.addChildAt(this.getUpgradeBtn(),2);
        //存取食物
        this.Rectificaters = new Array();
        this.rectificaterIndex = 0;
        
        this.FoodContainer = this.getFoodContainer();
        this.DisableContainer = this.getFoodContainer();
        this.FoodContainer.addChildAt(this.DisableContainer,0);
        this.addChildAt(this.FoodContainer,1);
        this.ShowFood();
    };

    rectificateContainer.prototype.GetBg = function(){
        var bg = new Q.Bitmap({image:LoadedImages.foodbg.image,x:0,y:0,rect:[90,305,860,200]});
        return bg;
    };

    rectificateContainer.prototype.ShowDisable = function(){
        if(this.FoodContainer.contains(this.DisableContainer)) this.FoodContainer.removeChild(this.DisableContainer);
        this.DisableContainer = this.getFoodContainer();
        trace("rectificateContainer.ShowDisable: Player.foodcook="+Player.foodcook);
        for(var i = Player.foodcook;i<this.MaxRectificater;i++){
            this.DisableContainer.addChildAt(this.getDisableContainer(i),0);
        }
        this.FoodContainer.addChildAt(this.DisableContainer,0);
    };

    rectificateContainer.prototype.getFoodContainer = function(){
        return new Q.DisplayObjectContainer({x:0,y:0,width:this.width,height:this.height});
    };

    rectificateContainer.prototype.showRectificateFoods = function()
    {
        for(var i=0;i<Views.MainView.ToolBarContainer.rectiManager.Count();i++) {
            this.addFood(Views.MainView.ToolBarContainer.rectiManager.foods[i]);
        }
    };
    rectificateContainer.prototype.ShowFood = function(){
        this.FoodContainer.removeAllChildren();
        this.ShowDisable();
        for(var i=0;i<this.rectificaterIndex;i++){
            this.Rectificaters[i].x = this.childx +(this.childSize + this.childMargin)*i;
            this.Rectificaters[i].y = this.childy;
            this.FoodContainer.addChildAt(this.Rectificaters[i],0);
            trace("this.FoodContainer.children"+this.FoodContainer.children.length);
        }
    };

    rectificateContainer.prototype.addFood = function(food){
        //控制调制容器数量小于Player.RctificateNumber
        if(!this.hasChild(food)&&this.rectificaterIndex<Player.foodcook){
            Views.MainView.ToolBarContainer.rectiManager.add(food);
            this.Rectificaters[this.rectificaterIndex] = new Rectificater(food);
            this.rectificaterIndex ++;
            Views.MainView.ItemsContainer.FoodsContainer.RectificateContainer.startbtn.setEnabled(true);
            this.ShowFood();
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
        Views.MainView.ItemsContainer.FoodsContainer.RectificateContainer.startbtn.setEnabled(false);
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
        Views.MainView.ToolBarContainer.rectiManager.remove(food.foodid);
    };

    rectificateContainer.prototype.RemoveById = function(id){
        trace("RemoveById:"+id);
        Views.MainView.ToolBarContainer.rectiManager.remove(this.Rectificaters[id].food.foodid);
        for(var i=id;i<this.rectificaterIndex;i++){
            this.Rectificaters[i] = this.Rectificaters[i+1];
        }
        this.Rectificaters[this.rectificaterIndex-1] = "";
        this.rectificaterIndex --;
        if(this.rectificaterIndex<=0) Views.MainView.ItemsContainer.FoodsContainer.RectificateContainer.startbtn.setEnabled(false);
        this.ShowFood();
    };

    rectificateContainer.prototype.RemoveFrist = function(){
        this.RemoveById(0);
    };

    rectificateContainer.prototype.rectificate = function(){
       if(Views.MainView.ItemsContainer.FoodsContainer.RectificateContainer.rectificaterIndex>0)
       {
           this.setFoodButtonDisable();
       }else{
           Views.MainView.ItemsContainer.FoodsContainer.RectificateContainer.startbtn.setEnabled(true);
           Sockets.send_ReqFoodAllData();
       }
        for(var i=0;i<1&&i<Views.MainView.ItemsContainer.FoodsContainer.RectificateContainer.rectificaterIndex;i++){
            trace("startRectificate i="+Views.MainView.ItemsContainer.FoodsContainer.RectificateContainer.rectificaterIndex);
            Views.MainView.ItemsContainer.FoodsContainer.RectificateContainer.Rectificaters[i].startRectificate();
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
	var self =this;
        var btn = new Q.Button({image:LoadedImages.foodui.image,x:0,y:0, width:this.childSize, height:this.childSize,
            up:{rect:[1360,1,this.childSize,this.childSize]},
            //over:{rect:[1420,301,this.childSize,this.childSize]},
            down:{rect:[1360,1,this.childSize,this.childSize]}
        });
        btn.addEventListener(events[0], function(e) {
            var propid = Views.MainView.ToolBarContainer.propShopManager.getByType("D").propid;
            if(propid != -1)
            {
                Sockets.send_ReqPropUse(propid,userid);
            }
        });
        return btn;
    };

    rectificateContainer.prototype.getDisableBg = function(){
        return new Q.Bitmap({image:LoadedImages.foodui.image,x:0,y:0,width:this.childSize,height:this.childSize,rect:[1117,301,this.childSize,this.childSize]});
    };

    rectificateContainer.prototype.startBtn = function(){
        return this.getBtn(0,function(){
            trace("Start Button");
            Views.MainView.ItemsContainer.FoodsContainer.RectificateContainer.startbtn.setEnabled(false);
            Sockets.send_ReqFoodYielding();
        });
    };


    //显示升级食品窗口
    rectificateContainer.prototype.getUpgradeBtn = function(){
        return this.getBtn(1,function(){
            Views.MainView.showFoodUpgradeContainer();
        });
    };

    rectificateContainer.prototype.getBtn = function(id,action){
        var btnWidth = 209;
        var btnHeight = 58;
        var btnpMargin = 55;
        var btncMargin = 1;
        var px = 190 + (btnWidth + btnpMargin)*id;
        var cy = 0 + (btnHeight+btncMargin)*id;
        var btn = new Q.Button({image:LoadedImages.itemui.image,x:px,y:133, width:btnWidth, height:btnHeight,
            up:{rect:[0,cy,btnWidth,btnHeight]},
            down:{rect:[0,cy,btnWidth,btnHeight]}
        });

        btn.addEventListener(events[2], function(e)
        {
            action();
        });
        return btn;
    };

    return rectificateContainer;
});