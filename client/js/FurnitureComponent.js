/**
 * Created with JetBrains WebStorm.
 * User: john
 * Date: 13-3-2
 * Time: 下午11:55
 * To change this template use File | Settings | File Templates.
 */
define(['TilesMap/mapCoordinater','DevListItem'], function(MapCoordinater,DevListItem) {

    var FurnitureComponent = Class.extend({
        init1: function(Component){
            this.id = Quark.UIDUtil.createUID("Furniture");
            this.mapCoordinater = new MapCoordinater;
            this.componentid=Component.componentid;
            this.furnitureid = Component.furnitureid;
            this.dirphoto = Component.dirphoto;
            this.sizex = Component.sizex;
            this.sizey = Component.sizey;
            this.posx = Component.posx;
            this.posy = Component.posy;
            this.isblock = Component.isblock;
        },

		init: function(Component){
			this.id = Quark.UIDUtil.createUID("Furniture");
            this.mapCoordinater = new MapCoordinater;
            this.floorId=Component.floorId;
			this.castleId=Component.castleId;
            this.devId = Component.devId;
            this.devGuestPrice = Component.devGuestPrice;
            this.devCharm = Component.devCharm;
            this.devX = Component.devX;
            this.devY = Component.devY;
            this.devName = Component.devName;
			this.devTypeID = Component.devTypeID;
			this.devInitBuildPrice = Component.devInitBuildPrice;
			this.devAscPrice = Component.devAscPrice;
			this.devInitGuestPrice = Component.devInitGuestPrice;
			this.devInitCharm = Component.devInitCharm;
			this.devInitTotleFee = Component.devInitTotleFee;
			this.devPath = Component.devPath;
			this.devSizeX = Component.devSizeX;
			this.devSizeY = Component.devSizeY;
			this.devAcquireMethod = Component.devAcquireMethod;
			this.isblock = 0;
		},
        getImgx:function(x,y){
            return this.mapCoordinater.getGx(x,y,this.tilewidth,this.mapwidth);
        },
        getImgy:function(x,y){
            return this.mapCoordinater.getGy(x,y,this.tileheight);
        },
		setPosition1:function(px,py,x,y){
			var icnpx = px-545;
			var icnpy = py+55;

			this.image = new Q.Bitmap({image:Resources.getImage("chosen/"+this.devId+".png"),x:icnpx,y:icnpy});
			//this.image = new Q.Bitmap({image:Resources.getImage("chosen/"+this.devId+".png"),x:this.imgx,x:this.imgy});
            
			Views.MainView.GameView.MapWorker.setBlock(8,10);
		},
        setZIndex:function(bx,by){
            this.x=bx-this.devSizeX+1;
            this.y=by;
        },
        setPosition2:function(){            

            this.tilewidth = Views.MainView.GameView.MapWorker.map.tilewidth;
            this.tileheight = Views.MainView.GameView.MapWorker.map.tileheight;
            this.mapwidth = Views.MainView.GameView.MapWorker.map.width;

            var px=this.mapCoordinater.getGx(this.devImgX,this.devImgY,this.tilewidth);
            var py=this.mapCoordinater.getGy(this.devImgX,this.devImgX,this.tileheight);

            //放入最高层
            this.x = px + this.devSizeX - 1;
            this.y = py + this.devSizeY - 1;
            //根据最高层的tiled计算图像应放入的坐标
            this.imgx = this.getImgx(this.x,this.y);
            this.imgy = this.getImgy(this.x,this.y);
            //this.image = new Q.Bitmap({image:Resources.getImage(this.dirphoto+"/"+this.componentid+".png"),x:this.imgx,y:this.imgy});//, rect:[this.dirphotox,this.dirphotoy,this.dirphotow,this.dirphotoh]});
			this.image = new Q.Bitmap({image:Resources.getImage(this.dirphoto+"/2.png"),x:this.imgx,y:this.imgy});
            //然后做补偿
            var jxx = px + this.sizex - 1;
            var jxy = py;
            var jyx = px + this.sizex - 1;
            var jyy = py + this.sizey - 1;

            this.imgx = this.getImgx(jxx,jxy);
            this.imgy = this.getImgy(jyx,jyy);
            this.image.x = this.imgx;
            this.image.y = this.imgy;

            for(var i=px;i<px+this.sizex;i++){
                for(var j=py;j<py+this.sizey;j++){
                    Views.MainView.GameView.MapWorker.setBlock(i,j);
                }
            }
        },
		setPosition:function(bx,by,furnitureComponent){
			var iconid = furnitureComponent.devId;
            this.tilewidth = Views.MainView.GameView.MapWorker.map.tilewidth;
            this.tileheight = Views.MainView.GameView.MapWorker.map.tileheight;
            this.mapwidth = Views.MainView.GameView.MapWorker.map.width;

            this.setZIndex(bx,by);
            this.devImgX=this.mapCoordinater.getGx(bx,by,this.tilewidth,this.mapwidth,"room",this.devSizeX+"*"+this.devSizeY);
            this.devImgY=this.mapCoordinater.getGy(bx,by,this.tileheight,"room",this.devSizeX+"*"+this.devSizeY);
            this.image=new Q.Bitmap({image:Resources.getImage("chosen/"+iconid+".png"),x:this.devImgX,y:this.devImgY});

            Views.MainView.GameView.MapWorker.addFurniture(furnitureComponent);

            for(var i=bx;i>bx-this.devSizeX;i--){
                for(var j=by;j<by+this.devSizeY;j++){
                    //Views.MainView.GameView.MapWorker.setBlock(i,j);
					//被占用的格子坐标集合
					Views.MainView.GameView.MapWorker.setDataBlock(i,j);

					var devListItem = new DevListItem();
					devListItem.x = i;
					devListItem.y = j;
					devListItem.fcomp = furnitureComponent;
					//设施占用的格子坐标集合
					Views.MainView.GameView.MapWorker.setDevList(devListItem);
                }
            }
			Views.MainView.GameView.MapWorker.setGuestData(furnitureComponent);
        },
		removePosition:function(fComp){
			for(var i=fComp.devX;i>fComp.devX-fComp.devSizeX;i--){
                for(var j=fComp.devY;j<fComp.devY+fComp.devSizeY;j++){
					trace(">>i:"+i+">>j:"+j);
					//被占用的格子坐标集合（锁）
					Views.MainView.GameView.MapWorker.removeDataBlock(i,j);
					//设施占用的格子坐标集合
					Views.MainView.GameView.MapWorker.removeDevList(i,j);
                }
            }
			Views.MainView.GameView.MapWorker.removeGuestData(fComp);
		},
        setPosition3:function(bx,by,iconid){
            this.tilewidth = Views.MainView.GameView.MapWorker.map.tilewidth;
            this.tileheight = Views.MainView.GameView.MapWorker.map.tileheight;
            this.mapwidth = Views.MainView.GameView.MapWorker.map.width;

            this.setZIndex(bx,by);
            this.devImgX=this.mapCoordinater.getGx(bx,by,this.tilewidth,this.mapwidth,"room",this.devSizeX+"*"+this.devSizeY);
            this.devImgY=this.mapCoordinater.getGy(bx,by,this.tileheight,"room",this.devSizeX+"*"+this.devSizeY);
            this.image=new Q.Bitmap({image:Resources.getImage("chosen/"+iconid+".png"),x:this.devImgX,y:this.devImgY});

            for(var i=bx;i>bx-this.devSizeX;i--){
                for(var j=by;j<by+this.devSizeY;j++){
                    //Views.MainView.GameView.MapWorker.setBlock(i,j);
					Views.MainView.GameView.MapWorker.setDataBlock(i,j);
					
                }
            }
			Views.MainView.GameView.MapWorker.setGuestData(bx,by);
        }



        /*
        setPosition:function(px,py){
            this.tilewidth = Views.MainView.GameView.MapWorker.map.tilewidth;
            this.tileheight = Views.MainView.GameView.MapWorker.map.tileheight;
            this.mapwidth = Views.MainView.GameView.MapWorker.map.width;
            //放入最高层
            this.x = px + this.sizex - 1;
            this.y = py + this.sizey - 1;
            //根据最高层的tiled计算图像应放入的坐标
            this.imgx = this.getImgx(this.x,this.y);
            this.imgy = this.getImgy(this.x,this.y);
            this.image = new Q.Bitmap({image:Resources.getImage(this.dirphoto+"/"+this.componentid+".png"),x:this.imgx,y:this.imgy});//, rect:[this.dirphotox,this.dirphotoy,this.dirphotow,this.dirphotoh]});
            //然后做补偿
            var jxx = px + this.sizex - 1;
            var jxy = py;
            var jyx = px + this.sizex - 1;
            var jyy = py + this.sizey - 1;

            this.imgx = this.getImgx(jxx,jxy);
            this.imgy = this.getImgy(jyx,jyy);
            this.image.x = this.imgx;
            this.image.y = this.imgy;

            for(var i=px;i<px+this.sizex;i++){
                for(var j=py;j<py+this.sizey;j++){
                    Views.MainView.GameView.MapWorker.setBlock(i,j);
                }
            }
        }
        */
    });
    return FurnitureComponent;
});