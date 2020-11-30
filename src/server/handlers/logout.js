const axios = require('axios')
axios.defaults.withCredentials = true
const { log } = require('../modules/logger')
const config = require('config')

module.exports = {
  /**
   * Handle logout.
   *
   * @since unreleased
   *
   * @param {Object} req Request object.
   * @param {Object} res Response object.
   */
  handleLogout: async (req, res) => {
    // If there's no valid token, redirect to login page.
    const token = req.cookies['x-auth-token']
    if (!token) return res.redirect('/login')

    log.info('User logged out.')
    return res
      // Remove the token.
      .clearCookie('x-auth-token')
      // Redirect to login page with success message.
      .redirect('/login')
  }
}
