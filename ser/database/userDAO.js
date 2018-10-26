"use strict";
// 连接mysql数据库
var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '15078852107yyq',
    port: '3306',
    database: 'memento'
});
connection.connect(function (err) {
    if(err) {
        console.log(err.message);
    } else {
        console.log("成功连接数据库！");
    }
});

/**
 * 登录
 * @param connection
 * @param username
 * @param password
 */
function loginCheck(connection,username, password) {
    var loginSql = 'select password from user where username=' + username + ';';
    connection.query(loginSql, function (err, res) {
        if(err) {
            console.log('[INSERT ERROR] - ',err.message);
        } else {
            if(res === password) {
                console.log('登录成功！')
                return true;
            } else {
                return false;
            }
        }
    })
}

/**
 * 注册
 * @param connection
 * @param username
 * @param password
 */
function register(connection,username, password) {
    var regisSql = 'insert into user(username,password) values(' + username + ',' + password + ');';
    connection.query(regisSql, function (err, res) {
        if(err) {
            console.log('[INSERT ERROR] - ',err.message);
        } else {
            console.log('注册成功')
            return true;
        }
    })
}