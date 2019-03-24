/*

Name    : Responsive HTML5 Chat

Responsive HTML5 Chat helps you to create useful chatbox on your website easly. 
You can change skin and sizes. You can read the installation and support documentation 
before you begin. If you do not find the answer, do not hesitate to send a message to me.

Owner   : Vatanay Ozbeyli
Web     : www.vatanay.com
Support : hi@vatanay.com

*/

/*
Note from Ash: I've modified this from its original version. It has been formatted to fit your screen.
*/

function responsiveChat(element) {
  $(element).html(
    '<form class="chat"><span></span><div class="messages"></div><div id="input"></div><input type="submit" value="Send"></form>'
  );

  var chatScriptIndex = 0;

  function showLatestMessage() {
    $(element)
      .find(".messages")
      .scrollTop(
        $(element)
          .find(".messages")
          .height()
      );
  }
  showLatestMessage();

  $(element + ' input[type="submit"]').click(function(event) {
    event.preventDefault();
    var message = $(element + " #input").text();
    if (message) {
      if (chatScriptIndex < chatScript.length) {
        responsiveChatPush(element, "reader", message)
        $(element + " #input").html("<p></p>");

        var step = chatScript[chatScriptIndex];
        chatScriptIndex++;

        setTimeout(function() {
          $(element)
            .find("span")
            .addClass("spinner");
        }, 100);
        setTimeout(function() {
          $(element)
            .find("span")
            .removeClass("spinner");
          responsiveChatPush(element, "ash", step.message)
          $(element + " #input").html("<p>" + step.response + "</p>");
        }, 2000);
      } else {
        $(element + " #input").html("");
      }
    }

    showLatestMessage();
  });
}

function responsiveChatPush(element, originClass, message) {
  var originClass;
  $(element + " .messages").append(
    '<div class="message"><div class="' +
      originClass +
      '"><p>' +
      message +
      "</p></div></div>"
  );
}

/* Activating chatbox on element */
responsiveChat(".responsive-html5-chat");
// Start us off on the right foot.
responsiveChatPush('.chat', 'ash', 'Hey, want to chat about native iOS "versus" JavaScript?');
$(".responsive-html5-chat #input").html("<p>Yeah. Why blah blah blah</p>");

// responsiveChatPush('.chat', 'you', 'It looks like the iPhone message box. It looks like the iPhone message box. It looks like the iPhone message box. It looks like the iPhone message box.');
// responsiveChatPush('.chat', 'me', 'Yep, is this design responsive?');
// responsiveChatPush('.chat', 'me', 'By the way when I hover on my message it shows date.');
// responsiveChatPush('.chat', 'you','Yes, this is completely responsive.');

var chatScript = [
  {
    message: "something",
    response: "something else"
  },
  {
    message: "something2",
    response: "something else2"
  }
];
