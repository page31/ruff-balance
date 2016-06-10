'use strict';

var driver = require('ruff-driver');

function Encoder(gpioA, gpioB) {
    this.a = gpioA;
    this.b = gpioB;
    this.a.on('interrupt', function (state) {
        console.log('a ' + state);
    });
    this.b.on('interrupt', function (state) {
        console.log('b' + state);
    });
}

module.exports = driver({
    attach: function (inputs) {
        this._encoder = new Encoder(inputs.getRequired('gpio-a'), inputs.getRequired('gpio-b'));
    },
    detach: function () {
        //do clean work here
    },
    events: {
        rotate: 'rotated'
    }
});
