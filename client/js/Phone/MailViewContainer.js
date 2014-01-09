/**
 * Created with JetBrains WebStorm.
 * User: john
 * Date: 13-3-23
 * Time: 下午2:31
 * To change this template use File | Settings | File Templates.
 */

define(['jquery',winSize+'/CloseBtn',winSize+'/MailItemContainer',
    winSize+'/MailSendContainer'],function($,CloseBtn,MailItemContainer,MailSendContainer){
    var MailViewContainer = function(props,Message)
    {
        MailViewContainer.superClass.constructor.call(this, props);
        this.init(Message);
    };

    Q.inherit(MailViewContainer, Q.DisplayObjectContainer);

    MailViewContainer.prototype.init = function(Message){
        this.Message = Message;
        this.width = 925;
        this.height = 420;
        this.x = 18;
        this.y = 102;

        this.addChildAt(new CloseBtn({x:15,y:15},function(){
            //关闭
            Views.MainView.MessageContainer.hideMailViewContainer();
        }),0);
        this.addChildAt(this.getInfo("寄件人:",130,16,168,48),0);
        this.addChildAt(this.getInfo(this.Message.sendernickname,312,26,500,30),0);
        this.addChildAt(this.getInfo(this.Message.content,98,64,711,140),0);
        this.mailItemContainer = new MailItemContainer("Rece");
        this.addChildAt(this.mailItemContainer,1);
        if(this.Message.propida != -1) this.mailItemContainer.addPropById(this.Message.propida);
        if(this.Message.propidb != -1) this.mailItemContainer.addPropById(this.Message.propidb);
        if(this.Message.propidc != -1) this.mailItemContainer.addPropById(this.Message.propidc);
        if(this.Message.propidd != -1) this.mailItemContainer.addPropById(this.Message.propidd);
        if(this.Message.propide != -1) this.mailItemContainer.addPropById(this.Message.propide);
        this.addChildAt(this.getReBtn(),1);
        this.addChildAt(this.getDelBtn(),1);
    };
    MailViewContainer.prototype.getInfo = function(text,px,py,width,height){
        var fontHeight = height -5;
        if(height == 140) fontHeight = 25;
        return new Q.Text({font:fontHeight+"px arial",x:px,y:py,width:width,height:height,lineWidth:width, color:"#fff",text:text,textAlign:"left"});
    };

    MailViewContainer.prototype.getReBtn = function(){
        var self = this;
        return this.getBtn(1,3,187,340,function(){
            //回复邮件
            Views.MainView.MessageContainer.newsBtn.changeState('up');
            Views.MainView.MessageContainer.receiveMailBtn.changeState('up');
            Views.MainView.MessageContainer.sendMailBtn.changeState('down');
            Views.MainView.MessageContainer.queueBtn.changeState('up');
            Views.MainView.MessageContainer.clearContainer();
            Views.MainView.MessageContainer.mailSendContainer = new MailSendContainer();
            Views.MainView.MessageContainer.addChildAt(Views.MainView.MessageContainer.mailSendContainer,1);
            Views.MainView.MessageContainer.mailSendContainer.showNickName(
                Views.MainView.ToolBarContainer.friendManager.get(self.Message.senderuserid)
            );
        });
    };
    MailViewContainer.prototype.getDelBtn = function(){
        var self = this;
        return this.getBtn(0,3,492,340,function(){
            //删除一条邮件
            Views.MainView.showDialogYesAndNo(
                "是否确认删除当前邮件？",
                function(){
                    /////删除一条消息数据
                    Sockets.send_reqMessageDel(self.Message.messageid);
                    View.MainView.HideDialogYesAndNo();
                },
                function(){
                    View.MainView.HideDialogYesAndNo();
                }
            );
        });
    };

    MailViewContainer.prototype.getBtn = function(idx,idy,px,py,action){
        var btnwidth = 207;
        var btnheight = 63;
        var margin = 1;
        var cx = 966 + (btnwidth+margin)*idx;
        var cy = 1 + (btnheight+margin)*idy;
        var btn = new Q.Button({image:LoadedImages.mailui.image, x:px,y:py,width:btnwidth,height:btnheight,
            up:{rect:[cx,cy,btnwidth,btnheight]},
            down:{rect:[cx,cy,btnwidth,btnheight]}
        });
        this.addChild(btn);
        btn.addEventListener(events[2], function(e)
        {
            action();
        });
        return btn;
    };
    return MailViewContainer;
});