/**
 * Created with JetBrains WebStorm.
 * User: john
 * Date: 13-2-28
 * Time: 下午6:16
 * To change this template use File | Settings | File Templates.
 * 充值星贝窗口
 */
define([winSize+'/CloseBtn',winSize+'/MessageListContainer',winSize+'/RechargeListContainer'],function(CloseBtn,MessageListContainer,RechargeListContainer){
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
        this.rechargeBtn = this.getRechargeBtn();
        this.rechrageRecordBtn = this.getRechrageRecordBtn();
        this.costRecordBtn = this.getCostRecordBtn();
        this.addChildAt(this.rechargeBtn,1);
        this.addChildAt(this.rechrageRecordBtn,1);
        this.addChildAt(this.costRecordBtn,1);
        this.rechargeBtn.changeState('down');
        this.clearContainer();
        this.rechargeListContainer = new RechargeListContainer();
        this.addChildAt(this.rechargeListContainer,1);

        //关闭按钮
        this.addChildAt(new CloseBtn({x:15,y:20},function(){
            Views.MainView.HideRechargeContainer();
        }),9);
    };


    RechargeContainer.prototype.getRechargeBtn = function(){
        var self = this;
        return this.getBtn(0,function(){
            self.rechargeBtn.changeState('down');
            self.rechrageRecordBtn.changeState('up');
            self.costRecordBtn.changeState('up');
            self.clearContainer();
            self.rechargeListContainer = new RechargeListContainer();
            self.addChildAt(self.rechargeListContainer,1);
        });
    };

    RechargeContainer.prototype.getRechrageRecordBtn = function(){
        var self = this;
        return this.getBtn(1,function(){
            Sockets.send_reqRechargeRecords();
            self.rechargeBtn.changeState('up');
            self.rechrageRecordBtn.changeState('down');
            self.costRecordBtn.changeState('up');
            self.clearContainer();
            self.RechrageRecordContainer = new MessageListContainer();
            self.addChildAt(self.RechrageRecordContainer,1);
            self.RechrageRecordContainer.setShowType('rechargeRecord');
            self.RechrageRecordContainer.showInfos();
        });
    };

    RechargeContainer.prototype.getCostRecordBtn = function(){
        var self = this;
        return this.getBtn(2,function(){
            Sockets.send_reqCostRecords();
            self.rechargeBtn.changeState('up');
            self.rechrageRecordBtn.changeState('up');
            self.costRecordBtn.changeState('down');
            self.clearContainer();
            self.CostRecordContainer = new MessageListContainer();
            self.addChildAt(self.CostRecordContainer,1);
            self.CostRecordContainer.setShowType('costRecord');
            self.CostRecordContainer.showInfos();
        });
    };

    RechargeContainer.prototype.clearContainer = function(){
        var self = this;
        self.removeChild(self.rechargeListContainer);
        self.removeChild(self.RechrageRecordContainer);
        self.removeChild(self.CostRecordContainer);
    };

    RechargeContainer.prototype.getBtn = function(id,callback){
        var iconWidth = 192;
        var iconHeight = 87;
        var iconcMargin = 1;
        var iconpMargin = 25;
        var px = 270 + (iconWidth+iconpMargin)*id;
        var py = 10;
        var cx = 0;
        var cy = 0 + (iconHeight+iconcMargin)*id;
        var btn = new Q.Button({image:LoadedImages.rechargeui.image, x:px, y:py, width:iconWidth, height:iconHeight,
            up:{rect:[cx,cy,iconWidth,iconHeight]},
            down:{rect:[cx + iconWidth + iconcMargin,cy,iconWidth,iconHeight]}
        });
        btn.addEventListener(events[2], function(e)
        {
            callback();
        });
        return btn;
    };


    RechargeContainer.prototype.getBg = function(){
        return new Q.Bitmap({image:LoadedImages.messageui.image,x:0,y:0,width:this.width,height:this.height,rect:[0,0,this.width,this.height]});
    };
    return RechargeContainer;
});