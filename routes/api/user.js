const db = require('../../lib/model/db').db;
const moment = require('moment');
//用户登录
exports.login = function (req, res) {
    const { user_name, password } = req.query;
    var sql = `select * from user where user_name='` + user_name + `' and password=` + password;
    db.query(sql, (err, result) => {
        if (err) {
            res.send({
                status: 0,
                info: 'error',
                message: '数据库错误'
            })
        } else {
            if (result.length == 0) {
                res.send("用户名输入错误或密码输入错误!")
            } else {
                var time = moment().format("X");
                var random = Math.floor(Math.random() * (Math.floor(100) - Math.ceil(11))) + Math.ceil(11)
                var msg = "yebkpt";
                var token = time + user_name + random + msg;
                db.query('insert into token (user_name,token) values (?,?)', [user_name, token], (err, result_t) => {
                    if (err) {
                        res.send({
                            status: 0,
                            info: 'error',
                            message: '数据库错误'
                        })
                    } else {
                        res.send(token);
                    }
                })

            }
        }
    })

}
//用户注册
exports.register = function (req, res) {
    const { user_name, password } = req.query;
    db.query('select user_name from user where user_name=?', [user_name], (err, result) => {
        if (err) {
            res.send({
                status: 0,
                info: 'error',
                message: '数据库错误'
            })
        } else {
            if (result.length !== 0) {
                res.send("用户名已存在!")
            } else {
                var time = moment().format("X");
                var random = Math.floor(Math.random() * (Math.floor(100) - Math.ceil(11))) + Math.ceil(11)
                var msg = "yebkpt";
                var token = time + user_name + random + msg;
                db.query('insert into user (user_name,password) values (?,?)', [user_name, password], (err, result_r) => {
                    if (err) {
                        res.send({
                            status: 0,
                            info: 'error',
                            message: '数据库错误'
                        })
                    } else {
                        db.query('insert into token (user_name,token) values (?,?)', [user_name, token], (err, result_t) => {
                            if (err) {
                                res.send({
                                    status: 0,
                                    info: 'error',
                                    message: '数据库错误'
                                })
                            } else {
                                res.send(token);
                            }
                        })
                    }
                })
            }
        }
    })
}
//退出登录
exports.loginout = function (req, res) {
    const { user_name } = req.query;
    db.query("delete from token where user_name=?", [user_name], (err, result) => {
        if (err) {
            res.send({
                status: 0,
                info: 'error',
                message: '数据库错误'
            })
        } else {
            res.send("注销成功！")
        }
    })
}
//验证token
exports.check_token = function (req, res) {
    const token = req.query.token;
    console.log(token)
    db.query('select * from token where token=?', [token], (err, result) => {
        if (err) {
            res.send({
                status: 0,
                info: 'error',
                message: '数据库错误'
            })
        } else {
            res.send("token存在，可以登陆！")
        }
    })
}