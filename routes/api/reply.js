const db = require('../../lib/model/db').db;
var moment = require('moment');

//回复文章
exports.reply = function (req, res) {
    var { reply_user, reply_content, article, official } = req.query;
    let date = moment().format("YYYY-MM-DD HH:mm:ss");
    db.query('insert into reply (reply_content,reply_author,reply_date,authority,article) values (?,?,?,?,?)', [reply_content, reply_user, date, official, article], (err, result) => {
        if (err) {
            res.send({
                status: 0,
                info: 'error',
                message: '数据库错误'
            })
        } else {
            res.send(200)
        }
    })
}

//回复的子回复
exports.child_reply = function (req, res) {
    let { content, author, official, reply_id } = req.query;
    let date = moment().format("YYYY-MM-DD HH:mm:ss");
    db.query('insert into reply_child (reply_child_content,reply_child_author,reply_child_date,reply_child_official,reply) values (?,?,?,?,?)', [content, author, date, official, reply_id], (err, result) => {
        if (err) {
            res.send({
                status: 0,
                info: 'error',
                message: '数据库错误'
            })
        } else {
            res.send(200)
        }
    })
}