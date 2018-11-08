"use strict";
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.route('/user')
    .get(function (req, result) {
        // var username = req.session.username;
        //
        // var userInfoSql = 'select * from user where username=\'' +
        //     username + '\';';
        //
        // connection.query(userInfoSql, function (err, res) {
        //     if(err === null) {
        //         result.send(res);
        //         result.render('UserSettings', {username: req.session.username, title: '个人中心'});
        //     } else {
        //         result.sendStatus(500);
        //     }
        // });
        result.render('UserSettings', {username: req.session.username, title: '个人中心'});
    })
    .post(function (req, res) {

    });

module.exports = router;
