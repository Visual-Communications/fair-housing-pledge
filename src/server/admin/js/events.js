/**
 * @todo: Move these back into their own modules.
 */

const { handleDownload } = require('./download')
const { clearMessage } = require('./message')

/**
 * Add Download event listeners.
 *
 * @since 2.0.0
 */
export function addDownloadEventListeners () {
  const buttons = document.querySelectorAll('[data-admin="download"]')
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', handleDownload)
  }
}

/**
 * Add message event listeners.
 *
 * @since 2.0.0
 */
export function addMessageEventListeners () {
  // Listen for message close button clicks and clear message.
  document
    .querySelector('[data-message="close"]')
    .addEventListener('click', clearMessage)
}
