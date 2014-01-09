/**
 * Created with JetBrains WebStorm.
 * User: john
 * Date: 13-2-12
 * Time: 上午10:54
 * To change this template use File | Settings | File Templates.
 */
define([winSize+'/ShowMsgWithAction',],function(showMsgWithAction){
    var Login0Container = function(props,displayer,callback)
    {
        Login0Container.superClass.constructor.call(this, props,displayer,callback);
        this.init(displayer,callback);
    };

    Q.inherit(Login0Container, Q.DisplayObjectContainer);

    Login0Container.prototype.init = function(displayer,callback){
        this.displayer = displayer;

        this.addChild(this.getBg());
        this.addChild(this.getTextBox());
        this.addChild(this.getPasswordBox());
        var self = this;
        this.addChild(this.GetLoginBtn(function(){
            if(self.accountTxt.getValue().length <= 0)
            {
                self.ShowMessageWithAction("帐号不能为空，请查证！",self.HideAllDialog);
            }
            else if(self.passwordTxt.getValue().length < 6)
            {
                self.ShowMessageWithAction("密码长度应不小于六位"+self.passwordTxt.getValue().length+"，请查证！",self.HideAllDialog);
            }else{
                Player.account = self.accountTxt.getValue();
                Player.password = self.passwordTxt.getValue();
                Account = Player.account;
                Password = Player.password;
                callback();
            }
        }));
        this.addChild(this.GetRegBtn(function(){
                Views.Stage.removeAllChildren();
                Views.Stage.addChild(Views.RegView);
            }
        ));
        //窗口容器
        this.DialogContainer = this.GetDialogContainer();
        this.addChild(this.DialogContainer);
        this.DialogContainer.alpha = 0;
        ///弹出窗口带Action
        this.ShowMsgWithAction = new showMsgWithAction();
    };

    Login0Container.prototype.GetDialogContainer = function(){
        var container = new Q.DisplayObjectContainer({x:0,y:0,width:this.getCurrentWidth(),height:this.getCurrentHeight()});
        Views.DisplayObjectsDefine.displayer.SetDisplayObjectScaleFullHeightSize(container,this);
        return container;
    };

    Login0Container.prototype.ShowMessageWithAction = function(text,action){
        var self = this;
        self.DialogContainer.alpha = 1;
        self.ShowMsgWithAction = new showMsgWithAction({},text,action);
        self.displayer.SetDisplayObjectSize(self.ShowMsgWithAction,self.DialogContainer);
        self.displayer.SetDisplayObjectCenter(self.ShowMsgWithAction,self.DialogContainer);
        self.DialogContainer.addChildAt(self.ShowMsgWithAction,1);
    };

    Login0Container.prototype.HideAllDialog = function(){
        Views.Login0View.DialogContainer.alpha = 0;
        Views.Login0View.DialogContainer.removeAllChildren();
    };
    Login0Container.prototype.getBg = function(){
        var loginBg = new Quark.Bitmap({image:LoadedImages.login0bg.image,x:0,y:0,width:this.displayer.winWidth,height:this.displayer.winHeight});
        Views.DisplayObjectsDefine.displayer.SetDisplayObjectScaleFullHeightSize(loginBg,this);
        Views.DisplayObjectsDefine.displayer.SetDisplayObjectCenter(loginBg,this);
        return loginBg;
    };
    Login0Container.prototype.getPasswordBox = function(){
        var width = 250;
        var height = 36;
        var inputHeight = 22;
        var px = 355;
        var py = 332;
        var container = new Q.DisplayObjectContainer({x:px,y:py,width:width,height:height});
        this.passwordTxt = new Q.PasswordBox({x:0,y:(height-inputHeight)/2,width:width,height:height,value:"",style:{color:"#000",transparent:"1",font:inputHeight+"px"}});
        container.addChildAt(this.passwordTxt,1);
        return container;
    };
    Login0Container.prototype.getTextBox = function(){
        var width = 250;
        var height = 36;
        var inputHeight = 22;
        var px = 355;
        var py = 258;
        var container = new Q.DisplayObjectContainer({x:px,y:py,width:width,height:height});
        this.accountTxt = new Q.TextBox({x:0,y:(height-inputHeight)/2,width:width,height:height,value:"",style:{color:"#000",transparent:"1",font:inputHeight+"px"}});
        container.addChildAt(this.accountTxt,1);
        return container;
    };

    Login0Container.prototype.GetRegBtn = function(callback){
        var btnWidth = 80;
        var btnHeight = 50;
        var cx = 6;
        var cy = 2;
        var px = 623;
        var py = 249;

        var btn = new Q.Button({image:LoadedImages.regui.image, x:px, y:py, width:btnWidth, height:btnHeight,
            up:{rect:[cx,cy,btnWidth,btnHeight]},
            down:{rect:[cx,cy + btnHeight,btnWidth,btnHeight]}
        });
        btn.addEventListener(events[2], function(e)
        {
            callback();
        });
        this.displayer.SetDisplayObjectPosition(btn,this);
        return btn;
    };
    Login0Container.prototype.GetLoginBtn = function(callback){
        var btnWidth = 80;
        var btnHeight = 50;
        var cx = 6;
        var cy = 2+btnHeight*2;
        var px = 440;
        var py = 431;

        var btn = new Q.Button({image:LoadedImages.regui.image, x:px, y:py, width:btnWidth, height:btnHeight,
            up:{rect:[cx,cy,btnWidth,btnHeight]},
            down:{rect:[cx,cy + btnHeight,btnWidth,btnHeight]}
        });
        btn.addEventListener(events[2], function(e)
        {
            callback();
        });
        this.displayer.SetDisplayObjectPosition(btn,this);
        return btn;
    };

    return Login0Container;
});