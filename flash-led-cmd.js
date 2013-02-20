/*
  Calls out to the wiringPi `gpio` command
*/
var HIGH = 1,
    LOW  = 0;

var gpioPin = 7,
    flashIntervalMs = 2000;

var isOn = false;

var exec = require('child_process').exec;

function toggle() {
  var cmd = ["gpio write", gpioPin, (isOn ? LOW : HIGH)].join(' ');
  exec(cmd);
  console.log(cmd);
  isOn = !isOn;
}

setInterval(toggle, flashIntervalMs);