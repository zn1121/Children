var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var logger = require('morgan');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var db = require('./lib/model/db');
var middleware = require('./lib/model/middleware/middleware');
var auth = require('./routes/auth');
var cors = require("cors");
var app = express();

var user = require('./routes/api/user');
//配置session中间件
app.use(middleware.setSession)

app.use(cors());//设置跨域

// view engine setup//删除如果接口请求错会报错
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));//这个是配置日志的

app.use(express.json());//使用JSON有效负载分析传入请求
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser('token'));//自定义字符串，用来对cookie进行签名，提高安全性
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
// app.all('/users', usersRouter);//all函数会将所有的请求都执行，use只执行当前路径得到中间件

app.use('/userApi', auth.checkLogin)//作为中间件，只要是带/userApi都需要登录
app.get('/userApi/user', user.user)
app.get('/users', user.users)
app.get('/userApi/userss', user.userss)

//登录、登出用户、session有效期是一小时
app.get('/login', user.login)
app.get('/loginout', user.loginout)


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
