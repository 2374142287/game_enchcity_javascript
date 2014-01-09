/**
 * Created with JetBrains WebStorm.
 * User: john
 * Date: 13-2-18
 * Time: 下午8:37
 * To change this template use File | Settings | File Templates.
 */
define(function(){
    var FriendMagicDialog = function(frienduserid)
    {
        FriendMagicDialog.superClass.constructor.call(this);
        this.init(frienduserid);
    };

    Q.inherit(FriendMagicDialog, Q.DisplayObjectContainer);

    FriendMagicDialog.prototype.init = function(frienduserid){
        this.width = Views.DisplayObjectsDefine.displayer.fixWinWidth;
        this.height = Views.DisplayObjectsDefine.displayer.fixWinHeight;

        this.btnWidth = 200;
        this.btnHeight = 55;
        this.btncMargin = 1;
        this.btnpMargin = 14;
        this.frienduserid = frienduserid;
        this.addChildAt(this.GetBg(),0);
        this.addChildAt(this.getReturnBtn(function(){
            Views.MainView.HidefriendMagicDialog();
            Views.MainView.showFriendContainer();
        }),1);

        var self = this;

        this.NorzhiyouzhiLiBtn = this.GetNormalBtn(0,function(){
            self.removeChild(self.NorzhiyouzhiLiBtn);
            self.addChildAt(self.TouzhiyouzhiLiBtn,1);
            self.useProp(1);
            self.showMsg(0,'使用成功');
        });
        this.TouzhiyouzhiLiBtn = this.GetTouchedBtn(0);

        this.NoryoumantianXiaBtn = this.GetNormalBtn(1,function(){
            self.removeChild(self.NoryoumantianXiaBtn);
            self.addChildAt(self.TouyoumantianXiaBtn,1);
            self.useProp(2);
            self.showMsg(1,'使用成功');
        });
        this.TouyoumantianXiaBtn = this.GetTouchedBtn(1);

        this.NorsunyouzhiZhouBtn = this.GetNormalBtn(2,function(){
            self.removeChild(self.NorsunyouzhiZhouBtn);
            self.addChildAt(self.TousunyouzhiZhouBtn,1);
            self.useProp(3);
            self.showMsg(2,'使用成功');
        });
        this.TousunyouzhiZhouBtn = this.GetTouchedBtn(2);

        this.NorqunyouliZhouBtn = this.GetNormalBtn(3,function(){
            self.removeChild(self.NorqunyouliZhouBtn);
            self.addChildAt(self.TouqunyouliZhouBtn,1);
            self.useProp(4);
            self.showMsg(3,'使用成功');
        });
        this.TouqunyouliZhouBtn = this.GetTouchedBtn(3);

        this.addChildAt(this.NorzhiyouzhiLiBtn,1);
        this.addChildAt(this.NoryoumantianXiaBtn,1);
        this.addChildAt(this.NorsunyouzhiZhouBtn,1);
        this.addChildAt(this.NorqunyouliZhouBtn,1);

        this.msg = this.getMsg();
        this.addChildAt(this.msg,1);
    };

    FriendMagicDialog.prototype.clickuseProp = function(){
        var self = this;
        var propid = 12;
        Sockets.send_ReqPropUse(propid,self.frienduserid);
        Views.MainView.HideDialogYesAndNo();
    };

    FriendMagicDialog.prototype.useProp = function(id){
        var self = this;
        var propid = id + 11;
        var propName = Views.MainView.ToolBarContainer.propShopManager.get(propid).name;
        Views.MainView.HideAllDialog();
        if(Views.MainView.ToolBarContainer.propManager.get(propid) == -1)
        {
            Views.MainView.ShowMessage("您没有道具["+propName+"],请到商城购买！");
        }
        Views.MainView.showDialogYesAndNo("是否使用["+propName+"]道具施加给好友？",function(){
            Sockets.send_ReqPropUse(propid,self.frienduserid);
            Views.MainView.HideDialogYesAndNo();
        },function(){
            Views.MainView.HideDialogYesAndNo();
        });
    };

    FriendMagicDialog.prototype.showMsg = function(id,text){
        var self = this;
        this.msg.text = text;
        var timer = new Q.Timer(60);
        timer.addListener(Q.Tween);
        timer.start();
        Q.Tween.to(Views.MainView.FriendMagicDialog.msg, {alpha:1}, {time:500, onComplete:function()
        {
            Q.Tween.to(Views.MainView.FriendMagicDialog.msg, {alpha:0}, {time:500,  delay:1000, onComplete:function()
            {
                switch(id){
                    case 0:
                        self.addChildAt(self.NorzhiyouzhiLiBtn,1);
                        self.removeChild(self.TouzhiyouzhiLiBtn);
                        break;
                    case 1:
                        self.addChildAt(self.NoryoumantianXiaBtn,1);
                        self.removeChild(self.TouyoumantianXiaBtn);
                        break;
                    case 2:
                        self.addChildAt(self.NorsunyouzhiZhouBtn,1);
                        self.removeChild(self.TousunyouzhiZhouBtn);
                        break;
                    case 3:
                        self.addChildAt(self.NorqunyouliZhouBtn,1);
                        self.removeChild(self.TouqunyouliZhouBtn);
                        break;
                }
                timer.stop();
            }});
        }});
    };

    //显示信息框
    FriendMagicDialog.prototype.getMsg = function(){
        var h = 30;
        var color = '#fff';
        return new Q.Text({font:h+"px arial",x:25,y:477,width:this.width - 50,height:h, color:color,alpha:0,textAlign:"right"});
    };

    FriendMagicDialog.prototype.GetNormalBtn = function(id,callback){
        var btnWidth = 62;
        var btnHeight = 57;
        var py = 94 + (btnHeight + 41)*id;
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

    FriendMagicDialog.prototype.GetTouchedBtn = function(id){
        var btnWidth = 62;
        var btnHeight = 57;
        var py = 94 + (btnHeight + 41)*id;
        var btn = new Q.Button({image:LoadedImages.employui.image, x:696,y:py,width:btnWidth,height:btnHeight,
            up:{rect:[1024,0,btnWidth,btnHeight]},
            down:{rect:[961,0,btnWidth,btnHeight]}
        });
        return btn;
    };

    FriendMagicDialog.prototype.getReturnBtn = function(callback){
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

    FriendMagicDialog.prototype.GetBg = function(){
        return new Q.Bitmap({image:LoadedImages.employui.image,x:0,y:0,width:this.width,height:this.height,rect:[0,0,this.width,this.height]});
    };

    return FriendMagicDialog;
});