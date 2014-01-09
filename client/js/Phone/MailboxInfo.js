/**
 * Created with JetBrains WebStorm.
 * User: john
 * Date: 13-3-15
 * Time: 下午8:50
 * To change this template use File | Settings | File Templates.
 */
define(['jquery'],function($){
    var MailboxInfo = function(props,Message)
    {
        MailboxInfo.superClass.constructor.call(this, props);
        this.init(Message);
    };

    Q.inherit(MailboxInfo, Q.DisplayObjectContainer);

    MailboxInfo.prototype.init = function(Message){
        this.Message = Message;
        this.width = 265;
        this.height = 35;
		//按钮
		this.bgBitmap = this.getBg1();
		this.addChildAt(this.bgBitmap,0);
		this.addChildAt(this.getInfo(),1);
        this.addChildAt(this.getMailItemBtn(),2);
		this.useHandCursor = true;
    };
  	
	MailboxInfo.prototype.getMailItemBtn = function(){
		var self = this;
		return self.getItemBgBtn(function(){
			Views.MainView.showMailboxViewContainer(self.Message);
		});
	};

	MailboxInfo.prototype.getItemBgBtn = function(callback){
		//加载一个背景透明的图片
		var self = this;
        var btnWidth = 265;
        var btnHeight = 35;
		var cx = 134;
		var cy = 310;
        var btn = new Q.Button({image:LoadedImages.manageleague.image,x:0,y:0, width:btnWidth, height:btnHeight,
            up:{rect:[cx,cy,btnWidth,btnHeight]},
            down:{rect:[cx,cy+btnHeight,btnWidth,btnHeight]}
        });
        btn.addEventListener(events[2], function(e)
        {
            callback();
        });
        return btn;
    };
	
	MailboxInfo.prototype.getInfo = function(){
        var text = this.Message.mailTitle;
		var btnWidth = 265;
        var btnHeight = 35;
		return new Q.Text({font:"22px '微软雅黑'",x:0,y:3,width:btnWidth,height:btnHeight,color:"#000",text:text,textAlign:"center"});
    };

    MailboxInfo.prototype.getBg1 = function(){
        return new Q.Bitmap({image:LoadedImages.manageleague.image,x:0,y:0,width:265,height:35,rect:[134,130,265,35]});
    };
	
	MailboxInfo.prototype.getBg2 = function(){
        return new Q.Bitmap({image:LoadedImages.manageleague.image,x:0,y:0,width:265,height:35,rect:[134,165,265,35]});
    };

    return MailboxInfo;
});