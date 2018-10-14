"use strict";

var rotationCount = 0;
var img = document.getElementById("curImg");

/**
 * 顺时针旋转图片
 */
function clockwiseRotate() {
    rotationCount = rotationCount === 3 ? 0 : rotationCount + 1;
    img.style.webkitTransform = "rotate(" + 90 * rotationCount +"deg)";
    // if(rotationCount % 2 !== 0) {
    //     img.style.width = "60%";
    //     img.style.height = "60%";
    //     img.style.marginTop = "120px";
    // }
    // else {
    //     img.style.width = "100%";
    //     img.style.height = "100%";
    //     img.style.marginTop = "0px";
    // }
}

/**
 * 逆时针旋转图片
 */
function anticlockwiseRotate() {
    rotationCount = rotationCount === -3 ? 0 : rotationCount - 1;
    img.style.webkitTransform = "rotate(" + 90 * rotationCount +"deg)";
}