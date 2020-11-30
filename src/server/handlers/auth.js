const { log } = require('../modules/logger')
const { User, validate } = require('../models/user')
const _ = require('lodash')
const bcrypt = require('bcrypt')
const config = require('config')
const app = require('express')()
const isProduction = app.get('env') === 'production'

module.exports = {
  /**
   * Authenticate a user
   */
  authenticateUser: async (req, res) => {
    const origin = req.header('origin')
    const websiteRequest = origin && origin.includes(config.get('site.url'))

    {
      // Validate user
      const { error } = validate.auth(req.body)
      if (error) {
        if (websiteRequest) return res.status(400).redirect('/login')
        return res.status(400).send('Invalid email or password')
      }
    }
    
    {
      // Validate password
      const { error } = validate.password(req.body)
      if (error) {
        if (websiteRequest) return res.status(400).redirect('/login')
        return res.status(400).send('Invalid email or password')
      }
    }

    // Verify user exists
    let user = await User.findOne({ email: req.body.email })
    if (!user) {
      log.info('Failed login attempt: Invalid email.', { user: req.body.email })
      if (websiteRequest) return res.status(400).redirect('/login')
      return res.status(400).send('Invalid email or password')
    }

    // Verify correct password
    const validPassword = await bcrypt.compare(req.body.password, user.password)
    if (!validPassword) {
      log.info('Failed login attempt: Invalid password.', { user: req.body.email })
      if (websiteRequest) return res.status(400).redirect('/login')
      return res.status(400).send('Invalid email or password')
    }

    // Generate auth token
    const token = user.generateAuthToken()

    log.info('User logged in.', { user: _.pick(user, ['_id', 'email', 'role']) })

    if (websiteRequest) {
      // Return auth token to the client and log in
      return res
        // Set a cookie
        .cookie('x-auth-token', token, {
          httpOnly: isProduction,
          maxAge: 7 * 24 * 60 * 60 * 1000, // 1 week
          // path: '/',
          sameSite: isProduction,
          secure: isProduction,
        })
        .redirect('/admin')
    }

    // Return auth token to the client
    return res
      // Set a cookie
      .cookie('x-auth-token', token, {
        httpOnly: isProduction,
        maxAge: 7 * 24 * 60 * 60 * 1000, // 1 week
        // path: '/',
        sameSite: isProduction,
        secure: isProduction,
      })
      // Send the response
      .send('Login successful.')
  },

  /**
   * Refresh a user token
   */
  refreshUserToken: async (req, res) => {
    const origin = req.header('origin')
    const websiteRequest = origin && origin.includes(config.get('site.url'))

    // Verify user exists
    let user = await User.findOne({ email: req.body.email })
    if (!user) {
      log.info('Failed token refresh attempt: User does not exist.', { user: req.body.email })
      return res.status(400).send('User does not exist.')
    }

    // Get current token
    const token = req.cookies['x-auth-token']

    // If no token, deny access
    if (!token) {
      log.error('Access denied. No token provided.', { status: 401 })
      if (websiteRequest) res.redirect(401, '/login')
      return res
        .status(401)
        .send('Access denied. No token provided.')
    }

    // Refresh the token
    const refreshed = user.refreshAuthToken(token)

    log.info('User token refreshed.', { user: _.pick(user, ['_id', 'email', 'role']) })

    // Return refreshed auth token to the client
    res
      // Set a cookie
      .cookie('x-auth-token', refreshed, {
        httpOnly: isProduction,
        maxAge: 7 * 24 * 60 * 60 * 1000, // 1 week
        // path: '/',
        sameSite: isProduction,
        secure: isProduction,
      })
      // Send the response
      .send('Token refresh successful.')
  }
}
