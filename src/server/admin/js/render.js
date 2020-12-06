const { clearMessage } = require('./message')
const { getPledgesData, getPledgesMarkup } = require('./pledges')
const { getSummaryData, getSummaryMarkup } = require('./summary')
const { getDownloadMarkup } = require('./download')

/**
 * Render admin dashboard.
 *
 * @since 2.0.0
 */
export async function renderDashboard () {
  // Get pledges and summary data.
  const pledgesData = await getPledgesData()
  const summaryData = getSummaryData(pledgesData)

  // Render the dashboard markup.
  const dashboard = document.querySelector('[data-admin="dashboard"]')
  const navigation = document.querySelector('.admin__nav-list')
  const summary = getSummaryMarkup(summaryData)
  const pledges = getPledgesMarkup(pledgesData)
  const download = getDownloadMarkup(['summary', 'pledges'])
  dashboard.appendChild(summary)
  dashboard.appendChild(pledges)
  navigation.insertBefore(download, navigation.querySelector('[data-admin-nav="logout"]'))

  // Remove loading message.
  clearMessage()
}
