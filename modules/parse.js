const Papa = require('papaparse')
const fs = require('fs')
const path = require('path')

function parse () {
  // Get JSON data
  const response = path.join(__dirname, '..', 'scratch', 'db', 'response.json')
  const data = fs.readFileSync(response, {
    encoding: 'utf8'
  })

  // Convert JSON to CSV
  const csv = Papa.unparse(data, {
    header: true
  })

  try {
    // Save CSV file
    fs.writeFile(path.join(__dirname, '..', 'scratch', 'db', 'response.csv'), csv, {
      encoding: 'utf8'
    }, () => {
      console.log('File saved')
    })
  }

  catch (ex) {
    console.warn(ex)
  }
}

parse()

module.exports = parse
