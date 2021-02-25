import Template from '../../../components/popup/popup.hbs.js';
import Block from '../../core/k-react/block.js';
import Button from '../../components/button/button.js';
import DOMService from '../../core/k-react/dom-service.js';
import type { BlockProps } from '../../core/types.js';

export default class Popup extends Block {

  private _button: Button;

  constructor(props: BlockProps = {}, className = '') {
    super('div', className, props);
    this._button = new Button({
      text: props.buttonText || 'Ок',
      additionClass: ''
    });
    this._attachButton();
  }

  private _attachButton() {
    const DOM = new DOMService();
    DOM.attachComponent(this._button, '.popup__button', this);
  }

  render() {
    return Template;
  }

}

export const popupAddContactPreset: BlockProps = {
  typeIsContactAdd: true,
  isCloseable: true,
  title: 'Добавить контакт',
  buttonText: 'Добавить'
}

export const popupRemoveContactPreset: BlockProps = {
  typeIsContactRemove: true,
  isCloseable: true,
  title: 'Удалить контакт',
  buttonText: 'Удалить'
}

export const popupErrorPreset: BlockProps = {
  typeIsErrorWarning: true,
  isCloseable: false,
  title: 'Ошибка',
  buttonText: 'Понятно',
  errorMessage: 'Нужно указать на один из контактов в списке'
}
