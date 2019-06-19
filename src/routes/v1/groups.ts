import Router from 'koa-router'
import controller from '../../controllers/groups'

const router = new Router({ prefix: '/groups' })

router.get('/', controller.getPublicGroups)

router.get('/:uuid', controller.getGroupInfo)

router.post('/', controller.createGroup)

router.delete('/:id', controller.removeGroup)

router.put('/:id', controller.updateGroupInfo)

router.get('/channels/:uuid', controller.fetchChannelInfo)

router.post('/:groupId/channels', controller.createChannel)

router.delete('/channels/:id', controller.removeChannel)

router.delete('/:groupId/users/:userId', controller.removeMember)

export default router
