/**
 * Created with JetBrains WebStorm.
 * User: john
 * Date: 13-2-15
 * Time: 下午7:20
 * To change this template use File | Settings | File Templates.
 */
define(['jquery',winSize+'/CloseBtn'],function($,CloseBtn){
    var PersonalInfo = function(props)
    {
        PersonalInfo.superClass.constructor.call(this, props);
        this.init();
    };

    Q.inherit(PersonalInfo, Q.DisplayObjectContainer);

    PersonalInfo.prototype.init = function(){
        this.addChildAt(this.getBg(),0);
        var closeBtn = new CloseBtn({x:671,y:0},function(){
            Views.MainView.HidePersonalInfo();
        });
        this.addChildAt(closeBtn,1);
    };

    PersonalInfo.prototype.getBg = function(){
        var bg = new Q.Bitmap({image:LoadedImages.personalinfo.image,rect:[419,0,767,580]});
        return bg;
    };

    return PersonalInfo;
});