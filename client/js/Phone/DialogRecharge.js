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
        this.width = 622;
        this.height = 344;
        this.addChildAt(this.getBg(),0);
        this.addChildAt(this.getDesText(id),1);
        this.addChildAt(this.getOkBtn(),2);
        this.addChildAt(this.getCloseBtn(),2);
    };

    DialogRecharge.prototype.getDesText = function(id){
        var num = 10;
        switch(id){
            case 0:
                num = 100;
                break;
            case 1:
                num = 500;
                break;
            case 2:
                num = 1000;
                break;
            case 3:
                num = 5000;
                break;
        }
        this.rechargePoint = num;
        return this.getText("是否充值"+num+"星贝");
    };

    DialogRecharge.prototype.getOkBtn = function(){
        var btn = this.getBtn(0);
        var self = this;
        btn.addEventListener(events[2], function(e)
        {
            Views.MainView.HideDialogRechargeContainer();
            
            Sockets.send_reqRecharge(self.rechargePoint);
        });
        return btn;
    };

    DialogRecharge.prototype.getCloseBtn = function(){
        var btn = this.getBtn(1);
        btn.addEventListener(events[2], function(e)
        {
            Views.MainView.showRechargeContainer();
            Views.MainView.HideDialogRechargeContainer();
        });
        return btn;
    };

    DialogRecharge.prototype.getBtn = function(id){
        var width = 209;
        var height = 58;
        var px = 80 + (width + 46)*id;
        var py = 250;
        var cx = 0;
        var cy = 236 + (height + 1)*id;
        return new Q.Button({image:LoadedImages.itemui.image,x:px,y:py,width:width,height:height,
            up:{rect:[cx,cy,width,height]},
            down:{rect:[cx,cy,width,height]}
        });
    };

    DialogRecharge.prototype.getText = function(text){
        var maxHeight = this.height;
        var height = 28;
        var py = (maxHeight - height)/2;
        return new Q.Text({font:(height-2)+"px arial",x:0,y:py,width:this.width,height:height, color:"#fff",text:text,textAlign:"center"});
    };

    DialogRecharge.prototype.getBg = function(){
        return new Q.Bitmap({image:LoadedImages.foodui.image,x:0,y:0,width:this.width,height:this.height,rect:[477,86,this.width,this.height]});
    };
    return DialogRecharge;
});