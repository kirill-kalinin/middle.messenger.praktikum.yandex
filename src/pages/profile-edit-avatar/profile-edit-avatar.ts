import Page from '../../core/k-react/page.js';
import FormHandler from '../../core/form-handler.js';
import DummyService from '../../core/dummy-service.js';
import AvatarUploadHandler from '../../core/avatar-upload-handler.js';
import Profile from '../../components/profile/profile.js';
import Sidebar, { sidebarProfileMenuPreset } from '../../components/sidebar/sidebar.js';
import Button, { profileSidebarButtonPreset } from '../../components/button/button.js';

document.addEventListener('DOMContentLoaded', createPage);

function createPage() {
  const dummyService = new DummyService();

  const profile = new Profile({
    header: dummyService.getProfileHeaderData(),
    isAvatarUploadMode: true
  });

  sidebarProfileMenuPreset.menuItems[0].active = true;
  const sidebar = new Sidebar(sidebarProfileMenuPreset);

  const sidebarButton = new Button(profileSidebarButtonPreset, 'fragment fragment_center');

  const uploadButton = new Button({
    text: 'Изменить',
    additionClass: ''
  }, 'profile__avatar-upload-button');

  controlPage(new Page({
    root: [profile, '.profile-edit-avatar-page'],
    sidebar: [sidebar, '.profile__sidebar', profile],
    sidebarButton: [sidebarButton, '.sidebar__button-slot', sidebar],
    uploadButton: [uploadButton, '.profile__avatar-upload-button-wrapper', profile]
  }));
}

function controlPage(page: Page) {
  page.init();

  const [ profile ] = page.blocks.root;
  const avatarUploadHandler = new AvatarUploadHandler(profile.element);
  avatarUploadHandler.handle();

  const formHandler = new FormHandler();
  formHandler.handle();
}
