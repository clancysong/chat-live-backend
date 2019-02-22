import Router from 'koa-router'
import ctrl from '../../controllers/session'

const router = new Router({ prefix: '/session' })

router.post('/', ctrl.login)

router.delete('/', ctrl.logout)

export default router
