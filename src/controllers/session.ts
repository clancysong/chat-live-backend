import { ParameterizedContext as Context } from 'koa'
import response from '../utils/response'
import passport from '../utils/passport'

class SessionController {
  public async login(ctx: Context, next: () => Promise<any>) {
    return passport.authenticate('local', (err, user, info, status) => {
      console.log(user)
      if (user) {
        response.message(ctx, 'Login succeed')
        return ctx.login(user)
      } else {
        response.error(ctx, 'Login failed')
      }
    })(ctx, next)
  }

  public async logout(ctx: Context) {
    delete ctx.session.user
    response.message(ctx, 'Logout successful')
  }
}

export default new SessionController()
