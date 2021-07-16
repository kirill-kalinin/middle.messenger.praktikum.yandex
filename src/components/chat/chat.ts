import Template from './chat.hbs.js';
import Block from '../../core/k-react/block';
import Message from '../message/message';
import DOMService from '../../core/k-react/dom-service';
import FormHandler from '../../modules/form-handler/form-handler';
import HiddenBlockHandler from './modules/hidden-block-handler';
import type { ChatProps, MainStoreState, MessagesStoreState } from '../../core/types';

import mainStore from '../../core/store/app-stores/main/store-main';
import messagesStore from '../../core/store/app-stores/messages/store-messages';
import messagesSelectors from '../../core/store/app-stores/messages/selectors-messages';

const DOM = new DOMService();

export default class Chat extends Block {

    private _formHandler: FormHandler | undefined;
    private _hiddenBlockHandler: HiddenBlockHandler;
    private _messages: Message[] | null;
    private _activeContactId: MainStoreState['activeContactId'];

    constructor(props: ChatProps, className = 'fragment') {
        super('div', className, props);
        if (!props.chatModeActive) {
            return;
        }

        this._activeContactId = (mainStore.state as MainStoreState).activeContactId;

        messagesStore.subscribe(String(this._activeContactId), this._newMessagesListener);

        mainStore.subscribe('activeContactId', newState => {
            messagesStore.unsubscribe(String(this._activeContactId), this._newMessagesListener);
            this._activeContactId = (newState as MainStoreState).activeContactId;
            this.setProps(messagesSelectors.getMessages(messagesStore.state, this._activeContactId));
            messagesStore.subscribe(String(this._activeContactId), this._newMessagesListener);
        });
    }

    private _newMessagesListener(newState: MessagesStoreState): void {
        this.setProps(messagesSelectors.getMessages(newState, this._activeContactId));
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

    private _sendMessage(form: FormData) {
        const socket = (mainStore.state as MainStoreState).sockets[String(this._activeContactId)];
        socket.send(form);
    }

    private _setInputListeners() {
        const form = this.element.querySelector('form');
        if (form instanceof HTMLFormElement) {
            this._formHandler && this._formHandler.setValidationListeners(form);
        }
    }

    componentDidMount(): void {
        this._hiddenBlockHandler = new HiddenBlockHandler();
        this._hiddenBlockHandler.init(this.element);
        if (!this.props.chatModeActive) {
            return;
        }
        this._renderMessages(this.props as ChatProps);
        this._formHandler = new FormHandler();
        this._setInputListeners();
        this._formHandler.subscribeSubmit('message', this._sendMessage.bind(this));
    }

    componentDidUpdate(): void {
        this._hiddenBlockHandler.update(this.element);
        if (!this.props.chatModeActive) {
            return;
        }
        this._renderMessages(this.props as ChatProps);
        this._setInputListeners();
    }

    render(): string {
        return Template;
    }

}
