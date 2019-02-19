import Router from 'koa-router'
import queries from '../db/queries/user'
import response from '../utils/response'

const router = new Router()

const BASE_URL = '/api/user'

router.get(`${BASE_URL}/:id`, async ctx => {
  const users = await queries.getUserById(ctx.params.id)

  if (users.length) ctx.body = response.success(users)
  else ctx.body = response.error('The user does not exist.')
})

export default router
