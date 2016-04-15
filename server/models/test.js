var questionBank = require('../../data/questions/questions');

var analyzeCode = function(tree, index, test, callback) {

  var searchTree = function(node) {

    if (node.type in questionBank[index][test]) {
      questionBank[index][test][node.type] = false;
    } 

    if (!node.body) {
      return;
    }
    console.log(node.type);

    for (var i = 0; i < node.body.length; i++) {
      searchTree(node.body[i]);
    }

  }

  if (test === 'whiteList') {

    var result = '';

    searchTree(tree);
    for (var problem in questionBank[index][test]) {
      if (questionBank[index][test][problem]) {
        result += 'Program MUST contain ' + problem + '\n';
      } 
    }
    callback(result);

  } else if (test === 'blackList') {

    var result = '';

    searchTree(tree);
    for (var problem in questionBank[index][test]) {
      if (!questionBank[index][test][problem]) {
        result += 'Program MUST NOT contain ' + problem + '\n';
        questionBank[index][test][problem] = true;
      }
    }
    callback(result);
  }

}

var compareStructure = function(tree, index, callback) {

  var result = '';
  var compare = function(userNode, answer, checkIndex) {

    if (userNode === undefined || !userNode) {
      return;
    }

    console.log('userNode', userNode.type, 'answer', answer);

    if (userNode.type === answer[checkIndex][0]) {
      if (userNode.body) {
        for (var i = 0; i < userNode.body.body.length; i++) {
          if (userNode.body.body[i].type === answer[checkIndex][1]) {
            compare(userNode.body.body[i], answer, ++checkIndex);
          } else {
            if (answer[checkIndex][1]) {
              result += 'There should be a ' + answer[checkIndex][0] + ' and inside of it there should be a ' + answer[checkIndex][1];
            }
            return;
          }
        }
      }
    } else {
      if (userNode.body) {
        for (var j = 0; j < userNode.body.length; j++) {
          compare(userNode.body[j], answer, checkIndex);
        }
      }
    }

  }

  compare(tree, questionBank[index]['structure'], 0);
  callback(result);
}

module.exports = {

  whiteList: function(parsed, index, callback) {
    analyzeCode(parsed, index, 'whiteList', function(result) {
      callback(result)
    });
  },

  blackList: function(parsed, index, callback) {
    analyzeCode(parsed, index, 'blackList', function(result) {
      callback(result);
    });
  },

  structure: function(parsed, index, callback) {
    compareStructure(parsed, index, function(result) {
      callback(result);
    });
  },

  run : function(parsed, index, callback) {

    var result = '';
    var self = this;
    var pass = false;

    self.whiteList(parsed, index, function(whiteListResult) {

      self.blackList(parsed, index, function(blackListResult) {

          self.structure(parsed, index, function(structureResult) {

            result += whiteListResult + '\n' + blackListResult + '\n' + structureResult;

            if (result.trim() === '') {
              result += 'Congrats, you pass!'
              pass = true;
            }
            callback(result, pass);

          });

      });

    });
  }

}
