import Template from './popup.hbs.js';
import Block from '../../scripts/k-react/block.js';
import Button from '../../components/button/button.js';
import DOMService from '../../scripts/k-react/dom-service.js';

export default class Popup extends Block {
  constructor(props, className = '') {
    super('div', className, props);
    this.button = new Button({
      text: props.buttonText || 'Ок',
      additionClass: ''
    });
    this.attachButton();
  }

  attachButton() {
    const DOM = new DOMService();
    DOM.attachComponent(this.element, '.popup__button', this.button.element);
  }

  render() {
    return Template;
  }
}

export const popupAddContactPreset = {
  typeIsContactAdd: true,
  isCloseable: true,
  title: 'Добавить контакт',
  buttonText: 'Добавить'
}

export const popupRemoveContactPreset = {
  typeIsContactRemove: true,
  isCloseable: true,
  title: 'Удалить контакт',
  buttonText: 'Удалить'
}

export const popupErrorPreset = {
  typeIsErrorWarning: true,
  isCloseable: false,
  title: 'Ошибка',
  buttonText: 'Понятно',
  errorMessage: 'Нужно указать на один из контактов в списке'
}
