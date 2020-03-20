const db = require('../../lib/model/db').db;
var express = require('express');
var router = express.Router();

exports.children = function (req, res) {
    var token_user = req.query.user;
    console.log("这是token——uesr",token_user);
    db.query('select * from children_info where user=?', [token_user], (err, result) => {
        if (err) {
            res.send({
                status: 0,
                info: 'error',
                message: '数据库错误'
            })
        } else {
            res.send(result);
            console.log("result2", result)
        }
    })
}

exports.today = function(req,res){
    db.query('select * from article order by rand() limit 3',(err,result)=>{
        if (err) {
            res.send({
                status: 0,
                info: 'error',
                message: '数据库错误'
            })
        } else {
            res.send(result)
        }
    })
}
