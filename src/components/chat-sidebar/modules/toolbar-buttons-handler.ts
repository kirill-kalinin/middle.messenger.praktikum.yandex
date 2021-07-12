import Router from '../../../core/router/router';
import PopupHandler from '../../../modules/popup-handler/popup-handler';
import * as popupPresets from '../../../components/popup/presets/chat-toolbar-popups';
import ChatsController from '../../../controllers/chats-controller';

const chatsController = new ChatsController();

export default class ToolbarButtonsHandler {

    private _buttonAdd: HTMLElement | null;
    private _buttonRemove: HTMLElement | null;
    private _Router: Router;
    private _popupHandler: PopupHandler;

    constructor() {
        this._Router = new Router();
        this._popupHandler = new PopupHandler();
    }

    public init(chatSidebarElement: HTMLElement): void {
        this._buttonAdd = chatSidebarElement.querySelector('.chat-sidebar__button_add');
        this._buttonRemove = chatSidebarElement.querySelector('.chat-sidebar__button_remove');

        if (!this._buttonAdd || !this._buttonRemove) {
            return;
        }

        this._buttonAdd.addEventListener('click', this._handlerAdd);
        this._buttonRemove.addEventListener('click', this._handlerRemove);
    }

    public update(chatSidebarElement: HTMLElement): void {
        this._buttonAdd && this._buttonAdd.removeEventListener('click', this._handlerAdd);
        this._buttonRemove && this._buttonRemove.removeEventListener('click', this._handlerAdd);
        this.init(chatSidebarElement);
    }

    private _handlerAdd = (): void => {
        if (this._Router.isDisabled) {
            return;
        }
        this._popupHandler.pushPopup(popupPresets.popupAddSelectorPreset, {
            primary: this._addChat.bind(this),
            secondary: this._addUser.bind(this)
        });
    }

    private _handlerRemove = (): void => {
        if (this._Router.isDisabled) {
            return;
        }
        this._popupHandler.pushPopup(popupPresets.popupRemoveSelectorPreset, {
            primary: this._removeChatPrompt.bind(this),
            secondary: this._removeUser.bind(this)
        });
    }

    private _addUser(): void {
        this._popupHandler.pushPopup(popupPresets.popupAddUserPreset, {
            primary: chatsController.addUser.bind(chatsController)
        });
    }

    private _removeUser(): void {
        this._popupHandler.pushPopup(popupPresets.popupRemoveUserPreset, {
            primary: chatsController.deleteUser.bind(chatsController)
        });
    }

    private _addChat(): void {
        this._popupHandler.pushPopup(popupPresets.popupAddChatPreset, {
            primary: chatsController.createChat.bind(chatsController)
        });
    }

    private _removeChatPrompt(): void {
        this._popupHandler.pushPopup(popupPresets.popupPromptChatPreset, {
            primary: this._removeChat.bind(this)
        });
    }

    private _removeChat(): void {
        document.addEventListener('mouseup', (e: Event) => {
            this._Router.disable();
            const contact = e.target instanceof HTMLElement && e.target.closest('.contact');
            if (contact instanceof HTMLElement) {
                const contactName = contact.querySelector('.contact__name');
                const contactId = Number(contact.dataset.id);
                let name;
                if (contactName instanceof HTMLElement && !isNaN(contactId)) {
                    name = contactName.innerText;
                } else {
                    throw new Error('Ошибка в шаблоне контакта');
                }
                this._popupHandler.pushPopup({...popupPresets.popupRemoveChatPreset, value: name}, {
                    primary: chatsController.deleteChat.bind(chatsController, contactId)
                });
            } else {
                this._popupHandler.pushPopup(popupPresets.popupWarningChatPreset, {});
            }
        }, {once: true});
    }
}
