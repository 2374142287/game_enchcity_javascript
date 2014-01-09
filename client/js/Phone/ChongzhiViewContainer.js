/**
 * Created with JetBrains WebStorm.
 * User: john
 * Date: 13-2-15
 * Time: 下午7:20
 * To change this template use File | Settings | File Templates.
 */
define(['jquery',winSize+'/BackBtn',winSize+"/ChongzhiInfo"],function($,BackBtn,chongzhiInfo){
    var ChongzhiViewContainer = function()
    {
        ChongzhiViewContainer.superClass.constructor.call(this);
        this.init();
    };

    Q.inherit(ChongzhiViewContainer, Q.DisplayObjectContainer);

    ChongzhiViewContainer.prototype.init = function(){
        this.width = Views.DisplayObjectsDefine.displayer.divWinWidth;
        this.height = Views.DisplayObjectsDefine.displayer.divWinHeight+70;

        this.addChildAt(this.getBg(),0);
		
        var backBtn = new BackBtn({x:21,y:15},function(){
            Views.MainView.HideFitmentInfo();
            Views.MainView.showFriendContainer();
        });
        //this.addChildAt(backBtn,1);
		
		this.addChildAt(this.getTitleNameBg(),1);
		this.addChildAt(this.getTitleBg(),1);
		this.addChildAt(this.getRechargeInfo(),1);
		this.addChildAt(this.getMainListBg(),1);
		this.rechargeContainer = new Q.DisplayObjectContainer({x:22,y:138,width:290,height:290});
        this.addChildAt(this.rechargeContainer,2);
		this.addChildAt(this.getRechargeBtn(),1);
    };

    ChongzhiViewContainer.prototype.getBg = function(){
        var bg = new Q.Bitmap({image:LoadedImages.managerui.image,x:0,y:50,rect:[414,0,this.width,this.height]});
        return bg;
    };

	ChongzhiViewContainer.prototype.getTitleNameBg = function(){
		var width = 160;
        var height = 80;
		var container = new Q.DisplayObjectContainer({x:90,y:0,width:width,height:height});
        var bg = new Q.Bitmap({image:LoadedImages.managechongzhi.image,x:0,y:0,width:width,height:height,
						rect:[0,0,width,height]});
		container.addChildAt(bg,0);
        return container;
    };
	ChongzhiViewContainer.prototype.getTitleBg = function(){
		var width = 300;
        var height = 30;
		var container = new Q.DisplayObjectContainer({x:20,y:80,width:width,height:height});
        var bg = new Q.Bitmap({image:LoadedImages.managechongzhi.image,x:0,y:0,width:width,height:height,
						rect:[0,130,width,height]});
		container.addChildAt(bg,0);
        return container;
    };
	
	ChongzhiViewContainer.prototype.getRechargeInfo = function(callback){
		var text = "拥有游戏点数：999点";
		var butWidth = 300;
		var butHeight = 40;
		var container = new Q.DisplayObjectContainer({x:18,y:110,width:butWidth,height:butHeight});
        var bg = new Q.Bitmap({image:LoadedImages.managechongzhi.image,x:0,y:0,width:butWidth,height:butHeight,
						rect:[0,160,butWidth,butHeight]});
		var txt = new Q.Text({font:"22px '微软雅黑'",x:0,y:4,width:butWidth,height:butHeight,color:"#C00D02",text:text,textAlign:"center"});
		container.addChildAt(bg,0);
		container.addChildAt(txt,1);
		return container;
		
    };
	
	
	ChongzhiViewContainer.prototype.getMainListBg = function(){
		var width = 290;
        var height = 285;
		var container = new Q.DisplayObjectContainer({x:22,y:155,width:width,height:height});
		var bg = new Q.Bitmap({image:LoadedImages.managezxui.image,x:0,y:0,width:width,height:height,
						rect:[0,0,width,height]});
		container.addChildAt(bg,1);
        return container;
    };

	ChongzhiViewContainer.prototype.getRechargeBtn = function(){
		var butWidth = 145;
		var butHeight = 65;
        var btn = new Q.Button({image:LoadedImages.managechongzhi.image, x:95,y:448,width:butWidth,height:butHeight,
            up:{rect:[160,0,butWidth,butHeight]},
            down:{rect:[160,65,butWidth,butHeight]}
        });
        btn.addEventListener(events[2],function(e){
            Sockets.send_ReqVisitRandom();
        });
        return btn;
    };
		
	//显示设施详情
	ChongzhiViewContainer.prototype.showChongzhiList = function(){
		this.rechargeContainer.removeAllChildren();
		var rechargeList = Views.MainView.ToolBarContainer.friendManager;
		var iconWidth = 270;
		var iconHeight = 45;
		var iconpHeight = 8;
		var mx = 5;
		var my = 30;
		var px = 10;
		var py;
		for(var i=0; i<5;i++){
			var rc = rechargeList.friends[i];
			py = 30 + (iconHeight+iconpHeight)*i;
			this.addChongzhiInfo(rc,px,py);
		}
	};
	
	ChongzhiViewContainer.prototype.addChongzhiInfo = function(message,px,py){
        var ChongzhiInfo = new chongzhiInfo({x:px,y:py},message);
		this.rechargeContainer.addChild(ChongzhiInfo);
    };
    return ChongzhiViewContainer;
});