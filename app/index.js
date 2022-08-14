import document from "document";

console.log("App code started");

let count = 0

let button = document.getElementById("button");
let status = document.getElementById("status")
button.onactivate = function(evt) {
  button.text = "Clicked " + ++count;
  status.text = "--"
  sendMessage({cmd: 'CLEAR_CURSOR'})
}

import * as messaging from "messaging";

messaging.peerSocket.addEventListener("open", (evt) => {
  console.log("Ready to send or receive messages");
});
messaging.peerSocket.addEventListener("error", (err) => {
  console.error(`Connection error: ${err.code} - ${err.message}`);
});

function sendMessage(data) {
  if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
    messaging.peerSocket.send(data);
  }
}

messaging.peerSocket.addEventListener("message", (evt) => {
  status.text = evt.data
});


