/**
 * Created with JetBrains WebStorm.
 * User: yyh
 * Date: 13-3-2
 * Time: PM4:09
 * To change this template use File | Settings | File Templates.
 */

//var timerGuestAction = require('timers');

module = module.exports = GameCalc;

function GameCalc(mysql)
{
    this.mysql = mysql;
}

GameCalc.prototype.Start = function ()
{
    var runner = this;
    //timerGuestAction.setInterval(function (){BeginGuestActionLists(runner)}, 2000); // 2 seconds
    BeginGuestActionLists(runner);
}

var BeginGuestActionLists = function(runner)
{
    console.log('=========================== BeginGuestActionLists ===========================');

    // generate guests
    runner.mysql.GenerateGuests(GenerateGuestsCallback, runner);
}

var GenerateGuestsCallback = function(runner)
{
    console.log('Generate guests for one user end');
    // calculate guest enter
    runner.mysql.CalcGuestEnter(CalcGuestEnterCallback, runner);
}

var CalcGuestEnterCallback = function(runner)
{
    console.log('Calc enter end');
    // calculate guest consuming
    runner.mysql.CalcGuestConsuming(CalcGuestConsumingCallback, runner);
}

var CalcGuestConsumingCallback = function(runner)
{
    console.log('Calc consuming end');
    // calculate guest consuming
    runner.mysql.CalcGuestExit(CalcGuestExitCallback, runner);
}

var CalcGuestExitCallback = function(runner)
{
    console.log('Calc exit end');

    // generate guests
    runner.mysql.GenerateGuests(GenerateGuestsCallback, runner);
}
