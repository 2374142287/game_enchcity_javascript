/**
 * Created with JetBrains WebStorm.
 * User: john
 * Date: 13-3-9
 * Time: 上午11:06
 * To change this template use File | Settings | File Templates.
 */
define(['jquery'],function($){
    var SameOccupationInfo = function(props)
    {
        SameOccupationInfo.superClass.constructor.call(this, props);
        this.init();
    };

    Q.inherit(SameOccupationInfo, Q.DisplayObjectContainer);

    SameOccupationInfo.prototype.init = function(){
    };

    SameOccupationInfo.prototype.Show = function(sameoccupation){
		var self = this;
		if(self.getNumChildren()>0) self.removeAllChildren();
		self.sameoccupation = sameoccupation;
		self.width = 265;
		self.height = 35;
        //按钮
		self.sameOccupationBtn=this.getSameOccupationItemBtn();
		self.bgBitmap = self.getBg();
		self.addChildAt(self.bgBitmap,0);
		self.addChildAt(self.getInfo1(),1);
        self.addChildAt(self.sameOccupationBtn,2);
		self.useHandCursor = true;
    };

	SameOccupationInfo.prototype.getSameOccupationItemBtn = function(){
		var self = this;
		return this.getItemBgBtn1(function(){
			self.removeChild(self.bgBitmap);
			self.bgBitmap = self.getBg2();
			self.addChildAt(self.bgBitmap,0);
		});
	};
		
    SameOccupationInfo.prototype.getItemBgBtn = function(callback){
		var self = this;
        var btnWidth = 265;
        var btnHeight = 35;
		var cx = 134;
		var cy = 130;
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
	
	SameOccupationInfo.prototype.getItemBgBtn1 = function(callback){
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
	
	SameOccupationInfo.prototype.getInfo = function(){
        var text = this.sameoccupation.queuecontent;
		var btnWidth = 165;
        var btnHeight = 35;
		return new Q.Text({font:"20px arial",x:0,y:0,width:btnWidth,height:btnHeight,color:"#000",text:text,textAlign:"center"});
    };
	
	SameOccupationInfo.prototype.getInfo1 = function(){
        var text = this.sameoccupation.queuecontent;
         return new Q.Text({font:"20px arial",x:0,y:0,width:265,height:35, color:"#000",text:text,textAlign:"center"});
    };
	
	SameOccupationInfo.prototype.getBg = function(){
		var id = this.sameoccupation.queueid;
		var bitmap;
		switch(id){
			case 1:
                bitmap = new Q.Bitmap({image:LoadedImages.manageleague.image,x:0,y:0,width:265,height:35,rect:[134,200,265,35]});
                break;
            case 2:
                bitmap = new Q.Bitmap({image:LoadedImages.manageleague.image,x:0,y:0,width:265,height:35,rect:[134,235,265,35]});
                break;
            case 3:
                bitmap = new Q.Bitmap({image:LoadedImages.manageleague.image,x:0,y:0,width:265,height:35,rect:[134,270,265,35]});
                break;
			default:
				bitmap = new Q.Bitmap({image:LoadedImages.manageleague.image,x:0,y:0,width:265,height:35,rect:[134,130,265,35]});
				break;
        }
        return bitmap;
    };

    SameOccupationInfo.prototype.getBg1 = function(){
        return new Q.Bitmap({image:LoadedImages.manageleague.image,x:0,y:0,width:265,height:35,rect:[134,130,265,35]});
    };
	SameOccupationInfo.prototype.getBg2 = function(){
        return new Q.Bitmap({image:LoadedImages.manageleague.image,x:0,y:0,width:265,height:35,rect:[134,165,265,35]});
    };
	
    return SameOccupationInfo;
});