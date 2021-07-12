import Template from './chat-sidebar.hbs.js';
import Block from '../../core/k-react/block';
import Contact from '../contact/contact.js';
import DOMService from '../../core/k-react/dom-service';
import ToolbarButtonsHandler from './modules/toolbar-buttons-handler';
import type { ChatSidebarProps } from '../../core/types';

const DOM = new DOMService();

export default class ChatSidebar extends Block {

    private _toolbarButtonsHandler: ToolbarButtonsHandler;

    constructor(props: ChatSidebarProps, className = 'fragment') {
        super('div', className, props);
    }

    _renderContacts(props: ChatSidebarProps): void {
        const components = props.contacts.map(contact => {
            if (contact.id === props.activeContactId) {
                contact.active = true;
            }
            return new Contact(contact);
        });
        DOM.attachComponent(components, '.chat-sidebar__contacts', this);
    }

    componentDidMount(): void {
        this._toolbarButtonsHandler = new ToolbarButtonsHandler();
        this._toolbarButtonsHandler.init(this.element);
    }

    componentDidUpdate(): void {
        this._toolbarButtonsHandler.update(this.element);
        this._renderContacts(this.props as ChatSidebarProps);
    }

    render(): string {
        return Template;
    }

}
