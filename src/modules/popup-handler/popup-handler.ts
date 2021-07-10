import Router from '../../core/router/router';
import DOMService from '../../core/k-react/dom-service';
import Popup from '../../components/popup/popup';
import * as presets from '../../components/popup/presets/chat-toolbar-popups';
import type { BlockProps } from '../../core/types';

export enum PopupTypes {
    SELECT_ADD,
    SELECT_REMOVE,
    CHAT_ADD,
    CHAT_REMOVE,
    CHAT_PROMPT,
    USER_ADD,
    USER_REMOVE,
    WARNING
}

export default class PopupHandler {

    private _DOMService: DOMService;
    private _Router: Router;
    private _popup: Popup;

    constructor() {
        this._DOMService = new DOMService();
        this._Router = new Router();
    }

    public pushPopup(props: BlockProps, type: PopupTypes): void {
        this._popup = new Popup(props);
        this._handlePopup(type);
        this._DOMService.attachComponent(this._popup, 'body');
    }

    private _detachPopup = (callback?: Function) => {
        this._DOMService.detachComponent(this._popup);
        this._Router.enable();
        if (typeof callback === 'function') {
            callback();
        }
    };

    private _handlePopup(popupType: PopupTypes) {
        const closeButton = this._popup.element.querySelector('.popup__close');
        if (closeButton && closeButton instanceof HTMLElement) {
            closeButton.addEventListener('click', this._detachPopup.bind(this));
        }
        const mainButton = this._popup.element.querySelector('.popup__button button');
        if (!mainButton) {
            console.error('Главная кнопка поп-апа не найдена, возможно он неправильно настроен');
            return;
        }
        let secondaryButton;

        switch (popupType) {

        case PopupTypes.SELECT_ADD:
            mainButton.addEventListener('click', () => this._detachPopup(() => {
                this.pushPopup(presets.popupAddChatPreset, PopupTypes.CHAT_ADD);
            }));
            secondaryButton = this._popup.element.querySelector('.popup__button-secondary button');
            secondaryButton ? secondaryButton.addEventListener('click', () => this._detachPopup(() => {
                this.pushPopup(presets.popupAddUserPreset, PopupTypes.USER_ADD);
            })) : console.error('Дополнительная кнопка поп-апа не найдена');
            break;

        case PopupTypes.SELECT_REMOVE:
            mainButton.addEventListener('click', () => this._detachPopup(() => {
                this.pushPopup(presets.popupPromptChatPreset, PopupTypes.CHAT_PROMPT);
            }));
            secondaryButton = this._popup.element.querySelector('.popup__button-secondary button');
            secondaryButton ? secondaryButton.addEventListener('click', () => this._detachPopup(() => {
                this.pushPopup(presets.popupRemoveUserPreset, PopupTypes.USER_REMOVE);
            })) : console.error('Дополнительная кнопка поп-апа не найдена');
            break;

        case PopupTypes.USER_ADD:
            mainButton.addEventListener('click', () => this._detachPopup(() => {
                // Метод контроллера - удалить пользователя из активного чата
                console.log('Добавляем пользователя');
            }));
            break;

        case PopupTypes.USER_REMOVE:
            mainButton.addEventListener('click', () => this._detachPopup(() => {
                // Метод контроллера - удалить пользователя из активного чата
                console.log('Удаляем пользователя');
            }));
            break;

        case PopupTypes.CHAT_ADD:
            mainButton.addEventListener('click', () => this._detachPopup(() => {
                // Метод контроллера - создать чат
                console.log('Добавляем чат');
            }));
            break;

        case PopupTypes.CHAT_REMOVE:
            mainButton.addEventListener('click', () => this._detachPopup(() => {
                // Метод контроллера - удалить  чат
                console.log('Удаляем чат');
            }));
            break;

        case PopupTypes.CHAT_PROMPT:
            mainButton.addEventListener('click', () => this._detachPopup(() => {
                this._chatRemove();
            }));
            break;

        case PopupTypes.WARNING:
            mainButton.addEventListener('click', this._detachPopup.bind(this));
            break;

        default:
            console.error('Неправильно указан тип поп-апа');
        }
    }

    private _chatRemove() {
        document.addEventListener('mouseup', (e: Event) => {
            this._Router.disable();
            const contact = (e.target as HTMLElement).closest('.contact');
            if (contact) {
                const contactName = contact.querySelector('.contact__name');
                let name;
                if (contactName && contactName instanceof HTMLElement) {
                    name = contactName.innerText;
                } else {
                    throw new Error('Ошибка в шаблоне контакта');
                }
                this.pushPopup({...presets.popupRemoveChatPreset, value: name}, PopupTypes.CHAT_REMOVE);
            } else {
                this.pushPopup(presets.popupWarningChatPreset, PopupTypes.WARNING);
            }
        }, {once: true});
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
