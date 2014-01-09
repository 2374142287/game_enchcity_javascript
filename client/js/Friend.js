/**
 * Created with JetBrains WebStorm.
 * User: john
 * Date: 13-2-13
 * Time: 下午5:29
 * To change this template use File | Settings | File Templates.
 */
define(function() {
    var Friend = Class.extend({
        init: function(id) {
            this.id = id;
            /*
            this.userName = username;
            this.characterId = characterId;
            this.sex = sex;
            this.horoscope = horoscope;
            this.birthdate = birthdate;
            this.mobile = mobile;
            this.qianMing = qianming;
            this.userClass = userclass;
            this.mohuanZhi = mohuanzhi;
*/
            this.userid =12;				//#用户ID（外键）
            this.frienduserid = 12;		//#好友用户ID
            this.RoleName = 0;			// 角色类型名称
            this.photo = "friendIcon.png";				// 好友头像
            this.photox = 0;				// 图片X坐标
            this.photoy = 107;			// 图片Y坐标
            this.photow = 106;				// 图片宽度
            this.photoh = 106;				// 图片高度
            this.comment = "a";			// 好友备注
            //added by bwj 3.2
            this.nickname = '';
            this.sex = 0;
            this.horoscope = '双子';
            this.birthdate = '1980-1-12';
            this.mobile = '135****0123';
            this.level= 12;
            this.magic = 24;
        }
    });
    return Friend;
});