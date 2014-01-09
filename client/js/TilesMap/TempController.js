/**
 * Created with JetBrains WebStorm.
 * User: john
 * Date: 13-3-17
 * Time: 下午7:54
 * To change this template use File | Settings | File Templates.
 */
define(function() {
    var TempControler = Class.extend({
        init: function(){
            this.items = new Array();
        },
        getTempZindex : function(item){
            return item.x+item.y;
        },
        indexOf:function(item){
            for(var i=0;i<this.items.length;i++)
            {
                if(this.items[i].id == item.id)
                return i;
            }
            return -1;
        },
        removerElement:function(item){
            try{
                if(item != -1 && this.indexOf(item) >= 0)
                {
                    this.items.splice(this.indexOf(item),1);
                    //trace("removeElement:"+item);
                }
                else{
                    //trace("UnContains Element:"+item);
                }
            }catch(e){
                trace(e);
            }
        },
        addElement:function(item){
            if(this.indexOf(item)<0){
                var itemz = this.getTempZindex(item);
                var isInserted = false;
                for(var i=0;i<this.items.length;i++)
                {
                    if(this.getTempZindex(this.items[i]) > itemz){
                        this.items.splice(i,0,item);
                        isInserted = true;
                        break;
                    }
                    if(this.getTempZindex(this.items[i])==itemz){
                        if(i+1<this.items.length){
                            if(this.getTempZindex(this.items[i+1])>itemz){
                                isInserted = true;
                                this.items.splice(i+1,0,item);
                                break;
                            }
                        }
                    }
                }
                if(!isInserted) this.items.push(item);
                //this.looklinkedList();
            }
        },
        looklinkedList:function(){
            for(var i=0;i<this.items.length;i++){
                var zindex = this.items[i].x +this.items[i].y;
                trace("id:"+i+"zindex="+zindex+",id="+this.items[i].id+",x="+this.items[i].x +",y="+this.items[i].y);
            }
        },
        isBlock:function(px,py){
            var hasTiles = false;
            for(var i=0;i<this.items.length;i++){
                if(this.items[i].x == px && this.items[i].y == py)
                {
                    hasTiles = true;
                    if(this.items[i].isblock) return true;
                }
            }
            if(!hasTiles) return true;
            return false;
        },
        setBlock:function(px,py){
            for(var i=0;i<this.items.length;i++){
                if(this.items[i].x == px && this.items[i].y == py)
                {
                    this.items[i].isblock = true;
                }
            }
        }
    });
    return TempControler;
});