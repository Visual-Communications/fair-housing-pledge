const config = require('config')

module.exports = {
  // Get home page index
  getApi: (req, res, next) => {
    // Redirect home
    res.redirect('/')
  }
}
