import Router from 'koa-router'
import controller from '../../controllers/groups'

const router = new Router({ prefix: '/groups' })

router.get('/', controller.getPublicGroups)

router.get('/:id', controller.getGroupInfo)

router.post('/', controller.createPrivateGroup)

export default router
