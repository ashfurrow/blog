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

Note from Ash: I've modified this from its original version.

*/

function responsiveChat(element) {
  $(element).html('<form class="chat"><span></span><div class="messages"></div><input type="text" placeholder="Your message"><input type="submit" value="Send"></form>');

  var chatScriptIndex = 0;

  function showLatestMessage() {
      $(element).find('.messages').scrollTop($(element).find('.messages').height());
  }
  showLatestMessage();

  $(element + ' input[type="text"]').keypress(function (event) {
      if (event.which == 13) {
          event.preventDefault();
          $(element + ' input[type="submit"]').click();
      }
  });
  $(element + ' input[type="submit"]').click(function (event) {
      event.preventDefault();
      var message = $(element + ' input[type="text"]').val();
      if ($(element + ' input[type="text"]').val()) {
          $(element + ' div.messages').append(
              '<div class="message"><div class="myMessage"><p>' +
              message +
              "</p></div></div>"
          );
          setTimeout(function () {
              $(element).find('span').addClass("spinner");
          }, 100);
          setTimeout(function () {
              $(element).find('span').removeClass("spinner");
          }, 2000);
      }
      $(element + ' input[type="text"]').val("");
      showLatestMessage();
  });
}

function responsiveChatPush(element, sender, origin, message) {
  var originClass;
  if (origin == 'me') {
      originClass = 'myMessage';
  } else {
      originClass = 'fromThem';
  }
  $(element + ' .messages').append('<div class="message"><div class="' + originClass + '"><p>' + message + '</p></div></div>');
}

/* Activating chatbox on element */
responsiveChat('.responsive-html5-chat');


responsiveChatPush('.chat', 'Kate', 'me', 'It looks beautiful!');
responsiveChatPush('.chat', 'John Doe', 'you', 'It looks like the iPhone message box.');
responsiveChatPush('.chat', 'Kate', 'me', 'Yep, is this design responsive?');
responsiveChatPush('.chat', 'Kate', 'me', 'By the way when I hover on my message it shows date.');
responsiveChatPush('.chat', 'John Doe', 'you','Yes, this is completely responsive.');

var chatScript = [
  
]
