import DOMService from '../../core/k-react/dom-service.js';
import DummyService from '../../core/dummy-service.js';
import Chat from '../../components/chat/chat.js';
import ChatSidebar from '../../components/chat-sidebar/chat-sidebar.js';
import Contact from '../../components/contact/contact.js';
document.addEventListener('DOMContentLoaded', function () {
    const chat = new Chat({ chatModeSelect: true });
    const chatSidebar = new ChatSidebar();
    const dummyService = new DummyService();
    const contactsData = dummyService.fetchContacts();
    const contacts = contactsData.map(data => new Contact(data).element);
    const DOM = new DOMService();
    DOM.attachComponent(document, '.chat-select-page', chat.element);
    DOM.attachComponent(chat, '.chat__sidebar', chatSidebar.element);
    DOM.attachComponent(chatSidebar, '.chat-sidebar__contacts', contacts);
});
//# sourceMappingURL=chat-select.js.map