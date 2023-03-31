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
    if (!name) throw new Error('name is required!')
    if (!email) throw new Error('email is required!')
    if (!password) throw new Error('password is required!')
    if (!confirmPassword) throw new Error('confirmPassword is required!')

    accountServices.signUp(name, email, password, confirmPassword, (err, data) => {
      if (err) return next(err)
      req.flash('success_messages', 'Signed up successfully')
      req.session.signUpData = data
      return res.redirect('/forum/account/signin')
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
    res.redirect('/forum/account/signin')
  }
}

module.exports = accountController
