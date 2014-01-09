/**
 * Created with JetBrains WebStorm.
 * User: john
 * Date: 13-3-1
 * Time: 下午9:48
 * To change this template use File | Settings | File Templates.
 */
define(['jquery','DisplayObjectsDefine','Friend','../../Common/Messages','../../Common/Config','../../Common/MsgEntity'], function($,DisplayObjectsDefine,Friend) {

    var DataManager = Class.extend({
        init:function(){
            this.login = true;
            this.isVisit = false;
            this.visitFriendid = 0;
			this.isLoaded = false;
        },

        com_reg:function(){
            //trace("注册");
            Views.Stage.removeAllChildren();
            Views.Stage.addChild(Views.LoginView);
            Views.LoginView.idolManager.idols[0].SetTouched();
        },
        com_reqUserInvalid:function(resData){
            Views.showMsg("当前用户不存在！");
            return;
        },
        //Login
        com_login: function(resData){
            if(typeof(resData) != 'undefined'){
                if(resData.length>0){
                    if(debug) trace("Res_UserData:"+JSON.stringify(resData[0]));
                    //获取角色信息
                    Player = resData[0];
                    if(Sockets.dataManager.login){
                        Sockets.dataManager.login = false;
                        Views.MainView = Views.getMainView();
                        Views.Stage.addChild(Views.MainView);
                        if(typeof(Player.guidefin) != 'undefined' && Player.guidefin!= null && Player.guidefin == 0) Views.MainView.startLeader();
                        Views.Stage.update = function(){
                            frames++;
                            Sockets.dataManager.updateFun();
                        };

						Sockets.send_ReqMailAllData();
						Sockets.send_ReqFacilityAllData();
						Sockets.send_ReqLeagueAllData();
                        Sockets.send_ReqItemAllData();
						Sockets.send_ReqCastleDevAllData();
						/*while(1){
							if(this.isLoaded)
								break;
						}
						Views.GameWork();*/
						
                        //Sockets.send_ReqFoodAllData();
                        //Sockets.send_ReqFoodYieldAll();
                        //Sockets.send_ReqPropAllData();
                        //Sockets.send_ReqPropSale();
						//Sockets.send_ReqFriendAllData();
                        //Sockets.send_reqMessageAll();
						//Sockets.send_ReqFurnitureAllData();
                        //Sockets.send_reqTaskAll();
                    }else{
                        Sockets.dataManager.reflashInfoBar();
                        Views.MainView.GameView.MapWorker.removeAllCharacter();
                        Views.MainView.gamesContainer.removeAllChildren();
                        Views.MainView.GameView = Views.MainView.GetGameView();
                        Views.MainView.gamesContainer.addChildAt(Views.MainView.GameView,1);
                        Views.GameWork();
                        //小费条判断
                        if(Sockets.dataManager.isVisit) Views.MainView.tipsContainer.y = -200;
                        else {
                            Views.MainView.tipsContainer.clear();
                            Views.MainView.tipsContainer.y = 0;
                        }
                    }
                }
            }
        },

        com_userData:function(resData){
            if(typeof(resData) != 'undefined' && typeof(resData.length) != 'undefined' && userData.length > 0){
                if(debug) trace("Put_UserData:"+JSON.stringify(resData[0]));
                Player = resData[0];
                Sockets.dataManager.reflashInfoBar();
            }
        },

        updateFun: function(){
            if(mapworkerLoaded) Views.MainView.GameView.MapWorker.update();
        },
		//装修
		com_reqFacilityAll : function(resData){
            if(typeof(resData) != 'undefined' && typeof(resData.length) != 'undefined' && resData.length > 0){
                if(debug) trace("Res_FacilityAll:"+JSON.stringify(resData));
                Views.MainView.ToolBarContainer.friendManager.clear();
                for(var i=0;i<resData.length;i++){
                    Views.MainView.ToolBarContainer.friendManager.add(resData[i]);
                }
            }
        },
		//邮箱
		com_reqMailAll : function(resData){
            if(typeof(resData) != 'undefined' && typeof(resData.length) != 'undefined' && resData.length > 0){
                if(debug) trace("Res_MailAll:"+JSON.stringify(resData));
                Views.MainView.ToolBarContainer.mailManager.clear();
                for(var i=0;i<resData.length;i++){
					if(resData[i].mailTitle != 'undefined')
                    	Views.MainView.ToolBarContainer.mailManager.add(resData[i]);
                }
            }
        },
		//盟友
		com_reqLeagueAll : function(resData){
            if(typeof(resData) != 'undefined' && typeof(resData.length) != 'undefined' && resData.length > 0){
                if(debug) trace("Res_LeagueAll:"+JSON.stringify(resData));
                Views.MainView.ToolBarContainer.leagueManager.clear();
                for(var i=0;i<resData.length;i++){
					if(resData[i].castleNickname != 'undefined')
                    	Views.MainView.ToolBarContainer.leagueManager.add(resData[i]);
                }
            }
        },
		//投资
		com_reqItemAll : function(resData){
            if(typeof(resData) != 'undefined' && typeof(resData.length) != 'undefined' && resData.length > 0){
                if(debug) trace("Res_ItemAll:"+JSON.stringify(resData));
                Views.MainView.ToolBarContainer.itemManager.clear();
                for(var i=0;i<resData.length;i++){
                    //将投资项目加入投资栏
                    Views.MainView.ToolBarContainer.itemManager.add(resData[i]);
                }
            }
        },
		//设施
		com_reqCastleDevAll : function(resData){
            if(typeof(resData) != 'undefined' && typeof(resData.length) != 'undefined' && resData.length > 0){
                if(debug) trace("Res_CastleDevAll:"+JSON.stringify(resData));
                Views.MainView.ToolBarContainer.furnitureComponentManager.clear();
                for(var i=0;i<resData.length;i++){
                    //将投资项目加入投资栏
                    Views.MainView.ToolBarContainer.furnitureComponentManager.add(resData[i]);
                }
            }
			this.isLoaded = true;
        },
		//创建设施
		com_reqCreateCaltleDev:function(messages){
            if(typeof(messages) != 'undefined'){
                if(debug) trace("Res_CastleDevAll:"+JSON.stringify(messages));
                Sockets.send_ReqCastleDevAllData();
            }
        },
		//消费
		com_reqGuestXF:function(messages){
            if(typeof(messages) != 'undefined'){
                if(debug) trace("Res_GuestXF:"+JSON.stringify(messages));
				//TODO:消费
                Views.MainView.InfoBarContainer.reflashData();
            }
        },
		
        com_reqFriendAll : function(resData){
            if(typeof(resData) != 'undefined' && typeof(resData.length) != 'undefined' && resData.length > 0){
				trace("Res_FriendAll:"+JSON.stringify(resData));
                if(debug) trace("Res_FriendAll:"+JSON.stringify(resData));
                Views.MainView.ToolBarContainer.friendManager.clear();
                for(var i=0;i<resData.length;i++){
                    Views.MainView.ToolBarContainer.friendManager.add(resData[i]);
                }
            }
			this.isLoaded = true;
        },

        com_reqFriendSrchAdd : function(resData){
            if(typeof(resData) != 'undefined'){
                if(debug) trace("Res_FriendSrchAdd:"+JSON.stringify(resData));
                if(typeof(resData.message) != 'undefined')  Views.MainView.ShowMessage(resData.message);
                Sockets.send_ReqFriendAllData();
            }
        },
        com_reqFriendAdd : function(resData){
            if(typeof(resData) != 'undefined'){
                if(debug) trace("Res_FriendAdd:"+JSON.stringify(resData));
                if(typeof(resData.message) != 'undefined') Views.MainView.ShowMessage(resData.message);
                Sockets.send_ReqFriendAllData();
            }
        },

        com_reqFriendDel : function(resData){
            if(typeof(resData) != 'undefined'){
                if(debug) trace("Res_FriendDel:"+JSON.stringify(resData));
                if(typeof(resData.message) != 'undefined') Views.MainView.ShowMessage(resData.message);
                Sockets.send_ReqFriendAllData();
            }
        },

        com_reqFurnitureAll:function(resData){
			trace("Res_ComponentAll:"+JSON.stringify(resData));
            if(typeof(resData) != 'undefined' && typeof(resData.length) != 'undefined' && resData.length > 0){
                if(debug) trace("Res_ComponentAll:"+JSON.stringify(resData));
				Views.MainView.ToolBarContainer.friendManager.clear();
                for(var i=0;i<resData.length;i++){
                    Views.MainView.ToolBarContainer.friendManager.add(resData[i]);
                }
            }
        },
        com_reqPropAll : function(resData){
            Views.MainView.ToolBarContainer.propManager.clear();
            if(typeof(resData) != 'undefined' && typeof(resData.length) != 'undefined' && resData.length > 0){
                if(debug) trace("Res_PropAll:"+JSON.stringify(resData));
                for(var i=0;i<resData.length;i++){
                    Views.MainView.ToolBarContainer.propManager.add(resData[i]);
                }
            }
            Views.MainView.ItemsContainer.ItemContainer.showItems();
        },
        com_reqPropSale : function(resData){
            if(typeof(resData) != 'undefined' && typeof(resData.length) != 'undefined' && resData.length > 0){
                if(debug) trace("Res_PropSale:"+JSON.stringify(resData));
                Views.MainView.ToolBarContainer.propShopManager.clear();
                for(var i=0;i<resData.length;i++){
                    if(typeof(resData[i]) != 'undefined') Views.MainView.ToolBarContainer.propShopManager.add(resData[i]);
                }
            }
        },
        com_reqPropBuy:function(resData){
            if(typeof(resData) != 'undefined' && typeof(resData.length) != 'undefined' && resData.length > 0){
                if(debug) trace("Res_PropBuy:"+JSON.stringify(resData));
                for(var i=0;i<1;i++){
                    if(typeof(resData[i].result) != 'undefined'&& resData[i].result!=0)
                    {
                        if(typeof(resData[i].xingbei) != 'undefined') Player.xingbei = resData[i].xingbei;
                        Sockets.dataManager.reflashInfoBar();
                    }
                    if(typeof(resData[i].message) != 'undefined')  Views.MainView.ShowMessage(resData[i].message);
                }
                Sockets.send_ReqPropAllData();
            }
        },
        com_reqPropSaleOut:function(resData){
            if(typeof(resData) != 'undefined' && typeof(resData.length) != 'undefined' && resData.length > 0){
                if(debug) trace("Res_PropSaleOut:"+JSON.stringify(resData));
                for(var i=0;i<1;i++){
                    if(typeof(resData[i].gold) != 'undefined')
                    {
                        Player.gold = resData[i].gold;
                        Sockets.dataManager.reflashInfoBar();
                        Views.MainView.ShowMessage('卖出成功');
                    }else {
                        Views.MainView.ShowMessage('没有卖出这个道具');
                    }
                }
                Sockets.send_ReqPropAllData();
            }
        },
        com_reqPropUse:function(resData){
            if(typeof(resData) != 'undefined' && typeof(resData.length) != 'undefined' && resData.length > 0){
                if(debug) trace("Res_PropUse:"+JSON.stringify(resData));
                
                var i=0;
                if(typeof(resData[i].result) != 'undefined'&& resData[i].result!=0)
                {
                    if(resData[i].proptype == "F") Sockets.send_ReqFoodAllData();
                    if(resData[i].proptype == "D") Sockets.send_ReqUserData();
                }
                Sockets.send_ReqPropAllData();
                Views.MainView.ShowMessage(resData[i].message);
            }
        },
        com_propNew:function(resData){
            if(typeof(resData) != 'undefined' && typeof(resData.length) != 'undefined' && resData.length > 0){
                if(debug) trace("Res_PropUse:"+JSON.stringify(resData));
                for(var i=0;i<resData.length;i++){
                    Views.MainView.ToolBarContainer.propManager.add(resData[i]);
                    Views.MainView.showDialogMessage("恭喜！您的物品栏中增加了道具"+resData.name+"！");
                    //Views.MainView.ToolBarContainer.ShowProps();
                }
            }
        },
        com_propEnd:function(resData){
            if(typeof(resData) != 'undefined' && typeof(resData.length) != 'undefined' && resData.length > 0){
                for(var i=0;i<resData.length;i++){
                    if(Views.MainView.ToolBarContainer.propManager.get(resData[i].propid) != -1){
                        Views.MainView.ToolBarContainer.propManager.remove(resData[i].propid);
                        Views.MainView.showDialogMessage("您所拥有的道具"+resData.name+"已经到期被回收！");
                    }
                }
            }
        },
        com_reqFoodAll : function(resData){
            if(typeof(resData) != 'undefined' && typeof(resData.length) != 'undefined' && resData.length > 0){
                if(debug) trace("Res_FoodAll:"+JSON.stringify(resData));
                //var rects = new Array();
                Views.MainView.ToolBarContainer.foodManager.clear();
                for(var i=0;i<resData.length;i++){
                    //将食品加入食品栏
                    Views.MainView.ToolBarContainer.foodManager.add(resData[i]);
                }
            }
        },
        com_reqFoodYielding:function(resData){
            if(typeof(resData) != 'undefined'){
                if(debug) trace("Res_FoodYielding:"+JSON.stringify(resData));
                for(var i=0;i<resData.length;i++){
                    Player.gold = resData[i].gold;
                    Sockets.dataManager.reflashInfoBar();
                }
                if(winSize=='Pad')  Views.MainView.RectificateContainer.rectificate();
                else Views.MainView.ItemsContainer.FoodsContainer.RectificateContainer.rectificate();
            }
        },
        com_reqFoodYieldAll:function(resData){
            if(typeof(resData) != 'undefined' && typeof(resData.length) != 'undefined' && resData.length > 0){
                if(debug) trace("Req_FoodYieldAll:"+JSON.stringify(resData));
                //升序排序
                for(var i=1;i<resData.length;i++){
                    for(var j=i;j>0;j--){
                        if(resData[j].status<resData[j-1].status){
                            var temp=resData[j];
                            resData[j]=resData[j-1];
                            resData[j-1]=temp;
                        }else{
                            continue;
                        }
                    }
                }
            }
            //将未调制的食品加入调制栏
            for(var i=0;i<resData.length;i++){
                if(typeof(resData[i].remainedtime) != 'undefined' && typeof(resData[i].yieldingtime) != 'undefined')
                {
                    if(parseInt(resData[i].remainedtime) > 0 && parseInt(resData[i].remainedtime) < parseInt(resData[i].yieldingtime))
                    {
                        if(winSize=='Pad')  Views.MainView.RectificateContainer.addFood(resData[i]);
                        else {
                            Views.MainView.ItemsContainer.FoodsContainer.RectificateContainer.addFood(resData[i]);
                            Views.MainView.ToolBarContainer.rectiManager.add(resData[i]);
                        }
                    }
                }
            }


            if(winSize=='Pad') {
                if(Views.MainView.RectificateContainer.Rectificaters.length>0)
                    Views.MainView.RectificateContainer.Rectificaters[0].continueRectificate();
            }
            else
            {
                if(Views.MainView.ItemsContainer.FoodsContainer.RectificateContainer.Rectificaters.length>0)
                    Views.MainView.ItemsContainer.FoodsContainer.RectificateContainer.Rectificaters[0].continueRectificate();
            }
            //开始调制的第一个食品

        },
        com_putFoodYieldAll:function(resData){
            trace("Put_FoodYieldAll");
            Sockets.send_ReqFoodAllData();
            //Sockets.send_ReqFoodYieldAll();
        },
        com_foodUnlock:function(resData){
            if(typeof(resData) != 'undefined' && typeof(resData.length) != 'undefined' && resData.length > 0){
                for(var i=0;i<resData.length;i++){
                    var food = Views.MainView.ToolBarContainer.foodManager.get(resData[i].foodid);
                    food.islocked = 0;
                    Views.MainView.showDialogMessage("恭喜！由于您的努力，成功解锁了新的食品:"+food.name+"！");
                }
            }
            //Views.MainView.ToolBarContainer.ShowFoods();
        },
        com_reqGuestAll:function(resData){
			resData = [
					/*{ userid:1, guestid:1, typecode:"A" },
					{ userid:1, guestid:2, typecode:"A" },
					{ userid:1, guestid:3, typecode:"A" },*/
					{ userid:1, guestid:4, typecode:"A" }
				];
            if(typeof(resData) != 'undefined' && typeof(resData.length) != 'undefined' && resData.length > 0){
                if(debug) trace("Res_GuestAll:"+JSON.stringify(resData));
                for(var i=0;i<resData.length;i++){
                    Views.MainView.GameView.MapWorker.DrawCharacterInner(resData[i]);
                }
            }
        },
	
        com_guestNew:function(resData){
            if(typeof(resData) != 'undefined' && typeof(resData.length) != 'undefined' && resData.length > 0){
                if(debug) trace("Put_GuestNew:"+JSON.stringify(resData));
                var uid = userid;
                if(Sockets.dataManager.isVisit) uid = Sockets.dataManager.visitFriendid;
                for(var i=0;i<resData.length;i++){
                    if(resData[i].userid == uid){
                        Views.MainView.GameView.MapWorker.DrawCharacterIn(resData[i]);
                    }
                }
            }
        },
        com_guestBuy:function(resData){
            if(typeof(resData) != 'undefined' && typeof(resData.length) != 'undefined' && resData.length > 0){
                if(debug) trace("Put_GuestBuy:"+JSON.stringify(resData));
                var uid = userid;
                if(Sockets.dataManager.isVisit) uid = Sockets.dataManager.visitFriendid;
                for(var i=0;i<resData.length;i++){
                    if(resData[i].userid == uid){
                        Player.gold = resData[i].gold;
                        var guest = Views.MainView.GameView.MapWorker.characters.get(resData[i].guestid);
                        if(guest != -1) guest.showFood(resData[i].drinkid,resData[i].desertid,resData[i].hastip);
                    }
                }
                Sockets.dataManager.reflashInfoBar();
            }
        },
        com_reqGuestTips:function(guestTip){
            if(guestTip.length>0){
                if(debug) trace("Res_GuestTips:"+JSON.stringify(guestTip));
                Player.gold = guestTip[0].gold;
                Player.experience = guestTip[0].experience;
                Player.energy = guestTip[0].energy;
                //显示金币+1，经验+1
                var guest = Views.MainView.GameView.MapWorker.characters.get(guestTip[0].guestid);
                if(guest != -1) guest.showExGold();
                Sockets.dataManager.reflashInfoBar();
                // 是否会给道具
                if(guestTip[0].propid != -1)
                {
                    Views.MainView.showDropProp(guestTip[0].propid);
                    Sockets.send_ReqPropAllData();
                }
            }
        },
        com_guestQuit:function(guestQuit){
            if(debug) trace("Put_GuestQuit:"+JSON.stringify(guestQuit));
            var uid = userid;
            if(Sockets.dataManager.isVisit) uid = Sockets.dataManager.visitFriendid;
            for(var i=0;i<guestQuit.length;i++){
                if(guestQuit[i].userid == uid){
                    var guest = Views.MainView.GameView.MapWorker.characters.get(guestQuit[i].guestid);
                    if(guest != -1) Views.MainView.GameView.MapWorker.characters.outDoor(guestQuit[i].guestid);
                }
            }
        },
        //随机拜访
        com_visitRandom:function(visitFriend){
            if (visitFriend.length > 0){
                //this.com_visitFriend(visitFriend[0]);
                Sockets.send_ReqVisitFriend(visitFriend[0].frienduserid);
            }
        },
        //拜访好友
        com_visitFriend:function(visitFriend){
            if(debug) trace("Res_VisitFriend:"+JSON.stringify(visitFriend));
            Sockets.dataManager.isVisit = true;
            Sockets.dataManager.visitFriendid = visitFriend.frienduserid;
            Sockets.send_ReqUserData();
            Views.MainView.ToolBarContainer.HiddenBar(
                function(){
                    Views.MainView.removeChild(Views.MainView.ToolBarContainer);
                    Views.MainView.addChildAt(Views.MainView.VisitBarContainer,1);
                    Views.MainView.VisitBarContainer.ShowBar();
                }
            );
            Views.MainView.InfoBarContainer.HiddenBar(
                function(){
                    Views.MainView.removeChild(Views.MainView.InfoBarContainer);
                    Views.MainView.addChildAt(Views.MainView.InfoBarContainer,1);
                    Views.MainView.InfoBarContainer.ShowBar();
                });
        },
        com_goHome:function(){
            Sockets.dataManager.isVisit = false;
            Sockets.send_ReqUserData();
            Views.MainView.VisitBarContainer.HiddenBar(
                function(){
                    Views.MainView.removeChild(Views.MainView.VisitBarContainer);
                    Views.MainView.addChildAt(Views.MainView.ToolBarContainer,1);
                    Views.MainView.ToolBarContainer.ShowBar();
                }
            );
            Views.MainView.InfoBarContainer.HiddenBar(
                function(){
                    Views.MainView.removeChild(Views.MainView.InfoBarContainer);
                    Views.MainView.addChildAt(Views.MainView.InfoBarContainer,1);
                    Views.MainView.InfoBarContainer.ShowBar();
                });
        },
        com_reqWorkerAll :function(workerdata){
            if(typeof(workerdata) != 'undefined'){
                if(debug) trace("Res_WorkerAll:"+JSON.stringify(workerdata));
                Views.MainView.GameView.MapWorker.removeWorkerAll();
                Views.MainView.ToolBarContainer.workerManager.clear();
                for(var i=0;i<workerdata.length;i++){
                    if(typeof(workerdata[i].rolecode) != 'undefined')
                    {
                        Views.MainView.ToolBarContainer.workerManager.add(workerdata[i]);
                    }
                }
                if(workerdata.length>0) Views.MainView.GameView.MapWorker.DrawWorker();
            }
        },
        com_reqWorkerHire :function(workerdata){
            if(typeof(workerdata) != 'undefined'){
                if(debug) trace("Res_WorkerHire:"+JSON.stringify(workerdata));
                for(var i=0;i<1;i++){
                    Views.MainView.FriendEmployDialog.showMsg(workerdata[i].message);
                    if(workerdata[i].result == 1){
                        Player.gold = workerdata[i].gold;
                        Player.xingbei = workerdata[i].xingbei;
                        Sockets.send_ReqWorkerAll(userid);
                    }
                }
            }
        },
        com_putWorkerQuit :function(workerdata){
            if(typeof(workerdata) != 'undefined'){
                if(debug) trace("Res_WorkerQuit:"+JSON.stringify(workerdata));
                if(Sockets.dataManager.isVisit) Sockets.send_ReqWorkerAll(Sockets.dataManager.visitFriendid);
                else Sockets.send_ReqWorkerAll(userid);
            }
        },

        com_reqMessageAll:function(resData){
            if(typeof(resData) != 'undefined' && resData != null){
                if(debug) trace("Res_MessageAll>>>>>>>3333333333>>>>>>>>>:"+JSON.stringify(resData));
                /*Views.MainView.ToolBarContainer.messageManager.clear();
                Views.MainView.ToolBarContainer.mailManager.clear();
                for(var i=0;i<resData.length;i++){
                    if(resData[i].typecode == "SYS")
                        Views.MainView.ToolBarContainer.messageManager.add(resData[i]);
                    else
                        Views.MainView.ToolBarContainer.mailManager.add(resData[i]);
                }*/
				
				Views.MainView.ToolBarContainer.mailManager.clear();
                for(var i=0;i<resData.length;i++){
                    Views.MainView.ToolBarContainer.mailManager.add(resData[i]);
                }
                //Views.MainView.ToolBarContainer.showNewMessage();
            }
        },

        com_reqMessageDel:function(messages){
            if(typeof(messages) != 'undefined'){
                if(debug) trace("Res_MessageDel:"+JSON.stringify(messages));
                Sockets.send_reqMessageAll();
            }
        },

        com_reqMessageSend:function(messages){
            if(typeof(messages) != 'undefined'){
                if(debug) trace("Res_MessageSend:"+JSON.stringify(messages));
                Views.MainView.ShowMessage('您的邮件已经送出！');
                Sockets.send_ReqPropAllData();
            }
        },
        com_putNewMessage:function(messages){
            if(typeof(messages) != 'undefined'){
                if(debug) trace("get_MessageNew:"+JSON.stringify(messages));
                Views.MainView.ToolBarContainer.showNewMessage();
            }
        },
        com_putUserEnergy:function(message){
            if(typeof(message) != 'undefined'){
                if(debug) trace("put_UserEnergy:"+JSON.stringify(message));
                for(var i=0;i<message.length;i++){
                    if(typeof(message[i].energy) != 'undefined' && message[i].energy != null)
                    {
                        Player.energy = message[i].energy;
                    }
                }
            }
        },
        com_putUserMagic:function(message){
            if(typeof(message) != 'undefined'){
                if(debug) trace("put_UserMagic:"+JSON.stringify(message));
                for(var i=0;i<message.length;i++){
                    if(typeof(message[i].magic) != 'undefined' && message[i].magic != null)
                    {
                        Player.magic = message[i].magic;
                    }
                }
            }
        },
        com_putInvitation:function(message){
            if(typeof(message) != 'undefined'){
                if(debug) trace("put_Invitation:"+JSON.stringify(message));
                Views.MainView.ShowMessage("TiTiKiKi来拜访你的酒馆");
                Sockets.send_reqInvite();
            }
        },
        com_reqInvite:function(message){
            if(typeof(message) != 'undefined'){
                if(debug) trace("put_Invite:"+JSON.stringify(message));
                Sockets.send_reqTiTiKiKi();
            }
        },
        com_reqTiTiKiKi:function(message){
            if(typeof(message) != 'undefined'){
                if(debug) trace("Res_TiTiKiKi:"+JSON.stringify(message));
                //显示titikiki邀请
               if(typeof(message.length) != 'undefined'&&message.length>0)  Views.MainView.ShowTiTiKiKiContainer.show(message[0]);
            }
        },
        com_putFoodUnLock:function(message){
            if(typeof(message) != 'undefined'){
                if(debug) trace("Put_FoodUnlock:"+JSON.stringify(message));
                //显示titikiki邀请
                Views.MainView.ShowMessage("恭喜，您有新的食品解锁了！");
                Sockets.send_ReqFoodAllData();
            }
        },
        com_putUserMapUpgrade:function(message){
            if(typeof(message) != 'undefined'){
                if(debug) trace("Put_UserMapUpgrade:"+JSON.stringify(message));
                //显示titikiki邀请
                Views.MainView.ShowMessageWithAction("恭喜，您的酒馆扩充了面积！",
                    function(){
                        Sockets.dataManager.login = true;
                        Views.Stage.removeChild(Views.LoadResView);
                        Views.showMsg("酒馆正在装修，请稍候...");
                        //询问服务器可以登录的消息
                        Sockets.send_reqLogin();
                    });
            }
        },
        com_putUserLevel:function(message){
            if(typeof(message) != 'undefined'){
                if(debug) trace("Put_UserLevel:"+JSON.stringify(message));
                //显示titikiki邀请
                if(message.length>0&&message[0].level!=2) Views.MainView.ShowMessageWithAction("恭喜，由于您的辛勤耕耘，酒馆终于升级了！",
                    function(){
                        Sockets.dataManager.login = true;
                        Views.Stage.removeChild(Views.LoadResView);
                        Views.showMsg("酒馆正在装修，请稍候...");
                        //询问服务器可以登录的消息
                        Sockets.send_reqLogin();
                    });
            }
        },
        com_resTaskAll:function(message){
            if(typeof(message) != 'undefined'){
                if(debug) trace("Res_TaskAll:"+JSON.stringify(message));
                Views.MainView.ToolBarContainer.queueManager.clear();
                for(var i=0;i<message.length;i++){
                    Views.MainView.ToolBarContainer.queueManager.add(message[i]);
                }
            }
        },
        com_putTaskFin:function(message){
            if(typeof(message) != 'undefined'){
                if(debug) trace("Put_TaskFin:"+JSON.stringify(message));
                ///Views.MainView.ShowMessage("恭喜，您有新的食品解锁了！");
                Sockets.send_reqTaskAll();
            }
        },
        com_reqTaskBonus:function(message){
            if(typeof(message) != 'undefined'){
                if(debug) trace("Put_TaskBonus:"+JSON.stringify(message));
                Views.MainView.ShowMessage("恭喜您完成了这个任务！");
                Sockets.send_reqTaskAll();
                Sockets.send_ReqUserData();
            }
        },
        com_reqRecharge : function(message){
            if(typeof(message) != 'undefined'){
                if(debug) trace("Req_Recharge:"+JSON.stringify(message));
                if(typeof(message.result) != 'undefined' && message.result == 1 && typeof(message.Points) != 'undefined')
                {
                    Player.xingbei = message.Points;
                    Sockets.dataManager.reflashInfoBar();
                    Views.MainView.ShowMessage("恭喜您成功充值，您当前的点数为"+message.Points+"！");
                }else
                {
                    Views.MainView.ShowMessage("很抱歉，充值失败！");
                }
            }
        },

        com_reqRechargeRecords: function(message){
            if(typeof(message) != 'undefined'){
                if(debug) trace("Req_RechargeRecords:"+JSON.stringify(message));
                Views.MainView.ToolBarContainer.rechargeRecordManager.clear();
                for(var i=0;i<message.length;i++){
                    Views.MainView.ToolBarContainer.rechargeRecordManager.add(message[i]);
                }
            }
        },
        com_reqCostRecords: function(message){
            if(typeof(message) != 'undefined'){
                if(debug) trace("Req_CostRecords:"+JSON.stringify(message));
                Views.MainView.ToolBarContainer.costRecordManager.clear();
                for(var i=0;i<message.length;i++){
                    Views.MainView.ToolBarContainer.costRecordManager.add(message[i]);
                }
            }
        },
        reflashInfoBar:function(){
            //Views.MainView.InfoBarContainer.reflashInfo(Player);
            //if(Views.MainView.contains(Views.MainView.InfoBarContainer)) Views.MainView.removeChild(Views.MainView.InfoBarContainer);
            //Views.MainView.InfoBarContainer = Views.MainView.GetInfoBar();
            //.MainView.addChildAt(Views.MainView.InfoBarContainer,1);
            Views.MainView.InfoBarContainer.reflashData();
            Views.MainView.ItemsContainer.FoodsContainer.RectificateContainer.ShowDisable();
        },
        com_reqTouziEnd:function(){
            Sockets.send_ReqFacilityAllData();
            Sockets.send_ReqItemAllData();
        },
        com_resUseWupinOnDev:function(){
            alert("物品使用成功");
        }

    });

    return DataManager;
});
