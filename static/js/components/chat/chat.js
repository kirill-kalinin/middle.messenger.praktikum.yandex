import Template from '../../../components/chat/chat.hbs.js';
import Block from '../../core/k-react/block.js';
import FormHandler from '../../core/form-handler.js';
export default class Chat extends Block {
    constructor(props = {}, className = 'fragment') {
        super('div', className, props);
    }
    _hiddenBlockHandler() {
        const attachToMessageButton = this.element.querySelector('.chat__form-button_attach');
        const attachToMessageInputs = this.element.querySelector('.chat__attach');
        if (!attachToMessageButton || !attachToMessageInputs) {
            return;
        }
        attachToMessageButton.addEventListener('click', function () {
            attachToMessageInputs.classList.toggle('chat__attach_visible');
        });
    }
    _setInputListeners() {
        const form = this.element.querySelector('form');
        if (form instanceof HTMLFormElement) {
            this._formHandler.addValidationListeners(form);
        }
    }
    componentDidMount() {
        this._formHandler = new FormHandler();
        this._hiddenBlockHandler();
        this._setInputListeners();
    }
    componentDidUpdate() {
        this._hiddenBlockHandler();
        this._setInputListeners();
    }
    render() {
        return Template;
    }
}
//# sourceMappingURL=chat.js.map