/**
 * Created with JetBrains WebStorm.
 * User: john
 * Date: 13-2-11
 * Time: 下午9:04
 * To change this template use File | Settings | File Templates.
 */
//define(function() {
var Idol = function(props,id)
{
    Idol.superClass.constructor.call(this, props);
    this.init(id);
};

Q.inherit(Idol, Q.DisplayObjectContainer);

Idol.prototype.init = function(id){
    this.id = id;
    //每个角色容器大小
    this.width = 149;
    this.height = 318;
    this.margin = 2;
    //选择后文字大小
    this.touchedTextWidth = this.width;
    this.touchedTextHeight = 45;
    this.touchedTextMargin = this.margin;
    this.touchedTextCx = 0 + (this.touchedTextWidth + this.touchedTextMargin)*id;
    this.touchedTextCy = (this.height - this.touchedTextHeight)*2;
    this.charaWidth = this.width;
    this.charaHeight = this.height - (this.touchedTextHeight+this.touchedTextMargin);
    this.charaMargin = this.margin;
    this.charaCx = 0 + (this.charaWidth + this.charaMargin)*id;
    //未选择状态图大小
    this.charaNorCy = (this.charaHeight + this.charaMargin);
    //选择后状态图大小
    this.charaTouCy = 0;

    this.selected = false;
    //只有this可以接受事件
    this.eventChildren = false;

    this.addEventListener(events[2], this.SetTouched);
};

Idol.prototype.SetTouched = function(){
    Views.LoginView.idolManager.setIdolNormal(this.id);
    var Touched = this.GetTouched();
    var TouchedText = this.GetTouchedText();
    if(this.getNumChildren()>0) this.removeAllChildren();
    this.addChild(Touched);
    this.addChild(TouchedText);
};

Idol.prototype.SetNormal = function(){
    var CharaNormal = this.GetNormal();
    if(this.getNumChildren()>0) this.removeAllChildren();
    this.addChild(CharaNormal);
};

Idol.prototype.GetNormal = function(){
    return new Quark.Bitmap({image:LoadedImages.loginui.image,
        x:0,y:0,
        width:this.charaWidth, height:this.charaHeight,
        rect:[this.charaCx,this.charaNorCy,this.charaWidth,this.charaHeight]});
};
Idol.prototype.GetTouched = function(){
    return new Quark.Bitmap({image:LoadedImages.loginui.image,
        x:0,y:0,
        width:this.charaWidth, height:this.charaHeight,
        rect:[this.charaCx,this.charaTouCy,this.charaWidth,this.charaHeight]});
};
Idol.prototype.GetTouchedText = function(){
    return new Q.Bitmap({image:LoadedImages.loginui.image,
        x:0,y:this.charaHeight + this.touchedTextMargin,
        width:this.touchedTextWidth, height:this.touchedTextHeight,
        rect:[this.touchedTextCx,this.touchedTextCy,this.touchedTextWidth,this.touchedTextHeight]});
};
