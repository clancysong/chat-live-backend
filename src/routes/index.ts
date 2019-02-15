import Router from 'koa-router'

const router = new Router()

router.get('/*', async ctx => {
  ctx.body = 'Hi TS'
})

export default router.routes()
