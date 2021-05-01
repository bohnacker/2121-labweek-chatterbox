// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! //
// You need to create the file 'base-url.js' in this folder       //
// with the content (replace some.server.url with your server):   //
// const baseURL="https://some.server.url"                        //   
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! //


// path from baseURL and channel name
let path = baseURL + "pixeldrawing";

// a random color for me:
let hue = Math.floor(Math.random() * 360);
let myColor = `hsl(${hue}, ${80}%, ${60}%)`;


// create the grid
let gridSize = 8;
$('.grid').children().remove();
$('.grid').css("grid-template-columns", "repeat(" + gridSize + ", 50px)");
for (let i = 0; i < gridSize * gridSize; i++) {
  $('.grid').append('<div class="cell"></div>');
}

// load all messages to init the grid
loadMessages();

// // read new messages every second
// setInterval(() => {
//   loadMessages();
// }, 1000);

// click on a grid cell asks for the color of this pixel
$('.cell').click(function (event) {
  let cell = $(this);
  let cellIndex = cell.index();

  // request from the server if there is already a color set for this cell
  let submitURL = path + "?" + $.param({ index: cellIndex })
  $.get(submitURL, function (messages) {
    if (messages.length > 0) {
      // there is already a message for this cell -> colorize cell
      cell.css('background-color', messages[0].color);

    } else {
      // there is no message for this cell -> send this color ...
      $.post(path + "?" + $.param({ index: cellIndex, color: myColor }));
      // ... and colorize the cell
      cell.css('background-color', myColor);
    }

  });
});

// button to clear the messages in the channel
$('#clear-button').click(() => {
  $.get(path + "/clear");
});

// loads all entries from the database 
function loadMessages() {
  $.get(path, function (messages) {
    // if (messages.length > 0) console.log(messages);

    messages.forEach(function (message) {
      let cell = $('.grid').children()[message.index];
      cell = $(cell);
      cell.css('background-color', message.color);
    });
  });
}
