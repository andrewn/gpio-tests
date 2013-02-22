var gpio   = require("pi-gpio"),
    Q      = require('q'),
    events = require("events");

/*
  Implement a timeout as a deferred
*/
function wait(ms) {
  var deferred = Q.defer();
  setTimeout(function () { 
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
      deferred.resolve();
    }
  });
  return deferred.promise;
}

LED.prototype.on = function () {
  var deferred = Q.defer();
  gpio.write(7, 1, function (err) {
    if (err) {
      deferred.reject(err);
    } else {
      deferred.resolve();
    }
  });
  return deferred.promise;
};

LED.prototype.off = function () {
  var deferred = Q.defer();
  gpio.write(7, 0, function (err) {
    if (err) {
      deferred.reject(err);
    } else {
      deferred.resolve();
    }
  });
  return deferred.promise;
};

var Button = function (pin) {
  this.pin = pin;

  // initially, we don't know whether the button
  // was pressed or not
  this.wasPressed = null;

  // Just in case something has this open already
  gpio.close(pin);
};

Button.prototype = events.EventEmitter.prototype;

Button.prototype.isPressedValue = 0;

Button.prototype.ready = function () {
  var deferred = Q.defer(),
      self = this;
  gpio.open(this.pin, 'input', function (err) {
    if (err) {
      deferred.reject(err);
    } else {
      self.pollButtonState();
      deferred.resolve();
    }
  });
  return deferred.promise;
};

Button.prototype.pollButtonState = function() {
  var self = this;
  self.isPressed()
      .then(function (isPressed) {
        // Initially, set the previous state to the inverse of the 
        // current state to force event firing
        if (self.wasPressed === null) { self.wasPressed = !isPressed; }

        if (isPressed && !self.wasPressed) {
          self.emit('pressed');
        } else if (!isPressed && self.wasPressed) {
          self.emit('released');
        }

        self.wasPressed = isPressed;
      });
  process.nextTick(self.pollButtonState.bind(self));
}

Button.prototype.isPressed = function () {
  var deferred = Q.defer(),
      self = this;
  gpio.read(this.pin, function (err, value) {
    if (err) {
      deferred.reject(err);
    } else {
      deferred.resolve(value === self.isPressedValue);
    }
  });
  return deferred.promise;
};

exports.LED    = LED;
exports.Button = Button;
exports.wait   = wait;