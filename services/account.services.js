const bcrypt = require('bcryptjs')

/* eslint-disable */
const { User } = requireWrapper('models')
/* eslint-enable */

const accountServices = {
  signUp: async (name, email, password, confirmPassword, callback) => {
    try {
      if (password !== confirmPassword) throw new Error('Passwords do not match!')
      const user = await User.findOne({ where: { email } })
      if (user) throw new Error('Email already exists!')
      const hash = await bcrypt.hash(password, 10)
      const signUpUser = await User.create({ name, email, password: hash })
      callback(null, { signUpUser })
    } catch (err) {
      callback(err)
    }
  }
}

module.exports = accountServices
