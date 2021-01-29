import DOMService from '../../scripts/k-react/dom-service.js';
import DummyService from '../../scripts/dummy-service.js';
import Chat from '../../components/chat/chat.js';
import ChatSidebar from '../../components/chat-sidebar/chat-sidebar.js';
import Contact from '../../components/contact/contact.js';
import Message from '../../components/message/message.js';

document.addEventListener('DOMContentLoaded', function() {
  const chat = new Chat({ chatModeActive: true });

  const chatSidebar = new ChatSidebar();

  const dummyService = new DummyService();
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

  const DOM = new DOMService();

  DOM.attachComponent(document, '.chat-active-page', chat);
  DOM.attachComponent(chat, '.chat__sidebar', chatSidebar);

  contacts.forEach(contact => {
    DOM.attachComponent(chatSidebar, '.chat-sidebar__contacts', contact);
  })
  messages.forEach(message => {
    DOM.attachComponent(chat, '.chat__messages-list', message);
  })
});
