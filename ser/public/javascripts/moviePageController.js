"use strict";
var movie_list = [];
getAllMemento();

function getAllMemento() {
    $.ajax({
        type: 'GET',
        url: '/getMovie',
        success : function (res) {
            movie_list = res;
            initMovieList('movie-list',res);
        }
    })
}

function initMovieList(list_id,list) {
    for(var i = 0; i < list.length ; i++) {
        $("#" + list_id).append("<li ><div class='movie_detail_container'>" +
            "<img id='" + i +"' style='cursor: pointer' src='" + list[i].picurl + "' width='220' height='250' onclick='toEdit(id)' />" +
            "<p class='movie_name'>《 " + list[i].movieName + "》</p>" +
            "<p style='font-size: 12px;height: 30px'>" + '\"' + list[i].comment + '\"' + "</p>" +
            "<div style='display: flex;' id='" + i +"'>" +
            "<p id='likeNum" + i +"' style='margin: 0px 10px 5px 20px; font-size: 16px'> " + list[i].likeNum + "</p>" +
            "<img id='m" + i +"' class='likeIcon' style='cursor: pointer' width='20' height='20' src='/images/icon/爱心.png' onclick='like(id)'/></div>" +
            "</div></li>")
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


$('#search-movie-button').click(function () {
    var data = {
        inputKeyword: $('#search-movie-input').val()
    };
    console.log(data);
    $.ajax({
        type: 'POST',
        url: '/getMovie',
        data: data,
        success: function (res) {
            if (res.length !== 0) {
                movie_list = res;
                $('.search-result-container').css('display', 'block');
                $('.search-result-container').css('height', '520px');
                initMovieList('search-result',res);
            } else {
                alert('无搜索结果');
            }
        }
    })
});