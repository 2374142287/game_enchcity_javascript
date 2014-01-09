/**
 * Created with JetBrains WebStorm.
 * User: john
 * Date: 13-3-9
 * Time: 上午11:06
 * To change this template use File | Settings | File Templates.
 */
define(['jquery','FurnitureComponent',winSize+'/CloseBtn'],function($,FurnitureComponent,CloseBtn){
    var FriendInfo = function(props)
    {
        FriendInfo.superClass.constructor.call(this, props);
        this.init();
    };

    Q.inherit(FriendInfo, Q.DisplayObjectContainer);

    FriendInfo.prototype.init = function(){
    };

    FriendInfo.prototype.Show = function(facility){
		if(this.getNumChildren()>0) this.removeAllChildren();
		this.facility = facility;
		this.width = 120;
		this.height = 100;
        //按钮
        this.addChildAt(this.getFacilityBtn(),0);
    };

    FriendInfo.prototype.getFacilityBtn = function(){
        var self = this;
        var iconWidth = 120;
        var iconHeight = 100;
        var btn = new Q.Button({image:Resources.getImage(self.facility.devPath+"/"+self.facility.devId+".png"), x:0, y:0, width:iconWidth, height:iconHeight,
            up:{rect:[0,0,iconWidth,iconHeight]},
            down:{rect:[120,0,iconWidth,iconHeight]}
        });
        btn.addEventListener(events[2], function(e)
        {
			var fcomp = new FurnitureComponent(self.facility);
			if(Player.money > fcomp.devInitBuildPrice){
				Views.MainView.GameView.DrawFacility(fcomp);
				Views.MainView.GameView.isOpen = true;
				Views.MainView.HidefacilityContainer();
			}else {
				alert('钱不够!');
			}
        });
        return btn;
    };
    return FriendInfo;
});