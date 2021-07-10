import Page from '../../core/k-react/page';
import Profile from '../../components/profile/profile';
import Sidebar from '../../components/sidebar/sidebar';
import { sidebarProfileMenuPreset } from '../../components/sidebar/presets/sidebars';
import Button from '../../components/button/button';
import { profileSidebarButtonPreset } from '../../components/button/presets/special-buttons';

import cloneDeep from '../../utils/mydash/clone-deep/clone-deep';
import ProfileDataService from '../../modules/profile-data-service/profile-data-service';

import mainStore from '../../core/store/app-stores/main/store-main';
import { MainStoreState } from '../../core/types';

export default function createPageProfileEditData(): Page {
    const mainStoreInitialState = mainStore.getState as MainStoreState;

    const profile = new Profile({
        isEditInfoMode: true,
        formName: 'profile',
        header: ProfileDataService.getHeader(mainStoreInitialState.userInfo),
        userData: ProfileDataService.configureMainForm(mainStoreInitialState.userInfo)
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
        }
    });
}
