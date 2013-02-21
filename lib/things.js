var gpio = require("pi-gpio"),
    Q    = require('q');

/*
  Implement a timeout as a deferred
*/
function wait(ms) {
  console.log('wait()', ms);
  var deferred = Q.defer();
  setTimeout(function () { 
    console.log('waited');
    deferred.resolve(); 
  }, ms);
  return deferred.promise;
}

var LED = function (pin) {
  this.pin = pin;

  // Just in case something has this open already
  gpio.close(pin);

};

LED.prototype.ready = function () {
  var deferred = Q.defer();
  gpio.open(this.pin, 'output', function (err) {
    if (err) {
      deferred.reject(err);
    } else {
      console.log('open success')
      deferred.resolve();
    }
  });
  return deferred.promise;
}

LED.prototype.on = function () {
  var deferred = Q.defer();
  console.log('on()', this.pin);
  gpio.write(7, 1, function (err) {
    if (err) {
      deferred.reject(err);
    } else {
      console.log('on success');
      deferred.resolve();
    }
  });
  return deferred.promise;
};

LED.prototype.off = function () {
  var deferred = Q.defer();
  console.log('off()', this.pin);
  gpio.write(7, 0, function (err) {
    if (err) {
      deferred.reject(err);
    } else {
      console.log('off success');
      deferred.resolve();
    }
  });
  return deferred.promise;
};

exports.LED  = LED;
exports.wait = wait;