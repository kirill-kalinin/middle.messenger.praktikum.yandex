export default class HiddenBlockHandler {

    private _button: HTMLElement | null;
    private _inputs: HTMLElement | null;

    init(chatElement: HTMLElement): void {
        this._button = chatElement.querySelector('.chat__form-button_attach');
        this._inputs = chatElement.querySelector('.chat__attach');

        if (!this._button) {
            return;
        }

        this._button.addEventListener('click', this._handler);
    }

    update(chatElement: HTMLElement): void {
        this._button && this._button.removeEventListener('click', this._handler);
        this.init(chatElement);
    }

    _handler(): void {
        this._inputs && this._inputs.classList.toggle('chat__attach_visible');
    }

}
