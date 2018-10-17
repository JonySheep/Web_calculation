"use strict";

var editButtons = document.getElementById("edit-buttons");
var operationButtons = document.getElementById("operation-buttons");
var scaleCount = 0;

var url = decodeURI(window.location.href);
var picUrl = url.split("?url=")[1];
$('#curImg').attr('src', picUrl);

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
 * 缩小代码一倍
 */
function shrink() {
    $('#curImg').cropper('zoom', -1);
    scaleCount -= 1;
}

function toCenter() {
    window.location.href = "../html/DirectorDetailPage.html"
}

function toConnectPage() {
    window.location.href = "../html/ChooseConnectPicsPage.html"
}