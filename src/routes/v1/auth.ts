import Router from 'koa-router'
import controller from '../../controllers/auth'

const router = new Router()

router.get('/auth', controller.auth)

router.post('/login', controller.login)

router.post('/register', controller.register)

router.delete('/logout', controller.logout)

export default router
