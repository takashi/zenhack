var app = require('./app');
var http = require('http').Server(app);
var io = require('socket.io')(http);
var redis = require("redis");

var redisClient = redis.createClient(6379, '128.199.136.176');

module.exports = function() {
  http.listen(app.get('port'), function() {
    console.log('listening port for socket.io')
  })

  redisClient.on("error", function (err) {
    console.log("Redis Error " + err);
  })

  redisClient.on('connect', function() {
    console.log('redis connected');
  });

  var cb = function(channel, message) {
    io.emit('count', message);
  }

  redisClient.on('disconnect', function(){
    redisClient.removeListener('message', cb);
  })


  io.on('connection', function() {
    redisClient.removeListener('message', cb);
    redisClient.on('message', cb);
  })

  redisClient.subscribe('count');
}
