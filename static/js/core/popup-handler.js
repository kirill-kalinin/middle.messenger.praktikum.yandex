import Router from "./router/router.js";
import DOMService from "./k-react/dom-service.js";
import Popup, { popupRemoveContactPreset, popupWarningContactPreset } from '../components/popup/popup.js';
export var PopupTypes;
(function (PopupTypes) {
    PopupTypes[PopupTypes["CONTACT_ADD"] = 0] = "CONTACT_ADD";
    PopupTypes[PopupTypes["CONTACT_REMOVE"] = 1] = "CONTACT_REMOVE";
    PopupTypes[PopupTypes["CONTACT_PROMPT"] = 2] = "CONTACT_PROMPT";
    PopupTypes[PopupTypes["CONTACT_ERROR"] = 3] = "CONTACT_ERROR";
})(PopupTypes || (PopupTypes = {}));
export default class PopupHandler {
    constructor() {
        this._detachPopup = (callback) => {
            this._DOMService.detachComponent(this._popup);
            this._Router.enable();
            if (typeof callback === 'function') {
                callback();
            }
        };
        this._DOMService = new DOMService();
        this._Router = new Router();
    }
    pushPopup(props, type) {
        this._popup = new Popup(props);
        this._handlePopup(type);
        this._DOMService.attachComponent(this._popup, 'body');
    }
    _handlePopup(popupType) {
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
                    document.addEventListener('mouseup', (e) => {
                        this._Router.disable();
                        const contact = e.target.closest('.contact');
                        if (contact) {
                            const contactName = contact.querySelector('.contact__name');
                            let name;
                            if (contactName && contactName instanceof HTMLElement) {
                                name = contactName.innerText;
                            }
                            else {
                                throw new Error('Ошибка в шаблоне контакта');
                            }
                            this.pushPopup({ ...popupRemoveContactPreset, contactToRemove: name }, PopupTypes.CONTACT_REMOVE);
                        }
                        else {
                            this.pushPopup(popupWarningContactPreset, PopupTypes.CONTACT_ERROR);
                        }
                    }, { once: true });
                }));
            case PopupTypes.CONTACT_ERROR:
                mainButton.addEventListener('click', this._detachPopup.bind(this));
                break;
            default:
                console.error('Неправильно указан тип поп-апа');
        }
    }
}
//# sourceMappingURL=popup-handler.js.map