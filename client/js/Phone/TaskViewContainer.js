/**
 * Created with JetBrains WebStorm.
 * User: john
 * Date: 13-3-24
 * Time: 下午2:22
 * To change this template use File | Settings | File Templates.
 */
define([winSize+'/CloseBtn'],function(CloseBtn){
    var TaskViewContainer = function(props,task)
    {
        TaskViewContainer.superClass.constructor.call(this, props);
        this.init(task);
    };

    Q.inherit(TaskViewContainer, Q.DisplayObjectContainer);

    TaskViewContainer.prototype.init = function(task){
        this.Task = task;
        this.width = 925;
        this.height = 420;
        this.x = 18;
        this.y = 102;

        this.addChildAt(new CloseBtn({x:15,y:15},function(){
            //关闭
            Views.MainView.MessageContainer.hideTaskViewContainer();
        }),0);
        var status = "";
        var isShowGetBounsButton = false;
        switch(this.Task.status){
            case 0:
                status = "任务状态:未开始";
                break;
            case 1:
                status = "任务状态:正在进行";
                break;
            case 2:
                status = "任务状态:已经完成";
                isShowGetBounsButton = true;
                break;
            case 3:
                status = "任务状态:已领奖";
                break;
        }
        this.addChildAt(this.getInfo(status,500,30,300,50));
        this.addChildAt(this.getInfo(this.Task.comment,110,80,700,150));
        this.addChildAt(this.getInfo(this.Task.bonus,110,230,700,100));
        var self = this;
        this.getBonusBtn = this.getBtn(0,2,356,340,function(){
            //领取奖励
            Sockets.send_reqTaskBonus(self.Task.taskid);
        });
        if(isShowGetBounsButton) this.addChildAt(this.getBonusBtn);
    };

    TaskViewContainer.prototype.getInfo = function(text,px,py,width,height){
        var fontHeight = 25;
        return new Q.Text({font:fontHeight+"px arial",x:px,y:py,width:width,height:height,lineWidth:width, color:"#fff",text:text,textAlign:"left"});
    };

    TaskViewContainer.prototype.getBtn = function(idx,idy,px,py,action){
        var btnwidth = 207;
        var btnheight = 63;
        var margin = 1;
        var cx = 966 + (btnwidth+margin)*idx;
        var cy = 1 + (btnheight+margin)*idy;
        var btn = new Q.Button({image:LoadedImages.mailui.image, x:px,y:py,width:btnwidth,height:btnheight,
            up:{rect:[cx,cy,btnwidth,btnheight]},
            down:{rect:[cx,cy,btnwidth,btnheight]}
        });
        btn.addEventListener(events[2], function(e)
        {
            action();
        });
        return btn;
    };
    return TaskViewContainer;
});