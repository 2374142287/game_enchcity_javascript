/**
 * Created with JetBrains WebStorm.
 * User: john
 * Date: 13-3-24
 * Time: 下午5:08
 * To change this template use File | Settings | File Templates.
 */
define(function(){
    var ToolBarLeader = function()
    {
        ToolBarLeader.superClass.constructor.call(this);
        this.init();
    };

    Q.inherit(ToolBarLeader, Q.DisplayObjectContainer);

    ToolBarLeader.prototype.init = function(){
        this.width = 480;
        this.height = 188;
        this.addChild(this.getBg());
    };

    ToolBarLeader.prototype.GetBg = function(){
        var bg = new Q.Bitmap({image:LeaderImages.mainui.image,rect:[0,0,960,188]});
        return bg;
    };
    return ToolBarLeader;
});