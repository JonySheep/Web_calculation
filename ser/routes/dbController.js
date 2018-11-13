"use strict";

var connection = {};

var db = {

    /**
     * 连接数据库
     */
    connect : function () {

        // 连接mysql数据库
        var mysql = require('mysql');
        connection = mysql.createConnection({
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
                // 自动建表
                var initQuery = "create table if not exists `user` (" +
                    "`username` varchar(50) primary key, " +
                    "`password` varchar(100), " +
                    "`name` varchar(30) default 'DefaultMan', " +
                    "`description` varchar(100) default '这个朋友很懒，什么也没有留下'," +
                    "`prefer` varchar(20) default '无' );";
                connection.query(initQuery);
                console.log("成功连接数据库！");
            }
        });
    },

    /**
     * 用户登录
     * @param username 用户名
     * @param password 密码
     */
    login : function (username, password) {
        var promise = new Promise(function (resolve) {
            var loginSql = 'select password from user where username=\'' + username + '\' and password=\'' + password + '\';';

            connection.query(loginSql, function (err, res) {

                console.log(res);
                resolve(err === null);
            });
        });
        promise.then(function (value) {
            return value;
        });
        return promise;
    },

    /**
     * 用户注册
     * @param username 用户名
     * @param password 密码
     */
    register : function (username, password) {
        var promise = new Promise(function (resolve) {
            var regisSql = 'insert into user(username,password) values(\'' +
                username + '\',\'' + password + '\');';

            // 注册
            connection.query(regisSql, function (err, res) {
                resolve(err === null);
            });
        });
        promise.then(function (value) { return value; });
        return promise;
    },


    /**
     * 得到用户信息
     * @param username
     */
    getUserInfo : function (username) {
        var promise = new Promise(function (resolve) {
            var userInfoSql = 'select * from user where username=\'' +
                username + '\';';

            connection.query(userInfoSql, function (err, res) {
                resolve (err === null ? res : null) ;
            });
        });
        promise.then(function (value) { return value; });
        return promise;
    },


    /**
     * 更新用户信息
     * @param name 用户昵称
     * @param desc 用户个性签名
     * @param tags 用户标签
     * @param username 用户名
     */
    updateUserInfo : function (name, desc, tags, username) {
        var promise = new Promise(function (resolve) {
            var updateSql = 'update user set ';
            // 判断更改了哪些部分
            if (name !== '') {
                updateSql += 'name="' + name + '",';
            }
            if (desc !== '') {
                updateSql += 'description="' + desc + '",';
            }
            if (tags !== '') {
                updateSql += 'prefer="' + tags + '",';
            }

            connection.query(updateSql.substring(0, updateSql.length-1) + ' where username=\"' + username + '\";', function (err, res) {
                resolve(err === null);
            })
        });
        promise.then(function (value) { return value; });
        return promise;
    }
};

module.exports = db;