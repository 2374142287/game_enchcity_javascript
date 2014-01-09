/**
 * Created with JetBrains WebStorm.
 * User: john
 * Date: 13-2-23
 * Time: 下午10:03
 * To change this template use File | Settings | File Templates.
 */

define(['jquery',winSize+'/QueueList',"../lib/ContainerDragController"],function($,queueList,ContainerDragController){
    var QueueListContainer = function(props)
    {
        QueueListContainer.superClass.constructor.call(this, props);
        this.init();
    };

    Q.inherit(QueueListContainer, Q.DisplayObjectContainer);

    QueueListContainer.prototype.init = function(){
        this.width = 695;
        this.height = 307;

        QueueList = new queueList({x:41,y:0});
        QueueList.addQueue("主线任务","完成度：20%","调制食物数量超过20");
        QueueList.addQueue("主线任务","完成度：32%","好友数量超过18");
        QueueList.addQueue("主线任务","完成度：62%","拜访10位好友");
        QueueList.addQueue("主线任务","完成度：72%","购买商城商品超过数量20");

        this.addChildAt(QueueList,1);

        var containerDragController = new ContainerDragController(QueueList,this);
    };

    return QueueListContainer;
});