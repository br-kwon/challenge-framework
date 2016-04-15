var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

var config = require('./config/config');
var testStudentCode = require('./controllers/testStudentCode');
var questionBank = require('../data/questions/questions');

var app = express();

app.use(express.static(__dirname + '/../client'));
app.use(bodyParser.json());

app.get('/:id', function(req, res) {

  var index = parseInt(req.params.id) - 1;
  if (index >= questionBank.length) {
    res.status(200).send('No more questions!');
  } else {
    res.json(questionBank[index].question);
  }

});

app.post('/:id', function(req, res) {

  var index = parseInt(req.params.id) - 1;
  var code = req.body.code;

  testStudentCode.test(index, code, function(result, pass) {
    var payLoad = {
      feedBack: result,
      pass: pass
    }
    res.status(200).send(payLoad);
  });

});

app.listen(config.port);
