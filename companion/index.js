import { me as companion } from "companion";
import { settingsStorage } from "settings";


// Listen for the event
companion.addEventListener("readystatechange", doThis);

// The Device application caused the Companion to start
if (companion.launchReasons.peerAppLaunched) {
  doThis();
}

function doThis() {
  console.log("Device application was launched!");
}


console.log("Companion code started");

import * as messaging from "messaging";

messaging.peerSocket.addEventListener("open", (evt) => {
  console.log("Companion Ready to send or receive messages");
});
messaging.peerSocket.addEventListener("error", (err) => {
  console.error(`Connection error: ${err.code} - ${err.message}`);
});

let commandHandlers = {
  CLEAR_CURSOR: callPath.bind(this, keyPath('0')),
  ZOOM_OUT: callPath.bind(this, keyPath('3')),
  ZOOM_IN: callPath.bind(this, keyPath('2'))
}
messaging.peerSocket.addEventListener("message", (evt) => {
  console.log(JSON.stringify(evt.data));
  sendMessage('…………')
  let handler = commandHandlers[evt.data.cmd]
  if (handler) {
    handler()
    .then(function(data) { sendMessage(data) })
    .catch(function(err) { console.error(err.message)})
  } else {
    console.error("No handler for command")
  }
});


function sendMessage(data) {
  if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
    messaging.peerSocket.send(data);      
  }
}

function callPath(path) {
  let ipAddress = settingsStorage.getItem("ipAddress");
  let fetchAddress = `https://${ipAddress}${path}`;
  console.log(fetchAddress)
  return fetch(fetchAddress)
    .then(function(res) {
      console.log(res.status)
      return res.text()
    })
    .then(function(text) {
      console.log(text)
      return JSON.parse(text)
    })
    .then(function(data) {
      return data.button ? data.button : 'n/a'
    })
}

function keyPath(key) {
  return `/plugins/signalk-bandg-zc-plugin/key/${key}/click`
}