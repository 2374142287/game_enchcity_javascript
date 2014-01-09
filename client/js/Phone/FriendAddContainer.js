/**
 * Created with JetBrains WebStorm.
 * User: john
 * Date: 13-3-17
 * Time: 下午3:35
 * To change this template use File | Settings | File Templates.
 */
define(['jquery',winSize+'/BackBtn'],function($,BackBtn){
    var FriendAddContainer = function(props)
    {
        FriendAddContainer.superClass.constructor.call(this, props);
        this.init();
    };

    Q.inherit(FriendAddContainer, Q.DisplayObjectContainer);

    FriendAddContainer.prototype.init = function(){
        this.width = Views.DisplayObjectsDefine.displayer.fixWinWidth;
        this.height = Views.DisplayObjectsDefine.displayer.fixWinHeight;
        this.addChildAt(this.getBg(),0);
        var backBtn = new BackBtn({x:21,y:15},function(){
            Views.MainView.HideFriendAddContainer();
            Views.MainView.showFriendContainer();
        });
        this.addChildAt(backBtn,1);
        this.addChildAt(this.getTxt("请输入需要添加的好友昵称"),1);
        this.addChildAt(this.getTextBox(200,150,""),1);
        this.addChildAt(this.getAddBtn(),2);
    };

    FriendAddContainer.prototype.getAddBtn = function(){
        var self = this;
        var iconWidth = 207;
        var iconHeight = 63;
        var px = 440;
        var py = 345;
        var cx = 1;
        var cy = 613;
        var btn = new Q.Button({image:LoadedImages.friendaddbg.image, x:px, y:py, width:iconWidth, height:iconHeight,
            up:{rect:[cx,cy,iconWidth,iconHeight]},
            down:{rect:[cx,cy,iconWidth,iconHeight]}
        });

        btn.addEventListener(events[2], function(e)
        {
            Sockets.send_ReqFriendSrchAdd(self.textInput.getValue());
            Views.MainView.HideFriendAddContainer();
        });
        return btn;
    };

    FriendAddContainer.prototype.getTextBox = function(px,py,value){
        var width = 712;
        var height = 70;
        var inputHeight = 45;
        var container = new Q.DisplayObjectContainer({x:px,y:py,width:width,height:height});
        var bg = new Q.Bitmap({image:LoadedImages.friendaddbg.image,rect:[1,542,width,height]});
        this.textInput = new Q.TextBox({x:0,y:(height-inputHeight)/2,width:width,height:inputHeight + 10,value:value,style:{color:"#fff",transparent:"1",font:inputHeight+"px"}});
        container.addChildAt(bg,0);
        container.addChildAt(this.textInput,1);
        return container;
    };

    FriendAddContainer.prototype.getTxt = function(text){
        var width = 720;
        var height = 44;
        var px = 200;
        var py = 70;
        return new Q.Text({font:height+"px arial",x:px,y:py,width:width,height:height, color:"#ffffff",text:text,textAlign:"left"});
    };

    FriendAddContainer.prototype.getBg = function(){
        return new Q.Bitmap({image:LoadedImages.friendaddbg.image,x:0,y:0,width:this.width,height:this.height,rect:[0,0,this.width,this.height]});
    };

    return FriendAddContainer;
});