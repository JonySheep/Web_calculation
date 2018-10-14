"use strict";

var cropButtons = document.getElementById("crop_buttons");
cropInitial();

function cropInitial() {
    $('#curImg').cropper({
        viewMode: 1,
        dragMode: 'none',
        preview: ".small",
        responsive: false,
        restore: false,
        //        modal:false,
        //        guides:false,
        //        background:false,
        autoCrop: false,
        //        autoCropArea:0.1,
        //        movable:false,
        scalable:false,
        zoomable:false,
        //        wheelZoomRatio:false,
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

    cropButtons.style.visibility = "visible";
}

/**
 * 保存图片
 */
function cropSave() {
    cropButtons.style.visibility = "hidden";

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
    cropButtons.style.visibility = "hidden";
    $('#curImg').cropper('destroy');
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