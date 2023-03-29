const passport = require('../configs/passport')

const passportAuthentication = (req, res, next, strategy, message) => {
  passport.authenticate(strategy, { session: false }, (err, user) => {
    if (err) return next(err)
    if (!user) return res.status(401).json({ status: 'error', message })
    req.user = user.toJSON()
    delete req.user.password
    return next()
  })(req, res, next)
}

const accountAuthenticated = (req, res, next) => {
  const strategy = 'local'
  const message = 'Unauthorized account'
  passportAuthentication(req, res, next, strategy, message)
}

const requestAuthenticated = (req, res, next) => {
  const strategy = 'jwt'
  const message = 'Unauthorized account, or Token not found'
  passportAuthentication(req, res, next, strategy, message)
}

const requestAuthenticatedAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) return next()
  return res.status(403).json({ status: 'error', message: 'Permission denied' })
}

module.exports = {
  accountAuthenticated,
  requestAuthenticated,
  requestAuthenticatedAdmin
}
