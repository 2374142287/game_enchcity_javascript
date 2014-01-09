/**
 * Created with JetBrains WebStorm.
 * User: john
 * Date: 13-3-3
 * Time: 下午8:16
 * To change this template use File | Settings | File Templates.
 */
define(function(){
    var FurnitureContainer = function(Furniture)
    {
        FurnitureContainer.superClass.constructor.call(this);
        this.init(Furniture);
    };

    Q.inherit(FurnitureContainer, Q.DisplayObjectContainer);

    FurnitureContainer.prototype.init = function(Furniture){
        this.Furniture = Furniture;
        this.FurnitureBtn = this.GetBtn(function(furniture){
            if(furniture.islocked==1) Views.MainView.showDialogMessage("对不起，您当前的酒馆等级不够！");
        });
        this.addChildAt(this.FurnitureBtn,0);
    };

    FurnitureContainer.prototype.GetBtn = function(action){
        //trace("w"+food.photow+"h:"+food.photoh+"x:"+food.photox+"y:"+food.photoy);
        var self =this;
        //若锁定则显示锁定图
        if(this.Furniture.Furniture.islocked == 1){
            var btn = new Q.Button({image:LoadedImages.furnituresiconlock.image, width:this.Furniture.Furniture.photow, height:this.Furniture.Furniture.photoh,
                up:{rect:[this.Furniture.Furniture.photox,this.Furniture.Furniture.photoy,this.Furniture.Furniture.photow,this.Furniture.Furniture.photoh]},
                down:{rect:[this.Furniture.Furniture.photox,this.Furniture.Furniture.photoy,this.Furniture.Furniture.photow,this.Furniture.Furniture.photoh]}
            });
        }else{
            var btn = new Q.Button({image:Resources.getImage(this.Furniture.Furniture.photo), width:this.Furniture.Furniture.photow, height:this.Furniture.Furniture.photoh,
                up:{rect:[this.Furniture.Furniture.photox,this.Furniture.Furniture.photoy,this.Furniture.Furniture.photow,this.Furniture.Furniture.photoh]},
                down:{rect:[this.Furniture.Furniture.photox,this.Furniture.Furniture.photoy,this.Furniture.Furniture.photow,this.Furniture.Furniture.photoh]}
            });
        }
        btn.addEventListener(events[2], function(e)
        {
            action(self.Furniture.Furniture);
        });
        return btn;
    };

    return FurnitureContainer;
});