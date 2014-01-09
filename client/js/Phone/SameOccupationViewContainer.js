/**
 * Created with JetBrains WebStorm.
 * User: john
 * Date: 13-3-15
 * Time: 下午7:22
 * To change this template use File | Settings | File Templates.
 */
define([winSize+'/SameOccupationInfo'],
    function(sameOccupationInfo){
        var SameOccupationViewContainer = function(props)
        {
            SameOccupationViewContainer.superClass.constructor.call(this,props);
            this.init();
        };

        Q.inherit(SameOccupationViewContainer, Q.DisplayObjectContainer);

        SameOccupationViewContainer.prototype.init = function(){
            this.width = Views.DisplayObjectsDefine.displayer.divViewWidth;
            this.height = Views.DisplayObjectsDefine.displayer.divViewHeight;
			this.x=0;
			this.y=108;

			this.leagueAddBtn = this.getLeagueAddBtn();
			this.addChildAt(this.leagueAddBtn,1);
			//this.addChildAt(this.getSameOccupationItemBtn(),1);
			
            this.sameOccupationContainer = new Q.DisplayObjectContainer({x:22,y:0,width:290,height:275});
       		this.addChildAt(this.sameOccupationContainer,2);
			//this.sameOccupationContainer.addChildAt(this.getSameOccupationItemBtn(),0);
        };
		
		SameOccupationViewContainer.prototype.getSameOccupationItemBtn = function(){
			var btnWidth = 265;
			var btnHeight = 35;
			var btnpMargin = 5;
			var btncMargin = 15;
			var cx = 134;
			var cy = 130;
			var px = 10;
			var py = 10;
			var btn = new Q.Button({image:LoadedImages.manageleague.image,x:px,y:py, width:btnWidth, height:btnHeight,
				up:{rect:[cx,cy,btnWidth,btnHeight]},
				down:{rect:[cx,cy+btnHeight,btnWidth,btnHeight]}
			});
			btn.addEventListener(events[2], function(e)
			{
				alert(12345);
			});
			return btn;
		};
		
		//同行底部添加按钮
		SameOccupationViewContainer.prototype.getLeagueAddBtn = function(){
			var self = this;
			return this.getAddBtn(function(){
				self.leagueAddBtn.changeState('down');
				//弹出添加对话框
			});
		};
		SameOccupationViewContainer.prototype.getAddBtn = function(callback){
			var iconWidth = 130;
			var iconHeight = 65;
			var px = 102;
			var py = 290;
			var btn = new Q.Button({image:LoadedImages.manageleague.image, x:px, y:py, width:iconWidth, height:iconHeight,
				up:{rect:[365,0,iconWidth,iconHeight]},
				down:{rect:[365,60,iconWidth,iconHeight]}
			});
			btn.addEventListener(events[2], function(e)
			{
				//e.eventTarget.changeState('down');
				callback();
			});
			return btn;
		};

        //显示设施详情
		SameOccupationViewContainer.prototype.showSameOccupationList = function(facilityType){
			this.sameOccupationContainer.removeAllChildren();
			//var sameOccuList = Views.MainView.ToolBarContainer.friendManager;
			var sameOccuList=[
                
                {
                    queueid : 1,
                    queuetype : '主线任务',
                    queuecomplate : "20",
                    queuecontent : "调制酒水一次1"
                },
                {
                    queueid : 2,
                    queuetype : '主线任务',
                    queuecomplate : "20",
                    queuecontent : "收取小费一次2"
                },
                {
                    queueid : 3,
                    queuetype : '主线任务',
                    queuecomplate : "20",
                    queuecontent : "收取小费一次3"
                },
				{
                    queueid : 4,
                    queuetype : '主线任务',
                    queuecomplate : "20",
                    queuecontent : "拜访好友一次4"
                }
            ];
			var btnHeight = 35;
			var btnpMargin = 5;
			var px=10;
			for(var i=0; i<sameOccuList.length;i++){
				var py = 5 + (btnHeight + btnpMargin)*i;
				var sameoccupation = sameOccuList[i];//sameOccuList.friends[i];
				this.addSameOccuInfo(sameoccupation,px,py);
			}
		};
		
		SameOccupationViewContainer.prototype.addSameOccuInfo = function(sameoccupation,px,py){
			var self = this;
			var SameOccupationInfo = new sameOccupationInfo({x:px,y:py});
			SameOccupationInfo.Show(sameoccupation);
			self.sameOccupationContainer.addChild(SameOccupationInfo);
		};
		
        return SameOccupationViewContainer;
    });

