import Template from '../../../components/chat-sidebar/chat-sidebar.hbs.js';
import Block from '../../core/k-react/block.js';
import { popupAddContactPreset, popupPromptContactPreset } from '../../components/popup/popup.js';
import PopupHandler, { PopupTypes } from '../../core/popup-handler.js';
import Router from '../../core/router/router.js';
import type { BlockProps } from '../../core/types.js';

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

  componentDidMount() {
    this._Router = new Router();
    this._toolbarButtonsHandler();
  }

  componentDidUpdate() {
    this._toolbarButtonsHandler();
  }

  render() {
    return Template;
  }

}
