import Page from '../../core/k-react/page';
import Profile from '../../components/profile/profile';
import Sidebar, { sidebarProfileMenuPreset } from '../../components/sidebar/sidebar';
import Button, { profileSidebarButtonPreset } from '../../components/button/button';

import ProfileDataService from '../../modules/profile-data-service/profile-data-service';

import mainStore from '../../core/store/app-stores/main/store-main';
import { MainStoreState } from '../../core/types';

export default function createPageProfileMain(): Page {
    const mainStoreInitialState = mainStore.getState as MainStoreState;

    const profile = new Profile({
        isMainInfoMode: true,
        header: ProfileDataService.getHeader(mainStoreInitialState.userInfo),
        userData: ProfileDataService.configureMainForm(mainStoreInitialState.userInfo)
    });

    const sidebar = new Sidebar(sidebarProfileMenuPreset);

    const sidebarButton = new Button(profileSidebarButtonPreset, 'fragment fragment_center');

    return new Page({
        root: profile,
        children: {
            sidebar: [sidebar, '.profile__sidebar', profile],
            sidebarButton: [sidebarButton, '.sidebar__button-slot', sidebar]
        }
    });
}
