import ImageUrlMark from 'url:../../images/mark-as-readed.svg';

export default `
  <div class="message{{#if isOwn}} message_own{{/if}}{{#if isImage}} message_image{{/if}}">
    <div class="message__content{{#if isOwn}} message__content_own{{/if}}">
      {{#if isImage}}
      <img class="message__img{{#if isOwn}} message__img_own{{/if}}" src="{{imgSrc}}" alt=" ">
      {{/if}}
      <p class="message__text">
        {{text}}
      </p>
    </div>
    <p class="message__date{{#if isOwn}} message__date_own{{/if}}">
      {{date}}
      {{#if isReaded}}<img src="${ImageUrlMark}" alt=" ">{{/if}}
    </p>
  </div>
`;
