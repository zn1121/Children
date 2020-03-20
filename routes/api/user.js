const db = require('../../lib/model/db').db;
var express = require('express');
var router = express.Router();

exports.user = function (req, res) {
    console.log(req.session)
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
        res.send({
            status: 2,
            info: 'error',
            message: '未登录'
        })
        console.log("未登录")
    }
}
exports.users = function (req, res) {
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

}
exports.userss = function (req, res) {
    console.log(req.session)
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

}


// exports.login = function (req, res) {
//     req.session.userinfo = '李四';//设置session
//     res.send("登陆成功！");
// }
// exports.loginout = function (req, res) {
//     req.session.destroy(function (err) {
//         res.send("退出登录！" + err);
//     });
// }