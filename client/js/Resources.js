/**
 * Created with JetBrains WebStorm.
 * User: john
 * Date: 13-2-27
 * Time: 下午3:59
 * To change this template use File | Settings | File Templates.
 */
define(function(){
    var Resources = Class.extend({
        init: function() {},

        getImage : function(imgName){

            for(var i=0;i<LoadedResources.length;i++)
            {
                if("images/"+winSize+"/"+imgName == LoadedResources[i].src)
                {
                    return LoadedResources[i].image;
                }
            }
        },

        getGuideImage : function(imageid){
            for(var i=0;i<LeaderImageArr.length;i++)
            {
                if("images/"+winSize+"/leader/"+imageid+".png" == LeaderImageArr[i].src)
                {
                    return LeaderImageArr[i].image;
                }
            }
        }
    });
    return Resources;
});