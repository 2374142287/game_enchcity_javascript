/**
 * Created with JetBrains WebStorm.
 * User: john
 * Date: 13-2-19
 * Time: 下午8:35
 * To change this template use File | Settings | File Templates.
 */
define(['jquery',winSize+'/QueueListContainer'],function($,QueueListContainer){
    var QueueContainer = function(props)
    {
        QueueContainer.superClass.constructor.call(this, props);
        this.init();
    };

    Q.inherit(QueueContainer, Q.DisplayObjectContainer);

    QueueContainer.prototype.init = function(){

        this.width = 695;
        this.height = 450;

        this.btnWidth = 175;
        this.btnHeight = 46;
        this.btnMargin = 1;

        this.addChildAt(this.GetBg(),0);
        this.addChildAt(this.GetBtn(0,function(){
            //领取奖励
            Views.MainView.HideQueueContainer();
            Views.MainView.ShowQueueGetAwardDialog();
        }),3);
        this.addChildAt(this.GetBtn(1,function(){
            //关闭
            Views.MainView.HideQueueContainer();
        }),3);
        this.addChildAt(new QueueListContainer({x:0,y:57}),1);
    };

    QueueContainer.prototype.GetMask = function(){
        var g = new Q.Graphics({width:QueueList.width, height:QueueList.height, x:0, y:0});
        g.drawRect(0, 0, QueueList.width, QueueList.height).beginFill("#000000").endFill().cache();
        return g;
    }

    QueueContainer.prototype.GetBtn = function(id,action){
        var cy = (this.btnHeight + this.btnMargin)*id*2;
        var px = 160 + (this.btnWidth+32)*id;
        var btn = new Q.Button({image:LoadedImages.queueui.image, x:px, y:384, width:this.btnWidth, height:this.btnHeight,
            up:{rect:[0,cy,this.btnWidth,this.btnHeight]},
            down:{rect:[0,cy + (this.btnHeight + this.btnMargin),this.btnWidth,this.btnHeight]}
        });
        btn.addEventListener(events[2], function(e)
        {
            action();
        });
        return btn;
    };

    QueueContainer.prototype.GetBg = function(){
        return new Q.Bitmap({image:LoadedImages.queueui.image,x:0,y:0,width:this.width,height:this.height,rect:[445,232,this.width,this.height]});
    };
    return QueueContainer;
});