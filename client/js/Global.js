/**
 * Created with JetBrains WebStorm.
 * User: john
 * Date: 13-2-11
 * Time: 下午8:42
 * To change this template use File | Settings | File Templates.
 */
var debug = true;
//var winSize = "Pad"; //屏幕尺寸：Pad/Phone
var timer, fps,Views;
var userid,key;
var Sockets;

var direction;

var events = Q.supportTouch ? ["touchstart","touchmove","touchend"] : ["mousedown","mousemove","mouseup", "mouseout"];
//是否已经绘制好地图
var mapworkerLoaded;
//所有加载的图片
var LoadedImages,LoadedResources,LeaderImages,LeaderImageArr;

var Resources;

var Player,Account,Password;

var currentSelectedFriend;

var curFloor = 0;


