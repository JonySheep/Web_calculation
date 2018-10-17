var srcList = [
    "../assets/movie_pic/darkknight2.jpg",
    "../assets/movie_pic/memento.jpg",
    "../assets/movie_pic/prestige.jpg",
    "../assets/movie_pic/dunkirk2.jpg",
    "../assets/movie_pic/Inception.jpg",
    "../assets/movie_pic/batmanbegins.jpg",
    "../assets/movie_pic/following.jpg",
    "../assets/movie_pic/intersteller.jpg",
    "../assets/movie_pic/insomnia.jpg",
    "../assets/movie_pic/darkknightrise.jpg"
];
var chosenList = [];

for(var i = 0; i < srcList.length; i++) {
    $('.chosen-pics-container').append("<li id='" + i + "'" +
        "onclick='choosePic(id)'>" +
        "<img src='" + srcList[i] + "' " +
        "height='150' " +
        "class='chosen-pic'></li>");
};

function recover() {
    window.location.reload();
}

/**
 * 点击一张图片的响应方法
 * @param id
 */
function choosePic(id) {
    chosenList.push(srcList[id]);
    console.log(id)
    console.log(chosenList)
    switch (chosenList.length) {
        case 1 : {
            $('.connected-container').attr('width', '500px');
            $('#connected-pic').append("<img src='" + srcList[id] +"' width='500' height='700' class='each-connect-pic'>");
            break;
        }
        case 2 : {
            twoPicsLayout();
            break;
        }
        case 3 : {
            threePicsLayout();
            break;
        }
        case 4 : {
            fourPicsLayout();
            break;
        }
        case 5 : {
            fivePicsLayout();
            break;
        }
        case 6 : {
            sixPicsLayout();
            break;
        }
        default :{
            alert("无法拼接六张以上的照片");
        }
    }

}

function twoPicsLayout() {
    $('#connected-pic').empty();
    appendBigPic(0);
    appendBigPic(1);
}

function threePicsLayout() {
    $('#connected-pic').empty();
    appendMiddlePic(0);
    appendMiddlePic(1);
    appendMiddlePic(2);
}

function fourPicsLayout() {
    $('#connected-pic').empty();
    appendSmallPic(0);
    appendSmallPic(1);
    appendSmallPic(2);
    appendSmallPic(3);
}

function fivePicsLayout() {
    $('#connected-pic').empty();
    appendBigPic(0);
    appendSmallPic(1);
    appendSmallPic(2);
    appendSmallPic(3);
    appendSmallPic(4);
}

function sixPicsLayout() {
    $('#connected-pic').empty();
    appendMiddlePic(0);
    appendMiddlePic(1);
    appendMiddlePic(2);
    appendMiddlePic(3);
    appendMiddlePic(4);
    appendMiddlePic(5);
}

function appendBigPic(id) {
    $('#connected-pic').append("<img src='" + chosenList[id] +"' width='500' height='700' class='each-connect-pic'>");
}

function appendMiddlePic(id) {
    $('#connected-pic').append("<img src='" + chosenList[id] +"' width='333' height='466' class='each-connect-pic'>");
}
function appendSmallPic(id) {
    $('#connected-pic').append("<img src='" + chosenList[id] +"' width='250' height='350' class='each-connect-pic'>");
}

function toCenter() {
    window.location.href = "./DirectorDetailPage.html";
}