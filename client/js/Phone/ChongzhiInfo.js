/**
 * Created with JetBrains WebStorm.
 * User: john
 * Date: 13-3-15
 * Time: 下午8:50
 * To change this template use File | Settings | File Templates.
 */
define(['jquery'],function($){
    var ChongzhiInfo = function(props,message)
    {
        ChongzhiInfo.superClass.constructor.call(this, props);
        this.init(message);
    };

    Q.inherit(ChongzhiInfo, Q.DisplayObjectContainer);

	ChongzhiInfo.prototype.init = function(message){
		this.message = message;
        this.width = 270;
        this.height = 45;
		//按钮
		this.bgBitmap = this.getBg1();
		this.addChildAt(this.bgBitmap,0);
		this.addChildAt(this.getIcn(),1);
		this.addChildAt(this.getName(),2);
		this.addChildAt(this.getCounts(),3);
        this.addChildAt(this.getLeagueItemBtn(),4);
		this.useHandCursor = true;
    };
	
	ChongzhiInfo.prototype.getLeagueItemBtn = function(){
		var self = this;
		return this.getItemBgBtn(function(){
			self.removeChild(self.bgBitmap);
			self.bgBitmap = self.getBg2();
			self.addChildAt(self.bgBitmap,0);
		});
	};

	ChongzhiInfo.prototype.getItemBgBtn = function(callback){
		//加载一个背景透明的图片
		var self = this;
        var btnWidth = 270;
        var btnHeight = 45;
        var btn = new Q.Button({image:LoadedImages.manageleague.image,x:0,y:0, width:btnWidth, height:btnHeight,
            up:{rect:[134,450,btnWidth,btnHeight]},
            down:{rect:[134,450,btnWidth,btnHeight]}
        });
        btn.addEventListener(events[2], function(e)
        {
            callback();
        });
        return btn;
    };
	
	ChongzhiInfo.prototype.getIcn = function(){
		return new Q.Bitmap({image:LoadedImages.icomoney.image,x:10,y:5,width:35,height:35,rect:[0,0,35,35]});
    };
	ChongzhiInfo.prototype.getName = function(){
        var text = "100000";
		var btnWidth = 120;
        var btnHeight = 30;
		return new Q.Text({font:"bold 22px 'Trebuchet MS',Arial,Helvetica,sans-serif",x:55,y:10,width:btnWidth,height:btnHeight,color:"#333",text:text,textAlign:"left"});
    };
	ChongzhiInfo.prototype.getCounts = function(){
        var text = "100点";
		var btnWidth = 90;
        var btnHeight = 35;
		return new Q.Text({font:"bold 22px 'Trebuchet MS',Arial,Helvetica,sans-serif",x:180,y:10,width:btnWidth,height:btnHeight,color:"#333",text:text,textAlign:"center"});
    };

    ChongzhiInfo.prototype.getBg1 = function(){
        return new Q.Bitmap({image:LoadedImages.managechongzhi.image,x:0,y:0,width:270,height:345,rect:[0,200,270,45]});
    };
	
	ChongzhiInfo.prototype.getBg2 = function(){
        return new Q.Bitmap({image:LoadedImages.managechongzhi.image,x:0,y:0,width:270,height:45,rect:[0,245,270,45]});
    };

    return ChongzhiInfo;
});