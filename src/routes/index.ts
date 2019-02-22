import Router from 'koa-router'
import v1Router from './v1'

const router = new Router({ prefix: '/api' })

router.use(v1Router.routes())

export default router
