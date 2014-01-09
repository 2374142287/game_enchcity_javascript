/**
 * Created with JetBrains WebStorm.
 * User: john
 * Date: 13-3-15
 * Time: 下午8:32
 * To change this template use File | Settings | File Templates.
 */
define([winSize+'/MailInfo',winSize+'/LeagueInfo'],function(MailInfo,LeagueInfo){
    var MessageListContainer = function(props)
    {
        MessageListContainer.superClass.constructor.call(this,props);
        this.init();
    };

    Q.inherit(MessageListContainer, Q.DisplayObjectContainer);

    MessageListContainer.prototype.init = function(){
        this.width = 895;
        this.height = 373;
        this.x = 20;
        this.y = 134;

        this.showNum = 4;
        this.currentShowId = 0;
        this.container = new Q.DisplayObjectContainer({x:90,y:0,width:this.width,height:this.height});
        this.addChildAt(this.container,1);
        this.type = 'mails';
    };

    MessageListContainer.prototype.setShowType = function(type){
        this.currentShowId = 0;
        this.type = type;
    };

    MessageListContainer.prototype.showInfos = function(){
        switch(this.type){
            case 'mails':
                this.datas = Views.MainView.ToolBarContainer.messageManager.messages;
                break;
            case 'leagues':
                this.datas = Views.MainView.ToolBarContainer.mailManager.mails;
                break;
        }

        if(this.currentShowId<=0) this.currentShowId = 0;
        else if(this.currentShowId>=(this.datas.length))
            this.currentShowId = this.datas.length-1;

        this.container.removeAllChildren();
        for(var i=this.currentShowId;i<(this.showNum+this.currentShowId) && i<this.datas.length;i++){
            this.addInfo(this.datas[i]);
        }
    };

    MessageListContainer.prototype.addInfo = function(data){
        var px = 0;
        var py = 0 + (85+11)*this.container.getNumChildren();

        var info;
        switch(this.type){
            case 'mails':
                info = new MailInfo({x:px,y:py},data);
                break;
            case 'leagues':
                info = new LeagueInfo({x:px,y:py},data);
                break;
        }
        this.container.addChild(info);
    };

    return MessageListContainer;
});