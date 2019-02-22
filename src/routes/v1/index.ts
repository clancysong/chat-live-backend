import Router from 'koa-router'
import sessionRouter from './session'
import userRouter from './user'

const router = new Router({ prefix: '/v1' })

router.use(sessionRouter.routes(), sessionRouter.allowedMethods())
router.use(userRouter.routes(), userRouter.allowedMethods())

export default router
