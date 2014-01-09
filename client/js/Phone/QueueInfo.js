/**
 * Created with JetBrains WebStorm.
 * User: john
 * Date: 13-3-15
 * Time: 下午8:50
 * To change this template use File | Settings | File Templates.
 */
define(['jquery',winSize+'/CloseBtn'],function($,CloseBtn){
    var QueueInfo = function(props,Queue)
    {
        QueueInfo.superClass.constructor.call(this, props);
        this.init(Queue);
    };

    Q.inherit(QueueInfo, Q.DisplayObjectContainer);

    QueueInfo.prototype.init = function(Queue){
        var self = this;
        self.Queue = Queue;
        self.width = 805;
        self.height = 85;
        self.addChildAt(self.getBtn(),0);
        self.addChildAt(self.getQueueInfo(),1);
        self.addEventListener(events[2], function(e)
        {
            //显示任务详情
            Views.MainView.MessageContainer.showTaskViewContainer(self.Queue);
        });
        this.eventChildren = false;
        this.useHandCursor = true;
    };
    QueueInfo.prototype.getQueueInfo = function(){
        var text = this.Queue.name;
        return new Q.Text({font:"36px arial",x:30,y:25,width:680,height:36, color:"#000",text:text,textAlign:"left"});
    };

    QueueInfo.prototype.getBtn = function(){
        var btn = new Q.Button({image:LoadedImages.mailui.image,x:0,y:0,width:745,height:this.height,
            up:{rect:[378,541,745,this.height]},
            down:{rect:[378,541,745,this.height]}
        });
        return btn;
    };

    return QueueInfo;
});