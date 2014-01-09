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
        this.width = 657;
        this.height = 518;
        this.addChildAt(this.getBg(),0);

        this.addChildAt(this.getBtn(0),1);
        this.addChildAt(this.getBtn(1),1);
        this.addChildAt(this.getBtn(2),1);
        this.addChildAt(this.getBtn(3),1);

        this.addChildAt(new CloseBtn({x:562,y:0},function(){
            if(Views.MainView.hasChild(Views.MainView.rechargeContainer))
                Views.MainView.removeChild(Views.MainView.rechargeContainer);
        }),1);
    };

    RechargeContainer.prototype.getBtn = function(id){
        var btnSize = 105;
        var cx = 1+ btnSize*id;
        var cy = 478;
        var margin = 30;
        var px = 74 +(btnSize + margin)*id;
        var py = 254;
        var btn = new Q.Button({image:LoadedImages.rechargeui.image,x:px,y:py,width:btnSize,height:btnSize,
            up:{rect:[cx,cy,btnSize,btnSize]},
            down:{rect:[cx,cy,btnSize,btnSize]}
        });
        btn.addEventListener(events[2], function(e)
        {
            //删除充值窗口
            if(Views.MainView.hasChild(Views.MainView.rechargeContainer))
                Views.MainView.removeChild(Views.MainView.rechargeContainer);
            //删除充值确认框
            if(Views.MainView.hasChild(Views.MainView.dialogRecharge))
                Views.MainView.removeChild(Views.MainView.dialogRecharge);
            //生成充值确认框
            Views.MainView.dialogRecharge = new DialogRecharge({},id);
            Views.MainView.addChild(Views.MainView.dialogRecharge);
            Views.MainView.displayer.SetDisplayObjectSize(Views.MainView.dialogRecharge,Views.MainView.getCurrentHeight(),Views.MainView.designHeight);
            Views.MainView.displayer.SetDisplayObjectCenter(Views.MainView.dialogRecharge,Views.MainView);
        });
        return btn;
    };


    RechargeContainer.prototype.getBg = function(){
        return new Q.Bitmap({image:LoadedImages.rechargeui.image,x:0,y:40,width:this.width,height:this.height-40,rect:[0,0,this.width,this.height-40]});
    };
    return RechargeContainer;
});