/**
 * Created with JetBrains WebStorm.
 * User: john
 * Date: 13-2-13
 * Time: 下午3:11
 * To change this template use File | Settings | File Templates.
 */
/**
 * Created with JetBrains WebStorm.
 * User: john
 * Date: 13-2-12
 * Time: 下午10:31
 * To change this template use File | Settings | File Templates.
 */
define(['jquery'],function($){
    var CloseBtn = function(props,action)
    {
        CloseBtn.superClass.constructor.call(this, props);
        this.init(action);
    };

    Q.inherit(CloseBtn, Q.DisplayObjectContainer);

    CloseBtn.prototype.init = function(action){
        this.image = LoadedImages.foodui.image;
        this.width = 60;
        this.height = 65;
        var btn = new Q.Button({image:LoadedImages.foodui.image, x:0, y:0, width:this.width, height:this.height,
            up:{rect:[1334,87,this.width-10,this.height-10]},
            //over:{rect:[1201 + 120,77,this.width,this.height]},
            down:{rect:[1334,87,this.width-10,this.height-10]}
        });
        this.addChild(btn);
        //this.eventChildren = false;
        btn.addEventListener(events[2], function(e)
        {
            action();
        });
    };
    return CloseBtn;
});
