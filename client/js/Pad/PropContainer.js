/**
 * Created with JetBrains WebStorm.
 * User: john
 * Date: 13-2-23
 * Time: 上午10:04
 * To change this template use File | Settings | File Templates.
 */
define(['jquery'],function($){
    var PropContainer = function(prop)
    {
        PropContainer.superClass.constructor.call(this);
        this.init(prop);
    };

    Q.inherit(PropContainer, Q.DisplayObjectContainer);

    PropContainer.prototype.init = function(prop){
        this.iconSize = 106;
        this.iconMargin = 1;
        this.addChild(this.GetIcon(prop));
    };

    PropContainer.prototype.GetIcon = function(prop){
        var iconWidth = 106;
        var iconHeight = 106;
            var sx = prop.propid * (iconWidth + this.iconMargin);
            var btn = new Q.Button({image:LoadedImages.propicon.image, width:iconWidth, height:iconHeight,
                up:{rect:[sx,0,iconWidth,iconHeight]},
                down:{rect:[sx,0,iconWidth,iconHeight]}
            });
            btn.addEventListener(events[2], function(e)
            {
                var text = "确认使用道具"+prop.name+"吗？";
                Views.MainView.showDialogUse(text,function(){
                    //本地模拟数据用
                    Views.MainView.ToolBarContainer.propManager.remove(prop.propid);
                    Views.MainView.ToolBarContainer.ShowProps();
                });
            });
            return btn;
    };
    return PropContainer;
});