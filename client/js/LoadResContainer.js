/**
 * Created with JetBrains WebStorm.
 * User: john
 * Date: 13-2-25
 * Time: 下午10:24
 * To change this template use File | Settings | File Templates.
 */
define(function(){
    var LoadResContainer = function(props,displayer,container)
    {
        LoadResContainer.superClass.constructor.call(this, props);
        this.init(displayer,container);
    };

    Q.inherit(LoadResContainer, Q.DisplayObjectContainer);

    LoadResContainer.prototype.init = function(displayer,container){
        this.displayer = displayer;
        this.container = container;
        this.addChildAt(this.getBg(),0);
        this.blackbg = this.getBlackBg();
        this.txtWhite = this.getTxt("请稍候..","#fff");
        this.txtBlack = this.getTxt("请稍候..","#000");
        this.txtBlack.x +=1;
        this.txtBlack.y +=1;
        this.addChildAt(this.txtBlack,3);
        this.addChildAt(this.txtWhite,2);
        //this.getInput();

    };

    LoadResContainer.prototype.getInput = function(){
        var container = new Q.DisplayObjectContainer({width:200,height:300});
        var box1 = new Q.TextBox({x:0,y:0,width:70,height:30});
        var box2 = new Q.TextBox({x:10,y:40,width:70,height:30,style:{color:"#ff0000",transparent:"1",font:"30px"}});

        container.addChild(box1);
        container.addChild(box2);
        return container;
    };

    LoadResContainer.prototype.setText = function(text,isBlack){
        this.removeChild(this.blackbg);
        if(isBlack) this.addChildAt(this.blackbg, 1);
        this.txtWhite.text = text;
        this.txtBlack.text = text;
    };

    LoadResContainer.prototype.getBlackBg = function()
    {
        var g1 = new Q.Graphics({width:this.width, height:this.height,x:0,y:0});
        g1.lineStyle(1, "#000").beginFill("#000").drawRect(0,0,this.width,this.height).endFill().cache();
        return g1;
    };

    LoadResContainer.prototype.getTxt = function(text,color){
        var txt = new Q.Text({font:"30px arial",x:0,y:0,width:this.getCurrentWidth(),height:36,weight:"bold", color:color,text:"<b>"+text+"</b>",textAlign:"center"});
        this.displayer.SetDisplayObjectPosition(txt,this);
        this.displayer.SetDisplayObjectCenter(txt,this);
        return txt;
    };

    LoadResContainer.prototype.getBg = function(){
        var img;
        var bmp;
        switch(winSize){
            case "Pad":
                img = Q.getDOM("loadBgPad");
                bmp = new Q.Bitmap({image:img,x:0,y:0,width:1920,height:1080});
                break;
            default:
                img = Q.getDOM("loadBgPhone");
                bmp = new Q.Bitmap({image:img,x:0,y:0,width:960,height:540});
                break;
        }
        this.displayer.SetDisplayObjectScaleFullHeightSize(bmp,this);
        this.displayer.SetDisplayObjectCenter(bmp,this);
        return bmp;
    };
    return LoadResContainer;
});