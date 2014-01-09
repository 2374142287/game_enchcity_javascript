/**
 * Created with JetBrains WebStorm.
 * User: yyh
 * Date: 13-3-1
 * Time: PM11:38
 * To change this template use File | Settings | File Templates.
 */

require("../Common/Config");
require("../Common/Messages");

var SocketServer = require('./SocketServer');
var MySQL = require('./database');
var GameRunner = require('./GameRunner');

var database = new MySQL(Config.MySqlUrl, Config.MySqlPort, Config.MySqlUser, Config.MySqlPsd, Config.Database);
var svr = new SocketServer(database);
var runner = new GameRunner(svr, database);

database.Open();

svr.Start(Config.ServerPort);

runner.Start();
