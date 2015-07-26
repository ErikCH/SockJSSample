var http = require('http');
var sockjs = require('sockjs');

var echo = sockjs.createServer({ sockjs_url: 'http://cdn.jsdelivr.net/sockjs/1.0.1/sockjs.min.js' });
echo.on('connection', function(conn) {
    conn.on('message', function(message) {
        conn.write(message);
    });
    conn.write("hello from the server thanks for connectiong!");
    conn.on('close', function() {});
    console.log("connected");
});

var server = http.createServer();
echo.installHandlers(server, {prefix:'/echo'});
server.listen(7000, '0.0.0.0');
