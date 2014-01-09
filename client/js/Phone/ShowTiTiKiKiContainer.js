/**
 * Created with JetBrains WebStorm.
 * User: john
 * Date: 13-3-24
 * Time: 上午2:29
 * To change this template use File | Settings | File Templates.
 */
define(function(){
    var ShowTiTiKiKiContainer = function(props)
    {
        ShowTiTiKiKiContainer.superClass.constructor.call(this, props);
        this.init();
    };

    Q.inherit(ShowTiTiKiKiContainer, Q.DisplayObjectContainer);

    ShowTiTiKiKiContainer.prototype.init = function(){
        this.width = 80;
        this.height = 110;
        this.x = 20;
        this.y = 360;
    };

    ShowTiTiKiKiContainer.prototype.show = function(message){
        var self = this;
        if(message.typecode == 'E1') self.showTiTi();
        if(message.typecode == 'E3') self.showKiKi();
        if(typeof(message.name) != 'undefined'&& message.name != null)  self.showName(message.name);
    };

    ShowTiTiKiKiContainer.prototype.showInvite = function(props){
        var self = this;
        var showtiti = false;
        var showkiki = false;
        for(var i=0;i<props.length;i++)
        {
            if(props[i].typecode == 'E1'|| props[i].typecode == 'E2') showtiti = true;
            if(props[i].typecode == 'E3'|| props[i].typecode == 'E4') showkiki = true;
        }
        self.clear();
        if(showtiti) self.showTiTi();
        if(showkiki) self.showKiKi();
    };

    ShowTiTiKiKiContainer.prototype.showTiTi = function(){
        this.removeAllChildren();
        this.addChild(new Q.Bitmap({image:LoadedImages.invitetiti.image}));
    };

    ShowTiTiKiKiContainer.prototype.showKiKi = function(){
        this.removeAllChildren();
        this.addChild(new Q.Bitmap({image:LoadedImages.invitekiki.image}));
    };
    ShowTiTiKiKiContainer.prototype.showName = function(text){
        var fontHeight = 20;
        var txt = new Q.Text({font:fontHeight+"px arial",x:0,y:82,width:this.width,height:(fontHeight+5),lineWidth:this.width, color:"#fff",text:text,textAlign:"left"});
        this.addChild(txt);
    };
    ShowTiTiKiKiContainer.prototype.clear = function(){
        this.removeAllChildren();
    };
    return ShowTiTiKiKiContainer;
});