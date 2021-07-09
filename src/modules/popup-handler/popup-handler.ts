import Router from '../../core/router/router';
import DOMService from '../../core/k-react/dom-service';
import Popup, {
    popupRemoveContactPreset,
    popupWarningContactPreset
} from '../../components/popup/popup';
import type { BlockProps } from '../../core/types';

export enum PopupTypes {
    CONTACT_ADD,
    CONTACT_REMOVE,
    CONTACT_PROMPT,
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

        switch (popupType) {
            
        case PopupTypes.CONTACT_ADD:
            mainButton.addEventListener('click', () => this._detachPopup(() => {
                console.log('Здесь будет функция, добавляющая контакт');
            }));
            break;

        case PopupTypes.CONTACT_REMOVE:
            mainButton.addEventListener('click', () => this._detachPopup(() => {
                console.log('Здесь будет функция, удаляющая контакт');
            }));
            break;

        case PopupTypes.CONTACT_PROMPT:
            mainButton.addEventListener('click', () => this._detachPopup(() => {
                this._contactSelect();
            }));
            break;

        case PopupTypes.WARNING:
            mainButton.addEventListener('click', this._detachPopup.bind(this));
            break;
            
        default:
            console.error('Неправильно указан тип поп-апа');
        }
    }

    private _contactSelect() {
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
                this.pushPopup({...popupRemoveContactPreset, contactToRemove: name}, PopupTypes.CONTACT_REMOVE);
            } else {
                this.pushPopup(popupWarningContactPreset, PopupTypes.WARNING);
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
