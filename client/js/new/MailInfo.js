/**
 * Created with JetBrains WebStorm.
 * User: john
 * Date: 13-3-15
 * Time: 下午8:50
 * To change this template use File | Settings | File Templates.
 */
define(['jquery'],function($){
    var MailInfo = function(props,Mail)
    {
        MailInfo.superClass.constructor.call(this, props);
        this.init(Mail);
    };

    Q.inherit(MailInfo, Q.DisplayObjectContainer);

    MailInfo.prototype.init = function(Mail){
        var self = this;
        self.Mail = Mail;
        self.width = 805;
        self.height = 85;
        self.addChildAt(self.getBg(),0);
        self.addChildAt(self.getInfo(),1);
        self.useHandCursor = true;
    };
    MailInfo.prototype.getInfo = function(){
        var text = this.Mail.title;
         return new Q.Text({font:"36px arial",x:30,y:25,width:680,height:36, color:"#000",text:text,textAlign:"left"});
    };

    MailInfo.prototype.getBg = function(){
        return new Q.Bitmap({image:LoadedImages.mailui.image,x:0,y:0,width:745,height:this.height,rect:[378,541,745,this.height]});
    };

    return MailInfo;
});