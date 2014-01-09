/**
 * Created with JetBrains WebStorm.
 * User: john
 * Date: 13-2-5
 * Time: 下午5:20
 * To change this template use File | Settings | File Templates.
 */
define(['jquery','DisplayObjectsDefine'], function($,displayObjectsDefine) {

    var views = Class.extend({
        init: function() {
            this.DisplayObjectsDefine = new displayObjectsDefine();
            this.Stage = this.getStage();
            this.LoadResView = new Q.DisplayObjectContainer();
            this.LogoView = new Q.DisplayObjectContainer();
            this.RegView = new Q.DisplayObjectContainer();
            this.Login0View = new Q.DisplayObjectContainer();
            this.LoginView = new Q.DisplayObjectContainer();
            this.MainView = new Q.DisplayObjectContainer();
        },

        
        reSize : function(){
            Views.DisplayObjectsDefine = new displayObjectsDefine;
            var scalex = Views.DisplayObjectsDefine.containerWidth/Views.Stage.width;
            var scaley = Views.DisplayObjectsDefine.containerHeight/Views.Stage.height;
            Views.Stage.scaleX = scalex;
            Views.Stage.scaleY = scaley;
        },

        GameWork: function(){
            this.MainView.GameView.DrawMap();
        },

        getContainer : function(){
            $('#container').empty();
            return Q.getDOM("container");
        },
        //获取舞台
        getStage : function(){
            var container = this.getContainer();
            //this.DisplayObjectsDefine.displayer.SetDivShow(container);
            params = Quark.getUrlParams();
            if(params.mode == undefined) params.mode = 2;
   
            var winWidth = this.DisplayObjectsDefine.containerWidth;
            var winHeight = this.DisplayObjectsDefine.containerHeight;

            if(params.mode == 1)
            {
                var canvas = Quark.createDOM("canvas", {width:winWidth, height:winHeight, style:{position:"absolute",backgroundColor:"#eee"}});
                container.appendChild(canvas);
                context = new Quark.CanvasContext({canvas:canvas});
            }else
            {
                context = new Quark.DOMContext({canvas:container});
            }
            var stage = new Q.Stage({context:context, width:winWidth, height:winHeight, update:function()
            {
                frames++;
            }});
            return stage;
        },

        LoadResource :function(loadedCallback,completeCallback){
            this.DisplayObjectsDefine.LoadImages(loadedCallback,completeCallback);
        },

        getLogoView : function(){
            var logo = this.DisplayObjectsDefine.GetLogo(this.Stage);
            return logo;
        },

        LogoAnimation : function(logo,callback){
            Q.Tween.to(logo, {alpha:1}, {time:500, onComplete:function(tween)
            {
                Q.Tween.to(logo, {alpha:0}, {time:500, delay:500, onComplete:function()
                {
                    callback();
                }});
            }});
            return Q.Tween;
        },

        getLoadResView : function(){
            var Container = this.DisplayObjectsDefine.GetLoadResContainer(this.Stage);
            return Container;
        },

        getRegView : function(callback){
            var Container = this.DisplayObjectsDefine.GetRegContainer(this.Stage,callback);
            return Container;
        },

        getLogin0View : function(callback){
            var Container = this.DisplayObjectsDefine.GetLogin0Container(this.Stage,callback);
            return Container;
        },

        getLoginView : function(callback){
            var Container = this.DisplayObjectsDefine.GetLoginContainer(this.Stage,callback);
            return Container;
        },

        getMainView : function(){
            var mainContainer = this.DisplayObjectsDefine.GetMainContainer(this.Stage);
            return mainContainer;
        },

        showMsg : function(text,isBlack){
            //Views.Stage.removeAllChildren();
            if(!Views.Stage.contains(Views.LoadResView))
                Views.Stage.addChildAt(Views.LoadResView,999);
            Views.LoadResView.setText(text,isBlack);
        }
    });
    return views;
});