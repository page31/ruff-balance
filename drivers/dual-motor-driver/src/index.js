'use strict';

var driver = require('ruff-driver');
var Gpio = require('gpio');

function MotorContext(pwm, in1, in2) {
    this._pwm = pwm;
    this._in1 = in1;
    this._in2 = in2;
    this._in1.setDirection(Gpio.OUT_LOW);
    this._in2.setDirection(Gpio.OUT_LOW);
}

MotorContext.prototype = {
    setSpeed: function (speed) {
        var forward = speed > 0;
        var stop = !speed;
        if (stop) {
            this._in1.write(0);
            this._in2.write(0);
            speed = 0;
        } else if (forward) {
            this._in1.write(1);
            this._in2.write(0);
        } else {
            this._in1.write(0);
            this._in2.write(1);
        }
        this._pwm.setDuty(Math.min(Math.abs(speed), 1));
    }
};

module.exports = driver({
    attach: function (inputs) {
        //do init steps here
        this._pwma = inputs.getRequired('pwm-a');
        this._pwmb = inputs.getRequired('pwm-b');
        this._ain1 = inputs.getRequired('ain-1');
        this._ain2 = inputs.getRequired('ain-2');
        this._bin1 = inputs.getRequired('bin-1');
        this._bin2 = inputs.getRequired('bin-2');
        this._stry = inputs.getRequired('stry');
        this._motora = new MotorContext(this._pwma, this._ain1, this._ain2);
        this._motorb = new MotorContext(this._pwmb, this._bin1, this._bin2);
    },
    exports: {
        setSpeedA: function (speed) {
            this._motora.setSpeed(speed);
        },
        setSpeedB: function (speed) {
            this._motorb.setSpeed(speed);
        },
        turnOn: function () {
            this._stry.write(1);
        },
        turnOff: function () {
            this._stry.write(0);
        },
        isOn: function() {
            return this._stry.read() === 1;
        }
    },
    detach: function () {
        //do clean work here
    }
});
