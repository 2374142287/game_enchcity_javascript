/**
 * Created with JetBrains WebStorm.
 * User: john
 * Date: 13-2-19
 * Time: 下午9:56
 * To change this template use File | Settings | File Templates.
 */
define(['jquery','../Queue',winSize+'/QueueInfo'],function($,Queue,QueueInfo){
    var QueueList = function(props)
    {
        QueueList.superClass.constructor.call(this, props);
        this.init();
    };

    Q.inherit(QueueList, Q.DisplayObjectContainer);

    QueueList.prototype.init = function(){
        this.width = 577;
        this.height = 307;
        //每条任务信息起始坐标
        this.startX = 4;
        this.startY = 4;
        //每条任务信息高度
        this.queueHeight = 115;
        //每条任务信息间距
        this.queueMargin = 5;

        this.queues = Array();
        this.queueIndex = 0;
    };

    QueueList.prototype.click = function(eventx,eventy){
        //eventxy为实际屏幕坐标，
        // 先转换为QueueList在QueueContainer中的相对坐标
        var local = this.localToGlobal(0, 0);
        var clickx = eventx - local.x;
        var clicky = eventy - local.y;
        //将得到的相对坐标除以当前缩放值，得到设计坐标
        clicky = clicky / Views.MainView.queueContainer.scaleY;
        var id = this.getIdByPos(clicky);
        if(id>=0&&id<this.queueIndex) this.setQueueSelected(id);
    };
    ///传递设计坐标，获取列表元素Id
    QueueList.prototype.getIdByPos= function(y){
        for(var i=0;i<this.queueIndex;i++){
            var pymin = this.queues[i].y;
            var pymax = (this.queues[i].y + this.queueHeight);
            if(y>=pymin&&y<=pymax) return i;
        }
        return -1;
    };

    QueueList.prototype.addQueue = function(type,complate,content){
        var queue = new Queue();
        queue.id = this.queueIndex;
        queue.Type = type;
        queue.Complate = complate;
        queue.Content = content;
        var px = this.startX;
        var py = this.startY + (this.queueHeight + this.queueMargin)*this.queueIndex;
        this.height = this.startY + (this.queueHeight + this.queueMargin)*(this.queueIndex+1);
        this.queues[this.queueIndex] = new QueueInfo({x:px,y:py},queue);
        this.addChildAt(this.queues[this.queueIndex],1);
        this.queueIndex++;
        //this.DrawQueueInfo();
    };

    QueueList.prototype.setQueueSelected = function(id){
        //trace(id);
        for(var i=0;i<this.queueIndex;i++){
            this.queues[i].setCancelStatus();
            if(this.queues[i].queue.id == id) this.queues[i].setSelectedStatus();
        }
    };

    QueueList.prototype.DrawQueueInfo = function(){
        var px = 4;
        for(var i=0;i<this.queueIndex;i++){
            var py = 4 + (115 + 5)*i;
            var queueInfo = new QueueInfo({x:px,y:py},this.queues[i]);
            this.addChildAt(queueInfo,1);
        }
    };

    return QueueList;
});