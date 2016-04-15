var esprima = require('esprima');
var test = require('../models/test');

module.exports = {

  test: function(index, string, callback) {
    var parsed = esprima.parse(string);

    test.run(parsed, index, function(result, pass) {
      callback(result, pass);
    });
  }
}
