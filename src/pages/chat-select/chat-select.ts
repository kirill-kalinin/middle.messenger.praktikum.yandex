import Page from '../../core/k-react/page';
import Chat from '../../components/chat/chat';
import ChatSidebar from '../../components/chat-sidebar/chat-sidebar';
import Contact from '../../components/contact/contact';

import mainStore from '../../core/store/app-stores/main/store-main';
import { MainStoreState } from '../../core/types';

export default function createPageChatSelect(): Page {
    const mainStoreInitialState = mainStore.state as MainStoreState;

    const chat = new Chat({ chatModeSelect: true });

    const chatSidebar = new ChatSidebar();

    const contacts = mainStoreInitialState.contacts.map(contact => new Contact(contact));

    return new Page({
        root: chat,
        children: {
            chatSidebar: [chatSidebar, '.chat__sidebar', chat],
            contacts: [contacts, '.chat-sidebar__contacts', chatSidebar]
        }
    });
}
