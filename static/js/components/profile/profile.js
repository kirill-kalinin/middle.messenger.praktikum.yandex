import Template from '../../../components/profile/profile.hbs.js';
import Block from '../../core/k-react/block.js';
import FormHandler from '../../core/form-handler.js';
import AvatarUploadHandler from '../../core/avatar-upload-handler.js';
export default class Profile extends Block {
    constructor(props = {}, className = 'fragment') {
        super('div', className, props);
    }
    _setInputListeners() {
        const form = this.element.querySelector('form');
        if (form instanceof HTMLFormElement) {
            this._formHandler.addValidationListeners(form);
        }
    }
    componentDidMount() {
        this._formHandler = new FormHandler();
        this._avatarUploadHandler = new AvatarUploadHandler();
        this._setInputListeners();
        this._avatarUploadHandler.handle(this.element);
    }
    componentDidUpdate() {
        this._setInputListeners();
        this._avatarUploadHandler.handle(this.element);
    }
    render() {
        return Template;
    }
}
//# sourceMappingURL=profile.js.map