# 2121-labweek-chatterbox

Examples and stuff for the Labweek at HfG Schwäbisch Gmünd

---

## Using the examples

The examples will only work with a server like this:
https://github.com/bohnacker/simple-server

To make the examples working you need to create the file `base-url.js` in the folder of the example you want to run. This javascript file just consists of this line:

``` javascript
const baseURL="https://some.server.url/";   
```

Replace `some.server.url` with your server!

## Server communication

In the examples we're using jQuery to post and get messages. 

You can post messages to the serve in the form `https://some.server.url/my-channel?message=hello`. With jQuery this could be done this way:

```javascript
let channel = "my-channel";
let message = "hello";
let submitURL = baseURL + channel + '?' + $.param({ message: message });

// send the data to the server. 
$.post(submitURL, function () {
  // this function will be called on success
});
``` 

These messages get stored by channel in a simple json database and can be retreived this way:

```javascript
let channel = "my-channel";

// get messages from the server
$.get(baseURL + channel, function (messages) {
  // messages is an array of all the messages in that channel
  console.log(messages);
});
```

To delete messages you can either delete all messages from one channel...

```javascript
$.get(baseURL + "my-channel/clear");
```

... or delete messages that fit specific key/value pairs. The following will delete all messages with the id "abcde" in the channel "my-channel":

```javascript
let channel = "my-channel";
let submitURL = baseURL + channel + '/delete?' + $.param({ id: "abcde" });
$.get(submitURL);
```
