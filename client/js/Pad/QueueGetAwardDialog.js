/**
 * Created with JetBrains WebStorm.
 * User: john
 * Date: 13-2-24
 * Time: 上午10:38
 * To change this template use File | Settings | File Templates.
 * 任务领取奖励窗口
 */

define([winSize+'/CloseBtn'],function(CloseBtn){
    var QueueGetAwardDialog = function(props)
    {
        QueueGetAwardDialog.superClass.constructor.call(this, props);
        this.init();
    };

    Q.inherit(QueueGetAwardDialog, Q.DisplayObjectContainer);

    QueueGetAwardDialog.prototype.init = function(){

        this.width = 392;
        this.height = 231 + 40;

        this.addChildAt(this.GetBg(),0);
        this.addChildAt(new CloseBtn({x:this.width-96,y:0},function(){
            Views.MainView.HideQueueGetAwardDialog();
            Views.MainView.ShowQueueContainer();
        }),1);
    };

    QueueGetAwardDialog.prototype.GetBg = function(){
        return new Q.Bitmap({image:LoadedImages.queueui.image,x:0,y:40,width:this.width,height:this.height-40,rect:[748,0,this.width,this.height-40]});
    };
    return QueueGetAwardDialog;
});