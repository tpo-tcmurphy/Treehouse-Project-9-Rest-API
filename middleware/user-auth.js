const auth = require('basic-auth')
const { User } = require('../models')
const bcrypt = require('bcryptjs')

// Middleware to authenticate the request using Basic Authentication.
// From Rest API Authentication with Express Treehouse Workshop
exports.authenticateUser = async (req, res, next) => {
  let message // Stores the message to display

  // Parse the user's credentials from the Authorization header.
  const credentials = auth(req)

  if (credentials) {
    const user = await User.findOne({ where: { emailAddress: credentials.name } })
    if (user) {
      const authenticated = bcrypt.compareSync(credentials.pass, user.password)
      if (authenticated) {
        console.log(`Authentication successful for user: ${user.firstName} ${user.lastName}`)
        req.currentUser = user
      } else {
        message = `Authentication failure for user: ${user.firstName} ${user.lastName}`
      }
    } else {
      message = `User not found for email: ${credentials.name}`
    }
  } else {
    message = 'Auth header not found'
  }

  // If user authentication failed...
  // Return a response with a 401 Unauthorized HTTP status code.
  if (message) {
    console.warn(message)
    res.status(401).json({ message: 'Access Denied' })
  } else {
  // If user authentication succeeded...
  // Call the next() method.
    next()
  }
}
