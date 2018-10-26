"use strict";
var express = require('express');
var router = express.Router();
// 连接mysql数据库
var mysql = require('mysql');
// var connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: '15078852107yyq',
//     port: '3306',
//     database: 'memento'
// });
// connection.connect(function (err) {
//     if(err) {
//         console.log(err.message);
//     } else {
//         console.log("成功连接数据库！");
//     }
// });
var sql = require('./sqlController');

router.route('/')
    .get(function (req, res) {
        res.render('LoginPage', {title: '用户登录'});
    });

router.route('/login')
    .post(function (req, res) {
        console.log('运行到这啦！！！')
        console.log(req.body);
        // var isSuccess = loginCheck(req.body.username, req.body.password);
        // if(isSuccess) {
        //     req.session.user = {
        //         username: req.body.username,
        //         password: req.body.password
        //     };
        //     res.redirect('/');
        // } else {
        //     req.session.error('用户名或密码不正确');
        //     res.redirect('/');
        // }
        var username = req.body.username;
        var password = req.body.password;
        sql.select('SELECT * FROM user WHERE username = "'+ name + '" AND password = "' + password + '";').then(function(data) {
            //session存user name和userid
            console.log(data);
            req.session.user = username;
            data.status < 400 ? data.url = '/' : null;
            res.json(data);
            console.log(res);
            res.end();
            req.redirect("/");
        }).catch(function(err){})
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
 * 查数据库验证登录,连接数据库
 * @param username
 * @param password
 */
function loginCheck(username, password) {
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
