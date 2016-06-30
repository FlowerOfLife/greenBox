'use strict'
var checkPh = require("../actions/checkPhAction.js")
var checkEc = require("../actions/checkPhAction.js")
var checkTemp = require("../actions/checkTemp.js")
var stablisePh = require("../actions/checkPhAction.js")
var checkHumidity = require("../actions/checkHumidity.js")
var dbquerys = require('../baseClasses/DbQuerys.js');
var db = new dbquerys()
class controller {
    cunstructor() {}
    getCurrentPlan() {

    }


    runPlanTasks(plan) {
            for (var task in plan) {
                task = task[plan];
                eval(task[plan])
            }
        }
        //replace string "min"
    checkIfRunTask(actionRunEvery, lastRun) {

        var endDate = new Date()
        var startDate = new Date(lastRun / 1000)
        console.log(getMinutesBetweenDates(startDate, endDate), getMinutesBetweenDates(startDate, endDate) > parseInt(actionRunEvery.replace("min", '')), 111111)


        function getMinutesBetweenDates(startDate, endDate) {
            var diff = endDate.getTime() - startDate.getTime();
            return (diff / 60000);
        }
        return (getMinutesBetweenDates(startDate, endDate) > parseInt(actionRunEvery.replace("min", '')))

    }
    runMainCron(plan) {
        var self = this
        console.log(plan)
        for (var action in plan) {
            (function(action) {


                var currentAction = plan[action].actionName
                    //plan[action].actionParams
                var thisAction = eval("new " + currentAction + "()");
                console.log(currentAction, thisAction, 44444, thisAction.run)
                if (self.checkIfRunTask(plan[action].RunEvery, plan[action].lastRun)) {
                    thisAction.run()
                        .then(function(res) {
                            db.updateLastRun(currentAction)
                            try {
                                res = JSON.parse(res)
                                console.log(res)
                                if (res.Status == 'Success') {
                                    db.writeToLog(currentAction, res.Message)
                                } else {
                                    throw 'WrongResponce:' + res
                                }
                            } catch (e) {
                                console.log(e, res)
                                db.writeToLog(currentAction, 0)
                            }


                            console.log("done " + currentAction + " params: " + plan[action].actionParams + " resut" + res)
                        })
                        .catch(function(e) {
                            console.log(e)
                        })
                }



            })(action)
        }
    }




    runMainCron2(plan) {
        var self = this
        console.log(plan)
        var tasksArray = []
        for (var action in plan) {
            (function(action) {
                if (self.checkIfRunTask(plan[action].RunEvery, plan[action].lastRun)) {
                    tasksArray.push(plan[action].actionName);

                }

            })(action)
        }
        console.log(tasksArray);

        function resolveAction(countNow, endloop) {
            var self = this
            var promise = new Promise(function(resolve, reject) {
                var thisAction = eval("new " + tasksArray[countNow] + "()");
                return thisAction.run()
                    .then(function(res) {
                        try {
                            res = JSON.parse(res)
                            console.log(res)
                            if (res.Status == 'Success') {
                                console.log("AAAAAAAAAAAAAAAAAAAaaa" + res)
                                db.writeToLog(tasksArray[countNow], res.Message)
                            } else {
                                //throw 'WrongResponce:' + res
                            }
                        } catch (e) {
                            console.log(e, res)
                            db.writeToLog(tasksArray[countNow], 0)
                        }
                        //console.log("zzzzzzzzzzZZZZZZZZZZZZZZZZZZ"+tasksArray[countNow],countNow + 1, endloop,resolveAction,res)
                        db.updateLastRun(tasksArray[countNow])
                        resolve(resolveAction(countNow + 1, endloop))

                        console.log("done " + currentAction + " params: " + plan[action].actionParams + " resut" + res)
                    })

            })
            return promise
        }

        resolveAction(0, tasksArray.length)



    }
}
module.exports = controller

