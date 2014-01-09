/**
 * Created with JetBrains WebStorm.
 * User: john
 * Date: 13-2-17
 * Time: 下午8:45
 * To change this template use File | Settings | File Templates.
 */
define(['jquery','../TilesMap/mapWorker','TilesMap/MapGenerater','Worker'],
    function($,mapWorker,mapGenerater,Worker){
        var GameContainer = function(props)
        {
            GameContainer.superClass.constructor.call(this, props);
            this.init();
        };

        Q.inherit(GameContainer, Q.DisplayObjectContainer);

        GameContainer.prototype.init = function(){
            this.width = 3040;
            this.height = 1975;
            this.x =0;
            this.y =0;
            this.style = {position:"absolute",backgroundColor:"#0f0"};
            this.houseTileWidth = Views.DisplayObjectsDefine.houseTileWidth;
            this.houseTileHeight = Views.DisplayObjectsDefine.houseTileHeight;
            this.houseTileSetHeight = Views.DisplayObjectsDefine.houseTileSetHeight;
            this.tileImageWidth = Views.DisplayObjectsDefine.tileImageWidth;
            this.mapWidth = Player.mapwidth;
            this.mapHeight = Player.mapheight;
            this.addChildAt(this.GetBg(),0);
        };

        GameContainer.prototype.DrawMap = function(){
            this.MapGenerater = new mapGenerater(this.mapWidth,this.mapHeight,this.houseTileWidth,this.houseTileHeight,this.houseTileSetHeight,this.tileImageWidth);
            this.MapWorker = new mapWorker(this.MapGenerater.getMap());
            this.MapWorker.initData();
            mapworkerLoaded = true;
            this.HouseBgView = this.GetHouseBgContainer(this.mapWidth,this.mapHeight);
            this.MapWorker.DrawMapBg(this.HouseBgView);
            this.MapWorker.readMapArray();
            Sockets.send_ReqGuestAllData();
            this.addChildAt(this.HouseBgView,3);
        };

        GameContainer.prototype.DrawFuniture = function(){
            var funis = Views.MainView.ToolBarContainer.furnitureManager.Furnitures;
            for(var i=0;i<funis.length;i++){
                if(funis[i].Furniture.isused == 1){
                    funis[i].setPosition();
                    for(var j=0;j<funis[i].Components.length;j++){
                        this.MapWorker.DrawItem(funis[i].Components[j]);
                    }
                }
            }
        };

        GameContainer.prototype.GetHouseBgContainer = function(mapWidth,mapHeight){
            var houseBgWidth = mapWidth * this.houseTileWidth;
            var houseBgHeight = mapHeight * this.houseTileHeight + this.houseTileSetHeight - this.houseTileHeight;
            var px = 1540 - houseBgWidth/2;
            var py = 590 - this.houseTileSetHeight;
            var houseBgContainer = new Q.DisplayObjectContainer({width:houseBgWidth, height:houseBgHeight,x:px,y:py, style:{position:"absolute",backgroundColor:"#0f0"}});
            return houseBgContainer;
        };

        GameContainer.prototype.GetBg = function(){
            var self = this;
            var mainBg = new Quark.Bitmap({image:LoadedImages.mainbg.image,width:this.width,height:this.height});
            Views.DisplayObjectsDefine.displayer.SetDisplayObjectScaleFullHeightSize(mainBg,self);
            Views.DisplayObjectsDefine.displayer.SetDisplayObjectCenter(mainBg,self);
            return mainBg;
        };

        return GameContainer;
    });