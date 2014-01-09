/**
 * Created with JetBrains WebStorm.
 * User: yyh
 * Date: 13-4-14
 * Time: PM11:38
 * To change this template use File | Settings | File Templates.
 */

require("../Common/Config");
require("../Common/Messages");

var MySQL = require('./database');
var GameCalc = require('./GameCalc');

var database = new MySQL(Config.MySqlUrl, Config.MySqlPort, Config.MySqlUser, Config.MySqlPsd, Config.Database);
var runner = new GameCalc(database);

database.Open();

runner.Start();
