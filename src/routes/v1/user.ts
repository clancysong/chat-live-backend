import Router from 'koa-router'
import queries from '../../db/queries/user'
import response from '../../utils/response'

const router = new Router({ prefix: '/user' })

router.get('/:id', async ctx => {
  console.log(ctx.session.user)

  const rs = await queries.getUserById(ctx.params.id)

  if (rs.length) {
    response.data(ctx, rs[0])
  } else {
    response.error(ctx, 'The user does not exist')
  }
})

router.post('/', async ctx => {
  const reqBody = ctx.request.body

  const rs = await queries.getUserForName(reqBody.name)

  if (rs.length) {
    response.error(ctx, 'The name already exists')
  } else {
    response.message(ctx, 'User added successfully')
  }
})

export default router
