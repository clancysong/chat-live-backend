import passport from 'koa-passport'
import User from '../models/User'
import Local from 'passport-local'
import userQuery from '../db/queries/user'

passport.use(
  new Local.Strategy(async (name, password, done) => {
    const user = await userQuery.findByName(name)
    if (user.password === password) return done(null, user)
    else return done(null, false)
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
