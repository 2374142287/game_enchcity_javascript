/**
 * Created with JetBrains WebStorm.
 * User: john
 * Date: 13-3-24
 * Time: 下午4:51
 * To change this template use File | Settings | File Templates.
 */
define(function(){
    var InfoBarLeader = function()
    {
        InfoBarLeader.superClass.constructor.call(this);
        this.init();
    };

    Q.inherit(InfoBarLeader, Q.DisplayObjectContainer);

    InfoBarLeader.prototype.init = function(){
        this.width = 960;
        this.height = 143;
        this.addChild(this.getBg());
    };

    InfoBarLeader.prototype.GetBg = function(){
        var bg = new Q.Bitmap({image:LeaderImages.infobar.image,rect:[0,0,960,143]});
        return bg;
    };
    return InfoBarLeader;
});
