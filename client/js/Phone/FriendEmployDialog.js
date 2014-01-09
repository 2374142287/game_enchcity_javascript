/**
 * Created with JetBrains WebStorm.
 * User: john
 * Date: 13-2-18
 * Time: 下午8:37
 * To change this template use File | Settings | File Templates.
 */
define(function(){
    var FriendEmployDialog = function(frienduserid)
    {
        FriendEmployDialog.superClass.constructor.call(this);
        this.init(frienduserid);
    };

    Q.inherit(FriendEmployDialog, Q.DisplayObjectContainer);

    FriendEmployDialog.prototype.init = function(frienduserid){
        this.width = Views.DisplayObjectsDefine.displayer.fixWinWidth;
        this.height = Views.DisplayObjectsDefine.displayer.fixWinHeight;

        this.btnWidth = 200;
        this.btnHeight = 55;
        this.btncMargin = 1;
        this.btnpMargin = 14;
        this.frienduserid = frienduserid;
        this.addChildAt(this.GetBg(),0);
        this.addChildAt(this.getReturnBtn(function(){
            Views.MainView.HidefriendEmployDialog();
            Views.MainView.showFriendContainer();
        }),1);

        var self = this;

        this.NortiaojiuShiBtn = this.GetNormalBtn(0,function(){
            self.removeChild(self.NortiaojiuShiBtn);
            self.addChildAt(self.ToutiaojiuShiBtn,1);
            Sockets.send_reqWorkerHire(self.frienduserid,"A");
            //self.showMsg('雇用成功');
        });
        this.ToutiaojiuShiBtn = this.GetTouchedBtn(0,function(){
            self.removeChild(self.ToutiaojiuShiBtn);
            self.addChildAt(self.NortiaojiuShiBtn,1);
            //self.showMsg('强制解雇致损失100金币');
        });

        this.NoryinlvShiBtn = this.GetNormalBtn(1,function(){
            self.removeChild(self.NoryinlvShiBtn);
            self.addChildAt(self.TouyinlvShiBtn,1);
            Sockets.send_reqWorkerHire(self.frienduserid,"D");
            //self.showMsg('雇用成功');
        });
        this.TouyinlvShiBtn = this.GetTouchedBtn(1,function(){
            self.removeChild(self.TouyinlvShiBtn);
            self.addChildAt(self.NoryinlvShiBtn,1);
            //self.showMsg('强制解雇致损失100金币');
        });

        this.NorfuwuShengBtn = this.GetNormalBtn(2,function(){
            self.removeChild(self.NorfuwuShengBtn);
            self.addChildAt(self.ToufuwuShengBtn,1);
            Sockets.send_reqWorkerHire(self.frienduserid,"W");
            //self.showMsg('雇用成功');
        });
        this.ToufuwuShengBtn = this.GetTouchedBtn(2,function(){
            self.removeChild(self.ToufuwuShengBtn);
            self.addChildAt(self.NorfuwuShengBtn,1);
            //self.showMsg('强制解雇致损失100金币');
        });

        this.addChildAt(this.NortiaojiuShiBtn,1);
        this.addChildAt(this.NoryinlvShiBtn,1);
        this.addChildAt(this.NorfuwuShengBtn,1);

        this.msg = this.getMsg();
        this.addChildAt(this.msg,1);
    };

    FriendEmployDialog.prototype.setNorBtn = function(typecode){
        switch(typecode){
            case "A":
                self.removeChild(self.NoryinlvShiBtn);
                self.addChildAt(self.TouyinlvShiBtn,1);
                break;
            case "D":
                self.removeChild(self.NoryinlvShiBtn);
                self.addChildAt(self.TouyinlvShiBtn,1);
                break;
            case "W":
                self.removeChild(self.NorfuwuShengBtn);
                self.addChildAt(self.ToufuwuShengBtn,1);
                break;
        }
    };

    FriendEmployDialog.prototype.setTouBtn = function(typecode){
        switch(typecode){
            case "A":
                self.removeChild(self.ToutiaojiuShiBtn);
                self.addChildAt(self.NortiaojiuShiBtn,1);
                break;
            case "D":
                self.removeChild(self.TouyinlvShiBtn);
                self.addChildAt(self.NoryinlvShiBtn,1);
                break;
            case "W":
                self.removeChild(self.ToufuwuShengBtn);
                self.addChildAt(self.NorfuwuShengBtn,1);
                break;
        }
    };

    FriendEmployDialog.prototype.clickNortiaojiuShiBtn = function(){
        var self = this;
        self.removeChild(self.NortiaojiuShiBtn);
        self.addChildAt(self.ToutiaojiuShiBtn,1);
        Sockets.send_reqWorkerHire(self.frienduserid,"A");
        //self.showMsg('雇用成功');
    };

    FriendEmployDialog.prototype.showMsg = function(text){
        this.msg.text = text;
        var timer = new Q.Timer(60);
        timer.addListener(Q.Tween);
        timer.start();
        Q.Tween.to(Views.MainView.FriendEmployDialog.msg, {alpha:1}, {time:500, onComplete:function()
        {
            Q.Tween.to(Views.MainView.FriendEmployDialog.msg, {alpha:0}, {time:500,  delay:1000, onComplete:function()
            {
                timer.stop();
            }});
        }});
    };

    //显示信息框
    FriendEmployDialog.prototype.getMsg = function(){
        var h = 30;
        var color = '#fff';
        return new Q.Text({font:h+"px arial",x:25,y:477,width:this.width - 50,height:h, color:color,alpha:0,textAlign:"right"});
    };

    FriendEmployDialog.prototype.GetNormalBtn = function(id,callback){
        var btnWidth = 62;
        var btnHeight = 57;
        var py = 94 + (btnHeight + 89)*id;
        var btn = new Q.Button({image:LoadedImages.employui.image, x:696,y:py,width:btnWidth,height:btnHeight,
            up:{rect:[961,0,btnWidth,btnHeight]},
            down:{rect:[1024,0,btnWidth,btnHeight]}
        });
        btn.addEventListener(events[2], function(e)
        {
            callback();
        });
        return btn;
    };

    FriendEmployDialog.prototype.GetTouchedBtn = function(id,callback){
        var btnWidth = 62;
        var btnHeight = 57;
        var py = 94 + (btnHeight + 89)*id;
        var btn = new Q.Button({image:LoadedImages.employui.image, x:696,y:py,width:btnWidth,height:btnHeight,
            up:{rect:[1024,0,btnWidth,btnHeight]},
            down:{rect:[961,0,btnWidth,btnHeight]}
        });
        btn.addEventListener(events[2], function(e)
        {
            callback();
        });
        return btn;
    };

    FriendEmployDialog.prototype.getReturnBtn = function(callback){
        var btnWidth = 92;
        var btnHeight = 50;
        var btn = new Q.Button({image:LoadedImages.employui.image, x:10,y:10,width:btnWidth,height:btnHeight,
            up:{rect:[961,58,btnWidth,btnHeight]},
            down:{rect:[961,58,btnWidth,btnHeight]}
        });
        btn.addEventListener(events[2], function(e)
        {
            callback();
        });
        return btn;
    };

    FriendEmployDialog.prototype.GetBg = function(){
        return new Q.Bitmap({image:LoadedImages.employui.image,x:0,y:0,width:this.width,height:this.height,rect:[0,542,this.width,this.height]});
    };

    return FriendEmployDialog;
});