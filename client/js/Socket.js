/**
 * Created with JetBrains WebStorm.
 * User: john
 * Date: 13-2-2
 * Time: 下午3:34
 * To change this template use File | Settings | File Templates.
 */
function Socket(url,port){
    var sock = new Object;
    sock.url = url;
    sock.port = port;
    sock.socket = new WebSocket('ws://'+sock.url+':'+sock.port);
    trace('Connect ws://'+sock.url+':'+sock.port);
    sock.connect = function(){
        this.socket.onopen = function(event) {
            // 监听消息
            this.socket.onmessage = function(event) {
                trace('Client received a message',event.data);
            };
            // 监听Socket的关闭
            this.socket.onclose = function(event) {
                trace('Client notified socket has closed',event);
            };
        };
    };
    sock.send = function(msg){
        this.socket.send(msg);
    };
    sock.close = function(){
        // 关闭Socket....
        this.socket.close();
    }
    return sock;
}