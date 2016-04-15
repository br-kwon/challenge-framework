var editor = ace.edit("editor");
    editor.setTheme("ace/theme/chrome");
    editor.session.setMode("ace/mode/javascript");


var app = {};

app.currentQuestion = 1;

app.sendCode = function(code) {
  $.ajax({
    url: "http://localhost:8000/" + app.currentQuestion,
    type: "POST",
    data: JSON.stringify(code),
    contentType : "application/json",
    success: function(data) {

      alert(data.feedBack);
      if (data.pass) {
        editor.setValue('');
        app.fetchQuestion(++app.currentQuestion);
      }
      console.log("posted")
    },
    error: function(data) {
      console.log("post failed")
    }
  });
};

app.fetchQuestion = function(id) {
  $.get('http://localhost:8000/' + id, function(data) {
    $('.question').text('Question ' + id + ': ' + data);
  });
};

$(document).ready(function() {

  app.fetchQuestion(app.currentQuestion);

  $('.button').on('click', function() {
    var post = {};
    post.code = editor.getValue();
    console.log(post);
    app.sendCode(post);
  });

});
