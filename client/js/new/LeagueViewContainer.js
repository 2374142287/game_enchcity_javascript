/**
 * Created with JetBrains WebStorm.
 * User: john
 * Date: 13-3-15
 * Time: 下午7:22
 * To change this template use File | Settings | File Templates.
 */
define([winSize+'/MessageListContainer',
    winSize+'/CloseBtn',
    winSize+'/MailViewContainer',
    winSize+'/MailSendContainer',
    winSize+'/SelectContainer',
    winSize+'/TaskViewContainer'],
    function(MessageListContainer,
             CloseBtn,
             MailViewContainer,
             MailSendContainer,
             SelectContainer,
             TaskViewContainer){
        var LeagueViewContainer = function(props)
        {
            LeagueViewContainer.superClass.constructor.call(this,props);
            this.init();
        };

        Q.inherit(LeagueViewContainer, Q.DisplayObjectContainer);

        LeagueViewContainer.prototype.init = function(){
            this.width = Views.DisplayObjectsDefine.displayer.fixWinWidth;
            this.height = Views.DisplayObjectsDefine.displayer.fixWinHeight;

            this.newsBtn = this.getNewsBtn();
            this.receiveMailBtn = this.getReceiveMailBtn();
            this.sendMailBtn = this.getSendMailBtn();
            this.queueBtn = this.getQueueBtn();
            this.addChildAt(this.newsBtn,1);
            this.addChildAt(this.receiveMailBtn,1);
            this.addChildAt(this.sendMailBtn,1);
            this.addChildAt(this.queueBtn,1);
            this.queueBtn.changeState('down');
            this.leagueManageListContainer = new LeagueManageListContainer();
            this.leagueManageListContainer.setShowType('leagues');
            this.addChildAt(this.leagueManageListContainer,1);

            this.mailViewContainer = new Q.DisplayObjectContainer();
            this.mailSendContainer = new MailSendContainer();
            this.selectContainer = new Q.DisplayObjectContainer();

            this.taskViewContainer = new Q.DisplayObjectContainer();
        };

        LeagueViewContainer.prototype.getNewsBtn = function(){
            var self = this;
            return this.getBtn(0,function(){
                self.newsBtn.changeState('down');
                self.receiveMailBtn.changeState('up');
                self.sendMailBtn.changeState('up');
                self.queueBtn.changeState('up');
                self.clearContainer();
                self.leagueManageListContainer = new LeagueManageListContainer();
                self.addChildAt(self.leagueManageListContainer,1);
                self.leagueManageListContainer.setShowType('mails');
                self.leagueManageListContainer.showInfos();
            });
        };

        LeagueViewContainer.prototype.getReceiveMailBtn = function(){
            var self = this;
            return this.getBtn(1,function(){
                self.newsBtn.changeState('up');
                self.receiveMailBtn.changeState('down');
                self.sendMailBtn.changeState('up');
                self.queueBtn.changeState('up');
                self.clearContainer();
                self.messageListContainer = new MessageListContainer();
                self.addChildAt(self.messageListContainer,1);
                self.messageListContainer.setShowType('receivemail');
                self.messageListContainer.showInfos();
            });
        };

        LeagueViewContainer.prototype.getSendMailBtn = function(){
            var self = this;
            return this.getBtn(2,function(){
                self.newsBtn.changeState('up');
                self.receiveMailBtn.changeState('up');
                self.sendMailBtn.changeState('down');
                self.queueBtn.changeState('up');
                self.clearContainer();
                self.mailSendContainer = new MailSendContainer();
                self.addChildAt(self.mailSendContainer,1);
            });
        };

        LeagueViewContainer.prototype.getQueueBtn = function(){
            var self = this;
            return this.getBtn(3,function(){
                self.newsBtn.changeState('up');
                self.receiveMailBtn.changeState('up');
                self.sendMailBtn.changeState('up');
                self.queueBtn.changeState('down');
                self.clearContainer();
                self.messageListContainer = new MessageListContainer();
                self.addChildAt(self.messageListContainer,1);
                self.messageListContainer.setShowType('queue');
                self.messageListContainer.showInfos();
            });
        };

        LeagueViewContainer.prototype.showFriends = function(){
            var self = this;
            self.selectContainer = new SelectContainer({},"Frie");
            self.addChild(self.selectContainer);
            self.selectContainer.showItem();
        };

        LeagueViewContainer.prototype.showProps = function(){
            var self = this;
            self.selectContainer = new SelectContainer({},"Prop");
            self.addChild(self.selectContainer);
            self.selectContainer.showItem();
        };

        LeagueViewContainer.prototype.hideSelectContainer = function(){
            var self = this;
            self.removeChild(self.selectContainer);
        };

        LeagueViewContainer.prototype.addFriendToMail = function(friend){
            this.mailSendContainer.showNickName(friend);
        };

        LeagueViewContainer.prototype.addPropToMail = function(prop){
            this.mailSendContainer.mailItemContainer.addPropById(prop.propid);
        };

        LeagueViewContainer.prototype.showMailViewContainer = function(message){
            var self = this;
            self.clearContainer();
            self.mailViewContainer = new MailViewContainer({},message);
            self.addChild(self.mailViewContainer);
        };

        LeagueViewContainer.prototype.hideMailViewContainer = function(){
            var self = this;
            self.removeChild(self.mailViewContainer);
            //显示邮件列表
            self.newsBtn.changeState('up');
            self.receiveMailBtn.changeState('down');
            self.sendMailBtn.changeState('up');
            self.queueBtn.changeState('up');
            self.clearContainer();
            self.messageListContainer = new MessageListContainer();
            self.addChildAt(self.messageListContainer,1);
            self.messageListContainer.setShowType('receivemail');
            self.messageListContainer.showInfos();
        };

        LeagueViewContainer.prototype.showTaskViewContainer = function(task){
            var self = this;
            self.clearContainer();
            self.taskViewContainer = new TaskViewContainer({},task);
            self.addChild(self.taskViewContainer);
        };
        LeagueViewContainer.prototype.hideTaskViewContainer = function(){
            var self = this;
            self.newsBtn.changeState('up');
            self.receiveMailBtn.changeState('up');
            self.sendMailBtn.changeState('up');
            self.queueBtn.changeState('down');
            self.clearContainer();
            self.messageListContainer = new MessageListContainer();
            self.addChildAt(self.messageListContainer,1);
            self.messageListContainer.setShowType('queue');
            self.messageListContainer.showInfos();
        };
        LeagueViewContainer.prototype.clearContainer = function(){
            var self = this;
            self.removeChild(self.taskViewContainer);
            self.removeChild(self.mailViewContainer);
            self.removeChild(self.messageListContainer);
            self.removeChild(self.mailSendContainer);
        };

        LeagueViewContainer.prototype.getBtn = function(id,callback){
            var iconWidth = 192;
            var iconHeight = 87;
            var iconcMargin = 1;
            var iconpMargin = 25;
            var px = 90 + (iconWidth+iconpMargin)*id;
            var py = 12;
            var cx = 0;
            var cy = 541 + (iconHeight+iconcMargin)*id;
            var btn = new Q.Button({image:LoadedImages.messageui.image, x:px, y:py, width:iconWidth, height:iconHeight,
                up:{rect:[cx,cy,182,iconHeight]},
                down:{rect:[cx + 182 + iconcMargin,cy,iconWidth,iconHeight]},
                disabled:{rect:[cx + 182 + iconcMargin,cy,iconWidth,iconHeight]}
            });
            btn.addEventListener(events[2], function(e)
            {
                //e.eventTarget.changeState('down');
                callback();
            });
            return btn;
        };
        LeagueViewContainer.prototype.getBg = function(){
            return new Q.Bitmap({image:LoadedImages.messageui.image,x:0,y:0,width:this.width,height:this.height,rect:[0,0,this.width,this.height]});
        };
		
		LeagueViewContainer.prototype.showInfo = function(){
            
        };
		
		//new
		LeagueManageContainer.prototype.showLeague = function(){
            var self = this;
			self.leagueBtn.changeState('down');
			self.sameOccupationBtn.changeState('up');

			self.clearContainer();
			self.leagueViewContainer = new LeagueViewContainer();
			self.addChildAt(self.mailSendContainer,1);
			self.leagueViewContainer.showInfo();
        };
		
		

        return MessageContainer;
    });

