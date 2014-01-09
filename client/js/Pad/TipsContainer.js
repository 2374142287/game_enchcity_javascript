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
        this.tipIndex = 0;
        this.width = 70*(this.tipIndex+1);
        this.height = 91;
        this.iconWidth = 70;
        this.iconHeight = 91;
        this.Margin = 5;
    };

    TipsContainer.prototype.add = function(guestId){
        this.Tips[this.tipIndex] = guestId;
        this.tipIndex++;
        this.reDraw();
    },

        TipsContainer.prototype.reDraw = function(){
            this.removeAllChildren();
            this.width = (this.iconWidth+this.Margin) * (this.tipIndex+1);
            for(var i=0;i<this.tipIndex;i++){
                this.addChild(this.getNewTip(i,this.Tips[i]));
            }
        },

    TipsContainer.prototype.getNewTip = function(id,guestId){
        var container = new Q.DisplayObjectContainer({width:this.iconWidth,height:this.height,x:id *(this.iconWidth+this.Margin) ,y:0});
        container.addChildAt(this.getMC(),0);
        container.addChildAt(this.getBtn(guestId),1);
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
            self.remove(guestId);
            Sockets.send_ReqGuestTipsData(guestId);
        });
        return btn;
    },

    TipsContainer.prototype.getMC = function(){
            var heart = new Q.MovieClip({image:LoadedImages.tipicon.image,x:0,y:0,width:this.iconWidth ,height:this.iconHeight,interval:500});
            heart.addFrame([
                {rect:[1224,0,this.iconWidth,this.iconHeight], label:"alive"},
                {rect:[1224 + this.iconWidth + this.iconMargin,0,this.iconWidth,this.iconHeight], label:"alive"}
            ]);
            heart.gotoAndPlay("alive");
            return heart;
    };

    TipsContainer.prototype.remove = function(id){
        for(var i=0;i<this.tipIndex && i<this.Tips.length;i++){
            if(this.Tips[i] == id) this.Tips[i] = this.Tips[i+1];
        }
        this.tipIndex--;
        this.reDraw();
    }

    return TipsContainer;
});