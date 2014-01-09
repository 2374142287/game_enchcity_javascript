/**
 * Created with JetBrains WebStorm.
 * User: john
 * Date: 13-2-12
 * Time: 上午10:54
 * To change this template use File | Settings | File Templates.
 */
define([winSize+'/ShowMsgWithAction',],function(showMsgWithAction){
    var RegContainer = function(props,displayer,callback)
    {
        RegContainer.superClass.constructor.call(this, props,displayer,callback);
        this.init(displayer,callback);
    };

    Q.inherit(RegContainer, Q.DisplayObjectContainer);

    RegContainer.prototype.init = function(displayer,callback){
        this.displayer = displayer;

        this.addChild(this.getBg());
        var px = 355;
        var py = 189;
        var margin = 21;

        this.addChild(this.nickNameTextBox());
        this.addChild(this.accountTextBox());
        this.addChild(this.passwordBox());
        this.addChild(this.password2Box());
        var self = this;
        this.addChild(this.GetRegBtn(function(){
            if(self.accountTxt.getValue().length <= 0)
            {
                self.ShowMessageWithAction("帐号不能为空，请查证！",self.HideAllDialog);
            }
            else if(self.nickNameTxt.getValue().length <= 0)
            {
                self.ShowMessageWithAction("昵称不能为空，请查证！",self.HideAllDialog);
            }
            else if(self.passwordTxt.getValue().length < 6)
            {
                self.ShowMessageWithAction("密码长度应不小于六位，请查证！",self.HideAllDialog);
            }
            else if(self.passwordTxt.getValue() != self.password2Txt.getValue())
            {
                self.ShowMessageWithAction("两次输入的密码不一致，请查证！",self.HideAllDialog);
            }else{
                Player.account = self.accountTxt.getValue();
                Player.password = self.passwordTxt.getValue();
                Player.nickname = self.nickNameTxt.getValue();
                callback();
            }
        }));

        //窗口容器
        this.DialogContainer = this.GetDialogContainer();
        this.addChild(this.DialogContainer);
        this.DialogContainer.alpha = 0;
        ///弹出窗口带Action
        this.ShowMsgWithAction = new showMsgWithAction();
    };

    RegContainer.prototype.GetDialogContainer = function(){
        var container = new Q.DisplayObjectContainer({x:0,y:0,width:this.getCurrentWidth(),height:this.getCurrentHeight()});
        Views.DisplayObjectsDefine.displayer.SetDisplayObjectScaleFullHeightSize(container,this);
        return container;
    };

    RegContainer.prototype.ShowMessageWithAction = function(text,action){
        var self = this;
        self.DialogContainer.alpha = 1;
        self.ShowMsgWithAction = new showMsgWithAction({},text,action);
        self.displayer.SetDisplayObjectSize(self.ShowMsgWithAction,self.DialogContainer);
        self.displayer.SetDisplayObjectCenter(self.ShowMsgWithAction,self.DialogContainer);
        self.DialogContainer.addChildAt(self.ShowMsgWithAction,1);
    };

    RegContainer.prototype.HideAllDialog = function(){
        Views.RegView.DialogContainer.alpha = 0;
        Views.RegView.DialogContainer.removeAllChildren();
    };

    RegContainer.prototype.getBg = function(){
        var loginBg = new Quark.Bitmap({image:LoadedImages.regbg.image,x:0,y:0,width:this.displayer.winWidth,height:this.displayer.winHeight});
        Views.DisplayObjectsDefine.displayer.SetDisplayObjectScaleFullHeightSize(loginBg,this);
        Views.DisplayObjectsDefine.displayer.SetDisplayObjectCenter(loginBg,this);
        return loginBg;
    };

    RegContainer.prototype.nickNameTextBox = function(){
        var px = 355;
        var py = 189;
        var margin = 21;
        py = py + (margin+32) * 0;
        var width = 250;
        var height = 36;
        var inputHeight = 24;
        var container = new Q.DisplayObjectContainer({x:px,y:py,width:width,height:height});
        this.nickNameTxt = new Q.TextBox({x:0,y:(height-inputHeight)/2,width:width,height:height,value:"",style:{color:"#000",transparent:"1",font:inputHeight+"px"}});
        container.addChildAt(this.nickNameTxt,1);
        Views.DisplayObjectsDefine.displayer.SetDisplayObjectPosition(container,this);
        return container;
    };
    RegContainer.prototype.accountTextBox = function(){
        var px = 355;
        var py = 189;
        var margin = 21;
        py = py + (margin+32) * 1;
        var width = 250;
        var height = 36;
        var inputHeight = 24;
        var container = new Q.DisplayObjectContainer({x:px,y:py,width:width,height:height});
        this.accountTxt = new Q.TextBox({x:0,y:(height-inputHeight)/2,width:width,height:height,value:"",style:{color:"#000",transparent:"1",font:inputHeight+"px"}});
        container.addChildAt(this.accountTxt,1);
        Views.DisplayObjectsDefine.displayer.SetDisplayObjectPosition(container,this);
        return container;
    };

    RegContainer.prototype.passwordBox = function(){
        var px = 355;
        var py = 189;
        var margin = 21;
        py = py + (margin+32) * 2;
        var width = 250;
        var height = 36;
        var inputHeight = 24;
        var container = new Q.DisplayObjectContainer({x:px,y:py,width:width,height:height});
        this.passwordTxt = new Q.PasswordBox({x:0,y:(height-inputHeight)/2,width:width,height:height,value:"",style:{color:"#000",transparent:"1",font:inputHeight+"px"}});
        container.addChildAt(this.passwordTxt,1);
        Views.DisplayObjectsDefine.displayer.SetDisplayObjectPosition(container,this);
        return container;
    };

    RegContainer.prototype.password2Box = function(){
        var px = 355;
        var py = 189;
        var margin = 21;
        py = py + (margin+32) * 3;
        var width = 250;
        var height = 36;
        var inputHeight = 24;
        var container = new Q.DisplayObjectContainer({x:px,y:py,width:width,height:height});
        this.password2Txt = new Q.PasswordBox({x:0,y:(height-inputHeight)/2,width:width,height:height,value:"",style:{color:"#000",transparent:"1",font:inputHeight+"px"}});
        container.addChildAt(this.password2Txt,1);
        this.displayer.SetDisplayObjectPosition(container,this);
        return container;
    };

    RegContainer.prototype.GetRegBtn = function(callback){
        var btnWidth = 80;
        var btnHeight = 50;
        var cx = 6;
        var cy = 2;
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

    return RegContainer;
});