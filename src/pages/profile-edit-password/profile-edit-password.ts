import Page from '../../core/k-react/page';
import Profile from '../../components/profile/profile';
import Sidebar, { sidebarProfileMenuPreset } from '../../components/sidebar/sidebar';
import Button, { profileSidebarButtonPreset } from '../../components/button/button';

import cloneDeep from '../../utils/mydash/clone-deep/clone-deep';
import ProfileDataService from '../../modules/profile-data-service/profile-data-service';

import mainStore from '../../core/store/app-stores/main/store-main';
import { MainStoreState } from '../../core/types';

export default function createPageProfileEditPassword(): Page {
    const mainStoreInitialState = mainStore.getState as MainStoreState;

    const profile = new Profile({
        isEditPasswordMode: true,
        header: ProfileDataService.getHeader(mainStoreInitialState.userInfo),
        userPasswordFields: ProfileDataService.getPasswordForm()
    });

    const sidebarPreset = cloneDeep(sidebarProfileMenuPreset);
    sidebarPreset.menuItems[2].active = true;
    const sidebar = new Sidebar(sidebarPreset);

    const sidebarButton = new Button(profileSidebarButtonPreset, 'fragment fragment_center');

    const submitButton = new Button({
        text: 'Сохранить',
        additionClass: ''
    }, 'profile__button');

    return new Page({
        root: profile,
        children: {
            sidebar: [sidebar, '.profile__sidebar', profile],
            sidebarButton: [sidebarButton, '.sidebar__button-slot', sidebar],
            submitButton: [submitButton, '.profile__buttons', profile]
        }
    });
}
