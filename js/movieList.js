var movie_list = [
    {
        moive_eng_name: "Following",
        moive_chi_name: "追随",
        pic_src: "../assets/movie_pic/following.jpg",
        year: 1998,
        mark: 7.6,
        imdbUrl: "https://www.imdb.com/title/tt0154506/?ref_=nm_flmg_wr_14"
    },
    {
        moive_eng_name: "Memento",
        moive_chi_name: "记忆碎片",
        pic_src: "../assets/movie_pic/memento.jpg",
        year: 2000,
        mark: 8.5,
        imdbUrl: "https://www.imdb.com/title/tt0209144/?ref_=tt_rec_tt"
    },
    {
        moive_eng_name: "Insomnia",
        moive_chi_name: "失眠症",
        pic_src: "../assets/movie_pic/insomnia.jpg",
        year: 2002,
        mark: 7.2,
        imdbUrl: "https://www.imdb.com/title/tt0278504/?ref_=nm_flmg_dr_9"
    },
    {
        moive_eng_name: "Batman Begins",
        moive_chi_name: "蝙蝠侠·侠影之谜",
        pic_src: "../assets/movie_pic/batmanbegins.jpg",
        year: 2005,
        mark: 8.3,
        imdbUrl: "https://www.imdb.com/title/tt0372784/?ref_=tt_rec_tt"
    },
    {
        moive_eng_name: "The Prestige",
        moive_chi_name: "致命魔术",
        pic_src: "../assets/movie_pic/prestige.jpg",
        year: 2006,
        mark: 8.5,
        imdbUrl: "https://www.imdb.com/title/tt0482571/?ref_=tt_rec_tt"
    },
    {
        moive_eng_name: "The Dark Knight",
        moive_chi_name: "蝙蝠侠·黑暗骑士",
        pic_src: "../assets/movie_pic/darkknight5.jpg",
        year: 2008,
        mark: 9.0,
        imdbUrl: "https://www.imdb.com/title/tt0468569/?ref_=tt_rec_tt"
    },
    {
        moive_eng_name: "Inception",
        moive_chi_name: "盗梦空间",
        pic_src: "../assets/movie_pic/Inception.jpg",
        year: 2010,
        mark: 8.8,
        imdbUrl: "https://www.imdb.com/title/tt1375666/?ref_=tt_rec_tt"
    },
    {
        moive_eng_name: "The Dark Knight Rises",
        moive_chi_name: "蝙蝠侠·黑暗骑士崛起",
        pic_src: "../assets/movie_pic/darkknight2.jpg",
        year: 2012,
        mark: 8.4,
        imdbUrl: "https://www.imdb.com/title/tt1345836/?ref_=tt_rec_tt",
    },
    {
        moive_eng_name: "Intersteller",
        moive_chi_name: "星际穿越",
        pic_src: "../assets/movie_pic/intersteller.jpg",
        year: 2014,
        mark: 8.6,
        imdbUrl: "https://www.imdb.com/title/tt0816692/?ref_=nm_knf_t2"
    },
    {
        moive_eng_name: "Dunkirk",
        moive_chi_name: "敦刻尔克",
        pic_src: "../assets/movie_pic/dunkirk.jpeg",
        year: 2017,
        mark: 8.0,
        imdbUrl: "https://www.imdb.com/title/tt5013056/?ref_=nm_knf_i4"
    }
]

for(var i = 0; i< movie_list.length; i++) {
    $('#pic-list').append("<li ><div class='movie_detail_container'>" +
        "<img src='" + movie_list[i].pic_src + "' width='240' height='290'>" +
        "<p class='movie_name'>《 " + movie_list[i].moive_eng_name + "》</p>" +
        "<p>" + movie_list[i].moive_chi_name + "(" + movie_list[i].year + ")</p>" +
        "<div style='display: flex'>" +
        "<a style='margin-left: 50px;margin-right: 10px' href='" + movie_list[i].imdbUrl +"'>IMDB：" + movie_list[i].mark +"/10.0</a>" +
        "<div style='height: 20px;width: 20px;border: black 1px solid;border-radius: 3px;padding: 3px;cursor: pointer'>" +
        "<img id='" + i +"' src='../assets/icon/导出.png' width='20' onclick='toEdit(id)'></div></div>" +
        "</div></li>")
}

function toEdit(id) {
    console.log(id);
    window.location.href = encodeURI("../html/PicsEditingPage.html?url=" + movie_list[id].pic_src);
}

function Logout() {
    window.location.href = "../html/LoginPage.html";
}