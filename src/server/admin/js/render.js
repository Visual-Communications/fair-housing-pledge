const { clearMessage } = require('./message')
const { getBrandsData } = require('./data')
const { getSummaryMarkup, getDownloadMarkup } = require('./markup')

/**
 * Render admin dashboard.
 *
 * @since 1.5.0
 * @since unreleased Pass abstracted brands data to summary markup.
 * @since unreleased Render download markup.
 * 
 * @param {array} pledges Array of pledge objects.
 */
export function renderDashboard (pledges) {
  // Remove loading message.
  clearMessage()

  // Get brands data.
  const brands = getBrandsData(pledges)

  // Render the dashboard.
  const dashboard = document.querySelector('[data-admin="dashboard"]')
  const navigation = document.querySelector('.admin__nav-list')
  const summary = getSummaryMarkup(brands)
  const download = getDownloadMarkup(['summary', 'pledges'])

  // Add markup.
  dashboard.appendChild(summary)
  navigation.insertBefore(download, navigation.querySelector('[data-admin-nav="logout"]'))

  // @todo: Add event listeners.
}
