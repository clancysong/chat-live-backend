import Router from 'koa-router'
import userRouter from './user'

const router = new Router()

router.use(userRouter.routes(), userRouter.allowedMethods())

router.get('/', async ctx => {
  ctx.body = {
    status: 'success',
    data: 'Hi TS'
  }
})

export default router
