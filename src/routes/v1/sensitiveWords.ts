import Router from 'koa-router'
import controller from '../../controllers/sensitiveWord'

const router = new Router({ prefix: '/sensitive_words' })

router.get('/', controller.fetchWords)

router.post('/', controller.createWord)

router.delete('/:id', controller.removeWord)

export default router
