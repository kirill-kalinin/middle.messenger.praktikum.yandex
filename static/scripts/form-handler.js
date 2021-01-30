export default class FormHandler {
  constructor() {
    this.form = document.querySelector('form');
    this.inputs = this.form.querySelectorAll('input');
    this.equalDataInputs = Array.from(this.inputs)
      .filter(input => input.hasAttribute('data-required-equality'));
    this.validationRegex = {
      name: /^[a-zA-Zа-яёА-ЯЁ]{2,20}$/,
      email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
      login: /^[a-zA-Z][a-zA-Z0-9]{4,20}$/,
      password: /^[a-zA-Zа-яёА-ЯЁ0-9]{8,25}$/,
      tel: /^(\+{1}7{1}|8)\ ?\(?\d{3}\)?\ ?\d{3}[ -]?\d{2}[ -]?\d{2}$/
    };
  }

  handle() {
    this.form.addEventListener('submit', (e) => {
      e.preventDefault();

      let isFormValid = true;
      this.inputs.forEach(input => {
        if (!this._isValidInput(input)) {
          isFormValid = false;
          input.classList.add('invalid-input');
        }
      });
      if (!isFormValid) {
        return;
      }

      const formData = new FormData(e.target);
  
      console.log(e.target.name, Object.fromEntries(formData.entries()));
  
      // Эмуляция успешного входа/регистрации
      if (e.target.name === 'login' || e.target.name === 'signin') {
        const redirect = confirm('Данные формы выведены в консоль. Перейти на страницу выбора собеседника?');
        if (redirect) {
          window.location.href = "/pages/chat-select/chat-select.html";
        }
      }
    });

    this.inputs.forEach(input => {
      input.addEventListener('focus', (e) => {
        e.target.classList.remove('invalid-input');
      });
      input.addEventListener('blur', (e) => {
        if (!this._isValidInput(e.target)) {
          e.target.classList.add('invalid-input');
        }
      });
    });
  }

  _isValidInput(inputElement) {
    if (!inputElement.dataset.validationKey) {
      if (!inputElement.dataset.requiredEquality) {
        return true;
      } else {
        return this.equalDataInputs.every(chainedInput => chainedInput.value === inputElement.value);
      }
    }
    const regEx = this.validationRegex[inputElement.dataset.validationKey];
    return regEx.test(inputElement.value);
  }
}
