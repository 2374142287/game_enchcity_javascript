/**
 * Created with JetBrains WebStorm.
 * User: john
 * Date: 13-2-15
 * Time: 下午8:44
 * To change this template use File | Settings | File Templates.
 */
define(['jquery',winSize+'/CloseBtn'],function($,CloseBtn){
    var FriendInfo = function(props)
    {
        FriendInfo.superClass.constructor.call(this, props);
        this.init();
    };

    Q.inherit(FriendInfo, Q.DisplayObjectContainer);

    FriendInfo.prototype.init = function(){
    };

    FriendInfo.prototype.Show = function(friend){
        if(this.getNumChildren()>0) this.removeAllChildren();
        this.friend = friend;
        //this.friend = Views.MainView.ToolBarContainer.friendManager.get(friendId);
        currentSelectedFriend = this.friend;
        this.addChildAt(this.getBg(),0);
        var closeBtn = new CloseBtn({x:574,y:0},function(){
            Views.MainView.HideFriendInfo();
        });
        this.addChildAt(closeBtn,1);
        //标题
        this.addChildAt(this.GetuserNameTxt(),1);
        //内容
        this.addChildAt(this.GetSexXingZuoTxt(),1);
        this.addChildAt(this.GetbirthdayTxt(),1);
        this.addChildAt(this.GetMobileNumberTxt(),1);
        this.addChildAt(this.GetQianMingTxt(),1);
        this.addChildAt(this.GetUserClassTxt(),1);
        this.addChildAt(this.GetMohuanZhiTxt(),1);

        //对话框下方按钮
        this.addChildAt(this.GetMidBtn(72,465,0,this.baifangAction),1);
        this.addChildAt(this.GetMidBtn(259,465,0+46*2,this.employAction),1);
        this.addChildAt(this.GetMidBtn(446,465,0+46*4,this.magicAction),1);
    };

    FriendInfo.prototype.baifangAction = function(){
        Views.MainView.ShowfriendEmployDialog();
        Views.MainView.HideFriendInfo();
    };

    FriendInfo.prototype.employAction = function(){
        Views.MainView.ShowfriendEmployDialog();
        Views.MainView.HideFriendInfo();
    };

    FriendInfo.prototype.magicAction = function(){
        Views.MainView.ShowfriendMagicDialog();
        Views.MainView.HideFriendInfo();
    };

    FriendInfo.prototype.GetMidBtn = function(sx,sy,cy,action){
        return this.GetBtn(sx,sy,174,45,0,cy,cy+46,action);
    };

    FriendInfo.prototype.GetuserNameTxt = function(){
        return this.GetTxt(160,25,368,35,"#4E3D31",this.friend.nickname);
    };
    FriendInfo.prototype.GetSexXingZuoTxt = function(){
        return this.GetContentTxt(118,"性别:"+this.friend.sex+"    星座:"+this.friend.horoscope);
    };
    FriendInfo.prototype.GetbirthdayTxt = function(){
        return this.GetContentTxt(159,"生日:"+this.friend.birthdate);
    };
    FriendInfo.prototype.GetMobileNumberTxt = function(){
        return this.GetContentTxt(201,"电话:"+this.friend.mobile);
    };
    FriendInfo.prototype.GetQianMingTxt = function(){
        return this.GetContentTxt(222,"");//this.friend.qianMing);
    };
    FriendInfo.prototype.GetUserClassTxt = function(){
        return this.GetContentTxt(323,"酒馆等级:"+this.friend.level);
    };
    FriendInfo.prototype.GetMohuanZhiTxt = function(){
        return this.GetContentTxt(364,"当前魔幻值:"+this.friend.magic);
    };
    FriendInfo.prototype.GetContentTxt = function(sy,text){
        return this.GetTxt(160,sy,368,20,"#fff",text);
    };

    FriendInfo.prototype.GetTxt = function(sx,sy,w,h,color,text){
        return new Q.Text({font:h+"px arial",x:sx,y:sy,width:w,height:h, color:color,text:text,textAlign:"center"});
    };

    FriendInfo.prototype.GetBtn = function(sx,sy,w,h,cx,cy,cydown,action){
        var btn = new Q.Button({image:LoadedImages.friendui.image,x:sx,y:sy, width:w, height:h,
            up:{rect:[cx,cy,w,h]},
            down:{rect:[cx,cydown,w,h]}
        });
        btn.addEventListener(events[2], function(e)
        {
            action(this.friendId);
        });
        return btn;
    };

    FriendInfo.prototype.getBg = function(){
        var bg = new Q.Bitmap({image:LoadedImages.friendui.image,rect:[941,233,694,533]});
        return bg;
    };

    return FriendInfo;
});