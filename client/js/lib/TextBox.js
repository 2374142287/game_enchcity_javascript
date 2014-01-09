/**
 * Created with JetBrains WebStorm.
 * User: john
 * Date: 13-3-12
 * Time: 下午5:06
 * To change this template use File | Settings | File Templates.
 */

(function(){

    var TextBox = Quark.TextBox = function(props){
        this.id = Quark.UIDUtil.createUID("Input");
        //去除x,y值
        var thisProps = {x:0,y:0,width:200,height:500};
        var childProps = {x:0,y:0,width:200,height:50};
        var textBoxStyle = "";
        for(var p in props)
        {
            var val = props[p];
            if(p === 'x' || p ==='y'){
                thisProps[p] = val;
            }
            if(p === "width" || p == "height")
            {
                thisProps[p] = val;
                childProps[p] = val;
            }
            if(p == 'style')
            {
                for(var s in val)
                {
                    if(s=='transparent')
                    {
                        textBoxStyle += "background-color:transparent;border-bottom:0px;border-right-width:0px;border-left-width:0px;border-top-width:0px;";
                    }else if(s=='font'){
                        textBoxStyle += "font-size:"+val[s]+";";
                    }else{
                        textBoxStyle += s+":"+val[s]+";";
                    }
                }
            }
        }

        TextBox.superClass.constructor.call(this, thisProps);

        var textBox = new Q.createDOM('input',{type:'text'});
        textBox.style.cssText = textBoxStyle;
        var obj = new Q.DisplayObject(childProps);
        var drawable = new Quark.Drawable(textBox,true);
        obj.drawable =drawable;
        obj.eventEnabled = true;
        this.addChild(obj);
        textBox.addEventListener(events[2],function(){
            textBox.focus();
        });
    };
    Quark.inherit(TextBox, Quark.DisplayObjectContainer);



})();