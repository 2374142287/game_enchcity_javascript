/**
 * Created with JetBrains WebStorm.
 * User: john
 * Date: 13-3-23
 * Time: 下午1:49
 * To change this template use File | Settings | File Templates.
 */
/**
 * Created with JetBrains WebStorm.
 * User: john
 * Date: 13-3-19
 * Time: 下午11:05
 * To change this template use File | Settings | File Templates.
 */
define(function() {

    var MailManager = Class.extend({
        init: function(){
            this.mails = new Array();
        },
        add:function(mail){
            this.mails.push(mail);
        },
        count:function(){
            return this.mails.length;
        },
        indexOfByMsgId:function(messageid){
            for(var i=0;i<this.mails.length;i++)
            {
                if(this.mails[i].messageid == messageid)
                    return i;
            }
            return -1;
        },
        get: function(messageid){
            var id = this.indexOfByGuestId(messageid);
            if(id !=-1) return this.mails[id];
            return -1;
        },

        clear:function(){
            this.mails = [];
        },

        remove:function(id){
            if(isNaN(id)){return false;}
            if(id !=-1) this.mails.splice(id,1);
        },

        contains : function(mail){
            if(this.indexOfByGuestId(mail.messageid) == -1) return false;
            return true;
        },
        Count:function(){
            return this.mails.length;
        }

    });
    return MailManager;
});