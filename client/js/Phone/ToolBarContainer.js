/**
 * Created with JetBrains WebStorm.
 * User: john
 * Date: 13-2-12
 * Time: 下午10:31
 * To change this template use File | Settings | File Templates.
 */
//TODO[dk647] add wupinManageer
define(['jquery','FriendManager','MailManager','LeagueManager','ItemManager','FoodManager',
    'Furniture','FurnitureComponent',
    'FurnitureManager','PropManager','FurnitureComponentManager',
    'QueueManager','MailManager','WorkerManager','MessageManager','TilesMap/mapCoordinater', 'WupinManager'],
    function($,FriendManager,MailManager,LeagueManager,ItemManager,FoodManager,
             Furniture,FurnitureComponent,
             FurnitureManager,PropManager,FurnitureComponentManager,
             QueueManager,MailManager,WorkerManager,MessageManager,MapCoordinater,WupinManager){
        var toolBarContainer = function(props)
        {
            toolBarContainer.superClass.constructor.call(this, props);
            this.init();
        };

        Q.inherit(toolBarContainer, Q.DisplayObjectContainer);

        toolBarContainer.prototype.init = function(){
            this.Status = "show";
            this.MaxFoodNumber = 16;
            this.PropNumber = 14;
            this.timer = new Q.Timer(60);
            this.toolBar = this.GetBg();
            this.addChildAt(this.toolBar,1);

            //初始化装修列表
            this.friendManager = new FriendManager();
			//初始化邮件主题列表
            this.mialManager = new MailManager();
			//初始化盟友列表
            this.leagueManager = new LeagueManager();
			//初始化投资
            this.itemManager = new ItemManager();
            //初始化物品
            this.wupinManager = new WupinManager();
			//正在投资的项目
			this.itemInvestmentManager = new ItemManager();
			
			//初始化装修
			
            //this.GetFriends();
            //this.ShowFriends();
            //初始化酒水
            this.foodManager = new FoodManager();
            //this.GetFoods();
            //初始化酒水调制
            this.rectiManager = new FoodManager();
            //初始化家具
            this.furnitureManager = new FurnitureManager();
            
            this.furnitureComponentManager = new FurnitureComponentManager();
			this.GetFurnitures();
            //初始化商城
            this.propShopManager = new PropManager();
            //this.GetShopProps();
            //初始化物品
            this.propManager = new PropManager();
            //this.GetProps();
            //初始化任务
            this.queueManager = new QueueManager();
            this.GetQueues();
            //邮件数据
            this.mailManager = new MailManager();
            //工人数据
            this.workerManager = new WorkerManager();
            //消息数据
            this.messageManager = new MessageManager();
            //充值记录数据
            this.rechargeRecordManager = new MessageManager();
            //消费记录数据
            this.costRecordManager = new MessageManager();
            //下侧功能按钮
			this.floorbtn = this.GetFloorBtn();
			this.managebtn = this.GetManageBtn();
            this.returnbtn = this.GetReturnBtn(); //added by xu
            this.addChildAt(this.floorbtn,3);
            this.addChildAt(this.managebtn,3);
        };

        toolBarContainer.prototype.GetBg = function(){
            //var toolBar = new Q.Bitmap({image:LoadedImages.mainui.image,rect:[0,0,480,90]});
			var toolBar = new Q.DisplayObjectContainer({x:0,y:0,width:480,height:90});
            return toolBar;
        };

        //动画
        toolBarContainer.prototype.HiddenBar = function(complated){
            Views.MainView.HideAllDialog();
            Views.MainView.ToolBarContainer.Status = "move";
            var timer = new Q.Timer(60);
            timer.addListener(Q.Tween);
            timer.start();
            var po = Views.MainView.getCurrentHeight();
            //var po = Views.MainView.ToolBarContainer.y + (Views.MainView.ToolBarContainer.height - 90)*Views.MainView.ToolBarContainer.getCurrentHeight()/Views.MainView.ToolBarContainer.height;
            Q.Tween.to(Views.MainView.ToolBarContainer, {y:po}, {time:300, onComplete:function(tween)
            {
                timer.stop();
                Views.MainView.ToolBarContainer.Status = "hidden";
                complated();
            }});
        };
        toolBarContainer.prototype.ShowBar = function(){
            Views.MainView.HideAllDialog();
            Views.MainView.ToolBarContainer.Status = "move";
            var timer = new Q.Timer(60);
            timer.addListener(Q.Tween);
            timer.start();
            var po = Views.MainView.getCurrentHeight() - Views.MainView.VisitBarContainer.getCurrentHeight();
            Q.Tween.to(Views.MainView.ToolBarContainer, {y:po}, {time:300, onComplete:function(tween)
            {
                timer.stop();
                Views.MainView.ToolBarContainer.Status = "show";
            }});
        };
		
		toolBarContainer.prototype.GetFloorBtn = function(){
            return this.GetBtn(1,this.ShowFloor);
        };
        toolBarContainer.prototype.GetManageBtn = function(){
            return this.GetBtn(2,this.ShowManage);
        };
        toolBarContainer.prototype.GetReturnBtn= function(){
            //added by xu
            return this.GetBtn(3,this.HideMessage);
        }

        toolBarContainer.prototype.GetBtn = function(id,callback){
            var px = 10;
			if(id > 1) px=340;
            var py =0;
            var cx = 756;
            var cy = 94*(id-1);
            var btn = new Q.Button({image:LoadedImages.managerui.image, x:px, y:py, width:130, height:90,
                up:{rect:[cx,cy,130,90]},
                down:{rect:[cx+135,cy,130,90]}
            });
            btn.addEventListener(events[2], function(e)
            {
                callback();
            });
            return btn;
        };

        //显示主菜单
        toolBarContainer.prototype.ShowManage = function(){
            var toolbar=Views.MainView.ToolBarContainer;
            Views.MainView.showFriendContainer();
            toolbar.removeChild(toolbar.managebtn);
            toolbar.addChildAt(toolbar.returnbtn,3); //由管理按钮切换到返回按钮
        };
		
		//显示楼层
        toolBarContainer.prototype.ShowFloor = function(){
            Views.MainView.showFloorContainer();
        };

        //关闭主菜单
        toolBarContainer.prototype.HideMessage = function(){
            var toolbar=Views.MainView.ToolBarContainer;
            //alert("HideMessage.");
            Views.MainView.HideMessageContainer();
            toolbar.removeChild(toolbar.returnbtn);
            toolbar.addChildAt(toolbar.managebtn,3);

        }

        //获取家具
        toolBarContainer.prototype.GetFurnitures = function(){
            var furns =[
                {
					id:11,
					mapCoordinater:new MapCoordinater,
					castleId:1,
					devId : 1,
					devBuildPrice : 5000,
					devName : 11,
					devAscPrice : 1000,
					devInitGuestPrice : 500,
					devInitCharm : 12,
					devPath : "chosen",
					devSizeX : 2,
					devSizeY : 2,
					devTypeName : 1,
					devImgX : 160,
					devImgY : 160,
					isblock : 0
                },
				{
					id:12,
					mapCoordinater:new MapCoordinater,
					castleId:1,
					devId : 1,
					devBuildPrice : 5000,
					devName : 11,
					devAscPrice : 1000,
					devInitGuestPrice : 500,
					devInitCharm : 12,
					devPath : "chosen",
					devSizeX : 2,
					devSizeY : 2,
					devTypeName : 1,
					devImgX : 160,
					devImgY : 160,
					isblock : 0
                },
				{
					id:13,
					mapCoordinater:new MapCoordinater,
					castleId:1,
					devId : 1,
					devBuildPrice : 5000,
					devName : 11,
					devAscPrice : 1000,
					devInitGuestPrice : 500,
					devInitCharm : 12,
					devPath : "chosen",
					devSizeX : 2,
					devSizeY : 2,
					devTypeName : 1,
					devImgX : 160,
					devImgY : 160,
					isblock : 0
                },
				{
					id:14,
					mapCoordinater:new MapCoordinater,
					castleId:1,
					devId : 1,
					devBuildPrice : 5000,
					devName : 11,
					devAscPrice : 1000,
					devInitGuestPrice : 500,
					devInitCharm : 12,
					devPath : "chosen",
					devSizeX : 2,
					devSizeY : 2,
					devTypeName : 1,
					devImgX : 160,
					devImgY : 160,
					isblock : 0
                }
            ];
			//显示家具列表
			for(var j=0;j<furns.length;j++){
				var comp = furns[j];
				var furnitureComponent = new FurnitureComponent(comp);
                this.furnitureComponentManager.add(furnitureComponent);
			}
            /*var componentsData=[
                {
                    componentid:0,			//#家具组件ID
                    userfurnitureid:0,		//#家具ID
                    direction:0,			// 家具方向
                    dirphoto:"furnituresRight/1.png",		// 该方向上的家具图片
                    dirphotox:0,				// 图片X坐标
                    dirphotoy:0,		// 图片Y坐标
                    dirphotow:72,		// 图片宽度
                    dirphotoh:213,		// 图片高度
                    sizex:1,		// X方向尺寸
                    sizey:1,					// Y方向尺寸
                    relativex:0,				// 组件的相对X轴位置
                    relativey:0,			// 组件的相对Y轴位置
                    isblock:1               //是否可穿过 1为block
                },
                {
                    componentid:1,			//#家具组件ID
                    userfurnitureid:0,		//#家具ID
                    direction:0,			// 家具方向
                    dirphoto:"furnituresRight/2.png",		// 该方向上的家具图片
                    dirphotox:0,				// 图片X坐标
                    dirphotoy:0,		// 图片Y坐标
                    dirphotow:72,		// 图片宽度
                    dirphotoh:213,		// 图片高度
                    sizex:1,		// X方向尺寸
                    sizey:1,					// Y方向尺寸
                    relativex:0,				// 组件的相对X轴位置
                    relativey:2,			// 组件的相对Y轴位置
                    isblock:1               //是否可穿过 1为block
                },
                {
                    componentid:2,			//#家具组件ID
                    userfurnitureid:1,		//#家具ID
                    direction:0,			// 家具方向
                    dirphoto:"furnituresLeft/25.png",		// 该方向上的家具图片
                    dirphotox:0,				// 图片X坐标
                    dirphotoy:0,		// 图片Y坐标
                    dirphotow:72,		// 图片宽度
                    dirphotoh:213,		// 图片高度
                    sizex:1,		// X方向尺寸
                    sizey:1,					// Y方向尺寸
                    relativex:0,				// 组件的相对X轴位置
                    relativey:0,			// 组件的相对Y轴位置
                    isblock:1               //是否可穿过 1为block
                },
                {
                    componentid:3,			//#家具组件ID
                    userfurnitureid:2,		//#家具ID
                    direction:0,			// 家具方向
                    dirphoto:"furnituresLeft/24.png",		// 该方向上的家具图片
                    dirphotox:0,				// 图片X坐标
                    dirphotoy:0,		// 图片Y坐标
                    dirphotow:144,		// 图片宽度
                    dirphotoh:213,		// 图片高度
                    sizex:2,		// X方向尺寸
                    sizey:2,					// Y方向尺寸
                    relativex:0,				// 组件的相对X轴位置
                    relativey:0,			// 组件的相对Y轴位置
                    isblock:1               //是否可穿过 1为block
                }
            ];*/
            
            /*for(var i=0;i<furns.length;i++){
                //放置家具到房间
                var furniture = new Furniture(furns[i]);
                this.furnitureManager.add(furniture);
                for(var j=0;j<componentsData.length;j++){
                    if(componentsData[j].furnitureid == furns[i].furnitureid){
                        furniture.add(new FurnitureComponent(componentsData[j]));
                        //furniture.setPosition();
                        //if(furns[i].isused == 1)  Views.MainView.GameView.MapWorker.DrawItem(componentsData[j]);
                    }
                }
            }*/
        };
        //获取商城道具
        toolBarContainer.prototype.GetShopProps = function(){
            var propsData=[
                {
                    propid:0,				//#道具ID
                    name:'怯咒符文',				// 道具名称
                    islocked:0,             // 是否解锁
                    typecode:'80',			// 道具类型代码
                    typename:"增益",			// 类型名称(增益、减益、恢复、食品秘方、食品调制器、邀请TiTi、邀请KiKi)
                    comment:"道具",				// 道具详情
                    photo:"propIcon.gif",				// 道具图片
                    photox:0,				// 图片X坐标
                    photoy:0,					// 图片Y坐标
                    photow:140,					// 图片宽度
                    photoh:140,					// 图片高度
                    xingbei:10,					// 购买时所需星贝
                    gold:500					// 购买时所需的金币
                },
                {
                    propid:1,				//#道具ID
                    name:'饼干',				// 道具名称
                    islocked:0,             // 是否解锁
                    typecode:'80',			// 道具类型代码
                    typename:"增益",			// 类型名称(增益、减益、恢复、食品秘方、食品调制器、邀请TiTi、邀请KiKi)
                    comment:"道具",				// 道具详情
                    photo:"propIcon.gif",				// 道具图片
                    photox:144,				// 图片X坐标
                    photoy:0,					// 图片Y坐标
                    photow:140,					// 图片宽度
                    photoh:140,					// 图片高度
                    xingbei:12,					// 购买时所需星贝
                    gold:500					// 购买时所需的金币
                },
                {
                    propid:2,				//#道具ID
                    name:'糖果',				// 道具名称
                    islocked:0,             // 是否解锁
                    typecode:'80',			// 道具类型代码
                    typename:"增益",			// 类型名称(增益、减益、恢复、食品秘方、食品调制器、邀请TiTi、邀请KiKi)
                    comment:"道具",				// 道具详情
                    photo:"propIcon.gif",				// 道具图片
                    photox:287,				// 图片X坐标
                    photoy:0,					// 图片Y坐标
                    photow:140,					// 图片宽度
                    photoh:140,					// 图片高度
                    xingbei:24,					// 购买时所需星贝
                    gold:500					// 购买时所需的金币
                },
                {
                    propid:3,				//#道具ID
                    name:'魔免水晶',				// 道具名称
                    islocked:1,             // 是否解锁
                    typecode:'80',			// 道具类型代码
                    typename:"增益",			// 类型名称(增益、减益、恢复、食品秘方、食品调制器、邀请TiTi、邀请KiKi)
                    comment:"道具",				// 道具详情
                    photo:"propIcon.gif",				// 道具图片
                    photox:430,				// 图片X坐标
                    photoy:0,					// 图片Y坐标
                    photow:140,					// 图片宽度
                    photoh:140,					// 图片高度
                    xingbei:36,					// 购买时所需星贝
                    gold:500					// 购买时所需的金币
                },
                {
                    propid:4,				//#道具ID
                    name:'五星秘方',				// 道具名称
                    islocked:1,             // 是否解锁
                    typecode:'80',			// 道具类型代码
                    typename:"增益",			// 类型名称(增益、减益、恢复、食品秘方、食品调制器、邀请TiTi、邀请KiKi)
                    comment:"道具",				// 道具详情
                    photo:"propIcon.gif",				// 道具图片
                    photox:573,				// 图片X坐标
                    photoy:0,					// 图片Y坐标
                    photow:140,					// 图片宽度
                    photoh:140,					// 图片高度
                    xingbei:48,					// 购买时所需星贝
                    gold:500					// 购买时所需的金币
                },
                {
                    propid:5,				//#道具ID
                    name:'激发潜能',				// 道具名称
                    islocked:1,             // 是否解锁
                    typecode:'80',			// 道具类型代码
                    typename:"增益",			// 类型名称(增益、减益、恢复、食品秘方、食品调制器、邀请TiTi、邀请KiKi)
                    comment:"道具",				// 道具详情
                    photo:"propIcon.gif",				// 道具图片
                    photox:716,				// 图片X坐标
                    photoy:0,					// 图片Y坐标
                    photow:140,					// 图片宽度
                    photoh:140,					// 图片高度
                    xingbei:56,					// 购买时所需星贝
                    gold:500					// 购买时所需的金币
                },
                {
                    propid:6,				//#道具ID
                    name:'精灵的庇佑',				// 道具名称
                    islocked:1,             // 是否解锁
                    typecode:'80',			// 道具类型代码
                    typename:"增益",			// 类型名称(增益、减益、恢复、食品秘方、食品调制器、邀请TiTi、邀请KiKi)
                    comment:"道具",				// 道具详情
                    photo:"propIcon.gif",				// 道具图片
                    photox:859,				// 图片X坐标
                    photoy:0,					// 图片Y坐标
                    photow:140,					// 图片宽度
                    photoh:140,					// 图片高度
                    xingbei:68,					// 购买时所需星贝
                    gold:500					// 购买时所需的金币
                },
                {
                    propid:7,				//#道具ID
                    name:'开启对冲结界的钥匙',				// 道具名称
                    islocked:1,             // 是否解锁
                    typecode:'80',			// 道具类型代码
                    typename:"增益",			// 类型名称(增益、减益、恢复、食品秘方、食品调制器、邀请TiTi、邀请KiKi)
                    comment:"道具",				// 道具详情
                    photo:"propIcon.gif",				// 道具图片
                    photox:1002,				// 图片X坐标
                    photoy:0,					// 图片Y坐标
                    photow:140,					// 图片宽度
                    photoh:140,					// 图片高度
                    xingbei:80,					// 购买时所需星贝
                    gold:500					// 购买时所需的金币
                },
                {
                    propid:8,				//#道具ID
                    name:'一星秘方',				// 道具名称
                    islocked:1,             // 是否解锁
                    typecode:'80',			// 道具类型代码
                    typename:"增益",			// 类型名称(增益、减益、恢复、食品秘方、食品调制器、邀请TiTi、邀请KiKi)
                    comment:"道具",				// 道具详情
                    photo:"propIcon.gif",				// 道具图片
                    photox:1145,				// 图片X坐标
                    photoy:0,					// 图片Y坐标
                    photow:140,					// 图片宽度
                    photoh:140,					// 图片高度
                    xingbei:102,					// 购买时所需星贝
                    gold:500					// 购买时所需的金币
                },
                {
                    propid:9,				//#道具ID
                    name:'二星秘方',				// 道具名称
                    islocked:1,             // 是否解锁
                    typecode:'80',			// 道具类型代码
                    typename:"增益",			// 类型名称(增益、减益、恢复、食品秘方、食品调制器、邀请TiTi、邀请KiKi)
                    comment:"道具",				// 道具详情
                    photo:"propIcon.gif",				// 道具图片
                    photox:1288,				// 图片X坐标
                    photoy:0,					// 图片Y坐标
                    photow:140,					// 图片宽度
                    photoh:140,					// 图片高度
                    xingbei:120,					// 购买时所需星贝
                    gold:500					// 购买时所需的金币
                },
                {
                    propid:10,				//#道具ID
                    name:'三星秘方',				// 道具名称
                    islocked:1,             // 是否解锁
                    typecode:'80',			// 道具类型代码
                    typename:"增益",			// 类型名称(增益、减益、恢复、食品秘方、食品调制器、邀请TiTi、邀请KiKi)
                    comment:"道具",				// 道具详情
                    photo:"propIcon.gif",				// 道具图片
                    photox:1431,				// 图片X坐标
                    photoy:0,					// 图片Y坐标
                    photow:140,					// 图片宽度
                    photoh:140,					// 图片高度
                    xingbei:200,					// 购买时所需星贝
                    gold:500					// 购买时所需的金币
                },
                {
                    propid:11,				//#道具ID
                    name:'四星秘方',				// 道具名称
                    islocked:1,             // 是否解锁
                    typecode:'80',			// 道具类型代码
                    typename:"增益",			// 类型名称(增益、减益、恢复、食品秘方、食品调制器、邀请TiTi、邀请KiKi)
                    comment:"道具",				// 道具详情
                    photo:"propIcon.gif",				// 道具图片
                    photox:1574,				// 图片X坐标
                    photoy:0,					// 图片Y坐标
                    photow:140,					// 图片宽度
                    photoh:140,					// 图片高度
                    xingbei:240,					// 购买时所需星贝
                    gold:500					// 购买时所需的金币
                },
                {
                    propid:12,				//#道具ID
                    name:'魅惑的结界',				// 道具名称
                    islocked:1,             // 是否解锁
                    typecode:'80',			// 道具类型代码
                    typename:"增益",			// 类型名称(增益、减益、恢复、食品秘方、食品调制器、邀请TiTi、邀请KiKi)
                    comment:"道具",				// 道具详情
                    photo:"propIcon.gif",				// 道具图片
                    photox:1717,				// 图片X坐标
                    photoy:0,					// 图片Y坐标
                    photow:140,					// 图片宽度
                    photoh:140,					// 图片高度
                    xingbei:280,					// 购买时所需星贝
                    gold:500					// 购买时所需的金币
                },
                {
                    propid:13,				//#道具ID
                    name:'风咏眼镜',				// 道具名称
                    islocked:1,             // 是否解锁
                    typecode:'80',			// 道具类型代码
                    typename:"增益",			// 类型名称(增益、减益、恢复、食品秘方、食品调制器、邀请TiTi、邀请KiKi)
                    comment:"道具",				// 道具详情
                    photo:"propIcon.gif",				// 道具图片
                    photox:1860,				// 图片X坐标
                    photoy:0,					// 图片Y坐标
                    photow:140,					// 图片宽度
                    photoh:140,					// 图片高度
                    xingbei:400,					// 购买时所需星贝
                    gold:500					// 购买时所需的金币
                }
            ];
            for(var i=0;i<propsData.length;i++){
                this.propShopManager.add(propsData[i]);
            }
        };
        //获取道具
        toolBarContainer.prototype.GetProps = function(){
            var propsData=[
                {
                    propid:0,				//#道具ID
                    name:'怯咒符文',				// 道具名称
                    typecode:'80',			// 道具类型代码
                    typename:"增益",			// 类型名称(增益、减益、恢复、食品秘方、食品调制器、邀请TiTi、邀请KiKi)
                    isused:5,			// 魔法使用状态
                    isfromOthers:3,			// 道具是否他人实施，这类主要是捣蛋类魔法。只有在使用状态时才有意义
                    comment:"飞火流星"				// 道具详情
                },
                {
                    propid:1,				//#道具ID
                    name:'饼干',				// 道具名称
                    typecode:'80',			// 道具类型代码
                    typename:"增益",			// 类型名称(增益、减益、恢复、食品秘方、食品调制器、邀请TiTi、邀请KiKi)
                    isused:5,			// 魔法使用状态
                    isfromOthers:3,			// 道具是否他人实施，这类主要是捣蛋类魔法。只有在使用状态时才有意义
                    comment:"飞火流星"			// 道具详情
                }
            ];
            for(var i=0;i<propsData.length;i++){
                this.propManager.add(propsData[i]);
            }
        };
        //获取任务列表
        toolBarContainer.prototype.GetQueues = function(){
            var QueuesData=[
                {
                    queueid : 0,
                    queuetype : '主线任务',
                    queuecomplate : "20",
                    queuecontent : "拜访好友一次"
                },
                {
                    queueid : 1,
                    queuetype : '主线任务',
                    queuecomplate : "20",
                    queuecontent : "调制酒水一次"
                },
                {
                    queueid : 2,
                    queuetype : '主线任务',
                    queuecomplate : "20",
                    queuecontent : "收取小费一次"
                }
            ];
            for(var i=0;i<QueuesData.length;i++){
                this.queueManager.add(QueuesData[i]);
            }
        };

        
        //显示食品
        toolBarContainer.prototype.ShowItems = function(){
            Views.MainView.showItemsContainer();
        };
        //显示充值
        toolBarContainer.prototype.ShowRecharge = function(){
            Views.MainView.showRechargeContainer();
        };
        //显示商城
        toolBarContainer.prototype.ShowShop = function(){
            Views.MainView.showPropShopContainer();
        };
        //显示信息
        toolBarContainer.prototype.ShowMail = function(){
            Views.MainView.ToolBarContainer.stopNewMessage();
            Views.MainView.showMessageContainer();
        };

        toolBarContainer.prototype.showNewMessage = function(){
            var self = this;
            self.timer = new Q.Timer(60);
            self.tween = Q.Tween.to(self.mailBtn, {alpha:0}, {time:500,loop:true, onComplete:function(tween)
            {
                self.mailBtn.alpha = 1;
            }});
            self.timer.addListener(self.tween);
            self.timer.start();
        };

        toolBarContainer.prototype.stopNewMessage = function(){
            var self = Views.MainView.ToolBarContainer;
            self.mailBtn.alpha = 1;
           if(self.timer != null && self.tween != null){
               self.tween.stop();
               self.timer.removeListener(self.tween);
               self.timer.stop();
               self.timer = null;
           }
        };

        return toolBarContainer;
});