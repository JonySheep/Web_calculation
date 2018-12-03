"use strict";

checkIsLogin();

function Logout() {
    $.ajax({
        type: 'GET',
        url: '/logout',
        success: function () {
            console.log('登出成功');
            window.location = '/';
        }
    })
}

function toSettings() {
    window.location = '/user';
}

function toCenter() {
    window.location = '/';
}

function toHome() {
    window.location = '/home';
}

function toLogin() {
    window.location = '/login';
}

function checkIsLogin() {
    $.ajax({
        type: 'GET',
        url: '/isLogin',
        success: function (res) {
            // 若已登录
            console.log(res);
            if(res) {
                $('#login-button').text('登出');
            } else {
                $('#login-button').text('登录/注册');
                $('#user-avatar').remove();
            }
        }
    })
}