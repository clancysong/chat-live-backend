import { ParameterizedContext as Context } from 'koa'
import wordQuery from '../db/queries/sensitiveWord'
import response from '../utils/response'

class SensitiveWordController {
  public async fetchWords(ctx: Context) {
    const words = await wordQuery.findAll()

    response.success(ctx, { data: words })
  }

  public async createWord(ctx: Context) {
    const [word] = await wordQuery.addOne(ctx.request.body)

    response.success(ctx, { data: word })
  }

  public async removeWord(ctx: Context) {
    const [word] = await wordQuery.removeOne(ctx.params.id)

    response.success(ctx, { data: word })
  }
}

export default new SensitiveWordController()
