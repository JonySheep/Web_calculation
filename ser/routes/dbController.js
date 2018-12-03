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
                var createUserTable = "create table if not exists `user` (" +
                    "`username` varchar(50) primary key, " +
                    "`password` varchar(100), " +
                    "`name` varchar(30) default 'DefaultMan', " +
                    "`description` varchar(100) default '这个朋友很懒，什么也没有留下'," +
                    "`prefer` varchar(20) default '无' );";
                connection.query(createUserTable);
                var createMementoListTable = "create table if not exists `mementoList`(" +
                    "`mementoID` int primary key auto_increment," +
                    "`username` varchar(50)," +
                    "`picurl` varchar(100)," +
                    "`movieName` varchar(30)," +
                    "`comment` varchar(120)," +
                    "`likeNum` int default 0," +
                    "`popularity` int default 0);";
                connection.query(createMementoListTable);
                var createTagListTable = "create table if not exists `tagLists`(" +
                    "`mementoID` int," +
                    "`tagName` varchar(20)," +
                    "`popularity` int default 0," +
                    "primary key (mementoID, tagName));";
                connection.query(createTagListTable);
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
    },


    /**
     * 插入一个memento信息
     * @param username 用户名
     * @param movieName 电影名称
     * @param comment 评论
     * @param picUrl 图片链接
     */
    addMemento : function (username, movieName, comment, picUrl) {
        var promise = new Promise(function (resolve) {
            var insertSql = 'insert into mementoList (username, movieName, comment, picUrl) values ("' +
                username + '","' + movieName + '","' + comment + '","' + picUrl + '");';
            connection.query(insertSql, function (err) {
                console.log(insertSql);
                console.log(err);
                resolve (err === null);
            });
        });
        promise.then(function (value) { return value; });
        return promise;
    },


    /**
     * 得到某用户的电影列表
     * @param username 用户名
     */
    getUserMementos : function (username) {
        var promise = new Promise(function (resolve) {
            var searchSql = 'select * from mementoList where username="' + username + '";';
            connection.query(searchSql, function (err, res) {
                resolve (err === null ? res : null);
            })
        });
        promise.then(function (value) { return value; });
        return promise;
    },


    /**
     * 得到系统中所有memento
     */
    getMementoList : function () {
        var promise = new Promise(function (resolve) {
            var searchSql = 'select * from mementoList;';
            connection.query(searchSql, function (err, res) {
                resolve (err === null ? res : null);
            })
        });
        promise.then(function (value) { return value; });
        return promise;
    },


    /**
     * 得到某一个memento的信息
     * @param mid mementoID
     */
    getMemento : function (mid) {
        var promise = new Promise(function (resolve) {
            var searchSql = 'select * from mementoList where mementoID="' + mid +'";';
            connection.query(searchSql, function (err, res) {
                resolve (err === null ? res : null);
            })
        });
        promise.then(function (value) { return value; });
        return promise;
    },


    /**
     * 得到memento的标签
     * @param mid mementoID
     */
    getTags : function (mid) {
        var promise = new Promise(function (resolve) {
            var searchSql = 'select * from tagLists where mementoID="' + mid +'";';
            connection.query(searchSql, function (err, res) {
                resolve (err === null ? res : null);
            })
        });
        promise.then(function (value) { return value; });
        return promise;
    },


    /**
     * 增加一个标签
     * @param mid mementoID
     * @param tagName 标签名称
     */
    addTags : function (mid, tagName) {
        var promise = new Promise(function (resolve) {
            var insertSql = 'insert into tagLists(mementoID,tagName) values (' + mid + ',"' + tagName + '");';
            connection.query(insertSql, function (err) {
                resolve (err === null);
            })
        });
        promise.then(function (value) { return value; });
        return promise;
    },


    /**
     * 得到热门Memento（根据popularity进行排序给出5个Memento）
     */
    getHotMemento : function () {
        var promise = new Promise(function (resolve) {
            var searchSql = 'select * from mementoList order by popularity desc limit 5;';
            connection.query(searchSql, function (err, res) {
                resolve (err === null ? res : null);
            })
        });
        promise.then(function (value) { return value; });
        return promise;
    },


    /**
     * 得到热门的标签（根据popularity进行排序给出10个tags）
     */
    getHotTags : function () {
        var promise = new Promise(function (resolve) {
            var searchSql = 'select * from tagLists order by popularity desc limit 10;';
            connection.query(searchSql, function (err, res) {
                resolve (err === null ? res : null);
            })
        });
        promise.then(function (value) { return value; });
        return promise;
    },


    /**
     * 给一个Memento点赞，流行度+1
     * @param mid
     */
    likeMemento : function (mid) {
        var promise = new Promise(function (resolve) {
            var updateMementoSql = 'update mementoList set likeNum=likeNum+1, popularity=popularity+1 where mementoID="' + mid +'";';
            var updateTagsSql = 'update tagLists set popularity=popularity+1 where mementoID="' + mid +'";';
            connection.query(updateMementoSql, function (err) {
                resolve (err === null);
            })
            connection.query(updateTagsSql, function (err) {
                resolve (err === null);
            })
        });
        promise.then(function (value) { return value; });
        return promise;
    },


    /**
     * 浏览（点击）一个Memento，流行度+3
     */
    browsMemento : function (mid) {
        var promise = new Promise(function (resolve) {
            var updateSql = 'update mementoList set popularity=popularity+3 where mementoID="' + mid +'";';
            connection.query(updateSql, function (err) {
                resolve (err === null);
            })
        });
        promise.then(function (value) { return value; });
        return promise;
    }
};

module.exports = db;