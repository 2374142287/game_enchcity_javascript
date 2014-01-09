/**
 * Created with JetBrains WebStorm.
 * User: john
 * Date: 13-3-1
 * Time: 上午12:16
 * To change this template use File | Settings | File Templates.
 */

LoginRequest= {
    userid: 0,
    isexist: 0
};

RoleData=[{
    userid:12,					//*用户ID（主键）
    name:"das",				// 用户名称
    nickname:"带神",			// 昵称
    sex	:0,					// 性别（男、女）
    rolecode:0,			// 角色类型ID    modify by bwj 3.2
    photo:"headIcon.png",					// 头像
    photox:0,
    photoy:0,
    photow:144,
    photoh:144,				// 头像区域
    experience:123,			// 经验值，用于计算级别，由任务和小费获得。
    level:12,					// 级别，级别决定体力。
    magic:23,				// 魔幻值	。结合魔法作用以算出当前魔幻值。
    curmagic:20,				// 当前魔幻值。收入基数。对应繁华度，客人数由此计算。
    totalgold:1234,				// 总金币，Gold+Tips
    xingbei:50,				// 星贝。星贝可以换金币，反之不可以。
    energy:100,					// 体力。收小费会消耗体力。
    bonus:0.3,				// 收入加成，玩家的收入直接乘于一个加成数。
    foodcook:2,				// 食品调制箱数量。
    mapwidth:8,				// 地图宽度
    mapheight:8,				// 地图高度
    //added by bwj 3.2
    horoscope : '双子',
    birthdate : '1980-1-12',
    mobile : '135****0123',
    cooknumberpertime:1
}];

CommonData={
    userid : 12,
    result: 1
};

FriendsData=[
    {
        userid:12,                          //#用户ID（外键）
        frienduserid:0,                     //#好友用户ID
        rolecode:0,			                 // 角色类型ID    modify by bwj 3.2
        photo:"friendIcon.png",			// 好友头像
        photox:107,				             // 图片X坐标
        photoy: 0,			         // 图片Y坐标
        photow:106,				         // 图片宽度
        photoh:106,				         // 图片高度
        comment:"a",			             // 好友备注
        //added by bwj 3.2
        nickname : '张三',
        sex:0,
        horoscope : '双子',
        birthdate : '1980-1-12',
        mobile : '135****0123',
        level: 12,
        magic:24
    },
    {
        userid:13,				//#用户ID（外键）
        frienduserid:0,		//#好友用户ID
        rolecode:0,			// 角色类型名称
        photo:"friendIcon.png",				// 好友头像
        photox:0,				// 图片X坐标
        photoy: 0,				// 图片Y坐标
        photow:106,				// 图片宽度
        photoh:106,				// 图片高度
        comment:"a",			// 好友备注
        //added by bwj 3.2
        nickname : '李四',
        sex:1,
        horoscope : '双子',
        birthdate : '1980-1-21',
        mobile : '135****0123',
        level: 12,
        magic:24
    }
];

FoodsData = [
    {
        userid : 12,					//#用户ID（外键）
        foodid:8,				//#食品ID
        name:'红酒',					// 食品名称
        islocked:0,			// 是否解锁
        typecode:1,				// 食材类型代码
        typename:"酒水",				// 类型名称（酒水、甜品）
        star:2,					// 食品星等
        photo:"foodUI.png",					// 食品图片
        photox:0,			// 图片X坐标
        photoy:0,		// 图片Y坐标
        photow:106,					// 图片宽度
        photoh:106,	 // 图片高度
        buyphoto:"tipIcon.png",					// 食品图片
        buyphotox:0,			// 图片X坐标
        buyphotoy:0,		// 图片Y坐标
        buyphotow:70,					// 图片宽度
        buyphotoh:91,	 // 图片高度
        status:-1,      // 食品是否调制好
        remainedtime:0,			// 食品调制剩余时间
        quantity:315,		// 食品剩余数量
        yieldingtime:30,	// 调制时长
        yield:5,					// 每次调制食品的数量，可通过道具来增加产量
        costenergy:80,			// 调制食品消耗的体力
        price:5					// 食品单价
    },
    {
        userid : 12,					//#用户ID（外键）
        foodid:6,				//#食品ID
        name:'葡萄酒',					// 食品名称
        islocked:1,			// 是否解锁
        typecode:1,				// 食材类型代码
        typename:"酒水",				// 类型名称（酒水、甜品）
        star:3,					// 食品星等
        photo:"foodUI.png",					// 食品图片
        photox:106,			// 图片X坐标
        photoy:0,		// 图片Y坐标
        photow:106,					// 图片宽度
        photoh:106,	 // 图片高度
        buyphoto:"tipIcon.png",					// 食品图片
        buyphotox:71,			// 图片X坐标
        buyphotoy:0,		// 图片Y坐标
        buyphotow:70,					// 图片宽度
        buyphotoh:91,	 // 图片高度
        status:-1,// 食品是否调制好
        remainedtime:0,			// 食品调制剩余时间
        quantity:98,		// 食品剩余数量
        yieldingtime:15,	// 调制时长
        yield:5,					// 每次调制食品的数量，可通过道具来增加产量
        costenergy:80,			// 调制食品消耗的体力
        price:5					// 食品单价
    }
];
FoodsDataPhone = [
    {
        userid : 12,					//#用户ID（外键）
        foodid:8,				//#食品ID
        name:'红酒',					// 食品名称
        islocked:0,			// 是否解锁
        typecode:1,				// 食材类型代码
        typename:"酒水",				// 类型名称（酒水、甜品）
        star:2,					// 食品星等
        photo:"foodUI.png",					// 食品图片
        photox:0,			// 图片X坐标
        photoy:0,		// 图片Y坐标
        photow:84,					// 图片宽度
        photoh:84,	 // 图片高度
        buyphoto:"tipIcon.png",					// 食品图片
        buyphotox:0,			// 图片X坐标
        buyphotoy:0,		// 图片Y坐标
        buyphotow:70,					// 图片宽度
        buyphotoh:91,	 // 图片高度
        status:-1,      // 食品是否调制好
        remainedtime:0,			// 食品调制剩余时间
        quantity:315,		// 食品剩余数量
        yieldingtime:30,	// 调制时长
        yield:5,					// 每次调制食品的数量，可通过道具来增加产量
        costenergy:80,			// 调制食品消耗的体力
        price:5					// 食品单价
    },
    {
        userid : 12,					//#用户ID（外键）
        foodid:6,				//#食品ID
        name:'葡萄酒',					// 食品名称
        islocked:1,			// 是否解锁
        typecode:1,				// 食材类型代码
        typename:"酒水",				// 类型名称（酒水、甜品）
        star:3,					// 食品星等
        photo:"foodUI.png",					// 食品图片
        photox:84,			// 图片X坐标
        photoy:0,		// 图片Y坐标
        photow:84,					// 图片宽度
        photoh:84,	 // 图片高度
        buyphoto:"tipIcon.png",					// 食品图片
        buyphotox:71,			// 图片X坐标
        buyphotoy:0,		// 图片Y坐标
        buyphotow:70,					// 图片宽度
        buyphotoh:91,	 // 图片高度
        status:-1,// 食品是否调制好
        remainedtime:0,			// 食品调制剩余时间
        quantity:98,		// 食品剩余数量
        yieldingtime:15,	// 调制时长
        yield:5,					// 每次调制食品的数量，可通过道具来增加产量
        costenergy:80,			// 调制食品消耗的体力
        price:5					// 食品单价
    }
];

PropsData=[
    {
        userid:5,			//#用户ID（外键）
        propid:1,				//#道具ID
        name:'小名',				// 道具名称
        typecode:'80',			// 道具类型代码
        typename:"增益",			// 类型名称(增益、减益、恢复、食品秘方、食品调制器、邀请TiTi、邀请KiKi)
        isused:5,			// 魔法使用状态
        isfromOthers:3,			// 道具是否他人实施，这类主要是捣蛋类魔法。只有在使用状态时才有意义
        comment:"飞火流星"				// 道具详情
    },
    {
        userid:5,			//#用户ID（外键）
        propid:2,				//#道具ID
        name:'小名',				// 道具名称
        typecode:'80',			// 道具类型代码
        typename:"增益",			// 类型名称(增益、减益、恢复、食品秘方、食品调制器、邀请TiTi、邀请KiKi)
        isused:5,			// 魔法使用状态
        isfromOthers:3,			// 道具是否他人实施，这类主要是捣蛋类魔法。只有在使用状态时才有意义
        comment:"飞火流星"			// 道具详情
    }
];

FurnituresData=[
    {
        userid:12,	//#用户ID（外键）
        userfurnitureid:5,		//#家具ID
        name:"沙发",			// 家具名称
        typecode:9,	// 家具类型代码
        typename:5,				// 类型名称
        photo:"87.jpg",				// 家具图片，组件时为空
        photox:0,					// 图片X坐标
        photoy:0,				// 图片Y坐标
        photow:106,				// 图片宽度
        photoh:106,					// 图片高度
        isused:1,			// 家具使用状态
        ishided:5,			// 家具是否被魔法隐藏，限于使用中的家具
        posx:2,				// 家具在地图上的X坐标
        posy:3
    },
    {
        userid:12,	//#用户ID（外键）
        userfurnitureid:6,		//#家具ID
        name:"沙发",			// 家具名称
        typecode:9,	// 家具类型代码
        typename:5,				// 类型名称
        photo:"87.jpg",				// 家具图片，组件时为空
        photox:106,					// 图片X坐标
        photoy:0,				// 图片Y坐标
        photow:106,				// 图片宽度
        photoh:106,					// 图片高度
        isused:1,			// 家具使用状态
        ishided:5,			// 家具是否被魔法隐藏，限于使用中的家具
        posx:2,				// 家具在地图上的X坐标
        posy:3
    }
];

ComponentsData=[
    {
        userid:6,			//#用户ID（外键）
        componentid:5,			//#家具组件ID
        userfurnitureid:7,		//#家具ID
        direction:0,			// 家具方向
        dirphoto:"2.jpg",		// 该方向上的家具图片
        dirphotox:6,				// 图片X坐标
        dirphotoy:9,		// 图片Y坐标
        dirphotow:25,		// 图片宽度
        dirphotoh:35,		// 图片高度
        sizex:1,		// X方向尺寸
        sizey:9,					// Y方向尺寸
        relativex:6,				// 组件的相对X轴位置
        relativey:0,			// 组件的相对Y轴位置
        isblock:1               //是否可穿过 1为block
    },
    {
        userid:6,			//#用户ID（外键）
        componentid:5,			//#家具组件ID
        userfurnitureid:7,		//#家具ID
        direction:0,			// 家具方向
        dirphoto:"2.jpg",		// 该方向上的家具图片
        dirphotox:6,				// 图片X坐标
        dirphotoy:9,		// 图片Y坐标
        dirphotow:25,		// 图片宽度
        dirphotoh:35,		// 图片高度
        sizex:1,		// X方向尺寸
        sizey:9,					// Y方向尺寸
        relativex:6,				// 组件的相对X轴位置
        relativey:0,			// 组件的相对Y轴位置
        isblock:1               //是否可穿过 1为block
    }
];

GuestsData = [
    {
        guestid:5091,
        typecode:"C"
    },
    {
        guestid:7891,
        typecode:"B"
    },
    {
        guestid:2,
        typecode:"A"
    },
    {
        guestid:3,
        typecode:"D"
    },
    {
        guestid:4,
        typecode:"B"
    }
];

