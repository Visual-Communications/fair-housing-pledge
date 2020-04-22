// IIFE
(function() {

function init() {
  addFormListeners()
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function addFormListeners() {
  // If there are no forms, we're done
  if (document.getElementsByTagName('form').length === 0) return false

  // Get document forms and store in an array
  const forms = Array.prototype.slice.call(document.getElementsByTagName('form'))

  // Add an event listener to every form
  forms.map(form => {

    form.addEventListener('submit', function (e) {
      e.preventDefault()

      // Send a Google Analytics event
      const analyticsEvent = {
        eventCategory: 'Forms',
        eventAction: 'Submit',
        eventLabel: capitalizeFirstLetter(e.target.name)
      }

      gtag('event', 'sign_up', analyticsEvent);

      // Submit the form
      e.target.submit()

    })

  })

}

init()

})()