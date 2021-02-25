export default `
  <div class="wrapper">
    <div class="profile container bordered-block">
      <aside class="profile__sidebar"></aside>
      <main class="profile__main-block">
        <div class="profile__header">
          <div class="profile__user-name">{{header.name}}</div>
          <img class="profile__user-avatar" src="{{header.avatarSrc}}" alt=" ">
        </div>

        {{#if isMainInfoMode}}
        <div class="profile__data">
          {{#each userData}}
          <p class="profile__data-item">
            <span class="profile__data-label">{{this.label}}</span>
            <span class="profile__data-value">{{this.value}}</span>
          </p>
          {{/each}}
        </div>
        {{/if}}

        {{#if isEditInfoMode}}
        <form class="profile__data" name="profile-data">
          {{#each userData}}
          <p class="profile__data-item">
            <label class="profile__data-label">{{this.label}}</label>
            <input class="profile__data-value" type="{{this.inputType}}" name="{{this.inputName}}" value="{{this.value}}"
              data-validation-key="{{this.validationKey}}">
            <span class="invalid-input-alert">{{this.validationText}}</span>
          </p>
          {{/each}}
          <div class="profile__buttons"></div>
        </form>
        {{/if}}

        {{#if isEditPasswordMode}}
        <form class="profile__data profile__data_password" name="user-password">
          {{#each userPasswordFields}}
          <p class="profile__data-item">
            <label class="profile__data-label">{{this.label}}</label>
            <input class="profile__data-value" type="password" name="{{this.name}}" value="{{this.value}}"
              data-validation-key="{{this.validationKey}}" {{#if this.equality}}data-required-equality="true"{{/if}}>
            <span class="invalid-input-alert">{{this.validationText}}</span>
          </p>
          {{/each}}
          <div class="profile__buttons profile__buttons_password"></div>
        </form>
        {{/if}}

        {{#if isAvatarUploadMode}}
        <form class="profile__data profile__data_avatar-upload" name="avatar-upload">
          <p class="profile__avatar-uplaod-title">Загрузите файл</p>
          <p class="profile__avatar-upload-filename" title="Нажмите, чтобы выбрать другое изображение"></p>
          <label class="profile__avatar-upload-label">Выбрать файл на компьютере
            <input class="profile__avatar-upload-input" type="file" name="avatar" accept="image/jpeg">
          </label>
          <div class="profile__avatar-upload-button-wrapper">
            <p class="profile__avatar-upload-alert">Нужно выбрать файл!</p>
            {{!-- <button class="profile__avatar-upload-button"></button> --}}
          </div>
        </form>
        {{/if}}
      </main>
    </div>
  </div>
`;
