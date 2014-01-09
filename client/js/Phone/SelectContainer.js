/**
 * Created with JetBrains WebStorm.
 * User: john
 * Date: 13-3-23
 * Time: 下午4:51
 * To change this template use File | Settings | File Templates.
 */
define(['jquery',winSize+'/CloseBtn'],function($,CloseBtn){
    var SelectContainer = function(props,type)
    {
        SelectContainer.superClass.constructor.call(this, props);
        this.init(type);
    };

    Q.inherit(SelectContainer, Q.DisplayObjectContainer);

    SelectContainer.prototype.init = function(type){
        this.type = type;  //好友Frie或道具Prop
        this.width = 925;
        this.height = 420;
        this.x = 18;
        this.y = 101;
        this.currentShowId = 0;
        this.showItemNum = 6;
        this.itemsContainer = new Q.DisplayObjectContainer({x:98,y:67,width:711,height:135});
        this.addChildAt(this.itemsContainer,1);
        this.addChildAt(this.getNextBtn(),2);
        this.addChildAt(this.getLastBtn(),2);
        this.addChildAt(new CloseBtn({x:20,y:20},function(){
            //关闭
            Views.MainView.MessageContainer.hideSelectContainer();
        }),2);
    };
    SelectContainer.prototype.showItem = function(){
        if(this.type == "Prop"){
            if(this.currentShowId<0) this.currentShowId = 0;
            else if(this.currentShowId>=(Views.MainView.ToolBarContainer.propManager.Count())) this.currentShowId = Views.MainView.ToolBarContainer.propManager.Count()-1;
            this.itemsContainer.removeAllChildren();
            for(var i=this.currentShowId;i<(this.showItemNum+this.currentShowId) && i<Views.MainView.ToolBarContainer.propManager.Count();i++){
                this.itemsContainer.addChild(this.getSelectBtn(
                    i - this.currentShowId,
                    Views.MainView.ToolBarContainer.propManager.props[i])
                );
                this.itemsContainer.addChild(this.getTitle(i- this.currentShowId,
                    Views.MainView.ToolBarContainer.propManager.props[i].name));
            }
        }else
        {
            if(this.currentShowId<0) this.currentShowId = 0;
            else if(this.currentShowId>=(Views.MainView.ToolBarContainer.friendManager.Count())) this.currentShowId = Views.MainView.ToolBarContainer.friendManager.Count()-1;
            this.itemsContainer.removeAllChildren();
            for(var i=this.currentShowId;i<(this.showItemNum+this.currentShowId) && i<Views.MainView.ToolBarContainer.friendManager.Count();i++){
                this.itemsContainer.addChild(this.getSelectBtn(
                    i - this.currentShowId,
                    Views.MainView.ToolBarContainer.friendManager.friends[i])
                );
                this.itemsContainer.addChild(this.getTitle(i- this.currentShowId,
                    Views.MainView.ToolBarContainer.friendManager.friends[i].nickname));
            }
        }
    };

    SelectContainer.prototype.getTitle = function(id,text){
        var btnWidth = 80;
        var btnpMargin = 18;
        var px = 70 + (btnWidth + btnpMargin)*id;
        var width = 80;
        var height = 24;
        return new Q.Text({font:(height-5)+"px arial",x:px,y:100,width:width,height:height,lineWidth:width, color:"#fff",text:text,textAlign:"left"});
    };

    SelectContainer.prototype.getSelectBtn = function(id,item){
        var self = this;
        var btnWidth = 80;
        var btnHeight = 80;
        var scalew = btnWidth/item.photow;
        var scaleh = btnHeight/item.photoh;
        var btnpMargin = 18;
        var px = 70 + (btnWidth + btnpMargin)*id;
        var image = LoadedImages.friendui.image;
        if(self.type == 'Prop') image = Resources.getImage(item.photo);
        var btn = new Q.Button({image:image,x:px,y:13, width:item.photow, height:item.photoh,
            up:{rect:[item.photox,item.photoy,item.photow,item.photoh]},
            down:{rect:[item.photox,item.photoy,item.photow,item.photoh]}
        });
        btn.scaleX = scalew;
        btn.scaleY = scaleh;

        btn.addEventListener(events[2], function(e)
        {
            //点击选择item
            if(self.type == "Prop") Views.MainView.MessageContainer.addPropToMail(item);
            else Views.MainView.MessageContainer.addFriendToMail(item);
            Views.MainView.MessageContainer.hideSelectContainer();
        });
        return btn;
    };

    SelectContainer.prototype.getNextBtn = function(){
        var self = this;
        return this.getBtn(1,function(){
            self.currentShowId++;
            self.showItem();
        });
    };

    SelectContainer.prototype.getLastBtn = function(){
        var self = this;
        return this.getBtn(0,function(){
            self.currentShowId--;
            self.showItem();
        });
    };

    SelectContainer.prototype.getBtn = function(id,callback){
        var btnWidth = 41;
        var btnHeight = 94;
        var btnpMargin = 600;
        var btncMargin = 1;
        var px = 113 + (btnWidth + btnpMargin)*id;
        var cx = 1250 + (btnWidth+btncMargin)*id;
        var btn = new Q.Button({image:LoadedImages.foodui.image,x:px,y:88, width:btnWidth+10, height:btnHeight+10,
            up:{rect:[cx,86,btnWidth,btnHeight]},
            down:{rect:[cx,86,btnWidth,btnHeight]}
        });

        btn.addEventListener(events[2], function(e)
        {
            callback();
        });
        return btn;
    };

    return SelectContainer;
});