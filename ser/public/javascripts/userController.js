"use strict";
// rest api need header
var header = {
    "X-LC-Id": 'S5lxTXykdLyqQY4C0Ck2r89c-gzGzoHsz',
    "X-LC-Key": 'XJn3bqNJqCB4GNPbr2QAPHvw',
    "Content-Type": "application/json"
};


function checkPassword(pass, confirmPass) {
    return pass === confirmPass ;
}

/**
 * 前端调用的登录方法
 */
$("#login").click(function () {
    var password = $("input[name='password']");

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
               window.location = '/home';
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
    var password = $("input[name='password']");
    var confirmPass = $("input[name='confirmPassword']");

    if(!checkPassword(password.val(), confirmPass.val())){
        alert('两次输入的密码不相同');
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

/**
 * 使用Rest api！
 * 发送手机短信验证码
 */
$('#send-msg-button').click(function () {

    console.log('!!!');

    var data = {
        "mobilePhoneNumber": $("input[name='username']").val()
    };

    $.ajax({
        type: 'POST',
        url: 'https://api.leancloud.cn/1.1/requestSmsCode',
        headers: header,
        data: JSON.stringify(data),
        success: function (res, err) {
            $('#send-msg-button').css('display','none');
            $('#confirm-container').css('display', 'block');
        }
    })
});


/**
 * 使用Rest api
 * 验证验证码！
 */
$('#confirm-msg-button').click(function () {
    var code = $("input[name='confirm-code']").val();

    var data = {
        "mobilePhoneNumber": $("input[name='username']").val()
    };

    $.ajax({
        type: 'POST',
        url: 'https://api.leancloud.cn/1.1/verifySmsCode/' + code,
        headers: header,
        data: JSON.stringify(data),
        success: function (res, err) {
            alert('手机号验证成功!');
            $('#confirm-container').css('display', 'none');
            $('#register').removeAttr('disabled');
        }
    })
});