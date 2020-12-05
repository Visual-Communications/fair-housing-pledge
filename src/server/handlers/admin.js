const config = require('config')
const { log } = require('../modules/logger')

module.exports = {
  /**
   * Show admin dashboard.
   *
   * @since 1.5.0
   * @since 2.0.0 Pass page title and site URL.
   * @since 2.0.1 Pass build environment.
   *
   * @param {Object} req Request object.
   * @param {Object} res Response object.
   */
  showDashboard: async (req, res) => {
    return res.render('admin', {
      title: 'Dashboard',
      site: { url: config.get('site.url') },
      build: { env: config.get('build.env') }
    })
  }
}
