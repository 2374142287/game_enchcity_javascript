/**
 * Created with JetBrains WebStorm.
 * User: john
 * Date: 13-3-13
 * Time: 下午7:47
 * To change this template use File | Settings | File Templates.
 */
define(function() {

    var DragController = Class.extend({
        init: function(target,container){
            var timer;
            var isDrag = false;
            var canDrag = true;
            var eventX = 0;
            var eventY = 0;
            var maxC = 0.1;

            var self = this;

			//target.x-=target.width/2;
            //this.limite(target,container,maxC,true,true);   //设置开始时的显示坐标
			
            target.addEventListener(events[0], function(e)  {
                trace("按下"+canDrag);
                var local = target.globalToLocal(e.eventX, e.eventY);
                //点击拖动容器内部元素
                //target.click(e.eventX, e.eventY);
                if(canDrag) isDrag = true;
                eventX = e.eventX;
                eventY = e.eventY;
            });

            //移动
            target.addEventListener(events[1], function(e)  {
                if(isDrag){
                    trace("移动");
                    target.x += e.eventX - eventX;
                    eventX = e.eventX;
                    target.y += e.eventY - eventY;
                    eventY = e.eventY;
                    self.limite(target,container,maxC,canDrag,isDrag);
                }
            });

            //松开
            target.addEventListener(events[2], function(e)  {
                if(isDrag){
                    trace("松开");
                    isDrag = false;
                    canDrag = false;
                    self.limite(target,container,maxC,canDrag,isDrag);

                    var targetY = target.y + 10;
                    if(e.eventY - eventY>0) targetY = target.y - 10;
                    //if(e.eventY == eventY) targetY = target.y;

                    timer = new Q.Timer(60);
                    timer.addListener(Q.Tween);
                    timer.start();
                    Q.Tween.to(target, {y:targetY, alpha:1}, {time:300, onComplete:function(tween)
                    {
                        timer.stop();
                        canDrag = true;
                        isDrag = false;
                    }});
                }
            });

            //离开
            target.addEventListener(events[3], function(e)  {
                    //trace("离开");
                if(isDrag){
                    isDrag = false;
                    canDrag = false;
                    self.limite(target,container,maxC,canDrag,isDrag);

                    var targetY = target.y + 10;
                    if(e.eventY - eventY>0) targetY = target.y - 10;
                    //if(e.eventY == eventY) targetY = target.y;

                    timer = new Q.Timer(60);
                    timer.addListener(Q.Tween);
                    timer.start();
                    Q.Tween.to(target, {y:targetY, alpha:1}, {time:300, onComplete:function(tween)
                    {
                        timer.stop();
                        canDrag = true;
                        isDrag = false;
                    }});
                }
            });

            target.eventChildren = false;
        },

        limite:function(target,container,maxC,canDrag,isDrag)
        {

            //拖动上限
            if(target.x>=0){
                var targetX = -maxC * container.getCurrentWidth();

                var timer = new Q.Timer(60);
                timer.addListener(Q.Tween);
                timer.start();
                Q.Tween.to(target, {x:targetX, alpha:1}, {time:300, onComplete:function(tween)
                {
                    timer.stop();
                    canDrag = true;
                    isDrag = false;
                }});
            }
            if(target.y>=0){
                var targetY = -maxC * container.getCurrentHeight();

                var timer = new Q.Timer(60);
                timer.addListener(Q.Tween);
                timer.start();
                Q.Tween.to(target, {y:targetY, alpha:1}, {time:300, onComplete:function(tween)
                {
                    timer.stop();
                    canDrag = true;
                    isDrag = false;
                }});
            }
            //拖动下限
            if(target.x<=container.getCurrentWidth() - target.getCurrentWidth()){
                var targetX = container.getCurrentWidth() - target.getCurrentWidth()*(1-maxC);

                var timer = new Q.Timer(60);
                timer.addListener(Q.Tween);
                timer.start();
                Q.Tween.to(target, {x:targetX, alpha:1}, {time:300, onComplete:function(tween)
                {
                    timer.stop();
                    canDrag = true;
                    isDrag = false;
                }});
            }
            //拖动下限
            if(target.y<=container.getCurrentHeight() - target.getCurrentHeight()){
                var targetY = container.getCurrentHeight() - target.getCurrentHeight()*(1-maxC);

                var timer = new Q.Timer(60);
                timer.addListener(Q.Tween);
                timer.start();
                Q.Tween.to(target, {y:targetY, alpha:1}, {time:300, onComplete:function(tween)
                {
                    timer.stop();
                    canDrag = true;
                    isDrag = false;
                }});
            }
        }

    });

    return DragController;
});