'use strict';

var driver = require('ruff-driver');

var SMPLRT_DIV = 0x19;
var CONFIG = 0x1A;
var GYRO_CONFIG = 0x1B;
var ACCEL_CONFIG = 0x1C;

var ACCEL_XOUT_H = 0x3B;
var ACCEL_XOUT_L = 0x3C;
var ACCEL_YOUT_H = 0x3D;
var ACCEL_YOUT_L = 0x3E;
var ACCEL_ZOUT_H = 0x3F;
var ACCEL_ZOUT_L = 0x40;

var TEMP_OUT_H = 0x41;
var TEMP_OUT_L = 0x42;

var GYRO_XOUT_H = 0x43;
var GYRO_XOUT_L = 0x44;
var GYRO_YOUT_H = 0x45;
var GYRO_YOUT_L = 0x46;
var GYRO_ZOUT_H = 0x47;
var GYRO_ZOUT_L = 0x48;

var PWR_MGMT_1 = 0x6B;
var WHO_AM_I = 0x75;

module.exports = driver({
    attach: function (inputs) {
        this._i2c = inputs.getRequired('i2c');
        this._readWord = function (regHigh, regLow) {
            regLow = regLow || regHigh + 1;
            return (this._i2c.readByte(regHigh) << 8) + this._i2c.readByte(regLow);
        };
    },
    exports: {
        turnOn: function () {
            this._i2c.writeByte(PWR_MGMT_1, 0);
        },
        turnOff: function () {
            this._i2c.writeByte(PWR_MGMT_1, 1);
        },
        isOn: function () {
            return this._i2c.readByte(PWR_MGMT_1) !== 0;
        },
        getAccel: function () {
            return {
                x: this._readWord(ACCEL_XOUT_H),
                y: this._readWord(ACCEL_YOUT_H),
                z: this._readWord(ACCEL_ZOUT_H)
            };
        },
        getGyro: function () {
            return {
                x: this._readWord(GYRO_XOUT_H),
                y: this._readWord(GYRO_YOUT_H),
                z: this._readWord(GYRO_ZOUT_H)
            };
        },
        getTemperature: function () {
            var temp = this._readWord(TEMP_OUT_H);
            if (temp >= 0x8000) {
                temp = 0xffff - temp;
            }
            return temp / 340 + 36.53;
        }
    },
    detach: function () {
        //do clean work here
    }
});
