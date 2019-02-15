import { MiddlewareContext } from 'koa-websocket'

export default async (ctx: MiddlewareContext, next: Function) => {
  ctx.websocket.on('message', (message: string) => {
    console.log(message)

    const server = ctx.app.ws.server

    if (server) {
      ctx.websocket.send(message)
      server.clients.forEach(client => {
        if (client !== ctx.websocket) {
          client.send(message)
        }
      })
    }
  })

  await next()
}
