"use strict";

$(document).ready(function () {
    var button = $('#upload_button'), interval;
    var fileType = "all", fileNum = "one";

    new AjaxUpload(button, {
        action: ''
    })
});