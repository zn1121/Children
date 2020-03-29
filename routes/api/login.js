const db = require('../../lib/model/db').db;

exports.login = function (req, res) {
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
    // res.send("登陆成功！");
}
exports.loginout = function (req, res) {
    req.session.destroy(function (err) {
        res.send("退出登录！" + err);
    });
}