import Page from '../../core/k-react/page';
import Chat from '../../components/chat/chat';
import ChatSidebar from '../../components/chat-sidebar/chat-sidebar';

import mainStore from '../../core/store/app-stores/main/store-main';
import messagesStore from '../../core/store/app-stores/main/store-main';
import { MainStoreState, MessagesStoreState, MessageProps } from '../../core/types';

export default function createPageChatActive(): Page {
    const mainStoreInitialState = mainStore.state as MainStoreState;
    const messagesStoreInitialState = messagesStore.state as MessagesStoreState;

    const contacts = mainStoreInitialState.contacts;
    const activeContactId = mainStoreInitialState.activeContactId;

    const chatSidebar = new ChatSidebar({contacts, activeContactId});

    const messagesList = messagesStoreInitialState;
    let messages: MessageProps[] = [];
    if (activeContactId !== null && messagesList[activeContactId]) {
        messages = messagesList[activeContactId];
    }

    const chat = new Chat({ chatModeActive: true, messages });

    return new Page({
        root: chat,
        children: {
            chatSidebar: [chatSidebar, '.chat__sidebar', chat]
        }
    });
}
