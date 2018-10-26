"use strict";
var mysql = require('mysql');

exports.select =function(sql) {
    var promise = new Promise(function(resolve,reject) {

        var connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '15078852107yyq',
            port: '3306',
            database: 'memento'
        });

        connection.connect();
        connection.query(sql, function (err, results, fields) {
                if (err) {
                    console.log("err");
                    reject(err);
                }else {
                    console.log("yes");
                    if(results.length > 0) {
                        resolve({status: 200});
                    }else {
                        resolve({status: 400});
                    }
                }
            }
        );
        connection.end();
    });

    return promise;
};
