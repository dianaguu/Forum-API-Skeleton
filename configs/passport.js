const passport = require('passport')
const LocalStrategy = require('passport-local')
const passportJwt = require('passport-jwt')
const bcrypt = require('bcryptjs')
const { Objective, User } = require('../models')

const JwtStrategy = passportJwt.Strategy
const JwtExtractor = passportJwt.ExtractJwt

// passport Local strategy
const localOptions = {
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
}
passport.use(new LocalStrategy(localOptions, async (req, email, password, done) => {
  try {
    const user = await User.findOne({ where: { email } })
    if (!user) return done(null, false, req.flash('error_messages', 'Email has not been signed up!'))
    const isValidPassword = await bcrypt.compare(password, user.password)
    if (!isValidPassword) return done(null, false, req.flash('error_messages', 'Password is incorrect!'))
    return done(null, user)
  } catch (err) {
    done(err, false)
  }
}))

// passport JWT strategy
const cookieExtractor = (req) => {
  let token = null
  if (req?.cookies) {
    token = req.cookies.access_token.split(' ')[1]
  }
  return token
}
const jwtOptions = {
  jwtFromRequest: JwtExtractor.fromExtractors([cookieExtractor]),
  secretOrKey: process.env.JWT_SECRET
}
passport.use(new JwtStrategy(jwtOptions, (jwtPayload, cb) => {
  User.findByPk(jwtPayload.id)
    .then(user => cb(null, user))
    .catch(err => cb(err))
}))

// serialize and deserialize user
passport.serializeUser((user, done) => {
  done(null, user.id)
})
passport.deserializeUser((id, done) => {
  return User.findByPk(id, {
    include: [
      { model: Objective, as: 'FavoriteObjectives' },
      { model: Objective, as: 'LikeObjectives' },
      { model: User, as: 'Followers' },
      { model: User, as: 'Followings' }]
  })
    .then(user => done(null, user.toJSON()))
    .catch(err => done(err, false))
})

module.exports = passport
