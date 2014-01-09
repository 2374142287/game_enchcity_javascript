/**
 * Created with JetBrains WebStorm.
 * User: john
 * Date: 13-5-9
 * Time: 下午10:15
 * To change this template use File | Settings | File Templates.
 */
define(function() {
    var RechargeListContainer = function(prop)
    {
        RechargeListContainer.superClass.constructor.call(this,prop);
        this.init();
    };

    Q.inherit(RechargeListContainer, Q.DisplayObjectContainer);

    RechargeListContainer.prototype.init = function(){
        this.width = Views.DisplayObjectsDefine.displayer.fixWinWidth;
        this.height = Views.DisplayObjectsDefine.displayer.fixWinHeight;

        this.addChildAt(this.getPointBg(),0);
        this.addChildAt(this.getPointsText("拥有游戏点数："+Player.xingbei + "点",0),1);
        this.addChildAt(this.getPointsText("1元 = 100点",1),2);
        this.addChildAt(this.getBtn(0),3);
        this.addChildAt(this.getBtn(1),3);
        this.addChildAt(this.getBtn(2),3);
        this.addChildAt(this.getBtn(3),3);

    };

    RechargeListContainer.prototype.getPointsText = function(text,id){
        var height = 33;
        var maxWidth = 490;
        var maxHeight = 69;
        var px = 236;
        var py = 143 + (maxHeight - height)/2  + maxHeight * id;
        return new Q.Text({font:(height-2)+"px arial",x:px,y:py,width:maxWidth,height:maxHeight, color:"#fff",text:text,textAlign:"center"});
    };

    RechargeListContainer.prototype.getPointBg = function(){
        var px = 236;
        var py = 143;
        var cx = 385;
        var cy = 256;
        var width = 490;
        var height = 69;
        return new Q.Bitmap({image:LoadedImages.rechargeui.image,x:px,y:py,width:width,height:height,rect:[cx,cy,width,height]});
    };

    RechargeListContainer.prototype.getBtn = function(id){
        var btnWidth = 135;
        var btnHeight = 170;
        var margin = 42;
        var cx = 386+ (btnWidth + margin)*id;
        var cy = 85;
        var px = 150 +(btnWidth + margin)*id;
        var py = 310;
        var btn = new Q.Button({image:LoadedImages.rechargeui.image,x:px,y:py,width:btnWidth,height:btnHeight,
            up:{rect:[cx,cy,btnWidth,btnHeight]},
            down:{rect:[cx,cy,btnWidth,btnHeight]}
        });
        btn.addEventListener(events[2], function(e)
        {
            //删除充值窗口
            Views.MainView.HideRechargeContainer();
            //生成充值确认框
            Views.MainView.showDialogRechargeContainer(id);

        });
        return btn;
    };
    return RechargeListContainer;
});