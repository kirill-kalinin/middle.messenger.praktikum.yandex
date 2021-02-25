export default `
  <div class="chat-sidebar">
    <div class="chat-sidebar__toolbar">
      <button class="chat-sidebar__button chat-sidebar__button_remove" type="button">
        <img class="chat-sidebar__button-image" src="/images/toolbar-remove.svg" alt=" ">
      </button>
      <button class="chat-sidebar__button chat-sidebar__button_add" type="button">
        <img class="chat-sidebar__button-image" src="/images/toolbar-add.svg" alt=" ">
      </button>
      <button class="chat-sidebar__button chat-sidebar__button_profile" type="button">
        <img class="chat-sidebar__button-image" src="/images/toolbar-profile.svg" alt=" ">
      </button>
    </div>
    <div class="chat-sidebar__search">
      <input class="chat-sidebar__input" type="text" placeholder="Поиск контактов...">
    </div>
    <ul class="chat-sidebar__contacts"></ul>
  </div>
`;
