export default `
  <a class="contact{{#if active}} contact_active{{/if}}" data-route="{{link}}" href="{{link}}">
    <img class="contact__image" src="{{avatar}}" alt=" ">
    <div class="contact__primary-info">
      <p class="contact__name">{{name}}</p>
      <p class="contact__last-message">{{message}}</p>
    </div>
    <div class="contact__secondary-info">
      <div class="contact__unreaded-counter{{#if readed}} contact__unreaded-counter_empty{{/if}}">
        {{counter}}
      </div>
      <p class="contact__last-date">{{date}}</p>
    </div>
  </a>
`;
