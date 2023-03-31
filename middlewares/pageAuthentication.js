const authHelper = require('../helpers/authentication.helper')

const requestAuthenticated = (req, res, next) => {
  if (authHelper.ensureAuthenticated(req)) {
    return next()
  }
  res.redirect('/forum/account/signin')
}
const requestAuthenticatedAdmin = (req, res, next) => {
  if (authHelper.ensureAuthenticated(req)) {
    if (authHelper.getUser(req).isAdmin) return next()
    res.redirect('/forum/')
  } else {
    res.redirect('/forum/account/signin')
  }
}
module.exports = {
  requestAuthenticated,
  requestAuthenticatedAdmin
}
