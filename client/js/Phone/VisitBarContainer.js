/**
 * Created with JetBrains WebStorm.
 * User: john
 * Date: 13-3-16
 * Time: 上午10:47
 * To change this template use File | Settings | File Templates.
 */
define(function(){
    var visitBarContainer = function(props)
    {
        visitBarContainer.superClass.constructor.call(this, props);
        this.init();
    };

    Q.inherit(visitBarContainer, Q.DisplayObjectContainer);

    visitBarContainer.prototype.init = function(){
        this.Status = "show";
        this.addChildAt(this.getGoHomeBtn(),0);

    };

    //动画
    visitBarContainer.prototype.HiddenBar = function(complated){
        Views.MainView.HideAllDialog();
        Views.MainView.VisitBarContainer.Status = "move";
        var timer = new Q.Timer(60);
        timer.addListener(Q.Tween);
        timer.start();
        var po = Views.MainView.getCurrentHeight();
        Q.Tween.to(Views.MainView.VisitBarContainer, {y:po}, {time:300, onComplete:function(tween)
        {
            timer.stop();
            Views.MainView.VisitBarContainer.Status = "hidden";
            complated();
        }});
    };
    visitBarContainer.prototype.ShowBar = function(){
        Views.MainView.HideAllDialog();
        Views.MainView.VisitBarContainer.Status = "move";
        var timer = new Q.Timer(60);
        timer.addListener(Q.Tween);
        timer.start();
        var po = Views.MainView.getCurrentHeight() - Views.MainView.VisitBarContainer.getCurrentHeight();
        Q.Tween.to(Views.MainView.VisitBarContainer, {y:po}, {time:300, onComplete:function(tween)
        {
            timer.stop();
            Views.MainView.VisitBarContainer.Status = "show";
        }});
        if(Views.MainView.ToolBarContainer.friendManager.get(Sockets.dataManager.visitFriendid) == -1){
            this.addChildAt(this.getAddFriendBtn(),0);
        }else{
            this.addChildAt(this.getzhiyouzhiLiBtn(),0);
            this.addChildAt(this.getyoumantianXiaBtn(),0);
            this.addChildAt(this.getsunyouzhiZhouBtn(),0);
            this.addChildAt(this.getqunyouzhiZhouBtn(),0);
        }
    };

    visitBarContainer.prototype.getGoHomeBtn = function(){
        return this.getBtn(0,function(){
            Sockets.send_ReqVisitBack();
        });
    };
    visitBarContainer.prototype.getAddFriendBtn = function(){
        return this.getBtn(6,function(){
            Sockets.send_ReqFriendAdd(Sockets.dataManager.visitFriendid);
        });
    };

    visitBarContainer.prototype.getzhiyouzhiLiBtn = function(){
        var self = this;
        return this.getPropBtn(1,function(){
            self.useProp(1);
        });
    };

    visitBarContainer.prototype.getyoumantianXiaBtn = function(){
        var self = this;
        return this.getPropBtn(2,function(){
            self.useProp(2);
        });
    };

    visitBarContainer.prototype.getsunyouzhiZhouBtn = function(){
        var self = this;
        return this.getPropBtn(3,function(){
            self.useProp(3);
        });
    };

    visitBarContainer.prototype.getqunyouzhiZhouBtn = function(){
        var self = this;
        return this.getPropBtn(4,function(){
            self.useProp(4);
        });
    };

    visitBarContainer.prototype.useProp = function(id){
        var propid = id + 11;
        var propName = Views.MainView.ToolBarContainer.propShopManager.get(propid).name;
        Views.MainView.HideAllDialog();
        if(Views.MainView.ToolBarContainer.propManager.get(propid) == -1)
        {
            Views.MainView.ShowMessage("您没有道具["+propName+"],请到商城购买！");
        }
        Views.MainView.showDialogYesAndNo("是否使用["+propName+"]道具施加给好友？",function(){
            Sockets.send_ReqPropUse(propid,Sockets.dataManager.visitFriendid);
            Views.MainView.HideDialogYesAndNo();
        },function(){
            Views.MainView.HideDialogYesAndNo();
        });
    };

    visitBarContainer.prototype.getPropBtn = function(id,callback){
        var px = 200 + 140*(id-1);
        var py =0;
        var cx = 101*(id-1);
        var cy = 0;
        var btn = new Q.Button({image:LoadedImages.visiticon.image, x:px, y:py, width:100, height:100,
            up:{rect:[cx,cy,100,100]},
            down:{rect:[cx,cy+101,100,100]}
        });
        btn.addEventListener(events[2], function(e)
        {
            callback();
        });
        return btn;
    };

    visitBarContainer.prototype.getBtn = function(id,callback){
        var px = 10;
        if(id==0) px = 10;
        else if(id==6) px = 810;
        else px = 200 + 140*(id-1);
        var py =0;
        var cx = 140*id;
        var cy = 0;
        var btn = new Q.Button({image:LoadedImages.mainicon.image, x:px, y:py, width:140, height:100,
            up:{rect:[cx,cy,140,100]},
            down:{rect:[cx,cy+100,140,100]}
        });
        btn.addEventListener(events[2], function(e)
        {
            callback();
        });
        return btn;
    };


    return visitBarContainer;
});