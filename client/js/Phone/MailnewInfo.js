﻿/**
 * Created with JetBrains WebStorm.
 * User: john
 * Date: 13-3-15
 * Time: 下午8:50
 * To change this template use File | Settings | File Templates.
 */
define(['jquery'],function($){
    var MailnewInfo = function(props,Message)
    {
        MailnewInfo.superClass.constructor.call(this, props);
        this.init(Message);
    };

    Q.inherit(MailnewInfo, Q.DisplayObjectContainer);

    MailnewInfo.prototype.init = function(Message){
        this.Message = Message;
        this.width = 265;
        this.height = 35;
		//按钮
		this.bgBitmap = this.getBg1();
		this.addChildAt(this.bgBitmap,0);
		this.addChildAt(this.getInfo(),1);
        this.addChildAt(this.getLeagueItemBtn(),2);
		this.useHandCursor = true;
    };
  	
	MailnewInfo.prototype.getLeagueItemBtn = function(){
		var self = this;
		return this.getItemBgBtn(function(){
			//self.removeChild(self.bgBitmap);
			//self.bgBitmap = self.getBg2();
			//self.addChildAt(self.bgBitmap,0);
			Views.MainView.showMailnewViewContainer(self.Message);
		});
	};

	MailnewInfo.prototype.getItemBgBtn = function(callback){
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
	
	MailnewInfo.prototype.getInfo = function(){
        var text = this.Message.allyNickName;
		var btnWidth = 265;
        var btnHeight = 35;
		return new Q.Text({font:"22px '微软雅黑'",x:0,y:3,width:btnWidth,height:btnHeight,color:"#000",text:text,textAlign:"center"});
    };

    MailnewInfo.prototype.getBg1 = function(){
        return new Q.Bitmap({image:LoadedImages.manageleague.image,x:0,y:0,width:265,height:35,rect:[134,130,265,35]});
    };
	
	MailnewInfo.prototype.getBg2 = function(){
        return new Q.Bitmap({image:LoadedImages.manageleague.image,x:0,y:0,width:265,height:35,rect:[134,165,265,35]});
    };

    return MailnewInfo;
});