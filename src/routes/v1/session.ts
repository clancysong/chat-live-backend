import Router from 'koa-router'
import queries from '../../db/queries/user'
import response from '../../utils/response'

const router = new Router({ prefix: '/session' })

router.post('/', async ctx => {
  const reqBody = ctx.request.body
  const rs = await queries.getUserForName(reqBody.name)

  if (rs.length) {
    if (reqBody.password === rs[0].password) {
      response.message(ctx, 'Login successful')
      ctx.session.user = rs[0]
    } else {
      response.error(ctx, 'The password is incorrect')
    }
  } else {
    response.error(ctx, 'The user does not exist')
  }
})

router.del('/', async ctx => {
  delete ctx.session.user
  response.message(ctx, 'Logout successful')
})

export default router
