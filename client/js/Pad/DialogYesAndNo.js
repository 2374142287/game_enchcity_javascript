/**
 * Created with JetBrains WebStorm.
 * User: john
 * Date: 13-2-27
 * Time: 上午12:13
 * To change this template use File | Settings | File Templates.
 */
define(function(){
    var DialogYesAndNo = function(props)
    {
        DialogYesAndNo.superClass.constructor.call(this,props);
        this.init();
    };

    Q.inherit(DialogYesAndNo, Q.DisplayObjectContainer);

    DialogYesAndNo.prototype.init = function(){
        this.width = 393;
        this.height = 232;
        this.alpha = 0;
    };

    DialogYesAndNo.prototype.show = function(text,okAction,cancelAction){
        this.removeAllChildren();
        this.addChildAt(this.getBg(),0);
        this.addChildAt(this.getOK(okAction),1);
        this.addChildAt(this.getCancel(cancelAction),1);
        this.addChildAt(this.getText(text),1);
        this.alpha = 1;
    };

    DialogYesAndNo.prototype.getText = function(text){
        var px = 35;
        var py = 52;
        var w = 324;
        var h = 70;
        return new Q.Text({font:"27px arial",x:px,y:py,width:w,height:h,lineWidth:w,lineSpacing:6,color:"#fff",text:text,textAlign:"center"});
    };

    DialogYesAndNo.prototype.getOK = function(callback){
        return this.getBtn(0,callback);
    };

    DialogYesAndNo.prototype.getCancel = function(callback){
        return this.getBtn(1,callback);
    };

    DialogYesAndNo.prototype.getBtn = function(id,callback){
        var width = 135;
        var height = 42;
        var margin = 1;
        var cx = 19;
        var cy = 280 + (height + margin)*id*2;
        var px = 57 + (width+ 12)*id;
        var py = 147;
        var btn = new Q.Button({image:LoadedImages.friendui.image,x:px,y:py,width:width,height:height,
            up:{rect:[cx,cy,width,height]},
            down:{rect:[cx,cy+(height + margin),width,height]}
        });
        btn.addEventListener(events[2], function(e)
        {
            callback();
        });
        return btn;
    };
   DialogYesAndNo.prototype.getBg = function(){
       return new Q.Bitmap({image:LoadedImages.friendui.image,x:0,y:0,width:this.width,height:this.height,rect:[1242,1,this.width,this.height]});
   };
    return DialogYesAndNo;
});