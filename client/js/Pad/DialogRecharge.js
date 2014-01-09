/**
 * Created with JetBrains WebStorm.
 * User: john
 * Date: 13-2-28
 * Time: 下午6:25
 * To change this template use File | Settings | File Templates.
 */
define(function(){
    var DialogRecharge = function(props,id)
    {
        DialogRecharge.superClass.constructor.call(this,props,id);
        this.init(id);
    };

    Q.inherit(DialogRecharge, Q.DisplayObjectContainer);

    DialogRecharge.prototype.init = function(id){
        this.width = 387;
        this.height = 196;
        this.addChildAt(this.getBg(),0);
        this.addChildAt(this.getDesText(id),1);
        this.addChildAt(this.getOkBtn(),2);
        this.addChildAt(this.getCloseBtn(),2);
    };

    DialogRecharge.prototype.getDesText = function(id){
        var num = 10;
        switch(id){
            case 0:
                num = 10;
                break;
            case 1:
                num = 50;
                break;
            case 2:
                num = 100;
                break;
            case 3:
                num = 1000;
                break;
        }
        return this.getText("是否充值"+num+"星贝");
    };

    DialogRecharge.prototype.getOkBtn = function(){
        var btn = this.getBtn(0);
        btn.addEventListener(events[2], function(e)
        {
            if(Views.MainView.hasChild(Views.MainView.dialogRecharge))
                Views.MainView.removeChild(Views.MainView.dialogRecharge);
        });
        return btn;
    };

    DialogRecharge.prototype.getCloseBtn = function(){
        var btn = this.getBtn(1);
        btn.addEventListener(events[2], function(e)
        {
            if(Views.MainView.hasChild(Views.MainView.dialogRecharge))
                Views.MainView.removeChild(Views.MainView.dialogRecharge);
            if(Views.MainView.hasChild(Views.MainView.rechargeContainer))
                Views.MainView.removeChild(Views.MainView.rechargeContainer);
            Views.MainView.addChild(Views.MainView.rechargeContainer);
            Views.MainView.displayer.SetDisplayObjectSize(Views.MainView.rechargeContainer,Views.MainView.getCurrentHeight(),Views.MainView.designHeight);
            Views.MainView.displayer.SetDisplayObjectCenter(Views.MainView.rechargeContainer,Views.MainView);
        });
        return btn;
    };

    DialogRecharge.prototype.getBtn = function(id){
        var width = 112;
        var height = 38;
        var px = 45 + (width + 71)*id;
        var py = 130;
        var cx = 660 + (width + 1)*id;
        var cy = 201;
        return new Q.Button({image:LoadedImages.rechargeui.image,x:px,y:py,width:width,height:height,
            up:{rect:[cx,cy,width,height]},
            down:{rect:[cx,cy + height,width,height]}
        });
    };

    DialogRecharge.prototype.getText = function(text){
        var maxHeight = this.height;
        var height = 28;
        var py = (maxHeight - height)/2;
        return new Q.Text({font:(height-2)+"px arial",x:0,y:py,width:this.width,height:height, color:"#fff",text:text,textAlign:"center"});
    };

    DialogRecharge.prototype.getBg = function(){
        return new Q.Bitmap({image:LoadedImages.rechargeui.image,x:0,y:0,width:this.width,height:this.height,rect:[661,4,this.width,this.height]});
    };
    return DialogRecharge;
});