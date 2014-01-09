/**
 * Created with JetBrains WebStorm.
 * User: john
 * Date: 13-3-23
 * Time: 下午2:23
 * To change this template use File | Settings | File Templates.
 */
define(['jquery',winSize+'/CloseBtn'],function($,CloseBtn){
    var ReceiveMailInfo = function(props,Message)
    {
        ReceiveMailInfo.superClass.constructor.call(this, props);
        this.init(Message);
    };

    Q.inherit(ReceiveMailInfo, Q.DisplayObjectContainer);

    ReceiveMailInfo.prototype.init = function(Message){
        var self = this;
        self.Message = Message;
        self.width = 805;
        self.height = 85;
        self.addChildAt(this.getBg(function(){
            Views.MainView.MessageContainer.showMailViewContainer(self.Message);
        }),0);
        self.addChildAt(this.getInfo(),1);
        self.addChildAt(new CloseBtn({x:755,y:15},function(){
            //删除一条邮件
            Views.MainView.showDialogYesAndNo(
                "是否确认删除当前邮件？",
                function(){
                    /////删除一条消息数据
                    Sockets.send_reqMessageDel(self.Message.messageid);
                    Views.MainView.HideDialogYesAndNo();
                },
                function(){
                    Views.MainView.HideDialogYesAndNo();
                }
            );
        }),2);

        self.useHandCursor = true;
    };
    ReceiveMailInfo.prototype.getInfo = function(){
        var text = this.Message.content;
        return new Q.Text({font:"36px arial",x:30,y:25,width:680,height:36, color:"#000",text:text,textAlign:"left"});
    };

    ReceiveMailInfo.prototype.getBg = function(action){
        var btn = new Q.Button({image:LoadedImages.mailui.image, x:0,y:0,width:745,height:this.height,
            up:{rect:[378,541,745,this.height]},
            down:{rect:[378,541,745,this.height]}
        });
        this.addChild(btn);
        btn.addEventListener(events[2], function(e)
        {
            action();
        });
        return btn;
    };

    return ReceiveMailInfo;
});