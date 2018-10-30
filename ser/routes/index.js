"use strict";
var express = require('express');
var router = express.Router();
var path = require('path');
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
express().use(express.static('./public'));
// var sql = require('./sqlController');

router.route('/')
    .get(function (req, res) {
        res.render('LoginPage', {title: '用户登录'});
    });

router.route('/login')
    .post(function (req, result) {
        var loginSql = 'select password from user where username=\'' + req.body.username + '\' and password=\'' + req.body.password + '\';';
        connection.query(loginSql, function (err, res) {

            if(err === null) {
                if(res === []) {
                    result.sendStatus(500);
                    result.redirect('/');
                } else {
                    result.sendStatus(200);
                    result.redirect('/home');
                }
            } else {
                result.sendStatus(400);
                result.redirect('/');
            }
        });
    });

router.get('/logout', function (req, res) {
    req.session.user = null;
    res.redirect('/');
});

router.get('/home', function (req, res) {
    res.render('MemoryHomePage', {title: '记忆大厅'});
});

router.get('/editPic', function (req, res) {
    // authentication(req, res);
    res.render('PicsEditingPage', {title: '图片导出处理'});
});

router.get('/connectPic', function (req, res) {
    // authentication(req, res);
    res.render('ChooseConnectPicsPage', {title: '图片合成'});
});

router.route('/register')
    .get(function (req, res) {
    res.render('RegisterPage', {title: '注册'});
})
    .post(function (req, result) {
        var username = req.body.username;
        var password = req.body.password;

        var checkSql = 'select username from user where username=\'' +
            username + '\';';

        var regisSql = 'insert into user(username,password) values(\'' +
            username + '\',\'' + password + '\');';

        // check username
        connection.query(regisSql, function (err, res) {
            console.log(res);

            if(err === null) {
                // if(res === []) {
                //     // 用户不存在
                //     // connection.query(regisSql, function () {
                //     //     result.sendStatus(200);
                //     //     result.redirect('/home');
                //     // })
                // } else {
                //     // 用户已存在
                //     result.sendStatus(500);
                //     result.redirect('/register');
                // }
                result.sendStatus(200);
                result.redirect('/login');
            } else {
                result.sendStatus(400);
                result.redirect('/');
            }
        });
    });


var multer = require('multer');
//选择diskStorage存储
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.resolve('public/images/upload'));
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));//增加了文件的扩展名
    }
});

var upload = multer({storage: storage});

// 上传图片
router.post('/upload', upload.single('pic') , function (req, res, next) {
    res.send({
        err: null,
        //filePath:就是图片在项目中的存放路径
        filePath: 'images/upload/' + path.basename(req.file.path)
    });
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
