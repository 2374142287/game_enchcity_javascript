/**
 * Created with JetBrains WebStorm.
 * User: john
 * Date: 13-2-23
 * Time: 上午10:04
 * To change this template use File | Settings | File Templates.
 */

define([winSize+'/ShopItemContainer',winSize+'/CloseBtn'],function(shopItemContainer,closeBtn){
    var PropShopContainer = function()
    {
        PropShopContainer.superClass.constructor.call(this);
        this.init();
    };

    Q.inherit(PropShopContainer, Q.DisplayObjectContainer);

    PropShopContainer.prototype.init = function(){
        this.width = Views.DisplayObjectsDefine.displayer.fixWinWidth;
        this.height = Views.DisplayObjectsDefine.displayer.fixWinHeight;

        this.addChildAt(this.getBg(),0);
        //关闭按钮
        this.addChildAt(new closeBtn({x:15,y:20},function(){
            Views.MainView.HidePropShopContainer();
        }),1);
        //显示用户金币数
        this.addChildAt(this.getTxtGold(),2);
        this.addChildAt(this.getTxtXingbei(),2);
        //一起显示食品数量
        this.showItemsNum = 4;
        this.ItemInfoList = new Q.DisplayObjectContainer({x:89,y:114,width:860,height:375});
        this.addChildAt(this.ItemInfoList,2);
        this.currentShowItemId = 0;
        this.addChildAt(this.getNextBtn(),3);
        this.addChildAt(this.getLastBtn(),3);
        //this.addChildAt(this.getFurnituresBtn(),2);
        //this.addChildAt(this.getPropsBtn(),2);
        //显示家具页还是道具页
        this.isSelectFurniture = false;
    };

    PropShopContainer.prototype.showFurnitures = function(){
        this.isSelectFurniture = true;
        if(this.currentShowItemId<0) this.currentShowItemId = 0;
        else if(this.currentShowItemId>=(Views.MainView.ToolBarContainer.furnitureManager.Count())) this.currentShowItemId = Views.MainView.ToolBarContainer.furnitureManager.Count()-1;

        this.ItemInfoList.removeAllChildren();
        for(var i=this.currentShowItemId;i<(this.showItemsNum+this.currentShowItemId) && i<Views.MainView.ToolBarContainer.furnitureManager.Count();i++){
            var PropContainer = new shopItemContainer({x:59+185*(i-this.currentShowItemId),y:13},Views.MainView.ToolBarContainer.furnitureManager.Furnitures[i].Furniture);
            this.ItemInfoList.addChild(PropContainer);
        }
    };

    PropShopContainer.prototype.showProps = function(){
        this.isSelectFurniture = false;
        if(this.currentShowItemId<0) this.currentShowItemId = 0;
        else if(this.currentShowItemId>=(Views.MainView.ToolBarContainer.propShopManager.Count())) this.currentShowItemId = Views.MainView.ToolBarContainer.propShopManager.Count()-1;

        this.ItemInfoList.removeAllChildren();
        for(var i=this.currentShowItemId;i<(this.showItemsNum+this.currentShowItemId) && i<Views.MainView.ToolBarContainer.propShopManager.Count();i++){
            var PropContainer = new shopItemContainer({x:59+185*(i-this.currentShowItemId),y:13},Views.MainView.ToolBarContainer.propShopManager.props[i]);
            this.ItemInfoList.addChild(PropContainer);
        }
    };

    PropShopContainer.prototype.getTxtGold = function(){
        return this.showTxt(0,Player.gold);
    };
    PropShopContainer.prototype.getTxtXingbei = function(){
        return this.showTxt(1,Player.xingbei);
    };

    PropShopContainer.prototype.showTxt = function(id,text){
        var h = 33;
        var w = 275;
        var px = 311 + (w+65)*id;
        return new Q.Text({font:h+"px arial",x:px,y:42,width:w,height:h, color:"#fff",text:text,textAlign:"left"});
    };

    PropShopContainer.prototype.clickNextBtn = function(){
        var self = this;
        self.currentShowItemId++;
        self.showProps();
    };

    PropShopContainer.prototype.getNextBtn = function(){
        var self = this;
        return this.getArrBtn(1,function(){
            self.currentShowItemId++;
            if(self.isSelectFurniture) self.showFurnitures();
            else self.showProps();
        });
    };
    PropShopContainer.prototype.getLastBtn = function(){
        var self = this;
        return this.getArrBtn(0,function(){
            self.currentShowItemId--;
            if(self.isSelectFurniture) self.showFurnitures();
            else self.showProps();
            trace('this.isSelectFurniture:'+self.isSelectFurniture);
        });
    };
    PropShopContainer.prototype.getArrBtn = function(id,callback){
        var btnWidth = 41;
        var btnHeight = 94;
        var btnpMargin = 747;
        var btncMargin = 1;
        var px = 105 + (btnWidth + btnpMargin)*id;
        var cx = 1250 + (btnWidth+btncMargin)*id;
        var btn = new Q.Button({image:LoadedImages.foodui.image,x:px,y:250, width:btnWidth, height:btnHeight,
            up:{rect:[cx,86,btnWidth,btnHeight]},
            down:{rect:[cx,86,btnWidth,btnHeight]}
        });

        btn.addEventListener(events[2], function(e)
        {
            callback();
        });
        return btn;
    };

    PropShopContainer.prototype.getFurnituresBtn = function()
    {
        var self = this;
        return this.getBtn(0,function(){
            self.currentShowItemId = 0;
            self.showFurnitures();
        });
    };
    PropShopContainer.prototype.getPropsBtn = function()
    {
        var self = this;
        return this.getBtn(2,function(){
            self.currentShowItemId = 0;
            self.showProps();
        });
    };
    PropShopContainer.prototype.getBtn = function(id,callback){
        var btnWidth = 82;
        var btnHeight = 192;
        var btnMargin = 1;
        var py = 110 + btnHeight*id/2;
        var cx = 542 + (btnWidth+btnMargin)*id;
        var btn = new Q.Button({image:LoadedImages.itemui.image,x:8,y:py,width:btnWidth,height:btnHeight,
            up:{rect:[cx + (btnWidth+btnMargin)*0,0,btnWidth,btnHeight]},
            down:{rect:[cx + (btnWidth+btnMargin)*1,0,btnWidth,btnHeight]}
        });
        btn.addEventListener(events[2], function(e)
        {
            callback();
        });
        return btn;
    };

    PropShopContainer.prototype.getBg = function(){
        return new Q.Bitmap({image:LoadedImages.shopbg.image,x:0,y:0,width:this.width,height:this.height,
        rect:[0,0,this.width,this.height]});
    };
    return PropShopContainer;
});