"use strict";

var movie_list = [];
var tag_list = [];
getHotMemento();
getHotTags();

function getHotMemento() {
    $.ajax({
        type: 'GET',
        url: '/getMementoList',
        success: function (res) {
            movie_list = res;
            initiateMementoList(res);
        }
    })
}

function getHotTags() {
    $.ajax({
        type: 'GET',
        url: '/getMementoList',
        success: function (res) {
            tag_list = res;
            initiateTagList(res);
        }
    });
}

// 初始化电影列表
function initiateMementoList(movie_list) {
    $('li').remove();

    setTimeout(200);
    for(var i = 0; i <= 4; i++) {
        $('#pic-list').append("<li ><div id='" + i +"' class='movie_detail_container'>" +
            "<img style='cursor: pointer' src='" + movie_list[i].picurl + "' width='220' height='250' onclick='toEdit(id) />" +
            "<p class='movie_name'>《 " + movie_list[i].movieName + "》</p>" +
            "<p style='font-size: 12px;'>" + '\"' + movie_list[i].comment + '\"' + "</p>" +
            "<div style='display: flex;'><p style='margin: 0px 10px 5px 20px; font-size: 16px'> " + movie_list[i].popularity + "</p>" +
            "<img style='cursor: pointer' width='20' height='20' src='/images/icon/爱心.png' /></div>" +
            "</div></li>")
    }

}

function initiateTagList(tag_list) {

}

function toEdit(id) {
    window.location.href = encodeURI("./editPic?url=" + movie_list[id].mementoID);
}
