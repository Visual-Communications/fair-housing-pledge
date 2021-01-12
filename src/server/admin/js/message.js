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
 * Show UI error.
 *
 * @since 2.4.0
 *
 * @param {Error} error The error.
 */
export function showError (error) {
  showMessage('error', `${error.name}: ${error.message}`)
}

/**
 * Clear message.
 * 
 * @since 2.0.0
 *
 * @param {Event} event The optional click event.
 */
export function clearMessage (event) {
  const container = document.querySelector('[data-admin="message"]')

  // If this was triggered by a click event, remove the message.
  if (event) container.removeChild(event.target.parentElement)

  // Update state.
  container.setAttribute('data-state', 'inactive')

  /*
  @todo: Remove child elements that do not contain a close button instead of
  removing all child elements.
   */
  container.innerHTML = ''
}

/**
 * Add message event listeners.
 *
 * @since 2.0.0
 */
export function addMessageEventListeners () {
  const buttons = document.querySelectorAll('[data-message="close"]')
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', clearMessage)
  }
}
