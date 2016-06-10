'use strict';
var motor;
var gyro;
var encoderA;
var encoderB;

$.ready(function (error) {
    if (error) {
        console.log('error');
        return;
    }
    motor = $('#motor');
    gyro = $('#gyro');
    encoderA = $('#wheel-encoder-a');
    encoderB = $('#wheel-encoder-b');
    gyro.turnOn();
    setInterval(function() {
        console.log('temp: ' + gyro.getTemperature());
    }, 1000);
});

$.end(function() {
    console.log('end');
});