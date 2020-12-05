const axios = require('axios')
axios.defaults.withCredentials = true
const jwt = require('jsonwebtoken')
const config = require('config')
const bcrypt = require('bcrypt')
const { log } = require('../modules/logger')

module.exports = {
  /**
   * Show login screen.
   *
   * @since 1.5.0
   * @since 2.0.0 Pass site URL.
   *
   * @param {Object} req Request object.
   * @param {Object} res Response object.
   */
  showLogin: async (req, res) => {
    // If there's a valid token, redirect to dashboard.
    const token = req.cookies['x-auth-token']
    if (token) {
      try {
        // Decode and verify the token signature
        const decoded = jwt.verify(token, config.get('jwtPrivateKey'))
        const isExpired = Date.now() > decoded.exp

        // If token is expired, deny access
        if (isExpired) {
          log.error('Access denied. Token is expired.', { status: 401 })
          // Render login page.
          res.render('login', {
            title: 'Log In',
            site: { url: config.get('site.url') }
          })
        }

        // Set user to decoded token and continue
        req.user = decoded

        // Redirect to admin dashboard.
        res.redirect('/admin')
      }

      catch (ex) {
        log.error('Invalid token.', { status: 400 })
        // Render login page.
        res.render('login', {
          title: 'Log In',
          site: { url: config.get('site.url') }
        })
      }
    }
    
    // Render login page.
    res.render('login', {
      title: 'Log In',
      site: { url: config.get('site.url') }
    })
  }
}
