import DOMService from '../../core/k-react/dom-service.js';
import FormHandler from '../../core/form-handler.js';
import DummyService from '../../core/dummy-service.js';
import Chat from '../../components/chat/chat.js';
import ChatSidebar from '../../components/chat-sidebar/chat-sidebar.js';
import Contact from '../../components/contact/contact.js';
import Message from '../../components/message/message.js';
document.addEventListener('DOMContentLoaded', function () {
    const chat = new Chat({ chatModeActive: true });
    const chatSidebar = new ChatSidebar();
    const dummyService = new DummyService();
    const contactsData = dummyService.fetchContacts();
    const activeContactId = dummyService.getActiveContactId();
    const contacts = contactsData.map(data => {
        if (data.id === activeContactId) {
            data.active = true;
        }
        return new Contact(data).element;
    });
    const messagesList = dummyService.fetchMessages();
    const messages = messagesList.map(item => new Message(item).element);
    const DOM = new DOMService();
    DOM.attachComponent(document, '.chat-active-page', chat.element);
    DOM.attachComponent(chat, '.chat__sidebar', chatSidebar.element);
    DOM.attachComponent(chatSidebar, '.chat-sidebar__contacts', contacts);
    DOM.attachComponent(chat, '.chat__messages-list', messages);
    const formHandler = new FormHandler();
    formHandler.handle();
});
//# sourceMappingURL=chat-active.js.map