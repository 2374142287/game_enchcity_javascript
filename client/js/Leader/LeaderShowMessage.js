/**
 * Created with JetBrains WebStorm.
 * User: john
 * Date: 13-3-24
 * Time: 下午3:34
 * To change this template use File | Settings | File Templates.
 */
define(function(){
    var LeaderShowMessage = function(msg,nextAction)
    {
        LeaderShowMessage.superClass.constructor.call(this);
        this.init(msg,nextAction);
    };

    Q.inherit(LeaderShowMessage, Q.DisplayObjectContainer);

    LeaderShowMessage.prototype.init = function(msg,nextAction){
        this.width = 470;
        this.height = 320;
        this.addChildAt(this.getBg(),0);
        this.stopBtn = this.getBtn(0,function(){
            //结束指引
            Views.MainView.stopLeader();
        });
        this.nextBtn = this.getBtn(1,nextAction);
        this.addChildAt(this.getText(msg),1);
        this.addChildAt(this.stopBtn,2);
        this.addChildAt(this.nextBtn,2);
    };
    LeaderShowMessage.prototype.getText = function(text){
        return new Q.Text({font:"25px arial",x:191,y:85,width:263,height:155, color:"#fff",text:text,lineWidth:263,textAlign:"left"});
    };

    LeaderShowMessage.prototype.getBtn = function(id,callback){
        var btnWidth = 180;
        var btnHeight = 48;
        var btncMargin = 1;
        var px = 8 + (btnWidth + 92)*id;
        var py = 268;
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

    LeaderShowMessage.prototype.getBg = function(){
        return new Q.Bitmap({image:LeaderImages.msgboxbg.image,x:0,y:0,width:470,height:258});
    };

    return LeaderShowMessage;

});

