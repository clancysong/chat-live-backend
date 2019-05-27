import Router from 'koa-router'
import fs from 'fs'
import oss from '../../utils/alioss'
import response from '../../utils/response'

const router = new Router({ prefix: '/oss' })

router.post('/', async ctx => {
  const { uuid } = ctx.request.body
  const { file }: any = ctx.request.files

  const stream = fs.createReadStream(file.path)

  const rs = await oss.put(`${uuid}`, stream)

  response.success(ctx, { data: rs })
})

export default router
