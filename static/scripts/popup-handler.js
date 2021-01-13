(function() {
  class Popup {
    constructor(type, data, callback) {
      this.type = type;
      this.title = data.title;
      this.buttonText = data.buttonText;
      this.isCloseable = data.isCloseable;
      this.contactToRemove = data.contactToRemove;
      this.errorMessage = data.errorMessage;
      this.callback = callback;
    }
  
    getNewPopup() {
      const newPopup = document.createElement('div');
      newPopup.classList.add('popup');
  
      const extraBlock = this.isCloseable 
        ? `<img class="popup__close" src="../images/popup-close.svg" alt="X">`
        : '';
      newPopup.innerHTML = `
        <div class="popup__container">
          <p class="popup__title">${this.title}</p>
          <div class="popup__content"></div>
          <button class="popup__button button">${this.buttonText}</button>
          ${extraBlock}
        </div>
      `;
  
      const popupContent = newPopup.querySelector('.popup__content');
      switch (this.type) {
        case 'ADD':
          popupContent.innerHTML = this._getContentAddNewContact();
          break;
        case 'REMOVE':
          popupContent.innerHTML = this._getContentRemoveContact();
          break;
        case 'ERROR':
          popupContent.innerHTML = this._getContentError();
          break;
        default:
          console.error('Попытка создать поп-ап с неправильными параметрами');
      }
  
      const closeButton = newPopup.querySelector('.popup__close');
      if (closeButton) {
        closeButton.addEventListener('click', () => {
          this._removePopup(newPopup);
        });
      }

      newPopup.querySelector('.popup__button').addEventListener('click', () => {
        console.log(`Поп-ап type ${this.type} успешно отработал`);
        this._removePopup(newPopup);
      })

      return newPopup;
    }

    _removePopup(popup) {
      if (typeof this.callback === 'function') {
        this.callback();
      }
      popup.remove();
    }

    _getContentAddNewContact() {
      return `
        <label class="popup__label">Логин
          <input class="popup__input" type="text" placeholder="Укажите логин пользователя...">
        <label>
      `;
    }
  
    _getContentRemoveContact() {
      return `
        <p class="popup__alert">Вы действительно хотите удалить контакт?<p>
        <p class="popup__contact-to-remove">${this.contactToRemove}<p>
      `;
    }
  
    _getContentError() {
      return `
        <p class="popup__alert">${this.errorMessage}<p>
      `;
    }
  }

  function preventRedirection(e) {
    e.preventDefault();
  }

  function tryToRemoveContact() {
    document.addEventListener('click', preventRedirection);
    alert('Теперь кликните на контакт из списка');

    document.addEventListener('mouseup', function(e) {
      const contact = e.target.closest('.contact');

      let popup;
      if (!contact) {
        popup = new Popup('ERROR', {
          title: 'Ошибка',
          buttonText: 'Понятно',
          isCloseable: false,
          errorMessage: 'Нужно указать на один из контактов в списке'
        }, () => document.removeEventListener('click', preventRedirection));
      } else {
        popup = new Popup('REMOVE', {
          title: 'Удалить контакт',
          buttonText: 'Удалить',
          isCloseable: true,
          contactToRemove: contact.querySelector('.contact__name').innerText
        }, () => document.removeEventListener('click', preventRedirection));
      }
      document.body.append(popup.getNewPopup());
    }, {once: true});
  }

  window.addEventListener('load', function() {
    const contactAddButton = document.querySelector('.chat-sidebar__button_add');
    if (contactAddButton) {
      contactAddButton.addEventListener('click', function() {
        const popup = new Popup('ADD', {
          title: 'Добавить контакт',
          buttonText: 'Добавить',
          isCloseable: true
        });
        document.body.append(popup.getNewPopup());
      });
    }

    const contactRemoveButton = document.querySelector('.chat-sidebar__button_remove');
    if (contactRemoveButton) {
      contactRemoveButton.addEventListener('click', tryToRemoveContact);
    }
  });

})();
