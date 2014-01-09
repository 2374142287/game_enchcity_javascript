/**
 * Created with JetBrains WebStorm.
 * User: john
 * Date: 13-2-12
 * Time: 下午10:31
 * To change this template use File | Settings | File Templates.
 */
define(['jquery',winSize+'/FunctionBarContainer','FriendManager',winSize+'/FriendContainer','FoodManager',
    winSize+'/FoodContainer','Furniture','FurnitureComponent',
    'FurnitureManager',winSize+'/FurnitureContainer','PropManager',winSize+'/PropContainer',winSize+'/PropShopContainer'],
    function($,functionBarContainer,FriendManager,FriendContainer,FoodManager,
             FoodContainer,Furniture,FurnitureComponent,
             FurnitureManager,FurnitureContainer,PropManager,PropContainer,PropShopContainer){
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
            this.addChildAt(this.GetFunctionBarBg(),0);

            this.toolBar = this.GetToolBar();
            this.addChildAt(this.toolBar,1);

            this.FunctionBarContainer = new functionBarContainer({x:130,y:116,width:1002,height:106});
            this.addChildAt(this.FunctionBarContainer,2);
            //初始化好友
            this.friendManager = new FriendManager();
            this.GetFriends();
            //this.ShowFriends();
            //初始化酒水
            this.foodManager = new FoodManager();
            this.GetFoods();
            //初始化物品
            this.propManager = new PropManager();
            this.GetProps();
            //初始化家具
            this.furnitureManager = new FurnitureManager();
            this.GetFurnitures();
            //初始化商城
            this.propShopManager = new PropManager();
            this.GetShopProps();

            this.addChildAt(this.GetFriendBtn(),3);
            this.addChildAt(this.GetFoodBtn(),3);
            this.addChildAt(this.GetGoodsBtn(),3);
            this.addChildAt(this.GetOutlookBtn(),3);
            this.addChildAt(this.GetShopBtn(),3);
            this.addChildAt(this.GetArrowLeftBtn(),3);
            this.addChildAt(this.GetArrowRightBtn(),3);
            this.addChildAt(this.GetTaskBtn(),3);
            this.addChildAt(this.GetMailBtn(),3);
            this.addChildAt(this.GetMusicBtn(),3);
            this.ArrowLittleDownBtn = this.GetArrowLittleDownBtn();
            this.ArrowLittleUpBtn = this.GetArrowLittleUpBtn();
            this.addChildAt(this.ArrowLittleDownBtn,3);
            //下侧功能按钮
        };

        toolBarContainer.prototype.GetToolBar = function(){
            var toolBar = new Q.Bitmap({image:LoadedImages.mainui.image,rect:[304,843,1263,237]});
            //this.displayer.SetDisplayObjectSize(toolBar,this.getCurrentHeight(),this.designHeight);
            //this.displayer.SetDisplayObjectBottomCenter(toolBar,this);
            return toolBar;
        };

        toolBarContainer.prototype.GetFunctionBarBg = function(){
            var FunctionBarBg = new Q.Bitmap({image:LoadedImages.functionbarbg.image,x:133,y:117});
            return FunctionBarBg;
        };

        toolBarContainer.prototype.GetFriendBtn = function(){
            return this.GetBtn(184,20,480,720,this.ShowFriends);
        };
        //add by zz 2013-2-13 上面的5个按钮
        toolBarContainer.prototype.GetFoodBtn = function(){
            var px = 187 + 124*1;
            var qx = 480 + 80*1;
            return this.GetBtn(px,20,qx,720,this.ShowFoods);
        };
        toolBarContainer.prototype.GetGoodsBtn = function(){
            var px = 187 + 124*2 + 6;
            var qx = 480 + 80*2;
            return this.GetBtn(px,20,qx,720,this.ShowProps);
        };
        toolBarContainer.prototype.GetOutlookBtn = function(){
            var px = 187 + 124*3 + 8;
            var qx = 480 + 80*3;
            return this.GetBtn(px,20,qx,720,this.ShowFurnitures);
        };
        toolBarContainer.prototype.GetShopBtn = function(){
            var px = 187 + 124*4 + 12;
            var qx = 480 + 80*4;
            return this.GetBtn(px,20,qx,720,this.ShowShopProps);
        };
        //小图标按钮添加
        toolBarContainer.prototype.GetTaskBtn = function(){
            var px = 817 + 60*0;
            var qx = 480 + 80*5;
            return this.GetBtn(px,20,qx,714,function(){
                Views.MainView.ShowQueueContainer();
            });
        };
        toolBarContainer.prototype.GetMailBtn = function(){
            var px = 817 + 74*1 + 1;
            var qx = 480 + 80*6;
            return this.GetBtn(px,20,qx,714,function(){});
        };
        toolBarContainer.prototype.GetMusicBtn = function(){
            var px = 817 + 74*2;
            var qx = 480 + 80*7;
            return this.GetBtn(px,20,qx,714,function(){});
        };
        toolBarContainer.prototype.GetArrowLittleDownBtn = function(){
            var px = 817 + 74*3;
            var qx = 480 + 80*8;
            return this.GetBtn(px,20,qx,714,this.HiddenBar);
        };
        toolBarContainer.prototype.GetArrowLittleUpBtn = function(){
            var px = 817 + 74*3;
            var qx = 480 + 80*9;
            return this.GetBtn(px,20,qx,714,this.ShowBar);
        };
        //下面的左右箭头
        toolBarContainer.prototype.GetArrowLeftBtn = function(){
            var px = 60;
            var qx = 1280;
            return this.GetBtn(px,135,qx,720,this.FunctionBarContainer.Last);
        };
        toolBarContainer.prototype.GetArrowRightBtn = function(){
            var px = 1130;
            var qx = 1360;
            return this.GetBtn(px,135,qx,720,this.FunctionBarContainer.Next);
        };
        toolBarContainer.prototype.GetBtn = function(px,py,qx,qy,callback){
            var btn = new Q.Button({image:LoadedImages.mainui.image, x:px, y:py, width:80, height:80,
                up:{rect:[qx,qy,80,80]},
                //over:{rect:[qx,qy-80,80,80]},
                down:{rect:[qx,qy-160,80,80]},
                disabled:{rect:[qx,qy,80,80]}
            });
            btn.addEventListener(events[2], function(e)
            {
                callback();
            });
            return btn;
        };
        //动画
        toolBarContainer.prototype.HiddenBar = function(){
            Views.MainView.ToolBarContainer.Status = "move";
            timer = new Q.Timer(60);
            timer.addListener(Q.Tween);
            timer.start();
            var po = Views.MainView.ToolBarContainer.y + (Views.MainView.ToolBarContainer.height - 90)*Views.MainView.ToolBarContainer.getCurrentHeight()/Views.MainView.ToolBarContainer.height;
            Q.Tween.to(Views.MainView.ToolBarContainer, {y:po}, {time:300, onComplete:function(tween)
            {
                timer.stop();
                Views.MainView.ToolBarContainer.Status = "hidden";
                Views.MainView.ToolBarContainer.removeChild(Views.MainView.ToolBarContainer.ArrowLittleDownBtn);
                Views.MainView.ToolBarContainer.addChildAt(Views.MainView.ToolBarContainer.ArrowLittleUpBtn,3);
            }});
        };
        toolBarContainer.prototype.ShowBar = function(){
            Views.MainView.ToolBarContainer.Status = "move";
            timer = new Q.Timer(60);
            timer.addListener(Q.Tween);
            timer.start();
            var po = Views.MainView.ToolBarContainer.y - (Views.MainView.ToolBarContainer.height - 90)*Views.MainView.ToolBarContainer.getCurrentHeight()/Views.MainView.ToolBarContainer.height;
            Q.Tween.to(Views.MainView.ToolBarContainer, {y:po}, {time:300, onComplete:function(tween)
            {
                timer.stop();
                Views.MainView.ToolBarContainer.Status = "show";
                Views.MainView.ToolBarContainer.removeChild(Views.MainView.ToolBarContainer.ArrowLittleUpBtn);
                Views.MainView.ToolBarContainer.addChildAt(Views.MainView.ToolBarContainer.ArrowLittleDownBtn,3);
            }});
        };
        //好友栏
        toolBarContainer.prototype.GetFriends = function(){
            /*
             this.friendManager.add(1,"小一",2,"男","白羊","1990-12-12","15900xxxx02","个性签名","99","99999");
             this.friendManager.add(2,"小二",1,"女","金牛","1990-12-12","15900xxxx02","个性签名","99","90000");
             this.friendManager.add(3,"小三",0,"女","处女","1990-12-12","15900xxxx02","个性签名","99","90000");
             this.friendManager.add(4,"小四五六七",5,"女","双子","1990-12-12","15900xxxx02","个性签名","99","90000");
             */
        };
        //显示好友
        toolBarContainer.prototype.ShowFriends = function(){
            Views.MainView.ToolBarContainer.FunctionBarContainer.ClearContainers();
            trace("friendsManager Count:"+Views.MainView.ToolBarContainer.friendManager.Count());
            for(var i=0;i<Views.MainView.ToolBarContainer.friendManager.Count();i++){
                var str = JSON.stringify(Views.MainView.ToolBarContainer.friendManager.friends[1].photow);
                trace("friendsManager:"+str);
                Views.MainView.ToolBarContainer.FunctionBarContainer.Containers[i] = new FriendContainer(Views.MainView.ToolBarContainer.friendManager.friends[i]);
            }
            Views.MainView.ToolBarContainer.FunctionBarContainer.showBars(0);
        };

        //食物栏
        toolBarContainer.prototype.GetFoods = function(){
            /*
             for(var i=0;i<Player.FoodNumber;i++){
             this.foodManager.add(i,"Food"+i,10,3,2);
             }
             */
        };
        //显示食品栏
        toolBarContainer.prototype.ShowFoods = function(){
            Views.MainView.ToolBarContainer.FunctionBarContainer.ClearContainers();
            for(var i=0;i<Views.MainView.ToolBarContainer.foodManager.Count();i++){
                if(Views.MainView.ToolBarContainer.foodManager.foods[i].islocked==0){
                    Views.MainView.ToolBarContainer.FunctionBarContainer.Containers[i] = new FoodContainer(Views.MainView.ToolBarContainer.foodManager.foods[i]);
                    Views.MainView.ToolBarContainer.FunctionBarContainer.Containers[i].SetStockNumber();
                }
                else Views.MainView.ToolBarContainer.FunctionBarContainer.Containers[i] = Views.MainView.ToolBarContainer.getDisabelFood();
            }
            Views.MainView.ToolBarContainer.FunctionBarContainer.showBars(0);
        };

        toolBarContainer.prototype.getDisabelFood = function(){
            return new Q.Button({image:LoadedImages.foodui.image,x:0,y:0, width:Views.MainView.ToolBarContainer.FunctionBarContainer.childSize, height:Views.MainView.ToolBarContainer.FunctionBarContainer.childSize,
                up:{rect:[1275,437,Views.MainView.ToolBarContainer.FunctionBarContainer.childSize,Views.MainView.ToolBarContainer.FunctionBarContainer.childSize]},
                //over:{rect:[1419,437,FunctionBarContainer.childSize,FunctionBarContainer.childSize]},
                down:{rect:[1419,437,Views.MainView.ToolBarContainer.FunctionBarContainer.childSize,Views.MainView.ToolBarContainer.FunctionBarContainer.childSize]}
            });
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
                    photo:"propIcon.png",				// 道具图片
                    photox:0,				// 图片X坐标
                    photoy:0,					// 图片Y坐标
                    photow:106,					// 图片宽度
                    photoh:106,					// 图片高度
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
                    photo:"propIcon.png",				// 道具图片
                    photox:107,				// 图片X坐标
                    photoy:0,					// 图片Y坐标
                    photow:106,					// 图片宽度
                    photoh:106,					// 图片高度
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
                    photo:"propIcon.png",				// 道具图片
                    photox:214,				// 图片X坐标
                    photoy:0,					// 图片Y坐标
                    photow:106,					// 图片宽度
                    photoh:106,					// 图片高度
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
                    photo:"propIcon.png",				// 道具图片
                    photox:321,				// 图片X坐标
                    photoy:0,					// 图片Y坐标
                    photow:106,					// 图片宽度
                    photoh:106,					// 图片高度
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
                    photo:"propIcon.png",				// 道具图片
                    photox:428,				// 图片X坐标
                    photoy:0,					// 图片Y坐标
                    photow:106,					// 图片宽度
                    photoh:106,					// 图片高度
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
                    photo:"propIcon.png",				// 道具图片
                    photox:535,				// 图片X坐标
                    photoy:0,					// 图片Y坐标
                    photow:106,					// 图片宽度
                    photoh:106,					// 图片高度
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
                    photo:"propIcon.png",				// 道具图片
                    photox:642,				// 图片X坐标
                    photoy:0,					// 图片Y坐标
                    photow:106,					// 图片宽度
                    photoh:106,					// 图片高度
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
                    photo:"propIcon.png",				// 道具图片
                    photox:749,				// 图片X坐标
                    photoy:0,					// 图片Y坐标
                    photow:106,					// 图片宽度
                    photoh:106,					// 图片高度
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
                    photo:"propIcon.png",				// 道具图片
                    photox:856,				// 图片X坐标
                    photoy:0,					// 图片Y坐标
                    photow:106,					// 图片宽度
                    photoh:106,					// 图片高度
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
                    photo:"propIcon.png",				// 道具图片
                    photox:963,				// 图片X坐标
                    photoy:0,					// 图片Y坐标
                    photow:106,					// 图片宽度
                    photoh:106,					// 图片高度
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
                    photo:"propIcon.png",				// 道具图片
                    photox:1070,				// 图片X坐标
                    photoy:0,					// 图片Y坐标
                    photow:106,					// 图片宽度
                    photoh:106,					// 图片高度
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
                    photo:"propIcon.png",				// 道具图片
                    photox:1177,				// 图片X坐标
                    photoy:0,					// 图片Y坐标
                    photow:106,					// 图片宽度
                    photoh:106,					// 图片高度
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
                    photo:"propIcon.png",				// 道具图片
                    photox:1284,				// 图片X坐标
                    photoy:0,					// 图片Y坐标
                    photow:106,					// 图片宽度
                    photoh:106,					// 图片高度
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
                    photo:"propIcon.png",				// 道具图片
                    photox:1391,				// 图片X坐标
                    photoy:0,					// 图片Y坐标
                    photow:106,					// 图片宽度
                    photoh:106,					// 图片高度
                    xingbei:400,					// 购买时所需星贝
                    gold:500					// 购买时所需的金币
                }
            ];
            for(var i=0;i<propsData.length;i++){
                this.propShopManager.add(propsData[i]);
            }
        };
        //显示商城道具
        toolBarContainer.prototype.ShowShopProps = function(){
            Views.MainView.ToolBarContainer.FunctionBarContainer.ClearContainers();
            for(var i=0;i<Views.MainView.ToolBarContainer.propShopManager.Count();i++){
                Views.MainView.ToolBarContainer.FunctionBarContainer.Containers[i] = new PropShopContainer(Views.MainView.ToolBarContainer.propShopManager.props[i]);
            }
            Views.MainView.ToolBarContainer.FunctionBarContainer.showBars(0);
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
        //显示道具
        toolBarContainer.prototype.ShowProps = function(){
            Views.MainView.ToolBarContainer.FunctionBarContainer.ClearContainers();
            for(var i=0;i<Views.MainView.ToolBarContainer.propManager.Count();i++){
                Views.MainView.ToolBarContainer.FunctionBarContainer.Containers[i] = new PropContainer(Views.MainView.ToolBarContainer.propManager.props[i]);
            }
            Views.MainView.ToolBarContainer.FunctionBarContainer.showBars(0);
        };
        //获取家具
        toolBarContainer.prototype.GetFurnitures = function(){
            var furns =[
                {
                    userfurnitureid:0,		//#家具ID
                    name:"调酒",			// 家具名称
                    typecode:9,	// 家具类型代码
                    typename:"调酒",				// 类型名称
                    photo:"furnituresIcon.png",				// 家具图片，组件时为空
                    photox:0,					// 图片X坐标
                    photoy:0,				// 图片Y坐标
                    photow:106,				// 图片宽度
                    photoh:106,					// 图片高度
                    islocked:0,
                    isused:1,			// 家具使用状态
                    ishided:5,			// 家具是否被魔法隐藏，限于使用中的家具
                    posx:5,				// 家具在地图上的X坐标
                    posy:1
                },
                {
                    userfurnitureid:1,		//#家具ID
                    name:"沙发",			// 家具名称
                    typecode:9,	// 家具类型代码
                    typename:"座椅",				// 类型名称
                    photo:"furnituresIcon.png",				// 家具图片，组件时为空
                    photox:0,					// 图片X坐标
                    photoy:107,				// 图片Y坐标
                    photow:106,				// 图片宽度
                    photoh:106,					// 图片高度
                    islocked:0,
                    isused:1,			// 家具使用状态
                    ishided:0,			// 家具是否被魔法隐藏，限于使用中的家具
                    posx:1,				// 家具在地图上的X坐标
                    posy:5
                },
                {
                    userfurnitureid:2,		//#家具ID
                    name:"调音",			// 家具名称
                    typecode:9,	// 家具类型代码
                    typename:"调音",				// 类型名称
                    photo:"furnituresIcon.png",				// 家具图片，组件时为空
                    photox:0,					// 图片X坐标
                    photoy:535,				// 图片Y坐标
                    photow:106,				// 图片宽度
                    photoh:106,					// 图片高度
                    islocked:0,
                    isused:1,			// 家具使用状态
                    ishided:0,			// 家具是否被魔法隐藏，限于使用中的家具
                    posx:1,				// 家具在地图上的X坐标
                    posy:2
                },
                {
                    userfurnitureid:3,		//#家具ID
                    name:"调音",			// 家具名称
                    typecode:9,	// 家具类型代码
                    typename:"调音",				// 类型名称
                    photo:"furnituresIcon.png",				// 家具图片，组件时为空
                    photox:107,					// 图片X坐标
                    photoy:535,				// 图片Y坐标
                    photow:106,				// 图片宽度
                    photoh:106,					// 图片高度
                    islocked:1,
                    isused:0,			// 家具使用状态
                    ishided:0,			// 家具是否被魔法隐藏，限于使用中的家具
                    posx:1,				// 家具在地图上的X坐标
                    posy:2
                },
                {
                    userfurnitureid:3,		//#家具ID
                    name:"调音",			// 家具名称
                    typecode:9,	// 家具类型代码
                    typename:"调音",				// 类型名称
                    photo:"furnituresIcon.png",				// 家具图片，组件时为空
                    photox:214,					// 图片X坐标
                    photoy:535,				// 图片Y坐标
                    photow:106,				// 图片宽度
                    photoh:106,					// 图片高度
                    islocked:1,
                    isused:0,			// 家具使用状态
                    ishided:0,			// 家具是否被魔法隐藏，限于使用中的家具
                    posx:1,				// 家具在地图上的X坐标
                    posy:2
                },
                {
                    userfurnitureid:3,		//#家具ID
                    name:"调音",			// 家具名称
                    typecode:9,	// 家具类型代码
                    typename:"调音",				// 类型名称
                    photo:"furnituresIcon.png",				// 家具图片，组件时为空
                    photox:321,					// 图片X坐标
                    photoy:535,				// 图片Y坐标
                    photow:106,				// 图片宽度
                    photoh:106,					// 图片高度
                    islocked:1,
                    isused:0,			// 家具使用状态
                    ishided:0,			// 家具是否被魔法隐藏，限于使用中的家具
                    posx:1,				// 家具在地图上的X坐标
                    posy:2
                },
                {
                    userfurnitureid:3,		//#家具ID
                    name:"调音",			// 家具名称
                    typecode:9,	// 家具类型代码
                    typename:"调音",				// 类型名称
                    photo:"furnituresIcon.png",				// 家具图片，组件时为空
                    photox:428,					// 图片X坐标
                    photoy:535,				// 图片Y坐标
                    photow:106,				// 图片宽度
                    photoh:106,					// 图片高度
                    islocked:1,
                    isused:0,			// 家具使用状态
                    ishided:0,			// 家具是否被魔法隐藏，限于使用中的家具
                    posx:1,				// 家具在地图上的X坐标
                    posy:2
                },
                {
                    userfurnitureid:3,		//#家具ID
                    name:"调音",			// 家具名称
                    typecode:9,	// 家具类型代码
                    typename:"调音",				// 类型名称
                    photo:"furnituresIcon.png",				// 家具图片，组件时为空
                    photox:535,					// 图片X坐标
                    photoy:535,				// 图片Y坐标
                    photow:106,				// 图片宽度
                    photoh:106,					// 图片高度
                    islocked:1,
                    isused:0,			// 家具使用状态
                    ishided:0,			// 家具是否被魔法隐藏，限于使用中的家具
                    posx:1,				// 家具在地图上的X坐标
                    posy:2
                },
                {
                    userfurnitureid:3,		//#家具ID
                    name:"沙发",			// 家具名称
                    typecode:9,	// 家具类型代码
                    typename:"沙发",				// 类型名称
                    photo:"furnituresIcon.png",				// 家具图片，组件时为空
                    photox:107,					// 图片X坐标
                    photoy:107,				// 图片Y坐标
                    photow:106,				// 图片宽度
                    photoh:106,					// 图片高度
                    islocked:1,
                    isused:0,			// 家具使用状态
                    ishided:0,			// 家具是否被魔法隐藏，限于使用中的家具
                    posx:1,				// 家具在地图上的X坐标
                    posy:2
                },
                {
                    userfurnitureid:3,		//#家具ID
                    name:"沙发",			// 家具名称
                    typecode:9,	// 家具类型代码
                    typename:"沙发",				// 类型名称
                    photo:"furnituresIcon.png",				// 家具图片，组件时为空
                    photox:214,					// 图片X坐标
                    photoy:107,				// 图片Y坐标
                    photow:106,				// 图片宽度
                    photoh:106,					// 图片高度
                    islocked:1,
                    isused:0,			// 家具使用状态
                    ishided:0,			// 家具是否被魔法隐藏，限于使用中的家具
                    posx:1,				// 家具在地图上的X坐标
                    posy:2
                },
                {
                    userfurnitureid:3,		//#家具ID
                    name:"沙发",			// 家具名称
                    typecode:9,	// 家具类型代码
                    typename:"沙发",				// 类型名称
                    photo:"furnituresIcon.png",				// 家具图片，组件时为空
                    photox:321,					// 图片X坐标
                    photoy:107,				// 图片Y坐标
                    photow:106,				// 图片宽度
                    photoh:106,					// 图片高度
                    islocked:1,
                    isused:0,			// 家具使用状态
                    ishided:0,			// 家具是否被魔法隐藏，限于使用中的家具
                    posx:1,				// 家具在地图上的X坐标
                    posy:2
                },
                {
                    userfurnitureid:3,		//#家具ID
                    name:"沙发",			// 家具名称
                    typecode:9,	// 家具类型代码
                    typename:"沙发",				// 类型名称
                    photo:"furnituresIcon.png",				// 家具图片，组件时为空
                    photox:428,					// 图片X坐标
                    photoy:107,				// 图片Y坐标
                    photow:106,				// 图片宽度
                    photoh:106,					// 图片高度
                    islocked:1,
                    isused:0,			// 家具使用状态
                    ishided:0,			// 家具是否被魔法隐藏，限于使用中的家具
                    posx:1,				// 家具在地图上的X坐标
                    posy:2
                },
                {
                    userfurnitureid:3,		//#家具ID
                    name:"沙发",			// 家具名称
                    typecode:9,	// 家具类型代码
                    typename:"沙发",				// 类型名称
                    photo:"furnituresIcon.png",				// 家具图片，组件时为空
                    photox:535,					// 图片X坐标
                    photoy:107,				// 图片Y坐标
                    photow:106,				// 图片宽度
                    photoh:106,					// 图片高度
                    islocked:1,
                    isused:0,			// 家具使用状态
                    ishided:0,			// 家具是否被魔法隐藏，限于使用中的家具
                    posx:1,				// 家具在地图上的X坐标
                    posy:2
                }
            ];
            var componentsData=[
                {
                    componentid:0,			//#家具组件ID
                    userfurnitureid:0,		//#家具ID
                    direction:0,			// 家具方向
                    dirphoto:"furnituresRight/r3.png",		// 该方向上的家具图片
                    dirphotox:0,				// 图片X坐标
                    dirphotoy:0,		// 图片Y坐标
                    dirphotow:144,		// 图片宽度
                    dirphotoh:425,		// 图片高度
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
                    dirphoto:"furnituresRight/r11.png",		// 该方向上的家具图片
                    dirphotox:0,				// 图片X坐标
                    dirphotoy:0,		// 图片Y坐标
                    dirphotow:144,		// 图片宽度
                    dirphotoh:425,		// 图片高度
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
                    dirphoto:"furnituresLeft/l6.png",		// 该方向上的家具图片
                    dirphotox:0,				// 图片X坐标
                    dirphotoy:0,		// 图片Y坐标
                    dirphotow:144,		// 图片宽度
                    dirphotoh:425,		// 图片高度
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
                    dirphoto:"furnituresLeft/l42.png",		// 该方向上的家具图片
                    dirphotox:0,				// 图片X坐标
                    dirphotoy:0,		// 图片Y坐标
                    dirphotow:288,		// 图片宽度
                    dirphotoh:425,		// 图片高度
                    sizex:2,		// X方向尺寸
                    sizey:2,					// Y方向尺寸
                    relativex:0,				// 组件的相对X轴位置
                    relativey:0,			// 组件的相对Y轴位置
                    isblock:1               //是否可穿过 1为block
                }
            ];
            //显示家具列表
            for(var i=0;i<furns.length;i++){
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
            }
        };
        //显示家具
        toolBarContainer.prototype.ShowFurnitures = function(){
            Views.MainView.ToolBarContainer.FunctionBarContainer.ClearContainers();
            for(var i=0;i<Views.MainView.ToolBarContainer.furnitureManager.Count();i++){
                Views.MainView.ToolBarContainer.FunctionBarContainer.Containers[i] = new FurnitureContainer(Views.MainView.ToolBarContainer.furnitureManager.Furnitures[i]);
            }
            Views.MainView.ToolBarContainer.FunctionBarContainer.showBars(0);
        };

        return toolBarContainer;
});