import Template from './form.hbs.js';
import Block from '../../core/k-react/block';
import FormHandler from '../../modules/form-handler/form-handler';
import type { BlockProps, Controllers } from '../../core/types';

import AuthController from '../../controllers/auth-controller';

const authControllerInstance = new AuthController();

const formControllers: Controllers = {
    login: authControllerInstance.login.bind(authControllerInstance),
    signup: authControllerInstance.signup.bind(authControllerInstance)
};

export default class Form extends Block {

    private _formHandler: FormHandler;

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
        const formName = String(this.props.name);
        this._formHandler = new FormHandler();
        this._setInputListeners();
        if (formControllers[formName]) {
            this._formHandler.subscribeSubmit(formName, formControllers[formName]);
        }
    }

    componentDidUpdate(): void {
        this._setInputListeners();
    }

    render(): string {
        return Template;
    }

}
