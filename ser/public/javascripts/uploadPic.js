"use strict";
$(document).ready(function(){
    var button = $('#upload_button'), interval;
    var fileType = "all",fileNum = "one";
    new AjaxUpload(button,{
        // action: 'do/uploadfile.php',
        /*data:{
        'buttoninfo':button.text()
        },*/
        name: 'userfile',
        onSubmit : function(file, ext){
            if(fileType == "pic")
            {
                if (ext && /^(jpg|png|jpeg|gif)$/.test(ext)){
                    this.setData({
                        'info': '文件类型为图片'
                    });
                } else {
                    $('<li></li>').appendTo('#example .files').text('非图片类型文件，请重传');
                    return false;
                }
            }
            button.text('文件上传中');
            if(fileNum == 'one')
                this.disable();
            interval = window.setInterval(function(){
                var text = button.text();
                if (text.length < 14){
                    button.text(text + '.');
                } else {
                    button.text('文件上传中');
                }
            }, 200);
        },
        onComplete: function(file, response){
            if(response != "success")
                alert(response);
            button.text('文件上传');
            window.clearInterval(interval);
            this.enable();
            if(response == "success");
            $('<li></li>').appendTo('#example .files').text(file);
        }
    });
});