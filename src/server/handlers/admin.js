const config = require('config')
const { log } = require('../modules/logger')

module.exports = {
  /**
   * Show admin dashboard.
   *
   * @since 1.5.0
   * @since unreleased Pass page title and site URL.
   *
   * @param {Object} req Request object.
   * @param {Object} res Response object.
   */
  showDashboard: async (req, res) => {
    return res.render('admin', {
      title: 'Dashboard',
      site: { url: config.get('site.url') }
    })
  }
}
