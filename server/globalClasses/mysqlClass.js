'use strict';
var mysql = require('mysql');

class mysqlClass {
    constructor(config) {

      var config = {
            localmysqlUser: "root",
            localmysqlpass: "greenBox010@",
            localmysqldatabase: "greenBox",
            localmysqlhost: 'localhost'
        };
        this.config = config;

    }
    executeQuery(query) {
           console.log(query)
        var mysql = require("mysql");
        var that = this
        var promise = new Promise(function (resolve, reject) {
            var connection = mysql.createConnection({
                host: that.config.localmysqlhost,
                user: that.config.localmysqlUser,
                password: that.config.localmysqlpass,
                database: that.config.localmysqldatabase
            });
            connection.connect();

            connection.query(query, function (err, rows, fields) {
                if (err) {
                    console.log(err.stack)
                    reject(err)
                }
                resolve(rows)
            });

            connection.end();
        });
        return promise;
    }
}
module.exports = mysqlClass
