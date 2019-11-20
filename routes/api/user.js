const db = require('../../lib/model/db').db;

exports.user = function (req, res) {
    if (req.session.userinfo) {
        db.query('select * from user', (err, result) => {
            if (err) {
                res.send({
                    status: 0,
                    info: 'error',
                    message: '数据库错误'
                })
            } else {
                res.send(result);
                console.log(result)
            }
        })
    } else {
        res.end({
            status: 2,
            info: 'error',
            message: '未登录'
        })
        console.log("未登录，没有访问权限")
    }
}
exports.login = function (req, res) {
    req.session.userinfo = '李四';//设置session
    res.send("登陆成功！");
}
exports.loginout = function (req, res) {
    req.session.destroy(function (err) {
        res.send("退出登录！" + err);
    });
}
