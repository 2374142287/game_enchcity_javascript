/**
 * Created with JetBrains WebStorm.
 * User: john
 * Date: 13-2-28
 * Time: 下午6:16
 * To change this template use File | Settings | File Templates.
 * 充值星贝窗口
 */
define([winSize+'/CloseBtn',winSize+'/DialogRecharge'],function(CloseBtn,DialogRecharge){
    var RechargeContainer = function(prop)
    {
        RechargeContainer.superClass.constructor.call(this,prop);
        this.init();
    };

    Q.inherit(RechargeContainer, Q.DisplayObjectContainer);

    RechargeContainer.prototype.init = function(){
        this.width = Views.DisplayObjectsDefine.displayer.fixWinWidth;
        this.height = Views.DisplayObjectsDefine.displayer.fixWinHeight;
        this.addChildAt(this.getBg(),0);

        this.addChildAt(this.getBtn(0),1);
        this.addChildAt(this.getBtn(1),1);
        this.addChildAt(this.getBtn(2),1);
        this.addChildAt(this.getBtn(3),1);

        //关闭按钮
        this.addChildAt(new CloseBtn({x:15,y:20},function(){
            Views.MainView.HideRechargeContainer();
        }),1);
    };

    RechargeContainer.prototype.getBtn = function(id){
        var btnSize = 136;
        var margin = 45;
        var cx = 0+ (btnSize + margin)*id;
        var cy = 541;
        var px = 200 +(btnSize + margin)*id;
        var py = 200;
        var btn = new Q.Button({image:LoadedImages.rechargeui.image,x:px,y:py,width:btnSize,height:btnSize,
            up:{rect:[cx,cy,btnSize,btnSize]},
            down:{rect:[cx,cy,btnSize,btnSize]}
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


    RechargeContainer.prototype.getBg = function(){
        return new Q.Bitmap({image:LoadedImages.rechargeui.image,x:0,y:0,width:this.width,height:this.height,rect:[0,0,this.width,this.height]});
    };
    return RechargeContainer;
});