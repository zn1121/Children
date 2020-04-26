const db = require('../../lib/model/db').db;

//搜索好物
exports.goods = function(req,res){
    let search_info = req.query.search_info_good;
    db.query(`select * from goods where name like '%${search_info}%'`,[search_info],(err,result)=>{
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

//点击好物分类
exports.goods_category = function(req,res){
    let category = req.query.category;
    db.query('select id,name,img,category from goods where category=?',[category],(err,result)=>{
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


//热门搜索
exports.goods_hot = function(req,res){
    let hot = ["橄榄油","护肤","奶粉","食物","玩具","零食"]
    res.send(hot)
}

//获取商品详情
exports.good_info = function(req,res){
    let good_id = req.query.good_id;
    db.query('select * from good_info where id=?',[good_id],(err,result)=>{
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