import Router from '../../../core/router/router';
import PopupHandler, { PopupTypes } from '../../../modules/popup-handler/popup-handler';
import {
    popupAddSelectorPreset, popupRemoveSelectorPreset
} from '../../../components/popup/presets/chat-toolbar-popups';

export default class ToolbarButtonsHandler {

    private _buttonAdd: HTMLElement | null;
    private _buttonRemove: HTMLElement | null;
    private _Router: Router;
    private _popupHandler: PopupHandler;

    constructor() {
        this._Router = new Router();
        this._popupHandler = new PopupHandler();
    }

    init(chatSidebarElement: HTMLElement): void {
        this._buttonAdd = chatSidebarElement.querySelector('.chat-sidebar__button_add');
        this._buttonRemove = chatSidebarElement.querySelector('.chat-sidebar__button_remove');

        if (!this._buttonAdd || !this._buttonRemove) {
            return;
        }

        this._buttonAdd.addEventListener('click', this._handlerAdd);
        this._buttonRemove.addEventListener('click', this._handlerRemove);
    }

    update(chatSidebarElement: HTMLElement): void {
        this._buttonAdd && this._buttonAdd.removeEventListener('click', this._handlerAdd);
        this._buttonRemove && this._buttonRemove.removeEventListener('click', this._handlerAdd);
        this.init(chatSidebarElement);
    }

    _handlerAdd = (): void => {
        if (this._Router.isDisabled) {
            return;
        }
        this._popupHandler.pushPopup(popupAddSelectorPreset, PopupTypes.SELECT_ADD);
    }

    _handlerRemove = (): void => {
        if (this._Router.isDisabled) {
            return;
        }
        this._popupHandler.pushPopup(popupRemoveSelectorPreset, PopupTypes.SELECT_REMOVE);
    }

}
