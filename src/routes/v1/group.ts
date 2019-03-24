import Router from 'koa-router'
import controller from '../../controllers/group'

const router = new Router({ prefix: '/group' })

router.get('/', controller.getGroups)

router.get('/:id', controller.getGroupInfo)

export default router
