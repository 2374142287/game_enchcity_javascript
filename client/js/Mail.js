/**
 * Created with JetBrains WebStorm.
 * User: john
 * Date: 13-3-23
 * Time: 下午2:00
 * To change this template use File | Settings | File Templates.
 */
define(function() {
    var Mail = Class.extend({
        init: function() {
            this.userid=userid;
            this.receiveuserid = -1;			//#发件人用户ID
            this.title	= "";				// 消息标题
            this.content	= "";				// 消息内容
            //this.propida	= -1;				// 道具A
            //this.propidb= -1;					// 道具B
            //this.propidc= -1;					// 道具C
            //this.propidd= -1;					// 道具D
            //this.propide= -1;					// 道具E
        }
    });
    return Mail;
});