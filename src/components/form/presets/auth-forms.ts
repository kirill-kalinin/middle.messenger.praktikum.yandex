import { BlockProps } from '../../../core/types';

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
