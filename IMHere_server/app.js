const Koa = require('koa')
const WebSocket = require('ws')
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

const index = require('./routes/index')
const user = require('./routes/user')
const account = require('./routes/account')

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

// routes
app.use(index.routes(), index.allowedMethods())
app.use(user.routes(), user.allowedMethods())
app.use(account.routes(), account.allowedMethods())

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
    console.log('server receive msg：', msg);
  });

  ws.send('Information from the server');
});


module.exports = app