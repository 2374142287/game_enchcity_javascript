/**
 * Created with JetBrains WebStorm.
 * User: john
 * Date: 13-2-5
 * Time: 上午11:37
 * To change this template use File | Settings | File Templates.
 */

define(function() {
    var URL_Parse = Class.extend({
        init: function() {

        },
        GetParameters : function(urlinfo) {
            //var urlinfo=window.location.href; //获取当前页面的url
            var len=urlinfo.length;//获取url的长度
            var offset=urlinfo.indexOf("?");//设置参数字符串开始的位置
            if(offset == -1){
                return null;
            }
            var parametersinfo=urlinfo.substr(offset+1,len);//取出参数字符串 这里会获得类似“userid=1&key=3ddkfds”这样的字符串
            var parameters=parametersinfo.split("&");//对获得的参数字符串按照“=”进行分割
            var msg = '{';
            for(var i=0;i<parameters.length;i++)
            {
                var parameter = parameters[i].split("=");
                if(parameter.length >=2){
                    msg = msg + '"' + parameter[0] + '":"' + parameter[1] + '",';
                }else if(parameter.length == 1){
                    msg = msg + '"' + parameter[0] + '":"",';
                }
            }
            msg = msg.substr(0, msg.length - 1) + '}';
            return  JSON.parse(msg);
        }
    });
    return URL_Parse;
});