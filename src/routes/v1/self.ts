import Router from 'koa-router'
import controller from '../../controllers/users'

const router = new Router({ prefix: '/self' })

router.get('/', controller.getUserInfo)

router.put('/', controller.updateUserInfo)

router.get('/groups', controller.getJoinedGroups)

router.post('/groups', controller.joinGroup)

router.delete('/groups/:id', controller.leaveGroup)

router.get('/friends', controller.getFriends)

router.delete('/friends/:id', controller.removeFriend)

router.get('/friend_requests', controller.getFriendRequests)

router.post('/friend_requests', controller.sendFriendRequest)

router.delete('/friend_requests/:id', controller.handleFriendRequests)

router.post('/private_chats', controller.createPrivateChat)

router.get('/private_chats', controller.fetchPrivateChats)

router.get('/private_chats/:uuid', controller.fetchPrivateChatInfo)

export default router
