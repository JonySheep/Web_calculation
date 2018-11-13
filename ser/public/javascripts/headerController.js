"use strict";

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