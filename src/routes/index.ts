import Router from 'koa-router'

const router = new Router()

router.get('/', async ctx => {
  ctx.body = {
    status: 'success',
    message: 'Hi TS'
  }
})

export default router.routes()
