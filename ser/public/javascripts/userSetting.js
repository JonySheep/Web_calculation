"use strict";

$('#confirmButton').click(function () {
    $.ajax({
        type: 'POST',
        url: 'info',
        data: $('#setting-form').serialize(),
        success: function (data, res) {
            console.log(res);
            if(data === 'OK') {
                window.location = '/home';
            } else {
                alert('修改信息失败');
            }
        }
    })
});

