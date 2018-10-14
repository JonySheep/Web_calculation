"use strict";

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
        //        zoomable:false,
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
}