import Page from '../../core/k-react/page.js';
import FormHandler from '../../core/form-handler.js';
import DummyService from '../../core/services/dummy-service.js';
import AvatarUploadHandler from '../../core/avatar-upload-handler.js';
import Profile from '../../components/profile/profile.js';
import Sidebar, { sidebarProfileMenuPreset } from '../../components/sidebar/sidebar.js';
import Button, { profileSidebarButtonPreset } from '../../components/button/button.js';
export default function createPageProfileEditAvatar() {
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
    return new Page({
        root: profile,
        children: {
            sidebar: [sidebar, '.profile__sidebar', profile],
            sidebarButton: [sidebarButton, '.sidebar__button-slot', sidebar],
            uploadButton: [uploadButton, '.profile__avatar-upload-button-wrapper', profile]
        },
        controller
    });
}
function controller(page) {
    const avatarUploadHandler = new AvatarUploadHandler(page.root.element);
    avatarUploadHandler.handle();
    const formHandler = new FormHandler();
    formHandler.handle();
}
//# sourceMappingURL=profile-edit-avatar.js.map