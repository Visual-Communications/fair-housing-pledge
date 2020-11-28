const config = require('config')

module.exports = {
  /**
   * Get /api route.
   *
   * @param {Object} req Request object.
   * @param {Object} res Response object.
   */
  getApi: (req, res) => {
    // Return error to the client.
    return res.status(400).send('Invalid route')
  }
}
