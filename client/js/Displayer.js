
define(['jquery'], function($) {
    var Displayer = Class.extend({
        init: function() {
            //浏览器可视区域
            this.winWidth = 0;
            this.winHeight = 0;
            //设计尺寸（理想尺寸）
            this.fixWinWidth = 0;
            this.fixWinHeight = 0;
            //舞台尺寸
            this.containerWidth = 0;
            this.containerHeight = 0;

            this.scaleValue = 1;
            //this.scaleValue = this.winHeight / this.fixWinHeight;
        },
        /*设置DisplayObject的位置*/
        //设置DisplayObject的位置到中心
        SetDisplayObjectCenter : function(DisplayObject,container){
            DisplayObject.x = (parseInt(container.getCurrentWidth()) - parseInt(DisplayObject.getCurrentWidth()))/2;
            DisplayObject.y = (parseInt(container.getCurrentHeight()) - parseInt(DisplayObject.getCurrentHeight()))/2;
        },

        //设置DisplayObject大小缩放至container的最小尺寸
        SetDisplayObjectScaleFullSmallSize : function(DisplayObject,container){
            var self = this;
            var scaleValuey = self.scaleValue * container.getCurrentHeight()/self.fixWinHeight;
            var scaleValuex = self.scaleValue * container.getCurrentWidth()/self.fixWinWidth;
            var scaleValue = scaleValuex>scaleValuey?scaleValuex:scaleValuey;
            DisplayObject.scaleX = DisplayObject.scaleY = scaleValue;
        },

        //设置DisplayObject大小缩放至container的高度
        SetDisplayObjectScaleFullHeightSize : function(DisplayObject,container){
            var self = this;
            var scaleValuey = self.scaleValue * container.getCurrentHeight()/self.fixWinHeight;
            var scaleValuex = self.scaleValue * container.getCurrentWidth()/self.fixWinWidth;
            var scaleValue = scaleValuex<scaleValuey?scaleValuex:scaleValuey;
            DisplayObject.scaleX = DisplayObject.scaleY = scaleValue;
        },
        //缩放当前DisplayObject （根据container的缩放尺寸）
        SetDisplayObjectSize : function(DisplayObject, container){
            var self = this;
            var scaleValuey = self.scaleValue * container.getCurrentHeight()/self.fixWinHeight;
            var scaleValuex = self.scaleValue * container.getCurrentWidth()/self.fixWinWidth;
            var scaleValue = scaleValuex<scaleValuey?scaleValuex:scaleValuey;
            DisplayObject.scaleX = DisplayObject.scaleY = scaleValue;
        },
        //设置DisplayObject的位置垂直距中
        SetDisplayObjectVerCenterPosition : function(DisplayObject,container,containerDesignHeight){
            var scaleValue = this.scaleValue * container.getCurrentHeight()/containerDesignHeight;
            DisplayObject.scaleX = DisplayObject.scaleY = scaleValue;
            DisplayObject.y = DisplayObject.y * scaleValue;
            DisplayObject.x = (parseInt(container.getCurrentWidth()) - parseInt(DisplayObject.getCurrentWidth()))/2;
        },

        SetDisplayObjectPosition : function(DisplayObject, container){
            var self = this;
            var scaleValuey = self.scaleValue * container.getCurrentHeight()/self.fixWinHeight;
            var scaleValuex = self.scaleValue * container.getCurrentWidth()/self.fixWinWidth;
            var scaleValue = scaleValuex<scaleValuey?scaleValuex:scaleValuey;
            DisplayObject.scaleX = DisplayObject.scaleY = scaleValue;
            DisplayObject.x = DisplayObject.x * scaleValue;
            DisplayObject.y = DisplayObject.y * scaleValue;
        },
        //设置DisplayObject的位置到底部距中
        SetDisplayObjectBottomCenter : function(DisplayObject,container){
            DisplayObject.x = (parseInt(container.getCurrentWidth()) - parseInt(DisplayObject.getCurrentWidth()))/2;
            DisplayObject.y = parseInt(container.getCurrentHeight()) - parseInt(DisplayObject.getCurrentHeight());
        },

        SetDisplayObjectTopCenter : function(DisplayObject,container){
            trace("container.getCurrentWidth():"+container.getCurrentWidth()+"DisplayObject.getCurrentWidth():"+DisplayObject.getCurrentWidth());
            DisplayObject.x = (parseInt(container.getCurrentWidth()) - parseInt(DisplayObject.getCurrentWidth()))/2;
            DisplayObject.y = 0;
        },

        SetDisplayObjectRightTop : function(DisplayObject,container){
            DisplayObject.x = parseInt(container.getCurrentWidth()) - parseInt(DisplayObject.getCurrentWidth());
            DisplayObject.y = 0;
        },

        SetDisplayObjectLeftTop : function(DisplayObject){
            DisplayObject.x = 0;
            DisplayObject.y = 0;
        },

        SetDisplayObjectRightBottom : function(DisplayObject,container){
            DisplayObject.x = parseInt(container.getCurrentWidth()) - parseInt(DisplayObject.getCurrentWidth());
            DisplayObject.y = parseInt(container.getCurrentHeight()) - parseInt(DisplayObject.getCurrentHeight());
        },

        SetDisplayObjectLeftBottom : function(DisplayObject,container){
            DisplayObject.x = 0;
            DisplayObject.y = parseInt(container.getCurrentHeight()) - parseInt(DisplayObject.getCurrentHeight());
        },
        /*设置DIV属性*/
        SetDivHidden : function(obj){
            obj.style.cssText = "display:none;";
        },
        SetDivShow: function(obj){
            obj.style.cssText = "display:block;";
        },
        /*设置DIV的位置*/
        SetDivPosition : function(obj,top,left,width,height,containerCurrentWidth, containerCurrentHeight, containerDesignHeight){
            var scaleValue = this.scaleValue * containerCurrentHeight/containerDesignHeight;
            var marginTop = top * scaleValue;
            var marginLeft = left * scaleValue + (this.winWidth - containerCurrentWidth)/2;
            var width = width * scaleValue;
            var height = height * scaleValue;
            obj.style.cssText += "margin-top:"+marginTop+";margin-left:"+marginLeft+";width:"+width+";height:"+height;
            //trace("margin-top:"+marginTop+";margin-left:"+marginLeft+";width:"+width+";height:"+height);
        },
        /*设置DIV的位置*/
        //设置DIV到屏幕中心
        SetDivCenter : function (obj) {
            var containerWidth = this.GetCurrentStyle(obj,"width");
            var containerHeight = this.GetCurrentStyle(obj,"height");
            var marginLeft = (parseInt(this.winWidth) - parseInt(containerWidth))/2;
            var marginTop = (parseInt(this.winHeight) - parseInt(containerHeight))/2;
            obj.style.cssText = "top:"+marginTop+";left:"+marginLeft+";";
        },
        //设置DIV到全屏
        SetDivFullScreen : function(obj) {
            var containerWidth = this.GetCurrentStyle(obj,"width");
            var containerHeight = this.GetCurrentStyle(obj,"height");
            //var marginLeft = (parseInt(winWidth) - parseInt(containerWidth))/2;
            //var marginTop = (parseInt(winHeight) - parseInt(containerHeight))/2;
            obj.style.cssText = "width:"+this.winWidth+"px;height:"+this.winHeight+"px;"+"top:0px;left:0px;";
        },

        // 返回最终样式函数，兼容IE和DOM，设置参数：元素对象、样式特性
        GetCurrentStyle : function(obj,attribute){
            return obj.currentStyle?obj.currentStyle[attribute]:document.defaultView.getComputedStyle(obj,false)[attribute];
        },
        //获取屏幕尺寸
        FindDimensions : function()
        {
            //获取窗口宽度
            if (window.innerWidth) this.winWidth= window.innerWidth;
            else if((document.body) && (document.body.clientWidth)) this.winWidth= document.body.clientWidth;
            //获取窗口高度
            if (window.innerHeight) this.winHeight= window.innerHeight;
            else if((document.body) && (document.body.clientHeight)) this.winHeight= document.body.clientHeight;
            //通过深入Document内部对body进行检测，获取窗口大小
            if (document.documentElement  &&document.documentElement.clientHeight &&document.documentElement.clientWidth)
            {
                this.winHeight= document.documentElement.clientHeight;
                this.winWidth= document.documentElement.clientWidth;
            }
        },

        //设置LoadBar
        SetLoadBar : function (obj) {
            var objWidth = this.GetCurrentStyle(obj,"width");
            var objHeight = this.GetCurrentStyle(obj,"height");
            var marginLeft = (parseInt(winWidth) - parseInt(objWidth))/2 ;
            var marginTop = (parseInt(winHeight) - parseInt(objHeight))*3/4;
            obj.style.cssText = "top:"+marginTop+";left:"+marginLeft+";";
        },

        SetLoadBg : function (obj) {
            var objWidth = this.GetCurrentStyle(obj,"width");
            var objHeight = this.GetCurrentStyle(obj,"height");
            var marginLeft = (parseInt(winWidth) - parseInt(objWidth))/2;
            var marginTop = (parseInt(winHeight) - parseInt(objHeight))*3/4;
            obj.style.cssText = "top:"+marginTop+";left:"+marginLeft+";";
        }
    });
    return Displayer;
});

