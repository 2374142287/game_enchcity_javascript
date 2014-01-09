/**
 * Created with JetBrains WebStorm.
 * User: john
 * Date: 13-2-28
 * Time: 下午6:25
 * To change this template use File | Settings | File Templates.
 */
define(function(){
    var ShowMsgWidthAction = function(props,text,cation)
    {
        ShowMsgWidthAction.superClass.constructor.call(this,props);
        this.init(text,cation);
    };

    Q.inherit(ShowMsgWidthAction, Q.DisplayObjectContainer);

    ShowMsgWidthAction.prototype.init = function(text,cation){
        this.width = 622;
        this.height = 344;
        this.addChildAt(this.getBg(),0);
        this.addChildAt(this.getDesText(text),1);
        this.addChildAt(this.getOkBtn(cation),2);
    };

    ShowMsgWidthAction.prototype.getDesText = function(text){
        var num = 10;
        return this.getText(text);
    };

    ShowMsgWidthAction.prototype.getOkBtn = function(cation){
        var btn = this.getBtn(0);
        btn.addEventListener(events[2], function(e)
        {
            cation();
            Views.MainView.HideMessage();
        });
        return btn;
    };

    ShowMsgWidthAction.prototype.getBtn = function(id){
        var width = 209;
        var height = 58;
        var px = (this.width - width)/2;
        var py = 250;
        var cx = 0;
        var cy = 236 + (height + 1)*id;
        return new Q.Button({image:LoadedImages.itemui.image,x:px,y:py,width:width,height:height,
            up:{rect:[cx,cy,width,height]},
            down:{rect:[cx,cy,width,height]}
        });
    };

    ShowMsgWidthAction.prototype.getText = function(text){
        var maxHeight = this.height;
        var height = 28;
        var py = (maxHeight - height)/2;
        return new Q.Text({font:(height-2)+"px arial",x:8,y:py,width:this.width,height:height, color:"#fff",text:text,lineWidth:(this.width - 16),textAlign:"center"});
    };

    ShowMsgWidthAction.prototype.getBg = function(){
        return new Q.Bitmap({image:LoadedImages.foodui.image,x:0,y:0,width:this.width,height:this.height,rect:[477,86,this.width,this.height]});
    };
    return ShowMsgWidthAction;
});