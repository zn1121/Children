var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var logger = require('morgan');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var MySQLStore = require('express-mysql-session')(session);
var db = require('./lib/model/db')

var cors = require("cors");
var app = express();

var user = require('./routes/api/user');
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
app.use(session({//判断session，进行身份验证
  secret: 'token',
  resave: false,
  saveUninitialized: false,
  store: sessionStore,
  cookie: ('name', 'value', {
    maxAge: 60 * 60 * 1000 * 24,
    secure: false,
    name: "seName",
    resave: false
  })
}))
//-------------------------配置session中间件----------------------

app.use(cors());//设置跨域

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser('token'));//自定义字符串，用来对cookie进行签名，提高安全性
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.all('/users', usersRouter);

app.use('/userApi', function (req, res, next) {//作为中间件，只要是带/userApi都需要登录
  if (req.session.userinfo) {
    next()
  } else {
    res.send("未登录，请登录")
    console.log("去登陆的界面")
    
  }
})
app.all('/userApi/user', user.user)
app.all('/users', user.users)
app.all('/userApi/userss', user.userss)


app.all('/login', user.login)
app.all('/loginout', user.loginout)


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
