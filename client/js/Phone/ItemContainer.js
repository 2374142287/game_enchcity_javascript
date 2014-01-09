/**
 * Created with JetBrains WebStorm.
 * User: john
 * Date: 13-3-10
 * Time: 上午12:39
 * To change this template use File | Settings | File Templates.
 */
/**
 * Created with JetBrains WebStorm.
 * User: john
 * Date: 13-3-9
 * Time: 下午8:49
 * To change this template use File | Settings | File Templates.
 */

define([winSize+'/PropContainer'],function(propContainer){
    var ItemContainer = function()
    {
        ItemContainer.superClass.constructor.call(this);
        this.init();
    };

    Q.inherit(ItemContainer, Q.DisplayObjectContainer);

    ItemContainer.prototype.init = function(){
        this.width = 860;
        this.height = 460;
        this.x = 90;
        this.y = 46;
        //一起显示物品数量
        this.showItemsNum = 4;
        this.ItemInfoList = new Q.DisplayObjectContainer({x:0,y:0,width:860,height:375});
        this.addChildAt(this.ItemInfoList,2);
        this.currentShowItemId = 0;
        this.selectedItemId = -1;
        this.addChildAt(this.getNextBtn(),2);
        this.addChildAt(this.getLastBtn(),2);
        this.addChildAt(this.getUseBtn(),2);
        this.addChildAt(this.getSellBtn(),2);
    };

    ItemContainer.prototype.showItems = function(){
        if(this.currentShowItemId<0) this.currentShowItemId = 0;
        else if(this.currentShowItemId>=(Views.MainView.ToolBarContainer.propManager.Count())) this.currentShowItemId = Views.MainView.ToolBarContainer.propManager.Count()-1;

        this.ItemInfoList.removeAllChildren();
        if(this.currentShowItemId>=0){
            for(var i=this.currentShowItemId;i<(this.showItemsNum+this.currentShowItemId) && i<Views.MainView.ToolBarContainer.propManager.Count();i++){
                var PropContainer = new propContainer({x:59+185*(i-this.currentShowItemId),y:13},Views.MainView.ToolBarContainer.propManager.props[i]);
                this.ItemInfoList.addChild(PropContainer);
            }
        }
    };

    ItemContainer.prototype.getNextBtn = function(){
        var self = this;
        return this.getBtn(1,function(){
            self.currentShowItemId++;
            self.showItems();
        });
    };

    ItemContainer.prototype.getLastBtn = function(){
        var self = this;
        return this.getBtn(0,function(){
            self.currentShowItemId--;
            self.showItems();
        });
    };

    ItemContainer.prototype.getBtn = function(id,callback){
        var btnWidth = 41;
        var btnHeight = 94;
        var btnpMargin = 747;
        var btncMargin = 1;
        var px = 15 + (btnWidth + btnpMargin)*id;
        var cx = 1250 + (btnWidth+btncMargin)*id;
        var btn = new Q.Button({image:LoadedImages.foodui.image,x:px,y:144, width:btnWidth+10, height:btnHeight+10,
            up:{rect:[cx,86,btnWidth,btnHeight]},
            down:{rect:[cx,86,btnWidth,btnHeight]}
        });

        btn.addEventListener(events[2], function(e)
        {
            callback();
        });
        return btn;
    };

    ItemContainer.prototype.getUseBtn = function(){
        var self = this;
        return self.getcBtn(0,function(){
            if(self.selectedItemId >=0 && self.selectedItemId<Views.MainView.ToolBarContainer.propManager.props.length){
                if(Views.MainView.ToolBarContainer.propManager.props[self.selectedItemId].typecode!='CD'&&
                    Views.MainView.ToolBarContainer.propManager.props[self.selectedItemId].typecode!='CE'&&
                    Views.MainView.ToolBarContainer.propManager.props[self.selectedItemId].typecode!='F') {
                    Sockets.send_ReqPropUse(Views.MainView.ToolBarContainer.propManager.props[self.selectedItemId].propid,userid);
                }else{
                    Views.MainView.ShowMessage("不能直接使用该道具<br/>请拜访好友时选择使用对好友的影响道具");
                }
            }
            else{
                Views.MainView.ShowMessage("请选择一个道具");
            }
        });
    };
    ItemContainer.prototype.getSellBtn = function(){
        var self = this;
        return self.getcBtn(1,function(){
            if(self.selectedItemId >=0 && self.selectedItemId<Views.MainView.ToolBarContainer.propManager.props.length){
                Sockets.send_ReqPropSaleOut(Views.MainView.ToolBarContainer.propManager.props[self.selectedItemId].propid);
            }
            else{
                Views.MainView.ShowMessage("请选择一个道具");
            }
        });
    };
    ItemContainer.prototype.getcBtn = function(id,action){
        var btnWidth = 209;
        var btnHeight = 58;
        var btnpMargin = 55;
        var px = 190 + (btnWidth + btnpMargin)*id;
        var cy = 413;
        if(id==0) cy = 177;
        var btn = new Q.Button({image:LoadedImages.itemui.image,x:px,y:390, width:btnWidth, height:btnHeight,
            up:{rect:[0,cy,btnWidth,btnHeight]},
            down:{rect:[0,cy,btnWidth,btnHeight]}
        });

        btn.addEventListener(events[2], function(e)
        {
            action();
        });
        return btn;
    };

    return ItemContainer;
});