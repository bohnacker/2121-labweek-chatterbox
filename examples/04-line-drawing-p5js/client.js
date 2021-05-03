// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! //
// You need to create the file 'base-url.js' in this folder       //
// with the content (replace some.server.url with your server):   //
// const baseURL="https://some.server.url"                        //   
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! //


// path from baseURL and channel name
let path = baseURL + "linedrawing";
// remember the time of the latest message received
let lastMessageTime = 0;

// a random color for me:
let hue = Math.floor(Math.random() * 360);
let myColor = `hsl(${hue}, ${80}%, ${60}%)`;

function setup() {
  createCanvas(innerWidth, innerHeight);
}

// read new messages every second
setInterval(() => {
  loadAllMessages();
}, 1000);

// Send a new message on keypress
$(window).keydown((event) => {
  console.log(event.key);
  let length = Math.round(Math.random() * 10 + 3) * 10;

  let moveX = 0;
  if (event.key == "ArrowLeft") moveX = -length;
  if (event.key == "ArrowRight") moveX = length;
  let moveY = 0;
  if (event.key == "ArrowUp") moveY = -length;
  if (event.key == "ArrowDown") moveY = length;

  let color = `hsl(${hue}, ${80}%, ${60}%)`;
  $.post(path + "?" + $.param({ moveX, moveY, color }));
});

// button to clear the messages in the channel
$('#clear-button').click(() => {
  $.get(path + "/clear");
});

// loads all messages from the database (will probably get slow if there are many)
function loadAllMessages() {
  $.get(path, function (messages) {

    // clear list when the data is loaded from the server
    $('main div').remove();
    let xPos = window.innerWidth / 2;
    let yPos = window.innerHeight / 2;

    messages.forEach(function (message) {
      let 

      $('<div class="line"></div>')
        .css({color:message.color})
        .html(message.key)
        .appendTo('main');
    });
  });
}


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
