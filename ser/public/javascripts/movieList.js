"use strict";
var movie_list = [
    {
        movie_name: "追随",
        pic_src: "/images/movie_pic/following.jpg",
        comment: "诺兰的牛逼来源于内心散发出的恐惧。"
    },
    {
        movie_name: "记忆碎片",
        pic_src: "/images/movie_pic/memento.jpg",
        comment: "不错,一开始我还以为家里的DVD坏了,怎么倒着放的"
    },
    {
        movie_name: "失眠症",
        pic_src: "/images/movie_pic/insomnia.jpg",
        comment: "诺兰的牛逼来源于内心散发出的恐惧。"},
    {
        movie_name: "蝙蝠侠·侠影之谜",
        pic_src: "/images/movie_pic/batmanbegins.jpg",
        comment: "诺兰赋予了蝙蝠侠以新的生命~~"},
    {
        movie_name: "致命魔术",
        pic_src: "/images/movie_pic/prestige.jpg",
        comment: "他选择了和他妻子一样的死法。100次。"},
    {
        movie_name: "蝙蝠侠·黑暗骑士",
        pic_src: "/images/movie_pic/darkknight5.jpg",
        comment: "光明与黑暗是同一个人的两张脸"},
    {
        movie_name: "盗梦空间",
        pic_src: "/images/movie_pic/Inception.jpg",
        comment: "Nolan给了我们一场无法盗取的梦。" },
    {
        movie_name: "蝙蝠侠·黑暗骑士崛起",
        pic_src: "/images/movie_pic/darkknight2.jpg",
        comment: "拍出了黑暗英雄的铁血丹心，但没能超越《黑暗骑士》。配乐超赞！"},
    {
        movie_name: "星际穿越",
        pic_src: "/images/movie_pic/intersteller.jpg",
        comment: "你的鹤发或许是我的童颜，而我一次呼吸能抵过你此生的岁月。"},
    {
        movie_name: "敦刻尔克",
        pic_src: "/images/movie_pic/dunkirk.jpeg",
        comment: "诺兰对卡梅隆说：'我来教教你怎么拍沉船.'"}
];

var newPicPath = "";
intiateList();
getUserInfo();

// 初始化电影列表
function intiateList() {
    $('li').remove();

    setTimeout(200);
    for(var i = movie_list.length -1 ; i >= 0; i--) {
        $('#pic-list').append("<li ><div class='movie_detail_container'>" +
            "<img src='" + movie_list[i].pic_src + "' width='255' height='290'>" +
            "<p class='movie_name'>《 " + movie_list[i].movie_name + "》</p>" +
            "<p style='font-size: 13px;'>" + movie_list[i].comment + "</p>" +
            "<img id='" + i +"' src='../images/icon/导出.png' width='20' onclick='toEdit(id)'>" +
            "</div></li>")
    }

}

function toEdit(id) {
    window.location.href = encodeURI("./editPic?url=" + movie_list[id].pic_src);
}

// 点击上传图片按钮
$('#upload-button').click(function () {
    //获取上传的File对象，此处是一张图片对象
    var file = document.getElementById("choose").files[0];

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
            newPicPath = data.filePath;
        },
        error: function (err) {
            console.log(err.message);
        }
    })
});

// 点击提交按钮
$('#submit-button').click(function () {
    var movieName = $("input[name='movieName']").val();
    var comment = $("input[name='comment']").val();

    if (movieName === "" || comment === "") {
        alert("请填写电影名称和评论～");
        return;
    }

    if (newPicPath === "") {
        alert("请上传图片～");
        return;
    }

    var newMemory = {
        movie_name: movieName,
        comment: comment,
        pic_src: newPicPath
    };
    movie_list.push(newMemory);
    intiateList();
});

// 得到用户信息
function getUserInfo() {
    $.ajax({
        type: 'GET',
        url: '/info',
        success: function (res) {
            console.log(res);
            var userData = res[0];
            // 设置界面
            $('#name').text(userData.name);
            $('#username').text(userData.username);
            $('#description').text('"'+ userData.description + '"');
            $('#tags').text(userData.prefer);
        }
    })
}