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
    var BackBtn = function(props,action)
    {
        BackBtn.superClass.constructor.call(this, props);
        this.init(action);
    };

    Q.inherit(BackBtn, Q.DisplayObjectContainer);

    BackBtn.prototype.init = function(action){
        this.image = LoadedImages.employui.image;
        this.width = 91;
        this.height = 48;
        var btn = new Q.Button({image:LoadedImages.employui.image, x:0, y:0, width:this.width, height:this.height,
            up:{rect:[962,59,this.width,this.height]},
            //over:{rect:[1201 + 120,77,this.width,this.height]},
            down:{rect:[962,59,this.width,this.height]}
        });
        this.addChild(btn);
        //this.eventChildren = false;
        btn.addEventListener(events[2], function(e)
        {
            action();
        });
    };
    return BackBtn;
});
