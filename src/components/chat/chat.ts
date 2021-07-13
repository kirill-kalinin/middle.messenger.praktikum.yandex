import Template from './chat.hbs.js';
import Block from '../../core/k-react/block';
import Message from '../message/message';
import DOMService from '../../core/k-react/dom-service';
import FormHandler from '../../modules/form-handler/form-handler';
import HiddenBlockHandler from './modules/hidden-block-handler';
import type { ChatProps } from '../../core/types';

const DOM = new DOMService();

export default class Chat extends Block {

    private _formHandler: FormHandler;
    private _hiddenBlockHandler: HiddenBlockHandler;
    private _messages: Message[] | null;

    constructor(props: ChatProps, className = 'fragment') {
        super('div', className, props);
        this._renderMessages(this.props as ChatProps);
    }

    private _renderMessages(props: ChatProps): void {
        if (!props.chatModeActive) {
            return;
        }
        if (this._messages) {
            DOM.detachComponent(this._messages, this);
        }
        this._messages = props.messages.map(message => new Message(message));
        DOM.attachComponent(this._messages, '.chat__messages-list', this);
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
        this._renderMessages(this.props as ChatProps);
    }

    render(): string {
        return Template;
    }

}
