/**
 * Created with JetBrains WebStorm.
 * User: john
 * Date: 13-2-13
 * Time: 下午2:00
 * To change this template use File | Settings | File Templates.
 */
define(['jquery'],function($){
    var functionBarContainer = function(props)
    {
        functionBarContainer.superClass.constructor.call(this, props);
        this.init();
    };

    Q.inherit(functionBarContainer, Q.DisplayObjectContainer);

    functionBarContainer.prototype.init = function(){
        this.Containers = new Array();
        this.showIndex = 0;
        this.ShowNumber = 8;
        this.Maigin = 22;
        this.childSize = 106;
    };

    functionBarContainer.prototype.ClearContainers = function(){
        this.Containers = [];
        this.removeAllChildren();
        this.showIndex = 0;
    };

    functionBarContainer.prototype.showBars = function(id){
        if(id>=Views.MainView.ToolBarContainer.FunctionBarContainer.Containers.length){
            Views.MainView.ToolBarContainer.FunctionBarContainer.showIndex -= Views.MainView.ToolBarContainer.FunctionBarContainer.ShowNumber;
        }else{
            if(Views.MainView.ToolBarContainer.FunctionBarContainer.getNumChildren()>0) Views.MainView.ToolBarContainer.FunctionBarContainer.removeAllChildren();
            for(var i=0;(i+id)<Views.MainView.ToolBarContainer.FunctionBarContainer.Containers.length && i< Views.MainView.ToolBarContainer.FunctionBarContainer.ShowNumber;i++)
            {
                Views.MainView.ToolBarContainer.FunctionBarContainer.Containers[i+id].x = (Views.MainView.ToolBarContainer.FunctionBarContainer.childSize + Views.MainView.ToolBarContainer.FunctionBarContainer.Maigin) * i;
                Views.MainView.ToolBarContainer.FunctionBarContainer.Containers[i+id].y = 0;
                Views.MainView.ToolBarContainer.FunctionBarContainer.Containers[i+id].width = Views.MainView.ToolBarContainer.FunctionBarContainer.childSize;
                Views.MainView.ToolBarContainer.FunctionBarContainer.Containers[i+id].height = Views.MainView.ToolBarContainer.FunctionBarContainer.childSize;
                Views.MainView.ToolBarContainer.FunctionBarContainer.addChildAt(Views.MainView.ToolBarContainer.FunctionBarContainer.Containers[i+id],0);
            }
        }
    };

    functionBarContainer.prototype.hasChild = function(item){
        for(var i=0;i<Views.MainView.ToolBarContainer.FunctionBarContainer.Containers.length;i++)
        {
            if(Views.MainView.ToolBarContainer.FunctionBarContainer.Containers[i] == item) return true;
        }
        return false;
    };

    functionBarContainer.prototype.Next = function(){
        //这里获取不到Containers的长度，顾先加，后减
        Views.MainView.ToolBarContainer.FunctionBarContainer.showIndex += Views.MainView.ToolBarContainer.FunctionBarContainer.ShowNumber;
        Views.MainView.ToolBarContainer.FunctionBarContainer.showBars(Views.MainView.ToolBarContainer.FunctionBarContainer.showIndex);
    };

    functionBarContainer.prototype.Last = function(){
        Views.MainView.ToolBarContainer.FunctionBarContainer.showIndex -= Views.MainView.ToolBarContainer.FunctionBarContainer.ShowNumber;
        if(Views.MainView.ToolBarContainer.FunctionBarContainer.showIndex <0) Views.MainView.ToolBarContainer.FunctionBarContainer.showIndex = 0;
        Views.MainView.ToolBarContainer.FunctionBarContainer.showBars(Views.MainView.ToolBarContainer.FunctionBarContainer.showIndex);
    };

    return functionBarContainer;
});