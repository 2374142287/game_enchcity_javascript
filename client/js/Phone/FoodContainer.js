/**
 * Created with JetBrains WebStorm.
 * User: john
 * Date: 13-2-14
 * Time: 上午10:02
 * To change this template use File | Settings | File Templates.
 */
define(function(){
    var FoodContainer = function(props,food)
    {
        FoodContainer.superClass.constructor.call(this,props);
        this.init(food);
    };

    Q.inherit(FoodContainer, Q.DisplayObjectContainer);

    FoodContainer.prototype.init = function(food){
        this.width = 237;
        this.height = 244;
        this.food = food;

        this.eventChildren = false;
        this.useHandCursor = true;
        //是否已经解锁
        if(this.food.islocked==1){
            this.addChildAt(this.getLockedBg(),0);
        }
        else{
            this.addChildAt(this.getBg(),0);
            this.addChildAt(this.getIcon(),1);
            this.addChildAt(this.getTitle(),1);
            this.addChildAt(this.getStarNumber(),1);
            this.addChildAt(this.getQuantity(),1);
            this.addChildAt(this.getQuantityText(),1);
            this.addChildAt(this.getYieldTimeText(),1);
            this.addChildAt(this.getBtn(),2);
            var self = this;
            this.addEventListener(events[2], function(e)
            {
                Views.MainView.ItemsContainer.FoodsContainer.RectificateContainer.addFood(self.food);
            });
        }
    };
    FoodContainer.prototype.getBtn = function(){
        var btn = new Q.Button({image:LoadedImages.foodui.image,x:0,y:0, width:this.width, height:this.height,
            up:{rect:[1290,186,this.width,this.height]},
            down:{rect:[1290,186,this.width,this.height]}
        });
        return btn;
    };

    FoodContainer.prototype.getStarNumber = function(){
        return this.getImgNumber(108,67,1141,86,this.food.star);
    };

    FoodContainer.prototype.getQuantity = function(){
        var quantity = this.food.quantity/500;
        if(quantity>5) quantity = 5;
        return this.getImgNumber(103,105,1099,86,quantity);
    };

    FoodContainer.prototype.getImgNumber = function(px,py,cx,cy,num){
        var childMargin = 3;
        var childSize = 20;
        var container = new Q.DisplayObjectContainer({x:px,y:py,width:(childSize+childMargin)*5,height:childSize});
        for(var i=0;i<num;i++){
            var bmp = new Q.Bitmap({image:LoadedImages.foodui.image,x:(childSize+childMargin)*i,y:0,rect:[cx,cy,childSize,childSize]});
            container.addChild(bmp);
        }
        return container;
    };

    FoodContainer.prototype.getTitle = function(){
        var h = 26;
        var w = 130;
        return new Q.Text({font:h+"px arial",x:104,y:29,width:w,height:h, color:"#000",text:this.food.name,textAlign:"center"});
    };

    FoodContainer.prototype.getQuantityText = function(){
        return this.getTxt(0,"库存量:");
    };

    FoodContainer.prototype.getYieldTimeText = function(){
        return this.getTxt(1,"调制时间:"+this.food.yieldingtime);
    };

    FoodContainer.prototype.getTxt = function(id,text){
        var h = 22;
        var w = 239;
        var py = 104 + (h+h)*id;
        return new Q.Text({font:h+"px arial",x:16,y:py,width:w,height:h, color:"#000",text:text,textAlign:"left"});
    };

    FoodContainer.prototype.getIcon = function(){
        return new Q.Bitmap({image:Resources.getImage(this.food.photo),x:16,y:13,width:this.food.photow,height:this.food.photoh,
            rect:[this.food.photox,this.food.photoy,this.food.photow,this.food.photoh]});
    };

    FoodContainer.prototype.getLockedBg = function(){
        return new Q.Bitmap({image:LoadedImages.foodui.image,x:0,y:0,width:this.width,height:this.height,rect:[1 + (this.width + 1),86,this.width,this.height]});
    };

    FoodContainer.prototype.getBg = function(){
        return new Q.Bitmap({image:LoadedImages.foodui.image,x:0,y:0,width:this.width,height:this.height,rect:[1,86,this.width,this.height]});
    };

    return FoodContainer;
});

