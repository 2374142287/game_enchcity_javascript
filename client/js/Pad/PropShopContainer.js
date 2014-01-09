/**
 * Created with JetBrains WebStorm.
 * User: john
 * Date: 13-2-23
 * Time: 上午10:04
 * To change this template use File | Settings | File Templates.
 */
define(['jquery'],function($){
    var PropShopContainer = function(prop)
    {
        PropShopContainer.superClass.constructor.call(this);
        this.init(prop);
    };

    Q.inherit(PropShopContainer, Q.DisplayObjectContainer);

    PropShopContainer.prototype.init = function(prop){
        this.iconSize = 106;
        this.iconMargin = 1;
        this.addChild(this.GetIcon(prop,function(){
            //点击商城道具
            if(prop.islocked!=1){
                var text = "是否花费"+prop.xingbei+"星贝购买道具:"+prop.name+"吗？";
                Views.MainView.showDialogBuy(text,function(){
                    //本地模拟数据用
                    if(Player.xingbei > prop.xingbei){
                    Views.MainView.ToolBarContainer.propManager.add(prop);
                    Views.MainView.ToolBarContainer.ShowProps();
                    Player.xingbei -= prop.xingbei;
                    Sockets.dataManager.reflashInfoBar();
                    }else{
                        Views.MainView.showDialogMessage("您当前的星贝余额不足，请充值！");
                    }
                });
            }else{
                Views.MainView.showDialogMessage("对不起，您当前的酒馆等级不够！");
            }
        }));
    };

    PropShopContainer.prototype.GetIcon = function(prop,action){
        var iconWidth = 106;
        var iconHeight = 106;
        var sx = prop.propid * (iconWidth + this.iconMargin);

        if(prop.islocked == 1){
            var btn = new Q.Button({image:LoadedImages.propiconlock.image, width:prop.photow, height:prop.photoh,
                up:{rect:[prop.photox,prop.photoy,prop.photow,prop.photoh]},
                down:{rect:[prop.photox,prop.photoy,prop.photow,prop.photoh]}
            });
        }else{
            var btn = new Q.Button({image:Resources.getImage(prop.photo), width:prop.photow, height:prop.photoh,
                up:{rect:[prop.photox,prop.photoy,prop.photow,prop.photoh]},
                down:{rect:[prop.photox,prop.photoy,prop.photow,prop.photoh]}
            });
        }

        btn.addEventListener(events[2], function(e)
        {
            action(prop.propid);
        });
        return btn;
    };
    return PropShopContainer;
});