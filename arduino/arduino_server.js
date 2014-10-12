var arduino = require('duino');
var post = require('request').post;
var board = new arduino.Board();
var button = new arduino.Button({
  board: board,
  pin: 2
});

/**
 * DOWN
 */
button.on('down', function(){
  console.log('DOWN');
});

/**
 * UP
 */
button.on('up', function(){
  post({url: 'http://localhost:8080/count_up'},  function (error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log(response.statusCode) // Print the google web page.
    }else{
      console.log('error')
    }
  })
});
