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
    //this.addChild(this.GetLoginBg());
    this.addChild(this.GetLoginBtn(callback));
};

StartBtnContainer.prototype.GetLoginBtn = function(callback){
    var loginBtn = new Q.Button({id:"loginBtn", image:LoadedImages.loginui.image, x:0, y:0, width:200, height:70,
        up:{rect:[933,68,200,70]},
        //over:{rect:[840,309,200,70]},
        down:{rect:[933,68+70,200,70]}
        //disabled:{rect:[840,380,200,70]}
    });
    loginBtn.addEventListener(events[2], function(e)
    {
        callback();
    });

    return loginBtn;
};

StartBtnContainer.prototype.GetLoginBg = function(){
    var loginBg = new Q.Bitmap({id:"loginBtn", image:LoadedImages.loginui.image, x:0, y:0, width:520, height:193,rect:[87,1291,520,193]});
    return loginBg;
};