export default `
  {{#if linkBehavior}}
  <a href="{{link}}" 
  {{else}}
  <button type="{{#if isSimpleButton}}button{{else}}submit{{/if}}" 
  {{/if}}

  class="button {{additionClass}}">

  {{#if isProfileSidebarButton}}
  <img class="profile__sidebar-button-img" src="{{imageSrc}}" alt=" ">
  {{/if}}

  {{text}}

  {{#if linkBehavior}}
  </a>
  {{else}}
  </button>
  {{/if}}
`;
