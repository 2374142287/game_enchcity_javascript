/**
 * Created with JetBrains WebStorm.
 * User: yyh
 * Date: 13-2-3
 * Time: 下午12:21
 * To change this template use File | Settings | File Templates.
 */

var mysql = require('mysql');

var dbConnection = null;

var Database = function(url, port, user, password, database)
{
    this.db_options =
    {
        host: url,
        port: port,
        user: user,
        password: password,
        database: database
    };
};

Database.prototype.Open = function()
{
    try
    {
        dbConnection = mysql.createConnection(this.db_options);
    }
    catch (err)
    {
        console.log(err);
    }
};

Database.prototype.Close = function()
{
    if (dbConnection)
    {
        dbConnection.end();
    }
};

Database.prototype.DoQuery = function(cmd, cb, param)
{
    try
    {
        if(dbConnection)
        {
            dbConnection.query(cmd, function selectCb(error, results, fields)
            {
                if (error)
                {
                    console.log('错误: ' + error.message);
                    console.log('SQL: ' + cmd);
                }
                if(cb)
                {
                    cb(param, results);
                }
            });
        }
    }
    catch (err)
    {
        console.log(err);
    }
};

Database.prototype.DoQuery2Param = function(cmd, cb, param1, param2)
{
    try
    {
        if(dbConnection)
        {
            dbConnection.query(cmd, function selectCb(error, results, fields)
            {
                if (error)
                {
                    console.log('错误: ' + error.message);
                    console.log('SQL: ' + cmd);
                }
                if(cb)
                {
                    cb(param1, param2, results);
                }
            });
        }
    }
    catch (err)
    {
        console.log(err);
    }
};

Database.prototype.CallProcQuery = function(cmd, cb, param)
{
    try
    {
        if(dbConnection)
        {
            dbConnection.query(cmd, function selectCb(error, results, fields)
            {
                if (error)
                {
                    console.log('错误: ' + error.message);
                    console.log('SQL: ' + cmd);
                }
                if(cb)
                {
                    if (results.length > 1)
                    {
                        cb(param, results[0]);
                    }
                    else
                    {
                        console.log('错误: 存储过程反回的结果不正常');
                        console.log(results);
                    }
                }
            });
        }
    }
    catch (err)
    {
        console.log(err);
    }
};

Database.prototype.DoWrite = function(cmd)
{
    try
    {
        if(dbConnection)
        {
            dbConnection.query(cmd, function selectCb(error, results, fields)
            {
                if (error)
                {
                    console.log('错误: ' + error.message);
                    console.log('SQL: ' + cmd);
                }
            });
        }
    }
    catch (err)
    {
        console.log(err);
    }
};

Database.prototype.UpdateUserStatus = function (userid, status)
{
    if(dbConnection)
    {
        var cmd = 'update tb_users set status = ' + status + ' where uid = ' + userid;

        this.DoWrite(cmd);
    }
};

Database.prototype.UserLogin = function(param, data, cb)
{
    try
    {
        if(dbConnection)
        {
            var cmd = "select userid, keycode as password from tb_login where account = '" + data.account + "'";

            dbConnection.query(cmd, function selectCb(error, results, fields)
            {
                if (error)
                {
                    console.log('错误: ' + error.message);
                    console.log('SQL: ' + cmd);
                }
                console.log(results.length);
                if(results && results.length > 0)
                {
                    if(results[0].password == data.password)
                    {
                        cb(param, {userid: results[0].userid, result: 1, message: '登录成功'})
                    }
                    else
                    {
                        cb(param, {userid: -1, result: 0, message: '登录失败，密码不正确！'})
                    }
                }
                else
                {
                    cb(param, {userid: -1, result: 0, message: '登录失败，该帐号不存在！'})
                }
            });
        }
        else
        {
            console.log('Error: dbConnection is null');
        }
    }
    catch(err)
    {
        console.log(err);
        cb(param, {userid: -1, result: 0, message: '登录失败，登录发出现错误！'})
    }
};

Database.prototype.CreateUser = function (param, data, cb) {
    if (dbConnection) {
        var cmd = "CALL Proc_CreateUser('" + data.account + "','"
                                           + data.password + "','"
                                           + data.nickname + "','"
                                           + data.rolecode + "')";

        this.CallProcQuery(cmd, cb, param);
    }
    else {
        console.log('Parameter error at CreateUser: ');
        console.log(data);
    }
};

Database.prototype.GetUserInfo = function(user, data, cb)
{
    if(dbConnection && !isNaN(data.userid))
    {
        var cmd = null;
        if (user.imagesize == 'phone') // small photo
        {
            cmd = 'select castleID, username, userNickname, sex, birthdate, horoscope, mobile,  money \
                        from tb_users as a \
                        where a.castleID = ' + data.userid;
        }
        else    // large photo
        {
            cmd = 'select castleID, username, userNickname, sex, birthdate, horoscope, mobile,  money \
                        from tb_users as a \
                        where a.uid = ' + data.userid;
        }

        this.DoQuery(cmd, cb, user);
    }
    else
    {
        console.log('Parameter error at GetUserInfo: ');
        console.log(data);
    }
};

Database.prototype.GetUserGuests = function(user, data, cb)
{
    if(dbConnection && !isNaN(data.userid))
    {
        var cmd = 'select userid, guestid, typecode \
                     from userguest \
                    where isentered = 1 \
                      and isexited != 1 \
                      and userid = ' + data.userid ;

        this.DoQuery(cmd, cb, user);
    }
    else
    {
        console.log('Parameter error at GetUserGuests: ');
        console.log(data);
    }
};

Database.prototype.GetUserGuestTips = function(user, data, cb)
{
    if(dbConnection && !isNaN(data.userid) && !isNaN(data.guestid))
    {
        var cmd = 'CALL Proc_GetGuestTips(' + data.userid + ', ' + data.guestid + ')';

        this.CallProcQuery(cmd, cb, user);
    }
    else
    {
        console.log('Parameter error at GetUserGuestTips: ');
        console.log(data);
    }
};

Database.prototype.GetUserFoods = function (user, data, cb) {
    if (dbConnection && !isNaN(data.userid)) {
        var cmd = null;
        if (user.imagesize == 'phone') // small photo
        {
            cmd = 'select a.userid, a.foodid, b.name \
                        , (case when b.unlocklevel <= d.level then 0 else 1 end) as islocked \
                        , b.typecode, a.star \
                        , b.sphoto as photo \
                        , b.sphotox as photox, b.sphotoy as photoy \
                        , b.sphotow as photow, b.sphotoh as photoh \
                        , b.sbuyphoto as buyphoto \
                        , b.sbuyphotox as buyphotox, b.sbuyphotoy as buyphotoy \
                        , b.sbuyphotow as buyphotow, b.sbuyphotoh as buyphotoh \
                        , a.quantity, c.yieldingtime, c.yield, c.costgold, price \
                     from userfoods as a \
                     left join foods as b on a.foodid = b.foodid \
                     left join foodprice as c on a.foodid = c.foodid and a.star = c.star \
                     left join users d on a.userid = d.userid \
                    where a.status = -1 and a.userid = ' + data.userid + ' order by b.unlocklevel';
        }
        else    // large photo
        {
            cmd = 'select a.userid, a.foodid, b.name \
                        , (case when b.unlocklevel <= d.level then 0 else 1 end) as islocked \
                        , b.typecode, a.star \
                        , b.lphoto as photo \
                        , b.lphotox as photox, b.lphotoy as photoy \
                        , b.lphotow as photow, b.lphotoh as photoh \
                        , b.lbuyphoto as buyphoto \
                        , b.lbuyphotox as buyphotox, b.lbuyphotoy as buyphotoy \
                        , b.lbuyphotow as buyphotow, b.lbuyphotoh as buyphotoh \
                        , a.quantity, c.yieldingtime, c.yield, c.costgold, price \
                     from userfoods as a \
                     left join foods as b on a.foodid = b.foodid \
                     left join foodprice as c on a.foodid = c.foodid and a.star = c.star \
                     left join users d on a.userid = d.userid \
                    where a.status = -1 and a.userid = ' + data.userid + ' order by b.unlocklevel';
        }

        this.DoQuery(cmd, cb, user);
    }
    else {
        console.log('Parameter error at GetUserFoods: ');
        console.log(data);
    }
};

Database.prototype.GetUserFoodYieldAll = function(user, data, cb)
{
    if(dbConnection && !isNaN(data.userid))
    {
        var cmd = null;
        if (user.imagesize == 'phone') // small photo
        {
            cmd = 'select a.userid, a.userfoodid as yieldid, a.foodid \
                        , b.sphoto as photo \
                        , b.sphotox as photox, b.sphotoy as photoy \
                        , b.sphotow as photow, b.sphotoh as photoh \
                        , a.status, c.yieldingtime \
                        , a.yieldendtime - CURRENT_TIMESTAMP as remainedtime \
                     from userfoods as a \
                     left join foods as b on a.foodid = b.foodid \
                     left join foodprice as c on a.foodid = c.foodid and a.star = c.star \
                    where a.status != -1 and a.userid = ' + data.userid ;
        }
        else    // large photo
        {
            cmd = 'select a.userid, a.userfoodid as yieldid, a.foodid \
                        , b.lphoto as photo \
                        , b.lphotox as photox, b.lphotoy as photoy \
                        , b.lphotow as photow, b.lphotoh as photoh \
                        , a.status, c.yieldingtime \
                        , a.yieldendtime - CURRENT_TIMESTAMP as remainedtime \
                     from userfoods as a \
                     left join foods as b on a.foodid = b.foodid \
                     left join foodprice as c on a.foodid = c.foodid and a.star = c.star \
                    where a.status != -1 and a.userid = ' + data.userid ;
        }

        this.DoQuery(cmd, cb, user);
    }
    else
    {
        console.log('Parameter error at GetUserFoodYieldAll: ');
        console.log(data);
    }
};

Database.prototype.SetUserFoodYielding = function(user, data, cb)
{
    if(dbConnection && !isNaN(data.userid))
    {
        for(var i = 0; i < data.foodids.length; i++)
        {
            var cmd = 'CALL Proc_SetFoodYielding(' + data.userid + ', ' + data.foodids[i] + ')';

            //console.log(cmd);

            if(i < data.foodids.length - 1)
            {
                this.DoWrite(cmd);
            }
            else
            {
                this.CallProcQuery(cmd, cb, user); //   只有最后一个调制发送回复
            }
        }
    }
    else
    {
        console.log('Parameter error at SetUserFoodYielding: ');
        console.log(data);
    }
};

Database.prototype.GetCurrentTimeStamp = function(cb, user)
{
    if(dbConnection)
    {
        var cmd = "select date_format(CURRENT_TIMESTAMP,'%Y-%m-%d %h:%i:%s') as curtime";

        this.DoQuery(cmd, cb, user);
    }
};

Database.prototype.GetEnterGeust = function(cb, user)
{
    if(dbConnection && user)
    {
        var cmd = "select a.userid, a.guestid, b.typecode, date_format(a.calctime,'%Y-%m-%d %h:%i:%s') as calctime from userguestenter as a left join \
                   userguest as b on a.userid = b.userid and a.guestid = b.guestid \
                   where a.userid = " + user.userid + " and date_format(a.calctime,'%Y-%m-%d %h:%i:%s') > '" + user.lasttimegstenter + "' " +
                  "order by a.calctime";

        this.DoQuery(cmd, cb, user);
    }
};

Database.prototype.GetConsumingGeust = function(cb, user)
{
    if(dbConnection)
    {
        var cmd = "select b.userid, b.guestid, b.drinkid, b.desertid \
                        , (CASE WHEN b.drinkid > 0 or b.desertid > 0 THEN b.hastip ELSE 0 END) as hastip\
                        , c.gold, date_format(a.calctime,'%Y-%m-%d %h:%i:%s') as calctime \
                     from userguestconsume as a \
                     left join userguest as b on a.userid = b.userid and a.guestid = b.guestid \
                     left join users as c on a.userid = c.userid \
                    where a.userid = " + user.userid + " and date_format(a.calctime,'%Y-%m-%d %h:%i:%s') > '" + user.lasttimegstconsume + "' " +
                   "order by a.calctime";

        this.DoQuery(cmd, cb, user);
    }
};

Database.prototype.GetExitGeust = function(cb, user)
{
    if(dbConnection)
    {
        var cmd = "select a.userid, a.guestid, date_format(a.calctime,'%Y-%m-%d %h:%i:%s') as calctime from userguestexit as a left join \
                   userguest as b on a.userid = b.userid and a.guestid = b.guestid \
                   where a.userid = " + user.userid + " and date_format(a.calctime,'%Y-%m-%d %h:%i:%s') > '" + user.lasttimegstexit + "' " +
                  "order by a.calctime";

        this.DoQuery(cmd, cb, user);
    }
};

Database.prototype.GetFriendEnterGeust = function(cb, user)
{
    if(dbConnection && user)
    {
        var cmd = "select a.userid, a.guestid, b.typecode, date_format(a.calctime,'%Y-%m-%d %h:%i:%s') as calctime from userguestenter as a left join \
                   userguest as b on a.userid = b.userid and a.guestid = b.guestid \
                   where a.userid = " + user.visitfrienduserid + " and date_format(a.calctime,'%Y-%m-%d %h:%i:%s') > '" + user.lasttimegstenter + "' " +
                  "order by a.calctime";

        this.DoQuery(cmd, cb, user);
    }
};

Database.prototype.GetFriendConsumingGeust = function(cb, user)
{
    if(dbConnection)
    {
        var cmd = "select b.userid, b.guestid, b.drinkid, b.desertid, b.hastip, c.gold, date_format(a.calctime,'%Y-%m-%d %h:%i:%s') as calctime \
                     from userguestconsume as a \
                     left join userguest as b on a.userid = b.userid and a.guestid = b.guestid \
                     left join users as c on a.userid = c.userid \
                    where a.userid = " + user.visitfrienduserid + " and date_format(a.calctime,'%Y-%m-%d %h:%i:%s') > '" + user.lasttimegstconsume + "' " +
                   "order by a.calctime";

        this.DoQuery(cmd, cb, user);
    }
};

Database.prototype.GetFriendExitGeust = function(cb, user)
{
    if(dbConnection)
    {
        var cmd = "select a.userid, a.guestid, date_format(a.calctime,'%Y-%m-%d %h:%i:%s') as calctime from userguestexit as a left join \
                   userguest as b on a.userid = b.userid and a.guestid = b.guestid \
                   where a.userid = " + user.visitfrienduserid + " and date_format(a.calctime,'%Y-%m-%d %h:%i:%s') > '" + user.lasttimegstexit + "' " +
                  "order by a.calctime";

        this.DoQuery(cmd, cb, user);
    }
};

Database.prototype.GetYieldingUsers = function(cb, gr)
{
    if(dbConnection)
    {
        var cmd = "select userid from users where yieldcounter > 0";

        this.DoQuery(cmd, cb, gr);
    }
};

Database.prototype.UpdateUserYieldingCounter = function()
{
    if(dbConnection)
    {
        var cmd = "update users set yieldcounter = yieldcounter - 1 where yieldcounter > 0";

        this.DoWrite(cmd);
    }
};

Database.prototype.GetUserFriends = function(user, data, cb)
{
    if(dbConnection && !isNaN(data.userid))
    {
        var cmd = null;
        if (user.imagesize == 'phone') // small photo
        {
            cmd = 'select a.userid, b.userid as frienduserid, c.rolename, b.nickname, b.sex, b.birthdate \
                    , b.horoscope, b.mobile \
                    , c.sfrdphoto as photo \
                    , c.sfrdphotox as photox, c.sfrdphotoy as photoy \
                    , c.sfrdphotow as photow, c.sfrdphotoh as photoh \
                    , a.comment, b.level, b.magic \
                    from userfriends as a \
                    left join users as b on a.frienduserid = b.userid \
                    left join roletype as c on b.rolecode = c.rolecode \
                    where a.userid = ' + data.userid + ' order by b.level ' ;
        }
        else    // large photo
        {
            cmd = 'select a.userid, b.userid as frienduserid, c.rolename, b.nickname, b.sex, b.birthdate \
                    , b.horoscope, b.mobile \
                    , c.lfrdphoto as photo \
                    , c.lfrdphotox as photox, c.lfrdphotoy as photoy \
                    , c.lfrdphotow as photow, c.lfrdphotoh as photoh \
                    , a.comment, b.level, b.magic \
                    from userfriends as a \
                    left join users as b on a.frienduserid = b.userid \
                    left join roletype as c on b.rolecode = c.rolecode \
                    where a.userid = ' + data.userid + ' order by b.level ';
        }

        this.DoQuery(cmd, cb, user);
    }
    else
    {
        console.log('Parameter error at GetUserFriends: ');
        console.log(data);
    }
};

Database.prototype.VisitFriend = function (userid, beingvisited)
{
    if(dbConnection)
    {
        var cmd = 'update users set beingvisited = ' + beingvisited + ' where userid = ' + userid;

        this.DoWrite(cmd);
    }
};

Database.prototype.GetVisitEnergy = function (userid)
{
    if(dbConnection)
    {
        var cmd = 'update users set energy = energy + 1, visitenergy = visitenergy - 1  where visitenergy > 0 and userid = ' + userid;

        this.DoWrite(cmd);
    }
};

Database.prototype.VisitRandom = function(user, data, cb)
{
    if(dbConnection && !isNaN(data.userid))
    {
        var cmd = 'select ' + data.userid + ' as userid, userid as frienduserid from users where userid != ' + data.userid + ' order by rand() limit 1';

        this.DoQuery(cmd, cb, user);
    }
    else
    {
        console.log('Parameter error at VisitRandom: ');
        console.log(data);
    }
};

Database.prototype.GetUserFurnitures = function(user, data, cb)
{
    if(dbConnection && !isNaN(data.userid))
    {
        var cmd = null;
        if (user.imagesize == 'phone') // small photo
        {
            cmd = 'select ' + data.userid + ' as userid, b.furnitureid, b.name, b.typecode, \
                        b.sphoto as photo, b.sphotox as photox, b.sphotoy as photoy, b.sphotow as photow, b.sphotoh as photoh, \
                        a.posx, a.posy \
                        from furnitureslayout as a \
                        left join furnitures as b on a.furnitureid = b.furnitureid \
                        where layoutid = Func_GetUserLayoutID(' + data.userid + ')';
        }
        else    // large photo
        {
            cmd = 'select ' + data.userid + ' as userid, b.furnitureid, b.name, b.typecode, \
                        b.lphoto as photo, b.lphotox as photox, b.lphotoy as photoy, b.lphotow as photow, b.lphotoh as photoh, \
                        a.posx, a.posy \
                        from furnitureslayout as a \
                        left join furnitures as b on a.furnitureid = b.furnitureid \
                        where layoutid = Func_GetUserLayoutID(' + data.userid + ')';
        }

        this.DoQuery(cmd, cb, user);
    }
    else
    {
        console.log('Parameter error at GetUserFurnitures: ');
        console.log(data);
    }
};

Database.prototype.GetUserFurnitureComp = function(user, data, cb)
{
    if(dbConnection && !isNaN(data.userid))
    {
        var cmd = 'select ' + data.userid + ' as userid,  a.componentid, a.furnitureid, c.dirpath as dirphoto, \
                        c.sizex, c.sizey, b.posx + a.relativex as posx, b.posy + a.relativey as posy, a.isblock \
                        from furniturecomponent as a \
                        left join furnitureslayout as b on a.furnitureid = b.furnitureid \
                        left join furnituredata as c on a.componentid = c.componentid and b.direction = c.direction \
                        where layoutid = Func_GetUserLayoutID(' + data.userid + ')';

        this.DoQuery(cmd, cb, user);
    }
    else
    {
        console.log('Parameter error at GetUserFurnitureComp: ');
        console.log(data);
    }
};

Database.prototype.GetUserProp = function(user, data, cb)
{
    if(dbConnection && !isNaN(data.userid))
    {
        var cmd = null;
        if (user.imagesize == 'phone') // small photo
        {
            cmd = 'select a.userid, a.propid, b.name, b.typecode, b.comment, count(*) as count  \
                        , sphoto as photo, sphotox as photox, sphotoy as photoy \
                        , sphotow as photow, sphotoh as photoh \
                     from userprops as a \
                     left join props as b on a.propid = b.propid \
                    where a.isused = 0 and a.userid = ' + data.userid +
                  ' group by a.propid';
        }
        else    // large photo
        {
            cmd = 'select a.userid, a.propid, b.name, b.typecode, b.comment, count(*) as count  \
                        , lphoto as photo, lphotox as photox, lphotoy as photoy \
                        , lphotow as photow, lphotoh as photoh \
                     from userprops as a \
                     left join props as b on a.propid = b.propid \
                    where a.isused = 0 and a.userid = ' + data.userid +
                ' group by a.propid';
        }

        this.DoQuery(cmd, cb, user);
    }
    else
    {
        console.log('Parameter error at GetUserProp: ');
        console.log(data);
    }
};

Database.prototype.GetTiTiKiKi = function(user, data, cb)
{
    if(dbConnection && !isNaN(data.userid))
    {
        var cmd = null;
        if (user.imagesize == 'phone') // small photo
        {
            cmd = "select a.userid, a.propid, b.name, b.typecode, b.comment \
                     from userprops as a \
                     left join props as b on a.propid = b.propid \
                    where a.isused = 1 and (b.typecode = 'E1' or b.typecode = 'E3') and a.userid = " + data.userid;
        }
        else    // large photo
        {
            cmd = "select a.userid, a.propid, b.name, b.typecode, b.comment \
                     from userprops as a \
                     left join props as b on a.propid = b.propid \
                    where a.isused = 1 and (b.typecode = 'E1' or b.typecode = 'E3') and a.userid = " + data.userid;
        }

        this.DoQuery(cmd, cb, user);
    }
    else
    {
        console.log('Parameter error at GetTiTiKiKi: ');
        console.log(data);
    }
};

Database.prototype.GetPropsOnSale = function(user, data, cb)
{
    if(dbConnection)
    {
        var cmd = null;
        if (user.imagesize == 'phone') // small photo
        {
            cmd = 'select propid, name, typecode, comment, xingbei  \
                        , sphoto as photo, sphotox as photox, sphotoy as photoy \
                        , sphotow as photow, sphotoh as photoh \
                     from props where canbuy = 1;';
        }
        else    // large photo
        {
            cmd = 'select propid, name, typecode, comment, xingbei  \
                        , lhoto as photo, lphotox as photox, lphotoy as photoy \
                        , lphotow as photow, lphotoh as photoh \
                     from props where canbuy = 1;';
        }

        this.DoQuery(cmd, cb, user);
    }
};

Database.prototype.SetPropInUse = function(user, data, cb)
{
    if(dbConnection && !isNaN(data.userid) && !isNaN(data.propid)  && !isNaN(data.id))
    {
        var cmd = 'CALL Proc_SetPropInUse(' + data.userid + ', ' + data.propid + ', ' + data.id + ')';

        this.CallProcQuery(cmd, cb, user);
    }
    else
    {
        console.log('Parameter error at SetPropInUse: ');
        console.log(data);
    }
};

Database.prototype.BuyProp = function(user, data, cb)
{
    if(dbConnection && !isNaN(data.userid) && !isNaN(data.propid))
    {
        var cmd = 'CALL Proc_BuyProp(' + data.userid + ', ' + data.propid + ')';

        this.CallProcQuery(cmd, cb, user);
    }
    else
    {
        console.log('Parameter error at BuyProp: ');
        console.log(data);
    }
};

Database.prototype.PropsSaleOut = function(user, data, cb)
{
    if(dbConnection && !isNaN(data.userid) && !isNaN(data.propid))
    {
        var cmd = 'CALL Proc_PropsSaleOut(' + data.userid + ', ' + data.propid + ')';

        this.CallProcQuery(cmd, cb, user);
    }
    else
    {
        console.log('Parameter error at PropsSaleOut: ');
        console.log(data);
    }
};

Database.prototype.AddUserFriends = function(user, data, cb)
{
    if(dbConnection && !isNaN(data.userid) && !isNaN(data.frienduserid))
    {
        var cmd = 'insert into userfriends(userid, frienduserid) \
                    select ' + data.userid + ', a.userid \
                    from users as a \
                    left join userfriends as b on a.userid = b.frienduserid and b.userid = ' + data.userid +
                   ' where a.userid = ' + data.frienduserid + ' and a.userid != ' + data.userid + ' and b.userid is null';

        this.DoQuery(cmd, cb, user);
    }
    else
    {
        console.log('Parameter error at AddUserFriends: ');
        console.log(data);
    }
};

Database.prototype.ScrhAddUserFriends = function(user, data, cb)
{
    if(dbConnection)
    {
        var cmd = 'insert into userfriends(userid, frienduserid) \
                    select ' + data.userid + ', a.userid \
                    from users as a \
                    left join userfriends as b on a.userid = b.frienduserid and b.userid = ' + data.userid +
                   " where a.nickname = '" + data.nickname + "' and a.userid != " + data.userid + ' and b.userid is null limit 10';

        this.DoQuery(cmd, cb, user);
    }
};

Database.prototype.DelUserFriends = function(user, data, cb)
{
    if(dbConnection && !isNaN(data.userid) && !isNaN(data.frienduserid))
    {
        var cmd = 'delete from userfriends where userid = ' + data.userid + ' and frienduserid = ' + data.frienduserid;

        this.DoQuery(cmd, cb, user);
    }
    else
    {
        console.log('Parameter error at DelUserFriends: ');
        console.log(data);
    }
};

Database.prototype.GetEnergy = function(cb, user)
{
    if(dbConnection)
    {
        var cmd = 'select userid, energy from users where userid = ' + user.userid;

        this.DoQuery(cmd, cb, user);
    }
};

Database.prototype.GetUserPropEnding = function(cb, mysql, user)
{
    if(dbConnection)
    {
        var cmd = 'select userid, curmagic from users where propending = 1 and userid = ' + user.userid;

        this.DoQuery2Param(cmd, cb, mysql, user);
    }
};

Database.prototype.UpdateUserPropEnding = function(userid)
{
    if(dbConnection)
    {
        var cmd = "update users set propending = 0 where userid = " + userid;

        this.DoWrite(cmd);
    }
};

Database.prototype.GetUserHireEnding = function(cb, mysql, user)
{
    if(dbConnection)
    {
        var cmd = 'select userid, curmagic from users where workerending = 1 and userid = ' + user.userid;

        this.DoQuery2Param(cmd, cb, mysql, user);
    }
};

Database.prototype.UpdateUserHireEnding = function(userid)
{
    if(dbConnection)
    {
        var cmd = "update users set workerending = 0 where userid = " + userid;

        this.DoWrite(cmd);
    }
};

Database.prototype.GetUserMagicChanging = function(cb, mysql, user)
{
    if(dbConnection)
    {
        var cmd = 'select userid, curmagic from users where magicchg = 1 and userid = ' + user.userid;

        this.DoQuery2Param(cmd, cb, mysql, user);
    }
};

Database.prototype.UpdateUserMagicChanging = function(userid)
{
    if(dbConnection)
    {
        var cmd = "update users set magicchg = 0 where userid = " + userid;

        this.DoWrite(cmd);
    }
};

Database.prototype.GetUserInvitation = function(cb, mysql, user)
{
    if(dbConnection)
    {
        var cmd = 'select userid from users where lotus = 1 and userid = ' + user.userid;

        this.DoQuery2Param(cmd, cb, mysql, user);
    }
};

Database.prototype.UpdateUserInvitation = function(userid)
{
    if(dbConnection)
    {
        var cmd = "update users set lotus = 0 where userid = " + userid;

        this.DoWrite(cmd);
    }
};

Database.prototype.GetUserNewMessage = function(cb, mysql, user)
{
    if(dbConnection)
    {
        var cmd = 'select userid from users where lotus = 1 and userid = ' + user.userid;

        this.DoQuery2Param(cmd, cb, mysql, user);
    }
};

Database.prototype.UpdateUserNewMessage = function(userid)
{
    if(dbConnection)
    {
        var cmd = "update users set newmessage = 0 where userid = " + userid;

        this.DoWrite(cmd);
    }
};

Database.prototype.GetUserWorkers = function(user, data, cb)
{
    if(dbConnection && !isNaN(data.userid))
    {
        var cmd = "select a.userid, b.rolecode, b.rolename, \
                            CASE WHEN c.nickname IS NOT NULL THEN c.nickname \
                            WHEN b.rolecode = 'A' THEN '丹尼尔' \
                            WHEN b.rolecode = 'D' THEN '小美' \
                            WHEN b.rolecode = 'W' THEN '小白' \
                            ELSE '' END as workername \
                        from userbarworkers as a \
                        left join workerrole as b on a.roleid = b.roleid \
                        left join users as c on a.workeruserid = c.userid \
                        where a.userid = " + data.userid ;

        this.DoQuery(cmd, cb, user);
    }
    else
    {
        console.log('Parameter error at GetUserWorkers: ');
        console.log(data);
    }
};

Database.prototype.HireWorker = function(user, data, cb)
{
    if(dbConnection && !isNaN(data.userid) && !isNaN(data.frienduserid) && data.rolecode)
    {
        var cmd = 'CALL Proc_HireFriend(' + data.userid + ', ' + data.frienduserid + ", '" + data.rolecode + "')";

        this.CallProcQuery(cmd, cb, user);
    }
    else
    {
        console.log('Parameter error at HireWorker: ');
        console.log(data);
    }
};

Database.prototype.Invite = function(user, data, cb)
{
    if(dbConnection && !isNaN(data.userid))
    {
        var cmd = 'CALL Proc_InviteTiTiKiKi(' + data.userid + ')';

        this.DoWrite(cmd);
    }
    else
    {
        console.log('Parameter error at Invite TiTiKiKi: ');
        console.log(data);
    }
};

Database.prototype.GetUserMessages = function(user, data, cb)
{
    if(dbConnection && !isNaN(data.userid))
    {
        var cmd = "select a.userid, a.senderuserid \
                        , CASE WHEN b.userid IS NULL THEN '' ELSE b.nickname END as sendernickname \
                        , a.messageid, a.typecode, a.title, a.content, a.recvtime, a.propida, a.propidb, a.propidc \
                        , a.propidd, a.propide \
                     from usermessage as a left join users as b ON a.senderuserid = b.userid \
                    where a.userid = " + data.userid ;

        this.DoQuery(cmd, cb, user);
    }
    else
    {
        console.log('Parameter error at GetUserMessages: ');
        console.log(data);
    }
};

Database.prototype.DelUserMessages = function(user, data, cb)
{
    if(dbConnection && !isNaN(data.userid) && !isNaN(data.id))
    {
        var cmd = 'delete from tb_castlemail where castleid = ' + data.userid + ' and id =  ' + data.id ;

        this.DoQuery(cmd, cb, user);
    }
    else
    {
        console.log('Parameter error at DelUserMessages: ');
        console.log(data);
    }
};

Database.prototype.SendUserMessages = function(user, data, cb)
{
    if(dbConnection &&
        !isNaN(data.userid) && !isNaN(data.receiveuserid) )
    {
        var cmd = 'CALL proc_createMail( ' + data.userid +
                                       ', ' + data.receiveuserid +
                                      ", '" + data.title + "'" +
                                      ", '" + data.content + "'" + ' )';
        this.DoQuery(cmd, cb, user);
    }
    else
    {
        console.log('Parameter error at SendUserMessages: ');
        console.log(data);
    }
};
Database.prototype.StartTouziItem = function(user, data, cb)
{
    if(dbConnection && !isNaN(data.castleId))
    {
        var cmd = 'CALL proc_createTouziItem( ' + data.castleId +
                                       ', ' + data.itemid +
                                       ', ' + data.itemMoney + ' )';
        this.DoQuery(cmd, cb, user);
    }
    else
    {
        console.log('Parameter error at StartTouziItem: ');
        console.log(data);
    }
};
Database.prototype.EndTouziItem = function(user, data, cb)
{
    if(dbConnection && !isNaN(data.castleId))
    {
        if (data.itemid == 1){

        }else{
            var tmp_map = [0, 0, 28, 20, 18, 7];
            var cmd = 'CALL proc_endTouziItem( ' + data.castleId +
                ', ' + tmp_map[data.itemid] +
                ', ' + data.itemid +' )';
            this.DoQuery(cmd, cb, user);
        }
    }
    else
    {
        console.log('Parameter error at EndTouziItem: ');
        console.log(data);
    }
};
Database.prototype.useWupinOnDev = function(user, data, cb){
    if(dbConnection && !isNaN(data.castleId))
    {
        var cmd = 'CALL proc_useWupin( ' + data.castleId +
            ', ' + data.wupinId +
            ', ' + data.dev.devX +
            ', ' + data.dev.devY +' )';
        this.DoQuery(cmd, cb, user);
    }
    else
    {
        console.log('Parameter error at EndTouziItem: ');
        console.log(data);
    }
}
Database.prototype.GetUserUpgrade = function(cb, mysql, user)
{
    if(dbConnection)
    {
        var cmd = 'select userid, level from users where upgrade = 1 and userid = ' + user.userid;

        this.DoQuery2Param(cmd, cb, mysql, user);
    }
};

Database.prototype.UpdateUserUpgrade = function(userid)
{
    if(dbConnection)
    {
        var cmd = "update users set upgrade = 0 where userid = " + userid;

        this.DoWrite(cmd);
    }
};

Database.prototype.GetUserMapUpgrade = function(cb, mysql, user)
{
    if(dbConnection)
    {
        var cmd = 'select userid from users where updatefur = 1 and userid = ' + user.userid;

        this.DoQuery2Param(cmd, cb, mysql, user);
    }
}

Database.prototype.UpdateUserMapUpgrade = function(userid)
{
    if(dbConnection)
    {
        var cmd = "update users set updatefur = 0 where userid = " + userid;

        this.DoWrite(cmd);
    }
};

Database.prototype.GetUserFoodUnlock = function(cb, mysql, user)
{
    if(dbConnection)
    {
        var cmd = 'select userid from users where foodunlock = 1 and userid = ' + user.userid;

        this.DoQuery2Param(cmd, cb, mysql, user);
    }
};

Database.prototype.UpdateUserFoodUnlock = function(userid)
{
    if(dbConnection && !isNaN(userid))
    {
        var cmd = "update users set foodunlock = 0 where userid = " + userid;

        this.DoWrite(cmd);
    }
    else
    {
        console.log('Parameter error at UpdateUserFoodUnlock: ');
        console.log(userid);
    }
};

Database.prototype.TaskVisitFriend = function(userid)
{
    if(dbConnection && !isNaN(userid))
    {
        var cmd = 'CALL Proc_TaskVisitFriend(' + userid + ')';

        this.DoWrite(cmd);
    }
    else
    {
        console.log('Parameter error at TaskVisitFriend: ');
        console.log(userid);
    }
};

Database.prototype.TaskAddFriend = function(userid)
{
    if(dbConnection && !isNaN(userid))
    {
        var cmd = 'CALL Proc_TaskAddFriend(' + userid + ')';

        this.DoWrite(cmd);
    }
    else
    {
        console.log('Parameter error at TaskAddFriend: ');
        console.log(userid);
    }
};

Database.prototype.GetUserTaskFinishing = function(cb, mysql, user)
{
    if(dbConnection)
    {
        var cmd = 'select userid from users where taskfinishing = 1 and userid = ' + user.userid;

        this.DoQuery2Param(cmd, cb, mysql, user);
    }
};

Database.prototype.UpdateUserTaskFinishing = function(userid)
{
    if(dbConnection && !isNaN(userid))
    {
        var cmd = "update users set taskfinishing = 0 where userid = " + userid;

        this.DoWrite(cmd);
    }
    else
    {
        console.log('Parameter error at UpdateUserTaskFinishing: ');
        console.log(userid);
    }
};

Database.prototype.GetUserTask = function(user, data, cb)
{
    if(dbConnection && !isNaN(data.userid))
    {
        var cmd = 'select a.userid, a.taskid, b.name, b.comment, b.bonus, a.status \
                     from usertasks as a left join tasks as b on a.taskid = b.taskid \
                    where (a.status = 1 or a.status = 2) and a.userid = ' + data.userid + ' order by a.taskid';

        this.DoQuery(cmd, cb, user);
    }
    else
    {
        console.log('Parameter error at GetUserTask: ');
        console.log(data);
    }
};

Database.prototype.SetUserGuideTask = function(userid)
{
    if(dbConnection && !isNaN(userid))
    {
        var cmd = 'CALL Proc_TaskGuideFinish(' + userid + ')';

        this.DoWrite(cmd);
    }
    else
    {
        console.log('Parameter error at SetUserGuideTask: ');
        console.log(userid);
    }
};

Database.prototype.GetUserTaskBonus = function(user, data, cb)
{
    if(dbConnection && !isNaN(data.userid) && !isNaN(data.taskid))
    {
        var cmd = 'CALL Proc_GetTaskBonus(' + data.userid + ', ' + data.taskid + ')';

        this.CallProcQuery(cmd, cb, user);
    }
    else
    {
        console.log('Parameter error at GetUserTaskBonus: ');
        console.log(data);
    }
};
//===============================================by yxiao================================================//
Database.prototype.GetUserFacility = function (user, data, cb) {
    if (dbConnection && !isNaN(data.userid)) {
        var cmd = null;
        if (user.imagesize == 'phone') // small photo
        {//b.devImgX,b.devImgY \
			cmd='select a.castleId, a.devId, a.devBuildPrice, \
					b.devName, b.devInitBuildPrice, \
					b.devAscPrice, b.devInitGuestPrice, \
					b.devInitCharm, b.devPath, b.devSizeX, \
					b.devSizeY,c.devTypeName \
				from ((tb_castledevstore as a join tb_dev as b) join tb_devtype c)  \
				where a.devId = b.devId \
					and b.devTypeId = c.devTypeId \
					and a.castleId = ' +  data.userid;
      	}
        else    // large photo
        {
            cmd = 'select a.id, a.castleId, a.facilityId \
                        , a.initPrice \
                        , a.priceAscending \
                        , a.initConsume, a.initCharm \
                        , a.InitTotleFee, a.gridNum \
                        , a.buyNum \
                     from tb_castlefacilitystore as a \
                     left join tb_castle as b on a.castleId = b.cid \
                    where b.userid = ' + data.userid;
        }

        this.DoQuery(cmd, cb, user);
    }
    else {
        console.log('Parameter error at GetUserFacility: ');
        console.log(data);
    }
};

Database.prototype.GetUserMailbox = function(user, data, cb)
{
    if(dbConnection && !isNaN(data.userid))
    {
        var cmd = 'select m.id,m.castleId, m.sendCastleId \
                        , u.userNickname as sendernickname \
                        , m.mailTitle, m.mailTest, m.alreadyRead \
                     from tb_castleMail as m left join tb_users as u ON m.sendCastleId = u.castleId \
                    where m.castleId = ' + data.userid ;

        this.DoQuery(cmd, cb, user);
    }
    else
    {
        console.log('Parameter error at GetUserMailbox: ');
        console.log(data);
    }
};

Database.prototype.GetUserLeagues = function(user, data, cb)
{
    if(dbConnection && !isNaN(data.userid))
    {
        var cmd = 'select e.castleId,e.allyCastleId, u.userNickname allyNickName \
			from tb_users as u left join tb_castleally as e \
			on u.castleId = e.allyCastleId where e.castleId =' + data.userid;

        this.DoQuery(cmd, cb, user);
    }
    else
    {
        console.log('Parameter error at GetUserLeagues: ');
        console.log(data);
    }
};

Database.prototype.GetCastleItemList = function(user, data, cb)
{
    if(dbConnection && !isNaN(data.userid))
    {
        var cmd = 'select m.id,m.castleId, u.itemId \
                        , u.itemName \
                        , u.itemMoney, u.effect, u.itemdesc \
						, u.appearCondition, u.iconPath, u.iconTpye \
                     from tb_castleItem as m left join tb_item as u ON m.itemId = u.itemId \
                    where m.castleId = ' + data.userid ;

        this.DoQuery(cmd, cb, user);
    }
    else
    {
        console.log('Parameter error at GetCastleItemList: ');
        console.log(data);
    }
};

Database.prototype.SaveCastleDev = function(user, data, cb)
{
    if(dbConnection && !isNaN(user.userid))
    {
		var cmd = 'CALL pro_createCastleDev(' + data.castleId + 
			', ' + data.floorId + 
			', ' + data.devId + 
			', ' + data.devGuestPrice + 
			', ' + data.devCharm + 
			', ' + data.devX +
			', ' + data.devY +
			', ' + data.devInitBuildPrice + ')';
        this.DoQuery(cmd, cb, user);
    }
    else
    {
        console.log('Parameter error at SaveCastleDev: ');
        console.log(data);
    }
};

Database.prototype.MoveCastleDev = function(user, data, cb)
{
    if(dbConnection && !isNaN(user.userid))
    {
		var cmd = 'CALL pro_moveCastleDev(' + data.devX + 
			', ' + data.devY + 
			', ' + data.oldX +
			', ' + data.oldY + ')';
        this.DoQuery(cmd, cb, user);
    }
    else
    {
        console.log('Parameter error at MoveCastleDev: ');
        console.log(data);
    }
};

Database.prototype.DeletedCastleDev = function(user, data, cb)
{
    if(dbConnection && !isNaN(user.userid))
    {
		var cmd = 'CALL pro_deletedCastleDev(' + data.devX + 
			', ' + data.devY + ')';
        this.DoQuery(cmd, cb, user);
    }
    else
    {
        console.log('Parameter error at DeletedCastleDev: ');
        console.log(data);
    }
};

Database.prototype.GuestXF = function(user, data, cb)
{
    if(dbConnection && !isNaN(user.userid))
    {
		var cmd = 'CALL pro_guestXF(' + data.guestPrice + 
			', ' + data.castleId + ')';
        this.DoQuery(cmd, cb, user);
    }
    else
    {
        console.log('Parameter error at SaveCastleDev: ');
        console.log(data);
    }
};


Database.prototype.GetCastleDevList = function(user, data, cb)
{
    if(dbConnection && !isNaN(data.userid))
    {
        var cmd = 'select m.id,m.castleId, m.floorId, m.devId, m.devGuestPrice, m.devCharm, m.devX, m.devY \
                        , u.devName, u.devTypeID, u.devInitBuildPrice, u.devAscPrice, u.devInitGuestPrice \
                        , u.devInitCharm, u.devInitTotleFee, u.devPath \
						, u.devSizeX, u.devSizeY, u.devAcquireMethod \
                     from tb_castledevlisting as m left join tb_dev as u ON m.devId = u.devId \
                    where m.castleId = ' + data.userid ;

        this.DoQuery(cmd, cb, user);
    }
    else
    {
        console.log('Parameter error at GetCastleDevList: ');
        console.log(data);
    }
};

module.exports = Database;
