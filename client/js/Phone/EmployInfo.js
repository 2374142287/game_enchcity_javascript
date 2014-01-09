/**
 * Created with JetBrains WebStorm.
 * User: john
 * Date: 13-3-15
 * Time: 下午8:50
 * To change this template use File | Settings | File Templates.
 */
define(['jquery'],function($){
    var EmployInfo = function(props,Message)
    {
        EmployInfo.superClass.constructor.call(this, props);
        this.init(Message);
    };

    Q.inherit(EmployInfo, Q.DisplayObjectContainer);

    EmployInfo.prototype.init = function(message){
		this.message = message;
        this.width = 290;
        this.height = 285;
		//按钮
		this.employType1 = this.getEmployType1Btn();
		this.employType2 = this.getEmployType2Btn();
		this.employType3 = this.getEmployType3Btn();
		this.employType4 = this.getEmployType4Btn();
		
		this.addChildAt(this.employType1,1);
		this.addChildAt(this.employType2,2);
		this.addChildAt(this.employType3,3);
		this.addChildAt(this.employType4,4);
    };
  	
	EmployInfo.prototype.getEmployType1Btn = function(){
		var self = this;
		return this.getItemBgBtn(0,function(){
			self.employType1.changeState('down');
			self.employType2.changeState('up');
			self.employType3.changeState('up');
			self.employType4.changeState('up');
			
			//alert("确定雇佣XXX为XXXXXXXX？");
		});
	};

	EmployInfo.prototype.getEmployType2Btn = function(){
		var self = this;
		return this.getItemBgBtn(1,function(){
			self.employType1.changeState('up');
			self.employType2.changeState('down');
			self.employType3.changeState('up');
			self.employType4.changeState('up');
			
			//alert("确定雇佣XXX为XXXXXXXX？");
		});
	};
	
	EmployInfo.prototype.getEmployType3Btn = function(){
		var self = this;
		return this.getItemBgBtn(2,function(){
			self.employType1.changeState('up');
			self.employType2.changeState('up');
			self.employType3.changeState('down');
			self.employType4.changeState('up');
			
			//alert("确定雇佣XXX为XXXXXXXX？");
		});
	};
	
	EmployInfo.prototype.getEmployType4Btn = function(){
		var self = this;
		return this.getItemBgBtn(3,function(){
			self.employType1.changeState('up');
			self.employType2.changeState('up');
			self.employType3.changeState('up');
			self.employType4.changeState('down');
			
			//alert("确定雇佣XXX为XXXXXXXX？");
		});
	};
	EmployInfo.prototype.getItemBgBtn = function(id,callback){
        var btnWidth = 270;
        var btnHeight = 60;
		var btnpHeight = 8;
		var px = 5;
		var py = 6+(btnHeight+btnpHeight)*id;
		var cx = 0;
		var cy = 0+btnHeight*id;
        var btn = new Q.Button({image:LoadedImages.manageleagueemploy.image,x:px,y:py, width:btnWidth, height:btnHeight,
            up:{rect:[cx,cy,btnWidth,btnHeight]},
            down:{rect:[cx+btnWidth,cy,btnWidth,btnHeight]}
        });
        btn.addEventListener(events[2], function(e)
        {
            callback();
        });
        return btn;
    };
	
    return EmployInfo;
});