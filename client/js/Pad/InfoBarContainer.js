/**
 * Created with JetBrains WebStorm.
 * User: john
 * Date: 13-2-13
 * Time: 上午11:06
 * To change this template use File | Settings | File Templates.
 */
define(['jquery',winSize+'/RechargeContainer'],function($,RechargeContainer){
    var infoBarContainer = function(props)
    {
        infoBarContainer.superClass.constructor.call(this, props);
        this.init();
    };

    Q.inherit(infoBarContainer, Q.DisplayObjectContainer);

    infoBarContainer.prototype.init = function(){
        this.width = 425;
        this.height = 280;
        this.Status = "show";
        this.infoBg = this.GetInfoBg();
        this.DropUpBtn = this.GetDropUpBtn();
        this.DropDownBtn = this.GetDropDownBtn();
        this.DropDownBar = this.GetDropDownBar();
        this.infoContianer = new Q.DisplayObjectContainer({x:120,y:44,width:238,height:90});
        this.addChildAt(this.infoBg,1);
        this.addChildAt(this.infoContianer,1);
        this.addChildAt(this.DropDownBar,0);
        this.addChildAt(this.GetBuyBtn(),2);
        this.addChildAt(this.GetUserIcon(),3);
        this.SetDropInfo(Player.experience,Player.energy,Player.magic,(Player.bonus)+"%");
        this.SetBarInfo(Player.nickname,Player.level,Player.gold,Player.xingbei);
    };
    infoBarContainer.prototype.reflashInfo = function(player){
        this.infoContianer.removeAllChildren();
        //this.DropDownBar.removeAllChildren();
        //this.SetDropInfo(player.experience,player.energy,player.magic,(player.bonus)+"%");
        this.SetBarInfo(player.nickname,player.level,player.gold,player.xingbei);
    };

    infoBarContainer.prototype.GetUserIcon = function(){
        trace("infoBarContainer:"+Player.photo);
        var btn = new Q.Button({image:Resources.getImage(Player.photo),width:Player.photow,height:Player.photoh,
            up:{rect:[Player.photox,Player.photoy,Player.photow,Player.photoh]},
            down:{rect:[Player.photox,Player.photoy,Player.photow,Player.photoh]}
        });
        btn.addEventListener(events[2], function(e)
        {
            Views.MainView.ShowPersonalInfo();
        });
        return btn;
    };

    infoBarContainer.prototype.GetInfoBg = function(){
        var infoBg = new Q.Bitmap({image:LoadedImages.mainui.image,rect:[0,0,425,148]});
        return infoBg;
    };
    infoBarContainer.prototype.SetBarInfo = function(username,userclass,money,starmoney){
        this.infoContianer.addChildAt(this.GetBarText(username,14,17,151,20),2);
        this.infoContianer.addChildAt(this.GetBarText(userclass,173,17,62,20),2);
        this.infoContianer.addChildAt(this.GetBarText(money,30,56,80,20),2);
        this.infoContianer.addChildAt(this.GetBarText(starmoney,143,56,75,20),2);
    };
    infoBarContainer.prototype.GetBarText = function(username,px,py,w,h){
        var txt = this.GetTxt();
        txt.text = username;
        txt.x = px;
        txt.y = py;
        txt.width = w;
        txt.designHeight = h;
        txt.textAlign = "center";
        return txt;
    };
    infoBarContainer.prototype.GetDropDownBar = function(){
        var InfoBarDropDownContainer = new Q.DisplayObjectContainer({x:63,y:38,width:276,height:135});
        InfoBarDropDownContainer.addChild(this.GetDropDownBg());
        InfoBarDropDownContainer.addChild(this.DropDownBtn);
        return InfoBarDropDownContainer;
    };
    infoBarContainer.prototype.GetDropDownBg = function(){
        var dropDownBg =  new Q.Bitmap({image:LoadedImages.mainui.image,rect:[63,277,276,135]});
        return dropDownBg;
    };
    infoBarContainer.prototype.SetDropInfo = function(jingyanzhi,energy,mohuanzhi,shourujiacheng){
        var lineHeight = 20;
        var jingyanzhiTxt = this.GetDropText("经验值:"+jingyanzhi,24,7 + lineHeight*0);
        var molizhiTxt = this.GetDropText("体力值:"+energy,24,7 + lineHeight*1);
        var mohuanzhiTxt = this.GetDropText("魔幻值:"+mohuanzhi,24,7 + lineHeight*2);
        var shourujiachengTxt = this.GetDropText("收入加成:"+shourujiacheng,24,7 + lineHeight*3);
        this.DropDownBar.addChild(jingyanzhiTxt);
        this.DropDownBar.addChild(molizhiTxt);
        this.DropDownBar.addChild(mohuanzhiTxt);
        this.DropDownBar.addChild(shourujiachengTxt);
    };
    infoBarContainer.prototype.GetDropText = function(text,px,py){
        var txt = this.GetTxt();
        txt.x = px;
        txt.y = py;
        txt.text = text;
        txt.width = this.DropDownBar - 50;
        return txt;
    };
    infoBarContainer.prototype.GetTxt = function(){
        var TxtHeight = 18;
        return new Q.Text({font:TxtHeight+"px arial",height:TxtHeight, color:"#fff",textAlign:"left"});
    };
    infoBarContainer.prototype.GetBuyBtn = function(){
        return this.GetBtn(345,68,400+80*13,720,function(){
            if(Views.MainView.hasChild(Views.MainView.rechargeContainer))
                Views.MainView.removeChild(Views.MainView.rechargeContainer);
            Views.MainView.rechargeContainer = new RechargeContainer();
            Views.MainView.addChild(Views.MainView.rechargeContainer);
            Views.MainView.displayer.SetDisplayObjectSize(Views.MainView.rechargeContainer,Views.MainView.getCurrentHeight(),Views.MainView.designHeight);
            Views.MainView.displayer.SetDisplayObjectCenter(Views.MainView.rechargeContainer,Views.MainView);
        });
    };
    infoBarContainer.prototype.GetDropDownBtn = function(){
        return this.GetBtn(100,77,400,720,this.ShowBar);
    };
    infoBarContainer.prototype.GetDropUpBtn = function(){
        return this.GetBtn(100,77,400-80,720,this.HiddenBar);
    };
/*
    infoBarContainer.prototype.GetUserIcon = function(characterId){
        var size = 144;
        var cx = size * characterId;
        var btn = new Q.Button({image:LoadedImages.headicon.image,width:size, height:size,
            up:{rect:[cx,0,size,size]},
            over:{rect:[cx,0,size,size]},
            down:{rect:[cx,0,size,size]},
            disabled:{rect:[cx,0,size,size]}
        });
        btn.addEventListener(events[2], function(e)
        {
            Views.MainView.ShowPersonalInfo();
        });
        return btn;
    };
*/

    infoBarContainer.prototype.GetBtn = function(px,py,qx,qy,callback){
        var btn = new Q.Button({image:LoadedImages.mainui.image, x:px, y:py, width:80, height:80,
            up:{rect:[qx,qy,80,80]},
            //over:{rect:[qx,qy-80,80,80]},
            down:{rect:[qx,qy-160,80,80]}
            //disabled:{rect:[qx,qy,80,80]}
        });
        btn.addEventListener(events[2], function(e)
        {
            callback();
        });
        return btn;
    };

    infoBarContainer.prototype.ShowBar = function(){
        Views.MainView.InfoBarContainer.DropDownBar.Status = "move";
        timer = new Q.Timer(60);
        timer.addListener(Q.Tween);
        timer.start();
        var po = (Views.MainView.InfoBarContainer.DropDownBar.y + 105)*Views.MainView.InfoBarContainer.DropDownBar.getCurrentHeight()/Views.MainView.InfoBarContainer.DropDownBar.height;
        Q.Tween.to(Views.MainView.InfoBarContainer.DropDownBar, {y:po}, {time:300, onComplete:function(tween)
        {
            timer.stop();
            Views.MainView.InfoBarContainer.DropDownBar.Status = "show";
            Views.MainView.InfoBarContainer.DropDownBar.removeChild(Views.MainView.InfoBarContainer.DropDownBtn);
            Views.MainView.InfoBarContainer.DropDownBar.addChild(Views.MainView.InfoBarContainer.DropUpBtn);
        }});
    };

    infoBarContainer.prototype.HiddenBar = function(){
        Views.MainView.InfoBarContainer.DropDownBar.Status = "move";
        timer = new Q.Timer(60);
        timer.addListener(Q.Tween);
        timer.start();
        var po = (Views.MainView.InfoBarContainer.DropDownBar.y - 105)*Views.MainView.InfoBarContainer.DropDownBar.getCurrentHeight()/Views.MainView.InfoBarContainer.DropDownBar.height;
        Q.Tween.to(Views.MainView.InfoBarContainer.DropDownBar, {y:po}, {time:300, onComplete:function(tween)
        {
            timer.stop();
            Views.MainView.InfoBarContainer.DropDownBar.Status = "hidden";
            Views.MainView.InfoBarContainer.DropDownBar.removeChild(Views.MainView.InfoBarContainer.DropUpBtn);
            Views.MainView.InfoBarContainer.DropDownBar.addChild(Views.MainView.InfoBarContainer.DropDownBtn);
        }});
    };

    return infoBarContainer;
});