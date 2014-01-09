/**
 * Created with JetBrains WebStorm.
 * User: john
 * Date: 13-2-15
 * Time: 下午12:39
 * To change this template use File | Settings | File Templates.
 */
define(['jquery'],function($){
    var Player = function()
    {
        this.init();
    };

    Player.prototype.init = function(){
        this.account = "";
        this.password = "";
        this.userid = -1;					//*用户ID（主键）
        this.name ="";		// 用户名称
        this.userNickname="";			// 昵称
        this.sex=0;					// 性别（男、女）
        this.rolecode=0;		 // 角色类型ID
        this.photo="";				// 头像
        this.photorect="";			// 头像区域
        this.experience= "";			// 经验值，用于计算级别，由任务和小费获得。
        this.level = 0;			// 级别，级别决定体力。
        this.magic=0;		// 魔幻值	。结合魔法作用以算出当前魔幻值。
        this.curmagic=0;			// 当前魔幻值。收入基数。对应繁华度，客人数由此计算。
        this.gold=0;		// 总金币，Gold+Tips
        this.xingbei=0;				// 星贝。星贝可以换金币，反之不可以。
        this.energy=0;				// 体力。收小费会消耗体力。
        this.bonus=0;				// 收入加成，玩家的收入直接乘于一个加成数。
        this.foodcook=0;		// 食品调制箱数量。
        this.mapwidth=0;				// 地图宽度
        this.mapheight=0;

        //解锁酒水数量
        this.FoodNumber = 6;
        //同时调制个数
        this.cooknumberpertime = 1;
    };

    return Player;
});