// Управление формой без ре-рендера компонента через пропсы, чтобы не терять загруженный файл при ре-рендере
// Вариант через пропсы вроде должен сработать, если вынести инпут в отдельный компонент
// Но пока мне мое решение кажется менее запутанным

export default class AvatarUploadHandler {
  constructor(profileComponentDOM) {
    this.form = profileComponentDOM.querySelector('form[name=avatar-upload]');
    this.input = this.form.querySelector('.profile__avatar-upload-input');
    this.alert = this.form.querySelector('.profile__avatar-upload-alert');
    this.title = this.form.querySelector('.profile__avatar-uplaod-title');
    this.label = this.form.querySelector('.profile__avatar-upload-label');
    this.fileName = this.form.querySelector('.profile__avatar-upload-filename');
  }

  handle() {
    this.input.addEventListener('change', () => {
      this.alert.style.visibility = "hidden";
  
      if (this.input.files.length) {
        this.title.innerText = 'Файл загружен';
        this.fileName.innerText = this.input.files[0].name;
        this.fileName.style.display = "block";
        this.label.style.display = "none";
      }
    });

    this.form.addEventListener('submit', () => {
      if (!this.input.files.length) {
        this.alert.style.visibility = "visible";
      }
    });
  }
}
