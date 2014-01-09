/**
 * Created with JetBrains WebStorm.
 * User: john
 * Date: 13-2-17
 * Time: 下午8:45
 * To change this template use File | Settings | File Templates.
 */
define(['jquery','../TilesMap/mapWorker','TilesMap/MapGenerater','Worker'],
    function($,mapWorker,mapGenerater,Worker,DragController){
        var GameContainer = function(props)
        {
            GameContainer.superClass.constructor.call(this, props);
            this.init();
        };

        Q.inherit(GameContainer, Q.DisplayObjectContainer);

        GameContainer.prototype.init = function(){
            this.width = 1700;
            this.height = 1200;
            this.x =0;
            this.y =0;
			this.isOpen = false;//新建
			this.isMoved = false;
			this.isDeleted = false;
            this.isUseWupin = false;
            this.style = {position:"absolute",backgroundColor:"#0f0"};
            this.houseTileWidth = Views.DisplayObjectsDefine.houseTileWidth;
            this.houseTileHeight = Views.DisplayObjectsDefine.houseTileHeight;
            this.houseTileSetHeight = Views.DisplayObjectsDefine.houseTileSetHeight;
            this.tileImageWidth = Views.DisplayObjectsDefine.tileImageWidth;
			this.tempFacility=null;
            this.bgRights = [];
			//trace("this.houseTileWidth:"+this.houseTileWidth+"this.houseTileHeight:"+this.houseTileHeight+"this.houseTileSetHeight:"+this.houseTileSetHeight+"this.tileImageWidth:"+this.tileImageWidth);

            this.mapWidth = 13;
            this.mapHeight = 13;
            //this.mapWidth = Player.mapwidth;
            //this.mapHeight = Player.mapheight;
            //this.addChildAt(this.GetBg(),0);

            //modify yxiao 20130907
            this.addChildAt(this.GetBgLeft(),14);

            this.bgRights.push(this.GetBgRight0());
            this.bgRights.push(this.GetBgRight1());
            this.bgRights.push(this.GetBgRight2());
            this.bgRights.push(this.GetBgRight3());
            this.bgRights.push(this.GetBgRight4());
            this.bgRights.push(this.GetBgRight5());

            for (var i=0;i<=5;i++){
                this.addChildAt(this.bgRights[i],i*2);
                this.bgRights[i].alpha = 0;
                this.addChildAt(this.GetBlank(),i+1);
            }

            this.bgright = this.GetBgRight();//底图
            this.addChildAt(this.bgright,12);
            this.curShowLayer = this.bgright;
            this.bgRights.push(this.bgright);
            this.curChildren = 6;
            this.addChildAt(this.GetBlank(),13);
            this.addChildAt(this.GetBlank(),14);
        };

		GameContainer.prototype.reflashUI = function(index){
            var self = this;
            //self.removeChildAt(0);
            switch(index){
                case 0:
                    self.bgRights[self.curChildren].alpha = 0;
                    self.bgRights[0].alpha = 1;
                    self.getChildAt(14).alpha = 0;
                    curFloor = 0;
                    self.curChildren = 0;
                    break;
                case 1:
                    self.bgRights[self.curChildren].alpha = 0;
                    self.bgRights[1].alpha = 1;
                    self.getChildAt(14).alpha = 1;
                    curFloor = 1;
                    this.curChildren = 1;
                    break;
                case 2:
                    self.bgRights[self.curChildren].alpha = 0;
                    self.bgRights[2].alpha = 1;
                    self.getChildAt(14).alpha = 0;
                    curFloor = 2;
                    this.curChildren = 2;
                    break;
                case 3:
                    self.bgRights[self.curChildren].alpha = 0;
                    self.bgRights[3].alpha = 1;
                    self.getChildAt(14).alpha = 0;
                    curFloor = 3;
                    this.curChildren = 3;
                    break;
                case 4:
                    self.bgRights[self.curChildren].alpha = 0;
                    self.bgRights[4].alpha = 1;
                    self.getChildAt(14).alpha = 0;
                    curFloor = 4;
                    this.curChildren = 4;
                    break;
                case 5:
                    self.bgRights[self.curChildren].alpha = 0;
                    self.bgRights[5].alpha = 1;
                    self.getChildAt(14).alpha = 0;
                    curFloor = 5;
                    this.curChildren = 5;
                    break;

            }
		};
		
        GameContainer.prototype.click = function(eventx,eventy){
            //eventxy为实际屏幕坐标，
            // 先转换为QueueList在QueueContainer中的相对坐标
            var local = this.localToGlobal(0, 0);
            var clickx = eventx - local.x;
            var clicky = eventy - local.y;
            //将得到的相对坐标除以当前缩放值，得到设计坐标
            //clicky = clicky / Views.MainView.queueContainer.scaleY;
            //var id = this.getIdByPos(clicky);
            //if(id>=0&&id<this.queueIndex) this.setQueueSelected(id);
        };

        GameContainer.prototype.DrawMap = function(){
            this.MapGenerater = new mapGenerater(this.mapWidth,this.mapHeight,this.houseTileWidth,this.houseTileHeight,this.houseTileSetHeight,this.tileImageWidth);
            this.MapWorker = new mapWorker(this.MapGenerater.getMap());
            this.MapWorker.initData();
            mapworkerLoaded = true;
            this.HouseBgView = this.GetHouseBgContainer(this.mapWidth,this.mapHeight);
            this.MapWorker.DrawMapBg(this.HouseBgView);
            //this.MapWorker.DrawItem(this.HouseBgView);
            //this.MapWorker.DrawCharacter();
            //this.DrawFuniture();
            //请求及绘制家具
            //Sockets.send_ReqFurnitureAllData();
            ///请求及绘制工人
            //if(Sockets.dataManager.isVisit)  Sockets.send_ReqWorkerAll(Sockets.dataManager.visitFriendid);
           // else Sockets.send_ReqWorkerAll(userid);
            this.MapWorker.readMapArray();
            Sockets.send_ReqGuestAllData();
            //Sockets.send_reqTiTiKiKi();
            console.log(this);
           // this.removeChildAt(3);
            this.addChildAt(this.HouseBgView,14);
         //   this.swapChildrenAt(3, 14)
        };

        GameContainer.prototype.DrawFuniture = function(){
            var self = this;

            var components = Views.MainView.ToolBarContainer.furnitureComponentManager;
            for(var i=0;i<components.count();i++)
            {
                self.MapWorker.DrawFurniture(components.Components[i]);
            }
            self.MapWorker.DrawModularFurniture();
        };
		
		GameContainer.prototype.DrawFacility = function(facility){
			var self = this;
			this.tempFacility = facility;
			Views.MainView.ToolBarContainer.furnitureComponentManager.add(facility);
		};
		GameContainer.prototype.DrawTempFacility = function(facility){
			var self = this;
			Views.MainView.ToolBarContainer.furnitureComponentManager.add(facility);
			self.MapWorker.DrawTempFacility(facility);
		};
		//新建
		GameContainer.prototype.ReDrawTempFacility = function(px,py,x,y){
			var self = this;
			self.MapWorker.DrawTempFacility(this.tempFacility,px,py,x,y);
			self.isOpen = false;
		};
		//移动
		GameContainer.prototype.ReDrawMovedFacility = function(fcomp,px,py,x,y){
			var self = this;
			//修改本地furnitureComponentManager对应的X/Y值
			Views.MainView.ToolBarContainer.furnitureComponentManager.get(fcomp.id).devX = x;
			Views.MainView.ToolBarContainer.furnitureComponentManager.get(fcomp.id).devY = y;
			self.MapWorker.DrawMovedFacility(fcomp,px,py,x,y);
		};
        GameContainer.prototype.GetHouseBgContainer = function(mapWidth,mapHeight){
            var houseBgWidth = mapWidth * this.houseTileWidth;
            var houseBgHeight = mapHeight * this.houseTileHeight + this.houseTileSetHeight - this.houseTileHeight;
            //var px = 770 - houseBgWidth/2;
            //var py = 295 - this.houseTileSetHeight;
			var px = 430;
            var py = 33;
			trace("houseBgWidth:"+houseBgWidth+"houseBgHeight:"+houseBgHeight+"px:"+px+"py:"+py);
            var houseBgContainer = new Q.DisplayObjectContainer({width:houseBgWidth, height:houseBgHeight,x:px,y:py, style:{position:"absolute",backgroundColor:"#0f0"}});
            return houseBgContainer;
        };
        
        GameContainer.prototype.GetBgLeft = function(){
            var self = this;
            var mainBg = new Quark.Bitmap({image:LoadedImages.city_lckg.image,width:this.width,height:this.height});
            mainBg.x = 0;
            mainBg.y = 100;
            return mainBg;
        };
		GameContainer.prototype.GetBgRight = function(){
            var self = this;
            var mainBg = new Quark.Bitmap({image:LoadedImages.floor_base.image,width:this.width,height:this.height});
            mainBg.x = 203;
            mainBg.y = 24;
            return mainBg;
        };
        GameContainer.prototype.GetBgRight0 = function(){
            var self = this;
            var mainBg = new Quark.Bitmap({image:LoadedImages.floor_0.image,width:this.width,height:this.height});
            mainBg.x = 400;
            mainBg.y = 180;
            return mainBg;
        };
        GameContainer.prototype.GetBgRight1 = function(){
            var self = this;
            var mainBg = new Quark.Bitmap({image:LoadedImages.floor_1.image,width:this.width,height:this.height});
            mainBg.x = 205;
            mainBg.y = 25;
            return mainBg;
        };
        GameContainer.prototype.GetBgRight2 = function(){
            var self = this;
            var mainBg = new Quark.Bitmap({image:LoadedImages.floor_2.image,width:this.width,height:this.height});
            mainBg.x = -92;
            mainBg.y = -88;
            return mainBg;
        };
        GameContainer.prototype.GetBgRight3 = function(){
            var self = this;
            var mainBg = new Quark.Bitmap({image:LoadedImages.floor_3.image,width:this.width,height:this.height});
            mainBg.x = -92;
            mainBg.y = -88;
            return mainBg;
        };
        GameContainer.prototype.GetBgRight4 = function(){
            var self = this;
            var mainBg = new Quark.Bitmap({image:LoadedImages.floor_4.image,width:this.width,height:this.height});
            mainBg.x = -92;
            mainBg.y = -88;
            return mainBg;
        };
        GameContainer.prototype.GetBgRight5 = function(){
            var self = this;
            var mainBg = new Quark.Bitmap({image:LoadedImages.floor_5.image,width:this.width,height:this.height});
            mainBg.x = -92;
            mainBg.y = -88;
            return mainBg;
        };
        GameContainer.prototype.GetBlank = function(){
            var self = this;
            var mainBg = new Quark.Bitmap({image:LoadedImages.blank.image,width:this.width,height:this.height});
            mainBg.x = 380;
            mainBg.y = 20;
            return mainBg;
        };

        GameContainer.prototype.GetBg = function(){
            var self = this;
            var mainBg = new Quark.Bitmap({image:LoadedImages.day_bg.image,width:this.width,height:this.height});
            Views.DisplayObjectsDefine.displayer.SetDisplayObjectScaleFullHeightSize(mainBg,self);
            Views.DisplayObjectsDefine.displayer.SetDisplayObjectCenter(mainBg,self);
            return mainBg;
        };
		
		GameContainer.prototype.goFloorFirst = function(){
			this.removeChild(this.bgright);
            var self = this;
            var mainBg = new Quark.Bitmap({image:LoadedImages.floor_1.image,width:this.width,height:this.height});
            Views.DisplayObjectsDefine.displayer.SetDisplayObjectScaleFullHeightSize(mainBg,self);
            Views.DisplayObjectsDefine.displayer.SetDisplayObjectCenter(mainBg,self);
			this.bgright = mainBg;
            this.addChildAt(this.bgright,0);
        };
		
		GameContainer.prototype.goFloorSecond = function(){
            var self = this;
            var mainBg = new Quark.Bitmap({image:LoadedImages.floor_2.image,width:this.width,height:this.height});
            Views.DisplayObjectsDefine.displayer.SetDisplayObjectScaleFullHeightSize(mainBg,self);
            Views.DisplayObjectsDefine.displayer.SetDisplayObjectCenter(mainBg,self);
            return mainBg;
        };
        
        return GameContainer;
    });