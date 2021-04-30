// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! //
// You need to create the file 'base-url.js' in this folder       //
// with the content (replace some.server.url with your server):   //
// const baseURL="https://some.server.url"                        //   
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! //


// path from baseURL and channel name
let path = baseURL + "typetogether";
// remember the time of the latest message received
let lastMessageTime = 0;

// a random color for me:
let hue = Math.floor(Math.random() * 360);
let myColor = `hsl(${hue}, ${80}%, ${60}%)`;

// read new messages every second
setInterval(() => {
  loadUnreadMessages();
}, 1000);

// Send a new message on keypress
$(window).keypress((event) => {
  // console.log(event.key);
  $.post(path + "?" + $.param({ key: event.key, color: myColor }));
});

// button to clear the messages in the channel
$('#clear-button').click(() => {
  $.get(path + "/clear");
});

// loads all entries since the last timestamp from the database 
function loadUnreadMessages() {
  let submitURL = path + "?" + $.param({ since: lastMessageTime });

  $.get(submitURL, function (messages) {
    if (messages.length > 0) console.log(messages);

    messages.forEach(function (message) {
      lastMessageTime = Math.max(lastMessageTime, message.timestamp);
      // console.log(lastMessageTime);

      if (message.key === " ") message.key = "&nbsp;";

      $('<div class="letter"></div>')
        .css('color', message.color)
        .html(message.key)
        .appendTo('main');
    });
  });
}
