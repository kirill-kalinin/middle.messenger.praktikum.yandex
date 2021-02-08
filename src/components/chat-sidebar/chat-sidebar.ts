import Template from '../../../components/chat-sidebar/chat-sidebar.hbs.js';
import Block from '../../core/k-react/block.js';
import Popup, { 
  popupAddContactPreset, 
  popupRemoveContactPreset, 
  popupErrorPreset 
} from '../../components/popup/popup.js';
import DOMService from '../../core/k-react/dom-service.js';

export default class ChatSidebar extends Block {
  private _DOMService: DOMService;
  private _popup: Popup;

  constructor(props: BlockProps = {}, className = 'fragment') {
    super('div', className, props);
    this._DOMService = new DOMService();
    this._toolbarButtonsHandler();
  }

  private _toolbarButtonsHandler() {
    const buttonAddContact = this.element.querySelector('.chat-sidebar__button_add');
    const buttonRemoveContact = this.element.querySelector('.chat-sidebar__button_remove');

    if (buttonAddContact) {
      buttonAddContact.addEventListener('click', () => {
        this._popup = new Popup(popupAddContactPreset);
        this._toolbarPopupsHandler('ADD');
        this._DOMService.attachComponent(document, 'body', this._popup.element);
      });
    }

    if (buttonRemoveContact) {
      buttonRemoveContact.addEventListener('click', () => {
        document.addEventListener('click', this._preventRedirection);
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
            this._toolbarPopupsHandler('REMOVE');
          } else {
            this._popup = new Popup(popupErrorPreset);
            this._toolbarPopupsHandler('ERROR');
          }
          this._DOMService.attachComponent(document, 'body', this._popup.element);
        }, {once: true});
      });
    }
  }

  private _toolbarPopupsHandler(popupType: string) {
    const detachPopup = (callback?: unknown) => {
      this._DOMService.detachComponent(document, this._popup.element);
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
      case 'ADD':
        mainButton.addEventListener('click', () => detachPopup(function() {
          console.log('Здесь будет функция, добавляющая контакт');
        }));
        break;
      case 'REMOVE':
        mainButton.addEventListener('click', () => detachPopup(function() {
          console.log('Здесь будет функция, удаляющая контакт');
        }));
        break;
      case 'ERROR':
        mainButton.addEventListener('click', detachPopup);
        break;
      default:
        console.error('Неправильно указан тип поп-апа');
    }
  }

  private _preventRedirection(e: Event) {
    e.preventDefault();
  }

  render() {
    return Template;
  }
}
