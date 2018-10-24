/**
 * 登录
 * @param connection
 * @param username
 * @param password
 */
function login(connection,username, password) {
    var loginSql = 'select password from user where username=' + username + ';';
    connection.query(loginSql, function (err, res) {
        if(err) {
            console.log('[INSERT ERROR] - ',err.message);
        } else {
            if(res === password) {
                return true;
            } else {
                return false;
            }
        }
    })
}

/**
 * 注册
 * @param connection
 * @param username
 * @param password
 */
function register(connection,username, password) {
    var regisSql = 'insert into user(username,password) values(' + username + ',' + password + ');';
    connection.query(regisSql, function (err, res) {
        if(err) {
            console.log('[INSERT ERROR] - ',err.message);
        } else {
            return true;
        }
    })
}