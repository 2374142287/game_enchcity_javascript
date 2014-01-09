/**
 * Created with JetBrains WebStorm.
 * User: john
 * Date: 13-3-24
 * Time: 下午3:16
 * To change this template use File | Settings | File Templates.
 */

define(function(){
    var LeaderMaskBg = function(props)
    {
        LeaderMaskBg.superClass.constructor.call(this, props);
        this.init();
    };

    Q.inherit(LeaderMaskBg, Q.DisplayObjectContainer);

    LeaderMaskBg.prototype.init = function(){
        this.x = 0;
        this.y = 0;
        this.width = Views.MainView.displayer.winWidth;
        this.height = Views.MainView.displayer.winHeight;
        this.addChild(this.getBg());
    };

    LeaderMaskBg.prototype.getBg = function(){
        return new Q.Bitmap({image:LoadedImages.bg.image,x:0,y:0,width:this.width,height:this.height,rect:[0,0,this.width,this.height]});
    };
    return LeaderMaskBg;
});