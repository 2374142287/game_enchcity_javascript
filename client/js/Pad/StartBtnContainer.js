/**
 * Created with JetBrains WebStorm.
 * User: john
 * Date: 13-2-12
 * Time: 下午8:17
 * To change this template use File | Settings | File Templates.
 */
var StartBtnContainer = function(props,displayer,container,callback)
{
    StartBtnContainer.superClass.constructor.call(this, props);
    this.init(displayer,container,callback);
};

Q.inherit(StartBtnContainer, Q.DisplayObjectContainer);

StartBtnContainer.prototype.init = function(displayer,container,callback){
    this.container = container;
    this.displayer = displayer;
    this.addChild(this.GetLoginBg());
    this.addChild(this.GetLoginBtn(callback));
};

StartBtnContainer.prototype.GetLoginBtn = function(callback){
    var loginBtn = new Q.Button({id:"loginBtn", image:LoadedImages.loginui.image, x:155, y:61, width:200, height:70,
        up:{rect:[530,995,200,70]},
        //over:{rect:[840,309,200,70]},
        down:{rect:[530,1065,200,70]}
        //disabled:{rect:[840,380,200,70]}
    });
    loginBtn.addEventListener(events[2], function(e)
    {
        callback();
    });

    //this.displayer.SetDisplayObjectPosition(loginBtn,this.getCurrentHeight(),this.designHeight);
    return loginBtn;
};

StartBtnContainer.prototype.GetLoginBg = function(){
    var loginBg = new Q.Bitmap({id:"loginBg", image:LoadedImages.loginui.image, x:0, y:0, width:520, height:193,rect:[0,995,520,193]});
    //this.displayer.SetDisplayObjectPosition(loginBg,this.getCurrentHeight(),this.designHeight);
    return loginBg;
};