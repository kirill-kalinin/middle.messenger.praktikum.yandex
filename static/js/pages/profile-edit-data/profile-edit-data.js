import Page from '../../core/k-react/page.js';
import DummyService from '../../core/services/dummy-service.js';
import Profile from '../../components/profile/profile.js';
import Sidebar, { sidebarProfileMenuPreset } from '../../components/sidebar/sidebar.js';
import Button, { profileSidebarButtonPreset } from '../../components/button/button.js';
import cloneDeep from '../../utils/mydash/clone-deep/clone-deep.js';
export default function createPageProfileEditData() {
    const dummyService = new DummyService();
    const profile = new Profile({
        header: dummyService.getProfileHeaderData(),
        isEditInfoMode: true,
        userData: dummyService.getProfileUserData()
    });
    const sidebarPreset = cloneDeep(sidebarProfileMenuPreset);
    sidebarPreset.menuItems[1].active = true;
    const sidebar = new Sidebar(sidebarPreset);
    const sidebarButton = new Button(profileSidebarButtonPreset, 'fragment fragment_center');
    const cancelButton = new Button({
        text: 'Отмена',
        additionClass: '',
        isSimpleButton: true,
        route: '/profile-main'
    }, 'profile__button');
    const submitButton = new Button({
        text: 'Сохранить',
        additionClass: ''
    }, 'profile__button');
    return new Page({
        root: profile,
        children: {
            sidebar: [sidebar, '.profile__sidebar', profile],
            sidebarButton: [sidebarButton, '.sidebar__button-slot', sidebar],
            cancelButton: [cancelButton, '.profile__buttons', profile],
            submitButton: [submitButton, '.profile__buttons', profile]
        },
        controller
    });
}
function controller() {
}
//# sourceMappingURL=profile-edit-data.js.map