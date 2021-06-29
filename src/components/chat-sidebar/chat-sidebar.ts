import Template from './chat-sidebar.hbs.js';
import Block from '../../core/k-react/block';
import { popupAddContactPreset, popupPromptContactPreset } from '../../components/popup/popup';
import PopupHandler, { PopupTypes } from '../../modules/popup-handler/popup-handler';
import Router from '../../core/router/router';
import type { BlockProps } from '../../core/types';

export default class ChatSidebar extends Block {

    private _Router: Router;
    private _popupHandler: PopupHandler;

    constructor(props: BlockProps = {}, className = 'fragment') {
        super('div', className, props);
        this._popupHandler = new PopupHandler();
    }

    private _toolbarButtonsHandler() {
        const buttonAddContact = this.element.querySelector('.chat-sidebar__button_add');
        const buttonRemoveContact = this.element.querySelector('.chat-sidebar__button_remove');

        if (buttonAddContact) {
            buttonAddContact.addEventListener('click', () => {
                if (this._Router.isDisabled) {
                    return;
                }
                this._popupHandler.pushPopup(popupAddContactPreset, PopupTypes.CONTACT_ADD);
            });
        }

        if (buttonRemoveContact) {
            buttonRemoveContact.addEventListener('click', () => {
                if (this._Router.isDisabled) {
                    return;
                }
                this._popupHandler.pushPopup(popupPromptContactPreset, PopupTypes.CONTACT_PROMPT);
            });
        }
    }

    componentDidMount(): void {
        this._Router = new Router();
        this._toolbarButtonsHandler();
    }

    componentDidUpdate(): void {
        this._toolbarButtonsHandler();
    }

    render(): string {
        return Template;
    }

}
