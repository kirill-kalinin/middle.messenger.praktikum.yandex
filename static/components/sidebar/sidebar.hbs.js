export default `
  <aside class="sidebar {{parent}}__sidebar">
    <img class="sidebar__logo" src="/images/logo.svg" alt=" ">

    {{#if typeIsMenu}}
    <div class="sidebar__button-slot"></div>
    {{/if}}

    <div class="sidebar__content">
      {{#if typeIsPrompt}}
      {{#with prompt}}
      <p class="sidebar__text">{{question}}</p>
      <a class="sidebar__link" href="{{link/href}}">{{link/text}}</a>
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
        <a href="{{link}}" class="sidebar__link sidebar__link_menu{{#if active}} sidebar__link_active{{/if}}">
          {{text}}
        </a>
      </li>
      {{/each}}
      </ul>
      {{/if}}
    </div>
  </aside>
`;
