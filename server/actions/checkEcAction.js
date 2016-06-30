'use strict'
var baseAction = require('../baseClasses/baseAction.js')

class checkEcAction extends baseAction {
    constructor() {
        super();
        this.setName('checkPh')
    }

    run() {
        return this.getEc()
    }
    getEc() {
        var promise = new Promise(function(resolve, reject) {

            resolve(Math.floor((Math.random() * 8) + 5) + "." + Math.floor((Math.random() * 99) + 1))
        })
        return promise
    }
}

module.exports = checkEcAction
sendRequest(url, json, method) {
    if (method == undefined) {
        method = "POST"
    }
    var promise = new Promise(function(resolve, reject) {
        console.log("REQUEST: ", url, json, method);
        request({
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            url: url,
            json: (json)
        }, function optionalCallback(err, httpResponse, body) {
          console.log("BODYYYYYYYYYYYYYYYYYYYYYY",body)
            if (err) {
                resolve(err)
            } else {
                resolve(body)
            }

        });
    })
    return promise
}
