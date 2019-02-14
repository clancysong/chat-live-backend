import Koa from 'koa'
import Router from 'koa-router'

const app = new Koa()
const router = new Router()

router.get('/*', async (ctx: any) => {
  ctx.body = 'Hi TS'
})

app.use(router.routes())

app.listen(8080)

console.log('Server is running on http://localhost:8080')
