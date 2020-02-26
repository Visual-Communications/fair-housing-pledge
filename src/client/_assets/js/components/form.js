/* IIFE */
(function () {

  function init() {
    const form = document.querySelector('#pledge')
    
    if (form) form.addEventListener('submit', handleSubmit)
  }

  function validateForm() {

    /* Form fields */
    const form = document.querySelector('#pledge')
    const firstName = form.elements.firstName.value
    const lastName = form.elements.lastName.value
    const email = form.elements.email.value
    const brand = form.elements.brand.value
    const state = form.elements.state.value
    const company = form.elements.company.value
    const event = form.elements.event.value
    const agreeToTerms = form.elements.agreeToTerms.checked

    /* Valid form fields */
    const firstNameIsValid = /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/.test(firstName)
    const lastNameIsValid = /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/.test(lastName)
    const emailIsValid = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)
    const brandIsValid = /(?:\s*[a-zA-Z0-9,_\.\077\0100\*\+\&\#\'\~\;\-\!\@\;]{2,}\s*)*/.test(brand)
    const stateIsValid = /^\w?$/.test(state)
    const companyIsValid = /(?:\s*[a-zA-Z0-9,_\.\077\0100\*\+\&\#\'\~\;\-\!\@\;]{2,}\s*)*/.test(company)
    const eventIsValid = /^[a-zA-Z0-9 ,.'-_]*$/.test(event)
    const agreeToTermsIsValid = agreeToTerms === true

    const typesAreValid = typeof firstName === 'string' &&
      typeof lastName === 'string' &&
      typeof email === 'string' &&
      typeof brand === 'string' &&
      typeof state === 'string' &&
      typeof company === 'string' &&
      typeof event === 'string' &&
      typeof agreeToTerms === 'boolean'

     const lengthsAreValid = firstName.length <= 255 &&
      lastName.length <= 255 &&
      email.length <= 255 &&
      brand.length <= 255 &&
      state.length <= 255 &&
      company.length <= 255 &&
      event.length <= 255

    const valuesAreValid = firstNameIsValid &&
      lastNameIsValid &&
      emailIsValid &&
      brandIsValid &&
      stateIsValid &&
      companyIsValid &&
      eventIsValid &&
      agreeToTermsIsValid

    if (!typesAreValid || !lengthsAreValid || !valuesAreValid) {
      return false
    } else {
      return true
    }
  }

  function showError(field) {
    const form = document.querySelector('#pledge')
    const element = form.elements[field]
    const parent = element.parentElement
    
    const errorExists = parent.querySelector('.form__error') || parent.getAttribute('data-state') === 'error'
    if (errorExists) return
      
    const parentLabel = parent.querySelector('label')
    const grandParentLabel = parent.parentElement.querySelector('label')
    const label = parentLabel ? parentLabel.textContent.toLowerCase() : grandParentLabel.textContent.toLowerCase()
    const error = document.createElement('p')

    parent.setAttribute('data-state', 'error')
    error.classList.add('form__error')
    error.textContent = `Please enter a valid ${label}.`

    parent.appendChild(error)
  }

  function removeError(field) {
    const form = document.querySelector('#pledge')
    const element = form.elements[field]
    const parent = element.parentElement

    const state = parent.getAttribute('data-state')
    if (state !== 'error') return

    const error = parent.querySelector('.form__error')
    if (!error) return

    parent.removeChild(error)
  }

  function handleErrors() {
    /* Form fields */
    const form = document.querySelector('#pledge')
    const firstName = form.elements.firstName.value
    const lastName = form.elements.lastName.value
    const email = form.elements.email.value
    const brand = form.elements.brand.value
    const state = form.elements.state.value
    const company = form.elements.company.value
    const event = form.elements.event.value
    const agreeToTerms = form.elements.agreeToTerms.checked

    /* Valid form fields */
    const firstNameIsValid = /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/.test(firstName)
    const lastNameIsValid = /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/.test(lastName)
    const emailIsValid = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)
    const brandIsValid = /(?:\s*[a-zA-Z0-9,_\.\077\0100\*\+\&\#\'\~\;\-\!\@\;]{2,}\s*)*/.test(brand)
    const stateIsValid = /^\w?$/.test(state)
    const companyIsValid = /(?:\s*[a-zA-Z0-9,_\.\077\0100\*\+\&\#\'\~\;\-\!\@\;]{2,}\s*)*/.test(company)
    const eventIsValid = /^[a-zA-Z0-9 ,.'-_]*$/.test(event)
    const agreeToTermsIsValid = agreeToTerms === true

    if (!firstNameIsValid) { showError('firstName') } else { removeError('firstName') }
    if (!lastNameIsValid) { showError('lastName') } else { removeError('lastName') }
    if (!emailIsValid) { showError('email') } else { removeError('email') }
    if (!brandIsValid) { showError('brand') } else { removeError('brand') }
    if (!stateIsValid) { showError('state') } else { removeError('state') }
    if (!companyIsValid) { showError('company') } else { removeError('company') }
    if (!eventIsValid) { showError('event') } else { removeError('event') }
    if (!agreeToTermsIsValid) { showError('agreeToTerms') } else { removeError('agreeToTerms') }
  }

  function handleSubmit(e) {
    e.preventDefault()

    const formIsValid = validateForm()
    const form = e.target

    if (!formIsValid) {
      handleErrors()
    } else {
      form.submit()
    }
  }

  init()

})()