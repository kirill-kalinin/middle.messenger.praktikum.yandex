import Template from './chat.hbs.js';
import Block from '../../core/k-react/block';
import FormHandler from '../../modules/form-handler/form-handler';
import HiddenBlockHandler from './modules/hidden-block-handler';
import type { BlockProps } from '../../core/types';

export default class Chat extends Block {

    private _formHandler: FormHandler;
    private _hiddenBlockHandler: HiddenBlockHandler;

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
        this._hiddenBlockHandler = new HiddenBlockHandler();
        this._hiddenBlockHandler.init(this.element);
        this._setInputListeners();
    }

    componentDidUpdate(): void {
        this._hiddenBlockHandler.update(this.element);
        this._setInputListeners();
    }

    render(): string {
        return Template;
    }

}
