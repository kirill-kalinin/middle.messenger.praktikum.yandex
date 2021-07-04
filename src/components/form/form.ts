import Template from './form.hbs.js';
import Block from '../../core/k-react/block';
import FormHandler from '../../modules/form-handler/form-handler';
import type { BlockProps } from '../../core/types';

export default class Form extends Block {

    private _formHandler: FormHandler;

    constructor(props: BlockProps = {}, className = 'fragment') {
        super('div', className, props);
    }

    private _setInputListeners() {
        const form = this.element.querySelector('form');
        if (form instanceof HTMLFormElement) {
            this._formHandler.setValidationListeners(form);
        }
    }

    componentDidMount(): void {
        this._formHandler = new FormHandler();
        this._setInputListeners();
    }

    componentDidUpdate(): void {
        this._setInputListeners();
    }

    render(): string {
        return Template;
    }

}

export const formLoginPreset: BlockProps = {
    title: 'Вход',
    name: 'login',
    fields: [
        {
            label: 'Логин',
            type: 'text',
            name: 'login',
            placeholder: 'Ваш логин',
            validationKey: 'login',
            validationText: 'Корректный логин содержит от 5 до 20 латинских букв или цифр, первый символ - буква'
        }, {
            label: 'Пароль',
            type: 'password',
            name: 'password',
            placeholder: 'Ваш пароль',
            validationKey: 'password',
            validationText: 'Корректный пароль содержит от 8 до 25 букв или цифр'
        }
    ]
};

export const formSigninPreset: BlockProps = {
    title: 'Регистрация',
    name: 'signup',
    fields: [
        {
            label: 'Почта',
            type: 'text',
            name: 'email',
            placeholder: 'Ваш e-mail',
            validationKey: 'email',
            validationText: 'Введите корректный адрес почты'
        }, {
            label: 'Логин',
            type: 'text',
            name: 'login',
            placeholder: 'Ваш логин',
            validationKey: 'login',
            validationText: 'От 5 до 20 латинских букв или цифр, первый символ - буква'
        }, {
            label: 'Имя',
            type: 'text',
            name: 'first_name',
            placeholder: 'Ваше имя',
            validationKey: 'name',
            validationText: 'Допускается от 2 до 20 букв в имени'
        }, {
            label: 'Фамилия',
            type: 'text',
            name: 'second_name',
            placeholder: 'Ваша фамилия',
            validationKey: 'name',
            validationText: 'Допускается от 2 до 20 букв в фамилии'
        }, {
            label: 'Телефон',
            type: 'tel',
            name: 'phone',
            placeholder: 'Ваш телефон',
            validationKey: 'tel',
            validationText: 'Введите корректный номер телефона'
        }, {
            label: 'Пароль',
            type: 'password',
            name: 'password',
            placeholder: 'Придумайте пароль',
            validationKey: 'password',
            validationText: 'Введите от 8 до 25 букв или цифр',
            equality: true
        }, {
            label: 'Пароль (еще раз)',
            type: 'password',
            name: '',
            placeholder: 'Введите пароль еще раз',
            equality: true,
            validationText: 'Пароли не совпадают',
        }
    ]
};
