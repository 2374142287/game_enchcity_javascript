/**
 * Created with JetBrains WebStorm.
 * User: john
 * Date: 13-2-13
 * Time: 上午11:06
 * To change this template use File | Settings | File Templates.
 */
define(['jquery'],function($){
    var infoBarContainer = function(props)
    {
        infoBarContainer.superClass.constructor.call(this, props);
        this.init();
    };

    Q.inherit(infoBarContainer, Q.DisplayObjectContainer);

    infoBarContainer.prototype.init = function(){
        this.Status = "show";
        this.width = 480;
        this.height = 70;
        this.infoBg = this.GetBg();
        //this.infoTxt = this.getBarInfo(Player.nickname,Player.level,Player.magic,Player.experience);
        this.addChildAt(this.infoBg,0);
        this.addChildAt(this.getIcon(0,326),1);
        this.addChildAt(this.getExitBtn(function(){
            Views.MainView.showDialogYesAndNo("是否确实退出游戏?",function(){
                Sockets.send_reqLoginOut();
                window.close();
            },function(){});
        }),2);
        this.container = new Q.DisplayObjectContainer({x:0,y:0,width:this.width,height:this.height});
        this.addChildAt(this.container,1);
        this.reflashData();
    };

    infoBarContainer.prototype.reflashData = function(){
        var self = this;
        self.container.removeAllChildren();
        self.container.addChildAt(self.getNickName(),1);
        self.container.addChildAt(self.getMoney(),1);
    };


    infoBarContainer.prototype.HiddenBar = function(complated){
        Views.MainView.HideAllDialog();
        Views.MainView.InfoBarContainer.Status = "move";
        var timer = new Q.Timer(60);
        timer.addListener(Q.Tween);
        timer.start();
        var po =  - Views.MainView.InfoBarContainer.getCurrentHeight();
        Q.Tween.to(Views.MainView.InfoBarContainer, {y:po}, {time:300, onComplete:function(tween)
        {
            timer.stop();
            Views.MainView.InfoBarContainer.Status = "hidden";
            complated();
        }});
    };
    infoBarContainer.prototype.ShowBar = function(){
        Views.MainView.HideAllDialog();
        Views.MainView.InfoBarContainer.Status = "move";
        var timer = new Q.Timer(60);
        timer.addListener(Q.Tween);
        timer.start();
        var po = 0;
        Q.Tween.to(Views.MainView.InfoBarContainer, {y:po}, {time:300, onComplete:function(tween)
        {
            timer.stop();
            Views.MainView.InfoBarContainer.Status = "show";
        }});
    };

    infoBarContainer.prototype.getNickName = function(){
        return this.getTxt(Player.userNickname,20,210);
    };
    infoBarContainer.prototype.getMoney = function(){
        return this.getTxt(Player.money,280,180);
    };

    infoBarContainer.prototype.getIcon = function(id,px){
        var bmp = new Q.Bitmap({image:LoadedImages.icomoney.image,x:235,y:17,rect:[0,0,35,35]});
        return bmp;
    };

    infoBarContainer.prototype.getTxt = function(showText,px,width){
        var TxtHeight = 35;
        var info = new Q.Text({font:TxtHeight+"px arial",x:px,y:(56-TxtHeight)/ 2,text:showText,height:TxtHeight,width:width, color:"#333333",textAlign:"left"});
        return info;
    }

    infoBarContainer.prototype.getExitBtn = function(callback){
        var btnWidth = 105;
        var btnHeight = 45;
        var px = 846;
        var py = 5;
        var btn = new Q.Button({image:LoadedImages.exitbtn.image,x:px,y:py, width:btnWidth+10, height:btnHeight+10,
            up:{rect:[0,0,btnWidth,btnHeight]},
            down:{rect:[0,0,btnWidth,btnHeight]}
        });

        btn.addEventListener(events[2], function(e)
        {
            callback();
        });
        return btn;
    };

    infoBarContainer.prototype.GetBg = function(){
        var infoBg = new Q.Bitmap({image:LoadedImages.mainui.image,rect:[0,0,480,70]});
        return infoBg;
    };

    return infoBarContainer;
});