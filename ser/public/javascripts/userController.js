"use strict";

function checkEmail(str) {
    var rule = /^[0-9a-zA-Z]+@[0-9a-zA-Z]+\.[a-zA-Z]{2,3}$/;
    return rule.test(str);
}

function checkPassword(pass, confirmPass) {
    return pass === confirmPass ;
}

/**
 * 前端调用的登录方法
 */
$("#login").click(function () {
    var username = $("input[name='username']");
    var password = $("input[name='password']");

    if (!checkEmail(username.val())) {
        alert('邮箱格式不正确');
        return;
    }
    if ((password.val()) === '') {
        alert('请填写密码');
        return;
    }
    //check password
    $.ajax({
        url: '/login',
        type: 'post',
        data: $(".login_form").serialize(),
        success: function (data) {
           if(data.status === 200) {
               window.location.href('/home');
           } else {
               alert('用户名或密码错误');
           }
        }
    });
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
 * 前端调用的注册方法
 */
function register() {
    var username = $("input[name='username']");
    var password = $("input[name='password']");
    var confirmPass = $("input[name='confirmPassword']");

    if (!checkEmail(username.val())) {
        alert('邮箱格式不正确');
        return;
    }
    if(!checkPassword(password.val(), confirmPass.val())){
        alert('两次输入的密码不相同')
        return;
    }
    if ((password.val()) === '' || (confirmPass.val()) === '') {
        alert('请填写密码');
    }
    //add user
    var isSuccess = insertUser(username, password);
    if (isSuccess) {
        window.location.href = "/";
    } else {
        alert('注册失败，请重试！');
    }
}

/**
 * 加入用户
 * @param connection
 * @param username
 * @param password
 */
function insertUser(username, password) {
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