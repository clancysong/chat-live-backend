import Router from 'koa-router'
import queries from '../../db/queries/user'
import resBody from '../../utils/resBody'

const router = new Router({ prefix: '/session' })

router.post('/', async ctx => {
  const reqBody = ctx.request.body
  const rs = await queries.getUserForName(reqBody.name)

  if (rs.length) {
    if (reqBody.password === rs[0].password) {
      ctx.body = resBody.message('Login successful')
      ctx.session.user = rs[0]
    } else {
      ctx.body = resBody.error('The password is incorrect')
    }
  } else {
    ctx.body = resBody.error('The user does not exist')
  }
})

router.del('/', async ctx => {
  delete ctx.session.user
  ctx.body = resBody.message('Logout successful')
})

export default router
