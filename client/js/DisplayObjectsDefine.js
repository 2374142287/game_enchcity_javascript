/**
 * Created with JetBrains WebStorm.
 * User: john
 * Date: 13-2-5
 * Time: 下午7:28
 * To change this template use File | Settings | File Templates.
 */
define(['jquery','Displayer',winSize+'/IdolManager','LoadResContainer',
    winSize+'/RegContainer',
    winSize+'/Login0Container',
    winSize+'/LoginContainer',
    winSize+'/MainContainer'],
    function($, Displayer,IdolManager,LoadResContainer,
             RegContainer,
             Login0Container,
             LoginContainer,
             MainContainer) {
        var DisplayObjectsDefine = Class.extend({
            init: function() {
                this.displayer = new Displayer;
                this.displayer.FindDimensions();
                this.WindowWidth = this.displayer.winWidth;
                this.WindowHeight = this.displayer.winHeight;

                this.displayer.containerWidth = this.displayer.winWidth;
                this.displayer.containerHeight = this.displayer.winHeight;

                this.containerWidth = this.displayer.containerWidth;
                this.containerHeight = this.displayer.containerHeight;
                this.loader = null;
                this.images = null;
                if(winSize === 'Pad'){
                    this.displayer.fixWinWidth = 1920;
                    this.displayer.fixWinHeight = 1080;
                    this.houseTileWidth = 144;
                    this.houseTileSetHeight = 425;
                    this.houseTileHeight = 72;
                    this.tileImageWidth = 288;
                } else if(winSize === 'Phone'){
                    this.displayer.fixWinWidth = 960;
                    this.displayer.fixWinHeight = 540;
                    this.displayer.divWinWidth = 335;
                    this.displayer.divWinHeight = 485;
                    this.displayer.maincontentWidth = 290;
                    this.displayer.maincontentHeight = 285;
                    this.displayer.divViewWidth = 335;
                    this.displayer.divViewHeight = 365;
                    //this.houseTileWidth = 72;
                    //this.houseTileSetHeight = 213;
                    //this.houseTileHeight = 36;
                    //this.tileImageWidth = 144;
                    this.houseTileWidth = 80;
                    this.houseTileSetHeight = 237;
                    this.houseTileHeight = 40;
                    this.tileImageWidth = 160;
                }
            },

            LoadImages:function(loadedCallback,completeCallback){
                this.loader = new Q.ImageLoader();
                this.loader.addEventListener("loaded", function(e){
                    loadedCallback(e);
                });
                this.loader.addEventListener("complete", function(e){
                    completeCallback(e);
                });
                /*for(var i=1;i<43;i++){
                 this.loader._addSource({id:"furnitureLeft"+0, src:"images/"+winSize+"/furnituresLeft/"+i+".png", size:40});
                 this.loader._addSource({id:"furnitureRight"+0, src:"images/"+winSize+"/furnituresRight/"+i+".png", size:40});
                 }*/
                for(var i=1;i<33;i++){
                    this.loader._addSource({id:"normal"+0, src:"images/"+winSize+"/normal/"+i+".png", size:40});
                }
                for(var i=1;i<34;i++){
                    this.loader._addSource({id:"chosen"+0, src:"images/"+winSize+"/chosen/"+i+".png", size:40});
                }
                for(var i=1;i<21;i++){
                    this.loader._addSource({id:"wp"+0, src:"images/"+winSize+"/wp/"+i+".png", size:40});
                }
                for(var i=1;i<6;i++){
                    this.loader._addSource({id:"tz"+0, src:"images/"+winSize+"/tz/"+i+".png", size:40});
                }
                switch(winSize){
                    case "Pad":
                        this.loader.load([
                            {id:"logo", src:"images/"+winSize+"/logo.jpg", size:62},
                            {id:"hidebtn", src:"images/"+winSize+"/hideBtn.png", size:1},
                            {id:"loginbg", src:"images/"+winSize+"/loginBg.jpg", size:99},
                            {id:"loginui", src:"images/"+winSize+"/loginUI.png", size:2273},
                            {id:"personalinfo", src:"images/"+winSize+"/personalInfo.png", size:97},
                            {id:"mainbg", src:"images/"+winSize+"/mainbg.jpg", size:246},
                            {id:"mainui", src:"images/"+winSize+"/mainUI.png", size:510},
                            {id:"functionbarbg", src:"images/"+winSize+"/functionBarBg.png", size:8},
                            {id:"friendui", src:"images/"+winSize+"/friendUI.png", size:685},
                            {id:"friendicon", src:"images/"+winSize+"/friendIcon.png", size:137},
                            {id:"propicon", src:"images/"+winSize+"/propIcon.png", size:73},
                            {id:"propiconlock", src:"images/"+winSize+"/propIconLock.png", size:58},
                            {id:"foodui", src:"images/"+winSize+"/foodUI.png", size:1001},
                            {id:"foodinfoui", src:"images/"+winSize+"/FoodInfoUI.png", size:62},
                            {id:"queueui", src:"images/"+winSize+"/queueUI.png", size:129},
                            {id:"mailui0", src:"images/"+winSize+"/mailUI0.png", size:202},
                            {id:"mailui1", src:"images/"+winSize+"/mailUI1.png", size:604},
                            {id:"headicon", src:"images/"+winSize+"/headIcon.png", size:148},
                            {id:"furnituresicon", src:"images/"+winSize+"/furnituresIcon.png", size:65},
                            {id:"furnituresiconlock", src:"images/"+winSize+"/furnituresIconLock.png", size:66},
                            {id:"dragmapui", src:"images/"+winSize+"/dragMapUI.png", size:32},
                            {id:"buydialog", src:"images/"+winSize+"/buyDialog.png", size:61},
                            {id:"tipicon", src:"images/"+winSize+"/tipIcon.png", size:88},
                            {id:"rechargeui", src:"images/"+winSize+"/rechargeUI.png", size:260},

                            {id:"manlanxiaoh", src:"images/"+winSize+"/manlanxiaoh.png", size:430},
                            {id:"manlifashi", src:"images/"+winSize+"/manlifashi.png", size:118},
                            {id:"manxiaochou", src:"images/"+winSize+"/manxiaochou.png", size:115},
                            {id:"manyouchai", src:"images/"+winSize+"/manyouchai.png", size:139},
                            {id:"manbartenderdanniel", src:"images/"+winSize+"/manBartenderDanniel.png", size:118},
                            {id:"manmusicmeimei", src:"images/"+winSize+"/manMusicMeimei.png", size:190}
                        ]);
                        break;
                    case "Phone":
                        this.loader.load([
                            {id:"hidebtn", src:"images/"+winSize+"/hideBtn.png", size:1},
                            {id:"regbg", src:"images/"+winSize+"/RegBg.jpg", size:140},
                            {id:"regui", src:"images/"+winSize+"/RegUI.png", size:43},
                            {id:"login0bg", src:"images/"+winSize+"/login0Bg.jpg", size:152},
                            {id:"loginbg", src:"images/"+winSize+"/loginBg.jpg", size:165},
                            {id:"loginui", src:"images/"+winSize+"/loginUI.png", size:309},
                            {id:"mainbg", src:"images/"+winSize+"/mainbg.png", size:236},
                            {id:"mainbgtopleft", src:"images/"+winSize+"/mainbgtopleft.jpg", size:110},
                            {id:"mainbgbottomleft", src:"images/"+winSize+"/mainbgbottomleft.jpg", size:97},
                            {id:"mainbgtopright", src:"images/"+winSize+"/mainbgtopright.jpg", size:110},
                            {id:"mainbgbottomright", src:"images/"+winSize+"/mainbgbottomright.jpg", size:97},
                            {id:"mainui", src:"images/"+winSize+"/mainUI.png", size:47},
                            {id:"mainicon", src:"images/"+winSize+"/mainIcon.gif", size:44},
                            {id:"foodui", src:"images/"+winSize+"/foodUI.png", size:62},
                            {id:"foodbg", src:"images/"+winSize+"/foodBg.jpg", size:40},
                            {id:"personalinfo", src:"images/"+winSize+"/personalInfo.png", size:42},
                            {id:"friendui", src:"images/"+winSize+"/friendUI.gif", size:70},
                            {id:"employui", src:"images/"+winSize+"/employUI.gif", size:76},
                            {id:"tipicon", src:"images/"+winSize+"/tipIcon.png", size:14},
                            {id:"itembg", src:"images/"+winSize+"/itemBg.jpg", size:18},
                            {id:"itemui", src:"images/"+winSize+"/itemUI.gif", size:27},
                            {id:"propui", src:"images/"+winSize+"/propUI.gif", size:15},
                            {id:"propicon", src:"images/"+winSize+"/propIcon.png", size:159},
                            {id:"propicon2", src:"images/"+winSize+"/propIcon2.png", size:159},
                            {id:"rechargeui", src:"images/"+winSize+"/rechargeUI.gif", size:46},
                            {id:"shopbg", src:"images/"+winSize+"/shopBg.jpg", size:76},
                            {id:"furnituresicon", src:"images/"+winSize+"/furnituresIcon.png", size:129},
                            {id:"foodupgradebg", src:"images/"+winSize+"/foodUpgradeBg.jpg", size:129},
                            {id:"messageui", src:"images/"+winSize+"/MessageUI.png", size:129},
                            {id:"mailui", src:"images/"+winSize+"/mailUI.gif", size:129},
                            {id:"friendaddbg", src:"images/"+winSize+"/friendAddBg.gif", size:19},
                            {id:"visiticon", src:"images/"+winSize+"/visitIcon.png", size:19},
                            {id:"invitekiki", src:"images/"+winSize+"/inviteKiki.png", size:10},
                            {id:"invitetiti", src:"images/"+winSize+"/inviteTiti.png", size:13},

                            {id:"tiphearticon", src:"images/"+winSize+"/TipHeartIcon.png", size:13},
                            {id:"exitbtn", src:"images/"+winSize+"/exit.png", size:1},

                            {id:"manlanxiaoh", src:"images/"+winSize+"/manlanxiaoh.gif", size:25},
                            {id:"manlifashi", src:"images/"+winSize+"/manlifashi.gif", size:23},
                            {id:"manxiaochou", src:"images/"+winSize+"/manxiaochou.gif", size:19},
                            {id:"manyouchai", src:"images/"+winSize+"/manyouchai.png", size:26},
                            {id:"manbartenderdanniel", src:"images/"+winSize+"/manBartenderDanniel.gif", size:16},
                            {id:"manmusicmeimei", src:"images/"+winSize+"/manMusicMeimei.gif", size:25},
                            {id:"manservice", src:"images/"+winSize+"/manservice.gif", size:10},
                            {id:"managerui", src:"images/"+winSize+"/manageButs.png", size:71},
                            {id:"managerButList", src:"images/"+winSize+"/manage_but_li1_1.png", size:61},
                            {id:"floorButList", src:"images/"+winSize+"/floorButs.png", size:55},
                            {id:"facility01", src:"images/"+winSize+"/normal/1.png", size:42},
                            {id:"managezxui", src:"images/"+winSize+"/zxUi.png", size:73},
                            {id:"dialogsui", src:"images/"+winSize+"/dialogsui.png", size:73},
                            {id:"manageleague", src:"images/"+winSize+"/league.png", size:73},
                            {id:"manageleagueemploy", src:"images/"+winSize+"/employ.png", size:72},
                            {id:"managexinxi", src:"images/"+winSize+"/xinxi.png", size:73},
                            {id:"managetouzi", src:"images/"+winSize+"/touzi.png", size:73},
                            {id:"managechongzhi", src:"images/"+winSize+"/chongzhi.png", size:73},
                            {id:"managewupin", src:"images/"+winSize+"/wupin.png", size:73},
                            {id:"city_bdkg", src:"images/"+winSize+"/city_bdkg.png", size:50},
                            {id:"city_kl", src:"images/"+winSize+"/city_kl.png", size:50},
                            {id:"city_lckg", src:"images/"+winSize+"/city_lckg.png", size:50},
                            {id:"city_fczkg", src:"images/"+winSize+"/city_fczkg.png", size:50},
                            {id:"city_ydng", src:"images/"+winSize+"/city_ydng.png", size:50},

                            {id:"floor_base", src:"images/"+winSize+"/floor_base.png", size:170},
                            {id:"floor_0", src:"images/"+winSize+"/floor_0.png", size:170},
                            {id:"floor_1", src:"images/"+winSize+"/floor_1.png", size:170},
                            {id:"floor_2", src:"images/"+winSize+"/floor_2.png", size:170},
                            {id:"floor_3", src:"images/"+winSize+"/floor_3.png", size:170},
                            {id:"floor_4", src:"images/"+winSize+"/floor_4.png", size:170},
                            {id:"floor_5", src:"images/"+winSize+"/floor_5.png", size:170},
                            {id:"blank", src:"images/"+winSize+"/blank.png", size:170},
                            {id:"night_bg", src:"images/"+winSize+"/night_bg.png", size:220},
                            {id:"day_bg", src:"images/"+winSize+"/day_bg.png", size:220},
                            {id:"character01", src:"images/"+winSize+"/02.png", size:25},  //先使用02.png
                            {id:"character02", src:"images/"+winSize+"/02.png", size:25},
                            {id:"character03", src:"images/"+winSize+"/03.png", size:25},
                            {id:"character04", src:"images/"+winSize+"/04.png", size:25},
                            {id:"character05", src:"images/"+winSize+"/05.png", size:25},
                            {id:"character06", src:"images/"+winSize+"/06.png", size:25},
                            {id:"icomoney", src:"images/"+winSize+"/ico_money.png", size:73}



                        ]);
                        break;
                    default:
                        break;
                }
            },

            //LogoView
            GetLogo: function(container) {
                var logo = new Q.Bitmap({image:this.images.logo.image, alpha:0});
                logo.rotation = 0;
                this.displayer.SetDisplayObjectScaleFullHeightSize(logo,container);
                this.displayer.SetDisplayObjectCenter(logo,container);
                return logo;
            },
            //LoginView
            GetLoadResContainer:function(container){
                var loadResContainer = new LoadResContainer({
                    width:this.displayer.fixWinWidth,
                    height:this.displayer.fixWinHeight,x:0,y:0},this.displayer,container);
                this.displayer.SetDisplayObjectScaleFullSmallSize(loadResContainer,container);
                this.displayer.SetDisplayObjectCenter(loadResContainer,container);
                return loadResContainer;
            },
            //RegView
            GetRegContainer:function(container,callback){
                /*
                 var regContainer = new RegContainer({width:container.getCurrentWidth(), height:container.getCurrentHeight(),x:0,y:0},this.displayer,callback);
                 this.displayer.SetDisplayObjectCenter(regContainer,container);
                 */
                var regContainer = new RegContainer({
                    width:this.displayer.fixWinWidth,
                    height:this.displayer.fixWinHeight,x:0,y:0},this.displayer,callback);
                this.displayer.SetDisplayObjectScaleFullSmallSize(regContainer,container);
                this.displayer.SetDisplayObjectCenter(regContainer,container);
                return regContainer;
            },
            //Login0View
            GetLogin0Container:function(container,callback){
                var login0Container = new Login0Container({
                    width:this.displayer.fixWinWidth,
                    height:this.displayer.fixWinHeight},this.displayer,callback);
                this.displayer.SetDisplayObjectScaleFullSmallSize(login0Container,container);
                this.displayer.SetDisplayObjectCenter(login0Container,container);
                return login0Container;
            },
            //LoginView
            GetLoginContainer:function(container,callback){
                var loginContainer = new LoginContainer({
                    width:this.displayer.fixWinWidth,
                    height:this.displayer.fixWinHeight},this.displayer,container,this.displayer.fixWinHeight,callback);
                this.displayer.SetDisplayObjectScaleFullSmallSize(loginContainer,container);
                this.displayer.SetDisplayObjectCenter(loginContainer,container);
                return loginContainer;
            },
            //MainView
            GetMainContainer : function(container){
                var mainContainer = new MainContainer({width:container.getCurrentWidth(), height:container.getCurrentHeight(),x:0,y:0},this.displayer,this);
                this.displayer.SetDisplayObjectCenter(mainContainer,container);
                return mainContainer;
            }
        });
        return DisplayObjectsDefine;
    });