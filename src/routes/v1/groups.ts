import Router from 'koa-router'
import controller from '../../controllers/groups'

const router = new Router({ prefix: '/groups' })

router.get('/', controller.getPublicGroups)

router.get('/:uuid', controller.getGroupInfo)

router.post('/', controller.createPrivateGroup)

export default router
