const router = require('koa-router')()
const jwt = require('jsonwebtoken')
const { SuccessModel, ErrorModel } = require('../model/resModel')
const { login,register } = require('../controller/account')

// router.prefix('/api/account')

router.post('/login', async function (ctx, next) {
    const { username, password } = ctx.request.body;
    const data = await login(username, password);
    if (data.username) {
        const token = jwt.sign({
            //token的创建日期
            time: Date.now(),
            //token的过期时间
            timeout: Date.now() + 60000,
            username: 'ctx.request.body.username',
            id: 1
          }, 'token')
        model = new SuccessModel('登录成功')
        ctx.body = {
            token: token,
            model: model
        }
    } else {
    ctx.body = new ErrorModel('登录失败')
    }
})

router.post('/register', async function (ctx, next) {
    const body = ctx.request.body
    console.log(body);
    const val = await register(body)
    console.log(val);
    if (val) {
        ctx.body = new SuccessModel('注册成功')
    } else {
        ctx.body = new ErrorModel('注册失败')
    }
  })
  module.exports = router