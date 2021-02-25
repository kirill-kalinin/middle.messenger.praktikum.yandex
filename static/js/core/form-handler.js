import Router from "./router/router.js";
export default class FormHandler {
    constructor() {
        this._router = new Router();
        this._validationRegex = {
            name: /^[a-zA-Zа-яёА-ЯЁ]{2,20}$/,
            email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
            login: /^[a-zA-Z][a-zA-Z0-9]{4,20}$/,
            password: /^[a-zA-Zа-яёА-ЯЁ0-9]{8,25}$/,
            tel: /^(\+{1}7{1}|8)\ ?\(?\d{3}\)?\ ?\d{3}[ -]?\d{2}[ -]?\d{2}$/
        };
    }
    addValidationListeners(form) {
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
    handleSubmit() {
        document.addEventListener('submit', e => {
            if (e.target instanceof HTMLFormElement) {
                e.preventDefault();
                this._onSubmit(e.target);
            }
        });
    }
    _onSubmit(form) {
        const [inputs, equalDataInputs] = this._queryElements(form);
        console.log('handle form ', form);
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
        console.log(form.name, Object.fromEntries(formData.entries()));
        // Эмуляция успешного входа/регистрации
        if (form.name === 'login' || form.name === 'signin') {
            const redirect = confirm('Данные формы выведены в консоль. Перейти на страницу выбора собеседника?');
            if (redirect) {
                this._router.go('/chat-select');
            }
        }
    }
    _isValidInput(inputElement, equalDataInputs) {
        if (!inputElement.dataset.validationKey) {
            if (!inputElement.dataset.requiredEquality) {
                return true;
            }
            else {
                return equalDataInputs.every(chainedInput => chainedInput.value === inputElement.value);
            }
        }
        const regEx = this._validationRegex[inputElement.dataset.validationKey];
        return regEx.test(inputElement.value);
    }
    _queryElements(form) {
        const inputs = Array.from(form.querySelectorAll('input'));
        const equalDataInputs = inputs.filter(input => input.hasAttribute('data-required-equality'));
        return [inputs, equalDataInputs];
    }
}
//# sourceMappingURL=form-handler.js.map