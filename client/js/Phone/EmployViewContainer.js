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
        var EmployViewContainer = function(props)
        {
            EmployViewContainer.superClass.constructor.call(this,props);
            this.init();
        };

        Q.inherit(EmployViewContainer, Q.DisplayObjectContainer);

        EmployViewContainer.prototype.init = function(){
            this.width = 290;
            this.height = 355;
			this.x=22;
			this.y=95;
        };
		
		EmployViewContainer.prototype.showInfos = function(mailinfo){
			if(this.getNumChildren()>0) this.removeAllChildren();
			this.mailinfo = mailinfo;
			
			this.addChildAt(this.GetMailTitle(),1);
			this.addChildAt(this.GetMailSender(),1);
			this.addChildAt(this.GetMailContent(),1);
			
			//下方按钮
			this.responseBtn = this.getResponseBtn();
			this.deleteBtn = this.getDeleteBtn();
			this.addChildAt(this.getResponseBtn,1);
			this.addChildAt(this.deleteBtn,1);
		};
		
		EmployViewContainer.prototype.GetMailTitle = function(){
			var text = "主题";//this.mailinfo.title
			var width = 265;
			var height = 35;
			var px = 0;
			var py = 0;
			var container = new Q.DisplayObjectContainer({x:10,y:10,width:width,height:height});
			var bg = new Q.Bitmap({image:LoadedImages.manageleague.image,x:px,y:py,width:width,height:height,
							rect:[134,130,width,height]});
			container.addChildAt(bg,2);
			container.addChildAt(this.GetTxt(px,py,width,height,text),3);
			return container;
		};
		EmployViewContainer.prototype.GetMailSender = function(){
			var text = "发件人:XXXXX";//this.mailinfo.sender
			var width = 265;
			var height = 35;
			var px = 0;
			var py = 0;
			var container = new Q.DisplayObjectContainer({x:10,y:50,width:width,height:height});
			var bg = new Q.Bitmap({image:LoadedImages.manageleague.image,x:px,y:py,width:width,height:height,
							rect:[134,130,width,height]});
			container.addChildAt(bg,2);
			container.addChildAt(this.GetTxt(px,py,width,height,text),3);
			return container;
		};
		EmployViewContainer.prototype.GetMailContent = function(){
			var value = "内容XXXXX";//this.mailinfo.content
			var width = 265;
			var height = 175;
			var px = 0;
			var py = 0;
			var container = new Q.DisplayObjectContainer({x:10,y:60,width:width,height:height});
			var textInput = new Q.TextArea({x:px,y:py,width:width,height:height,value:value,style:{color:"#fff",transparent:"1",font:"30px"}});
			container.addChildAt(textInput,3);
			return container;
		};
		
		//回复
		EmployViewContainer.prototype.getResponseBtn = function(){
			var self = this;
			return this.getLeagueBottomBtn(0,function(){
				self.responseBtn.changeState('down');
				self.deleteBtn.changeState('up');
				
				self.clearContainer();
                self.messageListContainer = new MessageListContainer();
                self.addChildAt(self.messageListContainer,1);
                self.messageListContainer.setShowType('mailbox');
                self.messageListContainer.showInfos();
			});
		};
		//删除
		EmployViewContainer.prototype.getDeleteBtn = function(){
			var self = this;
			return this.getLeagueBottomBtn(1,function(){
				self.responseBtn.changeState('up');
				self.deleteBtn.changeState('down');
				
				self.clearContainer();
                self.messageListContainer = new MessageListContainer();
                self.addChildAt(self.messageListContainer,1);
                self.messageListContainer.setShowType('mailnew');
                self.messageListContainer.showInfos();
			});
		};
		EmployViewContainer.prototype.getLeagueBottomBtn = function(id,callback){
			var iconWidth = 110;
			var iconHeight = 50;
			var iconpMargin = 10;
			var px = 10 + (iconWidth+iconpMargin)*id;
			var py = 295;
			var cx = 0;
			var cy = 200+200*id;
			var btn = new Q.Button({image:LoadedImages.manageleague.image, x:px, y:py, width:iconWidth, height:iconHeight,
				up:{rect:[0,cy,iconWidth,iconHeight]},
				down:{rect:[0,cy+50,iconWidth,iconHeight]}
			});
			btn.addEventListener(events[2], function(e)
			{
				//e.eventTarget.changeState('down');
				callback();
			});
			return btn;
		};

		EmployViewContainer.prototype.GetTxt = function(sx,sy,w,h,text){
			return new Q.Text({font:"36px arial",x:sx,y:sy,width:w,height:h, color:"#000",text:text,textAlign:"center"});
		};
        return EmployViewContainer;
    });

