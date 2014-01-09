/**
 * Created with JetBrains WebStorm.
 * User: john
 * Date: 13-3-15
 * Time: 下午8:50
 * To change this template use File | Settings | File Templates.
 */
define(['jquery'],function($){
    var GiftInfo = function(props,Message)
    {
        GiftInfo.superClass.constructor.call(this, props);
        this.init(Message);
    };

    Q.inherit(GiftInfo, Q.DisplayObjectContainer);

    GiftInfo.prototype.init = function(Message){
        this.Message = Message;
        this.width = 265;
        this.height = 35;
		//按钮
		this.bgBitmap = this.getBg1();
		this.addChildAt(this.bgBitmap,0);
		this.addChildAt(this.getIcn(),1);
		this.addChildAt(this.getName(),2);
		this.addChildAt(this.getCounts(),3);
        this.addChildAt(this.getLeagueItemBtn(),4);
		this.useHandCursor = true;
    };
  	
	GiftInfo.prototype.getLeagueItemBtn = function(){
		var self = this;
		return this.getItemBgBtn(function(){
			//self.removeChild(self.bgBitmap);
			//self.bgBitmap = self.getBg2();
			//self.addChildAt(self.bgBitmap,0);
			alert("是否确认给XXX盟友送出XXX物品？");
		});
	};

	GiftInfo.prototype.getItemBgBtn = function(callback){
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
	
	GiftInfo.prototype.getIcn = function(){
		return new Q.Bitmap({image:LoadedImages.manageleague.image,x:0,y:0,width:30,height:30,rect:[0,0,30,30]});
    };
	GiftInfo.prototype.getName = function(){
        var text = "鱼翅";
		var btnWidth = 175;
        var btnHeight = 30;
		return new Q.Text({font:"20px arial",x:40,y:5,width:btnWidth,height:btnHeight,color:"#333",text:text,textAlign:"left"});
    };
	GiftInfo.prototype.getCounts = function(){
        var text = "2";
		var btnWidth = 50;
        var btnHeight = 35;
		return new Q.Text({font:"20px arial",x:185,y:5,width:btnWidth,height:btnHeight,color:"#333",text:text,textAlign:"center"});
    };

    GiftInfo.prototype.getBg1 = function(){
        return new Q.Bitmap({image:LoadedImages.manageleague.image,x:0,y:0,width:265,height:35,rect:[134,450,265,35]});
    };
	
	GiftInfo.prototype.getBg2 = function(){
        return new Q.Bitmap({image:LoadedImages.manageleague.image,x:0,y:0,width:265,height:35,rect:[134,165,265,35]});
    };

    return GiftInfo;
});