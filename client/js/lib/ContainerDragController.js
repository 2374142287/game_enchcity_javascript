/**
 * Created with JetBrains WebStorm.
 * User: john
 * Date: 13-2-20
 * Time: 下午9:30
 * To change this template use File | Settings | File Templates.
 */


define(function() {

    var ContainerDragController = Class.extend({
        init: function(target,container){
            var isDrag = false;
            //拖动target.y超过target高度的倍数，则自动返回极限值
            var maxC = 0.3;
            var eventY = 0;
            var minY = target.y;
            var maxY = container.getCurrentHeight() - target.getCurrentHeight();
            var timer;
            var canDrag = true;
            //按下
            target.addEventListener(events[0], function(e)  {
                trace("按下"+canDrag);
                //trace("e.eventX:"+e.eventX+" e.eventY:"+e.eventY);
                var local = target.globalToLocal(e.eventX, e.eventY);
                target.click(e.eventX, e.eventY);
                //var local = target.localToGlobal(0, 0);
                //target.click(local.x, local.y);
                if(canDrag) isDrag = true;
                eventY = e.eventY;
            });
            //移动
            target.addEventListener(events[1], function(e)  {
                if(isDrag){
                    //trace("移动");
                    target.y += e.eventY - eventY;
                    eventY = e.eventY;
                    //拖动上限
                    if(target.y>container.getCurrentHeight()*maxC){
                        var targetY = minY;

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
                    //拖动下限
                    if(target.y<container.getCurrentHeight()*(1-maxC) - target.getCurrentHeight()){
                        var targetY = maxY;

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

                }
            });
            //松开
            target.addEventListener(events[2], function(e)  {
                if(isDrag){
                    isDrag = false;
                    canDrag = false;
                    //拖动上限
                    if(target.y>container.getCurrentHeight()*maxC){
                        var targetY = minY;

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
                    //拖动下限
                    if(target.y<container.getCurrentHeight()*(1-maxC) - target.getCurrentHeight()){
                        var targetY = maxY;

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

                    var targetY = maxY;
                    if(e.eventY - eventY>0) targetY = minY;
                    if(e.eventY == eventY) targetY = target.y;

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
                    //拖动上限
                    if(target.y>container.getCurrentHeight()*maxC){
                        var targetY = minY;

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
                    //拖动下限
                    if(target.y<container.getCurrentHeight()*(1-maxC) - target.getCurrentHeight()){
                        var targetY = maxY;

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

                    var targetY = maxY;
                    if(e.eventY - eventY>0) targetY = minY;
                    if(e.eventY == eventY) targetY = target.y;

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
            target.useHandCursor = true;
            target.eventChildren = false;
        }

    });
    return ContainerDragController;
});