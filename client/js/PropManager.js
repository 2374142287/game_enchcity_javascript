/**
 * Created with JetBrains WebStorm.
 * User: john
 * Date: 13-2-23
 * Time: 上午10:19
 * To change this template use File | Settings | File Templates.
 */
define(['Prop'],function(Prop) {
    var PropManager = Class.extend({
        init: function() {
            this.props = new Array();
            this.propIndex = 0;
        },

        add: function(prop){
            this.props[this.propIndex] = prop;
            this.propIndex++;
        },

        clear:function(){
            this.props = [];
            this.propIndex = 0;
        },
        /*
        add: function(id){
            this.props[this.propIndex] = new Prop(id);
            this.propIndex++;
        },
        */
        get: function(id){
            if(id == 7){
                return {"propid":7,"name":"味觉的秘密","typecode":"F","comment":"食品等级由1星升级至2星","count":2,"photo":"propIcon.png","photox":1144,"photoy":0,"photow":142,"photoh":142};
            }
            for(var i=0;i<this.props.length;i++)
            {
                if(this.props[i].propid == id) return this.props[i];
            }

            return -1;
        },

        getByType:function(typecode){
            for(var i=0;i<this.props.length;i++){
                if(this.props[i].typecode == typecode) return this.props[i];
            }
            return -1;
        },

        remove:function(id){
            for(var i=0;i<this.propIndex && i<this.props.length;i++){
                if(this.props[i].propid == id) this.props[i] = this.props[i+1];
            }
            this.propIndex--;
        },

        Count: function(){
            return this.propIndex;
        }

    });
    return PropManager;
});