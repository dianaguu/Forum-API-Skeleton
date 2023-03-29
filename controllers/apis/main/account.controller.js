/* eslint-disable */
const jwt = require('jsonwebtoken')
const accountServices = requireWrapper('services/account.services')
/* eslint-enable */

const cookieOption = {
  expires: new Date(Date.now() + 8 * 3600000), // cookie will be removed after 8 hours
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  path: '/api'
}

const accountController = {
  signUp: (req, res, next) => {
    const { name, email, password, confirmPassword } = req.body
    accountServices.signUp(name, email, password, confirmPassword,
      (err, data) => err ? next(err) : res.json({ status: 'success', data }))
  },
  signIn: (req, res, next) => {
    try {
      const token = jwt.sign(req.user, process.env.JWT_SECRET, { expiresIn: '8h' })
      return res
        .status(201)
        .cookie('access_token', 'Bearer ' + token, cookieOption)
        .json({
          status: 'success',
          data: {
            token,
            account: req.user
          }
        })
    } catch (err) {
      next(err)
    }
  },
  signOff: (req, res, next) => {
    return res
      .status(200)
      .clearCookie('access_token', cookieOption)
      .json({ status: 'success', messages: 'Signed off successfully' })
  }
}

module.exports = accountController
