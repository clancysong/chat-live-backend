import Router from 'koa-router'
import queries from '../../db/queries/user'
import resBody from '../../utils/resBody'

const router = new Router()

const URL = '/api/v1/user'

router.get(`${URL}/:id`, async ctx => {
  const rs = await queries.getUserById(ctx.params.id)

  if (rs.length) ctx.body = resBody.data(rs)
  else ctx.body = resBody.error('The user does not exist')
})


router.post(URL, async ctx => {
  const reqBody = ctx.request.body

  const rs = await queries.getUserForName(reqBody.name)

  if (rs.length) {
    ctx.body = resBody.error('The name already exists')
  } else {
    ctx.body = resBody.message('User added successfully')
  }
})

export default router
