import Page from '../../core/k-react/page';
import Chat from '../../components/chat/chat';
import ChatSidebar from '../../components/chat-sidebar/chat-sidebar';
import Contact from '../../components/contact/contact';
import Message from '../../components/message/message';

import mainStore from '../../core/store/app-stores/main/store-main';
import messagesStore from '../../core/store/app-stores/main/store-main';
import { MainStoreState, MessagesStoreState } from '../../core/types';

export default function createPageChatActive(): Page {
    const mainStoreInitialState = mainStore.getState as MainStoreState;
    const messagesStoreInitialState = messagesStore.getState as MessagesStoreState;

    const chat = new Chat({ chatModeActive: true });

    const chatSidebar = new ChatSidebar();

    const contactsData = mainStoreInitialState.contacts;
    const activeContactId = mainStoreInitialState.activeContactId;
    const contacts = contactsData.map(contact => {
        if (contact.id === activeContactId) {
            contact.active = true;
        }
        return new Contact(contact);
    });

    const messagesList = messagesStoreInitialState;
    let messages: Message[] = [];
    if (typeof activeContactId === 'string' && messagesList[activeContactId]) {
        messages = messagesList[activeContactId].map(item => new Message(item));
    }

    return new Page({
        root: chat,
        children: {
            chatSidebar: [chatSidebar, '.chat__sidebar', chat],
            contacts: [contacts, '.chat-sidebar__contacts', chatSidebar],
            messages: [messages, '.chat__messages-list', chat]
        }
    });
}
