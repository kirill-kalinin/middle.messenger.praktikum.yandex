import Router from '../../../core/router/router';
import PopupHandler from '../../../modules/popup-handler/popup-handler';
import * as popupPresets from '../../../components/popup/presets/chat-toolbar-popups';
import ChatsController from '../../../controllers/chats-controller';
import Contact from '../../contact/contact';
import { ContactProps } from '../../../core/types';

const chatsController = new ChatsController();

export default class ChatSidebarHandler {

    private _buttonAdd: HTMLElement | null;
    private _buttonRemove: HTMLElement | null;
    private _contacts: HTMLElement | null;
    private _input: HTMLInputElement | null;
    private _Router: Router;
    private _popupHandler: PopupHandler;
    private _contactElements: Contact[] | undefined;

    constructor() {
        this._Router = new Router();
        this._popupHandler = new PopupHandler();
    }

    public init(chatSidebarElement: HTMLElement, contactElements?: Contact[]): void {
        this._buttonAdd = chatSidebarElement.querySelector('.chat-sidebar__button_add');
        this._buttonRemove = chatSidebarElement.querySelector('.chat-sidebar__button_remove');
        this._contacts = chatSidebarElement.querySelector('.chat-sidebar__contacts');
        this._input = chatSidebarElement.querySelector('.chat-sidebar__input');

        if (!this._buttonAdd || !this._buttonRemove || !this._contacts || !this._input) {
            throw new Error('Ошибка в шаблоне сайдбара');
        }

        this._buttonAdd.addEventListener('click', this._handlerButtonAdd);
        this._buttonRemove.addEventListener('click', this._handlerButtonRemove);
        this._contacts.addEventListener('click', this._handlerContactClick);
        this._input.addEventListener('input', this._filterContacts);

        this._contactElements = contactElements;
        this._filterContacts();
    }

    public update(chatSidebarElement: HTMLElement, contactElements?: Contact[]): void {
        this._buttonAdd && this._buttonAdd.removeEventListener('click', this._handlerButtonAdd);
        this._buttonRemove && this._buttonRemove.removeEventListener('click', this._handlerButtonRemove);
        this._contacts && this._contacts.removeEventListener('click', this._handlerContactClick);
        this.init(chatSidebarElement, contactElements);
    }

    private _filterContacts = (): void => {
        if (!this._contactElements) {
            return;
        }
        const filter = this._input?.value.toLowerCase() || '';
        this._contactElements.forEach(element => {
            (element.props as ContactProps).title.toLocaleLowerCase().includes(filter)
                ? element.show()
                : element.hide();
        });
    }

    private _handlerButtonAdd = (): void => {
        if (this._Router.isDisabled) {
            return;
        }
        this._popupHandler.pushPopup(popupPresets.popupAddSelectorPreset, {
            primary: this._addChat.bind(this),
            secondary: this._addUser.bind(this)
        });
    }

    private _handlerButtonRemove = (): void => {
        if (this._Router.isDisabled) {
            return;
        }
        this._popupHandler.pushPopup(popupPresets.popupRemoveSelectorPreset, {
            primary: this._removeChatPrompt.bind(this),
            secondary: this._removeUser.bind(this)
        });
    }

    private _handlerContactClick = (e: Event): void => {
        if (this._Router.isDisabled) {
            return;
        }
        const contact = e.target instanceof HTMLElement && e.target.closest('.contact');
        if (contact instanceof HTMLElement && contact.dataset.id) {
            const id = Number(contact.dataset.id);
            contact.classList.contains('contact_active')
                ? this._showUsersList(id)
                : chatsController.selectChat(id);
        }
    }

    private _showUsersList(id: number): void {
        chatsController.getChatUsers(id).then(users => {
            return users && users.map(user => {
                return `${user.display_name || user.first_name} (${user.login})`;
            });
        }).then(list => {
            list && this._popupHandler.pushPopup({...popupPresets.popupUsersListPreset, list}, {});
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
