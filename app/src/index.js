'use strict';

$.ready(function (error) {
    if (error) {
        console.log('error');
        return;
    }
    var motor = $('#motor');
    motor.turnOn();
});

$.end(function() {
    console.log('end');
});