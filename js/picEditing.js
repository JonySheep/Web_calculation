"use strict";

function initiate() {
    var canvas = document.getElementById("canvas");
    var context = canvas.getContext("2d");
    console.log(canvas);
    var img = new Image();
    img.src = "../assets/movie_pic/darkknight2.jpg";
    context.drawImage(img, 0, 0, 500, 500);
}

function clockwiseRotate() {
    var canvas = document.getElementById("canvas");
    var context = canvas.getContext("2d");
    var img = new Image();
    img.src = "../assets/movie_pic/darkknight2.jpg";
    context.rotate(Math.PI / 2);
    context.drawImage(img, 0, 0, 500, 500);
}