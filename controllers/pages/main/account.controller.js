/* eslint-disable */
const { User } = requireWrapper('models')
const accountServices = requireWrapper('services/account.services')
/* eslint-enable */

const accountController = {
  signUpPage: (req, res) => {
    res.render('signup')
  },
  signUp: (req, res, next) => {
    console.log(req)
    const { name, email, password, confirmPassword } = req.body
    accountServices.signUp(name, email, password, confirmPassword, (err, data) => {
      if (err) return next(err)
      return res.redirect('/signin')
    })
  }
}

module.exports = accountController
