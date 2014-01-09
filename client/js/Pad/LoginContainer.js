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
        this.addChild(this.idolManager);
        //this.addChild(this.GetInputBg());
        //this.addChild(this.GetInputText());

        //this.GetInput();
        this.addChild(this.GetStartBtnContainer(callback));
    };/*
    LoginContainer.prototype.getBg = function(){
        var img = new Image();
        img.src = "images/1/loadBg.jpg";
        var bmp = new Q.Bitmap({image:img,x:0,y:0,width:1920,height:1080});
        this.displayer.SetDisplayObjectScaleFullHeightSize(bmp,this);
        this.displayer.SetDisplayObjectCenter(bmp,this);
        return bmp;
    };*/

    LoginContainer.prototype.GetLoginBg = function(){
        var loginBg = new Quark.Bitmap({image:LoadedImages.loginbg.image,x:0,y:0,width:this.width,height:this.height});
        this.displayer.SetDisplayObjectCenter(loginBg,this);
        return loginBg;
    };

    LoginContainer.prototype.GetTitle = function(){
        var titleBg = new Quark.Bitmap({image:LoadedImages.loginui.image, x:617, y:80, width:700, height:100,rect:[800,995,700,100]});
        this.displayer.SetDisplayObjectPosition(titleBg,this.getCurrentHeight(),this.designHeight);
        return titleBg;
    };

    LoginContainer.prototype.GetInputBg = function(){
        var inputBg = new Quark.Bitmap({image:LoadedImages.loginui.image, x:790, y:755, width:340, height:65,rect:[178,1227,340,65]});
        this.displayer.SetDisplayObjectPosition(inputBg,this.getCurrentHeight(),this.designHeight);
        return inputBg;
    };

    LoginContainer.prototype.GetInputText = function(){
        var inputText = new Quark.Bitmap({image:LoadedImages.loginui.image, x:790, y:755, width:340, height:65,rect:[657,1230,340,65]});
        this.displayer.SetDisplayObjectPosition(inputText,this.getCurrentHeight(),this.designHeight);
        return inputText;
    };

    LoginContainer.prototype.GetInput = function(){
        var input = new Q.getDOM("nameinputdiv");
        document.getElementById('nameinput').focus();
        input.style.cssText +="z-index:9999;";
       // this.displayer.SetDivPosition(input,755,790,340,65,this.width,this.height,this.designHeight);
        return input;
    };

    LoginContainer.prototype.GetStartBtnContainer = function(callback){
        var startBtnContainer = new StartBtnContainer({x:700, y:820, width:520, height:193},this.displayer,this,callback);
        this.displayer.SetDisplayObjectPosition(startBtnContainer,this.getCurrentHeight(),this.designHeight);
        return startBtnContainer;
    };

    return LoginContainer;
});