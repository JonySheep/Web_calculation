var srcList = [
    "../assets/movie_pic/darkknight2.jpg",
    "../assets/movie_pic/memento.jpg",
    "../assets/movie_pic/prestige.jpg",
    "../assets/movie_pic/dunkirk2.jpg",
    "../assets/movie_pic/Inception.jpg",
    "../assets/movie_pic/batmanbegins.jpg",
    "../assets/movie_pic/following.jpg",
    "../assets/movie_pic/darkknight4.jpg"
];
var chosenList = [];

for(var i = 0; i < srcList.length; i++) {
    $('.chosen-pics-container').append("<li id='" + i + "'" +
        "onclick='choosePic(id)'>" +
        "<img src='" + srcList[i] + "' " +
        "height='150' " +
        "class='chosen-pic'></li>");
};
// if(chosenList.length === 0) {
//     $('#connected-pic').style.height = '500px' ;
// } else {
//     $('#connected-pic').style.height = '100%' ;
// }

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
            $('#connected-pic').append("<img src='" + srcList[id] +"' width='500' height='800' class='each-connect-pic'>");
            break;
        }
        case 2 : {
            $('#connected-pic').append("<img src='" + srcList[id] +"' width='250' height='400' class='each-connect-pic'>");
            break;
        }
        case 3 : {
            $('#connected-pic').append("<img src='" + srcList[id] +"' width='250' height='400' class='each-connect-pic'>");
            break;
        }
        default :{
            $('#connected-pic').append("<img src='" + srcList[id] +"' width='250' height='400' class='each-connect-pic'>");
        }
    }

}