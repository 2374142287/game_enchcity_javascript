/**
 * Created with JetBrains WebStorm.
 * User: john
 * Date: 13-2-23
 * Time: 上午10:19
 * To change this template use File | Settings | File Templates.
 */
define(function() {
    var MessageManager = Class.extend({
        init: function() {
            this.messages = new Array();
        },

        add: function(msg){
            this.messages.push(msg);
        },

        clear:function(){
            this.messages = [];
        },

        getMsgByid: function(msgid){
            for(var i=0;i<this.messages.length;i++)
            {
                if(this.messages[i].messageid == msgid) return this.messages[i];
            }
            return -1;
        },

        remove:function(id){
            this.messages.splice(id,1);
        }

    });
    return MessageManager;
});