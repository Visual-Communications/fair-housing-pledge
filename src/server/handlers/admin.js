const { getPledges } = require('./pledges')
const { log } = require('../modules/logger')

module.exports = {
  /**
   * Show admin dashboard.
   *
   * @since unreleased
   *
   * @param {Object} req Request object.
   * @param {Object} res Response object.
   */
  showDashboard: async (req, res) => {
    return res.render('admin')
  }
}
