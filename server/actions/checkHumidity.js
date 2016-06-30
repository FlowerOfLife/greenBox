'use strict'
var baseAction = require('../baseClasses/baseAction.js')
class checkHumidity extends baseAction {
    constructor() {
        super();
        this.setName('checkPh')
    }

    run() {
        return this.getHumidity()
    }
    getHumidity() {
      var self = this;


        var promise = new Promise(function(resolve, reject) {
        var url = 'http://10.8.0.3/arduino/index.php/192.168.1.11/arduino/getHumidity'
            resolve(self.sendRequest(url, '', 'GET'))
        })
        return promise
    }
}

module.exports = checkHumidity
