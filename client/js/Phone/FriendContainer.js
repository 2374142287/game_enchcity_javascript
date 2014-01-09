/**
 * Created with JetBrains WebStorm.
 * User: john
 * Date: 13-2-13
 * Time: 下午7:09
 * To change this template use File | Settings | File Templates.
 */
define([winSize+'/CloseBtn',winSize+"/FriendInfo"],function(CloseBtn,friendInfo){
    var FriendContainer = function()
    {
        FriendContainer.superClass.constructor.call(this);
        this.init();
    };

    Q.inherit(FriendContainer, Q.DisplayObjectContainer);

    FriendContainer.prototype.init = function(){
        this.width = Views.DisplayObjectsDefine.displayer.divWinWidth;
        this.height = Views.DisplayObjectsDefine.displayer.divWinHeight;

        this.iconWidth = 200;
        this.iconHeight = 65;

        this.addChildAt(this.getBg(),0);

        // 管理菜单操作按钮
        this.addChildAt(this.getZxInfoBtn(),1);
		this.addChildAt(this.getWpInfoBtn(),1);
		this.addChildAt(this.getTzInfoBtn(),1);
		this.addChildAt(this.getMyInfoBtn(),1);
		this.addChildAt(this.getXxInfoBtn(),1);
		this.addChildAt(this.getCzInfoBtn(),1);
    };

    FriendContainer.prototype.getBtn = function(id,callback){
        var btnWidth = 41;
        var btnHeight = 94;
        var btnpMargin = 771;
        var btncMargin = 1;
        var px = 100 + (btnWidth + btnpMargin)*id;
        var cx = 1250 + (btnWidth+btncMargin)*id;
        var btn = new Q.Button({image:LoadedImages.foodui.image,x:px,y:220, width:btnWidth+10, height:btnHeight+10,
            up:{rect:[cx,86,btnWidth,btnHeight]},
            down:{rect:[cx,86,btnWidth,btnHeight]}
        });

        btn.addEventListener(events[2], function(e)
        {
            callback();
        });
        return btn;
    };

    FriendContainer.prototype.addFriendInfo = function(friend){
        var px = 70 + (250+7)*this.friendsContainer.getNumChildren();
        var py = 48;
        var FriendInfo = new friendInfo({x:px,y:py});
        FriendInfo.Show(friend);
        this.friendsContainer.addChild(FriendInfo);
    };

    FriendContainer.prototype.getZxInfoBtn = function(){
        var py = 42;
        var btn = new Q.Button({image:LoadedImages.managerui.image, x:75,y:py,width:this.iconWidth,height:this.iconHeight,
            up:{rect:[0,0,this.iconWidth,this.iconHeight]},
            down:{rect:[205,0,this.iconWidth,this.iconHeight]}
        });
        btn.addEventListener(events[2],function(e){
			if(curFloor == 1)
				Views.MainView.showPersonalInfo();
			else{
				alert('只有1楼可以装修!');
				Views.MainView.HideMessageContainer();
			}
            
        });
        return btn;
    };
	
	FriendContainer.prototype.getWpInfoBtn = function(){
        var py = 42 + this.iconHeight;
        var btn = new Q.Button({image:LoadedImages.managerui.image, x:75,y:py,width:this.iconWidth,height:this.iconHeight,
            up:{rect:[0,65,this.iconWidth,this.iconHeight]},
            down:{rect:[205,65,this.iconWidth,this.iconHeight]}
        });
        btn.addEventListener(events[2],function(e){
            Views.MainView.showWupinInfo();
        });
        return btn;
    };
	
	FriendContainer.prototype.getTzInfoBtn = function(){
        var py = 42 + this.iconHeight*2;
        var btn = new Q.Button({image:LoadedImages.managerui.image, x:75,y:py,width:this.iconWidth,height:this.iconHeight,
            up:{rect:[0,130,this.iconWidth,this.iconHeight]},
            down:{rect:[205,130,this.iconWidth,this.iconHeight]}
        });
        btn.addEventListener(events[2],function(e){
            Views.MainView.showTouziViewContainer();
        });
        return btn;
    };
	
	FriendContainer.prototype.getMyInfoBtn = function(){
        var py = 42 + this.iconHeight*3;
        var btn = new Q.Button({image:LoadedImages.managerui.image, x:75,y:py,width:this.iconWidth,height:this.iconHeight,
            up:{rect:[0,195,this.iconWidth,this.iconHeight]},
            down:{rect:[205,195,this.iconWidth,this.iconHeight]}
        });
        btn.addEventListener(events[2],function(e){
            Views.MainView.showLeagueManageContrainer();
        });
        return btn;
    };
	
	FriendContainer.prototype.getXxInfoBtn = function(){
        var py = 42 + this.iconHeight*4;
        var btn = new Q.Button({image:LoadedImages.managerui.image, x:75,y:py,width:this.iconWidth,height:this.iconHeight,
            up:{rect:[0,260,this.iconWidth,this.iconHeight]},
            down:{rect:[205,260,this.iconWidth,this.iconHeight]}
        });
        btn.addEventListener(events[2],function(e){
            Views.MainView.showXinxiInfo();
        });
        return btn;
    };
	
	FriendContainer.prototype.getCzInfoBtn = function(){
        var py = 42 + this.iconHeight*5;
        var btn = new Q.Button({image:LoadedImages.managerui.image, x:75,y:py,width:this.iconWidth,height:this.iconHeight,
            up:{rect:[0,325,this.iconWidth,this.iconHeight]},
            down:{rect:[205,325,this.iconWidth,this.iconHeight]}
        });
        btn.addEventListener(events[2],function(e){
            Views.MainView.showChongzhiInfo();
        });
        return btn;
    };

    FriendContainer.prototype.getAddFriendBtn = function(){
        var py = 305 + this.iconHeight;
        var btn = new Q.Button({image:LoadedImages.friendui.image, x:20,y:py,width:this.iconWidth,height:this.iconHeight,
            up:{rect:[961,this.iconHeight,this.iconWidth,this.iconHeight]},
            down:{rect:[961,this.iconHeight,this.iconWidth,this.iconHeight]}
        });
        btn.addEventListener(events[2],function(e){
            Views.MainView.showFriendAddContainer();
        });
        return btn;
    };

    FriendContainer.prototype.getRandomFriendBtn = function(){
        var py = 305 + this.iconHeight*2;
        var btn = new Q.Button({image:LoadedImages.friendui.image, x:20,y:py,width:this.iconWidth,height:this.iconHeight,
            up:{rect:[961,this.iconHeight*2,this.iconWidth,this.iconHeight]},
            down:{rect:[961,this.iconHeight*2,this.iconWidth,this.iconHeight]}
        });

        btn.addEventListener(events[2],function(e){
            Sockets.send_ReqVisitRandom();
        });
        return btn;
    };

    FriendContainer.prototype.getBg = function(){
        return new Q.Bitmap({image:LoadedImages.managerui.image,x:0,y:0,width:this.width,height:this.height,
                                rect:[414,0,this.width,this.height]});
    };
    return FriendContainer;
});