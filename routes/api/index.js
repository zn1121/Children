const db = require('../../lib/model/db').db;

exports.children = function (req, res) {
    var token_user = req.query.user;
    db.query('select * from children_info where user=?', [token_user], (err, result) => {
        if (err) {
            res.send({
                status: 0,
                info: 'error',
                message: '数据库错误'
            })
        } else {
            res.send(result);
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
