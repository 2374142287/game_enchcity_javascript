/**
 * Created with JetBrains WebStorm.
 * User: john
 * Date: 13-2-13
 * Time: 下午6:47
 * To change this template use File | Settings | File Templates.
 */
define(['Friend'],function(League) {
    var LeagueManager = Class.extend({
        init: function() {
            this.leagues = new Array();
            this.leagueIndex = 0;
        },
        add: function(League){
            this.leagues[this.leagueIndex] = League;
            this.leagueIndex++;
        },

        get: function(id){
            for(var i=0;i<this.leagues.length;i++)
            {
                if(this.leagues[i].frienduserid == id) return this.leagues[i];
            }
            return -1;
        },

        remove:function(id){
            for(var i=0;i<this.leagueIndex && i<this.leagues.length;i++){
                if(this.leagues[i].frienduserid == id) this.leagues[i] = this.leagues[i+1];
            }
            this.leagueIndex--;
        },

        clear:function(){
            this.leagues = [];
            this.leagueIndex = 0;
        },

        Count: function(){
            return this.leagueIndex;
        }

    });
    return LeagueManager;
});