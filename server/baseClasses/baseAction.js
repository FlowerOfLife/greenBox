'use strict'
var request = require('request')
class baseAction{
cunstructor(){
}
getName(){
  return this.name
}
setName(name){
  this.name = name
}
runAction(){
  console.log('runAction')
}

    sendRequest(url, json, method) {
        console.log("BODYYYYYYYYYYYYYYYYYYYYYY2222",url, json, method)
        if (method == undefined) {
            method = "POST"
        }
        var promise = new Promise(function(resolve, reject) {
            console.log("REQUEST: ", url, json, method);
            request({
                method: "GET",
            /*    headers: {
                    'Content-Type': 'application/json'
                },*/
                url: url,
              //  json: (json)
            }, function optionalCallback(err, httpResponse, body) {
                console.log("BODYYYYYYYYYYYYYYYYYYYYYY",body,err)
                if (err) {
                    resolve(err)
                } else {
                    resolve(body)
                }

            });
        })
        return promise
    }
}
module.exports = baseAction
