import Template from './profile.hbs.js';
import Block from '../../core/k-react/block';
import FormHandler from '../../modules/form-handler/form-handler';
import AvatarUploadHandler from './modules/avatar-upload-handler';
import type { BlockProps } from '../../core/types';

export default class Profile extends Block {

    private _formHandler: FormHandler;
    private _avatarUploadHandler: AvatarUploadHandler;

    constructor(props: BlockProps = {}, className = 'fragment') {
        super('div', className, props);
    }

    private _setInputListeners() {
        const form = this.element.querySelector('form');
        if (form instanceof HTMLFormElement) {
            this._formHandler.setValidationListeners(form);
        }
    }

    componentDidMount(): void {
        this._formHandler = new FormHandler();
        this._avatarUploadHandler = new AvatarUploadHandler();
        this._setInputListeners();
        this._avatarUploadHandler.init(this.element);
    }

    componentDidUpdate(): void {
        this._setInputListeners();
        this._avatarUploadHandler.update(this.element);
    }

    render(): string {
        return Template;
    }

}
