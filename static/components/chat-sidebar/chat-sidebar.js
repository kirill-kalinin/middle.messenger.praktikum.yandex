import Template from './chat-sidebar.hbs.js';
import Block from '../../scripts/k-react/block.js';
import Popup, { 
  popupAddContactPreset, 
  popupRemoveContactPreset, 
  popupErrorPreset 
} from '../../components/popup/popup.js';
import DOMService from '../../scripts/k-react/dom-service.js';

export default class ChatSidebar extends Block {
  constructor(props, className = 'fragment') {
    super('div', className, props);
    this.DOMService = new DOMService();
    this._toolbarButtonsHandler();
  }

  _toolbarButtonsHandler() {
    const buttonAddContact = this.element.querySelector('.chat-sidebar__button_add');
    const buttonRemoveContact = this.element.querySelector('.chat-sidebar__button_remove');

    if (buttonAddContact) {
      buttonAddContact.addEventListener('click', () => {
        this.popup = new Popup(popupAddContactPreset);
        this._toolbarPopupsHandler('ADD');
        this.DOMService.attachComponent(document, 'body', this.popup.element);
      });
    }

    if (buttonRemoveContact) {
      buttonRemoveContact.addEventListener('click', () => {
        document.addEventListener('click', this._preventRedirection);
        alert('Теперь кликните на контакт из списка');
        document.addEventListener('mouseup', (e) => {
          const contact = e.target.closest('.contact');
          if (contact) {
            const name = contact.querySelector('.contact__name').innerText;
            this.popup = new Popup({...popupRemoveContactPreset, contactToRemove: name});
            this._toolbarPopupsHandler('REMOVE');
          } else {
            this.popup = new Popup(popupErrorPreset);
            this._toolbarPopupsHandler('ERROR');
          }
          this.DOMService.attachComponent(document, 'body', this.popup.element);
        }, {once: true});
      });
    }
  }

  _toolbarPopupsHandler(popupType) {
    const detachPopup = () => {
      this.DOMService.detachComponent(document.body, this.popup.element);
      document.removeEventListener('click', this._preventRedirection);
    };
    const closeButton = this.popup.element.querySelector('.popup__close');
    if (closeButton) {
      closeButton.addEventListener('click', detachPopup);
    }
    const mainButton = this.popup.element.querySelector('button');
    if (!mainButton) {
      console.error('Главная кнопка поп-апа не найдена, возможно он неправильно настроен');
      return;
    }
    switch (popupType) {
      case 'ADD':
        mainButton.addEventListener('click', detachPopup);
        // Здесь будет функция, добавляющая контакт
        console.log('Новый контакт будет добавлен');
        break;
      case 'REMOVE':
        mainButton.addEventListener('click', detachPopup);
        // Здесь будет функция, удаляющая контакт
        console.log('Контакт будет удален');
        break;
      case 'ERROR':
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
