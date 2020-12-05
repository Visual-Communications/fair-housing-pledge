const { clearMessage } = require('./message')
const { getPledgesData } = require('./pledges')
const { getSummaryData, getSummaryMarkup } = require('./summary')
const { getDownloadMarkup } = require('./download')

/**
 * Render admin dashboard.
 *
 * @since unreleased
 */
export async function renderDashboard () {
  // Get pledges and brands data.
  const pledges = await getPledgesData()
  const brands = getSummaryData(pledges)

  // Render the dashboard markup.
  const dashboard = document.querySelector('[data-admin="dashboard"]')
  const navigation = document.querySelector('.admin__nav-list')
  const summary = getSummaryMarkup(brands)
  const download = getDownloadMarkup(['summary', 'pledges'])
  dashboard.appendChild(summary)
  navigation.insertBefore(download, navigation.querySelector('[data-admin-nav="logout"]'))

  // Remove loading message.
  clearMessage()
}
