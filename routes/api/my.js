const db = require('../../lib/model/db').db;

exports.edit = function(req,res){
    let {img,name,phone,birth} = req.query;
    db.query('update user set phone=?,birth=?,img=? where user_name=?',[phone,birth,img,name],(err,result)=>{
        if (err) {
            res.send({
                status: 0,
                info: 'error',
                message: '数据库错误'
            })
        } else {
           res.send(200);
        }
    })
}

exports.pwd = function(req,res){
    let {old_password,password,user_name} = req.query;
    db.query('select password from login where user_name=?',[user_name],(err,result_p)=>{
        if (err) {
            res.send({
                status: 0,
                info: 'error',
                message: '数据库错误'
            })
        }else{
            if(old_password == result_p[0].password){
                db.query('update login set password=? where user_name=?',[password,user_name],(err,result)=>{
                    if (err) {
                        res.send({
                            status: 0,
                            info: 'error',
                            message: '数据库错误'
                        })
                    } else {
                        db.query('update token set password=? where user=?',[password,user_name],(err,result)=>{
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
                })
            }else{
                res.send("密码错误")
            }
        }
    })
}

//管理状态
exports.status = function(req,res){
    let user = req.query.user;
    db.query('select * from children_info where user=?',[user],(err,result)=>{
        if(err){
            res.send({
                status: 0,
                info: 'error',
                message: '数据库错误'
            })
        }else{
            res.send(result)
        }
    })
}
//管理状态页进入宝宝信息
exports.status_info = function(req,res){
    var id = req.query.id;
    db.query('select * from children_info where id=?',[id],(err,result)=>{
        if(err){
            res.send({
                status: 0,
                info: 'error',
                message: '数据库错误'
            })
        }else{
            res.send(result)
        }
    })
}
//添加宝宝
exports.insert_baby = function(req,res){
    var {name,birth,height,weight,sex,img,user} = req.query;
    db.query('insert into children_info (name,birth,weight,height,sex,picture,user) values (?,?,?,?,?,?,?)',[name,birth,weight,height,sex,img,user],(err,result)=>{
        if(err){
            res.send({
                status: 0,
                info: 'error',
                message: '数据库错误'
            })
        }else{
            res.send(200)
        }
    })
}
