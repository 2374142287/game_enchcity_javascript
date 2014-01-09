/**
 * Created with JetBrains WebStorm.
 * User: john
 * Date: 13-3-4
 * Time: 下午11:51
 * To change this template use File | Settings | File Templates.
 */
define(function(){
    var DialogMessage = function(props)
    {
        DialogMessage.superClass.constructor.call(this,props);
        this.init();
    };

    Q.inherit(DialogMessage, Q.DisplayObjectContainer);

    DialogMessage.prototype.init = function(){
        this.width = 393;
        this.height = 232;
        this.alpha = 0;
    };

    DialogMessage.prototype.show = function(text,cancelAction){
        this.removeAllChildren();
        this.addChildAt(this.getBg(),0);
        this.addChildAt(this.getCancel(cancelAction),1);
        this.addChildAt(this.getText(text),1);
        this.alpha = 1;
    };

    DialogMessage.prototype.getText = function(text){
        var px = 35;
        var py = 52;
        var w = 324;
        var h = 70;
        return new Q.Text({font:"27px arial",x:px,y:py,width:w,height:h,lineWidth:w,lineSpacing:6,color:"#fff",text:text,textAlign:"center"});
    };

    DialogMessage.prototype.getCancel = function(callback){
        return this.getBtn(1,callback);
    };

    DialogMessage.prototype.getBtn = function(id,callback){
        var width = 149;
        var height = 42;
        var margin = 1;
        var cx = 394 + (width + margin)*id;
        var cy = 1;
        var px = 123;
        var py = 169;
        var btn = new Q.Button({image:LoadedImages.buydialog.image,x:px,y:py,width:width,height:height,
            up:{rect:[cx,cy,width,height]},
            down:{rect:[cx,cy+(height + margin),width,height]}
        });
        btn.addEventListener(events[2], function(e)
        {
            callback();
        });
        return btn;
    };
    DialogMessage.prototype.getBg = function(){
        return new Q.Bitmap({image:LoadedImages.buydialog.image,x:0,y:0,width:this.width,height:this.height,rect:[0,0,this.width,this.height]});
    };
    return DialogMessage;
});