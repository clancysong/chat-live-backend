import Router from 'koa-router'
import queries from '../../db/queries/user'
import resBody from '../../utils/resBody'

const router = new Router()

const URL = '/api/v1/session'

router.post(URL, async ctx => {
  const reqBody = ctx.request.body
  const rs = await queries.getUserForName(reqBody.name)

  if (rs.length) {
    if (reqBody.password === rs[0].password) {
      ctx.body = resBody.message('Login Successful')
      ctx.session.user = rs[0]
    } else {
      ctx.body = resBody.error('The password is incorrect')
    }
  } else {
    ctx.body = resBody.error('The user does not exist')
  }
})

export default router
