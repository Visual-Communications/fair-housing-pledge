const { addMessageEventListeners } = require('./events')

/**
 * Show UI message.
 *
 * @since 2.0.0
 *
 * @param {string} state   The state.
 * @param {string} message The message.
 */
export function showMessage (state, message) {
  // Set state and remove any child elements.
  const container = document.querySelector('[data-admin="message"]')
  container.setAttribute('data-state', state)
  // container.innerHTML = ''

  // Add message.
  const paragraph = document.createElement('p')
  paragraph.textContent = message

  // Add close button.
  const button = document.createElement('button')
  button.setAttribute('data-message', 'close')
  button.classList.add('admin__download-button')
  button.textContent = 'Close'
  paragraph.appendChild(button)

  // Append message to DOM.
  container.appendChild(paragraph)

  // Log message to console
  switch (state) {
    case 'error':
      console.error(message)
      break
    default:
      console.log(message)
      break
  }

  addMessageEventListeners()
}

/**
 * Clear message.
 * 
 * @since 2.0.0
 *
 * @param {Event} event The optional click event.
 */
export function clearMessage (event) {
  // If this was triggered by a click event, remove the event listener.
  if (event) event.target.removeEventListener('click', clearMessage)

  // Update state and remove any child elements.
  const container = document.querySelector('[data-admin="message"]')
  container.setAttribute('data-state', 'inactive')
  container.innerHTML = ''
}
