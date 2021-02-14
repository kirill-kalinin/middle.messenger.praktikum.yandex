import Page from '../../core/k-react/page.js';
import DummyService from '../../core/dummy-service.js';
import Chat from '../../components/chat/chat.js';
import ChatSidebar from '../../components/chat-sidebar/chat-sidebar.js';
import Contact from '../../components/contact/contact.js';

document.addEventListener('DOMContentLoaded', createPage);

function createPage() {
  const chat = new Chat({ chatModeSelect: true });

  const chatSidebar = new ChatSidebar();

  const dummyService = new DummyService();
  const contactsData = dummyService.fetchContacts();
  const contacts = contactsData.map(data => new Contact(data));

  controlPage(new Page({
    root: [chat, '.chat-select-page'],
    chatSidebar: [chatSidebar, '.chat__sidebar', chat],
    contacts: [contacts, '.chat-sidebar__contacts', chatSidebar]
  }));
}

function controlPage(page: Page) {
  page.init();
}
