/**
 * Created with JetBrains WebStorm.
 * User: john
 * Date: 13-3-10
 * Time: 下午3:09
 * To change this template use File | Settings | File Templates.
 */
/**
 * Created with JetBrains WebStorm.
 * User: john
 * Date: 13-2-28
 * Time: 下午6:25
 * To change this template use File | Settings | File Templates.
 */
define(function(){
    var DialogRecharge = function(props,text,okAction,closeAction)
    {
        DialogRecharge.superClass.constructor.call(this,props);
        this.init(text,okAction,closeAction);
    };

    Q.inherit(DialogRecharge, Q.DisplayObjectContainer);

    DialogRecharge.prototype.init = function(text,okAction,closeAction){
        this.width = 370;
        this.height = 295;
        this.addChildAt(this.getBg(),0);
        this.addChildAt(this.getDesText(text),1);
        this.addChildAt(this.getOkBtn(okAction),2);
        this.addChildAt(this.getCloseBtn(closeAction),2);
    };

    DialogRecharge.prototype.getDesText = function(text){
        var num = 10;
        return this.getText(text);
    };

    DialogRecharge.prototype.getOkBtn = function(okAction){
        var btn = this.getBtn(0);
        btn.addEventListener(events[2], function(e)
        {
            Views.MainView.HideDialogYesAndNo();
            okAction();
        });
        return btn;
    };

    DialogRecharge.prototype.getCloseBtn = function(callback){
        var btn = this.getBtn(1);
        btn.addEventListener(events[2], function(e)
        {
            Views.MainView.HideDialogYesAndNo();
            callback();
        });
        return btn;
    };

    DialogRecharge.prototype.getBtn = function(id){
        var width = 120;
        var height = 50;
        var px = 55 + (width + 20)*id;
        var py = 225;
        var cx = 0;
        var cy = 230 + height*id;
        return new Q.Button({image:LoadedImages.dialogsui.image,x:px,y:py,width:width,height:height,
            up:{rect:[cx,cy,width,height]},
            down:{rect:[cx+width,cy,width,height]}
        });
    };

    DialogRecharge.prototype.getText = function(text){
        var maxHeight = this.height;
        var height = 28;
        var py = (maxHeight - height)/2 - height*2;
        return new Q.Text({font:(height-2)+"px arial",x:35,y:py,width:(this.width - 100),height:height*5, color:"#fff",text:text,lineWidth:(this.width - 100),textAlign:"center"});
    };

    DialogRecharge.prototype.getBg = function(){
        return new Q.Bitmap({image:LoadedImages.dialogsui.image,x:0,y:0,width:this.width,height:this.height,rect:[370,0,this.width,this.height]});
    };
    return DialogRecharge;
});