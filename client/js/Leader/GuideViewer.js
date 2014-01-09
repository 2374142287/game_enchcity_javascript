/**
 * Created with JetBrains WebStorm.
 * User: john
 * Date: 13-3-24
 * Time: 下午6:48
 * To change this template use File | Settings | File Templates.
 */
define(function(){
    var InfoBarLeader = function(imgid,guidebtnx,guidebtny,text,textposx,textposy,btnposx,btnposy,btnwidth,btnheight,callback)
    {
        InfoBarLeader.superClass.constructor.call(this);
        this.init(imgid,guidebtnx,guidebtny,text,textposx,textposy,btnposx,btnposy,btnwidth,btnheight,callback);
    };

    Q.inherit(InfoBarLeader, Q.DisplayObjectContainer);

    InfoBarLeader.prototype.init = function(imgid,guidebtnx,guidebtny,text,textposx,textposy,btnposx,btnposy,btnwidth,btnheight,callback){
        this.width = 960;
        this.height = 540;
        this.x = 0;
        this.y = 0;
        this.addChildAt(this.getBg(imgid),0);
        this.addChildAt(this.getText(text,textposx,textposy),2);
        this.stopGuideBtn = this.getBtn(0,guidebtnx,guidebtny,function(){
            //结束指引
            Views.MainView.stopLeader();
        });
        this.nextGuideBtn = this.getBtn(1,guidebtnx,guidebtny,callback);
        this.nextBtn = this.getNextBtn(btnposx,btnposy,btnwidth,btnheight,callback);
        this.addChildAt(this.stopGuideBtn,2);
        this.addChildAt(this.nextGuideBtn,2);
        this.addChildAt(this.nextBtn,2);
    };

    InfoBarLeader.prototype.getNextBtn = function(btnposx,btnposy,btnwidth,btnheight,callback){
        var btn = new Q.DisplayObjectContainer({x:btnposx,y:btnposy,width:btnwidth,height:btnheight});
        btn.addEventListener(events[2], function(e)
        {
            callback();
        });
        btn.eventChildren = false;
        btn.useHandCursor = true;
        return btn;
    };
    InfoBarLeader.prototype.getBtn = function(id,guidebtnx,guidebtny,callback){
        var btnWidth = 180;
        var btnHeight = 48;
        var btncMargin = 1;
        var px = guidebtnx + (btnWidth + 92)*id;
        var py = guidebtny;
        var cx = (btnWidth+ btncMargin)*id;
        var cy = 0;
        var btn = new Q.Button({image:LeaderImages.leaderbtn.image,x:px,y:py,width:btnWidth,height:btnHeight,
            up:{rect:[cx,cy,btnWidth,btnHeight]},
            down:{rect:[cx,cy+(btnHeight+btncMargin),btnWidth,btnHeight]}
        });
        btn.addEventListener(events[2], function(e)
        {
            callback();
        });
        return btn;
    };
    InfoBarLeader.prototype.getText = function(text,textposx,textposy){
        return new Q.Text({font:"22px arial",x:textposx,y:textposy,width:263,height:155, color:"#fff",text:text,lineWidth:263,textAlign:"left"});
    };
    InfoBarLeader.prototype.getBg = function(imgid){
        var bg = new Q.Bitmap({image:Resources.getGuideImage(imgid),rect:[0,0,960,540]});
        return bg;
    };
    return InfoBarLeader;
});
