'use strict'
var dbquerys = require('./DbQuerys.js');
var db = new dbquerys()

class apiManager {
    cunstructor() {}

    getLastActionsResult(res) {
        return db.getLastActionsResult()
            .then(function(sqlRes) {
                res.json(sqlRes)
            }).catch(function(e) {
                console.log(e)
            })
    }

    getPlan(res) {
        return db.getPlan()
            .then(function(sqlRes) {
                res.json(sqlRes)
            }).catch(function(e) {
                console.log(e)
            })
    }

    getcharts24Data(res) {
        return db.getLogData()
            .then(function(sqlRes) {
                function parceRows() {
                    var resData = {}
                    for (var row in sqlRes) {
                        //    console.log(resData[sqlRes[row].action])
                        if (resData[sqlRes[row].action] == undefined) {
                            resData[sqlRes[row].action] = []
                            resData[sqlRes[row].action].date = []
                        } else {
                              console.log(resData)
                              resData[sqlRes[row].action].push({date:sqlRes[row].dateTime,value:sqlRes[row].message})
                        }
                    }
                    return resData
                }

                var a = parceRows()
                res.json(a)
            })
            .catch(function(e) {
                console.log(e)
            })

    }



    runAction() {
        console.log('runAction')
    }
}
module.exports = apiManager
