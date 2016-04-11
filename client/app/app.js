var editor = ace.edit("editor");
    editor.setTheme("ace/theme/chrome");
    editor.session.setMode("ace/mode/javascript");


var app = {};

app.sendCode = function(code) {
  $.ajax({
    url: "http://localhost:8000/",
    type: "POST",
    data: JSON.stringify(code),
    contentType : "application/json",
    success: function(data) {
      console.log(data)
      console.log("posted")
    },
    error: function(data) {
      console.log("post failed")
    }
  });
};

$(document).ready(function() {

  $('.button').on('click', function() {
    var post = {};
    post.code = editor.getValue();
    app.sendCode(post);
  });

});
