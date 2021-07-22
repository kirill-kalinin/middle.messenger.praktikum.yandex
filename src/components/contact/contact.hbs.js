import AvatarPlaceholder from 'url:../../../static/images/avatar-placeholder.svg';

export default `
    <div class="contact{{#if active}} contact_active{{/if}}" data-id="{{id}}" >
        <img class="contact__image" src="{{#if avatar}}{{avatar}}{{else}}${AvatarPlaceholder}{{/if}}" alt=" ">
        <div class="contact__primary-info">
            <p class="contact__name">{{title}}</p>
            <p class="contact__last-message">{{lastMessage}}</p>
        </div>
        <div class="contact__secondary-info">
            <div class="contact__unreaded-counter{{#if unreadCount}} contact__unreaded-counter_visible{{/if}}">
                {{unreadCount}}
            </div>
            <p class="contact__last-date">
                <span>{{date.[1]}}</span>
                <span>{{date.[0]}}</span>
            </p>
        </div>
    </div>
`;
