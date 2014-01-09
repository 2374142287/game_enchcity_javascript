/**
 * Created with JetBrains WebStorm.
 * User: john
 * Date: 13-2-13
 * Time: 下午7:09
 * To change this template use File | Settings | File Templates.
 */
define(['jquery'],function($){
    var FriendContainer = function(friend)
    {
        FriendContainer.superClass.constructor.call(this);
        this.init(friend);
    };

    Q.inherit(FriendContainer, Q.DisplayObjectContainer);

    FriendContainer.prototype.init = function(friend){
        //this.iconSize = 106;
        //this.iconMargin = 1;
        //this.addChild(this.GetIcon(friend.roleid,Views.MainView.ShowHideFriendInfo));
        this.addChild(this.GetIcon(friend,Views.MainView.ShowHideFriendInfo));
        this.addChildAt(this.getShowFriendName(friend.nickname),1);
    };

    FriendContainer.prototype.GetIcon = function(friend,action){
        if(friend.frienduserid == -1){
            return new Q.Button({image:LoadedImages.friendui.image, width:friend.photow, height:friend.photoh,
                up:{rect:[578,0,friend.photow,friend.photoh]},
                //over:{rect:[766,158,this.iconSize+1,this.iconSize+1]},
                down:{rect:[577,108,friend.photow,friend.photoh]}
            });
        }else{
            var btn = new Q.Button({image:Resources.getImage(friend.photo), width:friend.photow, height:friend.photoh,
                up:{rect:[friend.photox,friend.photoy,friend.photow,friend.photoh]},
                //over:{rect:[sx,sx+this.iconSize,this.iconSize,this.iconSize]},
                down:{rect:[friend.photox,friend.photoy,friend.photow,friend.photoh]}
            });
            btn.addEventListener(events[2], function(e)
            {
                action(friend);
            });
            return btn;
        }
    };
    FriendContainer.prototype.getShowFriendName = function(text){
        if(text.length>3) text = text.substring(0,3)+"...";
        var maxHeight = 42;
        var height = 26;
        var py = (maxHeight - height)/2;
        return new Q.Text({font:(height-2)+"px arial",x:0,y:py,width:this.iconSize,height:height, color:"#fff",text:text,textAlign:"center"});
    };

    return FriendContainer;
});