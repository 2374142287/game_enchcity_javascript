/**
 * Created with JetBrains WebStorm.
 * User: john
 * Date: 13-2-8
 * Time: 下午8:49
 * To change this template use File | Settings | File Templates.
 */

define(['TilesMap/mapCoordinater','TilesMap/BStar'], function(MapCoordinater,BStar) {
    var Character = function(props,guest,img,tilewidth,tileheight,mapwidth)
    {
        Character.superClass.constructor.call(this, props,guest,img,tilewidth,tileheight,mapwidth);
        this.init(guest,img,tilewidth,tileheight,mapwidth);
    };
    Q.inherit(Character, Q.DisplayObjectContainer);
    Character.prototype.init = function(guest,img,tilewidth,tileheight,mapwidth){
        this.mapCoordinater = new MapCoordinater;
        this.id = Quark.UIDUtil.createUID("Character");
        this.guest = guest;
        //人物可穿越
        this.isblock = false;
        //头顶图标大小
        if(winSize=='Pad'){
            this.containerIconWidth = 105;
            this.iconWidth = 70;
            this.iconHeight = 91;
            this.iconMargin = 1;
        }else{
            this.containerIconWidth = 52;
            this.iconWidth = 36;
            this.iconHeight = 46;
            this.iconMargin = 1;
        }

        this.containerHeight = Views.DisplayObjectsDefine.houseTileSetHeight;

        this.mcwidth = 80;
        this.mcheight = 237;
        this.tilewidth = this.mcwidth;
        this.tileheight = tileheight;
        this.mapwidth = mapwidth;
        //一格走几步
        this.step = 5;
        //误差为当前高度或宽度除以step加上6
        this.deviation = 6 + (this.tilewidth>this.tileheight?this.tilewidth:this.tileheight)/this.step;
        //切图开始坐标
        this.mcCx = 1;
        this.mcCy = 1;
        //切图间距
        this.mcMargin = 1;
        this.mcX = this.mcCx + (this.mcwidth + this.mcMargin)*0;
        this.mcY = this.mcCy + (this.mcheight + this.mcMargin)*2;

        this.mc = new Q.MovieClip({image:img,x:0,y:0,width:40,height:237,interval:100});
//this.mcX:1this.mcwidth:80this.mcY:477this.mcheight:237
        //      alert("this.mcX:"+this.mcX+"this.mcwidth:"+this.mcwidth+"this.mcY:"+this.mcY+"this.mcheight:"+this.mcheight+"this.containerHeight:"+this.containerHeight);


        this.mc.addFrame([
            {rect:[0,0,40,55], label:"stand", stop:1},
            {rect:[0,0,40,55], label:"walkdown"},
            {rect:[41,0,40,55]},
            {rect:[82,0,40,55]},
            {rect:[123,0,40,55], jump:"walkdown"},
            {rect:[0,56,40,55], label:"walkright"},
            {rect:[41,56,40,55]},
            {rect:[82,56,40,55]},
            {rect:[123,56,40,55], jump:"walkright"},
            {rect:[0,113,40,55], label:"walkleft"},
            {rect:[41,113,40,55]},
            {rect:[82,113,40,55]},
            {rect:[123,113,40,55], jump:"walkleft"},
            {rect:[0,170,40,55], label:"walkup"},
            {rect:[41,170,40,55]},
            {rect:[82,170,40,55]},
            {rect:[123,170,40,55], jump:"walkup"}

            /*{rect:[0,0,this.mcwidth,this.containerHeight], label:"stand", stop:1},
             {rect:[0,0,40,237], label:"walkdown"},
             {rect:[41,0,40,237]},
             {rect:[82,0,40,237]},
             {rect:[123,0,40,237], jump:"walkdown"},
             {rect:[164,0,40,237], label:"walkright"},
             {rect:[205,0,40,237]},
             {rect:[246,0,40,237]},
             {rect:[287,0,40,237], jump:"walkright"},
             {rect:[0,238,40,237], label:"walkleft"},
             {rect:[41,238,40,237]},
             {rect:[82,238,40,237]},
             {rect:[123,238,40,237], jump:"walkleft"},
             {rect:[164,238,40,237], label:"walkup"},
             {rect:[205,238,40,237]},
             {rect:[246,238,40,237]},
             {rect:[287,238,40,237], jump:"walkup"}*/

        ]);


        /*
         //this is for 01.png
         {rect:[0,0,this.mcwidth,this.containerHeight], label:"stand", stop:1},
         {rect:[0,0,40,237], label:"walkdown"},
         {rect:[41,0,40,237]},
         {rect:[82,0,40,237]},
         {rect:[123,0,40,237], jump:"walkdown"},
         {rect:[164,0,40,237], label:"walkright"},
         {rect:[205,0,40,237]},
         {rect:[246,0,40,237]},
         {rect:[287,0,40,237], jump:"walkright"},
         {rect:[0,238,40,237], label:"walkleft"},
         {rect:[41,238,40,237]},
         {rect:[82,238,40,237]},
         {rect:[123,238,40,237], jump:"walkleft"},
         {rect:[164,238,40,237], label:"walkup"},
         {rect:[205,238,40,237]},
         {rect:[246,238,40,237]},
         {rect:[287,238,40,237], jump:"walkup"}
         */

        /*
         {rect:[0,0,40,73], label:"walkdown"},
         {rect:[41,0,40,73]},
         {rect:[82,0,40,73]},
         {rect:[123,0,40,73], jump:"walkdown"},
         {rect:[0,74,40,73], label:"walkright"},
         {rect:[41,74,40,73]},
         {rect:[82,74,40,73]},
         {rect:[123,74,40,73], jump:"walkright"},
         {rect:[0,148,40,73], label:"walkleft"},
         {rect:[41,148,40,73]},
         {rect:[82,148,40,73]},
         {rect:[123,148,40,73], jump:"walkleft"},
         {rect:[0,222,40,73], label:"walkup"},
         {rect:[41,222,40,73]},
         {rect:[82,222,40,73]},
         {rect:[123,222,40,73], jump:"walkup"}
         */

        //当前格起始坐标
        this.sx = this.getImgx(this.x,this.y);
        this.sy = this.getImgy(this.x,this.y);
        //当前格目标坐标
        this.tx = this.sx;
        this.ty = this.sy;
        this.tgx = 0;
        this.tgy = 0;
        //临时存储的坐标
        this.tempx = this.x;
        this.tempy = this.y;
        this.bStar = new BStar(mapwidth,mapwidth);
        this.targetRoads;
        this.stepId;
        //是否在当前一格中设置了zIndex
        this.isSetZindex;
        //是否被删除
        this.isOut = false;
        //是否可以走下一步
        //this.canWalk = true;
        //行动定时器
        //this.timer = new Q.Timer(1);
        //动作
        this.action;
        //目标动作，随机跑动/出店
        this.targetAction = "random";
        //小费图标
        this.heart = this.getHeart();

        this.container = this.getContainer({width:this.tilewidth,height:this.containerHeight,x:this.sx,y:this.sy});
        this.container.addChildAt(this.mc,0);
        this.image = this.container;
        if(winSize=='Pad'){
            this.childContainer = this.getContainer({width:this.containerIconWidth,height:this.iconHeight,x:31,y:189});
        }else{
            this.childContainer = this.getContainer({width:this.containerIconWidth,height:this.iconHeight,x:15,y:95});
        }
        this.container.addChildAt(this.childContainer,1);
    };

    Character.prototype.getContainer = function(prop){
        return new Q.DisplayObjectContainer(prop);
    };

    Character.prototype.showExGold = function(){
        var self = this;
        this.childContainer.removeAllChildren();
        if(winSize=='Pad'){
            var addIconWidth = 105;
            var addIconHeight = 35;
        }
        else{
            var addIconWidth = 53;
            var addIconHeight = 18;
        }
        var timer = new Q.Timer(60);
        timer.addListener(Q.Tween);
        timer.start();

        var goldAdd = new Q.Bitmap({image:LoadedImages.tipicon.image,alpha:0,x:0,y:addIconHeight,width:addIconWidth,height:addIconHeight,rect:[742,5,addIconWidth,addIconHeight]});
        var ExpAdd = new Q.Bitmap({image:LoadedImages.tipicon.image,alpha:0,x:0,y:addIconHeight,width:addIconWidth,height:addIconHeight,rect:[742,23,addIconWidth,addIconHeight]});

        Q.Tween.to(goldAdd, {y:(this.iconHeight - addIconHeight) >> 1, alpha:1,loop:false}, {time:300, onComplete:function(tween)
        {
            Q.Tween.to(goldAdd, {y:-this.iconHeight, alpha:0}, {time:300, delay:500, onComplete:function()
            {
                Q.Tween.to(ExpAdd, {y:(this.iconHeight - addIconHeight) >> 1, alpha:1}, {time:300, onComplete:function(tween)
                {
                    Q.Tween.to(ExpAdd, {y:-this.iconHeight, alpha:0}, {time:300, delay:500, onComplete:function()
                    {
                        self.childContainer.removeAllChildren();
                        //timer.stop();
                    }});
                }});
            }});
        }});
        this.childContainer.addChild(goldAdd);
        this.childContainer.addChild(ExpAdd);
    };

    Character.prototype.showFood = function(drinkid,desertid,hastip){
        var self = this;
        this.childContainer.removeAllChildren();
        var drink = this.getFood(drinkid);
        var desert = this.getFood(desertid);
        this.childContainer.addChild(drink);
        var timer = new Q.Timer(60);
        timer.addListener(Q.Tween);
        timer.start();
        if(drink == -1)
        {
            if(desert == -1){
                timer.stop();
                if(hastip==1 && self.guest.userid == userid)
                {
                    Views.MainView.tipsContainer.add(self.guest);
                    self.showHeart(self.guest);
                }
            }else{
                self.childContainer.addChild(desert);
                Q.Tween.to(desert, {alpha:1}, {time:300, onComplete:function(tween)
                {
                    Q.Tween.to(desert, {alpha:0}, {time:300, delay:3000, onComplete:function(tween)
                    {
                        timer.stop();
                        if(hastip==1 && self.guest.userid == userid)
                        {
                            Views.MainView.tipsContainer.add(self.guest);
                            self.showHeart(self.guest);
                        }
                    }});
                }});
            }
        }else{
            Q.Tween.to(drink, {alpha:1}, {time:300, onComplete:function(tween)
            {
                Q.Tween.to(drink, { alpha:0}, {time:300, delay:12000, onComplete:function(tween)
                {
                    self.childContainer.removeAllChildren();
                    if(desert == -1){
                        timer.stop();
                        if(hastip==1 && self.guest.userid == userid) {
                            Views.MainView.tipsContainer.add(self.guest);
                            self.showHeart(self.guest);
                        }
                    }else{
                        self.childContainer.addChild(desert);
                        Q.Tween.to(desert, {alpha:1}, {time:300, onComplete:function(tween)
                        {
                            Q.Tween.to(desert, {alpha:0}, {time:300, delay:8000, onComplete:function(tween)
                            {
                                timer.stop();
                                if(hastip==1 && self.guest.userid == userid) {
                                    Views.MainView.tipsContainer.add(self.guest);
                                    self.showHeart(self.guest);
                                }
                            }});
                        }});
                    }
                }});
            }});
        }
    };

    Character.prototype.getFood = function(id){
        if(id == -2){
            var cx = 1150;
            if(winSize=='Phone') cx = 592;
            //trace("FindFoodId:"+id + " tipicon");
            return new Q.Bitmap({
                image:LoadedImages.tipicon.image,
                x:(this.containerIconWidth-this.iconWidth)/2,
                y:0,
                width:this.iconWidth,
                height:this.iconHeight,
                alpha:1,
                rect:[cx,0,this.iconWidth,this.iconHeight]
            });
        }else if(id != -1){
            var food = Views.MainView.ToolBarContainer.foodManager.get(id);
            //trace("FindFoodId:"+id + " "+food.buyphoto);
            return new Q.Bitmap({
                image:Resources.getImage(food.buyphoto),
                x:(this.containerIconWidth-food.buyphotow)/2,
                y:0,
                width:food.buyphotow,
                height:food.buyphotoh,
                alpha:1,
                rect:[food.buyphotox,food.buyphotoy,food.buyphotow,food.buyphotoh]
            });
        }
        return -1;
        /*
         var sx = id * (this.iconWidth +this.iconMargin);
         var btn = new Q.Bitmap({
         image:LoadedImages.tipicon.image,
         x:(this.containerIconWidth-this.iconWidth)/2,
         y:0,
         width:this.iconWidth,
         height:this.iconHeight,
         rect:[sx,0,this.iconWidth,this.iconMargin]
         });*/
    };
    Character.prototype.showHeart = function(guest){
        var self = this;
        var iconWidth = 36;
        var iconHeight = 46;
        self.childContainer.removeAllChildren();
        var heart = new Q.MovieClip({image:LoadedImages.tipicon.image,x:0,y:0,width:iconWidth ,height:iconHeight,interval:500});
        if(guest.typecode == 'B'){
            heart.addFrame([
                {rect:[(iconWidth+1)*17,0,iconWidth,iconHeight], label:"alive"},
                {rect:[(iconWidth+1)*17,0,iconWidth,iconHeight], jump:"alive"}
            ]);
        }else if(guest.typecode == 'C'){
            heart.addFrame([
                {rect:[(iconWidth+1)*18,0,iconWidth,iconHeight], label:"alive"},
                {rect:[(iconWidth+1)*18,0,iconWidth,iconHeight], jump:"alive"}
            ]);
        }else{
            heart.addFrame([
                {rect:[(iconWidth+1)*19,0,iconWidth,iconHeight], label:"alive"},
                {rect:[(iconWidth+1)*19,0,iconWidth,iconHeight], jump:"alive"}
            ]);
        }
        this.childContainer.addChildAt(heart,0);
        heart.gotoAndPlay("alive");
        /*
         var btn = new Q.Button({
         image:LoadedImages.tipicon.image,x:(this.containerIconWidth-this.iconWidth)/2,y:0,width:this.iconWidth ,height:this.iconHeight,
         up:{rect:[1224,0,this.iconWidth,this.iconHeight]},
         down:{rect:[1224 + this.iconWidth + this.iconMargin,0,this.iconWidth,this.iconHeight]}
         });

         btn.addEventListener(events[0], function(e) {
         self.childContainer.removeAllChildren();
         //this.childContainer.useHandCursor(false);
         Sockets.send_ReqGuestTipsData(id);
         });
         this.childContainer.addChildAt(btn,0);
         */
    };
    Character.prototype.clearStatus = function(){
        this.childContainer.removeAllChildren();
    },
        Character.prototype.getHeart = function(){

            var cx = 1224;
            if(winSize=='Phone') cx = 629;

            var heart = new Q.MovieClip({image:LoadedImages.tipicon.image,x:(this.containerIconWidth-this.iconWidth)/2,y:0,width:this.iconWidth ,height:this.iconHeight,interval:500});
            heart.addFrame([
                {rect:[cx,0,this.iconWidth,this.iconHeight], label:"alive"},
                {rect:[cx + this.iconWidth + this.iconMargin,0,this.iconWidth,this.iconHeight], label:"alive"}
            ]);
            heart.gotoAndPlay("alive");
            return heart;
        };
    Character.prototype.getImgx= function(x,y){
        //alert("this.mapwidth:"+this.mapwidth+"this.tilewidth"+this.tilewidth+x+y);
        return this.mapCoordinater.getGx(x,y,this.tilewidth,this.mapwidth,"character");
    };
    Character.prototype.getImgy = function(x,y){
        return this.mapCoordinater.getGy(x,y,this.tileheight,"character");
    };
    Character.prototype.SetZIndex = function(x,y){
        this.isSetZindex = true;
        //this.SetAction(x,y);
        //trace("x+y:"+(x+y)+">this.x+this.y:"+(this.x+this.y));
        //if(x+y>this.x+this.y){
        this.x = x;
        this.y = y;
        //}
        //this.tempx = x;
        //this.tempy = y;
        Views.MainView.GameView.MapWorker.characters.updateZindex(this);
    };

    Character.prototype.OutDoor = function(){
        this.targetAction = "outdoor";
        this.childContainer.removeAllChildren();
        Views.MainView.tipsContainer.remove(this.guest.guestid);
        //this.Go(0,1);
        this.isOut = true;
        Views.MainView.GameView.MapWorker.deleteCharacter(this.guest.guestid);
    };
    Character.prototype.RandomTarget = function(){
        var self = this;
        //var nextx = parseInt((Views.MainView.GameView.MapWorker.map.width)*Math.random());
        //var nexty = parseInt((Views.MainView.GameView.MapWorker.map.height)*Math.random());
        var tempIndex = parseInt((Views.MainView.GameView.MapWorker.getGuestCount())*Math.random());
        var nextx = Views.MainView.GameView.MapWorker.guestData[tempIndex].devX;
        var nexty = Views.MainView.GameView.MapWorker.guestData[tempIndex].devY;
        trace("==========randomTarget x:"+nextx + " y:"+ nexty);
        ///至少五步以上才可以寻路
        trace("==========self x:"+self.tgx + " y:"+ self.tgy);
        if(self.tgx == nextx && self.tgy == nexty){//&&Math.abs(this.x-nextx)+Math.abs(this.y - nexty)>5){
            this.RandomTarget();
            //trace("randomTarget x:"+point.x + " y:"+ point.y);
        }
        else{
            //this.getExGold();
            this.Go(nextx,nexty);
        }
        self.tgx = nextx;
        self.tgy = nexty;
    };
    Character.prototype.GoNextAction = function(){
        switch(this.targetAction){
            case "random":
                this.RandomTarget();
                break;
            case "outdoor":
                if(!this.isOut){
                    Views.MainView.GameView.MapWorker.deleteCharacter(this.guest.guestid);
                    this.isOut = true;
                }
                break;
        }
        //if(!this.isOut)  this.GoNextStep();
    };
    Character.prototype.Go = function(x,y){
        //trace("from x:"+this.x+" y:"+this.y+"to x:"+x+" y:"+y);
        this.bStar = new BStar(Views.MainView.GameView.MapWorker.map.width,Views.MainView.GameView.MapWorker.map.height);
        this.bStar.move(this.x,this.y,x,y);
        if(this.bStar.end) this.targetRoads = this.bStar.resultLines;
        else {//寻路不成功
            this.RandomTarget();
        }
        this.stepId = 0;
    };
    Character.prototype.GoNextStep = function(){
        var self = this;
        ///////////一格结束，走下一格
        if(self.canWalk() && self.targetRoads != undefined){
            if(self.stepId >= self.targetRoads.length)
            {
                self.x = self.targetRoads[self.targetRoads.length-1].X;
                self.y = self.targetRoads[self.targetRoads.length-1].Y;
                self.Stand();
                var guestCount = Views.MainView.GameView.MapWorker.getGuestCount();
                var fComponent;
                for(var i = 0; i < guestCount; i++){
                    var gx = Views.MainView.GameView.MapWorker.guestData[i].devX;
                    var gy = Views.MainView.GameView.MapWorker.guestData[i].devY;
                    if(self.x == gx && self.y == gy){
                        fComponent = Views.MainView.GameView.MapWorker.guestData[i];
                    }
                }
                //消费
                Sockets.send_ReqGusetXF(fComponent.devGuestPrice, fComponent.castleId);
                Player.money += fComponent.devGuestPrice;
                self.GoNextAction();//寻路结束则停止
            }
            else{
                var px = self.targetRoads[self.stepId].X;
                var py = self.targetRoads[self.stepId].Y;
                self.tx = this.getImgx(px,py);
                self.ty = this.getImgy(px,py);
                //trace("self.tempx:"+self.tempx+"px:"+px+"self.tempy:"+self.tempy+"py:"+py);
                if(self.tempy > py){
                    //trace("L");
                    self.action = "WalkLeft";
                    self.WalkLeft();
                }
                else if(self.tempy < py){
                    //trace("R");
                    self.action = "WalkRight";
                    self.WalkRight();
                }
                else if(self.tempx> px){
                    //trace("U");
                    self.action = "WalkUp";
                    self.WalkUp();
                }
                else if(self.tempx < px){
                    //trace("D");
                    self.action = "WalkDown";
                    self.WalkDown();
                }
                else if(self.tempx==px&&this.tempy==py){
                    self.Stand();
                }

                self.tempx = px;
                self.tempy = py;

                self.sx = self.getImgx(self.tempx,self.tempy);
                self.sy = self.getImgy(self.tempx,self.tempy);
            }

            self.stepId++;
        }

        if(self.container.x < self.tx) self.container.x+=2;
        if(self.container.x > self.tx) self.container.x-=2;

        if(self.container.y < self.ty) self.container.y+=2;
        if(self.container.y > self.ty) self.container.y-=2;
        ///////////调整Z-Index
        //由高到低时，必须全部离开当前格才可以设置zIndex
        if((self.action == "WalkUp" || self.action == "WalkLeft")
            && self.getEqual(self.container.x,self.tx)
            && self.getEqual(self.container.y,self.ty)
            && self.stepId < self.targetRoads.length){
            var px = self.targetRoads[self.stepId].X;
            var py = self.targetRoads[self.stepId].Y;
            //alert("self.targetRoads[self.stepId].X"+self.targetRoads[self.stepId].X+"self.targetRoads[self.stepId].Y"+self.targetRoads[self.stepId].Y);
            self.SetZIndex(px,py);
        }
        //由低到高时，只要进入下一格，就可以设置zIndex
        if((self.action == "WalkDown" || self.action == "WalkRight")
            && self.getEqual(self.container.x,self.sx)
            && self.getEqual(self.container.y,self.sy)
            && self.stepId < self.targetRoads.length){
            var px = self.targetRoads[self.stepId].X;
            var py = self.targetRoads[self.stepId].Y;
            self.SetZIndex(px,py);
        }

        /*
         if(self.canWalk() && self.targetRoads != undefined){
         if(self.stepId >= self.targetRoads.length)
         {
         self.x = self.targetRoads[self.targetRoads.length-1].X;
         self.y = self.targetRoads[self.targetRoads.length-1].Y;
         self.Stand();
         self.GoNextAction();   //寻路结束则停止
         }else{
         var px = self.targetRoads[self.stepId].X;
         var py = self.targetRoads[self.stepId].Y;
         //trace("self.tempx:"+self.tempx+"px:"+px+"self.tempy:"+self.tempy+"py:"+py);
         if(self.tempy > py){
         //trace("L");
         self.action = "WalkLeft";
         self.WalkLeft();
         }
         else if(self.tempy < py){
         //trace("R");
         self.action = "WalkRight";
         self.WalkRight();
         }
         else if(self.tempx> px){
         //trace("U");
         self.action = "WalkUp";
         self.WalkUp();
         }
         else if(self.tempx < px){
         //trace("D");
         self.action = "WalkDown";
         self.WalkDown();
         }
         else if(self.tempx==px&&this.tempy==py){
         self.Stand();
         }

         self.tx = this.getImgx(px,py);
         self.ty = this.getImgy(px,py);
         //trace("px:"+px+" py:"+py);
         self.timer = new Q.Timer(60);
         timer.addListener(Q.Tween);
         timer.start();

         Q.Tween.to(self.container, {x:self.tx,y:self.ty,loop:false}, {time:2000,
         onUpdate:function(tween, elapsed){
         //trace("cx:"+self.container.x+" cy:"+self.container.y);
         //trace("tx:"+self.tx+" ty:"+self.ty);
         //trace("sx:"+self.sx+" sy:"+self.sy);
         //由高到低时，必须全部离开当前格才可以设置zIndex
         if((self.action == "WalkUp" || self.action == "WalkLeft")
         && self.getEqual(self.container.x,self.tx)
         && self.getEqual(self.container.y,self.ty)
         && self.stepId < self.targetRoads.length){
         var px = self.targetRoads[self.stepId].X;
         var py = self.targetRoads[self.stepId].Y;
         self.SetZIndex(px,py);
         }
         //由低到高时，只要进入下一格，就可以设置zIndex
         if((self.action == "WalkDown" || self.action == "WalkRight")
         && self.getEqual(self.container.x,self.sx)
         && self.getEqual(self.container.y,self.sy)
         && self.stepId < self.targetRoads.length){
         var px = self.targetRoads[self.stepId].X;
         var py = self.targetRoads[self.stepId].Y;
         self.SetZIndex(px,py);
         }
         },
         onComplete:function(tween)
         {
         //trace("Tween x:"+px+",y:"+py);
         self.tempx = px;
         self.tempy = py;

         self.sx = self.getImgx(self.tempx,self.tempy);
         self.sy = self.getImgy(self.tempx,self.tempy);

         self.container.x = self.tx;
         self.container.y = self.ty;

         self.stepId++;
         //if(!this.isOut) self.GoNextStep();
         }
         });
         }
         }
         */
    };

    Character.prototype.canWalk = function(){
        var self = this;
        if(self.container.x == self.tx && self.container.y == self.ty)
        {
            return true;
        }
        return false;
    };
    Character.prototype.getEqual = function(var1,var2){
        if(var1 >= (var2-this.deviation)&&var1 <= (var2+this.deviation)) return true;
        else return false;
    };
    Character.prototype.Stand= function(){
        this.mc.gotoAndPlay("stand");
    };
    Character.prototype.WalkUp= function(){
        this.mc.gotoAndPlay("walkup");
    };
    Character.prototype.WalkDown = function(){
        this.mc.gotoAndPlay("walkdown");
    };
    Character.prototype.WalkLeft = function(){
        this.mc.gotoAndPlay("walkleft");
    };
    Character.prototype.WalkRight= function(){
        this.mc.gotoAndPlay("walkright");
    };
    Character.prototype.Cheer= function(){
        this.mc.gotoAndPlay("cheer");
    };
    return Character;
});