const db = require('../../lib/model/db').db;

exports.search = function (req, res) {
    var search_info = req.query.search_info;
    db.query(`select * from article where title like '%${search_info}%'`, [search_info], (err, result) => {
        if (err) {
            res.send({
                status: 0,
                info: 'error',
                message: '数据库错误'
            })
        } else {
            for (let i = 0; i < result.length; i++) {
                db.query('select * from reply where article=?', [result[i].id], (err, result_reply) => {
                    if (err) {
                        res.send({
                            status: 0,
                            info: 'error',
                            message: '数据库错误'
                        })
                    } else {
                        result[i].reply = result_reply
                    }
                })
            }
            setTimeout(() => {
                res.send(result)
            }, 500);
        }
    })
}

//获取文章详情接口
exports.article = function(req,res){
    var id = req.query.id;
    db.query('select * from article where id=?',[id],(err,result)=>{
        if (err) {
            res.send({
                status: 0,
                info: 'error',
                message: '数据库错误'
            })
        }else{
            res.send(result);
        }
    })
}
