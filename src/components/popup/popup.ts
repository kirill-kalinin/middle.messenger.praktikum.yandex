import Template from './popup.hbs.js';
import Block from '../../core/k-react/block';
import Button from '../../components/button/button';
import DOMService from '../../core/k-react/dom-service';
import type { BlockProps } from '../../core/types';

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

    render(): string {
        return Template;
    }

}

export const popupAddContactPreset: BlockProps = {
    typeIsContactAdd: true,
    isCloseable: true,
    title: 'Добавить контакт',
    buttonText: 'Добавить'
};

export const popupRemoveContactPreset: BlockProps = {
    typeIsContactRemove: true,
    isCloseable: true,
    title: 'Удалить контакт',
    buttonText: 'Удалить'
};

export const popupPromptContactPreset: BlockProps = {
    typeIsWarning: true,
    isCloseable: false,
    title: 'Удаление контакта',
    warningMessage: 'Теперь кликните на контакт из списка',
    buttonText: 'Понятно'
};

export const popupWarningContactPreset: BlockProps = {
    typeIsWarning: true,
    isCloseable: false,
    title: 'Ошибка',
    warningMessage: 'Нужно указать на один из контактов в списке',
    buttonText: 'Понятно'
};
