/**
 * Created with JetBrains WebStorm.
 * User: john
 * Date: 13-2-11
 * Time: 下午3:36
 * To change this template use File | Settings | File Templates.
 */

define(['fitment'], function(Fitment) {
    var fitments = Class.extend({
        init:function(tilewidth,tileheight,mapwidth){
            this.fitmentList = new Array();
            this.fitmentListIndex = 0;
            this.tilewidth = tilewidth;
            this.tileheight = tileheight;
            this.mapwidth = mapwidth;
        },

        addFitment:function(px,py,sizex,sizey,imag,opacity,rect,isblock){
            var img = new Image();
            img.src = imag;
            this.fitmentList[this.fitmentListIndex] =  new Fitment(this.fitmentListIndex+100,px,py,sizex,sizey,img,this.tilewidth,this.tileheight,this.mapwidth,opacity,rect,isblock);
            this.fitmentListIndex++;
            return this.fitmentListIndex -1;
        },

        SetPosition:function(fitmentIndex,px,py){
            var item = this.fitmentList[fitmentIndex];
            item.setPosition(px,py);
            trace("fitments setPosition"+Views.MainView..GameView);
            for(var i=px;i<px+item.sizex;i++){
                for(var j=py;j<py+item.sizey;j++){
                    Views.MainView.GameView.MapWorker.layerController.setBlock(i,j);
                }
            }
        },

        addSofa:function(){
            var rect = [1,1282,216,425];
            return this.addFitment(2,1,1,2,"images/1/fitmentsLeft.png",1,rect,true);
        },

        addDanceGround:function(){
            var rect = [1,1708,288,425];
            return this.addFitment(4,4,2,2,"images/1/fitmentsLeft.png",1,rect,true);
        },


        addSofar:function(){
            var rect = [1,2987,360,425];
            return this.addFitment(3,1,3,2,"images/1/fitmentsRight.png",1,rect,true);
        }
    });
   return fitments;
});