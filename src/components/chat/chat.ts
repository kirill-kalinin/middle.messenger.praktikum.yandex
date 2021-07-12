import Template from './chat.hbs.js';
import Block from '../../core/k-react/block';
import Message from '../message/message.js';
import DOMService from '../../core/k-react/dom-service.js';
import FormHandler from '../../modules/form-handler/form-handler';
import HiddenBlockHandler from './modules/hidden-block-handler';
import type { ChatProps } from '../../core/types';

const DOM = new DOMService();

export default class Chat extends Block {

    private _formHandler: FormHandler;
    private _hiddenBlockHandler: HiddenBlockHandler;

    constructor(props: ChatProps, className = 'fragment') {
        super('div', className, props);
    }

    private _renderMessages(messages: ChatProps['messages']): void {
        const components = messages.map(message => new Message(message));
        DOM.attachComponent(components, '.chat__messages-list', this);
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
        this._renderMessages(this.props.messages as ChatProps['messages']);
    }

    render(): string {
        return Template;
    }

}
