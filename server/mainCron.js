var dbquerys = require('./baseClasses/DbQuerys.js');
var mycontroller= require('./baseClasses/controller.js');
var controller = new mycontroller()
var db = new dbquerys()


        db.getPlan()

        .then(function(res) {
            controller.runMainCron2(res)
        })

        .catch(function(e) {
            console.log(e.stack)
        })
