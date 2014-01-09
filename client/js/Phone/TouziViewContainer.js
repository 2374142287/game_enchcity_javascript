/**
 * Created with JetBrains WebStorm.
 * User: john
 * Date: 13-2-15
 * Time: 下午7:20
 * To change this template use File | Settings | File Templates.
 */
define(['jquery',winSize+"/TouziInfo",'TempItem'],function($,touziInfo,TempItem){
    var TouziViewContainer = function()
    {
        TouziViewContainer.superClass.constructor.call(this);
        this.init();
    };

    Q.inherit(TouziViewContainer, Q.DisplayObjectContainer);

    TouziViewContainer.prototype.init = function(){
		
        this.width = Views.DisplayObjectsDefine.displayer.divWinWidth;
        this.height = Views.DisplayObjectsDefine.displayer.divWinHeight;
		
		this.citem = new TempItem();
		
		this.addChildAt(this.getBg(),0);
		this.addChildAt(this.getTitleBg(),1);
		this.addChildAt(this.getMainListBg(),1);
		this.touziListContainer = new Q.DisplayObjectContainer({x:22,y:80,width:290,height:275});
        this.addChildAt(this.touziListContainer,2);
		this.addChildAt(this.fillTouziBtn(),1);
    };

    TouziViewContainer.prototype.getBg = function(){
        var bg = new Q.Bitmap({image:LoadedImages.managerui.image,rect:[414,0,this.width,this.height]});
        return bg;
    };

	TouziViewContainer.prototype.getTitleBg = function(){
		var width = 200;
        var height = 40;
		var container = new Q.DisplayObjectContainer({x:65,y:30,width:width,height:height});
        var bg = new Q.Bitmap({image:LoadedImages.managetouzi.image,x:0,y:0,width:width,height:height,
						rect:[145,0,width,height]});
		container.addChildAt(bg,0);
        return container;
    };
	
	TouziViewContainer.prototype.getMainListBg = function(){
		var width = 290;
        var height = 285;
		var container = new Q.DisplayObjectContainer({x:22,y:85,width:width,height:height});
		var bg = new Q.Bitmap({image:LoadedImages.managezxui.image,x:0,y:0,width:width,height:height,
						rect:[0,0,width,height]});
		container.addChildAt(bg,1);
        return container;
    };
	
	TouziViewContainer.prototype.fillTouziBtn = function(){
		var self = this;
        return this.getTouziBtn(function(){
			Views.MainView.showDialogYesAndNo(
				"投资该项目"+currentSelectedTzItem.effect+",是否确认要投资？",
				function(){
					//self.citem.castleId =currentSelectedTzItem.castleId;
					//this.citem.createdate = new Date();
					//this.citem.state = 0;
					
					var currenttime = new Date().toLocaleTimeString();
					self.citem.itemid =currentSelectedTzItem.itemId;
					self.citem.itemMoney =currentSelectedTzItem.itemMoney;
					
					Sockets.send_reqTouziStart(self.citem);
					Player.money -= currentSelectedTzItem.itemMoney;
					Views.MainView.InfoBarContainer.reflashData();
					
					//界面
					var touziList = Views.MainView.ToolBarContainer.itemManager.items;
					for(var i=0; i<touziList.length;i++){
						var fy = touziList[i];
						if(fy.id == currentSelectedTzItem.id){
							var name = fy.itemName;
							var money = fy.itemMoney;
							Views.MainView.ToolBarContainer.itemInvestmentManager.add(fy);
							fy.itemName ="项目进行中";
							fy.itemMoney = currenttime;
							//var timer1 = setTimeout(startInvestmentItem(fy.id),1000*60*1);

                            //TODO: del //
							var lasttime = 1000*60*5;
							var bmp = new Q.Bitmap({image:LoadedImages.manageleague.image,x:0,y:10,width:30,height:30,rect:[0,0,30,30]});
        					//bmp.mask = this.getRectificaterMask(10);
							var timer = new Q.Timer(60);
							timer.addListener(Q.Tween);
							timer.start();
							trace("rectificate Start allTime:"+lasttime);
							Q.Tween.to(bmp, {y:0}, {time:lasttime,
							onComplete:function(tween)
								{
									trace("rectificate Next");
									fy.itemName=name;
									fy.itemMoney=money;
                                    Sockets.send_reqTouziEnd(self.citem);
									//startInvestmentItem(fy.id);
									//fy.itemName ="项目进行中";
									//fy.itemMoney = currenttime;
									//Views.MainView.startInvestmentItem(fy.id);
									timer.stop();
							}});
							break;
						}
					}
					Views.MainView.HideDialogYesAndNo();
					Views.MainView.HideMessageContainer();
					//Views.MainView.showTouziViewContainer();
				},
				function(){
					Views.MainView.HideDialogYesAndNo();
				}
			);
       });
    };
	TouziViewContainer.prototype.getTouziBtn = function(callback){
		var butWidth = 145;
		var butHeight = 65;
        var btn = new Q.Button({image:LoadedImages.managetouzi.image, x:100,y:388,width:butWidth,height:butHeight,
            up:{rect:[0,0,butWidth,butHeight]},
            down:{rect:[0,55,butWidth,butHeight]}
        });
        btn.addEventListener(events[2],function(e){
			callback();
        });
        return btn;
    };
		
	//显示设施详情
	TouziViewContainer.prototype.showTouziList = function(facilityType){
		this.touziListContainer.removeAllChildren();
		var touziList = Views.MainView.ToolBarContainer.itemManager.items;
		var my = 35;
		var px = 10;
		var py = 0;
		var icnpMargin = 8;
		for(var i=0; i<touziList.length;i++){
			py = 20+(icnpMargin+my)*i;
			var fy = touziList[i];
			this.addTouziInfo(fy,px,py);
		}
	};
	
	TouziViewContainer.prototype.addTouziInfo = function(fy,px,py){
        var TouziInfo = new touziInfo({x:px,y:py},fy);
		this.touziListContainer.addChild(TouziInfo);
    };
	
	TouziViewContainer.prototype.startInvestmentItem = function(itemid){
		trace("111111111111111111111111111111112222");
		var touziList1 = Views.MainView.ToolBarContainer.itemManager.items;
		var touziList2 = Views.MainView.ToolBarContainer.itemInvestmentManager.items;
		for(var i=0; i<touziList2.length;i++){
			var fy1 = touziList2[i];
			if(fy1.id == itemid){
				for(var i=0; i<touziList1.length;i++){
					var fy2 = touziList1[i];
					if(fy2.id == fy1.id){
						fy2 = fy1;
						break;
					}
				}
				break;
			}
		}
		Views.MainView.HideMessageContainer();
		Views.MainView.showTouziViewContainer();
	};
	TouziViewContainer.prototype.getIcn = function(){
		return new Q.Bitmap({image:LoadedImages.manageleague.image,x:0,y:0,width:30,height:30,rect:[0,0,30,30]});
    };
	
	TouziViewContainer.prototype.getRectificaterMask = function(py){
        var g = new Q.Graphics({width:this.width, height:this.height, x:0, y:py});//this.height});
        g.drawRect(0, 0, this.width, this.height).beginFill("#000000").endFill().cache();
        return g;
    };
    return TouziViewContainer;
});