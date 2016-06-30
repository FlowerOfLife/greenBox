'use strict'
var baseAction = require('../baseClasses/baseAction.js')

class checkTemp extends baseAction {
    constructor() {
        super();
        this.setName('checkPh')
    }

    run() {
        return this.getTemp()
    }
    getTemp() {
      var self = this;


        var promise = new Promise(function(resolve, reject) {
        var url = 'http://10.8.0.3/arduino/index.php/192.168.1.11/arduino/getTemp'
            resolve(self.sendRequest(url, '', 'GET'))
        })
        return promise
    }
}

module.exports = checkTemp
