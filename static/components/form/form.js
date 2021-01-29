import Template from './form.hbs.js';
import Block from '../../scripts/k-react/block.js';

export default class Form extends Block {
  constructor(props, className = 'fragment') {
    super('div', className, props);
  }

  render() {
    return Template;
  }
}

export const formLoginPreset = {
  title: 'Вход',
  name: 'login',
  fields: [
    {
      label: 'Логин',
      type: 'text',
      name: 'login',
      placeholder: 'Ваш логин'
    }, {
      label: 'Пароль',
      type: 'password',
      name: 'password',
      placeholder: 'Ваш пароль'
    }
  ]
};

export const formSigninPreset = {
  title: 'Регистрация',
  name: 'signin',
  fields: [
    {
      label: 'Почта',
      type: 'text',
      name: 'email',
      placeholder: 'Ваш e-mail'
    }, {
      label: 'Логин',
      type: 'text',
      name: 'login',
      placeholder: 'Ваш логин'
    }, {
      label: 'Имя',
      type: 'text',
      name: 'first_name',
      placeholder: 'Ваше имя'
    }, {
      label: 'Фамилия',
      type: 'text',
      name: 'second_name',
      placeholder: 'Ваша фамилия'
    }, {
      label: 'Телефон',
      type: 'tel',
      name: 'phone',
      placeholder: 'Ваш телефон'
    }, {
      label: 'Пароль',
      type: 'password',
      name: 'password',
      placeholder: 'Придумайте пароль'
    }, {
      label: 'Пароль (еще раз)',
      type: 'password',
      name: '',
      placeholder: 'Введите пароль еще раз'
    }
  ]
};
