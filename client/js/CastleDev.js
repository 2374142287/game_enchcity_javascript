/**
 * Created with JetBrains WebStorm.
 * User: john
 * Date: 13-3-23
 * Time: 下午2:00
 * To change this template use File | Settings | File Templates.
 */
define(function() {
    var CastleDev = Class.extend({
        init: function() {
            this.castleId=userid;
            this.floorId = -1;	
            this.devId = -1;
            this.devGuestPrice = -1;
			this.devCharm = -1;
			this.devX = -1; 
			this.devY = -1;
			this.devInitBuildPrice=-1;
			this.oldX = -1;
			this.oldY = -1;
        }
    });
    return CastleDev;
});