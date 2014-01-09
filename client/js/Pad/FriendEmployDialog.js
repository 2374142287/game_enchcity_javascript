/**
 * Created with JetBrains WebStorm.
 * User: john
 * Date: 13-2-18
 * Time: 下午8:37
 * To change this template use File | Settings | File Templates.
 */
define(['jquery',winSize+'/CloseBtn'],function($,CloseBtn){
    var FriendEmployDialog = function(props)
    {
        FriendEmployDialog.superClass.constructor.call(this, props);
        this.init();
    };

    Q.inherit(FriendEmployDialog, Q.DisplayObjectContainer);

    FriendEmployDialog.prototype.init = function(){
        this.width = 284;
        this.height = 373;

        this.btnWidth = 200;
        this.btnHeight = 55;
        this.btncMargin = 1;
        this.btnpMargin = 14;

        this.addChildAt(this.GetBg(),0);
        this.addChildAt(new CloseBtn({x:188,y:0},function(){
            Views.MainView.HidefriendEmployDialog();
        }),1);

        this.addChildAt(this.GettiaojiuShiBtn(),1);
        this.addChildAt(this.GetyinlvShiBtn(),1);
        this.addChildAt(this.GetfuwuShengBtn(),1);
    };

    FriendEmployDialog.prototype.GettiaojiuShiBtn = function(){
        return this.GetBtn(0);
    };

    FriendEmployDialog.prototype.GetyinlvShiBtn = function(){
        return this.GetBtn(1);
    };

    FriendEmployDialog.prototype.GetfuwuShengBtn = function(){
        return this.GetBtn(2);
    };

    FriendEmployDialog.prototype.GetBtn = function(id){
        var py = 131 + (this.btnHeight + this.btnpMargin)*id;
        var cy = (this.btnHeight+this.btncMargin)*id;
        var cx = 175;
        var downcx = 175 + this.btnWidth + this.btncMargin;
        return new Q.Button({image:LoadedImages.friendui.image, x:42,y:py,width:this.btnWidth,height:this.btnHeight,
            up:{rect:[175,cy,this.btnWidth,this.btnHeight]},
            down:{rect:[downcx,cy,this.btnWidth,this.btnHeight]}
        });
    };

    FriendEmployDialog.prototype.GetBg = function(){
        return new Q.Bitmap({image:LoadedImages.friendui.image,x:0,y:40,width:this.width,height:this.height-40,rect:[1636,0,this.width,this.height-40]});
    };

    return FriendEmployDialog;
});