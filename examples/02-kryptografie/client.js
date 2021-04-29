// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! //
// You need to create the file 'base-url.js' in this folder       //
// with the content (replace some.server.url with your server):   //
// const baseURL="https://some.server.url"                       //   
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! //

// call loadMessages() on starting of the app to see what's in the database
setInterval(() => {
  loadMessages();
}, 1000);  alert();



// button to clear one channel
$('#clear-button').click(() => {
  let channel = $('input#channel').val();
  let submitURL = baseURL + channel + "/clear";
  $.get(submitURL);
});

// attach an event handler for pressing the submit button
$('form').submit(function (event) {
  event.preventDefault();


  /**  ----------------------------------------------------------  */

  
  // get the value of the displayd string
  var str = $('input#message').val().toLowerCase().split('');
  alert(str);
  // reference Array with all letters of the alphabet
  var abc = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
  // empty array
  var res = [];

  function encrypt() {
      // loops through the single leters of the string
      for(var i=0; i<=str.length; i++){
          // checking for the position of the letter in abc 
          var num = abc.indexOf(str[i]) + 1;
          // push number to result Array
          res.push(num);
      }

      // changes the value of the shown paragraph
      document.getElementById("demo").innerHTML = res;
  }

  // -----------------------------------------------------------


  // get values from the input fields
  let channel = $('input#channel').val();
  let message = $('input#message').val();

  // prepare values for sending it to the server. '.param' creates a serialized string representation from an object.
  let submitURL = baseURL + channel + '?' + $.param({ message: message });
  console.log(submitURL, message);

  // send the data to the server. 
  $.post(submitURL, function () {
    // this function will be called on success

    // clear form fields
    $('input#message').val('');
    $('input').focus();

    // update list of entries
    loadMessages();
  });
});


// loads all entries from the database and creates list items in the html document
function loadMessages() {
  let channel = $('input#channel').val();
  $.get(baseURL + channel, function (messages) {
    //console.log(messages);

    // clear list when the data is loaded from the server
    $('ul#messages li').remove();

    // create a list item for each entry in the json object
    messages.forEach(function (message) {
      $('<li></li>').text(JSON.stringify(message)).appendTo('ul#messages');
    });
  });
}
