"use strict";

var movie_list = [];
var tag_list = [];
getHotMemento();
getHotTags();

function getHotMemento() {
    $.ajax({
        type: 'GET',
        url: '/hotMementos',
        success: function (res) {
            movie_list = res;
            initiateMementoList(res);
        }
    })
}

function getHotTags() {
    $.ajax({
        type: 'GET',
        url: '/hotTags',
        success: function (res) {
            tag_list = res;
            initiateTagList(res);
        }
    });
}

// 初始化电影列表
function initiateMementoList(movie_list) {
    for(var i = 0; i < movie_list.length ; i++) {
        $('#pic-list').append("<li ><div class='movie_detail_container'>" +
            "<img id='" + i +"' style='cursor: pointer' src='" + movie_list[i].picurl + "' width='220' height='250' onclick='toEdit(id)' />" +
            "<p class='movie_name'>《 " + movie_list[i].movieName + "》</p>" +
            "<p style='font-size: 12px;height: 30px'>" + '\"' + movie_list[i].comment + '\"' + "</p>" +
            "<div style='display: flex;' id='" + i +"'>" +
            "<p id='likeNum" + i +"' style='margin: 0px 10px 5px 20px; font-size: 16px'> " + movie_list[i].likeNum + "</p>" +
            "<img id='m" + i +"' class='likeIcon' style='cursor: pointer' width='20' height='20' src='/images/icon/爱心.png' onclick='like(id)'/></div>" +
            "</div></li>")
    }

}

function initiateTagList(tag_list) {
    for(var i = 0; i < tag_list.length ; i++) {
        $('#tag-list').append("<li style='margin-left: 100px'><button class='tag'>" + tag_list[i].tagName + "</button></li>")
    }
}

function toEdit(id) {
    $.ajax({
        type: 'GET',
        url: '/brows/' + movie_list[id].mementoID,
        success: function () {
            window.location.href = encodeURI("./editPic?url=" + movie_list[id].mementoID);
        }
    });
}

function like(id) {
    var mid = movie_list[id.substring(1)].mementoID;
    $.ajax({
        type: 'GET',
        url: '/like/' + mid,
        success: function () {
            var likeNum = Number($('#likeNum' + id.substring(1)).text());
            $('#likeNum' + id.substring(1)).text(likeNum+1);
            $('#m' + id.substring(1)).attr('src', '/images/icon/爱心 _实心.png');
        }
    })
}


function toMoviePage() {
    window.location.href = '/movies';
}


function toTagPage() {
    window.location.href = '/tags';
}