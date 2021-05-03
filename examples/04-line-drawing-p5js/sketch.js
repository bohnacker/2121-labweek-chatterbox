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
  background(0);
  colorMode(HSL);

  // read new messages every second
  setInterval(() => {
    loadAllMessages();
  }, 1000);
}

// button to clear the messages in the channel
$('#clear-button').click(() => {
  $.get(path + "/clear");
});

function keyPressed() {
  let length = Math.round(Math.random() * 10 + 3) * 10;

  let moveX = 0;
  if (keyCode == LEFT_ARROW) moveX = -length;
  if (keyCode == RIGHT_ARROW) moveX = length;
  let moveY = 0;
  if (keyCode == UP_ARROW) moveY = -length;
  if (keyCode == DOWN_ARROW) moveY = length;

  let hue = Math.floor(Math.random() * 360);
  $.post(path + "?" + $.param({ moveX, moveY, hue }));
}

// loads all messages from the database (will probably get slow if there are many)
function loadAllMessages() {
  $.get(path, function (messages) {

    // start with a bleck screen
    background(0);

    // start in the middle of the screen
    let xPos = window.innerWidth / 2;
    let yPos = window.innerHeight / 2;

    messages.forEach(function (message) {
      // console.log(message)
      stroke(message.hue, 80, 60, 0.7);
      strokeWeight(8);

      let mx = parseFloat(message.moveX);
      let my = parseFloat(message.moveY);

      line(xPos, yPos, xPos + mx, yPos + my);
      xPos += mx;
      yPos += my;
      // console.log(xPos, yPos)
    });
  });
}

