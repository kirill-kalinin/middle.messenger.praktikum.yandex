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

export default function createPageProfileEditAvatar(): Page {
    const mainStoreInitialState = mainStore.state as MainStoreState;

    const profile = new Profile({
        isAvatarUploadMode: true,
        formName: 'avatar',
        header: ProfileDataService.getHeader(mainStoreInitialState.userInfo),
    });

    const sidebarPreset = cloneDeep(sidebarProfileMenuPreset);
    sidebarPreset.menuItems[0].active = true;
    const sidebar = new Sidebar(sidebarPreset);

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
        }
    });
}
