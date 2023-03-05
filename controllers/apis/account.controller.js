/* eslint-disable */
const accountServices = requireWrapper('services/account.services')
/* eslint-enable */

const accountController = {
  signUp: (req, res, next) => {
    const { name, email, password, confirmPassword } = req.body
    accountServices.signUp(name, email, password, confirmPassword,
      (err, data) => err ? next(err) : res.json({ status: 'success', data }))
  }
}

module.exports = accountController
