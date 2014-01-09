/**
 * Created with JetBrains WebStorm.
 * User: john
 * Date: 13-3-15
 * Time: 下午8:32
 * To change this template use File | Settings | File Templates.
 */
define([winSize+'/QueueInfo',
	winSize+'/LeagueInfo',
	winSize+'/MailboxInfo',
	winSize+'/MailnewInfo',
	winSize+'/LeagueGiftInfo',
	winSize+'/LeagueEmployInfo',
	winSize+'/EmployInfo',
	winSize+'/GiftInfo'],
	function(QueueInfo,
		LeagueInfo,
		MailboxInfo,
		MailnewInfo,
		LeagueGiftInfo,
		LeagueEmployInfo,
		EmployInfo,
		GiftInfo,
		RecevieMailInfo){
    var MessageListContainer = function(props)
    {
        MessageListContainer.superClass.constructor.call(this,props);
        this.init();
    };

    Q.inherit(MessageListContainer, Q.DisplayObjectContainer);

    MessageListContainer.prototype.init = function(){
        this.width = 290;
        this.height = 285;

        this.showNum = 4;
        this.currentShowId = 0;
        this.container = new Q.DisplayObjectContainer({x:0,y:0,width:this.width,height:this.height});
        this.addChildAt(this.container,2);
        this.type = 'leagues';
    };

    MessageListContainer.prototype.setShowType = function(type){
        this.currentShowId = 0;
        this.type = type;
    };

    MessageListContainer.prototype.showInfos = function(){
		this.datas = [];
        switch(this.type){
            case 'leagues':
                this.datas = Views.MainView.ToolBarContainer.leagueManager.leagues;
                break;
            case 'mailbox':
                this.datas = Views.MainView.ToolBarContainer.mailManager.mails;
                break;
            case 'mailnew':
                this.datas = Views.MainView.ToolBarContainer.leagueManager.leagues;
                break;
            case 'gift':
                this.datas = Views.MainView.ToolBarContainer.leagueManager.leagues;
                break;
            case 'employ':
                this.datas = Views.MainView.ToolBarContainer.leagueManager.leagues;
                break;
			case 'giftList':
                this.datas = Views.MainView.ToolBarContainer.costRecordManager.messages;
                break;
        }

        if(this.currentShowId<=0) this.currentShowId = 0;
        else if(this.currentShowId>=(this.datas.length))
            this.currentShowId = this.datas.length-1;
        this.removeAllChildren();
	
        for(var i=0; i<this.datas.length;i++){
            this.addInfo(this.datas[i],i);
        }
    };

    MessageListContainer.prototype.addInfo = function(data,id){
		var btnHeight = 35;
        var btnpMargin = 5;
		var px=10;
        var py = 10 + (btnHeight + btnpMargin)*id;
        var info;
        switch(this.type){
			case 'leagues':
                info = new LeagueInfo({x:px,y:py},data);
                break;
            case 'mailbox':
                info = new MailboxInfo({x:px,y:py},data);
                break;
            case 'mailnew':
                info = new MailnewInfo({x:px,y:py},data);
                break;
            case 'gift':
                info = new LeagueGiftInfo({x:px,y:py},data);
                break;
			case 'employ':
                info = new LeagueEmployInfo({x:px,y:py},data);
                break;
			case 'giftList':
                info = new GiftInfo({x:px,y:py},data);
                break;
        }
        this.addChild(info);
    };
	
	MessageListContainer.prototype.showEmployInfos = function(message){
		this.addChild(new EmployInfo({x:5,y:5},message));
    };
    return MessageListContainer;
});