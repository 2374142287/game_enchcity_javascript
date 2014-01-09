/**
 * Created with JetBrains WebStorm.
 * User: john
 * Date: 13-3-4
 * Time: 上午11:39
 * To change this template use File | Settings | File Templates.
 */
define(['TilesMap/mapCoordinater'], function(MapCoordinater) {
    var Worker = function(props,worker,img,px,py,direction	,mapwidth)
    {
        Worker.superClass.constructor.call(this, props,worker,img,px,py,direction	,mapwidth);
        this.init(worker,img,px,py,direction,mapwidth);
    };
    Q.inherit(Worker, Q.DisplayObjectContainer);
    Worker.prototype.init = function(worker,img,px,py,direction,mapwidth){
        this.mapCoordinater = new MapCoordinater;
        this.x = px;
        this.y = py;
        this.mcwidth = Views.DisplayObjectsDefine.houseTileWidth;
        this.tilewidth = this.mcwidth;
        this.tileheight = Views.DisplayObjectsDefine.houseTileHeight;
        this.mcheight = Views.DisplayObjectsDefine.houseTileSetHeight;
        this.mapwidth = mapwidth;
        this.isblock = 1;
        this.mcMargin = 1;
        this.id = 'worker'+worker.rolecode;
        this.posx = this.getImgx(this.x,this.y);
        this.posy = this.getImgy(this.x,this.y);
        this.container = new Q.DisplayObjectContainer({x:this.posx,y:this.posy,width:this.mcwidth,height:this.mcheight});
        if(worker.rolecode != 'W'){
            if(direction=="left") this.mcX = 724;
            else this.mcX = 0;
            this.mcY = 0;
            this.mc = new Q.MovieClip({image:Resources.getImage(img),x:0,y:0,width:this.mcwidth,height:this.mcheight,interval:500});
            this.mc.addFrame([
                {rect:[this.mcX + (this.mcwidth + this.mcMargin)*0,this.mcY + (this.mcheight + this.mcMargin)*0,this.mcwidth,this.mcheight], label:"left"},
                {rect:[this.mcX + (this.mcwidth + this.mcMargin)*1,this.mcY + (this.mcheight + this.mcMargin)*0,this.mcwidth,this.mcheight]},
                {rect:[this.mcX + (this.mcwidth + this.mcMargin)*0,this.mcY + (this.mcheight + this.mcMargin)*1,this.mcwidth,this.mcheight]},
                {rect:[this.mcX + (this.mcwidth + this.mcMargin)*1,this.mcY + (this.mcheight + this.mcMargin)*1,this.mcwidth,this.mcheight], jump:"left"},

                {rect:[this.mcX + (this.mcwidth + this.mcMargin)*2,this.mcY + (this.mcheight + this.mcMargin)*0,this.mcwidth,this.mcheight], label:"right"},
                {rect:[this.mcX + (this.mcwidth + this.mcMargin)*3,this.mcY + (this.mcheight + this.mcMargin)*0,this.mcwidth,this.mcheight]},
                {rect:[this.mcX + (this.mcwidth + this.mcMargin)*2,this.mcY + (this.mcheight + this.mcMargin)*1,this.mcwidth,this.mcheight]},
                {rect:[this.mcX + (this.mcwidth + this.mcMargin)*3,this.mcY + (this.mcheight + this.mcMargin)*1,this.mcwidth,this.mcheight], jump:"right"}
            ]);
            this.container.addChild(this.mc);
            this.mc.gotoAndPlay(direction);
        }else
        {
            this.mcX = 0;
            this.mcY = 0;
            this.mc = new Q.MovieClip({image:Resources.getImage(img),x:0,y:0,width:this.mcwidth,height:this.mcheight,interval:500});
            this.mc.addFrame([
                {rect:[this.mcX + (this.mcwidth + this.mcMargin)*0,this.mcY + (this.mcheight + this.mcMargin)*0,this.mcwidth,this.mcheight], label:"right"},
                {rect:[this.mcX + (this.mcwidth + this.mcMargin)*0,this.mcY + (this.mcheight + this.mcMargin)*0,this.mcwidth,this.mcheight], jump:"right"}
            ]);
            this.container.addChild(this.mc);
            this.mc.gotoAndPlay('right');

            /*
            this.image = new Q.Bitmap({image:Resources.getImage(img),x:this.posx,y:this.posy,width:this.mcwidth,height:this.mcheight,
            rect:[0,0,this.tilewidth,this.tileheight]});
            if(direction=="left") this.mcX = 724;
            else this.mcX = 0;
            this.mcY = 0;
            this.mc = new Q.MovieClip({image:Resources.getImage(img),x:this.posx,y:this.posy,width:this.mcwidth,height:this.mcheight,interval:500});
            this.mc.addFrame([
                {rect:[0,0,this.tilewidth,this.tileheight], label:"left"},
                {rect:[0,0,this.tilewidth,this.tileheight], jump:"left"}
            ]);
            this.image = this.mc;
            this.mc.gotoAndPlay("left");
            */
        }
        this.image = this.container;
        this.showWorkerName(worker.workername);
        this.showRoleName(worker.rolename);
    };
    Worker.prototype.showWorkerName = function(text){
        var fontHeight = 12;
        var txt = new Q.Text({font:fontHeight+"px arial",x:0,y:80,width:this.mcwidth,height:(fontHeight+5),lineWidth:this.mcwidth, color:"#fff",text:text,textAlign:"center"});
        this.container.addChild(txt);
    };

    Worker.prototype.showRoleName = function(text){
        var fontHeight = 12;
        var txt = new Q.Text({font:fontHeight+"px arial",x:0,y:100,width:this.mcwidth,height:(fontHeight+5),lineWidth:this.mcwidth, color:"#fff",text:text,textAlign:"center"});
        this.container.addChild(txt);
    };

    Worker.prototype.getImgx= function(x,y){
        return this.mapCoordinater.getGx(x,y,this.tilewidth,this.mapwidth);
    };
    Worker.prototype.getImgy = function(x,y){
        return this.mapCoordinater.getGy(x,y,this.tileheight);
    };
    return Worker;
});