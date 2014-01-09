/**
 * Created with JetBrains WebStorm.
 * User: john
 * Date: 13-3-10
 * Time: 上午11:31
 * To change this template use File | Settings | File Templates.
 */
/**
 * Created with JetBrains WebStorm.
 * User: john
 * Date: 13-3-10
 * Time: 上午12:43
 * To change this template use File | Settings | File Templates.
 */
define(function(){
    var ShopItemContainer = function(props,item)
    {
        ShopItemContainer.superClass.constructor.call(this,props);
        this.init(item);
    };

    Q.inherit(ShopItemContainer, Q.DisplayObjectContainer);

    ShopItemContainer.prototype.init = function(item){
        this.width = 185;
        this.height = 360;

        this.item = item;

        this.addChildAt(this.getBg(),1);
        this.addChildAt(this.getIcon(),1);
        this.addChildAt(this.getTitle(),1);
        this.addChildAt(this.getBtn(this.item),2);
        this.eventChildren = false;
        this.useHandCursor = true;
        if(!this.item.islocked){
            this.addEventListener(events[2], function(e)
            {
                //显示窗口
                //生成确认框
                var price =0;
                var showMoney = '';
                if(typeof(item.gold) != 'undefined' && item.gold > 0)
                {
                    price = item.gold;
                    showMoney = '金币';
                }
                else if(typeof(item.xingbei) != 'undefined' && item.xingbei > 0)
                {
                    price = item.xingbei;
                    showMoney = '星贝';
                }
                Views.MainView.HidePropShopContainer();
                Views.MainView.showDialogYesAndNo(item.name+"<br/>"+item.comment +"<br/>是否花费"+price+showMoney+"购买?",
                    function(){
                        Sockets.send_ReqPropBuy(item.propid);
                    },
                    function(){
                        Views.MainView.showPropShopContainer();
                    });
            });
        }
        this.showMsg();
    };

    ShopItemContainer.prototype.clickSelectItem = function(){
        //显示窗口
        var self = this;
        //生成确认框
        var price =0;
        var showMoney = '';
        if(typeof(self.item.gold) != 'undefined' && self.item.gold > 0)
        {
            price = self.item.gold;
            showMoney = '金币';
        }
        else if(typeof(self.item.xingbei) != 'undefined' && self.item.xingbei > 0)
        {
            price = self.item.xingbei;
            showMoney = '星贝';
        }
        Views.MainView.HidePropShopContainer();
        Views.MainView.showDialogYesAndNo(self.item.name+"<br/>"+self.item.comment +"<br/>是否花费"+price+showMoney+"购买?",
            function(){
                Sockets.send_ReqPropBuy(self.item.propid);
            },
            function(){
                Views.MainView.showPropShopContainer();
            });
    };

    ShopItemContainer.prototype.getBtn = function(item){
        var self = this;
        var btn = new Q.Button({image:LoadedImages.foodui.image,x:0,y:0, width:this.width, height:this.height,
            up:{rect:[1290,186,1,1]},
            down:{rect:[1290,186,1,1]}
        });
        //btn.scaleX = this.width;
        //btn.scaleY = this.height;
        if(!this.item.islocked){
            btn.addEventListener(events[2], function(e)
            {
                //显示窗口
                //生成确认框
                var price =0;
                var showMoney = '';
                if(typeof(item.gold) != 'undefined' && item.gold > 0)
                {
                    price = item.gold;
                    showMoney = '金币';
                }
                else if(typeof(item.xingbei) != 'undefined' && item.xingbei > 0)
                {
                    price = item.xingbei;
                    showMoney = '星贝';
                }
                Views.MainView.HidePropShopContainer();
                Views.MainView.showDialogYesAndNo(item.name+"<br/>"+item.comment +"<br/>是否花费"+price+showMoney+"购买?",
                    function(){
                        Sockets.send_ReqPropBuy(self.item.propid);
                    },
                    function(){
                    Views.MainView.showPropShopContainer();
                });
            });
        }
        return btn;
    };

    ShopItemContainer.prototype.getIcon = function(){
        return new Q.Bitmap({image:Resources.getImage(this.item.photo),x:22,y:26,width:this.item.photow,height:this.item.photoh,
            rect:[this.item.photox,this.item.photoy,this.item.photow,this.item.photoh]});
    };

    ShopItemContainer.prototype.getTitle = function(){
        var h = 28;
        var w = 160;
        return new Q.Text({font:h+"px arial",x:13,y:189,width:w,height:h, color:"#000",text:this.item.name,textAlign:"center"});
    };

    ShopItemContainer.prototype.showMsg = function(){
        if(this.item.islocked){
            this.addChildAt(this.getTxt(0,"未解锁"),1);
        }
        else{
            if(typeof(this.item.gold) != 'undefined' && this.item.gold > 0)
            {
                this.addChildAt(this.getTxt(0,"价格:"+this.item.gold),1);
                this.addChildAt(this.getPriceIcon(0),1);
            }
            else if(typeof(this.item.xingbei) != 'undefined' && this.item.xingbei > 0)
            {
                this.addChildAt(this.getTxt(0,"价格:"+this.item.xingbei),1);
                this.addChildAt(this.getPriceIcon(1),1);
            }
        }
    };

    ShopItemContainer.prototype.getPriceIcon = function(type){
        var cx = 1120;
        if(type == 1) cx = 1141;
        var cy =86;
        var childSize = 20;
        var bmp = new Q.Bitmap({image:LoadedImages.foodui.image,x:140,y:240,rect:[cx,cy,childSize,childSize]});
        return bmp;
    };

    //其他说明，未定
    ShopItemContainer.prototype.getTxt = function(id,text){
        var h = 22;
        var w = 150;
        var py = 240 + (h+5)*id;
        return new Q.Text({font:h+"px arial",x:15,y:py,width:w,height:h, color:"#000",text:text,textAlign:"center"});
    };

    ShopItemContainer.prototype.getBg = function(){
        return new Q.Bitmap({image:LoadedImages.propui.image,x:0,y:0,width:this.width,height:this.height,rect:[0,0,this.width,this.height]});
    };
    return ShopItemContainer;
});