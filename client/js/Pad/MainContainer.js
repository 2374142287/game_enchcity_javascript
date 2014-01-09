/**
 * Created with JetBrains WebStorm.
 * User: john
 * Date: 13-2-12
 * Time: 下午9:44
 * To change this template use File | Settings | File Templates.
 */
define([winSize+'/GameContainer',winSize+'/DragMapController',winSize+'/ToolBarContainer',winSize+'/InfoBarContainer',
    winSize+'/RectificateContainer','Food',winSize+'/PersonalInfo',
    winSize+'/FriendInfo',winSize+'/FriendEmployDialog',winSize+'/FriendMagicDialog',
    winSize+'/QueueContainer',winSize+'/QueueGetAwardDialog',
    winSize+'/DialogYesAndNo',winSize+"/DialogBuy",winSize+"/DialogUse",winSize+"/DialogSell",winSize+"/DialogMessage",winSize+"/TipsContainer"],
    function(GameContainer,DragMapController,toolbarContainer,infoBarContainer,
             rectificateContainer,Food,PersonalInfo,
             FriendInfo,FriendEmployDialog,FriendMagicDialog,
             QueueContainer,QueueGetAwardDialog,
             DialogYesAndNo,DialogBuy,DialogUse,DialogSell,DialogMessage,TipsContainer){
        var MainContainer = function(props,displayer,container,DesignHeight)
        {
            MainContainer.superClass.constructor.call(this, props,displayer,container,DesignHeight);
            this.init(displayer,container,DesignHeight);
        };

        Q.inherit(MainContainer, Q.DisplayObjectContainer);

        MainContainer.prototype.init = function(displayer,container,DesignHeight){
            this.displayer = displayer;
            this.container = container;
            this.designHeight = DesignHeight;
            //绘制Game地图
            this.GameView = new GameContainer();
            this.displayer.SetDisplayObjectCenter(this.GameView,this);
            this.addChildAt(this.GameView,0);

            this.ToolBarContainer = this.GetToolBar();
            this.InfoBarContainer = this.GetInfoBar();
            this.RectificateContainer = new rectificateContainer();
            this.displayer.SetDisplayObjectVerCenterPosition(this.RectificateContainer,this, this.designHeight);
            this.IsShowFoodRectificater = false;

            this.personalInfo = new PersonalInfo({width:767,height:580});
            this.displayer.SetDisplayObjectSize(this.personalInfo,this.getCurrentHeight(),this.designHeight);
            this.displayer.SetDisplayObjectCenter(this.personalInfo,this);

            this.friendInfo = new FriendInfo({width:694,height:533});
            this.displayer.SetDisplayObjectSize(this.friendInfo,this.getCurrentHeight(),this.designHeight);
            this.displayer.SetDisplayObjectCenter(this.friendInfo,this);

            this.isShowFriendInfo = false;
            this.addChildAt(this.friendInfo,1);
            //先隐藏好友信息
            this.friendInfo.alpha = 0;

            this.friendEmployDialog = new FriendEmployDialog();
            this.displayer.SetDisplayObjectSize(this.friendEmployDialog,this.getCurrentHeight(),this.designHeight);
            this.displayer.SetDisplayObjectCenter(this.friendEmployDialog,this);

            this.addChildAt(this.friendEmployDialog,1);
            //先隐藏好友雇用窗口
            this.friendEmployDialog.alpha = 0;

            this.friendMagicDialog = new FriendMagicDialog();
            this.displayer.SetDisplayObjectSize(this.friendMagicDialog,this.getCurrentHeight(),this.designHeight);
            this.displayer.SetDisplayObjectCenter(this.friendMagicDialog,this);

            this.addChildAt(this.friendMagicDialog,1);
            //先隐藏好友咒语窗口
            this.friendMagicDialog.alpha = 0;

            this.friendSureDialog = new DialogYesAndNo();
            this.displayer.SetDisplayObjectSize(this.friendSureDialog,this.getCurrentHeight(),this.designHeight);
            this.displayer.SetDisplayObjectCenter(this.friendSureDialog,this);
            this.addChildAt(this.friendSureDialog,1);

            this.foodInfo = new Q.DisplayObjectContainer();
            //充值窗口
            this.rechargeContainer = new Q.DisplayObjectContainer();
            //充值对话框
            this.dialogRecharge = new Q.DisplayObjectContainer();

            this.queueContainer = new QueueContainer();
            this.displayer.SetDisplayObjectSize(this.queueContainer,this.getCurrentHeight(),this.designHeight);
            this.displayer.SetDisplayObjectCenter(this.queueContainer,this);

            this.addChildAt(this.queueContainer,1);
            //先隐藏任务窗口
            this.queueContainer.alpha = 0;

            //不能领取任务奖励通知窗口
            this.queueGetAwardDialog = new QueueGetAwardDialog();
            this.displayer.SetDisplayObjectSize(this.queueGetAwardDialog,this.getCurrentHeight(),this.designHeight);
            this.displayer.SetDisplayObjectCenter(this.queueGetAwardDialog,this);

            this.addChildAt(this.queueGetAwardDialog,1);
            //先隐藏领取奖励窗口
            this.queueGetAwardDialog.alpha = 0;


            this.addChildAt(this.ToolBarContainer,1);
            this.addChildAt(this.InfoBarContainer,1);
            this.addChildAt(this.RectificateContainer,1);
            this.RectificateContainer.y -= this.designHeight;

            //拖动地图控件
            this.DragMapController = new DragMapController({width:250,height:250},this,this.GameView);
            this.displayer.SetDisplayObjectSize(this.DragMapController,this.getCurrentHeight(),this.designHeight);
            this.displayer.SetDisplayObjectRightTop(this.DragMapController,this);
            this.addChildAt(this.DragMapController,1);

            //小费中掉落物品提示框
            this.tipShowDialog = new DialogYesAndNo();
            //通用对话框
            this.commonDialog = new DialogYesAndNo();
            //购买对话框
            this.dialogBuy = new DialogBuy();
            this.dialogUse = new DialogUse();
            this.dialogSell = new DialogSell();
            this.dialogMessage = new DialogMessage();
            this.tipsContainer = new TipsContainer({x:425,y:10});
            this.displayer.SetDisplayObjectPosition(this.tipsContainer,this.getCurrentHeight(),this.designHeight);
            this.addChildAt(this.tipsContainer,1);
        };

        MainContainer.prototype.closeAllDialog = function(){
            this.hideDialogMessage();
            this.hideDialogUse();
            this.hideDialogBuy();
            this.hideCommonDialog();
            this.hideTipShowDialog();
            this.HideRectificateContainer();
            this.HideQueueGetAwardDialog();
            this.HideQueueContainer();
            this.HidefriendSureDialog();
            this.HideFriendInfo();
            this.HidePersonalInfo();
        };

        MainContainer.prototype.showDialogMessage = function(text){
            this.hideDialogMessage();
            this.displayer.SetDisplayObjectSize(this.dialogMessage,this.getCurrentHeight(),this.designHeight);
            this.displayer.SetDisplayObjectCenter(this.dialogMessage,this);
            this.addChildAt(this.dialogMessage,1);
            this.dialogMessage.show(text,
                function(){
                    Views.MainView.hideDialogMessage();
                }
            );
        };
        MainContainer.prototype.hideDialogMessage = function(){
            if(this.hasChild(this.dialogMessage)) this.removeChild(this.dialogMessage);
        };
        MainContainer.prototype.showDialogUse = function(text,okaction){
            if(this.hasChild(this.dialogUse)) this.removeChild(this.dialogUse);
            this.displayer.SetDisplayObjectSize(this.dialogUse,this.getCurrentHeight(),this.designHeight);
            this.displayer.SetDisplayObjectCenter(this.dialogUse,this);
            this.addChildAt(this.dialogUse,1);
            this.dialogUse.show(text,
                function(){
                    Views.MainView.hideDialogUse();
                    okaction();
                },
                function(){
                    Views.MainView.hideDialogUse();
                }
            );
        };
        MainContainer.prototype.hideDialogUse = function(){
            if(this.hasChild(this.dialogUse)) this.removeChild(this.dialogUse);
        };
        MainContainer.prototype.showDialogBuy = function(text,okaction){
            if(this.hasChild(this.dialogBuy)) this.removeChild(this.dialogBuy);
            this.displayer.SetDisplayObjectSize(this.dialogBuy,this.getCurrentHeight(),this.designHeight);
            this.displayer.SetDisplayObjectCenter(this.dialogBuy,this);
            this.addChildAt(this.dialogBuy,1);
            this.dialogBuy.show(text,
                function(){
                    Views.MainView.hideDialogBuy();
                    okaction();
                },
                function(){
                    Views.MainView.hideDialogBuy();
                }
            );
        };
        MainContainer.prototype.hideDialogBuy = function(){
            if(this.hasChild(this.dialogBuy)) this.removeChild(this.dialogBuy);
        };
        MainContainer.prototype.showCommonDialog = function(text,okaction){
            if(this.hasChild(this.commonDialog)) this.removeChild(this.commonDialog);
            this.displayer.SetDisplayObjectSize(this.commonDialog,this.getCurrentHeight(),this.designHeight);
            this.displayer.SetDisplayObjectCenter(this.commonDialog,this);
            this.addChildAt(this.commonDialog,1);
            this.commonDialog.show(text,
                function(){
                    Views.MainView.hideCommonDialog();
                },
                function(){
                    Views.MainView.hideCommonDialog();
                }
            );
        };
        MainContainer.prototype.hideCommonDialog = function(){
            if(this.hasChild(this.commonDialog)) this.removeChild(this.commonDialog);
        };
        //掉落物品提示
        MainContainer.prototype.showDropProp = function(propid){
            //获取道具名称
            var PropName = Views.MainView.ToolBarContainer.propShopManager.get(propid).name;
            Views.MainView.showTipShowDialog("客人很高兴，赠予您道具【"+PropName+"】,请查收！",propid);
        };
        //小费中物品掉落提示框
        MainContainer.prototype.showTipShowDialog = function(text,propid){
            if(this.hasChild(this.tipShowDialog)) this.removeChild(this.tipShowDialog);
            this.displayer.SetDisplayObjectSize(this.tipShowDialog,this.getCurrentHeight(),this.designHeight);
            this.displayer.SetDisplayObjectCenter(this.tipShowDialog,this);
            this.addChildAt(this.tipShowDialog,1);
            this.tipShowDialog.show(text,
                function(){
                    Views.MainView.hideTipShowDialog();
                    Views.MainView.ToolBarContainer.propManager.add(Views.MainView.ToolBarContainer.propShopManager.get(propid));
                    Views.MainView.ToolBarContainer.ShowProps();
                },
                function(){
                    Views.MainView.hideTipShowDialog();
                }
            );
        };
        MainContainer.prototype.hideTipShowDialog = function(){
            if(this.hasChild(this.tipShowDialog)) this.removeChild(this.tipShowDialog);
        };
        MainContainer.prototype.GetToolBar = function(){
            var toolBar = new toolbarContainer({width:1263,height:237});
            this.displayer.SetDisplayObjectSize(toolBar,this.getCurrentHeight(),this.designHeight);
            this.displayer.SetDisplayObjectBottomCenter(toolBar,this);
            return toolBar;
        };
        MainContainer.prototype.GetInfoBar = function(){
            var infoBar = new infoBarContainer({width:480,height:70});
            this.displayer.SetDisplayObjectSize(infoBar,this.getCurrentHeight(),this.designHeight);
            this.displayer.SetDisplayObjectLeftTop(infoBar,this);
            return infoBar;
        };
        MainContainer.prototype.ShowRectificateContainer = function(){
            Views.MainView.RectificateContainer.y += this.designHeight;
        };
        MainContainer.prototype.HideRectificateContainer = function(){
            Views.MainView.RectificateContainer.y -= this.designHeight;
        };
        MainContainer.prototype.ShowQueueGetAwardDialog = function(){
            Views.MainView.queueGetAwardDialog.alpha = 1;
        };
        MainContainer.prototype.HideQueueGetAwardDialog = function(){
            Views.MainView.queueGetAwardDialog.alpha = 0;
        };
        MainContainer.prototype.ShowQueueContainer = function(){
            Views.MainView.queueContainer.alpha = 1;
        };
        MainContainer.prototype.HideQueueContainer = function(){
            Views.MainView.queueContainer.alpha = 0;
        };
        MainContainer.prototype.ShowfriendSureDialog = function(){
            Views.MainView.friendSureDialog.alpha = 1;
        };
        MainContainer.prototype.HidefriendSureDialog = function(){
            Views.MainView.friendSureDialog.alpha = 0;
        };
        MainContainer.prototype.ShowfriendEmployDialog = function(){
            Views.MainView.friendEmployDialog.alpha = 1;
        };
        MainContainer.prototype.HidefriendEmployDialog = function(){
            Views.MainView.friendEmployDialog.alpha = 0;
        };
        MainContainer.prototype.ShowfriendMagicDialog = function(){
            Views.MainView.friendMagicDialog.alpha = 1;
        };
        MainContainer.prototype.HidefriendMagicDialog = function(){
            Views.MainView.friendMagicDialog.alpha = 0;
        };
        MainContainer.prototype.ShowFriendInfo = function(friend){
            Views.MainView.friendInfo.alpha = 1;
            Views.MainView.friendInfo.Show(friend);
            Views.MainView.isShowFriendInfo = !Views.MainView.isShowFriendInfo;
        };
        MainContainer.prototype.ShowHideFriendInfo = function(friendId){
            if(!Views.MainView.isShowFriendInfo) Views.MainView.ShowFriendInfo(friendId);
            else Views.MainView.HideFriendInfo();
        };
        MainContainer.prototype.HideFriendInfo = function(){
            Views.MainView.friendInfo.alpha = 0;
            Views.MainView.isShowFriendInfo = !Views.MainView.isShowFriendInfo;
        };
        MainContainer.prototype.ShowPersonalInfo = function(){
            if(Views.MainView.hasChild(Views.MainView.personalInfo)) Views.MainView.removeChild(Views.MainView.personalInfo);
            else Views.MainView.addChild(Views.MainView.personalInfo);
        };
        MainContainer.prototype.HidePersonalInfo = function(){
            if(Views.MainView.hasChild(Views.MainView.personalInfo)) Views.MainView.removeChild(Views.MainView.personalInfo);
        };
        MainContainer.prototype.hasChild = function(item){
            for(var i=0;i<this.getNumChildren();i++){
                if(this.getChildAt(i) == item) return true;
            }
            return false;
        };
        return MainContainer;
});