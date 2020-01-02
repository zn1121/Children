var checkLogin = function(req,res,next){
    if (req.session.userinfo) {
        next()
      } else {
        res.send("未登录，请登录")
        console.log("去登陆的界面")
      }
}
exports.checkLogin = checkLogin;