/**
 * Created with JetBrains WebStorm.
 * User: yyh
 * Date: 13-3-2
 * Time: PM4:09
 * To change this template use File | Settings | File Templates.
 */
var actionType = 0;
var timerGuestAction = require('timers');
var timerFoodYield = require('timers');

module = module.exports = GameRunner;

function GameRunner(server, mysql)
{
    this.server = server;
    this.mysql = mysql;
}

GameRunner.prototype.Start = function ()
{
    var runner = this;
    //timerFoodYield.setInterval(function (){runner.QueryFoodYielding()}, 5000); // 5 seconds
    //timerGuestAction.setInterval(function (){runner.QueryGuestAction()}, 3500); // 3.5 seconds
    //timerFoodYield.setInterval(function (){runner.EnergyRecover()}, 180000); // 3 minute
    //timerFoodYield.setInterval(function (){runner.EndingActions()}, 600000); // 10 minute
    //timerGuestAction.setInterval(function (){runner.QueryUpgrade()}, 40000); // 4 seconds
}

GameRunner.prototype.Send2User = function(userid, name, data)
{
    if(this.server)
    {
        this.server.Send2User(userid, name, data);
    }
}

GameRunner.prototype.SendAll = function(name, data)
{
    if(this.server)
    {
        this.server.SendAll(name, data);
    }
}

GameRunner.prototype.QueryFoodYielding = function()
{
    if(this.mysql)
    {
        this.mysql.GetYieldingUsers(GetYieldingUsersCallback, this);
    }
}

var GetYieldingUsersCallback = function(gr, yieldingusers)
{
    if(gr && yieldingusers)
    {
        for(var i = 0; i < yieldingusers.length; i++)
        {
            var userid = yieldingusers[i]['userid'];
            gr.server.Send2User(userid, Messages.Put_FoodYieldAll, {userid: userid});
        }
        gr.mysql.UpdateUserYieldingCounter();
    }
}

GameRunner.prototype.QueryGuestAction = function()
{
    if(this.mysql && this.server)
    {
        for(var i = 0; i < this.server.UserCount(); i++)
        {
            var user = this.server.GetUserAt(i);
            if(user)
            {
                if(user.lasttimegstenter)
                {
                    this.mysql.GetEnterGeust(GetEnterGuestCallback, user);

                    if(user.visitfriend)
                    {
                        this.mysql.GetFriendEnterGeust(GetEnterGuestCallback, user);
                    }
                }
                else
                {
                    this.mysql.GetCurrentTimeStamp(GetEnterTimeCallback, user);
                }

                if(user.lasttimegstconsume)
                {
                    this.mysql.GetConsumingGeust(GetConsumingGuestCallback, user);

                    if(user.visitfriend)
                    {
                        this.mysql.GetFriendConsumingGeust(GetConsumingGuestCallback, user);
                    }
                }
                else
                {
                    this.mysql.GetCurrentTimeStamp(GetConsumingTimeCallback, user);
                }

                if(user.lasttimegstexit)
                {
                    this.mysql.GetExitGeust(GetExitGuestCallback, user);

                    if(user.visitfriend)
                    {
                        this.mysql.GetFriendExitGeust(GetExitGuestCallback, user);
                    }
                }
                else
                {
                    this.mysql.GetCurrentTimeStamp(GetExitTimeCallback, user);
                }
            }

        }
    }
}

var GetEnterGuestCallback = function(user, result)
{
    if(user && result && result.length > 0)
    {
        user.socket.emit(Messages.Put_GuestNew, result);

        user.lasttimegstenter = result[result.length - 1]['calctime'];

        console.log(user.lasttimegstenter);
    }
}

var GetEnterTimeCallback = function(user, result)
{
    if(user && result && result.length > 0)
    {
        user.lasttimegstenter = result[0]['curtime'];

        console.log(user.lasttimegstenter);
    }
}

var GetConsumingGuestCallback = function(user, result)
{
    if(user && result && result.length > 0)
    {
        user.socket.emit(Messages.Put_GuestBuy, result);

        user.lasttimegstconsume = result[result.length - 1]['calctime'];

        console.log(user.lasttimegstconsume);
    }
}

var GetConsumingTimeCallback = function(user, result)
{
    if(user && result && result.length > 0)
    {
        user.lasttimegstconsume = result[0]['curtime'];

        console.log(user.lasttimegstconsume);
    }
}

var GetExitGuestCallback = function(user, result)
{
    if(user && result && result.length > 0)
    {
        user.socket.emit(Messages.Put_GuestQuit, result);

        user.lasttimegstexit = result[result.length - 1]['calctime'];

        console.log(user.lasttimegstexit);
    }
}

var GetExitTimeCallback = function(user, result)
{
    if(user && result && result.length > 0)
    {
        user.lasttimegstexit = result[0]['curtime'];

        console.log(user.lasttimegstexit);
    }
}

GameRunner.prototype.EnergyRecover = function()
{
    if(this.mysql && this.server)
    {
        for(var i = 0; i < this.server.UserCount(); i++)
        {
            var user = this.server.GetUserAt(i);
            if(user)
            {
                this.mysql.GetEnergy(EnergyRecoverCallback, user);
            }
        }
    }
}

var EnergyRecoverCallback = function(user, result)
{
    if(user && result && result.length > 0)
    {
        user.socket.emit(Messages.Put_UserEnergy, result);
    }
}

GameRunner.prototype.EndingActions = function()
{
    if(this.mysql && this.server)
    {
        for(var i = 0; i < this.server.UserCount(); i++)
        {
            var user = this.server.GetUserAt(i);
            if(user)
            {
                this.mysql.GetUserPropEnding(GetUserPropEndingCallback, this.mysql, user);

                this.mysql.GetUserHireEnding(GetUserHireEndingCallback, this.mysql, user);

                this.mysql.GetUserInvitation(GetUserInvitationCallback, this.mysql, user);

                this.mysql.GetUserNewMessage(GetUserNewMessageCallback, this.mysql, user);
            }
        }
    }
}

var GetUserPropEndingCallback = function(mysql, user, result)
{
    if(user && result && result.length > 0)
    {
        user.socket.emit(Messages.Put_PropEnding, result);

        mysql.UpdateUserPropEnding(user.userid)
    }
}

var GetUserHireEndingCallback = function(mysql, user, result)
{
    if(user && result && result.length > 0)
    {
        user.socket.emit(Messages.Put_WorkerQuit, result);

        mysql.UpdateUserHireEnding(user.userid)
    }
}

var GetUserInvitationCallback = function(mysql, user, result)
{
    if(user && result && result.length > 0)
    {
        user.socket.emit(Messages.Put_Invitation, result);

        mysql.UpdateUserInvitation(user.userid)
    }
}

var GetUserNewMessageCallback = function(mysql, user, result)
{
    if(user && result && result.length > 0)
    {
        user.socket.emit(Messages.Put_NewMessage, result);

        mysql.UpdateUserNewMessage(user.userid)
    }
}

GameRunner.prototype.QueryUpgrade = function()
{
    if(this.mysql && this.server)
    {
        for(var i = 0; i < this.server.UserCount(); i++)
        {
            var user = this.server.GetUserAt(i);
            if(user)
            {
                this.mysql.GetUserMagicChanging(GetUserMagicChangingCallback, this.mysql, user);

                this.mysql.GetUserUpgrade(GetUserUpgradeCallback, this.mysql, user);

                this.mysql.GetUserMapUpgrade(GetUserMapUpgradeCallback, this.mysql, user);

                this.mysql.GetUserFoodUnlock(GetUserFoodUnlockCallback, this.mysql, user);

                this.mysql.GetUserTaskFinishing(GetUserTaskFinishingCallback, this.mysql, user);
            }
        }
    }
}

var GetUserMagicChangingCallback = function(mysql, user, result)
{
    if(user && result && result.length > 0)
    {
        user.socket.emit(Messages.Put_UserMagic, result);

        mysql.UpdateUserMagicChanging(user.userid)
    }
}

var GetUserUpgradeCallback = function(mysql, user, result)
{
    if(user && result && result.length > 0)
    {
        user.socket.emit(Messages.Put_UserLevel, result);

        mysql.UpdateUserUpgrade(user.userid)
    }
}

var GetUserMapUpgradeCallback = function(mysql, user, result)
{
    if(user && result && result.length > 0)
    {
        user.socket.emit(Messages.Put_UserMapUpgrade, result);

        mysql.UpdateUserMapUpgrade(user.userid)
    }
}

var GetUserFoodUnlockCallback = function(mysql, user, result)
{
    if(user && result && result.length > 0)
    {
        user.socket.emit(Messages.Put_FoodUnlock, result);

        mysql.UpdateUserFoodUnlock(user.userid)
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
