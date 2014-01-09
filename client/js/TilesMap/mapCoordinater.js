/**
 * Created with JetBrains WebStorm.
 * User: john
 * Date: 13-2-7
 * Time: 下午11:52
 * To change this template use File | Settings | File Templates.
 */
define(function() {

    var mapCoordinater = Class.extend({


        //地板坐标转到容器坐标
        //(1,1)转到(200,200)
        getGx: function(x,y,w, WinWidth,type,size) {
            if(type==null||type=="ground")
                return parseInt((y-x)*w/2 + WinWidth*w/2 - w/2);
            if(type=="room"||type=="facility"){
                if(size==null||size=="2*2"||size=="2*1")
                    return parseInt((y-x)*w/2 + WinWidth*w/2 - w/2);
                if(size=="3*2"||size=="1*1")
                    return parseInt((y-x)*w/2 + WinWidth*w/2 - w/2 -1);
                if(size=="3*3")
                    return parseInt((y-x)*w/2 + WinWidth*w/2 - w/2 +17);
                if(size=="4*3")
                    return parseInt((y-x)*w/2 + WinWidth*w/2 - w/2-40);
            }
            if(type=="stair")
                return parseInt((y-x)*w/2 + WinWidth*w/2 - w/2);
            if(type=="character")
                return parseInt((y-x)*w/2 + WinWidth*w/2 - w/2 + 15);
                
        },
        //地板坐标转到容器坐标
        getGy: function(x,y,H,type,size) {
            if(type==null||type=="ground")
                return parseInt((y+x)*H/2);
            if(type=="room"||type=="facility"){
                if(size==null||size=="2*2"||size=="2*1")
                    return parseInt((y+x)*H/2+100);
                if(size=="3*2")
                    return parseInt((y+x)*H/2+79);
                if (size=="1*1")
                    return parseInt((y+x)*H/2+119);
                if(size=="3*3")
                    return parseInt((y+x)*H/2+89);
                if(size=="4*3")
                    return parseInt((y+x)*H/2+69);

            }
            if(type=="stair")
                return parseInt((y+x) * H/2);
            if(type=="character")
                return parseInt((y+x) * H/2 + 170);
                
        },

		getGx1: function(x,y,w, WinWidth) {
            return parseInt((y+x)*w/2 + WinWidth*w/2 - w/2-216);
        },
		getGy1: function(x,y,H) {
            return parseInt((y+x)*H/2+200);
        },

        getBx: function(ex,ey){
            if(Views.MainView.gamesContainer&&Views.MainView.gamesContainer.children[0].MapWorker){

                var groundHeight=40*Views.MainView.gamesContainer.scaleY;   //由于gamesContainer产生了缩放，所以地板砖的height和width要进行修正
                var groundWidth=80*Views.MainView.gamesContainer.scaleX;
                var k=groundWidth/groundHeight;         //四条边的斜率也要进行修正

                for(var i=0;i<Views.MainView.gamesContainer.children[0].MapWorker.bgContainer.children.length;i++){
                    var x=$("#"+Views.MainView.gamesContainer.children[0].MapWorker.bgContainer.children[i].drawable.domDrawable.id).offset().left+40*Views.MainView.gamesContainer.scaleX;
                    var y=$("#"+Views.MainView.gamesContainer.children[0].MapWorker.bgContainer.children[i].drawable.domDrawable.id).offset().top+217*Views.MainView.gamesContainer.scaleY;
                    var dx=ex-x;
                    var dy=ey-y;

                    if((dx+2*dy-groundWidth/2)<0&&(dx+2*dy+groundWidth/2)>0&&(dx-2*dy+groundWidth/2)>0&&(dx-2*dy-groundWidth/2)<0){     //以地砖中点作为坐标系原点，计算点击点与四条直线的位置关系
                        //alert(x+" "+y+" "+" "+e.eventX+" "+e.eventY+" "+(12-Math.floor(i/13))+","+(13-i%13));
                        //alert((12-Math.floor(i/13))+","+(13-i%13));
                        return (12-Math.floor(i/13));
                        break;
                    }
                }
            }
            return -1;

        },

        getBy: function(ex,ey){
            if(Views.MainView.gamesContainer&&Views.MainView.gamesContainer.children[0].MapWorker){

                var groundHeight=40*Views.MainView.gamesContainer.scaleY;   //由于gamesContainer产生了缩放，所以地板砖的height和width要进行修正
                var groundWidth=80*Views.MainView.gamesContainer.scaleX;
                var k=groundWidth/groundHeight;         //四条边的斜率也要进行修正

                for(var i=0;i<Views.MainView.gamesContainer.children[0].MapWorker.bgContainer.children.length;i++){
                    var x=$("#"+Views.MainView.gamesContainer.children[0].MapWorker.bgContainer.children[i].drawable.domDrawable.id).offset().left+40*Views.MainView.gamesContainer.scaleX;
                    var y=$("#"+Views.MainView.gamesContainer.children[0].MapWorker.bgContainer.children[i].drawable.domDrawable.id).offset().top+217*Views.MainView.gamesContainer.scaleY;
                    var dx=ex-x;
                    var dy=ey-y;

                    if((dx+2*dy-groundWidth/2)<0&&(dx+2*dy+groundWidth/2)>0&&(dx-2*dy+groundWidth/2)>0&&(dx-2*dy-groundWidth/2)<0){     //以地砖中点作为坐标系原点，计算点击点与四条直线的位置关系
                        //alert(x+" "+y+" "+" "+e.eventX+" "+e.eventY+" "+(12-Math.floor(i/13))+","+(13-i%13));
                        //alert((12-Math.floor(i/13))+","+(13-i%13));
                        return (13-i%13);
                        break;
                    }
                }
            }
            return -1;
        }

    });
    return mapCoordinater;
});
