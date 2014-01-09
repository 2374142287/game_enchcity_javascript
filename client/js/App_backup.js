/**
 * Created with JetBrains WebStorm.
 * User: john
 * Date: 13-1-28
 * Time: 下午7:54
 * To change this template use File | Settings | File Templates.
 */

define(['jquery','Views','lib/url-parse','Sockets','Player','Resources','Global'],
    function($,views,URL_Parse,sockets,player,resources) {

        mapworkerLoaded = false;

        var initApp = function() {
            $(document).ready(function() {
                fps = 30;

                if(Detect.isWindows()) {
                    $('body').addClass('windows');
                }

                if(Detect.isOpera()) {
                    $('body').addClass('opera');
                }
                ///获取浏览器尺寸，设置显示模式
                Player = new player();
                Views = new views();
                Resources = new resources();
                initStage();
                /* 检测URL中是否含有userid
                URLPara = new URL_Parse;
                var UrlParas = URLPara.GetParameters(window.location.href);
                if(UrlParas === undefined || UrlParas === null || !UrlParas.userid)   //接口中还缺少了key等其他参数
                {
                    Views.showMsg("参数传递错误,请查证您访问的地址");
                    return;
                }else{
                    userid = UrlParas.userid;
                    key = UrlParas.key;
                }
                */
                //初始化视图
                reDraw();
                initNet();
                //window.onunload = Close;
                //window.onresize=reDraw;
            });
        };
        var reDraw = function(){
            Views.reSize();
            if(winSize == "NoSupport") {
                Views.showMsg("请旋转您的设备为横屏模式");
            }
        };
        var initStage = function(){
            Views.Stage = Views.getStage();
            Views.LoadResView = Views.getLoadResView();
            Views.Stage.addChild(Views.LoadResView);
            var em = new Q.EventManager();
            em.registerStage(Views.Stage, events, true, true);
            timer = new Q.Timer(1000/fps);
            timer.addListener(Views.Stage);
            timer.start();
        };
        var initNet = function() {
            Views.LoadResource(function(e){
                var s = e.target.getLoadedSize()*100 /e.target.getTotalSize();
                s = s + " ";
                ///trace(s);
                s = s.substring(0, 4);
                //trace(s);
                Views.showMsg("资源加载中:" +s+"%");
            },function(e){
                Views.showMsg("资源加载完成");
                Views.DisplayObjectsDefine.images = e.images;
                LoadedImages = e.images;
                LoadedResources = e.target._source;
                Views.showMsg("正在连接服务器...");
                Sockets = new sockets(Config.ServerUrl,Config.ServerPort,function(msg){
                    Views.Stage.removeAllChildren();
                    Views.showMsg("已经与服务器断开连接,msg:"+msg+".");
                    return;
                });
                start();
            });
        };

        var start = function() {
            initViews();
            Views.Stage.removeChild(Views.LoadResView);
            Views.showMsg("请稍候...");
            //登录窗口
            Views.Stage.removeAllChildren();
            Views.Stage.addChild(Views.Login0View);
            //询问服务器可以登录的消息
            //Sockets.send_reqLogin();
        };
        //初始化视图
        var initViews = function(){
            //Views.LogoView = Views.getLogoView();
            Views.RegView = Views.getRegView(reg0Action);
            Views.LoginView = Views.getLoginView(reg1Action);
            Views.Login0View = Views.getLogin0View(loginAction);
            //Views.MainView = Views.getMainView();
            //timer.addListener(Views.LogoAnimation(Views.LogoView,logoShowEnd));

        };
        //Logo显示结束
        var logoShowEnd = function(){
            Views.Stage.removeChild(Views.LogoView);
            Views.Stage.addChild(Views.LoginView);
        };

        var reg0Action = function(){
            Views.Stage.removeAllChildren();
            Views.Stage.addChild(Views.LoginView);
        };

        //点击登录
        var reg1Action = function(){
            Sockets.send_reg();
        };
        var loginAction = function(){
            Sockets.send_reqLogin();
        };
        initApp();
    });

