import DOMService from '../../core/k-react/dom-service.js';
import FormHandler from '../../core/form-handler.js';
import DummyService from '../../core/dummy-service.js';
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
        value: 'фыв123abc',
        name: 'oldPassword',
        validationKey: 'password',
        validationText: 'Введите от 8 до 25 букв или цифр',
      },
      newPassword: {
        label: 'Новый пароль',
        value: '',
        name: 'newPassword',
        validationKey: 'password',
        validationText: 'Введите от 8 до 25 букв или цифр',
        equality: true
      },
      repeat: {
        label: 'Повторите пароль',
        value: '',
        name: '',
        validationText: 'Пароли не совпадают',
        equality: true
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

  DOM.attachComponent(document, '.profile-edit-password-page', profile.element);
  DOM.attachComponent(profile, '.profile__sidebar', sidebar.element);
  DOM.attachComponent(sidebar, '.sidebar__button-slot', sidebarButton.element);
  DOM.attachComponent(profile, '.profile__buttons', submitButton.element);

  const formHandler = new FormHandler();
  formHandler.handle();
});
