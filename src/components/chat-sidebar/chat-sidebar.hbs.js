import ImageUrlToolbarRemove from '../../../static/images/toolbar-remove.svg';
import ImageUrlToolbarAdd from '../../../static/images/toolbar-add.svg';
import ImageUrlToolbarProfile from '../../../static/images/toolbar-profile.svg';

export default `
    <div class="chat-sidebar">
        <div class="chat-sidebar__toolbar">
            <button class="chat-sidebar__button chat-sidebar__button_remove" type="button">
                <img class="chat-sidebar__button-image" src="${ImageUrlToolbarRemove}" alt=" ">
            </button>
            <button class="chat-sidebar__button chat-sidebar__button_add" type="button">
                <img class="chat-sidebar__button-image" src="${ImageUrlToolbarAdd}" alt=" ">
            </button>
            <button class="chat-sidebar__button chat-sidebar__button_profile" type="button" data-route="/profile-main">
                <img class="chat-sidebar__button-image" src="${ImageUrlToolbarProfile}" alt=" ">
            </button>
        </div>
        <div class="chat-sidebar__search">
            <input class="chat-sidebar__input" type="text" placeholder="Поиск контактов...">
        </div>
        <ul class="chat-sidebar__contacts"></ul>
    </div>
`;
