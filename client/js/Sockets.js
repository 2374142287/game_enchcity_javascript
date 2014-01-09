﻿/**
 * Created with JetBrains WebStorm.
 * User: john
 * Date: 13-2-25
 * Time: 下午3:36
 * To change this template use File | Settings | File Templates.
 */
define(['jquery','DisplayObjectsDefine','DataManager','../../Common/Messages','../../Common/Config','../../Common/MsgEntity'], function($,DisplayObjectsDefine,DataManager) {

    var sockets = Class.extend({
        init: function(serverUrl,serverPort,callback) {
            this.socket = io.connect('http://'+Config.ServerUrl+':'+Config.ServerPort);
            this.socket.on('error',callback);
            this.socket.on('disconnect',callback);
            this.dataManager = new DataManager();
            this.listen();
        },

        //是否曾经登录过
        send_reqLogin:function(){
            if(debug) trace("Requested Login:"+JSON.stringify({account:Account,password:Password,winsize:winSize}));
            this.socket.emit(Messages.Req_Login,{account:Account,password:Password,winsize:winSize});
        },
        //退出游戏
        send_reqLoginOut:function(){
            if(debug) trace("Requested LoginOut:"+JSON.stringify({userid:userid}));
            this.socket.emit(Messages.Req_LoginOut,{userid:userid});
        },
        //注册用户
        send_reg:function(){
            if(debug) trace("Request CreateUser");
            //this.socket.emit(Messages.Req_CreateUser,{userid:userid, rolecode:Views.LoginView.idolManager.selectedId});
            //if(debug) trace(JSON.stringify({userid:userid, rolecode:Views.LoginView.idolManager.selectedId}));
            this.socket.emit(Messages.Req_CreateUser,{userid:userid,account:Player.account,password:Player.password,nickname:Player.nickname,rolecode:Views.LoginView.idolManager.selectedId,winsize:winSize});
            if(debug) trace(JSON.stringify({userid:userid,account:Player.account,password:Player.password,nickname:Player.nickname,rolecode:Views.LoginView.idolManager.selectedId,winsize:winSize}));
        },
		//请求装修信息
        send_ReqFacilityAllData:function(){
            if(debug) trace("Request FacilityAll");
            this.socket.emit(Messages.Req_FacilityAll,{userid:userid});
            if(debug) trace(JSON.stringify({userid:userid}));
        },
		//请求邮箱信息
        send_ReqMailAllData:function(){
            if(debug) trace("Request MailAll");
            this.socket.emit(Messages.Req_MailAll,{userid:userid});
            if(debug) trace(JSON.stringify({userid:userid}));
        },
		//请求盟友信息
        send_ReqLeagueAllData:function(){
            if(debug) trace("Request LeagueAll");
            this.socket.emit(Messages.Req_LeagueAll,{userid:userid});
            if(debug) trace(JSON.stringify({userid:userid}));
        },




        //请求用户信息
        send_ReqUserData:function(){
            if(debug) trace("Request UserData");
            var uid = userid;
            if(Sockets.dataManager.isVisit) uid = Sockets.dataManager.visitFriendid;
            this.socket.emit(Messages.Req_UserData,{userid:uid});
            if(debug) trace(JSON.stringify({userid:uid}));
        },
        //请求朋友信息
        send_ReqFriendAllData:function(){
            if(debug) trace("Request FriendAll");
            this.socket.emit(Messages.Req_FriendAll,{userid:userid});
            if(debug) trace(JSON.stringify({userid:userid}));
        },
        //通过昵称添加好友
        send_ReqFriendSrchAdd:function(name){
            if(debug) trace("Request FriendSrchAdd");
            this.socket.emit(Messages.Req_FriendSrchAdd,{userid:userid,nickname:name});
            if(debug) trace(JSON.stringify({userid:userid,nickname:name}));
        },
        //通过id添加好友
        send_ReqFriendAdd:function(frienduserid){
            if(debug) trace("Request FriendAdd");
            this.socket.emit(Messages.Req_FriendAdd,{userid:userid,frienduserid:frienduserid});
            if(debug) trace(JSON.stringify({userid:userid,frienduserid:frienduserid}));
        },
        //删除好友
        send_ReqFriendDel:function(frienduserid){
            if(debug) trace("Request FriendDel");
            this.socket.emit(Messages.Req_FriendDel,{userid:userid,frienduserid:frienduserid});
            if(debug) trace(JSON.stringify({userid:userid,frienduserid:frienduserid}));
        },
        //请求家具数据
        send_ReqFurnitureAllData:function(){
            var uid = userid;
            if(Sockets.dataManager.isVisit) uid = Sockets.dataManager.visitFriendid;
            if(debug) trace("Request ComponentAll"+JSON.stringify({userid:uid}));
            this.socket.emit(Messages.Req_ComponentAll,{userid:uid});
        },

        //请求食品信息
        send_ReqFoodAllData:function(){
            if(debug) trace("Request FoodAll"+JSON.stringify({userid:userid}));
            this.socket.emit(Messages.Req_FoodAll,{userid:userid});
        },
        //请求食品调制信息
        send_ReqFoodYieldAll:function(){
            if(debug) trace();
            //获取食品调制列表
            if(debug) trace("Request FoodYieldAll"+JSON.stringify({userid:userid}));
            Sockets.socket.emit(Messages.Req_FoodYieldAll,{userid:userid});
        },
        //发送食品调制信息
        send_ReqFoodYielding:function(){
            //获取食品调制列表
            var foodIds = new Array();
            if(winSize=='Pad')  foodIds = Views.MainView.RectificateContainer.getFoodIds();
            else foodIds = Views.MainView.ItemsContainer.FoodsContainer.RectificateContainer.getFoodIds();
            if(debug) trace("Res_FoodYielding:"+JSON.stringify({userid:userid,foodids:foodIds}));
            Sockets.socket.emit(Messages.Req_FoodYielding,{userid:userid,foodids:foodIds});
        },
        //请求在客人数据
        send_ReqGuestAllData:function(){
            //获取客人列表
            var uid = userid;
            if(Sockets.dataManager.isVisit) uid = Sockets.dataManager.visitFriendid;
            Sockets.socket.emit(Messages.Req_GuestAll,{userid:uid});
            if(debug) trace("Request GuestAll"+JSON.stringify({userid:uid}));
        },
        //请求道具数据
        send_ReqPropAllData:function(){
            Sockets.socket.emit(Messages.Req_PropAll,{userid:userid});
            if(debug) trace("Request PropAll"+JSON.stringify({userid:userid}));
        },
        //请求商城道具
        send_ReqPropSale:function(){
            Sockets.socket.emit(Messages.Req_PropSale,{userid:userid});
            if(debug) trace("Request PropSale"+JSON.stringify({userid:userid}));
        },
        //请求购买商城道具
        send_ReqPropBuy:function(propid){
            Sockets.socket.emit(Messages.Req_PropBuy,{userid:userid,propid:propid});
            if(debug) trace("Request PropBuy"+JSON.stringify({userid:userid,propid:propid}));
        },
        //请求卖出道具
        send_ReqPropSaleOut:function(propid){
            Sockets.socket.emit(Messages.Req_PropSaleOut,{userid:userid,propid:propid});
            if(debug) trace("Request PropSaleOut"+JSON.stringify({userid:userid,propid:propid}));
        },
        //请求使用道具
        send_ReqPropUse:function(propid,id){
            Sockets.socket.emit(Messages.Req_PropUse,{userid:userid,propid:propid,id:id});
            if(debug) trace("Request PropUse"+JSON.stringify({userid:userid,propid:propid,id:id}));
        },
        //发送小费信息
        send_ReqGuestTipsData:function(guestid){
            //获取客人列表
            Sockets.socket.emit(Messages.Req_GuestTips,{userid:userid,guestid:guestid});
            if(debug) trace("Send GuestTips"+JSON.stringify({userid:userid,guestid:guestid}));
        },
        send_ReqVisitRandom:function(){
            this.socket.emit(Messages.Req_VisitRandom,{userid:userid});
            trace("Request VisitRandom At "+JSON.stringify({userid:userid}));
            if(debug) trace("Request VisitRandom At "+JSON.stringify({userid:userid}));
        },
        //请求拜访朋友信息
        send_ReqVisitFriend:function(frienduserid){
            this.socket.emit(Messages.Req_VisitFriend,{userid:userid,frienduserid:frienduserid});
            if(debug) trace("Request VisitFriend"+JSON.stringify({userid:userid,frienduserid:frienduserid}));
        },
        //请求回家信息
        send_ReqVisitBack:function(){
            this.socket.emit(Messages.Req_VisitBack,{userid:userid});
            if(debug) trace("Request VisitBack"+JSON.stringify({userid:userid}));
        },
        //请求工人数据
        send_ReqWorkerAll:function(id){
            this.socket.emit(Messages.Req_WorkerAll,{userid:id});
            if(debug) trace("Request WorkerAll userid:"+id);
        },
        //雇用好友为工人
        send_reqWorkerHire:function(userfriendid,rolecode){
            this.socket.emit(Messages.Req_WorkerHire,{userid:userid, frienduserid:userfriendid, rolecode:rolecode});
            if(debug) trace("Request WorkerHire"+JSON.stringify({userid:userid, frienduserid:userfriendid, rolecode:rolecode}));
        },

        //请求消息
        send_reqMessageAll:function(){
            if(debug) trace("Request MailAll");
            this.socket.emit(Messages.Req_MailAll,{userid:userid});
        },

        send_reqMessageDel:function(mailid){
            if(debug) trace("Request MailDel");
            this.socket.emit(Messages.Req_MessageDel,{userid:userid,id:mailid});
        },

        send_reqMessageSend:function(message){
            if(debug) trace("Request MessageSend");
            this.socket.emit(Messages.Req_MessageSend,message);
        },
		
        send_reqInvite:function(){
            if(debug) trace("Request Invite");
            this.socket.emit(Messages.Req_Invite,{userid:userid});
        },
        send_reqTiTiKiKi:function(){
            if(debug) trace("Request TiTiKiKi");
            this.socket.emit(Messages.Req_TiTiKiKi,{userid:userid});
        },
        ///请求任务信息
        send_reqTaskAll:function(){
            if(debug) trace("Request TaskAll");
            this.socket.emit(Messages.Req_TaskAll,{userid:userid});
        },
        //领取奖励
        send_reqTaskBonus:function(taskid){
            if(debug) trace("Request TaskBonus");
            this.socket.emit(Messages.Req_TaskBonus,{userid:userid,taskid:taskid});
        },

        send_reqRecharge:function(rechargPoints){
            if(debug) trace("Request Recharge points:"+rechargPoints);
            console.log("test emit");
//            this.socket.emit(Messages.Req_Login,{account:Account,password:Password,winsize:winSize});
            console.log("before chargeup send");
            this.socket.emit(Messages.Req_ChargeUp,{userid:userid,points:rechargPoints});
            console.log("after chargeup send");
        },

        send_reqRechargeRecords:function(){
            if(debug) trace("Request RechargeRecords");
            this.socket.emit(Messages.Req_RechargeRecords,{userid:userid});
        },

        send_reqCostRecords:function(){
            if(debug) trace("Request CostRecord");
            this.socket.emit(Messages.Req_CostRecords,{userid:userid});
        },
		
		//请求投资信息
        send_ReqItemAllData:function(){
            if(debug) trace("Request ItemAll"+JSON.stringify({userid:userid}));
            this.socket.emit(Messages.Req_ItemAll,{userid:userid});
        },
		//请求设施信息
		send_ReqCastleDevAllData:function(){
            if(debug) trace("Request CastleDevAll"+JSON.stringify({userid:userid}));
            this.socket.emit(Messages.Req_CaltleDevList,{userid:userid});
        },
		//请求创建设施信息
		send_ReqCreateCastleDev:function(devData){
            if(debug) trace("Request create CastleDev"+JSON.stringify({userid:userid}));
            this.socket.emit(Messages.Req_CreateCaltleDev,devData);
        },
		//请求移动设施信息
		send_ReqMovedCastleDev:function(devData){
            if(debug) trace("Request move CastleDev"+JSON.stringify({userid:userid}));
            this.socket.emit(Messages.Req_MovedCaltleDev,devData);
        },
		//请求删除设施信息
		send_ReqDeletedCastleDev:function(devData){
            if(debug) trace("Request delete CastleDev"+JSON.stringify({userid:userid}));
            this.socket.emit(Messages.Req_DeletedCaltleDev,devData);
        },
		//请求消费设施信息
		send_ReqGusetXF:function(guestPrice,castleId){
            if(debug) trace("Request guest xf"+JSON.stringify({userid:userid,guestPrice:guestPrice,castleId:castleId}));
			//this.socket.emit(Messages.Req_CaltleDevList,{userid:userid});
            this.socket.emit(Messages.Req_GusetXF,{guestPrice:guestPrice,castleId:castleId});
        },
		//投资
		send_reqTouziStart:function(message){
            if(debug) trace("Request TouziStart");
            this.socket.emit(Messages.Req_TouziStart,message);
        },
        //投资结束
        send_reqTouziEnd:function(message){
            if (debug) trace("Request TouziEnd");
            this.socket.emit(Messages.Req_TouziEnd, message);
        },
        //使用物品
        send_reqUseWupinOnDev:function(dev, wupinid){
            if(debug) trace("Request Use Wupin");
            var uid = userid;
            this.socket.emit(Messages.Req_useWupinOnDev,{castleId:uid, dev:dev, wupinId:wupinid});
            if(debug) trace(JSON.stringify({userid:uid}));
        },


        listen:function(){
            //是否曾经登录过
            this.socket.on(Messages.Res_Login,function(resData){
                if(typeof(resData) != 'undefined'){
                    if(debug) trace("Response Login:"+JSON.stringify(resData));
                    if(resData.result==1){
                        userid = resData.userid;
                        Sockets.send_ReqUserData();
                    }else{
                        //请求注册用户
                        //Sockets.dataManager.com_reg();
                        Views.showMsg(resData.message+"<br/>请刷新页面");
                    }
                }else
                {
                    Views.showMsg("服务器返回值错误（undefined）");
                    return;
                }
            });
            //注册用户
			//alert("listen");
            this.socket.on(Messages.Res_CreateUser,function(resData){
                if(typeof(resData) != 'undefined'){
                    if(debug) trace("Response CreateUser:"+JSON.stringify(resData));
                    if(resData.result==1){
                        userid = resData.userid;
                        Sockets.send_ReqUserData();
                    }else{
                        Views.showMsg(resData.message+"<br/>请刷新页面");
                        //Views.showMsg("对不起，用户注册失败！请刷新当前页面重试！");
                        return;
                    }
                }else
                {
                    Views.showMsg("服务器返回值错误（undefined）");
                    return;
                }
            });

			//接受装修信息
            this.socket.on(Messages.Res_FacilityAll,this.dataManager.com_reqFacilityAll);
			//接受邮箱信息
            this.socket.on(Messages.Res_MailAll,this.dataManager.com_reqMailAll);
			//接受盟友信息
			this.socket.on(Messages.Res_LeagueAll,this.dataManager.com_reqLeagueAll);
			//接收投资信息
			this.socket.on(Messages.Res_ItemAll,this.dataManager.com_reqItemAll);
            //接收物品信息
            this.socket.on(Messages.Res_WupinAll,this.dataManager.com_reqWupinAll);
			//接收设施信息
			this.socket.on(Messages.Res_CaltleDevList,this.dataManager.com_reqCastleDevAll);
			//保存消息send_reqCastleDevSaved
            this.socket.on(Messages.Res_CreateCaltleDev,this.dataManager.com_reqCreateCaltleDev);
			//消费
			this.socket.on(Messages.Res_GusetXF,this.dataManager.com_reqGuestXF);
			
			
			
			
            this.socket.on(Messages.Res_ChargeUp,this.dataManager.com_reqRecharge);

            this.socket.on(Messages.Res_UserInvalid,this.dataManager.com_reqUserInvalid);
            //请求用户数据
            this.socket.on(Messages.Res_UserData,this.dataManager.com_login);
            //接受用户信息
            this.socket.on(Messages.Put_UserData,this.dataManager.com_userData);
            //接受好友信息
            this.socket.on(Messages.Res_FriendAll,this.dataManager.com_reqFriendAll);
            this.socket.on(Messages.Res_FriendSrchAdd,this.dataManager.com_reqFriendSrchAdd);
            this.socket.on(Messages.Res_FriendAdd,this.dataManager.com_reqFriendAdd);
            this.socket.on(Messages.Res_FriendDel,this.dataManager.com_reqFriendDel);
            //接收家具数据
            this.socket.on(Messages.Res_ComponentAll,this.dataManager.com_reqFurnitureAll);
            //接收食品信息
            this.socket.on(Messages.Res_FoodAll,this.dataManager.com_reqFoodAll);
            this.socket.on(Messages.Res_FoodYieldAll,this.dataManager.com_reqFoodYieldAll);
            this.socket.on(Messages.Res_FoodYielding,this.dataManager.com_reqFoodYielding);
            //接收食品解锁数据
            this.socket.on(Messages.Put_FoodUnlock,this.dataManager.com_putFoodUnLock);
            //接收客人信息
            this.socket.on(Messages.Res_GuestAll,this.dataManager.com_reqGuestAll);
            //接收道具信息
            this.socket.on(Messages.Res_PropAll,this.dataManager.com_reqPropAll);
            //接收道具商城信息
            this.socket.on(Messages.Res_PropSale,this.dataManager.com_reqPropSale);
            //接收道具购买信息
            this.socket.on(Messages.Res_PropBuy,this.dataManager.com_reqPropBuy);
            //接收道具卖出信息
            this.socket.on(Messages.Res_PropSaleOut,this.dataManager.com_reqPropSaleOut);
            //接收道具使用信息
            this.socket.on(Messages.Res_PropUse,this.dataManager.com_reqPropUse);
            //接收小费信息
            this.socket.on(Messages.Res_GuestTips,this.dataManager.com_reqGuestTips);
            //接收访问好友
            this.socket.on(Messages.Res_VisitFriend,this.dataManager.com_visitFriend);
            //接收随机拜访好友
            this.socket.on(Messages.Res_VisitRandom,this.dataManager.com_visitRandom);
            //接收回家信息
            this.socket.on(Messages.Res_VisitBack,this.dataManager.com_goHome);
            //接受客人进店信息
            this.socket.on(Messages.Put_GuestNew,this.dataManager.com_guestNew);
            //接受客人购买信息
            this.socket.on(Messages.Put_GuestBuy,this.dataManager.com_guestBuy);
            //接受客人出店信息
            this.socket.on(Messages.Put_GuestQuit,this.dataManager.com_guestQuit);
            //接受解锁食品
            this.socket.on(Messages.Put_FoodUnlock, this.dataManager.com_foodUnlock);
            //接受道具信息
            this.socket.on(Messages.Put_PropNew,this.dataManager.com_propNew);
            //接受到期道具信息
            this.socket.on(Messages.Put_PropEnd,this.dataManager.com_propEnd);
            //接受食品调制变化信息 ，需重新请求食品数据机食品调制数据
            this.socket.on(Messages.Put_FoodYieldAll,this.dataManager.com_putFoodYieldAll);
            //接收工人数据
            this.socket.on(Messages.Res_WorkerAll,this.dataManager.com_reqWorkerAll);
            //雇用好友数据
            this.socket.on(Messages.Res_WorkerHire,this.dataManager.com_reqWorkerHire);
            //获取解雇工人信息
            this.socket.on(Messages.Put_WorkerQuit,this.dataManager.com_putWorkerQuit);
            //接收消息
            this.socket.on(Messages.Res_MessageAll,this.dataManager.com_reqMessageAll);
            //删除消息
            this.socket.on(Messages.Res_MessageDel,this.dataManager.com_reqMessageDel);
            //发送新邮件
            this.socket.on(Messages.Res_MessageSend,this.dataManager.com_reqMessageSend);
            //接收新消息
            this.socket.on(Messages.Put_NewMessage,this.dataManager.com_putNewMessage);
            //接收体力
            this.socket.on(Messages.Put_UserEnergy,this.dataManager.com_putUserEnergy);
            //接收魔幻值
            this.socket.on(Messages.Put_UserMagic,this.dataManager.com_putUserMagic);
            //接收邀请TiTiKiKi
            this.socket.on(Messages.Put_Invitation,this.dataManager.com_putInvitation);
            //接收请求邀请TiTiKiKi
            this.socket.on(Messages.Res_Invite,this.dataManager.com_reqInvite);
            //接收邀请TiTiKiki的响应
            this.socket.on(Messages.Res_TiTiKiKi,this.dataManager.com_reqTiTiKiKi);
            //接收地图升级
            this.socket.on(Messages.Put_UserMapUpgrade,this.dataManager.com_putUserMapUpgrade);
            //接收酒馆升级
            this.socket.on(Messages.Put_UserLevel,this.dataManager.com_putUserLevel);
            //接收任务数据
            this.socket.on(Messages.Res_TaskAll,this.dataManager.com_resTaskAll);
            //接收任务完成消息
            this.socket.on(Messages.Put_TaskFin,this.dataManager.com_putTaskFin);
            //接收领取奖励消息
            this.socket.on(Messages.Res_TaskBonus,this.dataManager.com_reqTaskBonus);
            //投资结束
            this.socket.on(Messages.Res_TouziEnd, this.dataManager.com_reqTouziEnd);
            //投资结束
            this.socket.on(Messages.Res_useWupinOnDev, this.dataManager.com_resUseWupinOnDev);
        }
    });

    return sockets;
});