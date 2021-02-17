import Page from '../../core/k-react/page.js';
import DummyService from '../../core/services/dummy-service.js';
import Chat from '../../components/chat/chat.js';
import ChatSidebar from '../../components/chat-sidebar/chat-sidebar.js';
import Contact from '../../components/contact/contact.js';
export default function createPageChatSelect() {
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
        },
        controller
    });
}
function controller() {
}
//# sourceMappingURL=chat-select.js.map