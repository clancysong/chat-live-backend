import Router from 'koa-router'
import authRouter from './auth'
import userRouter from './user'
import response from '../../utils/response'

const router = new Router({ prefix: '/v1' })

// router.use('/*', (ctx, next) => {
//   const isPathAllowed = () => {
//     const allowedPath = [
//       { path: '/api/v1/session', method: 'POST' },
//       { path: '/api/v1/user', method: 'POST' }
//     ]
//     return allowedPath.some((item => item.path === ctx.path && item.method === ctx.method))
//   }

//   if (ctx.isAuthenticated() || isPathAllowed()) next()
//   else response.error(ctx, 'Authentication failed', 401)
// })

router.use(authRouter.routes())
router.use(userRouter.routes())

export default router
