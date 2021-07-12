import Page from '../../core/k-react/page';
import Chat from '../../components/chat/chat';
import ChatSidebar from '../../components/chat-sidebar/chat-sidebar';

import mainStore from '../../core/store/app-stores/main/store-main';
import { MainStoreState } from '../../core/types';

export default function createPageChatSelect(): Page {
    const mainStoreInitialState = mainStore.state as MainStoreState;

    const chat = new Chat({ chatModeSelect: true, messages: [] });

    const contacts = mainStoreInitialState.contacts;
    const activeContactId = mainStoreInitialState.activeContactId;

    const chatSidebar = new ChatSidebar({contacts, activeContactId});

    return new Page({
        root: chat,
        children: {
            chatSidebar: [chatSidebar, '.chat__sidebar', chat]
        }
    });
}
