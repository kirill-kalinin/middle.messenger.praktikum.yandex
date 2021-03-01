import Template from '../../../components/popup/popup.hbs.js';
import Block from '../../core/k-react/block.js';
import Button from '../../components/button/button.js';
import DOMService from '../../core/k-react/dom-service.js';
export default class Popup extends Block {
    constructor(props = {}, className = '') {
        super('div', className, props);
        this._button = new Button({
            text: props.buttonText || 'Ок',
            additionClass: ''
        });
        this._attachButton();
    }
    _attachButton() {
        const DOM = new DOMService();
        DOM.attachComponent(this._button, '.popup__button', this);
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
};
export const popupRemoveContactPreset = {
    typeIsContactRemove: true,
    isCloseable: true,
    title: 'Удалить контакт',
    buttonText: 'Удалить'
};
export const popupPromptContactPreset = {
    typeIsWarning: true,
    isCloseable: false,
    title: 'Удаление контакта',
    warningMessage: 'Теперь кликните на контакт из списка',
    buttonText: 'Понятно'
};
export const popupWarningContactPreset = {
    typeIsWarning: true,
    isCloseable: false,
    title: 'Ошибка',
    warningMessage: 'Нужно указать на один из контактов в списке',
    buttonText: 'Понятно'
};
//# sourceMappingURL=popup.js.map