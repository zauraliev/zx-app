"use strict";

class FormValidator {

  constructor(form, fields) {
    this.form = form;
    this.fields = fields;
  }

  initialize() {
    this.validateOnSubmit();
    this.validateOnEntry();
  }

  validateOnSubmit() {
    let self = this;
    this.form.addEventListener('submit', event => {
      event.preventDefault();
      self.fields.forEach(field => {
        const input = document.querySelector(`#${field}`);
        self.validateFields(input);
      })
    })
  }

  validateOnEntry() {
    let self = this;
    this.fields.forEach(field => {
      const input = document.querySelector(`#${field}`);

      input.addEventListener('input', event => {
        console.log('input', input.value)
        self.validateFields(input);
      })

      input.addEventListener('change', event => {
        console.log('change', input.value)
        self.validateFields(input);
      })

    });
  }

  setStatus(field, message, status){
    const errorIcon = field.parentElement.querySelector('.icon-error');
    const errorMessage  = field.parentElement.querySelector('.error-message');
    
    if (status === "success") {
      if (errorIcon) { errorIcon.classList.add('hidden'); }
      if (errorMessage) { errorMessage.innerText = ""; }
      field.classList.remove('input-error');
    } 
    
    if (status === "error") {
      field.parentElement.querySelector('.error-message').innerText = message;
      field.classList.add('input-error');
    }    
  }


  validateFields(field, validated) {
    if (field.value.trim() === '') {
      return this.setStatus(field, `cannot be blank`, 'error');      
    } else {
      return this.setStatus(field, null, 'success');
    }
  }

}

export default FormValidator;