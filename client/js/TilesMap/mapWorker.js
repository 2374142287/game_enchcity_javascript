/**
 * Created with JetBrains WebStorm.
 * User: john
 * Date: 13-2-7
 * Time: 下午5:18
 * To change this template use File | Settings | File Templates.
 */
define(['jquery','TilesMap/tiles','TilesMap/mapCoordinater','TilesMap/TempController','TilesMap/LayerController','TilesMap/tileBg','CastleDev',
    'Characters','TilesMap/Point','TilesMap/MusicDeviceDrawer','TilesMap/DrinkDeviceDrawer','Worker'],
    function($,Tile,MapCoordinater,TempControler,LayerControler,TileBg,CastleDev,
             Characters,Point,MusicDeviceDrawer,DrinkDeviceDrawer,Worker) {

        var mapWorker = Class.extend({

            init: function(mapData){
                this.map = mapData;
                this.mapCoordinater = new MapCoordinater;
                this.layerController = new LayerControler;
				this.tempController = new TempControler;
                this.mapData = new Array();
                this.map2Arr = new Array();
				this.blockData = new Array();//设施所占格子
				this.guestData = new Array();//消费格子
				this.devList = new Array();//设施占用
                this.furnList = new Array();//已有设施
                this.container;
                this.bgContainer = new Q.DisplayObjectContainer();
                this.itemContainer = new Q.DisplayObjectContainer();
				this.tempContainer = new Q.DisplayObjectContainer();
                this.maxPeopleNum = this.map.width*this.map.width/8 - 1;
                this.musicDeviceDrawer = new MusicDeviceDrawer(this.map.width);
                this.drinkDeviceDrawer = new DrinkDeviceDrawer(this.map.width);



                //this.map.width = mapWidth;
                //this.map.height = mapHeight;
            },
            initData:function(){
                //this.fitments = new Fitments(this.map.tilewidth,this.map.tileheight,this.map.width);
                this.tileImageArray = new Array();
                this.initImageArray();
				this.initFacility();
                this.characters = new Characters(this.map.tilewidth,this.map.tileheight,this.map.width);
            },
			initFacility1:function(){
				//var pxs=[{x:440,y:170},{x:600,y:235},{x:40,y:355},{x:160,y:245}];
                //坐标由mapCoorfinater.getGx,getGy提供
				var icons = [20,10,14,33,9];
				var blocks = [{x:11,y:3},{x:2,y:1},{x:3,y:3},{x:8,y:1},{x:3,y:5}];
                //var sizes=  ["2*1","2*2","2*2","4*3","3*2"];
                var sizes=[{x:2,y:1},{x:2,y:2},{x:2,y:2},{x:4,y:3}];
			
				for(var i =0;i<4;i++){
					var furnitureComponent = Views.MainView.ToolBarContainer.furnitureComponentManager.Components[i];
					
                    furnitureComponent.devSizeX=sizes[i].x;
                    furnitureComponent.devSizeY=sizes[i].y;//这个在setPosition方法外设置是因为这个本应该是furnitureComponent里已经设置好的属性


                    /*
                    furnitureComponent.setZIndex(blocks[i].x,blocks[i].y);
                    furnitureComponent.devImgX=this.mapCoordinater.getGx(blocks[i].x,blocks[i].y,this.map.tilewidth,this.map.width,"room",sizes[i]);
                    furnitureComponent.devImgY=this.mapCoordinater.getGy(blocks[i].x,blocks[i].y,this.map.tileheight,"room",sizes[i]);
                    furnitureComponent.image = new Q.Bitmap({image:Resources.getImage("chosen/"+icons[i]+".png"),x:furnitureComponent.devImgX,y:furnitureComponent.devImgY});
                    if(i<3){
                        for(var j = blocks[i].x; j < blocks[i].x+2;j++){
                            for(var k = blocks[i].y; k < blocks[i].y+2;k++){
                                Views.MainView.GameView.MapWorker.setBlock(j,k);
                            }
                        }
                    }else{
                        for(var j = blocks[i].x; j < blocks[i].x+4;j++){
                            for(var k = blocks[i].y; k < blocks[i].y+4;k++){
                                Views.MainView.GameView.MapWorker.setBlock(j,k);
                            }
                        }
                    }
                    */
                    //全部移动到setPosition里做。
                    

                    furnitureComponent.setPosition3(blocks[i].x,blocks[i].y,icons[i]); //最后的icons参数也应该是furnitureComponent设置好的属性
					this.DrawItem(furnitureComponent);
					
				}
			},

			initFacility:function(){
                //坐标由mapCoorfinater.getGx,getGy提供
				//alert(1);
				var devData = Views.MainView.ToolBarContainer.furnitureComponentManager.Components;
				for(var i =0;i<devData.length;i++){
					var furnitureComponent = Views.MainView.ToolBarContainer.furnitureComponentManager.Components[i];
					if(furnitureComponent != 'undefined'){
						furnitureComponent.setPosition(furnitureComponent.devX,furnitureComponent.devY,furnitureComponent); 
					this.DrawItem(furnitureComponent);
					}
				}
			},
			initRedrawFacility:function(fid){
                //坐标由mapCoorfinater.getGx,getGy提供
				Views.MainView.ToolBarContainer.furnitureComponentManager.Components.remove(fid);
				var tempfCompManager = Views.MainView.ToolBarContainer.furnitureComponentManager;
				Views.MainView.ToolBarContainer.furnitureComponentManager.clear();
				Views.MainView.ToolBarContainer.furnitureComponentManager = tempfCompManager;
				var devData = Views.MainView.ToolBarContainer.furnitureComponentManager.Components;
				for(var i =0;i<devData.length;i++){
					var furnitureComponent = Views.MainView.ToolBarContainer.furnitureComponentManager.Components[i];
					if(furnitureComponent != 'undefined'){
						this.DrawItem(furnitureComponent);
					}
				}
			},

            DrawCharacterIn:function(guest){
                this.DrawCharacter(guest,0,1);
            },
            DrawCharacterInner:function(guest,code){
                var point = this.getRandomPoint();
                this.DrawCharacter(guest,point.X,point.Y);
                //CharacterId = this.characters.addYouchai(point.X,point.Y);
                //this.characters.guests[CharacterId].showHeart();
                //this.layerController.addElement(this.characters.guests[CharacterId]);
            },
            DrawCharacter:function(guest,x,y){
                if(this.characters.guests.length > this.maxPeopleNum)
                {
                    this.deleteCharacter(this.characters.guests[0].guest.guestid);
                }
                var charID = -1;
                switch(guest.typecode){
                    case "A":
                        charID = this.characters.addLanxiaoh(guest,x,y);
                        break;
                    case "B":
                        charID = this.characters.addYouchai(guest,x,y);
                        break;
                    case "C":
                        charID = this.characters.addXiaochou(guest,x,y);
                        break;
                    case "D":
                        charID = this.characters.addLifashi(guest,x,y);
                        break;
                }
                if(charID!= -1) this.DrawItem(this.characters.guests[charID]);
            },
            removeAllCharacter:function(){
                for(var i =0 ;i<this.characters.guests.length;i++){
                    trace(this.characters.guests[i].guest.guestid);
                    this.deleteCharacter(this.characters.guests[i].guest.guestid);
                }
            },
            deleteCharacter:function(guestid){
                var character = this.characters.get(guestid);
                if(character != -1){
                    this.removeItem(character);
                    this.characters.remove(guestid);
                }
            },
            DrawFurniture:function(furnitureComponent){
                furnitureComponent.setPosition();
                if(furnitureComponent.componentid > 12 && furnitureComponent.componentid<25)
                {
                    this.musicDeviceDrawer.addFurniture(furnitureComponent);
                }
                else{
                    this.DrawItem(furnitureComponent);
                }
                /*/获取调酒设备
                if(furnitureComponent.componentid <= 12) this.drinkDeviceDrawer.addFurniture(furnitureComponent);
                //获取调音设备
                else if(furnitureComponent.componentid > 12 && furnitureComponent.componentid<25)
                {
                    this.musicDeviceDrawer.addFurniture(furnitureComponent);
                }else{
                    this.DrawItem(furnitureComponent);
                }
                */
            },
			DrawFacility:function(furnitureComponent){
                furnitureComponent.setPosition1();
                this.DrawItem(furnitureComponent);
            },
			//新建
			DrawTempFacility:function(furnitureComponent,px,py,x,y){
                //furnitureComponent.setPosition1(px,py,x,y);
				//得到跨越的格
				var endX = x-furnitureComponent.devSizeX;
				var endY = y+furnitureComponent.devSizeY;
				//判断是否可放置
				if(!this.isBlock4Range(x,y,endX,endY)){
					furnitureComponent.setPosition(x,y,furnitureComponent);
					this.DrawItem(furnitureComponent);
					//入库
					this.castleDev = new CastleDev();
					this.castleDev.floorId = 1;
					this.castleDev.devId = furnitureComponent.devId;
					this.castleDev.devGuestPrice = furnitureComponent.devInitGuestPrice;
					this.castleDev.devCharm = furnitureComponent.devInitCharm;
					this.castleDev.devX = x;
					this.castleDev.devY = y;
					this.castleDev.devInitBuildPrice=furnitureComponent.devInitBuildPrice;
					Sockets.send_ReqCreateCastleDev(this.castleDev);
					Player.money -= furnitureComponent.devInitBuildPrice;
					Views.MainView.InfoBarContainer.reflashData();
				} else{
					alert("not null!");
				}
            },
			//移动
			DrawMovedFacility:function(furnitureComponent,px,py,x,y){
				//得到跨越的格
				var endX = x-furnitureComponent.devSizeX;
				var endY = y+furnitureComponent.devSizeY;
				//判断是否可放置
				if(!this.isBlock4Range(x,y,endX,endY)){
					furnitureComponent.setPosition(x,y,furnitureComponent);
					this.DrawItem(furnitureComponent);
					//入库
					this.castleDev = new CastleDev();
					this.castleDev.oldX = furnitureComponent.devX;
					this.castleDev.oldY = furnitureComponent.devY;
					this.castleDev.devX = x;
					this.castleDev.devY = y;
					Sockets.send_ReqMovedCastleDev(this.castleDev);
				} else{
					alert("not null!");
				}
            },
            DrawModularFurniture:function(){
                this.DrawItem(this.musicDeviceDrawer.getItem(2));
                this.DrawItem(this.musicDeviceDrawer.getItem(0));
            },
            DrawWorker:function(){
                var self = this;
                self.removeWorkerAll();
                var components = Views.MainView.ToolBarContainer.furnitureComponentManager.Components;
                var drinks = new Array();
                var musics = new Array();
                for(var i=0;i<components.length;i++){
                    if(components[i].componentid <= 12) drinks.push(components[i]);
                    //获取调音设备
                    else if(components[i].componentid > 12 && components[i].componentid<25)
                    {
                        musics.push(components[i]);
                    }
                }
                if(drinks.length>=2 && Views.MainView.ToolBarContainer.workerManager.getAlcohol() != -1) self.DrawItem(self.getWorker(drinks,Views.MainView.ToolBarContainer.workerManager.getAlcohol()));
                if(musics.length>=2 && Views.MainView.ToolBarContainer.workerManager.getDJ() != -1) self.DrawItem(self.getWorker(musics,Views.MainView.ToolBarContainer.workerManager.getDJ()));
                if(Views.MainView.ToolBarContainer.workerManager.getWaiter() != -1) {
                    var waiter = Views.MainView.ToolBarContainer.workerManager.getWaiter();
                    var worker = new Worker({},waiter,"manservice.gif",1,2,'right',this.map.width);
                    self.DrawItem(worker);
                }
            },
            getWorker:function(components,worker){
                if(components.length>0)
                {
                    var dir = 'right';
                    if(components[0].dirphoto=='furnituresLeft') dir = 'left';
                    switch(worker.rolecode){
                        case 'A':
                            var px = 0;
                            var py = 0;
                            if(components[0].posx == components[1].posx) px = components[0].posx;
                            else px = (components[0].posx+components[1].posx)/2;
                            if(components[0].posy == components[1].posy) py = components[0].posy;
                            else py = (components[0].posy+components[1].posy)/2;
                            var workerEntity = new Worker({},worker,"manBartenderDanniel.gif",px,py,dir,this.map.width);
                            return workerEntity;
                        case 'D':
                            var px = components[0].posx + components[0].sizex - 1;
                            var py = components[0].posy + components[0].sizey - 1;
                            var workerEntity = new Worker({},worker,"manMusicMeimei.gif",px,py,dir,this.map.width);
                            return workerEntity;
                    }
                }
            },
            DrawItem:function(item){
                var self = this;
                this.mapData.push(item);
                this.layerController.addElement(item);
            },
			DrawTempItem:function(item){
                var self = this;
				this.mapData.push(item);
				this.layerController.addElement(item);
            },
            removeWorkerAll:function(){
                var self = this;
                for(var i=0;i<this.mapData.length;i++)
                {
                    if(this.mapData[i].id == "workerW" || this.mapData[i].id == "workerA" || this.mapData[i].id == "workerD"){
                        self.removeItem(this.mapData[i]);
                    }
                }
                self.readMapArray();
            },
            removeItem:function(item){
                trace("removeCharacter");
                this.itemContainer.removeAllChildren();
                this.layerController.removerElement(item);
                this.removeMapElement(item);
            },
            removeMapElement:function(element){
                for(var i=0;i<this.mapData.length;i++){
                    if(this.mapData[i] = element){
                        this.mapData.splice(i,1);
                    }
                }
            },
            readMapArray:function(){
                var arr=new Array();         //先声明一维
                for(var i=0;i<this.map.width;i++){                //一维长度为10
                    arr[i]=new Array();         //在声明二维
                    for(var j=0;j<this.map.height;j++){             //二维长度为20
                        arr[i][j]=false;
                    }
                }
                for(var i=0;i<this.mapData.length;i++){
                    if(this.mapData[i].isblock == 1) arr[this.mapData[i].x ][this.mapData[i].y] = true;
                }
                this.map2Arr = arr;
            },
            setBlock:function(px,py){
                for(var i=0;i<this.mapData.length;i++){
                    if(this.mapData[i].x == px && this.mapData[i].y == py){
                        this.mapData[i].isblock = 1;
					}
                }
           },
            isBlock:function(px,py){
	          for(var i=0;i<this.mapData.length;i++){
                    if(this.mapData[i].x == px && this.mapData[i].y == py && this.mapData[i].isblock == 1)
                        return true;
                }
                return false;
            },
			//==============设施格子===================//
			setDataBlock:function(px,py){
				this.blockData.push({x:px,y:py});
           },
		   removeDataBlock:function(px,py){
			   for(var i=0;i<this.blockData.length;i++){
                    if(this.blockData[i].x == px && this.blockData[i].y == py){
						trace(">>>>>>>>>>>>>>>>>>>>..removeDataBlock");
                        this.blockData.splice(i,1);
                    }
                }
           },
		   isDataBlock:function(px,py){
	          for(var i=0;i<this.blockData.length;i++){
                    if(this.blockData[i].x == px && this.blockData[i].y == py)
                        return true;
                }
                return false;
            },
			//一个区域判断
			isBlock4Range:function(sx,sy,ex,ey){
				var isOk = false;
                for(var i = sx; i > ex; i--){
					for(var j = sy; j < ey; j++){
						isOk = this.isDataBlock(i,j);
						if(isOk)
							return true;
					}
				}
				return false;
            },
			//消费格子
			setGuestData:function(furnitureComponent){
				this.guestData.push(furnitureComponent);
           },
		   removeGuestData:function(fcomp){
			   for(var i=0;i<this.guestData.length;i++){
                    if(this.guestData[i] == fcomp){
						trace(">>>>>>>>>>>>>>>>>>>>..removeGuestData");
                        this.guestData.splice(i,1);
                    }
                }
           },
		   getGuestCount:function(){
			   return this.guestData.length;
           },
		   //设施占用关系
		   setDevList:function(furnitureData){
				this.devList.push(furnitureData);
           },
           addFurniture:function(furnitureComponent){
                this.furnList.push(furnitureComponent);
           },
		   removeDevList:function(px,py){
				for(var i=0;i<this.devList.length;i++){
                    if(this.devList[i].x == px && this.devList[i].y == py){
						trace(">>>>>>>>>>>>>>>>>>>>..removeDevList");
                        this.devList.splice(i,1);
                    }
                }
           },
		   getFurnitureComponent:function(px,py){
			   for(var i=0;i<this.devList.length;i++){
                    if(this.devList[i].x == px && this.devList[i].y == py)
                        return this.devList[i].fcomp;
                }
				return null;
           },
            initImageArray: function(){
                for(var i=0;i<this.map.tilesets.length;i++){
                    this.initTileSet(this.map.tilesets[i]);
                }
            },
            initTileSet: function(tileset){
                var tileId = parseInt(tileset.firstgid);
                var col = parseInt(tileset.imagewidth/tileset.tilewidth);
                var row = parseInt(tileset.imageheight/tileset.tileheight);
                var img = new Image();
                img.src = "./images/"+winSize+"/"+tileset.image;
                trace("col:"+col+" row:"+row);
                var id =0;
                for(var i=0;i<col;i++){
                    for(var j=0;j<row;j++){
                        var tile = new Tile(tileId,img,[i*tileset.tilewidth,j*tileset.tileheight,tileset.tilewidth,tileset.tileheight],this.GetIsBlock(tileId));
                        this.tileImageArray[id] = tile;
                        id++;
                        tileId++;
                    }
                }
            },
            GetIsBlock : function(tileId){
                for(var i=0;i<this.map.tilesets.length;i++){
                    if(typeof(this.map.tilesets[i].tileproperties) != 'undefined'){
                        for(var j=0;j<this.map.tilesets[i].tileproperties.length;j++){
                            if(typeof(this.map.tilesets[i].tileproperties[j]) != 'undefined')
                            {
                                var item = this.map.tilesets[i].tileproperties[j];
                                if(item==tileId) return 1;
                                /*for(var ite in item)
                                 {
                                 if(ite == "c")  return true;
                                 }*/
                            }
                        }
                    }
                }
                return 0;
            },
            DrawMapBg : function(containerIn){
                this.container = containerIn;

                if(!this.container.contains(this.bgContainer))
                {
                    this.bgContainer = new Q.DisplayObjectContainer({x:0,y:0,width:this.container.getCurrentWidth(),height:this.container.getCurrentHeight()});
					trace("this.container.getCurrentWidth():"+this.container.getCurrentWidth()+"this.container.getCurrentHeight():"+this.container.getCurrentHeight());
                    this.container.addChildAt(this.bgContainer,0);
                }
                for(var i=0;i<this.map.layers.length;i++)
                {
                    this.DrawLayer(this.map.layers[i]);
                }
                if(!this.container.contains(this.itemContainer))
                {
                    this.itemContainer = new Q.DisplayObjectContainer({x:0,y:0,width:this.container.getCurrentWidth(),height:this.container.getCurrentHeight()});
                    this.container.addChildAt(this.itemContainer,1);
                }
            },
            DrawLayer : function(layer){
                if(layer.visible == true){
                    var positionx = 0,
                        positiony = 0;
                    for(var i=0;i<layer.data.length;i++)
                    {
                        if(layer.data[i]!=0){
                            this.DarwTile(layer.data[i],positionx,positiony,layer.opacity);
                        }
                        positiony++;
                        if(positiony>=layer.width){
                            positiony = 0;
                            positionx++;
                        }
                    }
                }
            },
            DarwTile : function(imgIndex,positionx,positiony,opacity){
                for(var i=0;i<this.tileImageArray.length;i++){
                    if(this.tileImageArray[i].id == imgIndex){
                        var imgx = this.mapCoordinater.getGx(positionx,positiony,this.map.tilewidth,this.map.width);
                        var imgy = this.mapCoordinater.getGy(positionx,positiony,this.map.tileheight);
						//alert("imgx:"+imgx+"imgy:"+imgy+"positionx:"+positionx+"positiony:"+positiony+"this.map.tilewidth:"+this.map.tilewidth+"this.map.width:"+this.map.width+"this.map.tileheight:"+this.map.tileheight);
                        var tileBg = new TileBg(imgIndex,positionx,positiony,this.tileImageArray[i].image,imgx,imgy,opacity,this.tileImageArray[i].rect,this.tileImageArray[i].isblock);
                        //var image = new Q.Bitmap({image:this.tileImageArray[i].image,x:imgx,y:imgy,alpha:opacity,rect:this.tileImageArray[i].rect});
                        this.mapData.push(tileBg);
                        tileBg.image.addEventListener(events[0], function(e){
                            alert("12312312");
                        });
                        this.bgContainer.addChildAt(tileBg.image,1);
                        //this.layerController.addElement(tileBg);
                        //trace("id:"+imgIndex+",x:"+positionx+",y:"+positiony);
                    }
                }
                this.ReDraw();
            },
            ReDraw:function(){
                this.itemContainer.removeAllChildren();
                for(var i=0;i<this.layerController.items.length;i++){
                    var bmp = this.layerController.items[i].image;
                    this.itemContainer.addChildAt(bmp, i);
                }
            },
			ReDraw1:function(facility){
				//this.itemContainer.removeChild(image);
                //this.itemContainer.addChildAt(image, 3);
				this.DrawItem(facility);
				
            },
            update:function() {
                this.characters.update();
                this.ReDraw();
            },
            getRandomPoint:function(){
                var x = parseInt((Views.MainView.GameView.MapWorker.map.width)*Math.random());
                var y = parseInt((Views.MainView.GameView.MapWorker.map.height)*Math.random());
                trace("randomTarget x:"+x + " y:"+ y);
                while(Views.MainView.GameView.MapWorker.isBlock(x,y))
                {
                    var x = parseInt((Views.MainView.GameView.MapWorker.map.width)*Math.random());
                    var y = parseInt((Views.MainView.GameView.MapWorker.map.height)*Math.random());
                    trace("randomTarget x:"+x + " y:"+ y);
                }
                //x=5;
                //y=1;
                return new Point(x,y);
            }
        });
        return mapWorker;
    });
