const db = require('../../lib/model/db').db;
var express = require('express');
var router = express.Router();

exports.search = function (req, res) {
    var search_info = req.query.search_info;
    var result_info = [];
    var p = new Promise((resolve, reject) => {
        db.query(`select * from article where title like '%${search_info}%'`, [search_info], (err, result) => {
            if (err) {
                res.send({
                    status: 0,
                    info: 'error',
                    message: '数据库错误'
                })
            } else {
                resolve(result)
            }
        })
    }).then((r) => {
        for (let i = 0; i < r.length; i++) {
            db.query('select * from reply where id=?', [r[i].reply_id], (err, result_reply) => {
                if (err) {
                    res.send({
                        status: 0,
                        info: 'error',
                        message: '数据库错误'
                    })
                } else {
                    r[i].reply = result_reply
                    result_info[i] = r
                }
            })
        }
        setTimeout(()=>{
            res.send(result_info)
        },500);
    })

}