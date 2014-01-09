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
            this.width = 290;
            this.height = 355;
			this.x=22;
			this.y=95;

			this.mailboxBtn = this.getMailboxBtn();
			this.mailwritteBtn = this.getMailwritteBtn();
			this.giftBtn = this.getGiftBtn();
			this.employBtn = this.getEmployBtn();
			this.addChildAt(this.mailboxBtn,1);
			this.addChildAt(this.mailwritteBtn,2);
			this.addChildAt(this.giftBtn,3);
			this.addChildAt(this.employBtn,4);

            this.messageListContainer = new MessageListContainer();
            this.messageListContainer.setShowType('leagues');
            this.addChildAt(this.messageListContainer,5);
        };
		
		LeagueViewContainer.prototype.getBtn = function(callback){
			var self = this;
			var btnWidth = 265;
			var btnHeight = 35;
			var btnpMargin = 5;
			var btncMargin = 15;
			var cx = 134;
			var cy = 130;
			var px = self.px;
			var py = self.py;
			var btn = new Q.Button({image:LoadedImages.manageleague.image,x:px,y:py, width:btnWidth, height:btnHeight,
				up:{rect:[cx,cy,btnWidth,btnHeight]},
				down:{rect:[cx,cy+btnHeight,btnWidth,btnHeight]}
			});
			btn.addEventListener(events[2], function(e)
			{
				callback();
			});
			return btn;
		};
		
		//盟友底部四个按钮(用于盟友主界面的各类型盟友信息显示)
		LeagueViewContainer.prototype.getMailboxBtn = function(){
			var self = this;
			return this.getLeagueBottomBtn(0,function(){
				self.mailboxBtn.changeState('down');
				self.mailwritteBtn.changeState('up');
				self.giftBtn.changeState('up');
				self.employBtn.changeState('up');
				
				self.clearContainer();
                self.messageListContainer = new MessageListContainer();
                self.addChildAt(self.messageListContainer,2);
                self.messageListContainer.setShowType('mailbox');
                self.messageListContainer.showInfos();
			});
		};
		LeagueViewContainer.prototype.getMailwritteBtn = function(){
			var self = this;
			return this.getLeagueBottomBtn(1,function(){
				self.mailboxBtn.changeState('up');
				self.mailwritteBtn.changeState('down');
				self.giftBtn.changeState('up');
				self.employBtn.changeState('up');
				
				self.clearContainer();
                self.messageListContainer = new MessageListContainer();
                self.addChildAt(self.messageListContainer,2);
                self.messageListContainer.setShowType('mailnew');
                self.messageListContainer.showInfos();
			});
		};
		LeagueViewContainer.prototype.getGiftBtn = function(){
			var self = this;
			return this.getLeagueBottomBtn(2,function(){
				self.mailboxBtn.changeState('up');
				self.mailwritteBtn.changeState('up');
				self.giftBtn.changeState('down');
				self.employBtn.changeState('up');
				
				self.clearContainer();
                self.messageListContainer = new MessageListContainer();
                self.addChildAt(self.messageListContainer,2);
                self.messageListContainer.setShowType('gift');
                self.messageListContainer.showInfos();
			});
		};
		LeagueViewContainer.prototype.getEmployBtn = function(){
			var self = this;
			return this.getLeagueBottomBtn(3,function(){
				self.mailboxBtn.changeState('up');
				self.mailwritteBtn.changeState('up');
				self.giftBtn.changeState('up');
				self.employBtn.changeState('down');
				
				self.clearContainer();
                self.messageListContainer = new MessageListContainer();
                self.addChildAt(self.messageListContainer,2);
                self.messageListContainer.setShowType('employ');
                self.messageListContainer.showInfos();
			});
		};
		//礼物详情界面
		LeagueViewContainer.prototype.showGiftListContainer = function(){
			var self = this;
			self.mailboxBtn.changeState('up');
			self.mailwritteBtn.changeState('up');
			self.giftBtn.changeState('down');
			self.employBtn.changeState('up');
			
			self.clearContainer();
			self.messageListContainer = new MessageListContainer();
			self.addChildAt(self.messageListContainer,2);
			self.messageListContainer.setShowType('giftList');
			self.messageListContainer.showInfos();
		};
		//雇佣详情界面
		LeagueViewContainer.prototype.showEmployListContainer = function(message){
			var self = this;
			self.mailboxBtn.changeState('up');
			self.mailwritteBtn.changeState('up');
			self.giftBtn.changeState('up');
			self.employBtn.changeState('down');
			
			self.clearContainer();
			self.messageListContainer = new MessageListContainer();
			self.addChildAt(self.messageListContainer,2);
			self.messageListContainer.setShowType('employList');
			self.messageListContainer.showEmployInfos(message);
		};
		
		LeagueViewContainer.prototype.getLeagueBottomBtn = function(id,callback){
			var iconWidth = 60;
			var iconHeight = 60;
			var iconpMargin = 10;
			var px = 10 + (iconWidth+iconpMargin)*id;
			var py = 295;
			var cx = 125;
			var cy = 60;
			var btn = new Q.Button({image:LoadedImages.manageleague.image, x:px, y:py, width:iconWidth, height:iconHeight,
				up:{rect:[cx+iconHeight*id,0,iconWidth,iconHeight]},
				down:{rect:[cx+iconHeight*id,cy,iconWidth,iconHeight]}
			});
			btn.addEventListener(events[2], function(e)
			{
				//e.eventTarget.changeState('down');
				callback();
			});
			return btn;
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
		
        return LeagueViewContainer;
    });

