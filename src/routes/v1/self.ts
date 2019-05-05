import Router from 'koa-router'
import controller from '../../controllers/users'

const router = new Router({ prefix: '/self' })

router.get('/', controller.getUserInfo)

router.get('/groups', controller.getJoinedGroups)

router.post('/groups', controller.joinGroup)

router.get('/friend_requests', controller.getFriendRequests)

router.post('/friend_requests', controller.sendFriendRequest)

router.delete('/friend_requests/:id', controller.handleFriendRequests)

export default router
