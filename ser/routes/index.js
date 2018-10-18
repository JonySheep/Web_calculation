"use strict";
var express = require('express');
var router = express.Router();

router.route('/')
    .get(function (req, res) {
        res.render('LoginPage', {title: '用户登录'});
    })
    .post(function (req, res) {
        var user = {
          username: 'admin',
          password: '123456'
        }
        if(req.body.username === user.username && req.body.password === user.password) {
            req.session.user = user;
            res.redirect('/');
        } else {
            req.session.error('用户名或密码不正确');
            res.redirect('/');
        }
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
