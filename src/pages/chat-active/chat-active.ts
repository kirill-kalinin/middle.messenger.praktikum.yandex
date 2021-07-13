import Page from '../../core/k-react/page';
import Chat from '../../components/chat/chat';
import ChatSidebar from '../../components/chat-sidebar/chat-sidebar';

import mainStore from '../../core/store/app-stores/main/store-main';
import messagesStore from '../../core/store/app-stores/main/store-main';
import { MainStoreState, MessagesStoreState, MessageProps } from '../../core/types';

import ChatsController from '../../controllers/chats-controller';

const chatsController = new ChatsController();

export default function createPageChatActive(): Page {
    const mainStoreInitialState = mainStore.state as MainStoreState;
    const messagesStoreInitialState = messagesStore.state as MessagesStoreState;

    const contacts = mainStoreInitialState.contacts;
    const activeContactId = mainStoreInitialState.activeContactId;

    const chatSidebar = new ChatSidebar({contacts, activeContactId, events: {
        click: e => {
            const contact = e.target instanceof HTMLElement && e.target.closest('.contact');
            if (contact instanceof HTMLElement && contact.dataset.id) {
                chatsController.selectChat(Number(contact.dataset.id));
            }
        }
    }});

    let messages: MessageProps[] = [];
    if (activeContactId !== null && messagesStoreInitialState[activeContactId]) {
        messages = messagesStoreInitialState[activeContactId];
    }

    const chat = new Chat({ chatModeActive: true, messages });

    return new Page({
        root: chat,
        children: {
            chatSidebar: [chatSidebar, '.chat__sidebar', chat]
        }
    });
}
