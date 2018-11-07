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
        data: $("#loginForm").serialize(),
        success: function (data) {
            console.log(data);
           if(data.length !== 0) {
               window.location = '/';
           } else{
               alert('用户名或密码错误');
           };
        }
    });
});

/**
 * 前端调用的注册方法
 */
$('#register').click(function () {
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

    //register
    $.ajax({
        url: '/register',
        type: 'post',
        data: $("#registerForm").serialize(),
        success: function (data) {
            if(data === "OK") {
                window.location = '/login';
            } else {
                alert('用户已存在');
            }
        }
    });
});