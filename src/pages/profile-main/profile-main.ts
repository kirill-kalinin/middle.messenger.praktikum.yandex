import Page from '../../core/k-react/page';
import DummyService from '../../modules/http-services/dummy-service';
import Profile from '../../components/profile/profile';
import Sidebar, { sidebarProfileMenuPreset } from '../../components/sidebar/sidebar';
import Button, { profileSidebarButtonPreset } from '../../components/button/button';

export default function createPageProfileMain(): Page {
    const dummyService = new DummyService();

    const profile = new Profile({
        header: dummyService.getProfileHeaderData(),
        isMainInfoMode: true,
        userData: dummyService.getProfileUserData()
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
