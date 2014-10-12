var express = require('express');
var router = express.Router();
var request = require('request');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.get('/project', function(req, res) {
  request('http://localhost:8080/count', function (error, response, body) {
    res.render('project', { title: 'Express', count: body });
  })
});

module.exports = router;
