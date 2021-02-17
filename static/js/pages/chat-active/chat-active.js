import Page from '../../core/k-react/page.js';
import FormHandler from '../../core/form-handler.js';
import DummyService from '../../core/services/dummy-service.js';
import Chat from '../../components/chat/chat.js';
import ChatSidebar from '../../components/chat-sidebar/chat-sidebar.js';
import Contact from '../../components/contact/contact.js';
import Message from '../../components/message/message.js';
export default function createPageChatActive() {
    const dummyService = new DummyService();
    const chat = new Chat({ chatModeActive: true });
    const chatSidebar = new ChatSidebar();
    const contactsData = dummyService.fetchContacts();
    const activeContactId = dummyService.getActiveContactId();
    const contacts = contactsData.map(data => {
        if (data.id === activeContactId) {
            data.active = true;
        }
        return new Contact(data);
    });
    const messagesList = dummyService.fetchMessages();
    const messages = messagesList.map(item => new Message(item));
    return new Page({
        root: chat,
        children: {
            chatSidebar: [chatSidebar, '.chat__sidebar', chat],
            contacts: [contacts, '.chat-sidebar__contacts', chatSidebar],
            messages: [messages, '.chat__messages-list', chat]
        },
        controller
    });
}
function controller() {
    const formHandler = new FormHandler();
    formHandler.handle();
}
//# sourceMappingURL=chat-active.js.map