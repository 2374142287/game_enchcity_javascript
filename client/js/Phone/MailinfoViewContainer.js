/**
 * Created with JetBrains WebStorm.
 * User: john
 * Date: 13-3-15
 * Time: 下午7:22
 * To change this template use File | Settings | File Templates.
 */
define([winSize+'/SameOccupationInfo'],
    function(sameOccupationInfo){
        var MailinfoViewContainer = function(props)
        {
            MailinfoViewContainer.superClass.constructor.call(this,props);
            this.init();
        };

        Q.inherit(MailinfoViewContainer, Q.DisplayObjectContainer);

        MailinfoViewContainer.prototype.init = function(){
            this.width = Views.DisplayObjectsDefine.displayer.divViewWidth;
            this.height = Views.DisplayObjectsDefine.displayer.divViewHeight;
			this.x=0;
			this.y=108;
			
			this.responseBtn = this.getResponseBtn();
			this.addChildAt(this.responseBtn,1);
			this.deleteBtn = this.getDeleteBtn();
			this.addChildAt(this.deleteBtn,1);
			
            this.mailContainer = new Q.DisplayObjectContainer({x:22,y:0,width:290,height:275});
       		this.addChildAt(this.mailContainer,2);
        };
		
		MailinfoViewContainer.prototype.showInfos = function(mailinfo){
			this.mailinfo = mailinfo;
			this.mailContainer.addChildAt(this.GetMailTitle(),1);
			this.mailContainer.addChildAt(this.GetMailSender(),1);
			this.mailContainer.addChildAt(this.GetMailContent(),1);
		};
		
		//回复
		MailinfoViewContainer.prototype.getResponseBtn = function(){
			var self = this;
			return self.getMailBottomBtn(0,function(){
				self.responseBtn.changeState('down');
				self.deleteBtn.changeState('up');
				Views.MainView.showMailnewViewContainer(self.mailinfo);
			});
		};
		//删除
		MailinfoViewContainer.prototype.getDeleteBtn = function(){
			var self = this;
			return self.getMailBottomBtn(1,function(){
				self.responseBtn.changeState('up');
				self.deleteBtn.changeState('down');
				
				//删除一条邮件
				Views.MainView.showDialogYesAndNo(
					"是否确认删除当前邮件？",
					function(){
						/////删除一条消息数据
						Sockets.send_reqMessageDel(self.mailinfo.id);
						Views.MainView.HideDialogYesAndNo();
						Views.MainView.HideMessageContainer();
						
					},
					function(){
						Views.MainView.HideDialogYesAndNo();
					}
				);
			});
		};
		MailinfoViewContainer.prototype.getMailBottomBtn = function(id,callback){
			var iconWidth = 110;
			var iconHeight = 50;
			var iconpMargin = 10;
			var px = 50 + (iconWidth+iconpMargin)*id;
			var py = 290;
			var cx = 0;
			var cy = 200+100*id;
			var btn = new Q.Button({image:LoadedImages.manageleague.image, 
				x:px, y:py, width:iconWidth, height:iconHeight,
				up:{rect:[0,cy,iconWidth,iconHeight]},
				down:{rect:[0,cy+50,iconWidth,iconHeight]}
			});
			btn.addEventListener(events[2], function(e)
			{
				callback();
			});
			return btn;
		};
		
		MailinfoViewContainer.prototype.GetMailTitle = function(){
			var text = this.mailinfo.mailTitle;
			var width = 265;
			var height = 35;
			var px = 0;
			var py = 0;
			var container = new Q.DisplayObjectContainer({x:10,y:0,width:width,height:height});
			var bg = new Q.Bitmap({image:LoadedImages.manageleague.image,x:px,y:py,width:width,height:height,
							rect:[134,130,width,height]});
			container.addChildAt(bg,0);
			container.addChildAt(this.GetTxt(px,py,width,height,text),1);
			return container;
		};
		MailinfoViewContainer.prototype.GetMailSender = function(){
			var text = "发件人:"+this.mailinfo.sendernickname;
			var width = 265;
			var height = 35;
			var px = 0;
			var py = 0;
			var container = new Q.DisplayObjectContainer({x:10,y:40,width:width,height:height});
			var bg = new Q.Bitmap({image:LoadedImages.manageleague.image,x:px,y:py,width:width,height:height,
							rect:[134,130,width,height]});
			container.addChildAt(bg,0);
			container.addChildAt(this.GetTxt(px,py,width,height,text),1);
			return container;
		};
		MailinfoViewContainer.prototype.GetMailContent = function(){
			var value = this.mailinfo.mailTest;
			var width = 265;
			var height = 175;
			var px = 0;
			var py = 0;
			var container = new Q.DisplayObjectContainer({x:10,y:80,width:width,height:height});
			var textInput = new Q.TextArea({x:px,y:py,width:width,height:height,value:value,style:{color:"#000",transparent:"1",font:"16px '微软雅黑',Arial"}});
			container.addChildAt(textInput,1);
			return container;
		};
		
		MailinfoViewContainer.prototype.GetTxt = function(sx,sy,w,h,text){
			return new Q.Text({font:"20px '微软雅黑',Arial",x:sx,y:sy,width:w,height:h, color:"#333",text:text,textAlign:"center"});
		};
		
        return MailinfoViewContainer;
    });

