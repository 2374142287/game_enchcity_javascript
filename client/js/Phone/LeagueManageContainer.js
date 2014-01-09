/**
 * Created with JetBrains WebStorm.
 * User: john
 * Date: 13-2-15
 * Time: 下午7:20
 * To change this template use File | Settings | File Templates.
 */
define(['jquery',
	winSize+'/BackBtn',
	winSize+"/LeagueViewContainer",
	winSize+"/SameOccupationViewContainer",
	winSize+"/MailinfoViewContainer",
	winSize+"/MailnewViewContainer",
	winSize+"/GiftViewContainer",
	winSize+"/EmployViewContainer"],
	function($,BackBtn,
		LeagueViewContainer,
		SameOccupationViewContainer,
		MailinfoViewContainer,
		MailnewViewContainer,
		GiftViewContainer,
		EmployViewContainer){
    var LeagueManageContainer = function()
    {
        LeagueManageContainer.superClass.constructor.call(this);
        this.init();
    };

    Q.inherit(LeagueManageContainer, Q.DisplayObjectContainer);

    LeagueManageContainer.prototype.init = function(){
        this.width = Views.DisplayObjectsDefine.displayer.divWinWidth;
        this.height = Views.DisplayObjectsDefine.displayer.divWinHeight;
		
        this.addChildAt(this.getBg(),0);
		
		this.leagueRadio = this.fillLeagueBtn();
        this.tonghangRadio = this.fillTongHangBtn();
		this.leagueViewContainer = new LeagueViewContainer();
		this.sameOccupationViewContainer = new SameOccupationViewContainer();
		this.mailinfoViewContainer = new MailinfoViewContainer();
		this.mainnewViewContainer = new MailnewViewContainer();
		this.giftViewContainer = new GiftViewContainer();
		this.employViewContainer = new EmployViewContainer();
		
		this.addChildAt(this.leagueRadio,1);
		this.addChildAt(this.tonghangRadio,1);
		this.addChildAt(this.getMainListBg(),1);
        this.addChildAt(this.leagueViewContainer,2);

		this.leagueRadio.changeState('down');
    };

    LeagueManageContainer.prototype.getBg = function(){
        var bg = new Q.Bitmap({image:LoadedImages.managerui.image,rect:[414,0,this.width,this.height]});
        return bg;
    };
	LeagueManageContainer.prototype.getMainListBg = function(){
		var width = 290;
        var height = 285;
		var container = new Q.DisplayObjectContainer({x:22,y:95,width:width,height:height});
		var bg = new Q.Bitmap({image:LoadedImages.managezxui.image,x:0,y:0,width:width,height:height,
						rect:[0,0,width,height]});
		container.addChildAt(bg,0);
        return container;
    };
	//盟友
	LeagueManageContainer.prototype.fillLeagueBtn = function(){
        var self = this;
        return this.getLeagueBtn(function(){
            self.leagueRadio.changeState('down');
            self.tonghangRadio.changeState('up');
		
			self.clearContainer();
            self.leagueViewContainer = new LeagueViewContainer();
			self.addChildAt(self.leagueViewContainer,2);
			self.leagueViewContainer.messageListContainer.showInfos();
        });
    };
	LeagueManageContainer.prototype.getLeagueBtn = function(callback){
		var butWidth = 125;
		var butHeight = 50;
        var btn = new Q.Button({image:LoadedImages.manageleague.image, x:37,y:35,width:butWidth,height:butHeight,
            up:{rect:[0,0,butWidth,butHeight]},
            down:{rect:[0,50,butWidth,butHeight]}
        });
        btn.addEventListener(events[2],function(e){
			callback();
        });
        return btn;
    };
	//同行
	LeagueManageContainer.prototype.fillTongHangBtn = function(){
        var self = this;
        return this.getTongHangBtn(function(){
            self.leagueRadio.changeState('up');
            self.tonghangRadio.changeState('down');

			self.clearContainer();
            self.sameOccupationViewContainer = new SameOccupationViewContainer();
			self.addChildAt(self.sameOccupationViewContainer,2);
			self.sameOccupationViewContainer.showSameOccupationList();
        });
    };
	LeagueManageContainer.prototype.getTongHangBtn = function(callback){
		var butWidth = 125;
		var butHeight = 50;
        var btn = new Q.Button({image:LoadedImages.manageleague.image, x:172,y:35,width:butWidth,height:butHeight,
            up:{rect:[0,100,butWidth,butHeight]},
            down:{rect:[0,150,butWidth,butHeight]}
        });
        btn.addEventListener(events[2],function(e){
			callback();
        });
        return btn;
    };
	
	LeagueManageContainer.prototype.clearContainer = function(){
		var self = this;
		self.removeChild(self.leagueViewContainer);
		self.removeChild(self.sameOccupationViewContainer);
		self.removeChild(self.mailinfoViewContainer);
		self.removeChild(self.mailnewViewContainer);
		self.removeChild(self.giftViewContainer);
		self.removeChild(self.employViewContainer);
    };
	//邮件详情
	LeagueManageContainer.prototype.showMailboxViewContainer = function(mailinfo){
        var self = this;
		self.leagueRadio.changeState('down');
		self.tonghangRadio.changeState('up');
		
		self.clearContainer();
		self.mailinfoViewContainer = new MailinfoViewContainer();
		self.addChildAt(self.mailinfoViewContainer,2);
		self.mailinfoViewContainer.showInfos(mailinfo);
    };
	//写新邮件
	LeagueManageContainer.prototype.showMailnewViewContainer = function(mailinfo){
        var self = this;
		self.leagueRadio.changeState('down');
		self.tonghangRadio.changeState('up');

		self.clearContainer();
		self.mailnewViewContainer = new MailnewViewContainer();
		self.addChildAt(self.mailnewViewContainer,2);
		self.mailnewViewContainer.showInfos(mailinfo);
    };
	//礼物
	LeagueManageContainer.prototype.showGiftViewContainer = function(){
        var self = this;
		self.leagueRadio.changeState('down');
		self.tonghangRadio.changeState('up');

		self.clearContainer();
		self.leagueViewContainer = new LeagueViewContainer();
		self.addChildAt(self.leagueViewContainer,2);
		self.leagueViewContainer.showGiftListContainer();
    };
	//雇佣
	LeagueManageContainer.prototype.showEmployViewContainer = function(message){
        var self = this;
		self.leagueRadio.changeState('down');
		self.tonghangRadio.changeState('up');

		self.clearContainer();
		self.leagueViewContainer = new LeagueViewContainer();
		self.addChildAt(self.leagueViewContainer,2);
		self.leagueViewContainer.showEmployListContainer(message);
    };

    return LeagueManageContainer;
});