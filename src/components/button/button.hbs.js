export default `
    <button type="{{#if isSimpleButton}}button{{else}}submit{{/if}}"

    {{#if route}}
    data-route="{{route}}"
    {{/if}}

    class="button {{additionClass}}">

        {{#if isProfileSidebarButton}}
        <img class="profile__sidebar-button-img" src="{{imageSrc}}" alt=" ">
        {{/if}}

        {{text}}

    </button>
`;
