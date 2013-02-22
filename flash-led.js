/*
  Use the pi-gpio library and Q's promises to 
  implement flashing LED
*/
var things = require("./lib/things");

var led = new things.LED(7);
led.ready()
   .then( function () { flash() });

function flash() {
  led.on()
     .then( function () { return things.wait(1000); } )
     .then( function () { return led.off(); })
     .then( function () { return things.wait(1000); } )
     .then( function () { flash(); });
}
