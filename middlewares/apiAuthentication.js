const passport = require('../configs/passport')

const accountAuthenticated = (req, res, next) => {
  passport.authenticate('local', { session: false }, (err, user) => {
    if (err) return next(err)
    if (!user) return res.status(401).json({ status: 'error', message: 'Unauthorized account' })
    req.user = user.toJSON()
    delete req.user.password
    next()
  })(req, res, next)
}

module.exports = {
  accountAuthenticated
}
