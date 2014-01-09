/**
 * Created with JetBrains WebStorm.
 * User: john
 * Date: 13-2-12
 * Time: 下午9:44
 * To change this template use File | Settings | File Templates.
 */

define([
    'Leader/LeaderMainContainer',
    winSize+'/GameContainer',
    winSize+'/ToolBarContainer',
    winSize+'/VisitBarContainer',
    winSize+'/InfoBarContainer',
    winSize+'/FriendContainer',
	winSize+'/FloorContainer',
    winSize+'/FriendAddContainer',
    winSize+'/PersonalInfo',
    winSize+'/FriendEmployDialog',
    winSize+'/FriendMagicDialog',
    winSize+'/ItemsContainer',
    winSize+'/FoodUpgradeContainer',
    winSize+'/RechargeContainer',
    winSize+'/DialogRecharge',
    winSize+'/PropShopContainer',
    winSize+'/MessageContainer',
    winSize+'/DialogYesAndNo',
    winSize+"/TipsContainer",
    winSize+'/ShowTiTiKiKiContainer',
    winSize+'/ShowMsg',
    winSize+'/ShowMsgWithAction',
    'lib/DragController'],
    function(LeaderMainContainer,
             GameContainer,
             toolbarContainer,
             visitBarContainer,
             infoBarContainer,
             friendContainer,
			 floorContainer,
             friendAddContainer,
             personalInfo,
             friendEmployDialog,
             friendMagicDialog,
             itemsContainer,
             foodUpgradeContainer,
             rechargeContainer,
             DialogRecharge,
             propShopContainer,
             messageContainer,
             dialogYesAndNo,
             TipsContainer,
             showTiTiKiKiContainer,
             showMsg,
             showMsgWithAction,
             DragController){
        var MainContainer = function(props,displayer,container)
        {
            MainContainer.superClass.constructor.call(this, props);
            this.init(displayer,container);
        };

        Q.inherit(MainContainer, Q.DisplayObjectContainer);

        MainContainer.prototype.init = function(displayer,container){
            this.displayer = displayer;
            this.container = container;

            this.gamesContainer = new Q.DisplayObjectContainer({x:0,y:0,width:1520,height:988});
	    	if(Views.DisplayObjectsDefine.containerHeight > 600)
            {
                var scaleValuey =  Views.DisplayObjectsDefine.containerHeight / 998;
                this.gamesContainer.scaleX = this.gamesContainer.scaleY = scaleValuey * 1.5;
            }
            this.displayer.SetDisplayObjectCenter(this.gamesContainer,this);
            this.addChildAt(this.gamesContainer,0);
            //地图拖动
            var dragController = new DragController(this.gamesContainer,this);
            // var containerDragController = new ContainerDragController(this,Views.MainView);
            this.InfoBarContainer = this.GetInfoBar();
            this.addChildAt(this.InfoBarContainer,1);
            //绘制Game地图
            this.GameView = this.GetGameView();
            //this.addChildAt(this.GameView,0);
            this.gamesContainer.addChildAt(this.GameView,0);
            //UI栏
            this.ToolBarContainer = this.GetToolBar();
            this.addChildAt(this.ToolBarContainer,1);
            this.VisitBarContainer = this.GetVisitBar();
            this.addChildAt(this.VisitBarContainer,1);
			
            //管理窗口
            this.FriendContainer = new friendContainer();
			//楼层窗口
            this.FloorContainer = new floorContainer();
            //添加好友窗口
            this.FriendAddContainer = new friendAddContainer();
            //个人信息
            this.PersonalInfo = new personalInfo();
            //好友雇用窗口
            this.FriendEmployDialog = new friendEmployDialog();
            this.FriendMagicDialog = new friendMagicDialog();
            //物品食品窗口
            this.ItemsContainer = new itemsContainer();
            this.initItemsContainer = false;
            this.displayer.SetDisplayObjectScaleFullHeightSize(this.ItemsContainer,this);
            this.displayer.SetDisplayObjectCenter(this.ItemsContainer,this);
            this.addChildAt(this.ItemsContainer,998);
            this.ItemsContainer.alpha = 0;
            //食品升级窗口
            this.FoodUpgradeContainer = new Q.DisplayObjectContainer();
            //充值窗口
            this.rechargeContainer = new Q.DisplayObjectContainer();
            //充值对话框
            this.dialogRecharge = new Q.DisplayObjectContainer();
            //商城窗口
            this.PropShopContainer= new propShopContainer();
            this.DialogYesAndNo = new dialogYesAndNo();
            //信息窗口
            this.MessageContainer = new messageContainer();
            //弹出消息窗口
            this.ShowMsg = new showMsg();
            ///弹出窗口带Action
            this.ShowMsgWithAction = new showMsgWithAction();
            //显示TiTiKiKi邀请
            this.ShowTiTiKiKiContainer = new showTiTiKiKiContainer();
            this.displayer.SetDisplayObjectPosition(this.ShowTiTiKiKiContainer,this);
            //this.displayer.SetDisplayObjectBottomCenter(this.ShowTiTiKiKiContainer,this);
            this.ShowTiTiKiKiContainer.x = (parseInt(this.getCurrentWidth()) - parseInt(this.InfoBarContainer.getCurrentWidth()))/2;
            this.addChildAt(this.ShowTiTiKiKiContainer,1);
            //收小费面板
            this.tipsContainer = new TipsContainer({x:0,y:56});
            this.displayer.SetDisplayObjectSize(this.tipsContainer,this);
            this.displayer.SetDisplayObjectTopCenter(this.tipsContainer,this);
            this.addChildAt(this.tipsContainer,1);
            //窗口容器
            this.DialogContainer = this.GetDialogContainer();
            this.addChild(this.DialogContainer);
            this.DialogContainer.alpha = 0;

            this.leader = new Q.DisplayObjectContainer();
        };

        MainContainer.prototype.startLeader = function(){
            var self = Views.MainView;
            self.leader = new LeaderMainContainer({width:self.getCurrentWidth(), height:self.getCurrentHeight()},
                self.displayer,self);
            self.leader.loadImage();
            self.addChildAt(self.leader,999);
        };

        MainContainer.prototype.stopLeader = function(){
            var self = this;
            self.removeChild(self.leader);
            //location.reload();
        };
        //掉落物品提示
        MainContainer.prototype.showDropProp = function(propid){
            //获取道具名称
            var PropName = Views.MainView.ToolBarContainer.propShopManager.get(propid).name;
            if(propid == 7) PropName = "味觉的秘密";
            Views.MainView.ShowMessage("客人很高兴，赠予您道具【"+PropName+"】,请查收！");
        };

        MainContainer.prototype.GetGameView = function(){
            var container = new GameContainer();
            return container;
        };
        MainContainer.prototype.GetInfoBar = function(){
            var infoBar = new infoBarContainer();
            this.displayer.SetDisplayObjectSize(infoBar,this);
            this.displayer.SetDisplayObjectTopCenter(infoBar,this);
            return infoBar;
        };
        MainContainer.prototype.GetToolBar = function(){
            var toolBar = new toolbarContainer({width:480,height:100});
            this.displayer.SetDisplayObjectSize(toolBar,this);
            this.displayer.SetDisplayObjectBottomCenter(toolBar,this);
            return toolBar;
        };
        MainContainer.prototype.GetVisitBar = function(){
            var visitBar = new visitBarContainer({width:960,height:100});
            this.displayer.SetDisplayObjectSize(visitBar,this);
            this.displayer.SetDisplayObjectBottomCenter(visitBar,this);
            //初始隐藏visitBar
            visitBar.y = this.getCurrentHeight();
            return visitBar;
        };
        MainContainer.prototype.GetDialogContainer = function(){
            var container = new Q.DisplayObjectContainer({x:0,y:0,width:this.getCurrentWidth(),height:this.getCurrentHeight()});
            return container;
    };

		//管理
        MainContainer.prototype.showFriendContainer = function(){
            this.DialogContainer.alpha = 1;
            this.FriendContainer = new friendContainer();
            this.displayer.SetDisplayObjectScaleFullHeightSize(this.FriendContainer,this.DialogContainer);
            this.displayer.SetDisplayObjectCenter(this.FriendContainer,this);
            this.DialogContainer.addChildAt(this.FriendContainer,1);
        };
        MainContainer.prototype.HidefriendContainer=function(){
            this.DialogContainer.alpha = 0;
            this.DialogContainer.removeAllChildren();
        };
		//楼层
		MainContainer.prototype.showFloorContainer = function(){
            this.DialogContainer.alpha = 1;
            this.FloorContainer = new floorContainer();
			this.displayer.SetDisplayObjectSize(this.FloorContainer,this);
			this.displayer.SetDisplayObjectBottomCenter(this.FloorContainer,this);
            this.DialogContainer.addChildAt(this.FloorContainer,1);
        };

		MainContainer.prototype.HidefloorContainer=function(){
            this.DialogContainer.alpha = 0;
            this.DialogContainer.removeAllChildren();
        };
		MainContainer.prototype.HidefacilityContainer=function(){
            this.DialogContainer.alpha = 0;
            this.DialogContainer.removeAllChildren();
        };
        MainContainer.prototype.showFriendAddContainer = function(){
            this.DialogContainer.alpha = 1;
            this.FriendAddContainer = new friendAddContainer();
            this.displayer.SetDisplayObjectScaleFullHeightSize(this.FriendAddContainer,this.DialogContainer);
            this.displayer.SetDisplayObjectCenter(this.FriendAddContainer,this);
            this.DialogContainer.addChildAt(this.FriendAddContainer,1);
        };
        MainContainer.prototype.HideFriendAddContainer = function(){
            this.DialogContainer.alpha = 0;
            this.DialogContainer.removeAllChildren();
        };

        MainContainer.prototype.showPersonalInfo = function(){
            this.DialogContainer.alpha = 1;
            this.PersonalInfo = new personalInfo();
			this.PersonalInfo.showFacilityList();
            this.displayer.SetDisplayObjectScaleFullHeightSize(this.PersonalInfo,this.DialogContainer);
            this.displayer.SetDisplayObjectCenter(this.PersonalInfo,this);
            this.DialogContainer.addChildAt(this.PersonalInfo,1);
        };
        MainContainer.prototype.HidePersonalInfo=function(){
            this.DialogContainer.alpha = 0;
            this.DialogContainer.removeAllChildren();
        };

        MainContainer.prototype.showFriendEmployDialog = function(frienduserid){
            this.DialogContainer.alpha = 1;
            this.FriendEmployDialog = new friendEmployDialog(frienduserid);
            this.displayer.SetDisplayObjectScaleFullHeightSize(this.FriendEmployDialog,this.DialogContainer);
            this.displayer.SetDisplayObjectCenter(this.FriendEmployDialog,this);
            this.DialogContainer.addChildAt(this.FriendEmployDialog,1);
        };
        MainContainer.prototype.HidefriendEmployDialog=function(){
            this.DialogContainer.alpha = 0;
            this.DialogContainer.removeAllChildren();
        };

        MainContainer.prototype.showFriendMagicDialog = function(frienduserid){
            this.DialogContainer.alpha = 1;
            this.FriendMagicDialog = new friendMagicDialog(frienduserid);
            this.displayer.SetDisplayObjectScaleFullHeightSize(this.FriendMagicDialog,this.DialogContainer);
            this.displayer.SetDisplayObjectCenter(this.FriendMagicDialog,this);
            this.DialogContainer.addChildAt(this.FriendMagicDialog,1);
        };
        MainContainer.prototype.HidefriendMagicDialog=function(){
            this.DialogContainer.alpha = 0;
            this.DialogContainer.removeAllChildren();
        };

        MainContainer.prototype.GetItemsContainer = function(){
             //this.ItemsContainer = new itemsContainer();
            this.ItemsContainer.showFoods();
            this.ItemsContainer.FoodsContainer.RectificateContainer.showRectificateFoods();
            if(this.ItemsContainer.FoodsContainer.RectificateContainer.Rectificaters.length>0)
                this.ItemsContainer.FoodsContainer.RectificateContainer.Rectificaters[0].continueRectificate();
            /*
            this.displayer.SetDisplayObjectScaleFullHeightSize(this.ItemsContainer,this.DialogContainer);
            this.displayer.SetDisplayObjectCenter(this.ItemsContainer,this);
            this.addChildAt(this.ItemsContainer,998);
            this.ItemsContainer.alpha = 0;
            */
        };

        MainContainer.prototype.showItemsContainer = function(){
            if(!this.initItemsContainer)
            {
                this.initItemsContainer = true;
                this.GetItemsContainer();
            }
            this.ItemsContainer.alpha = 1;
            /*
            this.DialogContainer.alpha = 1;
            this.ItemsContainer = new itemsContainer();
            this.ItemsContainer.showFoods();
            this.ItemsContainer.FoodsContainer.RectificateContainer.showRectificateFoods();
            if(this.ItemsContainer.FoodsContainer.RectificateContainer.Rectificaters.length>0)
                this.ItemsContainer.FoodsContainer.RectificateContainer.Rectificaters[0].continueRectificate();
            this.displayer.SetDisplayObjectScaleFullHeightSize(this.ItemsContainer,this.DialogContainer);
            this.displayer.SetDisplayObjectCenter(this.ItemsContainer,this);
            this.DialogContainer.addChildAt(this.ItemsContainer,1);
            */
        };
        MainContainer.prototype.HideItemsContainer=function(){
            this.ItemsContainer.alpha = 0;
            //this.DialogContainer.alpha = 0;
            //this.DialogContainer.removeAllChildren();
		trace("HideItemsContainer");	
        };

        MainContainer.prototype.showFoodUpgradeContainer = function(){
            this.DialogContainer.alpha = 1;
            this.FoodUpgradeContainer = new foodUpgradeContainer();
            this.displayer.SetDisplayObjectScaleFullHeightSize(this.FoodUpgradeContainer,this.DialogContainer);
            this.displayer.SetDisplayObjectCenter(this.FoodUpgradeContainer,this);
            this.DialogContainer.addChildAt(this.FoodUpgradeContainer,1);
        };
        MainContainer.prototype.HideFoodUpgradeContainer=function(){
            this.DialogContainer.alpha = 0;
            this.DialogContainer.removeAllChildren();
        };

        MainContainer.prototype.showRechargeContainer = function(){
            this.DialogContainer.alpha = 1;
            this.RechargeContainer = new rechargeContainer();
            this.displayer.SetDisplayObjectScaleFullHeightSize(this.RechargeContainer,this.DialogContainer);
            this.displayer.SetDisplayObjectCenter(this.RechargeContainer,this);
            this.DialogContainer.addChildAt(this.RechargeContainer,1);
            /*
            this.displayer.SetDisplayObjectScaleFullHeightSize(this.RechargeContainer,this.DialogContainer);
            this.displayer.SetDisplayObjectCenter(this.RechargeContainer,this);
            this.addChildAt(this.RechargeContainer,1);
            */
        };
        MainContainer.prototype.HideRechargeContainer=function(){
            this.DialogContainer.alpha = 0;
            this.DialogContainer.removeAllChildren();
        };

        MainContainer.prototype.showDialogRechargeContainer = function(id){
            this.DialogContainer.alpha = 1;
            this.dialogRecharge = new DialogRecharge({},id);
            this.displayer.SetDisplayObjectSize(this.dialogRecharge,this);
            this.displayer.SetDisplayObjectCenter(this.dialogRecharge,this);
            this.DialogContainer.addChildAt(this.dialogRecharge,1);
        };
        MainContainer.prototype.HideDialogRechargeContainer=function(){
            this.DialogContainer.alpha = 0;
            this.DialogContainer.removeAllChildren();
        };

        MainContainer.prototype.showPropShopContainer = function(){
            this.DialogContainer.alpha = 1;
            this.PropShopContainer = new propShopContainer();
            this.displayer.SetDisplayObjectScaleFullHeightSize(this.PropShopContainer,this.DialogContainer);
            this.displayer.SetDisplayObjectCenter(this.PropShopContainer,this);
            this.DialogContainer.addChildAt(this.PropShopContainer,1);
            this.PropShopContainer.showProps();
        };
        MainContainer.prototype.HidePropShopContainer=function(){
            this.DialogContainer.alpha = 0;
            this.DialogContainer.removeAllChildren();
        };

        MainContainer.prototype.showMessageContainer = function(){
            this.DialogContainer.alpha = 1;
            this.MessageContainer = new messageContainer();
            this.MessageContainer.messageListContainer.showInfos();
            this.displayer.SetDisplayObjectScaleFullHeightSize(this.MessageContainer,this.DialogContainer);
            this.displayer.SetDisplayObjectCenter(this.MessageContainer,this);
            this.DialogContainer.addChildAt(this.MessageContainer,1);
        };
        MainContainer.prototype.HideMessageContainer=function(){
            this.DialogContainer.alpha = 0;
            this.DialogContainer.removeAllChildren();
        };

        MainContainer.prototype.showDialogYesAndNo = function(text,okAction,closeAction){
            this.DialogContainer.alpha = 1;
            this.DialogYesAndNo = new dialogYesAndNo({},text,okAction,closeAction);
            this.displayer.SetDisplayObjectSize(this.DialogYesAndNo,this.DialogContainer);
            this.displayer.SetDisplayObjectCenter(this.DialogYesAndNo,this);
            this.DialogContainer.addChildAt(this.DialogYesAndNo,1);
        };
        MainContainer.prototype.HideDialogYesAndNo=function(){
            this.DialogContainer.alpha = 0;
            this.DialogContainer.removeAllChildren();
        };

        MainContainer.prototype.ShowMessage = function(text){
            this.DialogContainer.alpha = 1;
            this.ShowMsg = new showMsg({},text);
            this.displayer.SetDisplayObjectSize(this.ShowMsg,this.DialogContainer);
            this.displayer.SetDisplayObjectCenter(this.ShowMsg,this);
            this.DialogContainer.addChildAt(this.ShowMsg,1);
        };
        MainContainer.prototype.HideMessage=function(){
            this.DialogContainer.alpha = 0;
            trace("HideMessage");
            this.DialogContainer.removeAllChildren();
            this.HideItemsContainer();
        };

        MainContainer.prototype.ShowMessageWithAction = function(text,action){
            this.DialogContainer.alpha = 1;
            this.ShowMsgWithAction = new showMsgWithAction({},text,action);
            this.displayer.SetDisplayObjectSize(this.ShowMsgWithAction,this.DialogContainer);
            this.displayer.SetDisplayObjectCenter(this.ShowMsgWithAction,this);
            this.DialogContainer.addChildAt(this.ShowMsgWithAction,1);
        };

        MainContainer.prototype.HideAllDialog = function(){
            this.DialogContainer.alpha = 0;
            Views.MainView.DialogContainer.removeAllChildren();
        };
        return MainContainer;
    });
