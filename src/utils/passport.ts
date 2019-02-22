import passport from 'koa-passport'
import User from '../models/User'
import { Strategy as LocalStrategy } from 'passport-local'
import userQuery from '../db/queries/user'

passport.use(
  new LocalStrategy(async (username, password, done) => {
    const user = await userQuery.findByName(username)
    if (user) {
      if (user.password === password) {
        done(null, user, { message: 'Logged in successfully' })
      } else {
        done(null, false, { message: 'The password is incorrect' })
      }
    } else {
      done(null, false, { message: 'User does not exist' })
    }
  })
)

passport.serializeUser((user: User, done) => {
  done(null, user.id)
})

passport.deserializeUser(async (id: number, done) => {
  const user = await userQuery.findById(id)
  done(null, user)
})

export default passport
