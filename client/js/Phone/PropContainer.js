/**
 * Created with JetBrains WebStorm.
 * User: john
 * Date: 13-3-10
 * Time: 上午12:43
 * To change this template use File | Settings | File Templates.
 */
define(function(){
    var PropContainer = function(props,prop)
    {
        PropContainer.superClass.constructor.call(this,props);
        this.init(prop);
    };

    Q.inherit(PropContainer, Q.DisplayObjectContainer);

    PropContainer.prototype.init = function(prop){
        this.width = 185;
        this.height = 360;
        /*
        for(var i=0;i<Views.MainView.ToolBarContainer.propShopManager.Count();i++){
            if(Views.MainView.ToolBarContainer.propShopManager.props[i].propid == prop.propid)
            {
                this.prop = Views.MainView.ToolBarContainer.propShopManager.props[i];
                break;
            }
        }*/
        this.prop = prop;
        this.norBg = this.getNorBg();
        this.touBg = this.getTouBg();
        this.addChildAt(this.norBg,1);
        this.addChildAt(this.getIcon(),1);
        this.addChildAt(this.getTitle(),1);
        this.addChildAt(this.getTxt(0,this.prop.comment),1);
        this.addChildAt(this.getQuantity(),1);
        this.addChildAt(this.getBtn(),2);
	this.eventChildren = false;
        this.useHandCursor = true;
	var self = this;
        this.addEventListener(events[2], function(e)
        {
            if(self.contains(self.norBg)){
                self.setSelected();
            }
            else if(self.contains(self.touBg)){
                self.setNormal();
            }
        });
    };

    PropContainer.prototype.getBtn = function(){
        var self = this;
        var btn = new Q.Button({image:LoadedImages.foodui.image,x:0,y:0, width:this.width, height:this.height,
            up:{rect:[1290,186,1,1]},
            down:{rect:[1290,186,1,1]}
        });
        //btn.scaleX = this.width;
        //btn.scaleY = this.height;
        btn.addEventListener(events[2], function(e)
        {
            if(self.contains(self.norBg)){
                self.setSelected();
            }
            else if(self.contains(self.touBg)){
                self.setNormal();
            }
        });
        return btn;
    };

    PropContainer.prototype.setNormal = function(){
        this.removeChild(this.touBg);
        this.addChildAt(this.norBg,0);
    };

    PropContainer.prototype.setSelected = function(){
        var self = this;
        for(var i=0;i<Views.MainView.ItemsContainer.ItemContainer.ItemInfoList.getNumChildren();i++)
        {
             Views.MainView.ItemsContainer.ItemContainer.ItemInfoList.children[i].setNormal();
            if(Views.MainView.ItemsContainer.ItemContainer.ItemInfoList.children[i].prop.propid == self.prop.propid)
                Views.MainView.ItemsContainer.ItemContainer.selectedItemId = i;
        }
        this.removeChild(this.norBg);
        this.addChildAt(this.touBg,0);
    };

    PropContainer.prototype.getIcon = function(){
        return new Q.Bitmap({image:Resources.getImage(this.prop.photo),x:22,y:26,width:this.prop.photow,height:this.prop.photoh,
        rect:[this.prop.photox,this.prop.photoy,this.prop.photow,this.prop.photoh]});
    };

    PropContainer.prototype.getTitle = function(){
        var h = 28;
        var w = 180;
        return new Q.Text({font:h+"px arial",x:10,y:180,width:w,height:h, color:"#000",text:this.prop.name,textAlign:"center"});
    };
    //其他说明，未定
    PropContainer.prototype.getTxt = function(id,text){
        var h = 22;
        var w = 180;
        var py = 226 + (h+5)*id;
        return new Q.Text({font:h+"px arial",x:11,y:py,width:w,height:h, color:"#000",text:text,lineWidth:(this.width - 30),textAlign:"center"});
    };

    PropContainer.prototype.getQuantity = function(){
        var quantity = this.prop.count;
        if(quantity>3) quantity = 3;
        return this.getImgNumber(59,317,1099,86,quantity);
    };

    PropContainer.prototype.getImgNumber = function(px,py,cx,cy,num){
        var childMargin = 3;
        var childSize = 20;
        var container = new Q.DisplayObjectContainer({x:px,y:py,width:(childSize+childMargin)*5,height:childSize});
        for(var i=0;i<num;i++){
            var bmp = new Q.Bitmap({image:LoadedImages.foodui.image,x:(childSize+childMargin)*i,y:0,rect:[cx,cy,childSize,childSize]});
            container.addChild(bmp);
        }
        return container;
    };

    PropContainer.prototype.getNorBg = function(){
        var cx = this.width + 1;
        return new Q.Bitmap({image:LoadedImages.propui.image,x:0,y:0,width:this.width,height:this.height,rect:[cx,0,this.width,this.height]});
    };
    PropContainer.prototype.getTouBg = function(){
        var cx = (this.width + 1)*2;
        return new Q.Bitmap({image:LoadedImages.propui.image,x:0,y:0,width:this.width,height:this.height,rect:[cx,0,this.width,this.height]});
    };
    return PropContainer;
});