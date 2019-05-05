import Router from 'koa-router'
import authRouter from './auth'
import selfRouter from './self'
import userRouter from './users'
import groupRouter from './groups'
import response from '../../utils/response'
import session from '../../utils/session'

const router = new Router({ prefix: '/v1' })

router.use('/*', async (ctx, next) => {
  const isPathAllowed = () => {
    const allowedPaths = ['/api/v1/login', '/api/v1/register']
    return allowedPaths.some(path => ctx.path === path)
  }

  if (session.isAuthenticated(ctx) || isPathAllowed()) await next()
  else response.error(ctx, { status: 401, message: 'Authentication failed' })
})

router.use(authRouter.routes())
router.use(selfRouter.routes())
router.use(groupRouter.routes())
router.use(userRouter.routes())

export default router
