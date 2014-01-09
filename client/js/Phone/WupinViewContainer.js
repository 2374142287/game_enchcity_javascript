/**
 * Created with JetBrains WebStorm.
 * User: john
 * Date: 13-2-15
 * Time: 下午7:20
 * To change this template use File | Settings | File Templates.
 */
define(['jquery',winSize+'/BackBtn',winSize+"/WupinInfo"],function($,BackBtn,wupinInfo){
    var WupinViewContainer = function()
    {
        WupinViewContainer.superClass.constructor.call(this);
        this.init();
    };

    Q.inherit(WupinViewContainer, Q.DisplayObjectContainer);

    WupinViewContainer.prototype.init = function(){
        this.width = Views.DisplayObjectsDefine.displayer.divWinWidth;
        this.height = Views.DisplayObjectsDefine.displayer.divWinHeight;
        if ("undefined" == typeof global_wps){
            global_wps = [{id:1,price:5000,name:"鱼翅",count:5},
                        {id:11,price:500,name:"牛奶",count:5},
                        {id:9,price:1000,name:"咖啡豆",count:5},
                        {id:16,price:500,name:"三明治",count:5},
                        {id:4,price:1000,name:"伏特加",count:5}];
        }
        this.addChildAt(this.getBg(),0);
		
        var backBtn = new BackBtn({x:21,y:15},function(){
            Views.MainView.HideFitmentInfo();
            Views.MainView.showFriendContainer();
        });
        //this.addChildAt(backBtn,1);
		
		this.addChildAt(this.getTitleBg(),1);
		this.addChildAt(this.getWpnameBtn(),1);
		this.addChildAt(this.getWupinListBg(),1);
		this.wupinContainer = new Q.DisplayObjectContainer({x:22,y:118,width:290,height:275});
        this.addChildAt(this.wupinContainer,2);
		this.addChildAt(this.getBuyBtn(),1);
        setInterval(this.reflashWupinInfo, 30*60*1000);
    };

    WupinViewContainer.prototype.getBg = function(){
        var bg = new Q.Bitmap({image:LoadedImages.managerui.image,rect:[414,0,this.width,this.height]});
        return bg;
    };

	WupinViewContainer.prototype.getTitleBg = function(){
		var width = 120;
        var height = 40;
		var container = new Q.DisplayObjectContainer({x:118,y:15,width:width,height:height});
        var bg = new Q.Bitmap({image:LoadedImages.managewupin.image,x:0,y:0,width:120,height:40,
						rect:[0,0,width,height]});
		container.addChildAt(bg,0);
        return container;
    };
	
	WupinViewContainer.prototype.getWupinListBg = function(){
		var width = 290;
        var height = 285;
		var container = new Q.DisplayObjectContainer({x:22,y:102,width:width,height:height});
		var bg = new Q.Bitmap({image:LoadedImages.managezxui.image,x:0,y:0,width:width,height:height,
						rect:[0,0,width,height]});
		container.addChildAt(bg,1);
        return container;
    };
	
	WupinViewContainer.prototype.getWpnameBtn = function(callback){
		var width = 250;
		var height = 30;
		var container = new Q.DisplayObjectContainer({x:50,y:70,width:width,height:height});
        var bg = new Q.Bitmap({image:LoadedImages.managewupin.image,x:0,y:0,width:width,height:height,
						rect:[0,40,width,height]});
		container.addChildAt(bg,0);
        return container;
    };
	
	WupinViewContainer.prototype.getBuyBtn = function(){
		var butWidth = 145;
		var butHeight = 65;
        var btn = new Q.Button({image:LoadedImages.managewupin.image, x:100,y:395,width:butWidth,height:butHeight,
            up:{rect:[0,70,butWidth,butHeight]},
            down:{rect:[0,135,butWidth,butHeight]}
        });
        var self = this;
        btn.addEventListener(events[2],function(e){
            //Sockets.send_ReqVisitRandom();
            self.buyWupin();
        });
        return btn;
    };

	WupinViewContainer.prototype.buyWupin = function(){
        var self = this;
        Views.MainView.showDialogYesAndNo(
            "购买后请在屏幕上点击相应的建筑放置该物品，否则消费失败，确定购买？",
            function(){
                Views.MainView.HideDialogYesAndNo();
                Views.MainView.HideWupinInfo();
                Views.MainView.GameView.isUseWupin = true;

                var wpid = currentSelectedWpItem.id;
                for(var i=0; i<global_wps.length;i++){
                    if (global_wps[i].id == wpid){
                        global_wps[i].count --;
                    }
                }
            },
            function(){Views.MainView.HideDialogYesAndNo();currentSelectedWpItem = null;}
        )
    }
	//显示物品详情
	WupinViewContainer.prototype.showWupinList = function(){
		this.wupinContainer.removeAllChildren();
		var wupinList = Views.MainView.ToolBarContainer.wupinManager;
		var btnHeight = 40;
        var btnpMargin = 0;
		var px=10;
        var py=0;
        //TODO [dk647] use wupinManager

		for(var i=0; i<global_wps.length;i++){
			//var wp = wupinList.Wupins[i];
			py = 0 + (btnHeight + btnpMargin)*i;
            if (trace) {console.log(global_wps);}
			this.addWupinInfo(global_wps[i],px,py);
		}
	};
	
	WupinViewContainer.prototype.addWupinInfo = function(data,px,py){
        var WupinInfo = new wupinInfo({x:px,y:py},data);
		this.wupinContainer.addChild(WupinInfo);
    };
    WupinViewContainer.prototype.removeWupinInfo = function(){
        this.wupinContainer.removeAllChildren();
    };

    WupinViewContainer.prototype.reflashWupinInfo = function(){
        var btnHeight = 40;
        var btnpMargin = 0;
        var px=10;
        var py=0;
        //this.removeWupinInfo();
        for(var i=0; i<global_wps.length;i++){
            global_wps[i].count = Math.ceil(Math.random()*10);
        //    py = 0 + (btnHeight + btnpMargin)*i;
        //    this.addWupinInfo(this.wps[i],px,py);
        }
    }
    return WupinViewContainer;
});