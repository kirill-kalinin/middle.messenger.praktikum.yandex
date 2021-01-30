export default class AvatarUploadHandler {
    constructor(profileComponentDOM) {
        this._form = profileComponentDOM.querySelector('form[name=avatar-upload]');
        if (this._form === null) {
            return;
        }
        this._input = this._form.querySelector('.profile__avatar-upload-input');
        this._alert = this._form.querySelector('.profile__avatar-upload-alert');
        this._title = this._form.querySelector('.profile__avatar-uplaod-title');
        this._label = this._form.querySelector('.profile__avatar-upload-label');
        this._fileName = this._form.querySelector('.profile__avatar-upload-filename');
    }
    handle() {
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
                }
            }
            else {
                console.error('Ошибка в шаблоне формы загрузки аватара');
            }
        });
        this._form.addEventListener('submit', () => {
            if (this._input && this._input.files && !this._input.files.length && this._alert) {
                this._alert.style.visibility = "visible";
            }
        });
    }
}
//# sourceMappingURL=avatar-upload-handler.js.map