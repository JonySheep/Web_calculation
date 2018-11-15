"use strict";

var editButtons = document.getElementById("edit-buttons");
var operationButtons = document.getElementById("operation-buttons");
var scaleCount = 0;

var url = decodeURI(window.location.href);
var mementoID = url.split("?url=")[1];

getMementoInfo(mementoID);
getMementoTags(mementoID);

function getMementoInfo(mid) {
    $.ajax({
        type: 'GET',
        url: '/memento/' + mid,
        success: function (res) {
            setInfo(res[0]);
        }
    })
}

function setInfo(mementoInfo) {
    $('#curImg').attr('src', mementoInfo.picurl);
    $('#memento-title').text('/电影列表/《' + mementoInfo.movieName + '》');

}

function getMementoTags(mid) {
    $.ajax({
        type: 'GET',
        url: '/tags/' + mid,
        success: function (res) {
            console.log(res);
            setTags(res);
        }
    })
}

function setTags(tagList) {
    $('li').remove();

    setTimeout(200);
    for(var i = tagList.length -1 ; i >= 0; i--) {
        $('.tagList').append("<li><button class='tag'>" + tagList[i].tagName + "</button></li>")
    }
    $('.tagList').append("<div style='display: flex'>" +
        "<input type='text' id='tag-input' style='margin-top: 20px'>" +
        "<div class='icon-button' style='height: 25px; width: 22px; margin-left: 5px'>" +
        "<img src='/images/icon/逆转.png' onclick='addTag()' width='20'></div></div>")
}


function addTag() {
    var tagName = {
        name: $('#tag-input').val()
    };

    $.ajax({
        type: 'POST',
        url: '/tags/' + mementoID,
        data: tagName,
        success: function () {
            // 成功添加后刷新
            window.location.reload();
        }
    })
}

//---------------------------for edit pic-----------------------------

function editInitial() {
    $('#curImg').cropper({
        viewMode: 1,
        dragMode: 'move',
        responsive: false,
        restore: false,
        //        modal:false,
        //        guides:false,
        background:false,
        autoCrop: false,
        //        autoCropArea:0.1,
        //        movable:false,
        // scalable:false,
        // zoomable:false,
        zoomOnWheel:false,
        //        cropBoxMovable:false,
        //        cropBoxResizable:false,
        ready: function () {
            console.log("ready");
            console.log(this);
            $(this).cropper('crop');
        },
        cropstart: function (e) {
            console.log(e);
            console.log("cropstart");
        },
        cropmove: function (e) {
            console.log("cropmove");
        },
        cropend: function (e) {
            console.log("cropend");
        },
        crop: function (e) {
            console.log("crop");
        },
        zoom: function (e) {
            console.log("zoom");
        },
    });

    editButtons.style.display = "flex";
    operationButtons.style.display = "none";
}

/**
 * 保存图片
 */
function cropSave() {
    editButtons.style.display = "none";
    operationButtons.style.display = "flex";

    console.log($('#curImg').cropper('getCroppedCanvas'));;
    var cas=$('#curImg').cropper('getCroppedCanvas');
    var base64url=cas.toDataURL('image/jpeg');
    cas.toBlob(function (e) {
        console.log(e);  //生成Blob的图片格式
    })

    $('#curImg').attr('src', base64url);
    console.log($('#curImg')); //生成base64图片的格式

    $('#curImg').cropper('destroy');
}

/**
 * 取消编辑
 */
function cropCancel() {
    editButtons.style.display = "none";
    operationButtons.style.display = "flex";
    $('#curImg').cropper('destroy');
    window.location.reload();
}

/**
 * 顺时针旋转图片
 */
function clockwiseRotate() {
    $('#curImg').cropper('rotate', 90 );
}

/**
 * 逆时针旋转图片
 */
function anticlockwiseRotate() {
    $('#curImg').cropper('rotate', -90 );
}

/**
 * 放大图片一倍
 */
function enlarge() {
    $('#curImg').cropper('zoom', 1);
    scaleCount += 1;
}

/**
 * 缩小图片一倍
 */
function shrink() {
    $('#curImg').cropper('zoom', -1);
    scaleCount -= 1;
}

function toCenter() {
    window.location.href = "/"
}

function toConnectPage() {
    window.location.href = "/connectPic"
}