// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! //
// You need to create the file 'base-url.js' in this folder       //
// with the content (replace some.server.url with your server):   //
// const baseURL="https://some.server.url"                        //   
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! //


// call loadMessages() on starting of the app to see what's in the database
setInterval(() => {
  loadMessages();
}, 1000);


// button to clear one channel
$('#clear-button').click(() => {
  let channel = $('input#channel').val();
  let submitURL = baseURL + channel + "/clear";
  $.get(submitURL);
});


// attach an event handler for pressing the submit button
$('form').submit(function (event) {
  event.preventDefault();

  // get values from the input fields
  let channel = $('input#channel').val();
  let user = $('input#user').val();
  let message = $('input#message').val();

  // prepare values for sending it to the server. '.param' creates a serialized string representation from an object.
  let submitURL = baseURL + channel + '?' + $.param({ user: user, message: message });
  console.log(submitURL);

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
    // console.log(messages);

    // clear list when the data is loaded from the server
    $('ul#messages li').remove();

    // create a list item for each entry in the json object
    messages.forEach(function (message) {
      $('<li></li>').text(JSON.stringify(message)).appendTo('ul#messages');
    });
  });
}
