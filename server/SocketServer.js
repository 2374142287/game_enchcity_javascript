﻿/**
 * Created with JetBrains WebStorm.
 * User: yyh
 * Date: 13-3-2
 * Time: AM12:20
 * To change this template use File | Settings | File Templates.
 */

var http = require('http');
var socketio = require('socket.io');

var UserManager = new require('./UserManager');
var UserSession = require('./UserSession');

var XmlDocument = require('./lib/xmldoc').XmlDocument;

var UserMgr = new UserManager();

var OnConnected = function (socket, mysql)
{
	
	socket.on( Messages.Req_ChargeUp, function (data) { OnReqChargeUp(socket, data, mysql); } );
	
    socket.on( 'disconnect', function (reason) { OnDisConnected(socket, reason, mysql); } );

    socket.on( Messages.Req_Login, function (data) { OnReqLogin(socket, data, mysql); } );

    socket.on( Messages.Req_CreateUser, function (data) { OnReqCreateUser(socket, data, mysql); } );

    socket.on( Messages.Req_UserData, function (data) { OnReqUserData(socket, data, mysql); } );

    socket.on( Messages.Req_GuestAll, function (data) { OnReqGuestAll(socket, data, mysql); } );

    socket.on( Messages.Req_GuestTips, function (data) { OnReqGuestTips(socket, data, mysql); } );

    socket.on( Messages.Req_WorkerAll, function (data) { OnReqWorkerAll(socket, data, mysql); } );

    socket.on( Messages.Req_WorkerHire, function (data) { OnReqWorkerHire(socket, data, mysql); } );

    socket.on( Messages.Req_Invite, function (data) { OnReqInvite(socket, data, mysql); } );

    socket.on( Messages.Req_TiTiKiKi, function (data) { OnReqTiTiKiKi(socket, data, mysql); } );

    socket.on( Messages.Req_TaskAll, function (data) { OnReqTaskAll(socket, data, mysql); } );

    socket.on( Messages.Req_TaskGuideFin, function (data) { OnReqTaskGuideFin(socket, data, mysql); } );

    socket.on( Messages.Req_TaskBonus, function (data) { OnReqTaskBonus(socket, data, mysql); } );

    socket.on( Messages.Req_FurnitureAll, function (data) { OnReqFurnitureAll(socket, data, mysql); } );

    socket.on( Messages.Req_ComponentAll, function (data) { OnReqComponentAll(socket, data, mysql); } );

    socket.on( Messages.Req_PropAll, function (data) { OnReqPropAll(socket, data, mysql); } );

    socket.on( Messages.Req_PropSale, function (data) { OnReqPropSale(socket, data, mysql); } );

    socket.on( Messages.Req_PropBuy, function (data) { OnReqPropBuy(socket, data, mysql); } );

    socket.on( Messages.Req_PropSaleOut, function (data) { OnReqPropSaleOut(socket, data, mysql); } );

    socket.on( Messages.Req_PropUse, function (data) { OnReqPropUse(socket, data, mysql); } );

    socket.on( Messages.Req_FoodAll, function (data) { OnReqFoodAll(socket, data, mysql); } );

    socket.on( Messages.Req_FoodYielding, function (data) { OnReqFoodYielding(socket, data, mysql); } );

    socket.on( Messages.Req_FoodYieldAll, function (data) { OnReqFoodYieldAll(socket, data, mysql); } );

    socket.on( Messages.Req_FriendAll, function (data) { OnReqFriendAll(socket, data, mysql); } );

    socket.on( Messages.Req_FriendAdd, function (data) { OnReqFriendAdd(socket, data, mysql); } );

    socket.on( Messages.Req_FriendSrchAdd, function (data) { OnReqFriendSrchAdd(socket, data, mysql); } );

    socket.on( Messages.Req_FriendDel, function (data) { OnReqFriendDel(socket, data, mysql); } );

    socket.on( Messages.Req_VisitFriend, function (data) { OnReqVisitFriend(socket, data, mysql); } );

    socket.on( Messages.Req_VisitRandom, function (data) { OnReqVisitRandom(socket, data, mysql); } );

    socket.on( Messages.Req_VisitBack, function (data) { OnReqVisitBack(socket, data, mysql); } );

    socket.on( Messages.Req_MessageAll, function (data) { OnReqMessageAll(socket, data, mysql); } );

    socket.on( Messages.Req_MessageDel, function (data) { OnReqMessageDel(socket, data, mysql); } );

    socket.on( Messages.Req_MessageSend, function (data) { OnReqMessageSend(socket, data, mysql); } );
	
	//============================================yxiao=============================================//
	socket.on( Messages.Req_FacilityAll, function (data) { OnReqFacilityAll(socket, data, mysql); } );
	
	socket.on( Messages.Req_MailAll, function (data) { OnReqMailAll(socket, data, mysql); } );
	
	socket.on( Messages.Req_LeagueAll, function (data) { OnReqLeagueAll(socket, data, mysql); } );

	socket.on( Messages.Req_ItemAll, function (data) { OnReqItemAll(socket, data, mysql); } );
   
    socket.on( Messages.Req_TouziStart, function (data) { OnReqTouziStart(socket, data, mysql); } );

    socket.on( Messages.Req_TouziEnd, function (data) { OnReqTouziEnd(socket, data, mysql); } );
	
	socket.on( Messages.Req_CaltleDevList, function (data) { OnReqCaltleDevList(socket, data, mysql); } );
	
	socket.on( Messages.Req_CreateCaltleDev, function (data) { OnReqCreateCaltleDev(socket, data, mysql); } );
	
	socket.on( Messages.Req_MovedCaltleDev, function (data) { OnReqMoveCaltleDev(socket, data, mysql); } );
	
	socket.on( Messages.Req_DeletedCaltleDev, function (data) { OnReqDeletedCaltleDev(socket, data, mysql); } );
	
	socket.on( Messages.Req_GusetXF, function (data) { OnReqGusetXF(socket, data, mysql); } );

    socket.on( Messages.Req_useWupinOnDev, function(data){ OnReqUseWupinOnDev(socket, data, mysql); });
	
	

}

var OnDisConnected = function (socket, reason, mysql)
{
    console.log('Disconnected for reason: ' + reason);

    var user = UserMgr.GetUserBySocket(socket);
    if(user)
    {
        mysql.UpdateUserStatus(user.userid, 0);
    }

    UserMgr.RemoveUserBySocket(socket);
}

var OnReqLogin = function (socket, data, mysql)
{
    try
    {
        var user = UserMgr.GetUserByAccount(data.account);
        if ( user != null && user.socket != socket)
        {
            user.socket.disconnect();
            UserMgr.RemoveUserBySocket(user.socket);
            console.log('Force disconnect previous user: ' + data.account);
        }

        console.log('Login by user: ' + data.account);

        user = new UserSession(socket, data.account, data.winsize.toLowerCase());

        UserMgr.AddUser(user);

        mysql.UserLogin({user: user, mysql:mysql}, data, OnResLogin);
    }
    catch (err)
    {
        console.log(err);
    }
}

var OnResLogin = function (param, data)
{
    if(data != null && data.result == 1)
    {
        param.mysql.UpdateUserStatus(data.userid, 1);

        param.user.userid = data.userid;
    }

    param.user.socket.emit(Messages.Res_Login, data);
}

var OnReqCreateUser = function (socket, data, mysql)
{
    console.log('Create user: ' + data.account);

    if ( UserMgr.GetUserByAccount(data.account) == null)
    {
        user = new UserSession(socket, data.account, data.winsize.toLowerCase());

        UserMgr.AddUser(user);

        mysql.CreateUser({user: user, mysql:mysql}, data, OnResCreateUser);
    }
    else
    {
        console.log(UserMgr.GetUserByAccount(data.account));
        user.socket.emit(Messages.Res_CreateUser, {userid: -1, result: 0, message: '注册失败。该用户名已经被注册，请使用其他用户名！'});
    }
}

var OnResCreateUser = function (param, data)
{
    if(data.length > 0)
    {
        param.user.socket.emit(Messages.Res_CreateUser, data[0]);

        if(data[0].result != 1)
        {
            UserMgr.RemoveUserByAccount(param.user.account);
        }
        else
        {
            param.mysql.UpdateUserStatus(data[0].userid, 1);

            param.user.userid = data[0].userid;
        }
    }
    else
    {
        param.user.socket.emit(Messages.Res_CreateUser, {userid: -1, result: 0, message: '注册失败。注册时发生错误！'});

        UserMgr.RemoveUserByAccount(param.user.account);
    }
}

var OnReqUserData = function (socket, data, mysql)
{
    console.log('Request user data: ' + data.userid);
    var user = UserMgr.GetUserBySocket(socket);
    if(user)
    {
        mysql.GetUserInfo(user, data, OnResUserData);
    }
}

var OnResUserData = function (user, data)
{
    if (data.length > 0)
    {
        console.log('Response user data: ' + data[0]['userid']);
        user.socket.emit(Messages.Res_UserData, data);
    }
}

var OnReqGuestAll = function (socket, data, mysql)
{
    console.log('Request guest all: ' + data.userid);
    var user = UserMgr.GetUserBySocket(socket);
    if(user)
    {
        mysql.GetUserGuests(user, data, OnResGuestAll);
    }
}

var OnResGuestAll = function (user, data)
{
    user.socket.emit(Messages.Res_GuestAll, data);
}

var OnReqGuestTips = function (socket, data, mysql)
{
    console.log('Request guest tips: ' + data.userid);
    var user = UserMgr.GetUserBySocket(socket);
    if(user)
    {
        mysql.GetUserGuestTips(user, data, OnResGuestTips);

        mysql.GetUserTaskFinishing(GetUserTaskFinishingCallback, mysql, user);
    }
}

var OnResGuestTips = function (user, data)
{
    user.socket.emit(Messages.Res_GuestTips, data);
}

var OnReqWorkerAll = function (socket, data, mysql)
{
    console.log('Request worker all: ' + data.userid);
    var user = UserMgr.GetUserBySocket(socket);
    if(user)
    {
        mysql.GetUserWorkers(user, data, OnResWorkerAll);
    }
}

var OnResWorkerAll = function (user, data)
{
    user.socket.emit(Messages.Res_WorkerAll, data);
}

var OnReqWorkerHire = function (socket, data, mysql)
{
    console.log('Request worker hire: ' + data.userid);
    var user = UserMgr.GetUserBySocket(socket);
    if(user)
    {
        mysql.HireWorker(user, data, OnResWorkerHire);

        mysql.GetUserTaskFinishing(GetUserTaskFinishingCallback, mysql, user);
    }
}

var OnResWorkerHire = function (user, data)
{
    user.socket.emit(Messages.Res_WorkerHire, data);
}

var OnReqInvite = function (socket, data, mysql)
{
    console.log('Request invite TiTi/KiKi: ' + data.userid);
    var user = UserMgr.GetUserBySocket(socket);
    if(user)
    {
        mysql.Invite(user, data, OnResInvite);

        mysql.GetUserTaskFinishing(GetUserTaskFinishingCallback, mysql, user);
    }
}

var OnResInvite = function (user, data)
{
    user.socket.emit(Messages.Res_Invite, data);
}

var OnReqTiTiKiKi = function (socket, data, mysql)
{
    console.log('Request invite TiTi/KiKi: ' + data.userid);
    var user = UserMgr.GetUserBySocket(socket);
    if(user)
    {
        mysql.GetTiTiKiKi(user, data, OnResTiTiKiKi);
    }
}

var OnResTiTiKiKi = function (user, data)
{
    user.socket.emit(Messages.Res_TiTiKiKi, data);
}

var OnReqTaskAll = function (socket, data, mysql)
{
    console.log('Request tasks: ' + data.userid);
    var user = UserMgr.GetUserBySocket(socket);
    if(user)
    {
        mysql.GetUserTask(user, data, OnResTaskAll);
    }
}

var OnResTaskAll = function (user, data)
{
    user.socket.emit(Messages.Res_TaskAll, data);
}

var OnReqTaskGuideFin = function (socket, data, mysql)
{
    console.log('Request Guide task finish: ' + data.userid);
    var user = UserMgr.GetUserBySocket(socket);
    if(user)
    {
        mysql.SetUserGuideTask(user, data, OnResTaskGuideFin);

        mysql.GetUserTaskFinishing(GetUserTaskFinishingCallback, mysql, user);
    }
}

var OnResTaskGuideFin = function (user, data)
{
    user.socket.emit(Messages.Res_TaskGuideFin, {userid: user.userid});
}

var OnReqTaskBonus = function (socket, data, mysql)
{
    console.log('Request task bonus: ' + data.userid);
    var user = UserMgr.GetUserBySocket(socket);
    if(user)
    {
        mysql.GetUserTaskBonus(user, data, OnResTaskBonus);
    }
}

var OnResTaskBonus = function (user, data)
{
    user.socket.emit(Messages.Res_TaskBonus, {userid: user.userid});
}

var OnReqFurnitureAll = function (socket, data, mysql)
{
    console.log('Request furnitures: ' + data.userid);
    var user = UserMgr.GetUserBySocket(socket);
    if(user)
    {
        mysql.GetUserFurnitures(user, data, OnResFurnitureAll);
    }
}

var OnResFurnitureAll = function (user, data)
{
    user.socket.emit(Messages.Res_FurnitureAll, data);
}

var OnReqComponentAll = function (socket, data, mysql)
{
    console.log('Request furniture components: ' + data.userid);
    var user = UserMgr.GetUserBySocket(socket);
    if(user)
    {
        //mysql.GetUserFurnitureComp(user, data, OnResComponentAll);
		mysql.GetUserFacility(user, data, OnResComponentAll);
    }
}

var OnResComponentAll = function (user, data)
{
    user.socket.emit(Messages.Res_ComponentAll, data);
}

var OnReqPropAll = function (socket, data, mysql)
{
    console.log('Request user prop: ' + data.userid);
    var user = UserMgr.GetUserBySocket(socket);
    if(user)
    {
        mysql.GetUserProp(user, data, OnResPropAll);
    }
}

var OnResPropAll = function (user, data)
{
    user.socket.emit(Messages.Res_PropAll, data);
}

var OnReqPropSale = function (socket, data, mysql)
{
    console.log('Request prop on sale: ' + data.userid);
    var user = UserMgr.GetUserBySocket(socket);
    if(user)
    {
        mysql.GetPropsOnSale(user, data, OnResPropSale);
    }
}

var OnResPropSale = function (user, data)
{
    user.socket.emit(Messages.Res_PropSale, data);
}

var OnReqPropUse = function (socket, data, mysql)
{
    console.log('Request use prop: ' + data.userid);
    var user = UserMgr.GetUserBySocket(socket);
    if(user)
    {
        mysql.SetPropInUse(user, data, OnResPropUse);

        mysql.GetUserTaskFinishing(GetUserTaskFinishingCallback, mysql, user);
    }
}

var OnResPropUse = function (user, data)
{
    user.socket.emit(Messages.Res_PropUse, data);
}

var OnReqPropBuy = function (socket, data, mysql)
{
    console.log('Request buy prop: ' + data.userid);
    var user = UserMgr.GetUserBySocket(socket);
    if(user)
    {
        mysql.BuyProp(user, data, OnResPropBuy);
    }
}

var OnResPropBuy = function (user, data)
{
    user.socket.emit(Messages.Res_PropBuy, data);
}

var OnReqPropSaleOut = function (socket, data, mysql)
{
    console.log('Request prop sale out: ' + data.userid);
    var user = UserMgr.GetUserBySocket(socket);
    if(user)
    {
        mysql.PropsSaleOut(user, data, OnResPropSaleOut);
    }
}

var OnResPropSaleOut = function (user, data)
{
    user.socket.emit(Messages.Res_PropSaleOut, data);
}

var OnReqFoodAll = function (socket, data, mysql)
{
    var user = UserMgr.GetUserBySocket(socket);
    if(user)
    {
        mysql.GetUserFoods(user, data, OnResFoodAll);
    }
}

var OnResFoodAll = function (user, data)
{
    user.socket.emit(Messages.Res_FoodAll, data);
}

var OnReqFoodYieldAll = function (socket, data, mysql)
{
    console.log('Request food yield all: ' + data.userid);
    var user = UserMgr.GetUserBySocket(socket);
    if(user)
    {
        mysql.GetUserFoodYieldAll(user, data, OnResFoodYieldAll);
    }
}

var OnResFoodYieldAll = function (user, data)
{
    user.socket.emit(Messages.Res_FoodYieldAll, data);
}

var OnReqFoodYielding = function (socket, data, mysql)
{
    console.log('Request food yielding: userid = ' + data.userid + ' foodid = ' + data.foodids);
    var user = UserMgr.GetUserBySocket(socket);
    if(user)
    {
        mysql.SetUserFoodYielding(user, data, OnResFoodYielding);

        mysql.GetUserTaskFinishing(GetUserTaskFinishingCallback, mysql, user);
    }
}

var GetUserTaskFinishingCallback = function(mysql, user, result)
{
    if(user && result && result.length > 0)
    {
        user.socket.emit(Messages.Put_TaskFin, result);

        mysql.UpdateUserTaskFinishing(user.userid)
    }
}

var OnResFoodYielding = function (user, data)
{
    if(data.length > 0)
    {
        user.socket.emit(Messages.Res_FoodYielding, data[0]);
    }
}

var OnReqFriendAll = function (socket, data, mysql)
{
    console.log('Request friend: ' + data.userid);
    var user = UserMgr.GetUserBySocket(socket);
    if(user)
    {
        //mysql.GetUserFriends(user, data, OnResFriendAll);
		mysql.GetUserLeagues(user, data, OnResFriendAll);
    }
}

var OnResFriendAll = function (user, data)
{
    console.log('Responce friend data!');
    user.socket.emit(Messages.Res_FriendAll, data);
}

var OnReqFriendAdd = function (socket, data, mysql)
{
    console.log('Request add friend: ' + data.userid);
    var user = UserMgr.GetUserBySocket(socket);
    if(user)
    {
        mysql.AddUserFriends(user, data, OnResFriendAdd);

        mysql.TaskAddFriend(data.userid);

        mysql.GetUserTaskFinishing(GetUserTaskFinishingCallback, mysql, user);
    }
}

var OnResFriendAdd = function (user, data)
{
    user.socket.emit(Messages.Res_FriendAdd, {userid: user.userid,  message: '添加成功'});
}

var OnReqFriendSrchAdd = function (socket, data, mysql)
{
    console.log('Request search & add friend: ' + data.userid);
    var user = UserMgr.GetUserBySocket(socket);
    if(user)
    {
        mysql.ScrhAddUserFriends(user, data, OnResFriendSchrAdd);

        mysql.TaskAddFriend(data.userid);

        mysql.GetUserTaskFinishing(GetUserTaskFinishingCallback, mysql, user);
    }
}

var OnResFriendSchrAdd = function (user, data)
{
    user.socket.emit(Messages.Res_FriendSrchAdd, {userid: user.userid,  message: '添加成功'});
}

var OnReqFriendDel = function (socket, data, mysql)
{
    console.log('Request delete friend: ' + data.userid);
    var user = UserMgr.GetUserBySocket(socket);
    if(user)
    {
        mysql.DelUserFriends(user, data, OnResFriendDel);
    }
}

var OnResFriendDel = function (user, data)
{
    user.socket.emit(Messages.Res_FriendDel, {userid: user.userid,  message: '删除成功'});
}

var OnReqVisitFriend = function (socket, data, mysql)
{
    console.log('Visit friend: ' + data.frienduserid);
    var user = UserMgr.GetUserBySocket(socket);
    if(user)
    {
        user.visitfriend = true;
        user.visitfrienduserid = data.frienduserid;

        mysql.VisitFriend(data.frienduserid, 1);

        mysql.GetVisitEnergy(data.userid);

        mysql.TaskVisitFriend(data.userid);

        mysql.GetUserTaskFinishing(GetUserTaskFinishingCallback, mysql, user);

        user.socket.emit(Messages.Res_VisitFriend, {userid: data.userid, frienduserid: data.frienduserid});
    }
}

var OnReqVisitBack = function (socket, data, mysql)
{
    console.log('Visit friend: ' + data.frienduserid);
    var user = UserMgr.GetUserBySocket(socket);
    if(user)
    {
        user.visitfriend = false;

        mysql.VisitFriend(data.frienduserid, 0);

        user.socket.emit(Messages.Res_VisitBack, {userid: data.userid, frienduserid: data.frienduserid});

        mysql.GetEnergy(VisitEnergyRecoverCallback, user);
    }
}

var VisitEnergyRecoverCallback = function(user, result)
{
    if(user && result && result.length > 0)
    {
        user.socket.emit(Messages.Put_UserEnergy, result);
    }
}

var OnReqVisitRandom = function (socket, data, mysql)
{
    console.log('Request random visit friend: ' + data.userid);
    var user = UserMgr.GetUserBySocket(socket);
    if(user)
    {
        mysql.VisitRandom(user, data, OnResVisitRandom);
    }
}

var OnResVisitRandom = function (user, data)
{
    user.socket.emit(Messages.Res_VisitRandom, data);
}

var OnReqMessageAll = function (socket, data, mysql)
{
    console.log('Request user messages: ' + data.userid);
    var user = UserMgr.GetUserBySocket(socket);
    if(user)
    {
        //mysql.GetUserMessages(user, data, OnResMessageAll);
		mysql.GetUserMailbox(user, data, OnResMessageAll);
    }
}

var OnResMessageAll = function (user, data)
{
    user.socket.emit(Messages.Res_MessageAll, data);
}

var OnReqMessageDel = function (socket, data, mysql)
{
    console.log('Request delete message: ' + data.userid);
    var user = UserMgr.GetUserBySocket(socket);
    if(user)
    {
        mysql.DelUserMessages(user, data, OnResMessageDel);
    }
}

var OnResMessageDel = function (user, data)
{
    user.socket.emit(Messages.Res_MessageDel, {userid: user.userid});
}

var OnReqMessageSend = function (socket, data, mysql)
{
    console.log('Request send message: ' + data.userid);
    var user = UserMgr.GetUserBySocket(socket);
    if(user)
    {
        mysql.SendUserMessages(user, data, OnResMessageSend);
    }
}

var OnResMessageSend = function (user, data)
{
    user.socket.emit(Messages.Res_MessageSend, {userid: user.userid});
}

var OnReqChargeUp = function (socket, data, mysql)
{
     	console.log('pan into server chargeup');
}

function SocketServer(mysql)
{
    this.app = http.createServer();
    this.io = socketio.listen(this.app);
    this.io.sockets.on('connection', function (socket) { OnConnected(socket, mysql); } );
}

SocketServer.prototype.Start = function (port)
{
    this.app.listen(port);
}

SocketServer.prototype.Send2User = function(userid, name, data)
{
    UserMgr.Send2User(userid, name, data);
}

SocketServer.prototype.SendAll = function(name, data)
{
    UserMgr.SendAll(name, data);
}

SocketServer.prototype.UserCount = function ()
{
    return UserMgr.UserCount();
}

SocketServer.prototype.GetUserAt = function (index)
{
    return UserMgr.GetUserAt(index);
}
//装修列表
var OnReqFacilityAll = function (socket, data, mysql)
{
    console.log('Request Facility: ' + data.userid);
    var user = UserMgr.GetUserBySocket(socket);
    if(user)
    {
        mysql.GetUserFacility(user, data, OnResFacilityAll);
    }
}
var OnResFacilityAll = function (user, data)
{
    console.log('Responce Facility data!');
    user.socket.emit(Messages.Res_FacilityAll, data);
}
//邮箱列表
var OnReqMailAll = function (socket, data, mysql)
{
    console.log('Request Mail: ' + data.userid);
    var user = UserMgr.GetUserBySocket(socket);
    if(user)
    {
        mysql.GetUserMailbox(user, data, OnResMailboxAll);
    }
}
var OnResMailboxAll = function (user, data)
{
    console.log('Responce Mail data!');
    user.socket.emit(Messages.Res_MailAll, data);
}
//盟友列表
var OnReqLeagueAll = function (socket, data, mysql)
{
    console.log('Request friend: ' + data.userid);
    var user = UserMgr.GetUserBySocket(socket);
    if(user)
    {
        mysql.GetUserLeagues(user, data, OnResLeagueAll);
    }
}

var OnResLeagueAll = function (user, data)
{
    console.log('Responce league data!');
    user.socket.emit(Messages.Res_LeagueAll, data);
}

var OnReqItemAll = function (socket, data, mysql)
{
    var user = UserMgr.GetUserBySocket(socket);
    if(user)
    {
        mysql.GetCastleItemList(user, data, OnResItemAll);
    }
}

var OnResItemAll = function (user, data)
{
	console.log('Responce item data!');
    user.socket.emit(Messages.Res_ItemAll, data);
}

var OnReqCaltleDevList = function (socket, data, mysql)
{
    var user = UserMgr.GetUserBySocket(socket);
    if(user)
    {
        mysql.GetCastleDevList(user, data, OnResCaltleDevList);
    }
}

var OnResCaltleDevList = function (user, data)
{
	console.log('Responce dev data!');
    user.socket.emit(Messages.Res_CaltleDevList, data);
}

var OnReqCreateCaltleDev = function (socket, data, mysql)
{
    var user = UserMgr.GetUserBySocket(socket);
    if(user)
    {
        mysql.SaveCastleDev(user, data, OnResCreateCaltleDev);
    }
}

var OnResCreateCaltleDev = function (user, data)
{
	console.log('Responce CreateCaltleDev result!');
    user.socket.emit(Messages.Res_CreateCaltleDev, data);
}

var OnReqMoveCaltleDev = function (socket, data, mysql)
{
    var user = UserMgr.GetUserBySocket(socket);
    if(user)
    {
        mysql.MoveCastleDev(user, data, OnResMoveCaltleDev);
    }
}

var OnResMoveCaltleDev = function (user, data)
{
	console.log('Responce MoveCaltleDev result!');
    user.socket.emit(Messages.Res_MovedCaltleDev, data);
}

var OnReqDeletedCaltleDev = function (socket, data, mysql)
{
    var user = UserMgr.GetUserBySocket(socket);
    if(user)
    {
        mysql.DeletedCastleDev(user, data, OnResDeletedCaltleDev);
    }
}

var OnResDeletedCaltleDev = function (user, data)
{
	console.log('Responce DeletedCaltleDev result!');
    user.socket.emit(Messages.Res_DeletedCaltleDev, data);
}

var OnReqGusetXF = function (socket, data, mysql)
{
	console.log('Request GusetXF!');
    var user = UserMgr.GetUserBySocket(socket);
    if(user)
    {
        mysql.GuestXF(user, data, OnResGusetXF);
    }
}

var OnResGusetXF = function (user, data)
{
	console.log('Responce GusetXF result!');
    user.socket.emit(Messages.Res_GusetXF, data);
}


var OnReqTouziStart = function (socket, data, mysql)
{
    console.log('Request start touzi item: ' + data.castleId);
    var user = UserMgr.GetUserBySocket(socket);
    if(user)
    {
        mysql.StartTouziItem(user, data, OnResTouziStart);
    }
}

var OnResTouziStart = function (user, data)
{
	console.log('Responce start touzi item data!');
    user.socket.emit(Messages.Res_TouziStart, {userid: user.userid});
}

//TODO
var OnReqTouziEnd = function(socket, data, mysql){
    console.log('Request end touzi item: ' + data.castleId);
    var user = UserMgr.GetUserBySocket(socket);
    if(user)
    {
        mysql.EndTouziItem(user, data, OnResTouziEnd);
    }
}

var OnResTouziEnd = function (user, data)
{
    console.log('Responce end touzi item data');
    user.socket.emit(Messages.Res_TouziEnd, {userid: user.userid});
}

var OnReqUseWupinOnDev = function(socket, data, mysql){
    console.log("use wupin on dev");
    var user = UserMgr.GetUserBySocket(socket);
    if (user){
        mysql.useWupinOnDev(user, data, OnResUseWupinOnDev);
    }
}
var OnResUseWupinOnDev = function (user, data)
{
    console.log('Responce end use wupin');
    user.socket.emit(Messages.Res_useWupinOnDev, {userid: user.userid});
}

module = module.exports = SocketServer;


