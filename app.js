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
var login = require('./routes/api/login');
var index = require('./routes/api/index');
var search = require('./routes/api/search');
var reply = require('./routes/api/reply');
var goods = require('./routes/api/goods');
var setting = require('./routes/api/my');

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
app.use('/v1/delet', auth.checkLogin)//作为中间件，只要是带/v1都需要登录


// app.get('/userApi/user', user.user)


//------------------首页API---------------
//获取孩子信息
app.get('/v1/children', index.children);
//获取今日育儿知识（两条）
app.get('/v1/today_article', index.today);
//------------------首页API---------------

//------------------搜索API---------------
app.get('/v1/search', search.search);
//------------------搜索API---------------

//------------------回复API---------------
//文章回复API
app.post('/v1/reply', reply.reply);
//文章回复的子回复
app.post('/v1/child_reply', reply.child_reply);
//------------------回复API---------------

//------------------好物模块---------------\
//搜索好物
app.get('/v1/goods_search', goods.goods);
//好物分类
app.get('/v1/goods_category', goods.goods_category);
//热门搜索
app.get('/v1/goods_hot', goods.goods_hot);//2020年3月24号
//获取商品详情
app.get('/v1/good_info', goods.good_info);
//------------------好物模块---------------


//------------------我的模块---------------
//编辑信息
app.get('/v1/edit', setting.edit);
//获取个人资料
app.get('/v1/getUserInfo', setting.getUserInfo);
//修改密码
app.get('/v1/pwd', setting.pwd);
//管理状态
app.get('/v1/status', setting.status);
//管理状态页进入宝宝信息
app.get('/v1/status_info', setting.status_info);
//添加宝宝
app.get('/v1/insert_baby', setting.insert_baby);
//测试
app.get('/test', setting.age);
//------------------我的模块---------------



//------------------用户模块---------------
//登录
app.get('/login', user.login);
//注册
app.get('/register', user.register);
//注销
app.get('/loginout', user.loginout);
//------------------用户模块---------------






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
