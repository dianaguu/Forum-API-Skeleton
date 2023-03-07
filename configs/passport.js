const passport = require('passport')
const LocalStrategy = require('passport-local')
const bcrypt = require('bcryptjs')
const { User } = require('../models')

// passport Local strategy
passport.use(new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  },
  async (req, email, password, done) => {
    try {
      const user = await User.findOne({ where: { email } })
      if (!user) return done(null, false, req.flash('error_messages', 'Email has not been signed up!'))
      const isValidPassword = await bcrypt.compare(password, user.password)
      if (!isValidPassword) return done(null, false, req.flash('error_messages', 'Password is incorrect!'))
      return done(null, user)
    } catch (err) {
      done(err, false)
    }
  }
))

// serialize and deserialize user
passport.serializeUser((user, done) => {
  done(null, user.id)
})
passport.deserializeUser((id, done) => {
  return User.findByPk(id)
    .then(user => done(null, user.toJSON()))
    .catch(err => done(err, false))
})

module.exports = passport
