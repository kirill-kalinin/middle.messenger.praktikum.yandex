import Template from '../../../components/chat-sidebar/chat-sidebar.hbs.js';
import Block from '../../core/k-react/block.js';
import Popup, { 
  popupAddContactPreset, 
  popupRemoveContactPreset, 
  popupErrorPreset 
} from '../../components/popup/popup.js';
import DOMService from '../../core/k-react/dom-service.js';
import Router from '../../core/router/router.js';
import type { BlockProps } from '../../core/types.js';

enum PopupTypes {
  ADD,
  REMOVE,
  ERROR
}

export default class ChatSidebar extends Block {

  private _DOMService: DOMService;
  private _Router: Router;
  private _popup: Popup;

  constructor(props: BlockProps = {}, className = 'fragment') {
    super('div', className, props);
  }

  private _toolbarButtonsHandler() {
    const buttonAddContact = this.element.querySelector('.chat-sidebar__button_add');
    const buttonRemoveContact = this.element.querySelector('.chat-sidebar__button_remove');

    if (buttonAddContact) {
      buttonAddContact.addEventListener('click', () => {
        if (this._Router.isDisabled) {
          return;
        }
        this._popup = new Popup(popupAddContactPreset);
        this._toolbarPopupsHandler(PopupTypes.ADD);
        this._DOMService.attachComponent(this._popup, 'body');
      });
    }

    if (buttonRemoveContact) {
      buttonRemoveContact.addEventListener('click', () => {
        if (this._Router.isDisabled) {
          return;
        }
        this._Router.disable();
        alert('Теперь кликните на контакт из списка');
        document.addEventListener('mouseup', (e: Event) => {
          const contact = (e.target as HTMLElement).closest('.contact');
          if (contact) {
            const contactName = contact.querySelector('.contact__name');
            let name;
            if (contactName && contactName instanceof HTMLElement) {
              name = contactName.innerText;
            } else {
              throw new Error('Ошибка в шаблоне контакта');
            }
            this._popup = new Popup({...popupRemoveContactPreset, contactToRemove: name});
            this._toolbarPopupsHandler(PopupTypes.REMOVE);
          } else {
            this._popup = new Popup(popupErrorPreset);
            this._toolbarPopupsHandler(PopupTypes.ERROR);
          }
          this._DOMService.attachComponent(this._popup, 'body');
        }, {once: true});
      });
    }

  }

  private _toolbarPopupsHandler(popupType: PopupTypes) {
    const detachPopup = (callback?: unknown) => {
      this._DOMService.detachComponent(this._popup);
      this._Router.enable();
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
        mainButton.addEventListener('click', () => detachPopup(function() {
          console.log('Здесь будет функция, добавляющая контакт');
        }));
        break;
      case PopupTypes.REMOVE:
        mainButton.addEventListener('click', () => detachPopup(function() {
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

  componentDidMount() {
    this._DOMService = new DOMService();
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
