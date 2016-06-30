'use strict'
var mysqlClass = require('../globalClasses/mysqlClass.js');

class writeToLog extends baseAction {
    cunstructor() {

    }

    writeToLog(message) {
      console.log(message)
    }

    getPh(){
      return  Math.floor((Math.random() * 8) + 5)+"."+Math.floor((Math.random() * 99) + 1);;
    }
}

module.exports = checkPh
