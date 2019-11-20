const mysql = require('mysql');

var db = mysql.createConnection({
    host:"39.96.50.201",
    user:"root",
    password:"",
    database:"children"
})//数据库连接配置

var session = mysql.createConnection({
    host:"39.96.50.201",
    user:"root",
    password:"",
    database:"session_test"
})//数据库连接配置


exports.db = db
exports.session = session
