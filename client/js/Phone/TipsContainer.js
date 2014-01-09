/**
 * Created with JetBrains WebStorm.
 * User: john
 * Date: 13-3-4
 * Time: 下午9:22
 * To change this template use File | Settings | File Templates.
 */
define(function() {
    var TipsContainer = function(props)
    {
        TipsContainer.superClass.constructor.call(this, props);
        this.init();
    };
    Q.inherit(TipsContainer, Q.DisplayObjectContainer);
    TipsContainer.prototype.init = function(){
        this.Tips = new Array();
        this.width = 960;
        this.height = 108;
        this.iconWidth = 72;
        this.iconHeight = 54;
        this.Margin = 8;
        this.maxNum = 9;

        /*
        this.iconWidth = 36;
        this.iconHeight = 46;
        this.Margin = 5;
        this.maxNum = 20;
        */
    };

    TipsContainer.prototype.add = function(guest){
        if(this.maxNum<this.Tips.length) this.Tips.splice(0,this.Tips.length - this.maxNum);
        if(!this.contains(guest)) this.Tips.push(guest);
        this.reDraw();
    },

        TipsContainer.prototype.contains = function(guest){
            for(var i=0;i<this.Tips.length;i++)
            {
                if(this.Tips[i] == guest) return true;
            }
            return false;
        },

        TipsContainer.prototype.reDraw = function(){
            this.removeAllChildren();
            for(var i=0;i<this.Tips.length;i++){
                this.addChildAt(this.getNewTip(i,this.Tips[i]),0);
            }
        },

    TipsContainer.prototype.getNewTip = function(id,guest){
        var container = new Q.DisplayObjectContainer({width:this.iconWidth,height:this.height,x:(80+id *(this.iconWidth+this.Margin)) ,y:54});
        container.addChildAt(this.getMC(guest),0);
        container.addChildAt(this.getBtn(guest.guestid),1);
        return container;
    },

    TipsContainer.prototype.getBtn = function(guestId){
        var self = this;
        var btn = new Q.Button({
            image:LoadedImages.hidebtn.image,x:0,y:0,width:this.iconWidth ,height:this.iconHeight,
            up:{rect:[0,0,this.iconWidth,this.iconHeight]},
            down:{rect:[0,0,this.iconWidth,this.iconHeight]}
        });

        btn.addEventListener(events[0], function(e) {
            if(Player.energy <=0){
                Views.MainView.ShowMessage("您的体力值不足！<br/>听说拜访好友可以增加一定的体力值！");
            }else{
                self.remove(guestId);
                Sockets.send_ReqGuestTipsData(guestId);
                Views.MainView.GameView.MapWorker.characters.get(guestId).showExGold();
            }
        });
        return btn;
    },

    TipsContainer.prototype.getMC = function(guest){
        var heart = new Q.MovieClip({image:LoadedImages.tiphearticon.image,x:0,y:0,width:this.iconWidth ,height:this.iconHeight,interval:500});
        if(guest.typecode == 'B'){
            heart.addFrame([
                {rect:[(this.iconWidth+0)*0,0,this.iconWidth,this.iconHeight], label:"alive"},
                {rect:[(this.iconWidth+0)*0,0,this.iconWidth,this.iconHeight], jump:"alive"}
            ]);
        }else if(guest.typecode == 'C'){
            heart.addFrame([
                {rect:[(this.iconWidth+0)*1,0,this.iconWidth,this.iconHeight], label:"alive"},
                {rect:[(this.iconWidth+0)*1,0,this.iconWidth,this.iconHeight], jump:"alive"}
            ]);
        }else{
            heart.addFrame([
                {rect:[(this.iconWidth+0)*2,0,this.iconWidth,this.iconHeight], label:"alive"},
                {rect:[(this.iconWidth+0)*2,0,this.iconWidth,this.iconHeight], jump:"alive"}
            ]);
        }
        /*
        var heart = new Q.MovieClip({image:LoadedImages.tipicon.image,x:0,y:0,width:this.iconWidth ,height:this.iconHeight,interval:500});
        if(guest.typecode == 'B'){
            heart.addFrame([
                {rect:[(this.iconWidth+1)*17,0,this.iconWidth,this.iconHeight], label:"alive"},
                {rect:[(this.iconWidth+1)*17,0,this.iconWidth,this.iconHeight], jump:"alive"}
            ]);
        }else if(guest.typecode == 'C'){
            heart.addFrame([
                {rect:[(this.iconWidth+1)*18,0,this.iconWidth,this.iconHeight], label:"alive"},
                {rect:[(this.iconWidth+1)*18,0,this.iconWidth,this.iconHeight], jump:"alive"}
            ]);
        }else{
            heart.addFrame([
                {rect:[(this.iconWidth+1)*19,0,this.iconWidth,this.iconHeight], label:"alive"},
                {rect:[(this.iconWidth+1)*19,0,this.iconWidth,this.iconHeight], jump:"alive"}
            ]);
        }
        */
        heart.gotoAndPlay("alive");
        return heart;
    };

    TipsContainer.prototype.remove = function(id){
        for(var i=0;i<this.Tips.length;i++){
            if(this.Tips[i].guestid == id)
            {
                this.Tips.splice(i,1);
            }
        }
        this.reDraw();
    };
    TipsContainer.prototype.clear = function(){
        this.Tips = [];
        this.reDraw();
    };

    return TipsContainer;
});