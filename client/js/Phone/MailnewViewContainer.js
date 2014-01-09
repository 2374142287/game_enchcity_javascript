/**
 * Created with JetBrains WebStorm.
 * User: john
 * Date: 13-3-15
 * Time: 下午7:22
 * To change this template use File | Settings | File Templates.
 */
define([winSize+'/SameOccupationInfo','Mail'],
    function(sameOccupationInfo,Mail){
        var MailnewViewContainer = function(props)
        {
            MailnewViewContainer.superClass.constructor.call(this,props);
            this.init();
        };

        Q.inherit(MailnewViewContainer, Q.DisplayObjectContainer);

        MailnewViewContainer.prototype.init = function(){
            this.width = Views.DisplayObjectsDefine.displayer.divViewWidth;
            this.height = Views.DisplayObjectsDefine.displayer.divViewHeight;
			this.x=0;
			this.y=108;
			
			this.mail = new Mail();
			
			this.sendBtn = this.getSendBtn();
			this.addChildAt(this.sendBtn,1);
			
            this.mailContainer = new Q.DisplayObjectContainer({x:22,y:0,width:290,height:275});
       		this.addChildAt(this.mailContainer,2);
        };
		
		MailnewViewContainer.prototype.showInfos = function(mailinfo){
			this.mailinfo = mailinfo;
			this.mailContainer.addChildAt(this.GetMailTitle(),1);
			this.mailContainer.addChildAt(this.GetMailSender(),1);
			this.mailContainer.addChildAt(this.GetMailContent(),1);
		};
		
		//发送
		MailnewViewContainer.prototype.getSendBtn = function(){
			var self = this;
			return self.getMailBottomBtn(0,function(){
				self.sendBtn.changeState('down');
				self.mail.userid = self.mailinfo.castleId;
				self.mail.title = self.title.getValue();
				if(self.mailinfo.sendCastleId != null && self.mailinfo.sendCastleId != undefined)
					self.mail.receiveuserid = self.mailinfo.sendCastleId;
				else(self.mailinfo.sendCastleId != null && self.mailinfo.sendCastleId != undefined)
					self.mail.receiveuserid = self.mailinfo.allyCastleId;
				self.mail.content = self.content.getValue();
					//TODO:邮件发送
				Sockets.send_reqMessageSend(self.mail);
				alert("邮件发送成功！");
            	Views.MainView.HideMessageContainer();
				
			});
		};
		MailnewViewContainer.prototype.getMailBottomBtn = function(id,callback){
			var iconWidth = 110;
			var iconHeight = 50;
			var iconpMargin = 10;
			var px = 120;
			var py = 290;
			var btn = new Q.Button({image:LoadedImages.manageleague.image, 
				x:px, y:py, width:iconWidth, height:iconHeight,
				up:{rect:[0,400,iconWidth,iconHeight]},
				down:{rect:[0,450,iconWidth,iconHeight]}
			});
			btn.addEventListener(events[2], function(e)
			{
				callback();
			});
			return btn;
		};
		
		MailnewViewContainer.prototype.GetMailTitle = function(){
			var title = "主题";
			if(this.mailinfo.mailTitle != null && !this.mailinfo.mailTitle != undefined)
				title = this.mailinfo.mailTitle;
			var width = 265;
			var height = 35;
			var px = 0;
			var py = 0;
			var container = new Q.DisplayObjectContainer({x:10,y:0,width:width,height:height});
			var bg = new Q.Bitmap({image:LoadedImages.manageleague.image,x:px,y:py,width:width,height:height,rect:[134,130,width,height]});
			container.addChildAt(bg,0);
			this.title = this.getTextArea(title,width,height);
			container.addChildAt(this.title,1);
			return container;
		};
		MailnewViewContainer.prototype.GetMailSender = function(){
			var text = "收件人:"+this.mailinfo.allyNickName;
			var width = 265;
			var height = 35;
			var px = 0;
			var py = 0;
			var container = new Q.DisplayObjectContainer({x:10,y:40,width:width,height:height});
			var bg = new Q.Bitmap({image:LoadedImages.manageleague.image,x:px,y:py,width:width,height:height,rect:[134,130,width,height]});
			container.addChildAt(bg,0);
			container.addChildAt(this.GetTxt(px,py,width,height,text),1);
			return container;
		};
		MailnewViewContainer.prototype.GetMailContent = function(){
			var content = "";
			if(this.mailinfo.mailTest != null && !this.mailinfo.mailTest != undefined)
				title = this.mailinfo.mailTest;
			var width = 265;
			var height = 175;
			var px = 0;
			var py = 0;
			var container = new Q.DisplayObjectContainer({x:10,y:80,width:width,height:height});
			this.content = this.getTextArea(content,width,height);
			container.addChildAt(this.content,1);
			return container;
		};
		
		MailnewViewContainer.prototype.GetTxt = function(sx,sy,w,h,text){
			return new Q.Text({font:"20px '微软雅黑',Arial",x:sx,y:sy,width:w,height:h, color:"#333",text:text,textAlign:"center"});
		};
		
		MailnewViewContainer.prototype.getTextArea = function(mailContent,width,height,size){
			var textInput = new Q.TextArea({x:0,y:0,width:width,height:height,value:mailContent,style:{color:"#000",transparent:"1",font:"20px '微软雅黑',Arial"}});
			return textInput;
		};
		
        return MailnewViewContainer;
    });