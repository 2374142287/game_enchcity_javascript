/**
 * Created with JetBrains WebStorm.
 * User: john
 * Date: 13-2-15
 * Time: 下午7:20
 * To change this template use File | Settings | File Templates.
 */
define(['jquery',winSize+'/BackBtn',winSize+"/FriendInfo"],function($,BackBtn,friendInfo){
    var PersonalInfo = function()
    {
        PersonalInfo.superClass.constructor.call(this);
        this.init();
    };

    Q.inherit(PersonalInfo, Q.DisplayObjectContainer);

    PersonalInfo.prototype.init = function(){
		
        this.width = Views.DisplayObjectsDefine.displayer.divWinWidth;
        this.height = Views.DisplayObjectsDefine.displayer.divWinHeight;
		
		//this.mainContainer = new Q.DisplayObjectContainer({x:0,y:0,width:400,height:505});
		//this.addChildAt(this.mainContainer,0);
        this.addChildAt(this.getBg(),0);
		
        var backBtn = new BackBtn({x:21,y:15},function(){
            Views.MainView.HideFitmentInfo();
            Views.MainView.showFriendContainer();
        });
        //this.addChildAt(backBtn,1);
		
		this.addChildAt(this.getTitleBg(),1);
		this.addChildAt(this.fillFacilityBtn(),1);
		this.addChildAt(this.fillShopBtn(),1);
		this.addChildAt(this.fillDecorationBtn(),1);
		this.addChildAt(this.getFacilityListBg(),1);
		this.facilityContainer = new Q.DisplayObjectContainer({x:22,y:118,width:290,height:275});
        this.addChildAt(this.facilityContainer,2);
		this.addChildAt(this.getMoveBtn(),1);
		this.addChildAt(this.getDeleteBtn(),1);
    };

    PersonalInfo.prototype.getBg = function(){
        var bg = new Q.Bitmap({image:LoadedImages.managerui.image,rect:[414,0,this.width,this.height]});
        return bg;
    };

	PersonalInfo.prototype.getTitleBg = function(){
		var width = 120;
        var height = 40;
		var container = new Q.DisplayObjectContainer({x:118,y:15,width:width,height:height});
        var bg = new Q.Bitmap({image:LoadedImages.managezxui.image,x:0,y:0,width:120,height:40,
						rect:[600,0,width,height]});
		container.addChildAt(bg,0);
        return container;
    };
	
	PersonalInfo.prototype.getFacilityListBg = function(){
		var width = 290;
        var height = 285;
		var container = new Q.DisplayObjectContainer({x:22,y:118,width:width,height:height});
		var bg = new Q.Bitmap({image:LoadedImages.managezxui.image,x:0,y:0,width:width,height:height,
						rect:[0,0,width,height]});
		container.addChildAt(bg,1);
        return container;
    };
	
	/*PersonalInfo.prototype.getFacilityInfoContainer = function(){
		var width = 290;
        var height = 285;
		var container = new Q.DisplayObjectContainer({x:22,y:118,width:width,height:height});
		showFacilityList();
        return container;
    };*/
	
	PersonalInfo.prototype.fillFacilityBtn = function(){
        var self = this;
        return this.getFacilityBtn(function(){
            self.showFacilityList("设施");
        });
    };
	PersonalInfo.prototype.getFacilityBtn = function(callback){
		var butWidth = 100;
		var butHeight = 50;
        var btn = new Q.Button({image:LoadedImages.managezxui.image, x:15,y:62,width:butWidth,height:butHeight,
            up:{rect:[295,0,butWidth,butHeight]},
            down:{rect:[295,55,butWidth,butHeight]}
        });
        btn.addEventListener(events[2],function(e){
			callback();
        });
        return btn;
    };
	
	PersonalInfo.prototype.fillShopBtn = function(){
        var self = this;
        return this.getShopBtn(function(){
            self.showFacilityList("店铺");
        });
    };
	PersonalInfo.prototype.getShopBtn = function(callback){
		var butWidth = 100;
		var butHeight = 50;
        var btn = new Q.Button({image:LoadedImages.managezxui.image, x:120,y:62,width:butWidth,height:butHeight,
            up:{rect:[395,0,butWidth,butHeight]},
            down:{rect:[395,55,butWidth,butHeight]}
        });
        btn.addEventListener(events[2],function(e){
			callback();
        });
        return btn;
    };
	
	PersonalInfo.prototype.fillDecorationBtn = function(){
        var self = this;
        return this.getDecorationBtn(function(){
            self.showFacilityList("装饰");
        });
    };
	PersonalInfo.prototype.getDecorationBtn = function(callback){
		var butWidth = 100;
		var butHeight = 50;
        var btn = new Q.Button({image:LoadedImages.managezxui.image, x:225,y:62,width:butWidth,height:butHeight,
            up:{rect:[495,0,butWidth,butHeight]},
            down:{rect:[495,55,butWidth,butHeight]}
        });
        btn.addEventListener(events[2],function(e){
			callback("");
        });
        return btn;
    };
	
	PersonalInfo.prototype.getMoveBtn = function(){
		var butWidth = 105;
		var butHeight = 60;
        var btn = new Q.Button({image:LoadedImages.managezxui.image, x:60,y:408,width:butWidth,height:butHeight,
            up:{rect:[295,110,butWidth,butHeight]},
            down:{rect:[405,110,butWidth,butHeight]}
        });
        btn.addEventListener(events[2],function(e){
			Views.MainView.GameView.isMoved = true;
			Views.MainView.HideMessageContainer();
        });
        return btn;
    };
	
	PersonalInfo.prototype.getDeleteBtn = function(){
		var butWidth = 105;
		var butHeight = 60;
        var btn = new Q.Button({image:LoadedImages.managezxui.image, x:175,y:408,width:butWidth,height:butHeight,
            up:{rect:[295,175,butWidth,butHeight]},
            down:{rect:[405,175,butWidth,butHeight]}
        });
        btn.addEventListener(events[2],function(e){
			Views.MainView.GameView.isDeleted = true;
			Views.MainView.HideMessageContainer();
        });
        return btn;
    };
	
	//设施详情背景
	PersonalInfo.prototype.getInfoContainer = function(){
		var width = 400;
        var height = 50;
		var container = new Q.DisplayObjectContainer({x:0,y:290,width:width,height:height});
        var bg = new Q.Bitmap({image:LoadedImages.managezxui.image,x:0,y:0,width:width,height:height,
						rect:[295,240,width,height]});
		container.addChildAt(bg,0);
        return container;
    };
	
	//显示设施详情
	PersonalInfo.prototype.showFacilityList = function(facilityType){
		this.facilityContainer.removeAllChildren();
		var facilityList = Views.MainView.ToolBarContainer.friendManager;
		var itemindex = 0;
		var iconWidth = 150;
		var iconHeight = 140;
		var mx = 5;
		var my = 30;
		var px = 0;
		var py = 0;
		var tempIndex = 0;
		for(var i=0; i<facilityList.friends.length;i++){
			var fy = facilityList.friends[i];
			if(fy.devTypeName == facilityType){
				if((tempIndex%2)>0)
				{
					px = iconWidth+mx;
					itemindex++;
				} else {
					px = 10+mx;
					py = iconHeight*itemindex+my;
				}
				trace(">>>>>>>>>>>>>>px:"+px+">>>>>>>>>py:"+py);
				this.addFacilityInfo(fy,px,py);
				//this.facilityContainer.addChildAt(this.getBtn(px,py), 0);
				tempIndex++;
			}
		}
	};
	
	PersonalInfo.prototype.addFacilityInfo = function(facility,px,py){
        var FriendInfo = new friendInfo({x:px,y:py});
        FriendInfo.Show(facility);
		this.facilityContainer.addChild(FriendInfo);
    };
    return PersonalInfo;
});