/**
 * Created with JetBrains WebStorm.
 * User: john
 * Date: 13-1-28
 * Time: 下午7:54
 * To change this template use File | Settings | File Templates.
 */

define(['jquery','Views','lib/url-parse','Sockets','Player','Resources','Displayer','CastleDev','LoadResContainer','TilesMap/mapCoordinater','../../js/Base64','Global'],
    function($,views,URL_Parse,sockets,player,resources,Displayer,CastleDev,LoadResContainer,MapCoordinater) {
        mapworkerLoaded = false;

        var initApp = function() {
            $(document).ready(function() {
                fps = 6;

                if(Detect.isWindows()) {
                    $('body').addClass('windows');
                }

                if(Detect.isOpera()) {
                    $('body').addClass('opera');
                }
                ///获取浏览器尺寸，设置显示模式
				this.isMovedTarget = false;
				this.selectedFcomp = null;
                Player = new player();
                Views = new views();
                Resources = new resources();
                initStage();
                /* 检测URL中是否含有userid
                 URLPara = new URL_Parse;
                 var UrlParas = URLPara.GetParameters(window.location.href);
                 if(UrlParas === undefined || UrlParas === null)
                 {
                 Views.showMsg("参数传递错误,请查证您访问的地址");
                 return;
                 }else{
                 var bs64 = new Base64();
                 Account = bs64.decode(UrlParas.account);
                 Password = bs64.decode(UrlParas.password);
                 }*/

                var url = window.location.href;
                var UrlParas = url.substring(url.indexOf("?")+1,url.length);
                if(UrlParas === undefined || UrlParas === null || UrlParas.length === 0)
                {
                    Views.showMsg("参数传递错误,请查证您访问的地址");
                    return;
                }else{
                    var bs64 = new Base64();
                    var parameters = bs64.decode(UrlParas);
                    Account = requestUrlParam("account", parameters);
                    Password = requestUrlParam("password", parameters);
                }
                window.onresize=reDraw;
                var displayer = new Displayer;
                displayer.FindDimensions();
                var winWidth = displayer.winWidth;
                var winHeight = displayer.winHeight;
                direction = winWidth > winHeight;
                //初始化视图
                reDraw();
                //if(winWidth > winHeight) {
                    //initDraw();
                //}
            });
        };
		
		function requestUrlParam(paras, parameters){ 
			var paraString = parameters.split("&"); 
			var paraObj = {} 
			for (i=0; j=paraString[i]; i++){ 
				paraObj[j.substring(0,j.indexOf("=")).toLowerCase()] = j.substring(j.indexOf("=")+1,j.length); 
			} 
			var returnValue = paraObj[paras.toLowerCase()]; 
			if(typeof(returnValue)=="undefined"){ 
				return ""; 
			}else{ 
				return returnValue; 
			} 
		};

        var reDraw = function(){
            var displayer = new Displayer;
            displayer.FindDimensions();
            var winWidth = displayer.winWidth;
            var winHeight = displayer.winHeight;
            Views.Stage.removeChild(Views.LoadResView);
            /*if(winWidth < winHeight)
            {
                Views.reSize();
                Views.showMsg("请旋转您的设备为横屏模式",true);
            }
            else
            {
                if(!direction) location.reload();*/
                Views.reSize();
                Views.Stage.removeChild(Views.LoadResView);
                if(typeof(LoadedImages) == "undefined") {
                    initNet();
                }
            //}
        };

        var initDraw = function(){
            Views.reSize();
            Views.showMsg("请旋转您的设备为横屏模式",true);
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
			Views.Stage.addEventListener(events[0], function(e){
                this.mapCoordinater = new MapCoordinater;
                var px=this.mapCoordinater.getBx(e.eventX,e.eventY);
                var py=this.mapCoordinater.getBy(e.eventX,e.eventY);
                //alert(px+","+py);
                if(px!=-1&&py!=-1&&Views.MainView.GameView.isOpen){
                  Views.MainView.GameView.ReDrawTempFacility(e.eventX,e.eventY,px,py);
				} else if(px!=-1&&py!=-1&&Views.MainView.GameView.isMoved){
					if(!this.isMovedTarget){
						//先删除
						var fc = Views.MainView.GameView.MapWorker.getFurnitureComponent(px,py);
						//记住，移动到目标用
						this.selectedFcomp = fc;
						this.isMovedTarget = true;
						trace(">>>>>>>>>>>>>>>>>>>>"+fc);
						//删除相关的列表保存记录（格子锁、设施占用集合）
						fc.removePosition(fc);
						//界面删除
						Views.MainView.GameView.MapWorker.removeItem(fc);
					} else {
						//move target
						this.isMovedTarget = false;
						Views.MainView.GameView.isMoved = false;
						Views.MainView.GameView.ReDrawMovedFacility(this.selectedFcomp,e.eventX,e.eventY,px,py);
						this.selectedFcomp = null;
					}
				} else if(px!=-1&&py!=-1&&Views.MainView.GameView.isDeleted){
					Views.MainView.GameView.isDeleted = false;
					var fc = Views.MainView.GameView.MapWorker.getFurnitureComponent(px,py);
					this.castleDev = new CastleDev();
					this.castleDev.devX = fc.devX;
					this.castleDev.devY = fc.devY;
					//删除相关的列表保存记录（格子锁、设施占用集合）
					fc.removePosition(fc);
					trace(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>.222");
					//数据库删除
					Sockets.send_ReqDeletedCastleDev(this.castleDev);
					trace(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>.333");
					//界面删除
					Views.MainView.GameView.MapWorker.removeItem(fc);
					trace(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>.444");
				} else if(px!=-1&&py!=-1&&Views.MainView.GameView.isUseWupin){
                    Views.MainView.GameView.isUseWupin = false;
                    var fc = Views.MainView.GameView.MapWorker.getFurnitureComponent(px,py);
                    this.castleDev = new CastleDev();
                    this.castleDev.devX = fc.devX;
                    this.castleDev.devY = fc.devY;
                    Sockets.send_reqUseWupinOnDev(this.castleDev, currentSelectedWpItem.id);
                } else {}
			});
        };
        var initNet = function() {
            Views.LoadResource(function(e){
                var s = e.target.getLoadedSize()*100 /e.target.getTotalSize();
                s = s + " ";
                ///trace(s);
                s = s.substring(0, 4);
                //trace(s);
                Views.showMsg("资源加载中:" +s+"%",false);
            },function(e){
                Views.showMsg("资源加载完成",false);
                Views.DisplayObjectsDefine.images = e.images;
                LoadedImages = e.images;
                LoadedResources = e.target._source;
                Views.showMsg("正在连接服务器...",false);
                Sockets = new sockets(Config.ServerUrl,Config.ServerPort,function(msg){
                    Views.Stage.removeAllChildren();
                    Views.showMsg("已经与服务器断开连接,msg:"+msg+".");
                    return;
                });
                start();
            });
        };

        var start = function() {
            //initViews();
            //Views.Stage.removeChild(Views.LoadResView);
            //Views.showMsg("请稍候...");
            //登录窗口
            //Views.Stage.removeAllChildren();
            //Views.Stage.addChild(Views.Login0View);
            //询问服务器可以登录的消息
			Views.Stage.removeAllChildren();
            Sockets.send_reqLogin();
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

