
var things = require("./lib/things");

// var led = new things.LED(7);
// led.ready()
//    .then( function () { return led.on()  })
//    .then( function () { return things.wait(2000); })
//    .then( function () { return led.off() })
//    .then( function () { console.log('done'); });

var led = new things.LED(7);
led.ready()
   .then( function () { flash() });

function flash() {
  led.on()
     .then( function () { return things.wait(1000); } )
     .then( function () { return led.off(); })
     .then( function () { return things.wait(1000); } )
     .then( function () { console.log('done'); flash(); });
}

/*
var gpio  = require("pi-gpio");
gpio.open(7, "output", function(err) {     // Open pin 16 for output
    gpio.write(7, 0, function() {          // Set pin 16 high (1)
        gpio.close(7);                     // Close pin 16
    });
});
*/

//setInterval(function () { console.log('tick'); }, 1000)