// IIFE
(function() {

function init() {
  addFormListeners()
  addClickListeners()
}

function capitalizeFirstLetter (string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function addFormListeners () {
  const forms = document.querySelectorAll('form')
  if (!forms || forms.length === 0) return false

  forms.forEach(form => form.addEventListener('submit', handleFormSubmit))
  return true
}

function handleFormSubmit (event) {
  event.preventDefault()

  if (window.gtag) {
    // Send a Google Analytics event
    gtag('event', 'sign_up', {
      method: capitalizeFirstLetter(event.target.name)
    })
  }

  // Submit the form
  event.target.submit()
  return true
}

function addClickListeners () {
  window.addEventListener('click', handleClick, false)
  return true
}

function handleClick (event) {
  handleCourseFinish(event)
  return true
}

function handleCourseFinish (event) {
  // Check if the course is finished
  const done = document.querySelector('[data-acc-text="100%"]')
  if (!done) return false
  const unlocked = window.getComputedStyle(done).getPropertyValue('display') === 'block'
  if (!unlocked) return false

  // Check if the Pledge button was clicked
  const pledgeButton = event.target.parentElement.parentElement.parentElement.parentElement.getAttribute('data-acc-text') === 'Rectangular Hotspot 1'
  if (!pledgeButton) return false

  // Get the brand
  let brand = document.querySelector('title').textContent.replace('The Promise to Deliver Fair Housing', '').trim()
  if (brand === '') brand = 'Coldwell Banker'

  // Define the event
  const eventData = {
    event_category: brand + ' Course',
    event_label: 'Finish'
  }

  if (window.gtag) {
    // Send a Google Analytics event
    gtag('event', 'course_view', eventData)
  }
  return true
}

init()

})()