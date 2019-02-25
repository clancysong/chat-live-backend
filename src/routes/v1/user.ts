import Router from 'koa-router'
import controller from '../../controllers/user'

const router = new Router({ prefix: '/user' })

router.get('/:id', controller.getUserById)

router.post('/', controller.addUser)

export default router
