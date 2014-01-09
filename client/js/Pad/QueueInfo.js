/**
 * Created with JetBrains WebStorm.
 * User: john
 * Date: 13-2-19
 * Time: 下午9:22
 * To change this template use File | Settings | File Templates.
 */
define(['jquery'],function($){
    var QueueInfo = function(props,Queue)
    {
        QueueInfo.superClass.constructor.call(this, props, Queue);
        this.init(Queue);
    };

    Q.inherit(QueueInfo, Q.DisplayObjectContainer);

    QueueInfo.prototype.init = function(Queue){

        this.width = 570;
        this.height = 115;
        this.imgMargin = 1;

        this.TxtHeight = 20;
        this.TxtColor = "#FFF61F";

        this.queue = Queue;

        this.cancelStatus = this.getCancelStatus();
        this.selectedStatus = this.getSelectedStatus();
        this.addChildAt(this.cancelStatus,0);
        //this.Btn = this.GetBtn(this.queue.id);

        this.addChildAt(this.GetTypeTxt(),1);
        this.addChildAt(this.GetComplateTxt(),1);
        this.addChildAt(this.GetContentTxt(),1);

    };

    QueueInfo.prototype.setSelectedStatus = function(){
        this.removeChild(this.cancelStatus);
        this.addChildAt(this.selectedStatus,0);
    };

    QueueInfo.prototype.setCancelStatus = function(){
        this.removeChild(this.selectedStatus);
        this.addChildAt(this.cancelStatus,0);
    };

    QueueInfo.prototype.getSelectedStatus = function(){
        return new Q.Bitmap({image:LoadedImages.queueui.image,x:0,y:0,width:this.width,height:this.height,rect:[177,1,this.width,this.height]});
    };

    QueueInfo.prototype.getCancelStatus = function(){
        return new Q.Bitmap({image:LoadedImages.queueui.image,x:0,y:0,width:this.width,height:this.height,rect:[177,1 + this.imgMargin + this.height,this.width,this.height]});
    };
/*
    QueueInfo.prototype.SetButtonStatus = function(isEnabled)
    {
        this.Btn.setEnabled(isEnabled);
    };

    QueueInfo.prototype.GetBtn = function(id){
        var btn = new Q.Button({image:LoadedImages.queueui.image, x:0, y:0, width:this.width, height:this.height,
            up:{rect:[177,1 + this.btnMargin + this.height,this.width,this.height]},
            //down:{rect:[177,1 + this.btnMargin + this.height,this.width,this.height]},
            disabled:{rect:[177,1,this.width,this.height]}
        });
        btn.addEventListener(events[2], function(e)
        {
            QueueList.setBtnEnabled(id);
        });
        return btn;
    };
*/
    QueueInfo.prototype.GetTypeTxt = function(){
        return this.GetTxt(43,13,100,this.queue.Type,"left");
    };

    QueueInfo.prototype.GetComplateTxt = function(){
        return this.GetTxt(308,17,200,this.queue.Complate,"right");
    };

    QueueInfo.prototype.GetContentTxt = function(){
        var txt = this.GetTxt(43,47,478,this.queue.Content,"left");
        txt.lineWidth = 478;
        txt.height = 47;
        txt.lineSpacing = 7;
        return txt;
    };

    QueueInfo.prototype.GetTxt = function(px,py,w,text,align){
        var txtheight = this.TxtHeight - 2;
        return new Q.Text({font:txtheight+"px arial",x:px,y:py,width:w,height:this.TxtHeight,weight:"bold",color:this.TxtColor,text:text,textAlign:align});
    };
    return QueueInfo;
});