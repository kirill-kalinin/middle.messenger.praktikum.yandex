export default `
  <div class="popup">
    <div class="popup__container">
      <p class="popup__title">{{title}}</p>
      <div class="popup__content">
        {{#if typeIsContactAdd}}
        <label class="popup__label">Логин
          <input class="popup__input" type="text" placeholder="Укажите логин пользователя..." />
        </label>
        {{/if}}
        {{#if typeIsContactRemove}}
        <p class="popup__alert">Вы действительно хотите удалить контакт?</p>
        <p class="popup__contact-to-remove">{{contactToRemove}}</p>
        {{/if}}
        {{#if typeIsWarning}}
        <p class="popup__alert">{{warningMessage}}</p>
        {{/if}}
      </div>
      <div class="popup__button"></div>
      {{#if isCloseable}}
      <img class="popup__close" src="/images/popup-close.svg" alt="X">
      {{/if}}
    </div>
  </div>
`;
