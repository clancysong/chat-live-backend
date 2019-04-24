import Router from 'koa-router'
import controller from '../../controllers/users'

const router = new Router({ prefix: '/users' })

router.get('/self', controller.getUserInfo)

router.get('/groups', controller.getJoinedGroups)

router.post('/groups', controller.joinGroup)

export default router
