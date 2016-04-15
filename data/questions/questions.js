var esprima = require('esprima');

var structureList = function(tree) {

  var result = [];

  var structures = {
    'ForStatement': true,
    'WhileStatement': true,
    'IfStatement': true,
  }

  var makeList = function(node) {

    if (node.type in structures) {
      result.push([node.type]);
      if (node.body) {
        for (var i = 0; i < node.body.body.length; i++) {
          if (node.body.body[i].type in structures) {
            console.log('it is an ifstatement')
            result[result.length - 1].push(node.body.body[i].type);
            makeList(node.body.body[i]);
          }
        }
      }
    } else {
      for (var k = 0; k < node.body.length; k++) {
        makeList(node.body[k]);
      }
    }

  }

  makeList(tree);
  return result;

}

var question1 = 'for (var i = 0; i < 5; i++) { console.log("Hello World");}';
var question1Struct = structureList(esprima.parse(question1));
var question2 = 'while (i < 5) { if (i % 2 === 0) { console.log(i); } }';
var question2Struct = structureList(esprima.parse(question2));


module.exports = [
  {
    question: 'Print "Hello World" 5 times using a for-loop',
    whiteList: {'ForStatement': true},
    blackList: {'WhileStatement': true},
    structure: question1Struct

  },

  {
    question: 'Use a while loop to print all even numbers between 0 and 4',
    whiteList: {'WhileStatement': true},
    blackList: {'ForStatement': true},
    structure: question2Struct
  }

]
