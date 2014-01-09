/**
 * Created with JetBrains WebStorm.
 * User: john
 * Date: 13-2-17
 * Time: 下午8:02
 * To change this template use File | Settings | File Templates.
 */
define(function(){
    var DragMapController = function(props,parent,target)
    {
        DragMapController.superClass.constructor.call(this, props,parent,target);
        this.init(parent,target);
    };

    Q.inherit(DragMapController, Q.DisplayObjectContainer);

    DragMapController.prototype.init = function(parent,target){
        this.target = target;
        this.container = parent;
        this.DragStartX = 75;
        this.DragStartY = 75;

        this.addChildAt(this.GetBg(),0);
        this.addChildAt(this.GetButton(),1);
    };

    DragMapController.prototype.GetButton = function(){
        var btn = new Q.Button({image:LoadedImages.dragmapui.image, x:this.DragStartX, y:this.DragStartY, width:100, height:100,
            up:{rect:[250,0,100,100]},
            down:{rect:[250,100,100,100]}
        });
        this.SetDragItemAction(btn,events);
        return btn;
    };

    DragMapController.prototype.SetDragItemAction = function(eventObj,events) {
        var eventx = 0;
        var eventy = 0;
        var startDarg = false;

        //trace("gameView:"+gameView.x);
        eventObj.addEventListener(events[0], function(e) {
            startDarg = true;
            eventx = e.eventX;
            eventy = e.eventY;
        });

        eventObj.addEventListener(events[1], function(e) {
            if(startDarg){
                //拖动体移动
                eventObj.x += e.eventX - eventx;
                eventObj.y += e.eventY - eventy;

                //目标物只能在parentContainer中拖动
                if(Views.MainView.GameView.x<=0 && Views.MainView.GameView.x >= Views.MainView.getCurrentWidth() - Views.MainView.GameView.getCurrentWidth())
                {
                    Views.MainView.GameView.x = Views.MainView.GameView.x - (eventObj.x - Views.MainView.DragMapController.DragStartX);//e.eventX - eventx;
                }
                if(Views.MainView.GameView.x>0)
                {
                    Views.MainView.GameView.x = 0;
                }else if(Views.MainView.GameView.x < Views.MainView.getCurrentWidth() - Views.MainView.GameView.getCurrentWidth())
                {
                    Views.MainView.GameView.x = Views.MainView.getCurrentWidth() - Views.MainView.GameView.getCurrentWidth();
                }

                if(Views.MainView.GameView.y<=0 && Views.MainView.GameView.y >= Views.MainView.getCurrentHeight() - Views.MainView.GameView.getCurrentHeight())
                {
                    Views.MainView.GameView.y = Views.MainView.GameView.y - (eventObj.y - Views.MainView.DragMapController.DragStartY);//e.eventY - eventy;
                }
                if(Views.MainView.GameView.y>0)
                {
                    Views.MainView.GameView.y = 0;
                }else if(Views.MainView.GameView.y < Views.MainView.getCurrentHeight() - Views.MainView.GameView.getCurrentHeight())
                {
                    Views.MainView.GameView.y = Views.MainView.getCurrentHeight() - Views.MainView.GameView.getCurrentHeight();
                }
                eventx = e.eventX;
                eventy = e.eventY;
            }
        });

        eventObj.addEventListener(events[2], function(e)  {
            startDarg = false;
            eventObj.x = Views.MainView.DragMapController.DragStartX;
            eventObj.y = Views.MainView.DragMapController.DragStartY;
            eventx = 0;
            eventy = 0;
        });

        eventObj.addEventListener(events[3], function(e)  {
            startDarg = false;
            eventObj.x = Views.MainView.DragMapController.DragStartX;
            eventObj.y = Views.MainView.DragMapController.DragStartY;
            eventx = 0;
            eventy = 0;
        });
    };

    DragMapController.prototype.GetBg = function(){
        return new Q.Bitmap({image:LoadedImages.dragmapui.image,x:0,y:0,width:250,height:250,rect:[0,0,250,250]});
    };

    return DragMapController;
    });