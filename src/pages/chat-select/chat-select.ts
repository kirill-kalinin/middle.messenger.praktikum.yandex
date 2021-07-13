import Page from '../../core/k-react/page';
import Chat from '../../components/chat/chat';
import ChatSidebar from '../../components/chat-sidebar/chat-sidebar';

import mainStore from '../../core/store/app-stores/main/store-main';
import { MainStoreState } from '../../core/types';

import ChatsController from '../../controllers/chats-controller';

const chatsController = new ChatsController();

export default function createPageChatSelect(): Page {
    const mainStoreInitialState = mainStore.state as MainStoreState;

    const chat = new Chat({ chatModeSelect: true, messages: [] });

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

    return new Page({
        root: chat,
        children: {
            chatSidebar: [chatSidebar, '.chat__sidebar', chat]
        }
    });
}
