/**
 * Created with JetBrains WebStorm.
 * User: john
 * Date: 13-2-8
 * Time: 下午10:52
 * To change this template use File | Settings | File Templates.
 */
define(['Character'], function(Character) {

    var Characters = Class.extend({
        init: function(tilewidth,tileheight,mapwidth){
            this.guests = new Array();
            this.tilewidth = tilewidth;
            this.tileheight = tileheight;
            this.mapwidth = mapwidth;
            this.frame = 0;
        },
        addLanxiaoh:function(guest,x,y){
            if(!this.contains(guest)){
                var length = this.guests.push(new Character({x:x,y:y},guest,LoadedImages.character01.image,this.tilewidth,this.tileheight,this.mapwidth));
                this.guests[length-1].GoNextAction();
                return length-1;
            }
            return -1;
        },

        addXiaochou:function(guest,x,y){
            if(!this.contains(guest)){
                var length = this.guests.push(new Character({x:x,y:y},guest,LoadedImages.manxiaochou.image,this.tilewidth,this.tileheight,this.mapwidth));
                this.guests[length-1].GoNextAction();
                return length-1;
            }
            return -1;
        },

        addLifashi:function(guest,x,y){
            if(!this.contains(guest)){
                var length = this.guests.push(new Character({x:x,y:y},guest,LoadedImages.manlifashi.image,this.tilewidth,this.tileheight,this.mapwidth));
                this.guests[length-1].GoNextAction();
                return length-1;
            }
            return -1;
        },

        addYouchai:function(guest,x,y){
            if(!this.contains(guest)){
                var length = this.guests.push(new Character({x:x,y:y},guest,LoadedImages.manyouchai.image,this.tilewidth,this.tileheight,this.mapwidth));
                this.guests[length-1].GoNextAction();
                return length-1;
            }
            return -1;
        },

        outDoor:function(guestid){
            this.get(guestid).OutDoor();
        },

        contains : function(guest){
            if(this.indexOfByGuestId(guest.guestid) == -1) return false;
            return true;
        },

        indexOfByGuestId:function(guestid){
            for(var i=0;i<this.guests.length;i++)
            {
                if(this.guests[i].guest.guestid == guestid)
                    return i;
            }
            return -1;
        },

        get: function(guestid){
            var id = this.indexOfByGuestId(guestid);
            if(id !=-1) return this.guests[id];
            return -1;
        },

        remove:function(guestid){
            if(isNaN(guestid)){return false;}
            var id = this.indexOfByGuestId(guestid);
            if(id !=-1) this.guests.splice(id,1);
        },

        /*/Walk:function(characterId){
            //if(characterId > this.guests.length) this.this.guests[characterId].Walk();
        //},

        goShopping:function(characterId){
            this.shoppingX = 5;
            this.shoppingY = 1;
            var arr = new Array();
            var guest = this.get(characterId);
            if(guest != -1){
                this.bStar.move(guest.x,guest.y,this.shoppingX,this.shoppingY);
                if(this.bStar.end) arr = this.bStar.resultLines;
            }
        },*/

        update:function(){
            this.frame ++;
            //if(this.frame == 0){
				
                for(var i=0;i<this.guests.length;i++) this.NextStep(i);
            //}
        },

        updateZindex:function(character){
            Views.MainView.GameView.MapWorker.layerController.removerElement(character);
            Views.MainView.GameView.MapWorker.layerController.addElement(character);
        },

        NextStep:function(npcId){
            this.guests[npcId].GoNextStep();
        }
    });
    return Characters;
});