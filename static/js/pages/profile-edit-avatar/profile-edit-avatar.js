import DOMService from '../../core/k-react/dom-service.js';
import FormHandler from '../../core/form-handler.js';
import DummyService from '../../core/dummy-service.js';
import AvatarUploadHandler from '../../core/avatar-upload-handler.js';
import Profile from '../../components/profile/profile.js';
import Sidebar, { sidebarProfileMenuPreset } from '../../components/sidebar/sidebar.js';
import Button, { profileSidebarButtonPreset } from '../../components/button/button.js';
document.addEventListener('DOMContentLoaded', function () {
    const dummyService = new DummyService();
    const profile = new Profile({
        header: dummyService.getProfileHeaderData(),
        isAvatarUploadMode: true
    });
    sidebarProfileMenuPreset.menuItems[0].active = true;
    const sidebar = new Sidebar(sidebarProfileMenuPreset);
    const sidebarButton = new Button(profileSidebarButtonPreset, 'fragment fragment_center');
    const button = new Button({
        text: 'Изменить',
        additionClass: ''
    }, 'profile__avatar-upload-button');
    const DOM = new DOMService();
    DOM.attachComponent(document, '.profile-edit-avatar-page', profile.element);
    DOM.attachComponent(profile, '.profile__sidebar', sidebar.element);
    DOM.attachComponent(sidebar, '.sidebar__button-slot', sidebarButton.element);
    DOM.attachComponent(profile, '.profile__avatar-upload-button-wrapper', button.element);
    const avatarUploadHandler = new AvatarUploadHandler(profile.element);
    avatarUploadHandler.handle();
    const formHandler = new FormHandler();
    formHandler.handle();
});
//# sourceMappingURL=profile-edit-avatar.js.map