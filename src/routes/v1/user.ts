import Router from 'koa-router'
import ctrl from '../../controllers/user'

const router = new Router({ prefix: '/user' })

router.get('/:id', ctrl.getUserById)

router.post('/', ctrl.addUser)

export default router
