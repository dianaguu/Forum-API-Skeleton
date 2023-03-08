/* eslint-disable */
const jwt = require('jsonwebtoken')
const accountServices = requireWrapper('services/account.services')
/* eslint-enable */

const accountController = {
  signUp: (req, res, next) => {
    const { name, email, password, confirmPassword } = req.body
    accountServices.signUp(name, email, password, confirmPassword,
      (err, data) => err ? next(err) : res.json({ status: 'success', data }))
  },
  signIn: (req, res, next) => {
    try {
      const token = jwt.sign(req.user, process.env.JWT_SECRET, { expiresIn: '30d' })
      res.json({
        status: 'success',
        data: {
          token,
          account: req.user
        }
      })
    } catch (err) {
      next(err)
    }
  }
}

module.exports = accountController
