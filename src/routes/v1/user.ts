import Router from 'koa-router'
import controller from '../../controllers/user'

const router = new Router({ prefix: '/user' })

router.get('/', controller.getUserInfo)

export default router
