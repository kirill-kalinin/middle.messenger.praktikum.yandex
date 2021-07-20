import Router from '../../core/router/router';
import DOMService from '../../core/k-react/dom-service';
import Popup from '../../components/popup/popup';
import type { BlockProps, PopupEvents } from '../../core/types';
import * as sanitizeHtml from 'sanitize-html';

export default class PopupHandler {

    private _DOMService: DOMService;
    private _Router: Router;
    private _popup: Popup;

    constructor() {
        this._DOMService = new DOMService();
        this._Router = new Router();
    }

    public pushPopup(props: BlockProps, events: PopupEvents): void {
        this._popup = new Popup(props);
        this._handlePopup(events);
        this._DOMService.attachComponent(this._popup, 'body');
    }

    private _detachPopup = (callback?: Function) => {
        this._DOMService.detachComponent(this._popup);
        this._Router.enable();
        if (typeof callback === 'function') {
            callback();
        }
    };

    private _handlePopup(events: PopupEvents) {
        const closeButton = this._popup.element.querySelector('.popup__close');
        if (closeButton instanceof HTMLElement) {
            closeButton.addEventListener('click', this._detachPopup.bind(this));
        }

        const primaryButton = this._popup.element.querySelector('.popup__button button');
        if (primaryButton instanceof HTMLElement) {
            primaryButton.addEventListener('click', () => this._detachPopup(() => {
                if (events.primary) {
                    this._invokeCallback(events.primary);
                }
            }));
        }

        const secondaryButton = this._popup.element.querySelector('.popup__button-secondary button');
        if (secondaryButton instanceof HTMLElement) {
            secondaryButton.addEventListener('click', () => this._detachPopup(() => {
                if (events.secondary) {
                    this._invokeCallback(events.secondary);
                }
            }));
        }
    }

    private _invokeCallback(callback: Function) {
        try {
            callback(this._getInput());
        } catch (error) {
            const props = this.getWarningPreset('Ошибка', error.message);
            this.pushPopup(props, {});
        }
    }

    private _getInput(): string | undefined {
        const input = this._popup.element.querySelector('.popup__input');
        if (input instanceof HTMLInputElement && input.dataset.validator) {
            input.value = sanitizeHtml(input.value);
            return this._validateInput(input.value, input.dataset.validator);
        }
    }

    private _validateInput(value: string, validator: string): string | never {
        const regExp = new RegExp(validator);
        if (regExp.test(value)) {
            return value;
        } else {
            throw new Error('Введены некорректные данные');
        }
    }

    public getWarningPreset(title: string, message: string | number): BlockProps {
        return {
            typeIsWarning: true,
            isCloseable: false,
            title: title,
            warningMessage: message,
            buttonText: 'Закрыть'
        };
    }

}
