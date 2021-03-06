"use strict";
var express = require('express');
var router = express.Router();
var path = require('path');

// 手机验证相关
var AV = require('leancloud-realtime');

// 连接数据库
var db = require('./dbController');
db.connect();

// crypto模块用于加密
var crypto = require('crypto');

/**
 * 首页
 */
router.route('/')
    .get(function (req, res) {
        res.render('MementoCenterPage', {title: '记忆大厅', username: req.session.username});
    });


router.get('/home', function (req, res) {
    authentication(req, res);
    res.render('MemoryHomePage', {title: '我的Memento', username: req.session.username});
});


router.get('/movies', function (req, res) {
    res.render('MoviePage');
});


router.get('/tags', function (req, res) {
    res.render('TagPage');
});


/**
 * 电影页
 * get:得到所有电影
 * post:根据关键字搜索电影
 */
router.route('/getMovie')
    .get(function (req, result) {
        var promise = db.getMementoList();
        promise.then(function (value) {
            if (value !== null) {
                result.status(200).send(value);
            } else {
                result.sendStatus(500);
            }
        })
    })
    .post(function (req, result) {
        var keyword = req.body.inputKeyword;
        var promise = db.searchMovie(keyword);
        promise.then(function (value) {
            if (value !== null) {
                result.status(200).send(value);
            } else {
                result.sendStatus(500);
            }
        })
    });

/**
 * 标签页
 * get:得到所有标签
 * post:根据关键字搜索标签
 */
router.route('/getTag')
    .get(function (req, result) {
        var promise = db.getTagList();
        promise.then(function (value) {
            if (value !== null) {
                result.status(200).send(value);
            } else {
                result.sendStatus(500);
            }
        })
    })
    .post(function (req, result) {
        var keyword = req.body.inputKeyword;
        var promise = db.searchTag(keyword);
        promise.then(function (value) {
            if (value !== null) {
                result.status(200).send(value);
            } else {
                result.sendStatus(500);
            }
        })
    });


/**
 * 登录
 */
router.route('/login')
    .get(function (req, res) {
        res.render('LoginPage', {title: '用户登录'});
    })
    .post(function (req, result) {
        var username = req.body.username;
        var password = req.body.password;

        // 对密码进行加密
        var md5 = crypto.createHash("md5");
        var newPass = md5.update(password).digest("hex");

        // login
        var promise = db.login(username, newPass);
        promise.then(function (value) {
            if(value) {
                // 登录成功，设置session
                req.session.username = username;
                result.status(200).send('登录成功');
            } else {
                alert('网络连接错误');
                result.sendStatus(500);
            }
        });
    });

/**
 * 登出
 */
router.get('/logout', function (req, res) {
    req.session.username = null; // 删除session
    res.sendStatus(200);
});


/**
 * 检查是否有用户登录
 */
router.get('/isLogin', function (req, res) {
   res.send(req.session.username !== undefined);
});

/**
 * 注册
 */
router.route('/register')
    .get(function (req, res, next) {
        res.render('RegisterPage', {title: '注册'});
        next();
    })
    .post(function (req, result) {
        var username = req.body.username;
        var password = req.body.password;

        // 对密码进行加密
        var md5 = crypto.createHash("md5");
        var newPass = md5.update(password).digest("hex");

        // 注册
        var promise = db.register(username, newPass);
        promise.then(function (value) {
            if (value) {
                result.sendStatus(200);
            } else {
                result.send('用户已存在');
            }
        });
    });


/**
 * 图片编辑
 */
router.get('/editPic', function (req, res) {
    authentication(req, res);
    res.render('MementoDetailPage', {title: '查看memento'});
});


/**
 * 图片合成
 */
router.get('/connectPic', function (req, res) {
    authentication(req, res);
    res.render('ChooseConnectPicsPage', {title: '图片合成'});
});


/**
 * 用户个人中心
 */
router.route('/user')
    .get(function (req, result) {
        // 检测是否登录
        authentication(req, result);
        result.render('UserSettings', {username: req.session.username, title: '个人中心'});
    });

/**
 * 得到/更新用户个人资料
 */
router.route('/info')
    .get(function (req, result) {
        var username = req.session.username;

        var promise = db.getUserInfo(username);
        promise.then(function (value) {
            if (value !== null) {
                result.send(value);
            } else {
                result.sendStatus(500);
            }

        })
    })
    .post(function (req, result) {
        var name = req.body.inputName;
        var desc = req.body.inputDesc;
        var tags = req.body.inputTags;
        var username = req.session.username;

        var promise = db.updateUserInfo(name, desc, tags, username);
        promise.then(function (value) {
            if (value) {
                result.sendStatus(200);
            } else {
                result.sendStatus(500);
            }
        });
    });

/**
 * 实现图片存储
 * @type {multer}
 */
var multer = require('multer');
//选择diskStorage存储
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.resolve('public/images/upload'));
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));//增加了文件的扩展名
    }
});

var upload = multer({storage: storage});


/**
 * 图片上传（仅客户端）
 */
router.post('/upload', upload.single('pic') , function (req, res) {
    res.send({
        err: null,
        //filePath:就是图片在项目中的存放路径
        filePath: 'images/upload/' + path.basename(req.file.path)
    });
});


/**
 * 新增memento
 */
router.post('/addMemento', function (req, result) {
    var username = req.session.username;
    var movieName = req.body.movie_name;
    var picUrl = req.body.pic_src;
    var comment = req.body.comment;

    var promise = db.addMemento(username, movieName, comment, picUrl);
    promise.then(function (value) {
        if (value) {
            result.sendStatus(200);
        } else {
            result.sendStatus(500);
        }
    })
});


/**
 * 根据用户名获得用户发布的memento影评
 */
router.get('/getUserMementos', function (req, result) {
    var username = req.session.username;

    var promise = db.getUserMementos(username);
    promise.then(function (value) {
        if (value !== null) {
            result.status(200).send(value);
        } else {
            result.sendStatus(500);
        }
    })
});


/**
 * 根据mementoID得到具体信息
 */
router.get('/memento/:mid', function (req, result) {
    var mementoID = req.params.mid;

    var promise = db.getMemento(mementoID);
    promise.then(function (value) {
        if (value !== null) {
            result.status(200).send(value);
        } else {
            result.sendStatus(500);
        }
    })

});


/**
 * 得到某个Memento的所有标签
 */
router.route('/tags/:mid')
    .get(function (req, result) {
        var mementoID = req.params.mid;

        var promise = db.getTags(mementoID);
        promise.then(function (value) {
            if (value !== null) {
                result.status(200).send(value);
            } else {
                result.sendStatus(500);
            }
        })
    })
    .post(function (req, result) {
        var mementoID = req.params.mid;
        var tagName = req.body.name;

        var promise = db.addTags(mementoID, tagName);
        promise.then(function (value) {
            if (value) {
                result.sendStatus(200);
            } else {
                result.sendStatus(500);
            }
        })
    });


/**
 * 得到热门的Memento
 */
router.get('/hotMementos', function (req, result) {
    var promise = db.getHotMemento();
    promise.then(function (value) {
        if (value !== null) {
            result.status(200).send(value);
        } else {
            result.sendStatus(500);
        }
    })
});


/**
 * 得到热门的tas
 */
router.get('/hotTags', function (req, result) {
    var promise = db.getHotTags();
    promise.then(function (value) {
        if (value !== null) {
            result.status(200).send(value);
        } else {
            result.sendStatus(500);
        }
    })
});


/**
 * 喜欢一个Memento，可以增加其流行度和其标签的流行度
 */
router.get('/like/:mid', function (req, result) {
    var promise = db.likeMemento(req.params.mid);
    promise.then(function (value) {
        console.log(value);
        if (value) {
            result.sendStatus(200);
        } else {
            result.sendStatus(500);
        }
    })
});


/**
 * 浏览一个Memento，可以增加其流行度
 */
router.get('/brows/:mid', function (req, result) {
    var promise = db.browsMemento(req.params.mid);
    promise.then(function (value) {
        if (value) {
            result.sendStatus(200);
        } else {
            result.sendStatus(500);
        }
    })
});

/**
 * 检测访问权限
 * @param req
 * @param res
 */
function authentication(req, res) {
    if(req.session.username === undefined) {
        return res.redirect('/login');
    }
}

module.exports = router;