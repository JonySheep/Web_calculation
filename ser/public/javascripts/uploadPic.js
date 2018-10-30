"use strict";

$('#upload-button').click(function () {
    //获取上传的File对象，此处是一张图片对象
    var file = document.getElementById("choose").files[0];

    var movieName = $("input[name='movieName']").val();
    var comment = $("input[name='comment']").val();
    console.log(movieName);
    console.log(comment);

    if (movieName === "" || comment === "") {
        alert("请填写电影名称和评论～");
        return;
    }

    var formData = new FormData();
    formData.append("pic", file);//设置key为pic,value为上述的File对象
    console.log(formData.get('pic'));
    $.ajax({
        type: 'POST',
        url: '/upload',
        data: formData,
        async: false,
        cache: false,
        contentType: false,
        processData: false,
        success: function (data) {
            console.log(data.filePath);
            $(".newImg").attr("src", data.filePath);//上传成功则图片显示
        },
        error: function (err) {
            console.log(err.message);
        }
    })
});