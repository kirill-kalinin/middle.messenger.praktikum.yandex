export default class AvatarUploadHandler {

  private _component: HTMLElement;
  private _form: HTMLFormElement | null;
  private _input: HTMLInputElement | null;
  private _alert: HTMLElement | null;
  private _title: HTMLElement | null;
  private _label: HTMLElement | null;
  private _fileName: HTMLElement | null;

  public handle(profileComponentDOM: HTMLElement) {
    this._component = profileComponentDOM;
    this._queryElements();
    if (this._form === null || this._input === null) {
      return;
    }

    this._input.addEventListener('change', () => {
      if (this._input && this._alert && this._title && this._label && this._fileName && this._form) {
        this._alert.style.visibility = "hidden";
    
        if (this._input.files && this._input.files.length) {
          this._title.innerText = 'Файл загружен';
          this._fileName.innerText = this._input.files[0].name;
          this._fileName.style.display = "block";
          this._label.style.display = "none";
          this._fileName.addEventListener('click', this._resetForm.bind(this), {once: true});
        }
      } else {
        console.error('Ошибка в шаблоне формы загрузки аватара');
      }
    });

    this._form.addEventListener('submit', () => {
      if (this._input && this._input.files && !this._input.files.length && this._alert) {
        this._alert.style.visibility = "visible";
      }
    });
  }

  private _queryElements() {
    this._form = this._component.querySelector('form[name=avatar-upload]');
    if (this._form === null) {
      return;
    }
    this._input = this._form.querySelector('.profile__avatar-upload-input');
    this._alert = this._form.querySelector('.profile__avatar-upload-alert');
    this._title = this._form.querySelector('.profile__avatar-uplaod-title');
    this._label = this._form.querySelector('.profile__avatar-upload-label');
    this._fileName = this._form.querySelector('.profile__avatar-upload-filename');
  }

  private _resetForm() {
    if (this._alert && this._title && this._label && this._fileName && this._form) {
      this._form.reset();
      this._alert.style.visibility = 'hidden';
      this._title.innerText = 'Загрузите файл';
      this._fileName.innerText = '';
      this._fileName.style.display = 'none';
      this._label.style.display = 'block';
    } else {
      console.error('Ошибка в шаблоне формы загрузки аватара');
    }
  }

}
