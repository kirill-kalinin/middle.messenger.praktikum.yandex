import DOMService from '../../core/k-react/dom-service.js';
import FormHandler from '../../core/form-handler.js';
import DummyService from '../../core/dummy-service.js';
import Profile from '../../components/profile/profile.js';
import Sidebar, { sidebarProfileMenuPreset } from '../../components/sidebar/sidebar.js';
import Button, { profileSidebarButtonPreset } from '../../components/button/button.js';
document.addEventListener('DOMContentLoaded', function () {
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
    const DOM = new DOMService();
    DOM.attachComponent(document, '.profile-edit-data-page', profile.element);
    DOM.attachComponent(profile, '.profile__sidebar', sidebar.element);
    DOM.attachComponent(sidebar, '.sidebar__button-slot', sidebarButton.element);
    DOM.attachComponent(profile, '.profile__buttons', cancelButton.element);
    DOM.attachComponent(profile, '.profile__buttons', submitButton.element);
    const formHandler = new FormHandler();
    formHandler.handle();
});
//# sourceMappingURL=profile-edit-data.js.map