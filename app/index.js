import document from "document";

console.log("App code started");

let status = document.getElementById("status")

let buttons = [
  {
    id: 'clearButton',
    cmd: 'CLEAR_CURSOR'
  },
  {
    id: 'minusButton',
    cmd: 'ZOOM_OUT'
  },
  {
    id: 'plusButton',
    cmd: 'ZOOM_IN'
  }
]
buttons.forEach((buttonData) => {
  document.getElementById(buttonData.id)
  .onactivate = function(evt) {
    sendMessage({cmd: buttonData.cmd})
  }  
})

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


