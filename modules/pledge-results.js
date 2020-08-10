const Papa = require('papaparse')
const fs = require('fs')
const path = require('path')
const axios = require('axios')
axios.defaults.withCredentials = true
const config = require('config')

const settings = {
  authUrl: `${config.get('site.url')}/api/auth`,
  apiUrl: `${config.get('site.url')}/api/pledges`,
  keys: ['firstName', 'lastName', 'email', 'state', 'brand', 'company', 'event', 'created_at', 'courseCompleted'],
  sortBy: 'firstName',
  path: path.join(__dirname, '..', 'scratch', 'db'),
  writeFile: 'pledge-results.csv'
}

/**
 * Initializes the module
 *
 * param (Function) cb
 */
async function init (cb) {
  // Get the data
  const token = await getApiToken(settings.authUrl)
  const file = await getApiData(settings.apiUrl, token)

  // Manipulate the data
  const sorted = sortByKey(file, settings.sortBy)
  const filtered = filterKeys(sorted, settings.keys)
  const csv = jsonToCsv(filtered)

  // Save the data
  writeFile(csv, settings.writeFile, filtered.length)
  // TODO: Use something like SendGrid to email the data as an attachment,
  // with the site name and data count in the subject line or email body,
  // instead of having to manually send that email

  return cb()
}

function handleError (error) {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    console.warn('Server response error: ', error.response.data)
  } else if (error.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
    console.warn('No server response received: ', error.request)
  } else {
    // Something happened in setting up the request that triggered an Error
    console.warn('Client request error: ', error.message)
  }
  if (error.config) console.warn(error.config)
}

/**
 * Gets an API token by sending a request with user credentials
 *
 * param {String} url
 * return {String}
 */
async function getApiToken (url) {
  return await axios.post(url, {
      email: config.get('user.email'),
      password: config.get('user.password')
    })
    .then(function (response) {
      return response.headers['set-cookie'][0].replace('x-auth-token=', '').replace(/; .*/, '')
    })
    .catch(function (error) {
      return handleError(error)
    })
}

/**
 * Gets data from an API
 *
 * param {String} url
 * param {String} token
 * return {String}
 */
async function getApiData (url, token) {
  try {
    const response = await axios.get(url, {
      headers: {
        Cookie: `x-auth-token=${token};`
      }
    })
    return JSON.stringify(response.data)
  } catch (error) {
    return handleError(error)
  }
}

/**
 * Parses a String into an Array of Objects, and sorts alphabetically by a key
 *
 * param {String} data
 * param {String} key
 * return {Array[Object]}
 */
function sortByKey (data, key) {
  return JSON.parse(data)
    .sort(function(a, b) {
      if (a[key].toUpperCase() < b[key].toUpperCase()) return -1
      if (a[key].toUpperCase() > b[key].toUpperCase()) return 1
      return 0
    })
}

/**
 * Filters keys in an Array of Objects
 *
 * param {Array[Object]} data
 * param {Array[String]} keys
 * return {Array[Object]}
 */
function filterKeys (data, keys) {
  return data.map(person => {
    const object = {}
    keys.forEach(key => {
      if (person[key]) return object[key] = person[key]
    })

    return object
  })
}

/**
 * Converts JSON data to a CSV String
 *
 * param {Array[Object]} data
 * return {String}
 */
function jsonToCsv (data) {
  return Papa.unparse(JSON.stringify(data), {
    header: true
  })
}

/**
 * Writes data to a file
 *
 * param {String} data
 * param {String} filename
 * param {Number} count
 * return {String}
 */
function writeFile (data, filename, count) {
  const writeFile = path.join(settings.path, filename)

  try {
    fs.writeFile(writeFile, data, {
      encoding: 'utf8'
    }, () => {
      return console.log(`File saved with ${count} records: ${writeFile}`)
    })
  }

  catch (ex) {
    return console.warn(ex)
  }
}

module.exports = init
