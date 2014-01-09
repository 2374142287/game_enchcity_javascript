/**
 * Created with JetBrains WebStorm.
 * User: john
 * Date: 13-3-24
 * Time: 下午3:13
 * To change this template use File | Settings | File Templates.
 */

define(['Leader/LeaderShowMessage',
        'Leader/GuideViewer',
        winSize+"/MessageListContainer"],
    function(LeaderShowMessage,
             GuideViewer,
             MessageListContainer){
        var LeaderMainContainer = function(props,displayer,container)
        {
            LeaderMainContainer.superClass.constructor.call(this, props);
            this.init(displayer,container);
        };
        Q.inherit(LeaderMainContainer, Q.DisplayObjectContainer);
        LeaderMainContainer.prototype.init = function(displayer,container){
            this.displayer = displayer;
            this.container = container;
            //this.addChildAt(new LeaderMaskBg(),0);
            this.childContainer = new Q.DisplayObjectContainer({x:0,y:0,width:this.width,height:this.height});
            this.addChild(this.childContainer);
            this.step = -1;
        };
        LeaderMainContainer.prototype.showMessage = function(msg){
            var self = Views.MainView.leader;
            var showMessage = new LeaderShowMessage(msg,self.goNext);
            self.displayer.SetDisplayObjectSize(showMessage,self.childContainer);
            self.displayer.SetDisplayObjectCenter(showMessage,self);
            self.childContainer.addChild(showMessage);
        };
        LeaderMainContainer.prototype.hideContainer = function(){
            this.childContainer.removeAllChildren();
        };
        LeaderMainContainer.prototype.loadImage = function(){
            var self = this;
            self.loader = new Q.ImageLoader();
            Views.Stage.addChildAt(Views.LoadResView,999);
            self.loader.addEventListener("loaded", function(e){
                var s = e.target.getLoadedSize()*100 /e.target.getTotalSize();
                s = s + " ";
                ///trace(s);
                s = s.substring(0, 4);
                trace("Guide:"+s);
                Views.showMsg("新手引导资源加载中:" +s+"%");
            });
            self.loader.addEventListener("complete", function(e){
                Views.showMsg("新手引导资源加载完成");
                LeaderImages = e.images;
                LeaderImageArr = e.target._source;
                Views.Stage.removeChild(Views.LoadResView);
                self.start();
            });
            for(var i=1;i<40;i++){
                self.loader._addSource({id:"rec"+i, src:"images/"+winSize+"/leader/"+i+".png", size:2});
            }
            self.loader.load([
                {id:"leaderbtn", src:"images/"+winSize+"/leader/leaderBtn.png", size:25},
                {id:"msgboxbg", src:"images/"+winSize+"/leader/msgboxBg.png", size:96}
            ]);
        };
        LeaderMainContainer.prototype.start = function(){
            var self = this;
            self.goNext();
        };
        //1
        LeaderMainContainer.prototype.showInfoBar = function(){
            var self = Views.MainView.leader;
            self.hideContainer();
            var text = "让我给您介绍酒馆的日常经营数据,等级、魔幻值是你经营实力的体现,金币、星贝是你行动规划的基石,体力是你处理日常事务的保证。";
            var view = new GuideViewer(self.step,240,400,text,415,213,0,0,0,0,self.goNext);
            self.displayer.SetDisplayObjectSize(view,self.childContainer);
            self.displayer.SetDisplayObjectTopCenter(view,self);
            self.childContainer.addChild(view);
        };
        //2
        LeaderMainContainer.prototype.showToolBar = function(){
            var self = Views.MainView.leader;
            self.hideContainer();
            var text = "位于操作界面的有：好友、打理，商城、书信及充值菜单。";
            var view = new GuideViewer(self.step,238,4,text,415,138,0,0,0,0,self.goNext);
            self.displayer.SetDisplayObjectSize(view,self.childContainer);
            self.displayer.SetDisplayObjectBottomCenter(view,self);
            self.childContainer.addChild(view);
        };
        //3
        LeaderMainContainer.prototype.showTask0 = function(){
            var self = Views.MainView.leader;
            self.hideContainer();
            var text = "点击下方红色方框内图标打开书信菜单。";
            var view = new GuideViewer(self.step,243,356,text,412,178,637,435,98,98,function(){
                self.goNext();
                Views.MainView.ToolBarContainer.ShowMail();
            });
            self.displayer.SetDisplayObjectSize(view,self.childContainer);
            self.displayer.SetDisplayObjectBottomCenter(view,self);
            self.childContainer.addChild(view);
        };
        //4
        LeaderMainContainer.prototype.showTask1 = function(){
            var self = Views.MainView.leader;
            self.hideContainer();
            var text = "";
            var view = new GuideViewer(self.step,243,356,text,412,178,637,435,0,0,self.goNext);
            self.displayer.SetDisplayObjectSize(view,self.childContainer);
            self.displayer.SetDisplayObjectCenter(view,self);
            self.childContainer.addChild(view);
        };
        //5
        LeaderMainContainer.prototype.showTask2 = function(){
            var self = Views.MainView.leader;
            self.hideContainer();
            var text = "";
            var view = new GuideViewer(self.step,15,15,text,15,15,740,15,190,80,function(){
                self.goNext();
                var msgCont = Views.MainView.MessageContainer;
                msgCont.newsBtn.changeState('up');
                msgCont.receiveMailBtn.changeState('up');
                msgCont.sendMailBtn.changeState('up');
                msgCont.queueBtn.changeState('down');
                msgCont.clearContainer();
                msgCont.messageListContainer = new MessageListContainer();
                msgCont.addChildAt(msgCont.messageListContainer,1);
                msgCont.messageListContainer.setShowType('queue');
                msgCont.messageListContainer.showInfos();
            });
            self.displayer.SetDisplayObjectSize(view,self.childContainer);
            self.displayer.SetDisplayObjectCenter(view,self);
            self.childContainer.addChild(view);
        };
        //6
        LeaderMainContainer.prototype.showTask3 = function(){
            var self = Views.MainView.leader;
            self.hideContainer();
            var text = "";
            var view = new GuideViewer(self.step,15,15,text,15,15,110,132,750,85,function(){
                Views.MainView.MessageContainer.showTaskViewContainer(Views.MainView.ToolBarContainer.queueManager.queues[0]);
                self.goNext();
            });
            self.displayer.SetDisplayObjectSize(view,self.childContainer);
            self.displayer.SetDisplayObjectCenter(view,self);
            self.childContainer.addChild(view);
        };
        //7
        LeaderMainContainer.prototype.showTask4 = function(){
            var self = Views.MainView.leader;
            self.hideContainer();
            var text = "";
            var view = new GuideViewer(self.step,15,15,text,15,15,365,443,222,61,function(){
                //领取奖励
                Sockets.send_reqTaskBonus(Views.MainView.ToolBarContainer.queueManager.queues[0].taskid);
                self.goNext();
            });
            self.displayer.SetDisplayObjectSize(view,self.childContainer);
            self.displayer.SetDisplayObjectCenter(view,self);
            self.childContainer.addChild(view);
        };
        //8
        LeaderMainContainer.prototype.showTask5 = function(){
            var self = Views.MainView.leader;
            self.hideContainer();
            var text = "";
            var view = new GuideViewer(self.step,15,15,text,15,15,369,348,222,61,function(){
                //确认显示消息
                Views.MainView.HideMessage();
                self.goNext();
            });
            self.displayer.SetDisplayObjectSize(view,self.childContainer);
            self.displayer.SetDisplayObjectCenter(view,self);
            self.childContainer.addChild(view);
        };
        //9
        LeaderMainContainer.prototype.friend0 = function(){
            var self = Views.MainView.leader;
            self.hideContainer();
            var text = "";
            var view = new GuideViewer(self.step,243,356,text,15,15,98,98,222,435,function(){
                //打开好友
                Views.MainView.ToolBarContainer.ShowFriends();
                self.goNext();
            });
            self.displayer.SetDisplayObjectSize(view,self.childContainer);
            self.displayer.SetDisplayObjectBottomCenter(view,self);
            self.childContainer.addChild(view);
        };
        //10
        LeaderMainContainer.prototype.friend1 = function(){
            var self = Views.MainView.leader;
            self.hideContainer();
            var text = "";
            var view = new GuideViewer(self.step,480,10,text,565,10,98,98,222,435,function(){
                self.goNext();
            });
            self.displayer.SetDisplayObjectSize(view,self.childContainer);
            self.displayer.SetDisplayObjectCenter(view,self);
            self.childContainer.addChild(view);
        };
        //11
        LeaderMainContainer.prototype.friend2 = function(){
            var self = Views.MainView.leader;
            self.hideContainer();
            var text = "";
            var view = new GuideViewer(self.step,480,10,text,565,10,150,61,86,86,function(){
                Sockets.send_ReqVisitFriend(10);
                self.goNext();
            });
            self.displayer.SetDisplayObjectSize(view,self.childContainer);
            self.displayer.SetDisplayObjectCenter(view,self);
            self.childContainer.addChild(view);
        };
        //12
        LeaderMainContainer.prototype.friend3 = function(){
            var self = Views.MainView.leader;
            self.hideContainer();
            var text = "";
            var view = new GuideViewer(self.step,254,186,text,565,10,150,61,86,86,function(){
                self.goNext();
            });
            self.displayer.SetDisplayObjectSize(view,self.childContainer);
            self.displayer.SetDisplayObjectBottomCenter(view,self);
            self.childContainer.addChild(view);
        };
        //13
        LeaderMainContainer.prototype.friend4 = function(){
            var self = Views.MainView.leader;
            self.hideContainer();
            var text = "";
            var view = new GuideViewer(self.step,254,186,text,565,10,11,434,128,100,function(){
                Sockets.send_ReqVisitBack();
                self.goNext();
            });
            self.displayer.SetDisplayObjectSize(view,self.childContainer);
            self.displayer.SetDisplayObjectBottomCenter(view,self);
            self.childContainer.addChild(view);
        };
        //15
        LeaderMainContainer.prototype.friend5 = function(){
            var self = Views.MainView.leader;
            self.hideContainer();
            var text = "";
            var view = new GuideViewer(self.step,254,186,text,565,10,152,440,110,48,function(){
                Views.MainView.showFriendEmployDialog(1);
                self.goNext();
            });
            self.displayer.SetDisplayObjectSize(view,self.childContainer);
            self.displayer.SetDisplayObjectCenter(view,self);
            self.childContainer.addChild(view);
        };
        //16
        LeaderMainContainer.prototype.friend6 = function(){
            var self = Views.MainView.leader;
            self.hideContainer();
            var text = "";
            var view = new GuideViewer(self.step,15,15,text,565,10,687,83,82,82,function(){
                Views.MainView.FriendEmployDialog.clickNortiaojiuShiBtn();
                self.goNext();
            });
            self.displayer.SetDisplayObjectSize(view,self.childContainer);
            self.displayer.SetDisplayObjectCenter(view,self);
            self.childContainer.addChild(view);
        };
        //17
        LeaderMainContainer.prototype.friend7 = function(){
            var self = Views.MainView.leader;
            self.hideContainer();
            var text = "";
            var view = new GuideViewer(self.step,254,186,text,565,10,6,6,99,60,function(){
                Views.MainView.HidefriendEmployDialog();
                Views.MainView.showFriendContainer();
                self.goNext();
            });
            self.displayer.SetDisplayObjectSize(view,self.childContainer);
            self.displayer.SetDisplayObjectCenter(view,self);
            self.childContainer.addChild(view);
        };
        //18
        LeaderMainContainer.prototype.friend8 = function(){
            var self = Views.MainView.leader;
            self.hideContainer();
            var text = "";
            var view = new GuideViewer(self.step,254,186,text,565,10,274,439,110,48,function(){
                Views.MainView.showFriendMagicDialog(1);
                self.goNext();
            });
            self.displayer.SetDisplayObjectSize(view,self.childContainer);
            self.displayer.SetDisplayObjectCenter(view,self);
            self.childContainer.addChild(view);
        };
        //19
        LeaderMainContainer.prototype.friend9 = function(){
            var self = Views.MainView.leader;
            self.hideContainer();
            var text = "";
            var view = new GuideViewer(self.step,15,15,text,565,10,690,85,75,75,function(){
                Views.MainView.FriendMagicDialog.useProp(1);
                self.goNext();
            });
            self.displayer.SetDisplayObjectSize(view,self.childContainer);
            self.displayer.SetDisplayObjectCenter(view,self);
            self.childContainer.addChild(view);
        };
        //20
        LeaderMainContainer.prototype.friend10 = function(){
            var self = Views.MainView.leader;
            self.hideContainer();
            var text = "";
            var view = new GuideViewer(self.step,254,115,text,15,15,250,350,209,56,function(){
                Views.MainView.FriendMagicDialog.clickuseProp();
                self.goNext();
            });
            self.displayer.SetDisplayObjectSize(view,self.childContainer);
            self.displayer.SetDisplayObjectCenter(view,self);
            self.childContainer.addChild(view);
        };
        //21
        LeaderMainContainer.prototype.friend11 = function(){
            var self = Views.MainView.leader;
            self.hideContainer();
            var text = "";
            var view = new GuideViewer(self.step,254,186,text,565,10,5,9,75,75,function(){
                Views.MainView.HidefriendContainer();
                self.goNext();
            });
            self.displayer.SetDisplayObjectSize(view,self.childContainer);
            self.displayer.SetDisplayObjectCenter(view,self);
            self.childContainer.addChild(view);
        };
        //22
        LeaderMainContainer.prototype.shop0 = function(){
            var self = Views.MainView.leader;
            self.hideContainer();
            var text = "";
            var view = new GuideViewer(self.step,243,356,text,15,15,98,98,500,435,function(){
                //打开商城
                Views.MainView.ToolBarContainer.ShowShop();
                self.goNext();
            });
            self.displayer.SetDisplayObjectSize(view,self.childContainer);
            self.displayer.SetDisplayObjectBottomCenter(view,self);
            self.childContainer.addChild(view);
        };
        //23
        LeaderMainContainer.prototype.shop1 = function(){
            var self = Views.MainView.leader;
            self.hideContainer();
            var text = "";
            var view = new GuideViewer(self.step,243,356,text,15,15,882,233,56,132,function(){
                //翻页商城
                Views.MainView.PropShopContainer.clickNextBtn();
                self.goNext();
            });
            self.displayer.SetDisplayObjectSize(view,self.childContainer);
            self.displayer.SetDisplayObjectCenter(view,self);
            self.childContainer.addChild(view);
        };
        //24
        LeaderMainContainer.prototype.shop2 = function(){
            var self = Views.MainView.leader;
            self.hideContainer();
            var text = "";
            var view = new GuideViewer(self.step,150,270,text,15,15,706,129,178,352,function(){
                //选择道具
                Views.MainView.PropShopContainer.ItemInfoList.children[3].clickSelectItem();
                self.goNext();
            });
            self.displayer.SetDisplayObjectSize(view,self.childContainer);
            self.displayer.SetDisplayObjectCenter(view,self);
            self.childContainer.addChild(view);
        };
        //25
        LeaderMainContainer.prototype.shop3 = function(){
            var self = Views.MainView.leader;
            self.hideContainer();
            var text = "";
            var view = new GuideViewer(self.step,254,115,text,15,15,249,348,210,60,function(){
                Sockets.send_ReqPropBuy(8);
                self.goNext();
            });
            self.displayer.SetDisplayObjectSize(view,self.childContainer);
            self.displayer.SetDisplayObjectCenter(view,self);
            self.childContainer.addChild(view);
        };
        //26
        LeaderMainContainer.prototype.shop4 = function(){
            var self = Views.MainView.leader;
            self.hideContainer();
            var text = "";
            var view = new GuideViewer(self.step,254,115,text,15,15,376,348,210,60,function(){
                Views.MainView.HideMessage();
                self.goNext();
            });
            self.displayer.SetDisplayObjectSize(view,self.childContainer);
            self.displayer.SetDisplayObjectCenter(view,self);
            self.childContainer.addChild(view);
        };
        //27
        LeaderMainContainer.prototype.food0 = function(){
            var self = Views.MainView.leader;
            self.hideContainer();
            var text = "";
            var view = new GuideViewer(self.step,243,356,text,15,15,98,98,358,435,function(){
                //打开物品
                Views.MainView.ToolBarContainer.ShowItems();
                self.goNext();
            });
            self.displayer.SetDisplayObjectSize(view,self.childContainer);
            self.displayer.SetDisplayObjectBottomCenter(view,self);
            self.childContainer.addChild(view);
        };
        //28
        LeaderMainContainer.prototype.food1 = function(){
            var self = Views.MainView.leader;
            self.hideContainer();
            var text = "";
            var view = new GuideViewer(self.step,243,356,text,15,15,152,53,245,245,function(){

                Views.MainView.ItemsContainer.FoodsContainer.RectificateContainer.addFood(Views.MainView.ToolBarContainer.foodManager.foods[0]);
                self.goNext();
            });
            self.displayer.SetDisplayObjectSize(view,self.childContainer);
            self.displayer.SetDisplayObjectCenter(view,self);
            self.childContainer.addChild(view);
        };
        //29
        LeaderMainContainer.prototype.food2 = function(){
            var self = Views.MainView.leader;
            self.hideContainer();
            var text = "";
            var view = new GuideViewer(self.step,254,115,text,15,15,280,440,210,59,function(){
                Views.MainView.ItemsContainer.FoodsContainer.RectificateContainer.startbtn.setEnabled(false);
                Sockets.send_ReqFoodYielding();
                self.goNext();
            });
            self.displayer.SetDisplayObjectSize(view,self.childContainer);
            self.displayer.SetDisplayObjectCenter(view,self);
            self.childContainer.addChild(view);
        };
        //30
        LeaderMainContainer.prototype.food3 = function(){
            var self = Views.MainView.leader;
            self.hideContainer();
            var text = "";
            var view = new GuideViewer(self.step,254,115,text,15,15,545,440,210,59,function(){
                Views.MainView.showFoodUpgradeContainer();
                self.goNext();
            });
            self.displayer.SetDisplayObjectSize(view,self.childContainer);
            self.displayer.SetDisplayObjectCenter(view,self);
            self.childContainer.addChild(view);
        };
        //31
        LeaderMainContainer.prototype.food4 = function(){
            var self = Views.MainView.leader;
            self.hideContainer();
            var text = "";
            var view = new GuideViewer(self.step,254,115,text,15,15,102,68,99,99,function(){
                Views.MainView.HideFoodUpgradeContainer();
                Views.MainView.showDialogYesAndNo("是否花费一星秘方:味觉的秘密提升"+Views.MainView.ToolBarContainer.foodManager.foods[0].name+"到二星?",function(){
                });
                self.goNext();
            });
            self.displayer.SetDisplayObjectSize(view,self.childContainer);
            self.displayer.SetDisplayObjectCenter(view,self);
            self.childContainer.addChild(view);
        };
        //32
        LeaderMainContainer.prototype.food5 = function(){
            var self = Views.MainView.leader;
            self.hideContainer();
            var text = "";
            var view = new GuideViewer(self.step,254,115,text,15,15,250,350,209,56,function(){
                Sockets.send_ReqPropUse(7,Views.MainView.ToolBarContainer.foodManager.foods[0].foodid);
                self.goNext();
            });
            self.displayer.SetDisplayObjectSize(view,self.childContainer);
            self.displayer.SetDisplayObjectCenter(view,self);
            self.childContainer.addChild(view);
        };
        //35
        LeaderMainContainer.prototype.prop0 = function(){
            var self = Views.MainView.leader;
            self.hideContainer();
            var text = "";
            var view = new GuideViewer(self.step,254,115,text,15,15,14,283,72,182,function(){
                Views.MainView.ItemsContainer.clickItemBtn();
                self.goNext();
            });
            self.displayer.SetDisplayObjectSize(view,self.childContainer);
            self.displayer.SetDisplayObjectCenter(view,self);
            self.childContainer.addChild(view);
        };
        //36
        LeaderMainContainer.prototype.prop1 = function(){
            var self = Views.MainView.leader;
            self.hideContainer();
            var text = "";
            var view = new GuideViewer(self.step,367,200,text,15,15,150,62,181,351,function(){
                Views.MainView.ItemsContainer.ItemContainer.ItemInfoList.children[0].setSelected();
                self.goNext();
            });
            self.displayer.SetDisplayObjectSize(view,self.childContainer);
            self.displayer.SetDisplayObjectCenter(view,self);
            self.childContainer.addChild(view);
        };
        //37
        LeaderMainContainer.prototype.prop2 = function(){
            var self = Views.MainView.leader;
            self.hideContainer();
            var text = "";
            var view = new GuideViewer(self.step,254,115,text,15,15,280,437,209,56,function(){
                Sockets.send_ReqPropUse(Views.MainView.ToolBarContainer.propManager.props[0].propid,userid);
                self.goNext();
            });
            self.displayer.SetDisplayObjectSize(view,self.childContainer);
            self.displayer.SetDisplayObjectCenter(view,self);
            self.childContainer.addChild(view);
        };

        LeaderMainContainer.prototype.goNext = function(){
            var self = Views.MainView.leader;
            self.step++;
            trace("goNext:"+self.step);
            switch(self.step){
                case 0:
                    self.hideContainer();
                    return self.showMessage("欢迎见证精灵酒馆的世界！");
                case 1:
                    return self.showInfoBar();
                case 2:
                    return self.showToolBar();
                case 3:
                    return self.showTask0();
                case 4:
                    return self.showTask1();
                case 5:
                    return self.showTask2();
                case 6:
                    return self.showTask3();
                case 7:
                    return self.showTask4();
                case 8:
                    return self.showTask5();
                case 9:
                    return self.friend0();
                case 10:
                    return self.friend1();
                case 11:
                    return self.friend2();
                case 12:
                    return self.friend3();
                case 13:
                    return self.friend4();
                case 14:
                    return self.friend0();
                case 15:
                    return self.friend5();
                case 16:
                    return self.friend6();
                case 17:
                    return self.friend7();
                case 18:
                    return self.friend8();
                case 19:
                    return self.friend9();
                case 20:
                    return self.friend10();
                case 21:
                    return self.showTask5();
                case 22:
                    return self.shop0();
                case 23:
                    return self.shop1();
                case 24:
                    return self.shop2();
                case 25:
                    return self.shop3();
                case 26:
                    return self.shop4();
                case 27:
                    return self.food0();
                case 28:
                    return self.food1();
                case 29:
                    return self.food2();
                case 30:
                    return self.food3();
                case 31:
                    return self.food4();
                case 32:
                    return self.food5();
                case 33:
                    return self.shop4();
                case 34:
                    return self.food0();
                case 35:
                    return self.prop0();
                case 36:
                    return self.prop1();
                case 37:
                    return self.prop2();
                case 38:
                    return self.shop4();
                case 39:
                    self.hideContainer();
                    return self.showMessage("客人进店消费后，可能付小费，小费以心型显示在上方。不同颜色的心代表不同的金币及道具掉落概率！");
                case 40:
                    self.hideContainer();
                    return self.showMessage("经过TiTi和你的交流，你将在自己的酒馆开始大展身手了！");
                case 41:
                    return Views.MainView.stopLeader();

            }
        };

        return LeaderMainContainer;
});