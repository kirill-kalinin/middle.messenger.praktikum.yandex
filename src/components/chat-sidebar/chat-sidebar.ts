import Template from './chat-sidebar.hbs.js';
import Block from '../../core/k-react/block';
import Contact from '../contact/contact';
import DOMService from '../../core/k-react/dom-service';
import ChatSidebarHandler from './modules/chat-sidebar-handler';
import type { ChatSidebarProps } from '../../core/types';

import mainStore from '../../core/store/app-stores/main/store-main';
import mainSelectors from '../../core/store/app-stores/main/selectors-main';

const DOM = new DOMService();

export default class ChatSidebar extends Block {

    private _sidebarHandler: ChatSidebarHandler;
    private _contacts: Contact[] | null;

    constructor(props: ChatSidebarProps, className = 'fragment') {
        super('div', className, props);
        mainStore.subscribe('contacts', newState => {
            this.setProps(mainSelectors.getContacts(newState));
        });
        this._renderContacts(this.props as ChatSidebarProps);
    }

    _renderContacts(props: ChatSidebarProps): void {
        if (this._contacts) {
            DOM.detachComponent(this._contacts, this);
        }
        this._contacts = props.contacts.map(contact => new Contact(contact));
        DOM.attachComponent(this._contacts, '.chat-sidebar__contacts', this);
    }

    componentDidMount(): void {
        this._sidebarHandler = new ChatSidebarHandler();
        this._sidebarHandler.init(this.element);
    }

    componentDidUpdate(): void {
        this._sidebarHandler.update(this.element);
        this._renderContacts(this.props as ChatSidebarProps);
    }

    render(): string {
        return Template;
    }

}
