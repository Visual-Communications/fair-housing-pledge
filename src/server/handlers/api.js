const config = require('config')

module.exports = {
  // Get home page index
  getApi: (req, res, next) => {
    // Redirect home, since no one needs to directly visit `/api`
    res.redirect('/')
  }
}
