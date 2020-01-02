const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const db = require('../db')
//-------------------------配置session中间件----------------------
var sessionStore = new MySQLStore({
    expiration: 10800000,
    createDatabaseTable: true,  //是否创建表
    schema: {
        tableName: 'session_tab',   //表名
        columnNames: {      //列选项
            session_id: 'session_id',
            expires: 'expires',
            data: 'data'
        }
    }
}, db.session);
var setSession = session({//判断session，进行身份验证
    secret: 'token',
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    cookie: ('name', 'value', {
        maxAge: 60 * 60 * 1000 * 24,//设置session有效时长，单位毫秒
        secure: false,
        name: "seName",
        resave: false
    })
})
//-------------------------配置session中间件----------------------

exports.setSession = setSession


