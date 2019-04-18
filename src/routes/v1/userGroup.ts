import Router from 'koa-router'
import controller from '../../controllers/group'

const router = new Router({ prefix: '/userGroup' })

router.get('/', controller.getJoinedGroups)

router.post('/', controller.joinGroup)

export default router
