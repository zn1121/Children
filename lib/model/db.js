const mysql = require('mysql');


var db = mysql.createConnection({
    host: "39.96.50.201",
    user: "root",
    password: "123456",
    database: "children",
    useConnectionPooling: true,
})//数据库连接配置

var session = mysql.createConnection({
    host: "39.96.50.201",
    user: "root",
    password: "123456",
    database: "session_children",
    useConnectionPooling: true,
})//数据库连接配置

exports.db = db
exports.session = session