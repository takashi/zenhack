var app = require('./app');
var http = require('http').Server(app);
var io = require('socket.io')(http);
var redis = require("redis");

var client = redis.createClient();

module.exports = function() {
  http.listen(app.get('port'), function() {
    console.log('listening port for socket.io')
  })

  client.on("error", function (err) {
    console.log("Redis Error " + err);
  })

  client.on('connect', function() {
    console.log('redis connected');
  });


  io.on('connection', function() {
    console.log('socket.io connected');
    client.on('message', function(channel, message) {
      console.log(message);
      io.emit('count', message);
    })
  })

  client.subscribe('count');
}