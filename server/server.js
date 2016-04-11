var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

var config = require('./config/config');

var app = express();

app.use(express.static(__dirname + '/../client'));
app.use(bodyParser.json());

app.get('/', function(req, res) {
    res.render('index');
});

app.post('/', function(req, res) {
  console.log(req.body);
});

app.listen(config.port);
