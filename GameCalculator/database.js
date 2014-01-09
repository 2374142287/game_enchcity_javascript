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

Database.prototype.DoWrite = function(cmd, cb, runner)
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
                    cb(runner);
                }
            });
        }
    }
    catch (err)
    {
        console.log(err);
    }
};

Database.prototype.GenerateGuests = function(cb, runner)
{
    if(dbConnection)
    {
        var cmd = 'CALL Proc_GuestGenerateOne()';

        this.DoWrite(cmd, cb, runner);
    }
};

Database.prototype.CalcGuestEnter = function(cb, runner)
{
    if(dbConnection)
    {
        var cmd = 'CALL Proc_GuestEnter()';

        this.DoWrite(cmd, cb, runner);
    }
};

Database.prototype.CalcGuestConsuming = function(cb, runner)
{
    if(dbConnection)
    {
        var cmd = 'CALL Proc_GuestConsuming()';

        this.DoWrite(cmd, cb, runner);
    }
};

Database.prototype.CalcGuestExit = function(cb, runner)
{
    if(dbConnection)
    {
        var cmd = 'CALL Proc_GuestExit()';

        this.DoWrite(cmd, cb, runner);
    }
};


module.exports = Database;
