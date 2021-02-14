import Page from '../../core/k-react/page.js';
import FormHandler from '../../core/form-handler.js';
import DummyService from '../../core/dummy-service.js';
import Profile from '../../components/profile/profile.js';
import Sidebar, { sidebarProfileMenuPreset } from '../../components/sidebar/sidebar.js';
import Button, { profileSidebarButtonPreset } from '../../components/button/button.js';

document.addEventListener('DOMContentLoaded', createPage);

function createPage() {
  const dummyService = new DummyService();

  const profile = new Profile({
    header: dummyService.getProfileHeaderData(),
    isEditInfoMode: true,
    userData: dummyService.getProfileUserData()
  });

  sidebarProfileMenuPreset.menuItems[1].active = true;
  const sidebar = new Sidebar(sidebarProfileMenuPreset);

  const sidebarButton = new Button(profileSidebarButtonPreset, 'fragment fragment_center');

  const cancelButton = new Button({
    linkBehavior: true,
    link: '../profile-main/profile-main.html',
    text: 'Отмена',
    additionClass: ''
  }, 'profile__button');

  const submitButton = new Button({
    text: 'Сохранить',
    additionClass: ''
  }, 'profile__button');

  controlPage(new Page({
    root: [profile, '.profile-edit-data-page'],
    sidebar: [sidebar, '.profile__sidebar', profile],
    sidebarButton: [sidebarButton, '.sidebar__button-slot', sidebar],
    cancelButton: [cancelButton, '.profile__buttons', profile],
    submitButton: [submitButton, '.profile__buttons', profile]
  }));
}

function controlPage(page: Page) {
  page.init();

  const formHandler = new FormHandler();
  formHandler.handle();
}

