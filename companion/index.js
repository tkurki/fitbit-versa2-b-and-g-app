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
messaging.peerSocket.addEventListener("message", (evt) => {
  console.log(JSON.stringify(evt.data));
  sendMessage('hep')
  clearCursor()
    .then(function(data) { sendMessage(data) })
    .catch(function(err) { console.error(err.message)})
});


function sendMessage(data) {
  if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
    messaging.peerSocket.send(data);      
  }
}

function clearCursor() {
  let ipAddress = settingsStorage.getItem("ipAddress");
  let fetchAddress = `https://${ipAddress}/signalk/v1/api/vessels/self/navigation/speedOverGround`;
  console.log(fetchAddress)
  return fetch(fetchAddress)
    .then(function(res) {
      return res.json()
    })
    .then(function(data) {
      return data.value
    })
}
