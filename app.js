var http = require('http');
var sockjs = require('sockjs');


var clients = {};

// Broadcast to all clients
function broadcast(message){
  // iterate through each client in clients object
  for (var client in clients){
    // send the message to that client
    clients[client].write(message);
  }
}

var echo = sockjs.createServer({ sockjs_url: 'http://cdn.jsdelivr.net/sockjs/1.0.1/sockjs.min.js' });
echo.on('connection', function(conn) {
    clients[conn.id] = conn;

    conn.on('data', function(message) {
        console.log('received ' + message);
        broadcast(message);
    });
    conn.write("hello from the server thanks for connectiong!");
    conn.on('close', function() {
        delete clients[conn.id];
        });
    console.log("connected");
});

var server = http.createServer();
echo.installHandlers(server, {prefix:'/echo'});
server.listen(7000, '0.0.0.0');
