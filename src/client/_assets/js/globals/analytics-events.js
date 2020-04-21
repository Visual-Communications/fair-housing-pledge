// IIFE
(function() {

function addFormListeners() {

  // If there are no forms, we're done
  if (document.forms.length === 0) return false

  // Get document forms and store in an array
  const forms = Array.prototype.slice.call(document.forms)

  // Add an event listener to every form
  forms.map(form => {

    form.createEventListener('submit', function (e) {

      console.log(e)

      // ga('send', {
      //   hitType: 'event',
      //   eventCategory: 'Forms',
      //   eventAction: 'Submit',
      //   eventLabel: 'Pledge',
      //   eventValue: [eventValue]
      // })

    })

  })

}

})()