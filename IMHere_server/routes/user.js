const router = require('koa-router')()
const {
    getinfo,
    updateinfo,
    delaccount
} = require('../controller/user')
const { SuccessModel, ErrorModel } = require('../model/resModel')


//router.prefix('/api/user')

router.get('/info', async function (ctx, next) {
    const info = await getinfo(ctx.query.userid)
    ctx.body = new SuccessModel(info)
})



router.post('/update',  async function (ctx, next) {
    const val = await updateinfo(ctx.query.userid, ctx.request.body)
    if (val) {
        ctx.body = new SuccessModel('更新成功')
    } else {
        ctx.body = new ErrorModel('更新失败')
    }
})

router.post('/del', async function (ctx, next) {
  const val = await delaccount(ctx.query.userid)
  if (val) {
      ctx.body = new SuccessModel('删除成功')
  } else {
      ctx.body = new ErrorModel('删除失败')
  }
})

module.exports = router
