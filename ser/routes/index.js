"use strict";
var express = require('express');
var router = express.Router();
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
// var sql = require('./sqlController');


router.route('/')
    .get(function (req, res) {
        res.render('LoginPage', {title: '用户登录'});
    });

router.route('/login')
    .post(function (req, result) {
        console.log('运行到这啦！！！');

        var loginSql = 'select password from user where username=\'' + req.body.username + '\' and password=\'' + req.body.password + '\';';
        connection.query(loginSql, function (err, res) {
            console.log('err');
            console.log(err);
            console.log('res');
            console.log(res);

            if(err === null) {
                if(res === []) {
                    result.sendStatus(500);
                    result.redirect('/');
                } else {
                    result.sendStatus(200);
                    result.redirect('/home');
                }
            } else {
                result.sendStatus(500);
                result.redirect('/');
            }
        });
    });

router.get('/logout', function (req, res) {
    req.session.user = null;
    res.redirect('/');
});

router.get('/home', function (req, res) {
    res.render('DirectorDetailPage', {title: '记忆大厅'});
});

router.get('/editPic', function (req, res) {
    // authentication(req, res);
    res.render('PicsEditingPage', {title: '图片导出处理'});
});

router.get('/connectPic', function (req, res) {
    // authentication(req, res);
    res.render('ChooseConnectPicsPage', {title: '图片合成'});
});

router.get('/register', function (req, res) {
    res.render('RegisterPage', {title: '注册'});
})
    .post(function (req, res) {
        var user = {
            username: 'admin',
            password: '123456'
        }
        req.session.user = user;
        res.redirect('/');
    });


/**
 * 检测访问权限
 * @param req
 * @param res
 */
function authentication(req, res) {
    if(!req.session.user) {
        req.session.error='请先登录';
        return res.redirect('/');
    }
}

module.exports = router;
