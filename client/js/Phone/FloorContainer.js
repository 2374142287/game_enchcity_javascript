/**
 * Created with JetBrains WebStorm.
 * User: john
 * Date: 13-2-13
 * Time: 下午7:09
 * To change this template use File | Settings | File Templates.
 */
define([winSize+'/CloseBtn'],function(CloseBtn){
    var FloorContainer = function()
    {
        FloorContainer.superClass.constructor.call(this);
        this.init();
    };

    Q.inherit(FloorContainer, Q.DisplayObjectContainer);

    FloorContainer.prototype.init = function(){
		this.width = 460;
        this.height = 490;
		this.floorContainer = new Q.DisplayObjectContainer({x:0,y:0,width:this.width,height:this.height});
        this.addChildAt(this.floorContainer, 15);
        this.runGameMap = false;
        // 管理菜单操作按钮
        
		this.addChildAt(this.getBtn(0, 5,this.goFloorFiveBtn), 15);
		this.addChildAt(this.getBtn(1, 4,this.goFloorFourBtn), 15);
		this.addChildAt(this.getBtn(2, 3, this.goFloorThreeBtn), 15);
		this.addChildAt(this.getBtn(3, 2,this.goFloorSecondBtn), 15);
		this.addChildAt(this.getBtn(4, 1,this.goFloorFirstBtn), 15);
		this.addChildAt(this.getBtn(5, 0,this.goFloorZeroBtn), 15);

    };

    FloorContainer.prototype.getBtn = function(id,cid,callback){
        var btnWidth = 130;
        var btnHeight = 65;
        var btnMargin = 5;
        var px = 0;
        var py = btnHeight*id;
		var cx = (btnWidth+btnMargin)*cid;
        var btn = new Q.Button({image:LoadedImages.floorButList.image,x:px,y:py, width:btnWidth, height:btnHeight,
            up:{rect:[cx,0,btnWidth,btnHeight]},
            down:{rect:[cx,70,btnWidth,btnHeight]}
        });

        btn.addEventListener(events[2], function(e)
        {
            callback();
        });
        return btn;
    };

    FloorContainer.prototype.goFloorZeroBtn = function(){
        curFloor = 0;
        Views.MainView.GameView.reflashUI(0);
    //    Views.GameWork();
        Views.MainView.HidefloorContainer();
    };
	
	FloorContainer.prototype.goFloorFirstBtn = function(){
		curFloor = 1;
		Views.MainView.GameView.reflashUI(1);
		if (!this.runGameMap){
            Views.GameWork();
            this.runGameMap = true;
        }
		Views.MainView.HidefloorContainer();
    };
	
	FloorContainer.prototype.goFloorSecondBtn = function(){
        curFloor = 2;
        Views.MainView.GameView.reflashUI(2);
        Views.MainView.HidefloorContainer();
    };
	
	FloorContainer.prototype.goFloorThreeBtn = function(){
        curFloor = 3;
        Views.MainView.GameView.reflashUI(3);
        Views.MainView.HidefloorContainer();
    };
	
	FloorContainer.prototype.goFloorFourBtn = function(){
        curFloor = 4;
        Views.MainView.GameView.reflashUI(4);
        Views.MainView.HidefloorContainer();
    };
	
	FloorContainer.prototype.goFloorFiveBtn = function(){
        curFloor = 5;
        Views.MainView.GameView.reflashUI(5);
        Views.MainView.HidefloorContainer();
    };
	
	FloorContainer.prototype.getBg = function(){
        return new Q.Bitmap({image:LoadedImages.managerui.image,x:0,y:0,width:this.width,height:this.height,
                                rect:[414,0,this.width,this.height]});
    };
	
    return FloorContainer;
});