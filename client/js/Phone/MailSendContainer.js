/**
 * Created with JetBrains WebStorm.
 * User: john
 * Date: 13-3-23
 * Time: 下午2:31
 * To change this template use File | Settings | File Templates.
 */

define(['jquery',winSize+'/CloseBtn',winSize+'/MailItemContainer','Mail'],function($,CloseBtn,MailItemContainer,Mail){
    var MailSendContainer = function(props)
    {
        MailSendContainer.superClass.constructor.call(this, props);
        this.init();
    };

    Q.inherit(MailSendContainer, Q.DisplayObjectContainer);

    MailSendContainer.prototype.init = function(){
        this.width = 925;
        this.height = 420;
        this.x = 18;
        this.y = 102;

        this.mail = new Mail();

        this.addChildAt(this.getInfo("收件人:",130,16,168,48),0);
        this.nickname = this.getInfo("请选择",312,26,255,30);
        this.addChildAt(this.nickname,0);
        this.content = this.getTextArea("");
        this.addChildAt(this.content,0);
        this.mailItemContainer = new MailItemContainer("Send");
        this.addChildAt(this.mailItemContainer,1);
        this.addChildAt(this.getSelectFriendBtn(),1);
        this.addChildAt(this.getSendBtn(),1);
    };
    MailSendContainer.prototype.getInfo = function(text,px,py,width,height){
        return new Q.Text({font:(height-5)+"px arial",x:px,y:py,width:width,height:height,lineWidth:width, color:"#fff",text:text,textAlign:"left"});
    };

    MailSendContainer.prototype.showNickName = function(friend)
    {
        var self = this;
        Views.MainView.MessageContainer.mailSendContainer.removeChild(Views.MainView.MessageContainer.mailSendContainer.nickname);
        Views.MainView.MessageContainer.mailSendContainer.nickname = Views.MainView.MessageContainer.mailSendContainer.getInfo(friend.nickname,312,26,255,30);
        Views.MainView.MessageContainer.mailSendContainer.addChildAt(Views.MainView.MessageContainer.mailSendContainer.nickname,1);
        //self.nickname.text = friend.nickname;
        this.mail.receiveuserid = friend.frienduserid;
    };

    MailSendContainer.prototype.getSelectFriendBtn = function(){
        return this.getBtn(1,4,578,6,function(){
            //选择好友
            Views.MainView.MessageContainer.showFriends();
        });
    };

    MailSendContainer.prototype.getSendBtn = function(){
        var self = this;
        return this.getBtn(0,4,360,340,function(){
            if(self.mail.receiveuserid == -1) {
                Views.MainView.ShowMessage("您未选择收件人，邮件发送失败！");
                return;
            }
            //发送邮件
            self.mail.content = self.content.getValue();
            if(self.mailItemContainer.props.length>0) self.mail.propida = self.mailItemContainer.props[0].propid;
            if(self.mailItemContainer.props.length>1) self.mail.propida = self.mailItemContainer.props[1].propid;
            if(self.mailItemContainer.props.length>2) self.mail.propida = self.mailItemContainer.props[2].propid;
            if(self.mailItemContainer.props.length>3) self.mail.propida = self.mailItemContainer.props[3].propid;
            if(self.mailItemContainer.props.length>4) self.mail.propida = self.mailItemContainer.props[4].propid;
            Sockets.send_reqMessageSend(self.mail);
            Views.MainView.HideMessageContainer();
        });
    };
    MailSendContainer.prototype.getBtn = function(idx,idy,px,py,action){
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
    MailSendContainer.prototype.getTextBox = function(px,py,value){
        var width = 273;
        var height = 57;
        var inputHeight = 30;
        var container = new Q.DisplayObjectContainer({x:px,y:py,width:width,height:height});
        var bg = new Q.Bitmap({image:LoadedImages.mailui.image,rect:[378,627,width,height]});
        this.textInput = new Q.TextBox({x:0,y:(height-inputHeight)/2,width:width,height:inputHeight,value:value,style:{color:"#000",transparent:"1",font:inputHeight+"px"}});
        container.addChildAt(bg,0);
        container.addChildAt(this.textInput,1);
        return container;
    };
    MailSendContainer.prototype.getTextArea = function(value){
        var width = 711;
        var height = 140;
        var textInput = new Q.TextArea({x:98,y:64,width:width,height:height,value:value,style:{color:"#fff",transparent:"1",font:"30px"}});
        return textInput;
    };
    return MailSendContainer;
});