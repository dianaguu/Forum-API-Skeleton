/* eslint-disable */
const { User } = requireWrapper('models')
const accountServices = requireWrapper('services/account.services')
/* eslint-enable */

const accountController = {
  signUpPage: (req, res) => {
    res.render('signup')
  },
  signUp: (req, res, next) => {
    const { name, email, password, confirmPassword } = req.body
    accountServices.signUp(name, email, password, confirmPassword, (err, data) => {
      if (err) return next(err)
      req.flash('success_messages', 'Signed up successfully')
      req.session.signUpData = data
      return res.redirect('/signin')
    })
  },
  signInPage: (req, res) => {
    res.render('signin')
  },
  signIn: (req, res) => {
    req.flash('success_messages', 'Signed in successfully')
    res.redirect('objectives')
  },
  signOff: (req, res, next) => {
    req.logout(function (err) {
      if (err) { return next(err) }
    })
    req.flash('success_messages', 'Signed off successfully')
    res.redirect('/signin')
  }
}

module.exports = accountController
