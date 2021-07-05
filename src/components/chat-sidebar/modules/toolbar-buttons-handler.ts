import { popupAddContactPreset, popupPromptContactPreset } from '../../../components/popup/popup';
import PopupHandler, { PopupTypes } from '../../../modules/popup-handler/popup-handler';
import Router from '../../../core/router/router';

export default class ToolbarButtonsHandler {

    private _buttonAddContact: HTMLElement | null;
    private _buttonRemoveContact: HTMLElement | null;
    private _Router: Router;
    private _popupHandler: PopupHandler;

    constructor() {
        this._Router = new Router();
        this._popupHandler = new PopupHandler();
    }

    init(chatSidebarElement: HTMLElement): void {
        this._buttonAddContact = chatSidebarElement.querySelector('.chat-sidebar__button_add');
        this._buttonRemoveContact = chatSidebarElement.querySelector('.chat-sidebar__button_remove');

        if (!this._buttonAddContact || !this._buttonRemoveContact) {
            return;
        }

        this._buttonAddContact.addEventListener('click', this._handlerAddContact);
        this._buttonRemoveContact.addEventListener('click', this._handlerRemoveContact);
    }

    update(chatSidebarElement: HTMLElement): void {
        this._buttonAddContact && this._buttonAddContact.removeEventListener('click', this._handlerAddContact);
        this._buttonRemoveContact && this._buttonRemoveContact.removeEventListener('click', this._handlerAddContact);
        this.init(chatSidebarElement);
    }

    _handlerAddContact = (): void => {
        if (this._Router.isDisabled) {
            return;
        }
        this._popupHandler.pushPopup(popupAddContactPreset, PopupTypes.CONTACT_ADD);
    }

    _handlerRemoveContact = (): void => {
        if (this._Router.isDisabled) {
            return;
        }
        this._popupHandler.pushPopup(popupPromptContactPreset, PopupTypes.CONTACT_PROMPT);
    }

}
