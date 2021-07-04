import EventBus from '../event-bus/event-bus';
import type { Validators } from '../../core/types';

export default class FormHandler {

    private static __instance: FormHandler | undefined;
    private _eventBus: () => EventBus;
    private _validationRegex: Validators;

    constructor() {
        if (FormHandler.__instance) {
            return FormHandler.__instance;
        }

        const eventBus = new EventBus();
        this._eventBus = () => eventBus;
        this._validationRegex = {
            name: /^[a-zA-Zа-яёА-ЯЁ]{2,20}$/,
            email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
            login: /^[a-zA-Z][a-zA-Z0-9]{4,20}$/,
            password: /^[a-zA-Zа-яёА-ЯЁ0-9]{8,25}$/,
            tel: /^(\+{1}7{1}|8) ?\(?\d{3}\)? ?\d{3}[ -]?\d{2}[ -]?\d{2}$/
        };

        FormHandler.__instance = this;
    }

    public subscribe(formName: string, callback: Function): void {
        this._eventBus().on(formName, callback);
    }

    public unsubscribe(formName: string, callback: Function): void {
        this._eventBus().off(formName, callback);
    }

    public setValidationListeners(form: HTMLFormElement): void {
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

        this._eventBus().emit(form.name, jsonData);
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
