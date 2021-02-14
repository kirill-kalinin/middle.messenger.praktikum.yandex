import Template from '../../../components/chat-sidebar/chat-sidebar.hbs.js';
import Block from '../../core/k-react/block.js';
import Popup, { popupAddContactPreset, popupRemoveContactPreset, popupErrorPreset } from '../../components/popup/popup.js';
import DOMService from '../../core/k-react/dom-service.js';
var PopupTypes;
(function (PopupTypes) {
    PopupTypes[PopupTypes["ADD"] = 0] = "ADD";
    PopupTypes[PopupTypes["REMOVE"] = 1] = "REMOVE";
    PopupTypes[PopupTypes["ERROR"] = 2] = "ERROR";
})(PopupTypes || (PopupTypes = {}));
export default class ChatSidebar extends Block {
    constructor(props = {}, className = 'fragment') {
        super('div', className, props);
        this._DOMService = new DOMService();
        this._toolbarButtonsHandler();
    }
    _toolbarButtonsHandler() {
        const buttonAddContact = this.element.querySelector('.chat-sidebar__button_add');
        const buttonRemoveContact = this.element.querySelector('.chat-sidebar__button_remove');
        if (buttonAddContact) {
            buttonAddContact.addEventListener('click', () => {
                this._popup = new Popup(popupAddContactPreset);
                this._toolbarPopupsHandler(PopupTypes.ADD);
                this._DOMService.attachComponent(this._popup, 'body');
            });
        }
        if (buttonRemoveContact) {
            buttonRemoveContact.addEventListener('click', () => {
                document.addEventListener('click', this._preventRedirection);
                alert('Теперь кликните на контакт из списка');
                document.addEventListener('mouseup', (e) => {
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
                        this._popup = new Popup({ ...popupRemoveContactPreset, contactToRemove: name });
                        this._toolbarPopupsHandler(PopupTypes.REMOVE);
                    }
                    else {
                        this._popup = new Popup(popupErrorPreset);
                        this._toolbarPopupsHandler(PopupTypes.ERROR);
                    }
                    this._DOMService.attachComponent(this._popup, 'body');
                }, { once: true });
            });
        }
    }
    _toolbarPopupsHandler(popupType) {
        const detachPopup = (callback) => {
            this._DOMService.detachComponent(this._popup);
            document.removeEventListener('click', this._preventRedirection);
            if (typeof callback === 'function') {
                callback();
            }
        };
        const closeButton = this._popup.element.querySelector('.popup__close');
        if (closeButton && closeButton instanceof HTMLElement) {
            closeButton.addEventListener('click', detachPopup);
        }
        const mainButton = this._popup.element.querySelector('.popup__button button');
        if (!mainButton) {
            console.error('Главная кнопка поп-апа не найдена, возможно он неправильно настроен');
            return;
        }
        switch (popupType) {
            case PopupTypes.ADD:
                mainButton.addEventListener('click', () => detachPopup(function () {
                    console.log('Здесь будет функция, добавляющая контакт');
                }));
                break;
            case PopupTypes.REMOVE:
                mainButton.addEventListener('click', () => detachPopup(function () {
                    console.log('Здесь будет функция, удаляющая контакт');
                }));
                break;
            case PopupTypes.ERROR:
                mainButton.addEventListener('click', detachPopup);
                break;
            default:
                console.error('Неправильно указан тип поп-апа');
        }
    }
    _preventRedirection(e) {
        e.preventDefault();
    }
    render() {
        return Template;
    }
}
//# sourceMappingURL=chat-sidebar.js.map