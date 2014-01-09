/**
 * Created with JetBrains WebStorm.
 * User: john
 * Date: 13-2-18
 * Time: 下午9:19
 * To change this template use File | Settings | File Templates.
 */

define(['jquery',winSize+'/CloseBtn'],function($,CloseBtn){
    var FriendMagicDialog = function(props)
    {
        FriendMagicDialog.superClass.constructor.call(this, props);
        this.init();
    };

    Q.inherit(FriendMagicDialog, Q.DisplayObjectContainer);

    FriendMagicDialog.prototype.init = function(){
        this.width = 284;
        this.height = 522;

        this.btnWidth = 200;
        this.btnHeight = 55;
        this.btncMargin = 1;
        this.btnpMargin = 14;

        this.friendId = 0;

        this.addChildAt(this.GetBg(),0);
        this.addChildAt(new CloseBtn({x:188,y:0},function(){
            Views.MainView.HidefriendMagicDialog();
        }),1);

        this.addChildAt(this.GetrumenzhouYuBtn(),1);
        this.addChildAt(this.GetdishengniNanBtn(),1);
        this.addChildAt(this.GetzhongjiyanShangBtn(),1);
        this.addChildAt(this.GetgaojiyinBaoBtn(),1);
        this.addChildAt(this.GetchuanshuozhongdefengyinmoFaBtn(),1);
    };

    FriendMagicDialog.prototype.GetrumenzhouYuBtn = function(){
        var btn = this.GetBtn(0);
        btn.addEventListener(events[2], function(e)
        {
            //var friendname = this.friend = Views.MainView.ToolBarContainer.friendManager.get(Views.MainView.friendMagicDialog.friendId).userName;
            var text = "是否确认花费XXX施放入门咒语给"+currentSelectedFriend.nickname;
            Views.MainView.friendSureDialog.show(text,function(){},function(){
                Views.MainView.HidefriendSureDialog();
                Views.MainView.ShowfriendMagicDialog();
            });
            Views.MainView.HidefriendMagicDialog();
        });
        return btn;
    };

    FriendMagicDialog.prototype.GetdishengniNanBtn = function(){
        return this.GetBtn(1);
    };

    FriendMagicDialog.prototype.GetzhongjiyanShangBtn = function(){
        return this.GetBtn(2);
    };

    FriendMagicDialog.prototype.GetgaojiyinBaoBtn = function(){
        return this.GetBtn(3);
    };

    FriendMagicDialog.prototype.GetchuanshuozhongdefengyinmoFaBtn = function(){
        return this.GetBtn(4);
    };

    FriendMagicDialog.prototype.GetBtn = function(id){
        var py = 152 + (this.btnHeight + this.btnpMargin)*id;
        var cy = (this.btnHeight+this.btncMargin)*(id+3);
        var cx = 175;
        var downcx = 175 + this.btnWidth + this.btncMargin;
        return new Q.Button({image:LoadedImages.friendui.image, x:42,y:py,width:this.btnWidth,height:this.btnHeight,
            up:{rect:[175,cy,this.btnWidth,this.btnHeight]},
            down:{rect:[downcx,cy,this.btnWidth,this.btnHeight]}
        });
    };

    FriendMagicDialog.prototype.GetBg = function(){
        return new Q.Bitmap({image:LoadedImages.friendui.image,x:0,y:40,width:this.width,height:this.height-40,rect:[1636,334,this.width,this.height-40]});
    };

    return FriendMagicDialog;
});