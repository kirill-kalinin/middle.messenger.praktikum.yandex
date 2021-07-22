import Template from './popup.hbs.js';
import Block from '../../core/k-react/block';
import Button from '../../components/button/button';
import DOMService from '../../core/k-react/dom-service';
import type { BlockProps } from '../../core/types';

export default class Popup extends Block {

    private _button: Button;
    private _buttonSecondary: Button;

    constructor(props: BlockProps = {}, className = '') {
        super('div', className, props);
        this._button = new Button({
            text: props.buttonText,
            additionClass: ''
        });
        if (props.buttonSecondaryText) {
            this._buttonSecondary = new Button({
                text: props.buttonSecondaryText,
                additionClass: ''
            });
        }
        this._attachButton();
    }

    private _attachButton() {
        const DOM = new DOMService();
        DOM.attachComponent(this._button, '.popup__button', this);
        if (this._buttonSecondary) {
            DOM.attachComponent(this._buttonSecondary, '.popup__button-secondary', this);
        }
    }

    render(): string {
        return Template;
    }

}
