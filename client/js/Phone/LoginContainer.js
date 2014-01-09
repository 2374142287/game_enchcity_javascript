/**
 * Created with JetBrains WebStorm.
 * User: john
 * Date: 13-2-12
 * Time: 上午10:54
 * To change this template use File | Settings | File Templates.
 */
define(['jquery',winSize+'/IdolManager',winSize+'/idol',winSize+'/StartBtnContainer'],function($,IdolManager){
    var LoginContainer = function(props,displayer,container,DesignHeight,callback)
    {
        LoginContainer.superClass.constructor.call(this, props,displayer,container,DesignHeight,callback);
        this.init(displayer,container,DesignHeight,callback);
    };

    Q.inherit(LoginContainer, Q.DisplayObjectContainer);

    LoginContainer.prototype.init = function(displayer,container,DesignHeight,callback){
        this.displayer = displayer;
        this.container = container;
        this.designHeight = DesignHeight;

        //this.addChild(this.getBg());
        this.addChild(this.GetLoginBg());
        this.addChild(this.GetTitle());
        this.idolManager = new IdolManager({width:this.width,height:this.height,x:this.x,y:this.y},this.displayer,this.container);
        Views.DisplayObjectsDefine.displayer.SetDisplayObjectScaleFullHeightSize(this.idolManager,this);
        this.addChild(this.idolManager);
        this.addChild(this.GetStartBtnContainer(callback));
    };

    LoginContainer.prototype.GetLoginBg = function(){
        var loginBg = new Quark.Bitmap({image:LoadedImages.loginbg.image,x:0,y:0,width:this.displayer.winWidth,height:this.displayer.winHeight});
        Views.DisplayObjectsDefine.displayer.SetDisplayObjectScaleFullHeightSize(loginBg,this);
        Views.DisplayObjectsDefine.displayer.SetDisplayObjectCenter(loginBg,this);
        return loginBg;
    };

    LoginContainer.prototype.GetTitle = function(){
        var titleBg = new Quark.Bitmap({image:LoadedImages.loginui.image, x:260, y:40, width:440, height:46,rect:[907,0,440,46]});
        this.displayer.SetDisplayObjectPosition(titleBg,this);
        return titleBg;
    };

    LoginContainer.prototype.GetInputBg = function(){
        var inputBg = new Quark.Bitmap({image:LoadedImages.loginui.image, x:790, y:755, width:340, height:65,rect:[178,1227,340,65]});
        this.displayer.SetDisplayObjectPosition(inputBg,this);
        return inputBg;
    };

    LoginContainer.prototype.GetInputText = function(){
        var inputText = new Quark.Bitmap({image:LoadedImages.loginui.image, x:790, y:755, width:340, height:65,rect:[657,1230,340,65]});
        this.displayer.SetDisplayObjectPosition(inputText,this);
        return inputText;
    };

    LoginContainer.prototype.GetInput = function(){
        var input = new Q.getDOM("nameinputdiv");
        document.getElementById('nameinput').focus();
        input.style.cssText +="z-index:9999;";
        //this.displayer.SetDivPosition(input,755,790,340,65,this.width,this.height,this.designHeight);
        return input;
    };

    LoginContainer.prototype.GetStartBtnContainer = function(callback){
        var startBtnContainer = new StartBtnContainer({x:380, y:425, width:200, height:70},this.displayer,this,callback);
        this.displayer.SetDisplayObjectPosition(startBtnContainer,this);
        return startBtnContainer;
    };

    return LoginContainer;
});