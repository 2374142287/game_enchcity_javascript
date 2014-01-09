/**
 * Created with JetBrains WebStorm.
 * User: john
 * Date: 13-3-15
 * Time: 下午8:50
 * To change this template use File | Settings | File Templates.
 */
define(['jquery'],function($){
    var TouziInfo = function(props,Message)
    {
        TouziInfo.superClass.constructor.call(this, props);
        this.init(Message);
    };
	
    Q.inherit(TouziInfo, Q.DisplayObjectContainer);

    TouziInfo.prototype.init = function(Message){
        this.citem = Message;
        this.width = 265;
        this.height = 35;

		//按钮
		this.bgBitmap = this.getBg1();
		this.addChildAt(this.bgBitmap,0);
		this.addChildAt(this.getIcn(),1);
		this.addChildAt(this.getName(),2);
		this.addChildAt(this.getPrice(),3);
        this.addChildAt(this.getLeagueItemBtn(),4);
		this.useHandCursor = true;
    };
  	
	TouziInfo.prototype.getLeagueItemBtn = function(){
		var self = this;
		return this.getItemBgBtn(function(){
			self.removeChild(self.bgBitmap);
			self.bgBitmap = self.getBg2();
			currentSelectedTzItem = self.citem;
			self.addChildAt(self.bgBitmap,0);
		});
	};

	TouziInfo.prototype.getItemBgBtn = function(callback){
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
	
	TouziInfo.prototype.getIcn = function(){
		return new Q.Bitmap({image:Resources.getImage("tz/"+this.citem.iconTpye+".png"),x:0,y:0,width:30,height:30,rect:[0,0,30,30]});
    };
	TouziInfo.prototype.getName = function(){
        var text = this.citem.itemName;
		var btnWidth = 160;
        var btnHeight = 30;
		return new Q.Text({font:"20px arial",x:40,y:5,width:btnWidth,height:btnHeight,color:"#333",text:text,textAlign:"left"});
    };
	TouziInfo.prototype.getPrice = function(){
        var text = this.citem.itemMoney;
		var btnWidth = 65;
        var btnHeight = 35;
		return new Q.Text({font:"20px arial",x:200,y:5,width:btnWidth,height:btnHeight,color:"#333",text:text,textAlign:"center"});
    };

    TouziInfo.prototype.getBg1 = function(){
        return new Q.Bitmap({image:LoadedImages.manageleague.image,x:0,y:0,width:270,height:40,rect:[134,450,270,40]});
    };
	
	TouziInfo.prototype.getBg2 = function(){
        return new Q.Bitmap({image:LoadedImages.managewupin.image,x:0,y:0,width:270,height:40,rect:[0,200,270,40]});
    };

    return TouziInfo;
});