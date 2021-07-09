import Template from './profile.hbs.js';
import Block from '../../core/k-react/block';
import FormHandler from '../../modules/form-handler/form-handler';
import AvatarUploadHandler from './modules/avatar-upload-handler';
import type { BlockProps, Controllers } from '../../core/types';

import mainStore from '../../core/store/app-stores/main/store-main';
import mainSelectors from '../../core/store/app-stores/main/selectors-main';

import UserController from '../../controllers/user-controller';

const userControllerInstance = new UserController();

const formControllers: Controllers = {
    profile: userControllerInstance.changeProfile.bind(userControllerInstance),
    avatar: userControllerInstance.changeAvatar.bind(userControllerInstance),
    password: userControllerInstance.changePassword.bind(userControllerInstance)
};

export default class Profile extends Block {

    private _formHandler: FormHandler;
    private _avatarUploadHandler: AvatarUploadHandler;

    constructor(props: BlockProps = {}, className = 'fragment') {
        super('div', className, props);
        mainStore.subscribe('userInfo', newState => {
            this.setProps(mainSelectors.getProfileInfo(newState));
        });
    }

    private _setInputListeners() {
        const form = this.element.querySelector('form');
        if (form instanceof HTMLFormElement) {
            this._formHandler.setValidationListeners(form);
        }
    }

    componentDidMount(): void {
        const formName = String(this.props.formName);
        this._formHandler = new FormHandler();
        this._setInputListeners();
        if (formControllers[formName]) {
            this._formHandler.subscribeSubmit(formName, formControllers[formName]);
        }

        if (this.props.isAvatarUploadMode) {
            this._avatarUploadHandler = new AvatarUploadHandler();
            this._avatarUploadHandler.init(this.element);
        }
    }

    componentDidUpdate(): void {
        this._setInputListeners();
        this.props.isAvatarUploadMode && this._avatarUploadHandler.update(this.element);
    }

    render(): string {
        return Template;
    }

}
