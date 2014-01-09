/**
 * Created with JetBrains WebStorm.
 * User: john
 * Date: 13-2-15
 * Time: 下午7:20
 * To change this template use File | Settings | File Templates.
 */
define(['jquery',winSize+'/BackBtn',winSize+"/FriendInfo"],function($,BackBtn,friendInfo){
    var XinxiViewContainer = function()
    {
        XinxiViewContainer.superClass.constructor.call(this);
        this.init();
    };

    Q.inherit(XinxiViewContainer, Q.DisplayObjectContainer);

    XinxiViewContainer.prototype.init = function(){
        this.width = Views.DisplayObjectsDefine.displayer.divWinWidth;
        this.height = Views.DisplayObjectsDefine.displayer.divWinHeight;

        this.addChildAt(this.getBg(),0);
		
        var backBtn = new BackBtn({x:21,y:15},function(){
            Views.MainView.HideFitmentInfo();
            Views.MainView.showFriendContainer();
        });
        //this.addChildAt(backBtn,1);
		this.castleBtn = this.getCastleInfoBtn();
		this.buildBtn = this.getBuildInfoBtn();
		
		this.addChildAt(this.getTitleBg(),1);
		this.addChildAt(this.castleBtn,1);
		this.addChildAt(this.buildBtn,1);
		this.addChildAt(this.getMainListBg(),1);
		this.sysinfoContainer = new Q.DisplayObjectContainer({x:22,y:118,width:290,height:275});
        this.addChildAt(this.sysinfoContainer,2);
    };

    XinxiViewContainer.prototype.getBg = function(){
        var bg = new Q.Bitmap({image:LoadedImages.managerui.image,rect:[414,0,this.width,this.height]});
        return bg;
    };

	XinxiViewContainer.prototype.getTitleBg = function(){
		var width = 120;
        var height = 40;
		var container = new Q.DisplayObjectContainer({x:105,y:20,width:width,height:height});
        var bg = new Q.Bitmap({image:LoadedImages.managexinxi.image,x:0,y:0,width:120,height:40,
						rect:[0,0,width,height]});
		container.addChildAt(bg,0);
        return container;
    };
	
	XinxiViewContainer.prototype.getMainListBg = function(){
		var width = 290;
        var height = 285;
		var container = new Q.DisplayObjectContainer({x:22,y:128,width:width,height:height});
		var bg = new Q.Bitmap({image:LoadedImages.managezxui.image,x:0,y:0,width:width,height:height,
						rect:[0,0,width,height]});
		container.addChildAt(bg,1);
        return container;
    };
	//城堡信息
	XinxiViewContainer.prototype.getCastleInfoBtn = function(){
        var self = this;
        return this.getSysinfoBtn(0,function(){
			self.castleBtn.changeState('down');
			self.buildBtn.changeState('up');
            self.showCastleinfo();
        });
    };
	//建造信息
	XinxiViewContainer.prototype.getBuildInfoBtn = function(){
        var self = this;
        return this.getSysinfoBtn(1,function(){
			self.castleBtn.changeState('up');
			self.buildBtn.changeState('down');
            self.showBuildinfo();
        });
    };
	XinxiViewContainer.prototype.getSysinfoBtn = function(id,callback){
		var butWidth = 145;
		var butHeight = 45;
		var butcMargin = 5;
		var px = 20+(butWidth+butcMargin)*id;
		var py = 72;
		var cx = 120+butWidth*id;
		var cy = 0;
        var btn = new Q.Button({image:LoadedImages.managexinxi.image, x:px,y:py,width:butWidth,height:butHeight,
            up:{rect:[cx,cy,butWidth,butHeight]},
            down:{rect:[cx,cy+butHeight,butWidth,butHeight]}
        });
        btn.addEventListener(events[2],function(e){
			callback();
        });
        return btn;
    };
	
	//显示城堡详情
	XinxiViewContainer.prototype.showCastleinfo = function(){
		this.sysinfoContainer.removeAllChildren();
		var facilityList = Views.MainView.GameView.MapWorker.devList;
        var furnitureList = Views.MainView.GameView.MapWorker.furnList;
		this.addSysInfo("城堡可建造面积:" + (144 - facilityList.length), 0);
		this.addSysInfo("当前城堡知名度:0",1);
		this.addSysInfo("当前城堡星级:0",2);
		this.addSysInfo("设施店铺建造数:" + furnitureList.length, 3);
		this.addSysInfo("抵达 龙城 城市余3分钟",4);
		this.addSysInfo("当前游客数量:1",5);
		this.addSysInfo("盟友数量:0",6);
		this.addSysInfo("已雇佣职位数:0",7);
	};
	//显示建造详情
	XinxiViewContainer.prototype.showBuildinfo = function(){
		this.sysinfoContainer.removeAllChildren();
		var ft = Views.MainView.GameView.MapWorker.furnList;
        var ans = new Array();
        for (i=0;i<33;i++) ans.push({n:'', c:0});
        console.log(ft);
        for (i=0; i< ft.length;i++){
            ans[ft[i].devId].c ++;
            ans[ft[i].devId].n = ft[i].devName;
        }
        var j = 0;
        for (i=0;i<ans.length;i++){
            if (ans[i].c){
                this.addSysInfo(ans[i].n + ":" + ans[i].c + "个", j);
                j++
            }
        }
	};
	
	XinxiViewContainer.prototype.addSysInfo = function(text,id){
		var txtWidth = 270;
		var txtHeight = 30;
		var txtpHeight = 5;
		var px = 20;
		var py = 20+(txtHeight+txtpHeight)*id;
        var txt = new Q.Text({font:"20px arial",x:px,y:py,width:txtWidth,height:txtHeight,color:"#333",text:text,textAlign:"left"});
		this.sysinfoContainer.addChild(txt);
    };
    return XinxiViewContainer;
});