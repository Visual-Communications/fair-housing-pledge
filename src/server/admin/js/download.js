const Papa = require('papaparse')
const { showMessage } = require('./message')
const { getSummaryData } = require('./summary')
const { getPledgesData } = require('./pledges')

/**
 * Get download section markup.
 *
 * @since 2.0.0
 *
 * @param  {array}  Array of context strings.
 * @return {string} Download section markup.
 */
export function getDownloadMarkup (contexts) {
  // Build the markup.
  const markup = document.createDocumentFragment()

  // For each context...
  contexts.forEach((context, index) => {
    // Build the markup.
    const li = document.createElement('li')
    const button = document.createElement('button')

    // Add classes.
    li.classList.add('admin__nav-list-item')
    li.classList.add('admin__nav-list-item_button')
    button.classList.add('admin__download-button')

    // Add attributes.
    button.setAttribute('type', 'button')
    button.setAttribute('data-admin', 'download')
    button.setAttribute('data-download', context)

    // Add text content.
    button.textContent = `Download ${context}`

    // Append the markup.
    li.appendChild(button)
    markup.appendChild(li)
  })

  // Return the markup.
  return markup
}

/**
 * Handle download.
 *
 * @since 2.0.0
 *
 * @param {Event} event Click event.
 */
export async function handleDownload (event) {
  // Prevent default click behavior.
  event.preventDefault()

  try {
    // Get button properties.
    const button = event.target
    const download = button.getAttribute('data-download')
    const pledges = await getPledgesData()
    const brands = getSummaryData(pledges)
    const summary = Object.keys(brands).map(brand => {
      return {
        'Brand': brands[brand].name,
        'Pledges': brands[brand].pledgesCount,
        'Course': brands[brand].courseCompletedCount,
        'No Course': brands[brand].pledgesCount - brands[brand].courseCompletedCount,
      }
    })

    // Build CSV data.
    let data
    switch (download) {
      case 'summary':
        data = Papa.unparse(summary)
        break
      case 'pledges':
        data = Papa.unparse(pledges)
        break
      default:
        const message = 'No download found.'
        return showMessage('error', message)
        break
    }
    const csv = new Blob([data], {type: 'text/plain'})

    // Build invisible download link and click it.
    const url = window.URL.createObjectURL(csv)
    const hyperlink = document.createElement('a')
    hyperlink.setAttribute('href', url)
    // @todo: Add date to filename.
    hyperlink.setAttribute('download', `${download}.csv`)
    hyperlink.textContent = `Download ${download}`
    hyperlink.click()
  }

  catch (error) {
    showMessage('error', error)
  }
}
