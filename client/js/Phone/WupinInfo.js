/**
 * Created with JetBrains WebStorm.
 * User: john
 * Date: 13-3-15
 * Time: 下午8:50
 * To change this template use File | Settings | File Templates.
 */
define(['jquery'],function($){
    var WupinInfo = function(props,Message)
    {
        WupinInfo.superClass.constructor.call(this, props);
        this.init(Message);
    };

    Q.inherit(WupinInfo, Q.DisplayObjectContainer);

    WupinInfo.prototype.init = function(Message){
        this.Message = Message;
        this.width = 270;
        this.height = 40;
		//按钮
		this.bgBitmap = this.getBg1();
		this.addChildAt(this.bgBitmap,0);
		this.addChildAt(this.getIcn(),1);
		this.addChildAt(this.getName(),2);
		this.addChildAt(this.getPrice(),3);
		this.addChildAt(this.getCounts(),4);
        this.addChildAt(this.getLeagueItemBtn(),5);
		this.useHandCursor = true;
    };
  	
	WupinInfo.prototype.getLeagueItemBtn = function(){
		var self = this;
		return this.getItemBgBtn(function(){
			self.removeChild(self.bgBitmap);
			self.bgBitmap = self.getBg2();
            currentSelectedWpItem = self.Message;
			self.addChildAt(self.bgBitmap,0);
		});
	};

	WupinInfo.prototype.getItemBgBtn = function(callback){
		//加载一个背景透明的图片
		var self = this;
        var btnWidth = 265;
        var btnHeight = 35;
		var cx = 134;
		var cy = 450;
        var btn = new Q.Button({image:LoadedImages.manageleague.image,x:0,y:0, width:btnWidth, height:btnHeight,
            up:{rect:[cx,cy,btnWidth,btnHeight]},
            down:{rect:[cx,cy,btnWidth,btnHeight]}
        });
        btn.addEventListener(events[2], function(e)
        {
            callback();
        });
        return btn;
    };
	
	WupinInfo.prototype.getIcn = function(){
		return new Q.Bitmap({image:Resources.getImage("wp/"+this.Message.id+".png"),x:0,y:0,width:30,height:30,rect:[0,0,30,30]});
    };
	WupinInfo.prototype.getName = function(){
        var text = this.Message.name;
		var btnWidth = 105;
        var btnHeight = 30;
		return new Q.Text({font:"20px arial",x:40,y:5,width:btnWidth,height:btnHeight,color:"#333",text:text,textAlign:"left"});
    };
	WupinInfo.prototype.getPrice = function(){
        var text = this.Message.price;
		var btnWidth = 70;
        var btnHeight = 30;
		return new Q.Text({font:"20px arial",x:125,y:5,width:btnWidth,height:btnHeight,color:"#333",text:text,textAlign:"left"});
    };
	WupinInfo.prototype.getCounts = function(){
        var text = this.Message.count;
		var btnWidth = 50;
        var btnHeight = 35;
		return new Q.Text({font:"20px arial",x:205,y:5,width:btnWidth,height:btnHeight,color:"#333",text:text,textAlign:"center"});
    };

    WupinInfo.prototype.getBg1 = function(){
        return new Q.Bitmap({image:LoadedImages.manageleague.image,x:0,y:0,width:270,height:40,rect:[134,450,265,40]});
    };
	
	WupinInfo.prototype.getBg2 = function(){
        return new Q.Bitmap({image:LoadedImages.managewupin.image,x:0,y:0,width:270,height:40,rect:[0,200,265,40]});
    };
    return WupinInfo;
});