import ImageUrlLogo from '../../../static/images/logo.svg';

export default `
    <aside class="sidebar {{parent}}__sidebar">
        <img class="sidebar__logo" src="${ImageUrlLogo}" alt=" ">

        {{#if typeIsMenu}}
        <div class="sidebar__button-slot"></div>
        {{/if}}

        <div class="sidebar__content">
            {{#if typeIsPrompt}}
            {{#with prompt}}
            <p class="sidebar__text">{{question}}</p>
            <a class="sidebar__link" data-route="{{link/href}}" href="{{link/href}}">{{link/text}}</a>
            {{/with}}
            {{/if}}

            {{#if typeIsAlert}}
                {{#each alert}}
                <p class="sidebar__alert">{{this}}</p>
                {{/each}}
            {{/if}}

            {{#if typeIsMenu}}
            <ul class="sidebar__menu"></ul>
                {{#each menuItems}}
                <li class="sidebar__menu-item">
                    <a data-route="{{link}}" data-event="{{event}}" href="{{link}}"
                    class="sidebar__link sidebar__link_menu{{#if active}} sidebar__link_active{{/if}}">
                        {{text}}
                    </a>
                </li>
                {{/each}}
            </ul>
            {{/if}}
        </div>
    </aside>
`;
