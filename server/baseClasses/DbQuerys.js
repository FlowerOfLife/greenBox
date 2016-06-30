'use strict'
var mysqlClass = require('../globalClasses/mysqlClass.js');
class dbQuerys extends mysqlClass {
    cunstructor() {
        //super();
    }
    getPlan() {
        let getActiveMonstarsQuery = `select * from greenBox.plan`;
        return this.executeQuery(getActiveMonstarsQuery)
    }

    writeToLog(action, message) {

        let query = `insert into greenBox.log (log.DateTime,log.action,log.message)values('`+ new Date().getTime()/1000 +`','` + action + `','` + message + `');`;
        return this.executeQuery(query)
    }
    updateLastRun() {
      //ALTER TABLE `greenBox`.`log` CHANGE COLUMN `dateTime` `dateTime` INT(15) NULL DEFAULT NULL ;

        let query = `insert into greenBox.log (log.DateTime,log.action,log.message)values('`+ new Date().getTime()/1000 +`','` + action + `','` + message + `');`;
        return this.executeQuery(query)
    }
    getLogData() {
        let query = `SELECT * FROM greenBox.log order by  log.dateTime desc limit 100`;
        return this.executeQuery(query)
    }
    updateLastRun(actionName) {
        let query = `UPDATE greenBox.plan SET greenBox.plan.lastRun='`+ new Date().getTime()/1000 +`' where greenBox.plan.actionName='` + actionName + `';`;
        return this.executeQuery(query)
    }
    updateAction(planData) {
        let query = `UPDATE greenBox.plan
                    SET
                    greenBox.plan.actionName='` + planData.actionName + `',
                    greenBox.plan.actionParams='` + planData.actionParams + `',
                    greenBox.plan.runEvery='` + planData.RunEvery + `'
                    where greenBox.plan.id='` + planData.id + `'`;
        return this.executeQuery(query)
    }

    getLastActionsResult(planData) {
let query = `select
          a.*
          from
          greenBox.log a
          inner join 
        (select action, max(dateTime) as maxid from greenBox.log group by action) as b on
        a.dateTime = b.maxid`;        
return this.executeQuery(query)
    }

    getcharts24Data(){
      let query = `SELECT * FROM greenBox.log WHERE FROM_UNIXTIME(dateTime) >= now() - INTERVAL 1 DAY order by dateTime;`
      return this.executeQuery(query)
    }


}
module.exports = dbQuerys
