function toLoginPage() {
    window.location.href = '/login';
}

function toRegisterPage() {
    window.location.href = '/register';
}

function checkEmail(str) {
    var rule = /^[0-9a-zA-Z]+@[0-9a-zA-Z]+\.[a-zA-Z]{2,3}$/;
    return rule.test(str);
}

function checkPassword(pass, confirmPass) {
    console.log(pass);
    console.log(confirmPass);
    return pass === confirmPass ;
}

function login() {
    console.log($("input[name='username']"));
    if (!checkEmail($('input[name="username"]').val())) {
        alert('邮箱格式不正确');
    } else {
        //check password
        window.location.href = "/home";
    }
}

function register() {
    if (!checkEmail($('input[name="username"]').val())) {
        alert('邮箱格式不正确');
        return;
    }
    if(!checkPassword($('input[name="password"]').val(), $('input[name="confirmPassword"]').val())){
        alert('两次输入的密码不相同')
        return;
    }
    //check password
    window.location.href = "/login";
}