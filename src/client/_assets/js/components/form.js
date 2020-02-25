function init() {
  const form = document.querySelector('#pledge')

  if (form) {
    form.addEventListener('submit', handleSubmit)
  }
}

function formIsValidated() {
  const form = document.querySelector('#pledge')
  const firstName = form.elements.firstName.value
  const lastName = form.elements.lastName.value
  const email = form.elements.email.value
  const brand = form.elements.brand.value
  const state = form.elements.state.value
  const company = form.elements.company.value
  const event = form.elements.event.value
  const agreeToTerms = form.elements.agreeToTerms.checked

  console.log('firstName', firstName)
  console.log('lastName', lastName)
  console.log('email', email)
  console.log('brand', brand)
  console.log('state', state)
  console.log('company', company)
  console.log('event', event)
  console.log('agreeToTerms', agreeToTerms)

  // TODO: Validate form fields, return false if invalid, else true

  return true
  
}

function handleSubmit(e) {
  e.preventDefault()
  const form = e.target

  console.log('formIsValidated()', formIsValidated())

  setTimeout(() => {
    form.submit()
  }, 3000)
}

init()