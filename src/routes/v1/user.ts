import Router from 'koa-router'
import queries from '../../db/queries/user'
import resBody from '../../utils/resBody'

const router = new Router({ prefix: '/user' })

router.get('/:id', async ctx => {
  console.log(ctx.session.user)

  const rs = await queries.getUserById(ctx.params.id)

  if (rs.length) ctx.body = resBody.data(rs)
  else ctx.body = resBody.error('The user does not exist')
})


router.post('/', async ctx => {
  const reqBody = ctx.request.body

  const rs = await queries.getUserForName(reqBody.name)

  if (rs.length) {
    ctx.body = resBody.error('The name already exists')
  } else {
    ctx.body = resBody.message('User added successfully')
  }
})

export default router
