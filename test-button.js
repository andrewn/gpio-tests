/*
  Use the pi-gpio library and Q's promises to 
  implement a button callback
*/
var things = require("./lib/things");

var button = new things.Button(3);
button.ready()
      .then(outputButtonState, failed)
      .then(attachEventListeners, failed)
      .done(null, failed);

function failed(err) {
  throw err;
}

function outputButtonState() {
  button.isPressed()
        .then( 
          function (val) { console.log('isPressed? ', val); },
          failed
        )
        .done(null, failed);
}

function attachEventListeners() {
  button.on('pressed', function () {
    console.log('button is pressed');
  });

  button.on('released', function () {
    console.log('button is released');
  });
}