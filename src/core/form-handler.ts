import { Validators } from "./types";

export default class FormHandler {

  private _validationRegex: Validators;
  private _form: HTMLFormElement | null;
  private _inputs: Array<HTMLInputElement>;
  private _equalDataInputs: Array<HTMLInputElement>;

  constructor() {
    this._queryElements();
    this._validationRegex = {
      name: /^[a-zA-Zа-яёА-ЯЁ]{2,20}$/,
      email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
      login: /^[a-zA-Z][a-zA-Z0-9]{4,20}$/,
      password: /^[a-zA-Zа-яёА-ЯЁ0-9]{8,25}$/,
      tel: /^(\+{1}7{1}|8)\ ?\(?\d{3}\)?\ ?\d{3}[ -]?\d{2}[ -]?\d{2}$/
    };
  }

  private _queryElements() {
    this._form = document.querySelector('form');
    if (this._form === null) {
      return;
    }
    this._inputs = Array.from(this._form.querySelectorAll('input'));
    this._equalDataInputs = this._inputs.filter(input => input.hasAttribute('data-required-equality'));
  }

  handle() {
    if (this._form === null) {
      return;
    }
    this._form.addEventListener('submit', (e) => {
      e.preventDefault();
      console.log('handle form ', this._form);

      let isFormValid = true;
      this._inputs.forEach(input => {
        if (!this._isValidInput(input)) {
          isFormValid = false;
          input.classList.add('invalid-input');
        }
      });
      if (!isFormValid) {
        return;
      }

      if (this._form === null) {
        return;
      }
      const formData = new FormData(this._form);
      console.log(this._form.name, Object.fromEntries(formData.entries()));

      // Эмуляция успешного входа/регистрации
      if (this._form.name === 'login' || this._form.name === 'signin') {
        const redirect = confirm('Данные формы выведены в консоль. Перейти на страницу выбора собеседника?');
        if (redirect) {
          window.location.href = "/pages/chat-select/chat-select.html";
        }
      }
    });

    this._inputs.forEach(input => {
      input.addEventListener('focus', (e) => {
        if (e.target instanceof HTMLInputElement) {
          e.target.classList.remove('invalid-input');
        }
      });
      input.addEventListener('blur', (e) => {
        if (e.target instanceof HTMLInputElement) {
          if (!this._isValidInput(e.target)) {
            e.target.classList.add('invalid-input');
          }
        }
      });
    });
  }

  private _isValidInput(inputElement: HTMLInputElement) {
    if (!inputElement.dataset.validationKey) {
      if (!inputElement.dataset.requiredEquality) {
        return true;
      } else {
        return this._equalDataInputs.every(chainedInput => chainedInput.value === inputElement.value);
      }
    }
    const regEx = this._validationRegex[inputElement.dataset.validationKey];
    return regEx.test(inputElement.value);
  }
}
