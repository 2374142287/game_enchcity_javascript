/**
 * Created with JetBrains WebStorm.
 * User: john
 * Date: 13-2-13
 * Time: 下午6:47
 * To change this template use File | Settings | File Templates.
 */
define(['Friend'],function(Friend) {
    var FriendManager = Class.extend({
        init: function() {
            this.friends = new Array();
            this.friendIndex = 0;
        },
        /*
        add: function(id){
            this.friends[this.friendIndex] = new Friend(id);
            this.friendIndex++;
        },*/
        add: function(friend){
            this.friends[this.friendIndex] = friend;
            this.friendIndex++;
        },

        get: function(id){
            for(var i=0;i<this.friends.length;i++)
            {
                if(this.friends[i].frienduserid == id) return this.friends[i];
            }
            return -1;
        },

        remove:function(id){
            for(var i=0;i<this.friendIndex && i<this.friends.length;i++){
                if(this.friends[i].frienduserid == id) this.friends[i] = this.friends[i+1];
            }
            this.friendIndex--;
        },

        clear:function(){
            this.friends = [];
            this.friendIndex = 0;
        },

        Count: function(){
            return this.friendIndex;
        }

    });
    return FriendManager;
});