import Router from './router/router';
import HTTPService from './services/http-service';
import type { Validators, RequestOptions } from './types';

export default class FormHandler {

  private _router: Router;
  private _http: HTTPService;
  private _validationRegex: Validators;

  constructor() {
      this._router = new Router();
      this._http = new HTTPService();
      this._validationRegex = {
          name: /^[a-zA-Zа-яёА-ЯЁ]{2,20}$/,
          email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
          login: /^[a-zA-Z][a-zA-Z0-9]{4,20}$/,
          password: /^[a-zA-Zа-яёА-ЯЁ0-9]{8,25}$/,
          tel: /^(\+{1}7{1}|8) ?\(?\d{3}\)? ?\d{3}[ -]?\d{2}[ -]?\d{2}$/
      };
  }

  public addValidationListeners(form: HTMLFormElement): void {
      const [inputs, equalDataInputs] = this._queryElements(form);
      inputs.forEach(input => {
          input.addEventListener('focus', (e) => {
              if (e.target instanceof HTMLInputElement) {
                  e.target.classList.remove('invalid-input');
              }
          });
          input.addEventListener('blur', (e) => {
              if (e.target instanceof HTMLInputElement) {
                  if (!this._isValidInput(e.target, equalDataInputs)) {
                      e.target.classList.add('invalid-input');
                  }
              }
          });
      });
  }

  public handleSubmit(): void {
      document.addEventListener('submit', e => {
          if (e.target instanceof HTMLFormElement) {
              e.preventDefault();
              this._onSubmit(e.target);
          }
      });
  }

  private async _onSubmit(form: HTMLFormElement) {
      const [inputs, equalDataInputs] = this._queryElements(form);

      let isFormValid = true;
      inputs.forEach(input => {
          if (!this._isValidInput(input, equalDataInputs)) {
              isFormValid = false;
              input.classList.add('invalid-input');
          }
      });
      if (!isFormValid) {
          return;
      }

      const formData = new FormData(form);
      const jsonData = JSON.stringify(Object.fromEntries(formData.entries()));
      console.log(form.name, jsonData);

      let url: string;
      switch (form.name) {
      case 'login':
          url = '/auth/signin';
          break;
      case 'signin':
          url = '/auth/signup';
          break;
      default:
          console.error('Попытка отправить неизвестную форму', form.name);
          return;
      }
      const options: RequestOptions = {
          data: jsonData,
          headers: [
              ['Content-type', 'application/json; charset=utf-8']
          ]
      };

      const response = await this._http.post(url, options);

      if (response instanceof XMLHttpRequest) {
          console.log('response', response);
          console.log('status', response.status);
          if (response.status === 500) {
              this._router.go('/500');
          }
      } else {
          console.error('response is not XMLHttpRequest', response);
      }
  }

  private _isValidInput(inputElement: HTMLInputElement, equalDataInputs: Array<HTMLInputElement>) {
      if (!inputElement.dataset.validationKey) {
          if (!inputElement.dataset.requiredEquality) {
              return true;
          } else {
              return equalDataInputs.every(chainedInput => chainedInput.value === inputElement.value);
          }
      }
      const regEx = this._validationRegex[inputElement.dataset.validationKey];
      return regEx.test(inputElement.value);
  }

  private _queryElements(form: HTMLFormElement): [Array<HTMLInputElement>, Array<HTMLInputElement>] {
      const inputs = Array.from(form.querySelectorAll('input'));
      const equalDataInputs = inputs.filter(input => input.hasAttribute('data-required-equality'));
      return [inputs, equalDataInputs];
  }
}
