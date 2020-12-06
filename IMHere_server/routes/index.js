const router = require('koa-router')()
const jwt = require('jsonwebtoken')

router.get('/', async (ctx, next) => {
  ctx.body = 'koa2 string'
})
// router.post('/login', userApi.UserLogin) //用户登录

// router.post('/login', async (ctx, next) => {
//   console.log(ctx.request.body)
//   if(ctx.request.body.username == 'admin' && ctx.request.body.password == '123456'){
//     const token = jwt.sign({
//       //token的创建日期
//       time: Date.now(),
//       //token的过期时间
//       timeout: Date.now() + 60000,
//       username: 'ctx.request.body.username',
//       id: 1
//     }, 'token')
//     ctx.body = {
//       status:200,
//       dec: '登录成功',
//       token: token
//     }
//   }else{
//     ctx.body = {
//       status:400,
//       dec: '登录名或密码错误'
//     }
//   }
// })


router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string'
})

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
})

module.exports = router
