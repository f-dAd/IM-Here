const Koa = require('koa')
const WebSocket = require('ws')
const redisClient = require('./db/redis')
const whiteList = require('./util/whitelist')
const { ErrorModel } = require('./model/resModel')
// 引用Server类:
const WebSocketServer = WebSocket.Server;
const app = new Koa()
const ws = new WebSocket.Server({port: 8000})
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const cors = require('koa2-cors')

const registerRouter = require('./routes/index')//导入routes导出的文件

//监听端口
const port = 3000

// error handler
onerror(app)

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'pug'
}))

// 配置跨域
app.use(
  cors({
      origin: function (ctx) { //设置允许来自指定域名请求
          return ctx.header.origin; //只允许http://localhost:8080这个域名的请求
      },
      maxAge: 5, //指定本次预检请求的有效期，单位为秒。
      credentials: true, //是否允许发送Cookie
      allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], //设置所允许的HTTP请求方法
      allowHeaders: ['Content-Type', 'Authorization', 'Accept'], //设置服务器支持的所有头信息字段
      exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'] //设置获取其他自定义字段
  })
);

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

//判断接口是否需要登录
app.use(async (ctx, next) => {
  let url = ctx.request.url
  let flag = false
  whiteList.map(res => { 
    if (url.indexOf(res) !== -1) { 
      flag = true  //若接口在白名单中定义了，则放行
    }
  })
  if (flag) {
    await next()  //放行
  } else {  //否则检查token
    if (ctx.header && ctx.header.authority) {
      const token = ctx.header.authority
      if (token) {
        try {
          let exits = await redisClient.exists(token)
          if (exits) {//redis存在此token
            await next()
          } else {
            return ctx.body = {
              model: new ErrorModel('token失效，请重新登陆')
            }
          }
        } catch (error) {
          console.log(error)
        }
      } else {//没有传token
        return ctx.body = {
          model: new ErrorModel('用户未登录')
        }
      }
    } else {
      return ctx.body = {
        model: new ErrorModel('用户未登录')
      }
    }
  }
})

// routes
app.use(registerRouter())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

app.listen(port, () => {
  console.log('listening on :'+port);
});

ws.on('connection', ws => {
  console.log('server connection');

  ws.on('message', msg => {
    console.log('client send msg：', msg);
    ws.send('server receive msg：' + msg);
  });

  ws.send('Connect success·····<br\>');
});


module.exports = app