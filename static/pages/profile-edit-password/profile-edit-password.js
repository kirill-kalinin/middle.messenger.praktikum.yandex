import DOMService from '../../scripts/k-react/dom-service.js';
import DummyService from '../../scripts/dummy-service.js';
import Profile from '../../components/profile/profile.js';
import Sidebar, { sidebarProfileMenuPreset } from '../../components/sidebar/sidebar.js';
import Button, { profileSidebarButtonPreset } from '../../components/button/button.js';

document.addEventListener('DOMContentLoaded', function() {
  const dummyService = new DummyService();

  const profile = new Profile({
    header: dummyService.getProfileHeaderData(),
    isEditPasswordMode: true,
    userPasswordFields: {
      oldPassword: {
        label: 'Старый пароль',
        value: '123123',
        inputName: 'oldPassword'
      },
      newPassword: {
        label: 'Новый пароль',
        value: '1231231',
        inputName: 'newPassword'
      },
      repeat: {
        label: 'Повторите пароль',
        value: '1231231',
        inputName: ''
      }
    }
  });

  sidebarProfileMenuPreset.menuItems[2].active = true;
  const sidebar = new Sidebar(sidebarProfileMenuPreset);

  const sidebarButton = new Button(profileSidebarButtonPreset, 'fragment fragment_center');

  const submitButton = new Button({
    text: 'Сохранить',
    additionClass: ''
  }, 'profile__button');

  const DOM = new DOMService();

  DOM.attachComponent(document, '.profile-edit-password-page', profile);
  DOM.attachComponent(profile, '.profile__sidebar', sidebar);
  DOM.attachComponent(sidebar, '.sidebar__button-slot', sidebarButton);
  DOM.attachComponent(profile, '.profile__buttons', submitButton);
});
