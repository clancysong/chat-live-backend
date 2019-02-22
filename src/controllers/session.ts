import { ParameterizedContext as Context } from 'koa'
import response from '../utils/response'
import passport from '../utils/passport'

class SessionController {
  public login(ctx: Context, next: () => Promise<any>) {
    return passport.authenticate('local', async (err, user, info, status) => {
      if (user) {
        await ctx.login(user)
        response.message(ctx, info.message)
      } else {
        response.error(ctx, info.message)
      }
    })(ctx, next)
  }

  public async logout(ctx: Context) {
    delete ctx.session.user
    response.message(ctx, 'Logout successful')
  }
}

export default new SessionController()
