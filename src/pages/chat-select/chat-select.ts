import Page from '../../core/k-react/page';
import DummyService from '../../modules/http-services/dummy-service';
import Chat from '../../components/chat/chat';
import ChatSidebar from '../../components/chat-sidebar/chat-sidebar';
import Contact from '../../components/contact/contact';

export default function createPageChatSelect(): Page {
    const chat = new Chat({ chatModeSelect: true });

    const chatSidebar = new ChatSidebar();

    const dummyService = new DummyService();
    const contactsData = dummyService.fetchContacts();
    const contacts = contactsData.map(data => new Contact(data));

    return new Page({
        root: chat,
        children: {
            chatSidebar: [chatSidebar, '.chat__sidebar', chat],
            contacts: [contacts, '.chat-sidebar__contacts', chatSidebar]
        }
    });
}
